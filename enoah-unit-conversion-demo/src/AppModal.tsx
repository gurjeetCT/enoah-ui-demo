import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AppModalProps } from './Utility/CommonProps';
import { useState } from 'react';

function AppModal(modalContent:AppModalProps) {    
 const [isShow, SetisShow] = useState(modalContent.isShow);
  return (    
    <Modal show={isShow}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalContent.content}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>modalContent.handleShow()}>Close</Button>          
        </Modal.Footer>
      </Modal.Dialog>
      </Modal>

  );
}

export default AppModal;