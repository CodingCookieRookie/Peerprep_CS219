import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

const RegistrationModal = (prop: { status: boolean; errorMsg: string }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [spin, setSpin] = useState(false);

  return (
    <>
      <Button
        className="me-2"
        variant="primary"
        type="submit"
        disabled={prop.status}
        onClick={prop.errorMsg === "" ? handleShow : handleClose}
      >
        Register
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
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
    </>
  );
};

export default RegistrationModal;
