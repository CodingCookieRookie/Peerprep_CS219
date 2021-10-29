import { Button, Modal } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

// Make reusable component
const RegistrationModal = ({show, onHide}) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your account has been created successfully. Now head over to the Login
        page to access PeerPrep.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" href="/login">
          <BoxArrowInRight className="mb-1 me-1" />
          {" Login "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationModal;
