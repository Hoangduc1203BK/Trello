import "./Board_Column.scss";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { initialValue } from "../../actions/InitialValue";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty,cloneDeep } from "lodash";
import { applyDrag } from "../../lib/lib";
import Column from "../Column/Column";
import {
  Container as AddContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { boardApi } from "./Shared/Board.API";
import {columnApi } from "../Column/Column.Shared/Column.Api";
import { mapOder } from "../../lib/lib.js";
function Board_Column() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newTileColumns, setNewTitleColumns] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const idDB = "61d098d8056c6bf92cf35353";
    boardApi.getFullBoard(idDB).then((res) => {
      setBoard(res.data);
      const sortColumns=mapOder(res.data.columns, res.data.columnOrder, "_id")
      setColumns(sortColumns);
    });
  }, []);
  useEffect(() => {
    if (openAdd && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openAdd]);

  const handleChangeInput = useCallback(
    (e) => setNewTitleColumns(e.target.value),
    []
  );
  if (isEmpty(board)) {
    return (
      <div className="error" style={{ paddingLeft: 10, color: "white" }}>
        Board is empty
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = cloneDeep(board);
    newBoard.columnOrder = newColumns.map((el) => el._id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
    boardApi.updateColumnOrder(newBoard._id, newBoard).catch(()=>{
      setColumns(columns)
      setBoard(board)
    })
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex != null || dropResult.addedIndex != null) {
      let newColumns = cloneDeep(columns);
      let currentColumn = newColumns.find((c) => c._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((e) => e._id);

      setColumns(newColumns);
      if(dropResult.removedIndex != null && dropResult.addedIndex != null){
        columnApi.updateColumn(currentColumn._id,currentColumn).catch(()=>{
          setColumns(columns)
        })
      }else{
        
        columnApi.updateColumn(currentColumn._id,currentColumn).catch(()=>setColumns(columns))
        if(dropResult.addedIndex!==null){
          const currentCard=cloneDeep(dropResult.payload)
          currentCard.columnId=currentColumn._id
          boardApi.updateCardOrder(currentCard._id,currentCard)
        }
      }

    }
  };
  const openAddColumn = () => {
    setOpenAdd(!openAdd);
  };
  const handleSubmit = () => {
    if (!newTileColumns) {
      inputRef.current.focus();
      return;
    }
    const newColumn = {
      boardId: board._id,
      title: newTileColumns.trim(),
    };

    boardApi.createColumn(newColumn).then((res) => {
      const cloneColumn = [...columns];
      cloneColumn.push(res.data);
      let newBoard = { ...board };
      newBoard.columnOrder = cloneColumn.map((el) => el._id);
      newBoard.columns = cloneColumn;
      setColumns(cloneColumn);
      setBoard(newBoard);
      setNewTitleColumns("");
      setOpenAdd(false);
    });
  };
  const onUpdate = (data) => {
    const newColumns = [...columns];
    const idUpdate = newColumns.findIndex((c) => c._id == data._id);
    if (data.destroy==true) {
      newColumns.splice(idUpdate, 1);
    } else {
      newColumns.splice(idUpdate, 1, data);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((el) => el._id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };

  return (
    <div className="Board_column">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdate}
            />
          </Draggable>
        ))}
      </Container>
      <AddContainer className="trello-add-column">
        {!openAdd && (
          <Row>
            <Col className="Add-new-column" onClick={openAddColumn}>
              <i className="fa fa-plus " /> Add another column
            </Col>
          </Row>
        )}
        {openAdd && (
          <Row>
            <Col className="enter-add-new-column">
              <Form.Control
                ref={inputRef}
                className="input-add-new-column"
                size="sm"
                type="text"
                placeholder="Add new column"
                value={newTileColumns}
                onChange={handleChangeInput}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <Button
                className="enter_button"
                variant="success"
                onClick={handleSubmit}
              >
                Success
              </Button>
              <i onClick={openAddColumn} className="fa fa-times icon" />
            </Col>
          </Row>
        )}
      </AddContainer>
    </div>
  );
}
export default Board_Column;
