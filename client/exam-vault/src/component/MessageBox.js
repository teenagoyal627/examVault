
import {Modal,Button} from 'react-bootstrap'
import './MessageBox.css'
const MessageBox =({showModal,handleClose,title,body,handleConfirm})=>{

    return (
        <Modal show={showModal} onHide={handleClose}  >
        <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Okay
        </Button>
        </Modal.Footer>
        </Modal>
    )
}

export default MessageBox