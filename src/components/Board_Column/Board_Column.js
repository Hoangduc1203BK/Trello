import "./Board_Column.scss";
import React, { useState, useEffect } from "react";
import { initialValue } from "../../actions/InitialValue";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";
import { applyDrag } from "../../lib/lib";
import Column from "../Column/Column";
function Board_Column() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
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
      <div className="Add-new-column">
        <i className="fa fa-plus icon" />
        Add another column
      </div>
    </div>
  );
}
export default Board_Column;
