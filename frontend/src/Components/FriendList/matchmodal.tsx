import { Button, Modal } from "react-bootstrap";

// Small popup for matching with a friend
const MatchModal = ({ show, onHide, username }) => {
  
  const onRequestForMatch = () => {
      console.log(`You want to match with ${username}!`);
      onHide();
  }

  return (
    <Modal show={show} onHide={() => onHide()} >
      <Modal.Header>
        <Modal.Title>{`Match with friend ${username}?`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="primary" onClick={onRequestForMatch}>
          {"Yes"}
        </Button>
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
};

export default MatchModal;
