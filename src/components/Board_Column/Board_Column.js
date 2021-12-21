import "./Board_Column.scss";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { initialValue } from "../../actions/InitialValue";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";
import { applyDrag } from "../../lib/lib";
import Column from "../Column/Column";
import {
  Container as AddContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
function Board_Column() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newTileColumns, setNewTileColumns] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const boardDB = initialValue.boards.find(
      (boards) => boards.id === "board-1"
    );
    if (boardDB) {
      setBoard(boardDB);
      boardDB.columns.sort((a, b) => {
        return (
          boardDB.columnOrder.indexOf(a.id) - boardDB.columnOrder.indexOf(b.id)
        );
      });
      const columnDB = boardDB.columns;
      setColumns(columnDB);
    }
  }, []);
  useEffect(() => {
    if (openAdd && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openAdd]);
  const handleChangeInput=useCallback((e)=>setNewTileColumns(e.target.value),[])
  if (isEmpty(board)) {
    return (
      <div className="error" style={{ paddingLeft: 10, color: "white" }}>
        Board is empty
      </div>
    );
  }

  const onColumnDrop = function (dropResult) {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((el) => el.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex != null || dropResult.addedIndex != null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((e) => e.id);
      setColumns(newColumns);
    }
  };
  const openAddColumn = () => {
    // newColumnRef.current.style.display = 'block'
    setOpenAdd(!openAdd);
  };
  const handleSubmit = () => {
    if(!newTileColumns){
      inputRef.current.focus();
      return
    }
    const newColumn={
      id:Math.random().toString(36).substr(2,5),
      boardId:board.id,
      title:newTileColumns.trim(),
      cardOrder:[],
      cards:[]
    }
    const cloneColumn=[...columns]
    cloneColumn.push(newColumn)
    let newBoard = { ...board };
    newBoard.columnOrder = cloneColumn.map((el) => el.id);
    newBoard.columns = cloneColumn;
    setColumns(cloneColumn);
    setBoard(newBoard);
    setNewTileColumns('')
    setOpenAdd(false)
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
            <Column column={column} onCardDrop={onCardDrop} />
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
                onKeyDown={e=> e.key==='Enter' && handleSubmit()}
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
