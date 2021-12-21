import React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { mapOder } from "../../lib/lib";
import "./Column.scss";
function Column(props) {
  const { column, onCardDrop } = props;
  const cards = mapOder(column.cards, column.cardOrder, "id");
  // const onCardDrop=(columnId,dropResult)=>{
  //     console.log(dropResult);
  // }
  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
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
              {" "}
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
    </div>
  );
}
export default Column;
