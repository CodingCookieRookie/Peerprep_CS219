import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

const RegistrationModal = (prop: { status: boolean; errorMsg: string }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [spin, setSpin] = useState(false);

  const handleSubmit = () => {
    
  }

  return (
    <>
      <Form className="form" onSubmit={handleSubmit} noValidate>
        
      </Form>
      <Button
        className="me-2"
        variant="danger"
        type="submit"
        disabled={prop.status}
        onClick={prop.errorMsg === "" ? handleShow : handleClose}
      >
        Submit Feedback
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>End Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations, you have completed a PeerPrep interview session! Do continue to practice with PeerPrep
          and all the best for your technical interviews!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" href="/home">
            <BoxArrowInRight className="mb-1 me-1" />
            {" Done "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegistrationModal;
