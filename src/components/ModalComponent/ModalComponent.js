import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalComponent.css'

function ModalTemplate({ title, content, openModal, closeModal, onClick }) {
  return (
    <>
      <Modal show={openModal} onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onClick}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTemplate;