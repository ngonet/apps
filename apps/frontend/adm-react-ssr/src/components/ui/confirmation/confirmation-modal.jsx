import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

export const ConfirmationModal = ({ show, setShow, title, onConfirm }) => {
  if (!show) return null;

  const handleConfirm = () => {
    onConfirm(true);
    setShow(false);
  };

  const handleCancel = () => {
    onConfirm(false);
    setShow(false);
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">
          <h5>
            <i className="fa fa-info-circle" /> Advertencia: eliminación de registro
          </h5>
          <p>¡Advertencia! Esta acción eliminará el registro de forma permanente. ¿Estás seguro?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="white" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
