import React,{useState,useRef,useEffect,useCallback} from "react";
import { Container, Draggable } from "react-smooth-dnd";
import {Dropdown, Form} from 'react-bootstrap'
import { mapOder } from "../../lib/lib";
import ModalComponent from "../Common/Modal"
import { MODAL_CONFIRM,MODAL_CLOSE } from "../../lib/constance/const";
import {getTitle, selectAllText} from "../../lib/handleInput"
import "./Column.scss";
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOder(column.cards, column.cardOrder, "id");
  const [openModal,setOpenModal] =useState(false)
  const [title,setTitle] =useState('') 
  useEffect(()=>{
    setTitle(column.title)
  },[column.title])
  const changeTitle=(e)=>{
    setTitle(e.target.value)
  }

  function open(){
    setOpenModal(!openModal);
  } 
   const onAction=(type)=>{
    if(type==MODAL_CONFIRM){
      const newColumn={...column,delete:true}
      onUpdateColumn(newColumn)
    }
    open()
  }
  const handleBlur=()=>{
    const newColumn={...column, title:title}
    onUpdateColumn(newColumn)
  }
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="title_column">
        <Form.Control
                className="header-editor"
                size="sm"
                type="text"
                value={title}
                spellCheck='false'
                onChange={changeTitle}
                onClick={selectAllText}
                onBlur={handleBlur}
                onMouseDown={e=> e.preventDefault()}
                onKeyDown={getTitle}
              />
        </div>
        <div className="dropDown_column">
          <Dropdown>
            <Dropdown.Toggle className="dropdown-btn" id="dropdown-basic"/>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item href="#/action-1">Add Card...</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={()=>open()}>Remove Card...</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Move all cards in this column</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Archive all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <ul>
        <Container
          groupName="col"
          // onDragStart={e => console.log("drag started", e)}
          // onDragEnd={e => console.log("drag end", e)}
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          // onDragEnter={() => {
          // console.log("drag enter:", column.id);
          // }}
          // onDragLeave={() => {
          // console.log("drag leave:", column.id);
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
        <div className="footer_action">
          <i className="fa fa-plus icon" />
          Add another card
        </div>
      </footer>
      <ModalComponent 
      show={openModal}
       title='Remove Column' 
       onAction={onAction}
       content={`Do you want to remove all cards in <strong>${column.title}</strong>`}/>
    </div>
  );
}
export default Column;
