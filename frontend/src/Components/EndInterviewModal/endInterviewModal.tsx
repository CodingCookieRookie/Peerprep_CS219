import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";
import "./endInterviewModal.css";
import feedback from "../../assets/feedback.svg";
import { USER_API_URL } from "../../api";
import { useCookies } from "react-cookie";

const endInterviewMsg = `Congratulations, you have completed a PeerPrep interview session!
            Keep up the good work!`;

const EndInterviewModal = ({ show, onHide }) => {
  const [draftReview, setDraftReview] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  const history = useHistory();

  const handleSubmit = () => {

    //return to homepage
    history.push("/home");
  };

  const addFriend = () => {
    setIsFriend(true);
    console.log(isFriend)
  }

  const removeFriend = () => {
    setIsFriend(false);
    console.log(isFriend)
  }

  const createFriend = async () => {

    var token; // to assign
    var uname; // to assign
    if (isFriend) {
      await fetch(USER_API_URL + `/user-friend/user2/${uname}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
        .then(async (res) => {
          var result = await res.json();
          if (res.status === 201) {
            console.log("Friend added succesfully!")
          }
        })
        .catch((err) => {
          console.log(err);
        }); 
    }
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
      <Modal size="lg" show={show} onHide={() => onHide()}>
        <Modal.Header closeButton>
          <Modal.Title id="end_session">End Session</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-5">
        <div className="text-center">
          <img
            className="center mb-1"
            src={feedback}
            alt="feedback"
            width={250}
            height={250}
          />
          </div>
          <h5 className="mt-4 mb-3">{endInterviewMsg}</h5>
          <Form className="mt-2 mb-3">
            <Form.Group
              // className="mb-2"
              // controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Rate how well your peer has fared!</Form.Label>
              <br/>
              <div className="mb-2" style={{marginLeft: '-2px'}}>
              <Rating
                fractions={2}
                onHover={(rate) => {
                  // check if rendered in DOM first
                  if (document.getElementById('label-quiet-onrate')) {
                    document.getElementById('label-quiet-onrate').innerHTML = String(rate) || '';
                  }
                }}/>
                </div>
                <Form.Label>Are you willing to add your fellow peer as <strong>friend</strong> to tackle questions together in the future?</Form.Label>
                <br/>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="Yes"
                    name="group1"
                    type="radio"
                    id={`inline-radio-1`}
                    onClick={addFriend}
                  />
                  <Form.Check
                    inline
                    label="No"
                    name="group1"
                    type="radio"
                    id={`inline-radio-2`}
                    onClick={removeFriend}
                  />
                </div>
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
