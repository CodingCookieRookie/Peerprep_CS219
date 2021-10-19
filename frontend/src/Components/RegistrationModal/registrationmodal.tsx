import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

/** If time permits, find a way to pass props from Formik in Registration to this Modal */

const RegistrationModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
          <Button variant="primary">
            <BoxArrowInRight />
            {"Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegistrationModal;
