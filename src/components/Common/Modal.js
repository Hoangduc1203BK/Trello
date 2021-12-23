import React from "react";
import {Modal, Button} from 'react-bootstrap'
import HtmlParser from "react-html-parser";
import { MODAL_CLOSE,MODAL_CONFIRM } from "../../lib/constance/const";
function ModalComponent(props) {
    const {show,title, onAction,content} = props
  
    return (
        <Modal show={show} 
        onHide={()=>onAction('close')}
        backdrop="static"
        keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{HtmlParser(title)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{HtmlParser(content)}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>onAction(MODAL_CLOSE)}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>onAction(MODAL_CONFIRM)}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
export default ModalComponent;