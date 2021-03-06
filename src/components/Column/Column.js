import React, { useState, useRef, useEffect, useCallback } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";
import { mapOder } from "../../lib/lib";
import { cloneDeep } from "lodash";
import ModalComponent from "../Common/Modal";
import { MODAL_CONFIRM, MODAL_CLOSE } from "../../lib/constance/const";
import { getTitle, selectAllText } from "../../lib/handleInput";
import "./Column.scss";
import { columnApi } from "./Column.Shared/Column.Api";
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOder(column.cards, column.cardOrder, "_id");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [newTitleCard, setNewTitleCard] = useState();
  const [openAdd, setOpen] = useState(false);
  const addCardRef = useRef();
  useEffect(() => {
    setTitle(column.title);
  }, [column.title]);
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  function open() {
    setOpenModal(!openModal);
  }

  //Remove Column
  const onAction = (type) => {
    if (type == MODAL_CONFIRM) {
      const newColumn = { ...column, destroy: true };
      columnApi.updateColumn(newColumn._id, newColumn).then((res) => {
        onUpdateColumn(res.data);
      });
    }
    open();
  };

  //Update Column
  const handleBlur = () => {
    if (title !== column.title) {
      const newColumn = { ...column, title: title };
      columnApi.updateColumn(newColumn._id, newColumn).then((res) => {
        res.data.cards=newColumn.cards
        onUpdateColumn(res.data);
      });
    }
  };

  //Add Card
  const openAddCard = () => {
    setOpen(!openAdd);
  };
  const handleSubmit = () => {
    if (!newTitleCard) {
      addCardRef.current.focus();
      return;
    }
    const newCard = {
      boardId: column.boardId,
      columnId: column._id,
      title: newTitleCard,
    };

    columnApi.createCard(newCard).then((res) => {
      const cloneListCard = cloneDeep(column);
      cloneListCard.cards.push(res.data);
      cloneListCard.cardOrder.push(res.data._id);
      onUpdateColumn(cloneListCard);
      setNewTitleCard("");
      openAddCard(!openAdd);
    });
  };
  const handleChangeInput = (e) => {
    setNewTitleCard(e.target.value);
  };
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="title_column">
          <Form.Control
            className="header-editor"
            size="sm"
            type="text"
            value={title}
            spellCheck="false"
            onChange={changeTitle}
            onClick={selectAllText}
            onBlur={handleBlur}
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={getTitle}
          />
        </div>
        <div className="dropDown_column">
          <Dropdown>
            <Dropdown.Toggle className="dropdown-btn" id="dropdown-basic" />
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item href="#/action-1" onClick={openAddCard}>
                Add Card...
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={() => open()}>
                Remove Card...
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Move all cards in this column
              </Dropdown.Item>
              <Dropdown.Item href="#/action-4">
                Archive all cards in this column
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <ul>
        <Container
          groupName="col"
          // onDragStart={e => console.log("drag started", e)}
          // onDragEnd={e => console.log("drag end", e)}
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          // onDragEnter={() => {
          // console.log("drag enter:", column._id);
          // }}
          // onDragLeave={() => {
          // console.log("drag leave:", column._id);
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {column.cards.map((card, index) => (
            <Draggable key={index}>
              <li>
                {card.image && (
                  <img
                    src={card.image}
                    onMouseDown={(e) => e.preventDefault()}
                    alt=""
                  />
                )}
                {card.title}
              </li>
            </Draggable>
          ))}
        </Container>
      </ul>
      <footer>
        {openAdd && (
          <div className="enter-add-new-card">
            <Form.Control
              ref={addCardRef}
              className="input-add-new-card text_area"
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Add new card"
              value={newTitleCard}
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
            <i onClick={openAddCard} className="fa fa-times icon" />
          </div>
        )}
        {!openAdd && (
          <div className="footer_action" onClick={openAddCard}>
            <i className="fa fa-plus icon" />
            Add another card
          </div>
        )}
      </footer>
      <ModalComponent
        show={openModal}
        title="Remove Column"
        onAction={onAction}
        content={`Do you want to remove all cards in <strong>${column.title}</strong>`}
      />
    </div>
  );
}
export default Column;
