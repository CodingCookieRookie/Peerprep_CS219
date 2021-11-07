import { Button, Modal } from "react-bootstrap";
import LoadingModal from "../LoadingModal/loadingmodal";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { MATCH_URL } from "../../api";


// Small popup for matching with a friend
const RequestModal = ({ show, onHide, friend, qnTitle }) => {

  const [cookies] = useCookies(["userInfo"]);
  const history = useHistory();
  const [myUsername, setMyUsername] = useState();

  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    if (!myUsername) {
      const myUsernameFromCookies = cookies.userInfo.user.username;
      setMyUsername(myUsernameFromCookies);
    }
  }, [setMyUsername, cookies.userInfo.user.username, myUsername])

  useEffect(() => {
    if (connected === false && myUsername) {
      const sock = io(MATCH_URL);
      setSocket(sock);
      setConnected(true);
    }
  }, [connected, myUsername, socket, setSocket]);

  const acceptInterview = () => {
      socket.emit(`@friend_match`, {
          accept: true,
          questionTitle: qnTitle,
          receiver: myUsername,
          requester: friend
      })
      var sessionId = friend < myUsername
        ? `${friend}-${myUsername}`
        : `${myUsername}=${friend}`;

      onHide();
      history.push(`/interview/${sessionId}/${qnTitle}`);
  }

  const declineInterview = () => {
      socket.emit(`@friend_match`, {
          receiver: myUsername,
          requester: friend,
          accept: false
      });
      onHide();
  }

  return (
    <>
        <Modal 
            show={show}
            onHide={() => onHide()}
            backdrop="static"
            keyboard={false}
        >
        <Modal.Header>
            <Modal.Title>{`Incoming interview request from ${friend}!`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="primary" onClick={acceptInterview}>
            {"Yes"}
            </Button>
            <Button variant="danger" onClick={declineInterview}>
            {"No"}
            </Button>
        </Modal.Body>
        </Modal>
    </>
  );
};

export default RequestModal;
