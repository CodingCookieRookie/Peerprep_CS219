import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";
import "./endInterviewModal.css";

const endInterviewMsg = `Congratulations, you have completed a PeerPrep interview session!
            Do continue to practice with PeerPrep and all the best for your technical interviews!`;

const EndInterviewModal = ({show, onHide}) => {

  const [draftReview, setDraftReview] = useState("");

  const handleSubmit = () => {
    
  }

  // return (
  //     <Modal
  //       show={show}
  //       onHide={onHide}
  //       // backdrop="static"
  //       keyboard={false}
  //       dialogClassName="modal-style"
  //     >
  //       <Modal.Header>
  //         <Modal.Title>End Session</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body className="modal-body" style={{width: "400px", height: "150px"}}>
  //         Congratulations, you have completed a PeerPrep interview session!
  //         Do continue to practice with PeerPrep
  //         and all the best for your technical interviews!
  //         <Form>
  //           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  //             <Form.Label>Email address</Form.Label>
  //             <Form.Control type="email" placeholder="name@example.com" />
  //           </Form.Group>
  //           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  //             <Form.Label>Example textarea</Form.Label>
  //             <Form.Control as="textarea" rows={3} />
  //           </Form.Group>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="primary" onClick={handleSubmit}>
  //           <BoxArrowInRight className="mb-1 me-1" />
  //           {" Submit "}
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  // );

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={() => onHide()}
      >
      <Modal.Header closeButton>
        <Modal.Title id="end_session">
          End Session
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <h5 className="mt-4 mb-5">{endInterviewMsg}</h5>
        <Form className="mt-5 mb-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Please give your peer review</Form.Label>
            <Form.Control as="textarea" rows={10} value={draftReview} onChange={(e) => setDraftReview(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          <BoxArrowInRight className="mb-1 me-1" />
            {" Submit "}
        </Button>
      </Modal.Footer>
      </Modal>
    </>
  );
};

export default EndInterviewModal;
