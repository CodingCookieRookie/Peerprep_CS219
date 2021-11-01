import Header from "../../Components/Header/header";
import "./home.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Cursor, PersonSquare } from "react-bootstrap-icons";
import { DEV_API_URL , PROD_API_URL, DEV_MATCH_API_URL, PROD_MATCH_API_URL, PROD_MATCH_URL } from "../../api";
import LoadingModal from '../../Components/LoadingModal/loadingmodal';
import SelectInput from "@material-ui/core/Select/SelectInput";
import PastMatch from "../../Components/PastMatch/pastmatch";
import io, { Socket }  from "socket.io-client";
import { userInfo } from "os";


const API_URL = PROD_API_URL || DEV_API_URL;
const MATCH_API_URL = PROD_MATCH_API_URL || DEV_MATCH_API_URL;
const MATCH_URL = PROD_MATCH_URL;

const Home = (props: any) => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);

  // const [spin, setSpin] = useState(false);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [friendData, setfriendData] = useState([]);
  const [cookies] = useCookies(["userInfo"]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = cookies.userInfo;
    // No record of session login
    if (!userInfo) {
      history.push("/");
    } else {
      // Set name
      const data = userInfo.user.username;
      setUsername(data);
      // console.log(userInfo.token)
      getFriends(userInfo.token);
    }
  }, [cookies.userInfo, history]);

  //METHOD WITH UseEffect
  useEffect(() => {
    if (connected === false && username) {
      const sock = io(MATCH_URL);
      sock.on(`match-found-${username}`, (result) => {
        console.log(`YOU ARE MATCHED WITH ... ${result.match} !!!`);
        history.push("/interview");
      });
      setSocket(sock);
      setConnected(true);
    }
  }, [socket, connected, username, history]);

  // METHOD WITH UseEffect
  // useEffect(() => {
  //   const s = io("https://match-6i7ougacoq-de.a.run.app");
  //   // console.log(s)
  //   setSocket(s);

  //   return () => {
  //     s.disconnect();
  //   };
  // }, []);
  // // console.log(socket)

  // useEffect(() => {
  //   if (socket == null) return;
  //   console.log(socket)

  //   socket.on(`match-found-${username}`, (msg) => {
  //     console.log("received");
  //     console.log(msg);
  //   });
  // }, [socket]);

  // METHOD WITHOUT UseEffect
  // const socket = io("https://match-6i7ougacoq-de.a.run.app");

  // socket.on("connect", () => {
  //   console.log("connected");
  // });

  // socket.on(`match-found-${username}`, (data) => {
  //   console.log("received");
  //   const match = JSON.parse(data);
  //   console.log(match.name);
  // });

  const handleClose = () => setShow(false);

  const getFriends = async (token) => {
    await fetch(API_URL + "/user-friend/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          // console.log(result)
          setfriendData(result.data);
        } else {
          setfriendData(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const difficultyData = [
    ["Easy", "success"],
    ["Medium", "primary"],
    ["Hard", "danger"],
  ];

  const navInterviewPage = async (difficulty) => {
    const userInfo = cookies.userInfo;
    const token = userInfo.token;
    const username = userInfo.user.username;

    setShow(true);
    // delete user match first
    await fetch(MATCH_API_URL + "/matches", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        console.log(result.message);
      })
      .catch((err) => {
        console.log(err);
      });

    // request for a match
    await fetch(MATCH_API_URL + "/matches", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        console.log(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
    // // LOADING, wait for match
    // setTimeout(() => {
    //   history.push('/interview')
    // }, 5000);
  };

  return (
    <div className="content">
      <Header isSignedIn={true}></Header>
      <div className="home">
        <section className="pb-1 mb-2">
          <h1 className="text-primary">Welcome, {username} </h1>
          <h4>
            {" "}
            <em> What's on your mind today? </em>
          </h4>
        </section>
        {/* landing content */}
        <LoadingModal show={show} onHide={handleClose} />
        <Row>
          <Col sm={7}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="fs-4 mb-3"> User Profile</Card.Title>
                <Card.Subtitle className="mt-2 mb-3 text-muted">
                  {username}
                </Card.Subtitle>
                <Card.Text>
                  <strong> Rank: </strong>
                </Card.Text>
                <Card.Text>
                  <strong> XP: </strong>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="">
              <Card.Body className="d-grid gap-2">
                <Card.Title className="fs-4 ">Past matches</Card.Title>
                <PastMatch />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={5}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="fs-4 mb-3">
                  {" "}
                  Find a peer and get cracking!{" "}
                </Card.Title>
                <Card.Subtitle
                  className="mt-2 mb-3 text-muted fw-light"
                  style={{ fontSize: 14 }}
                >
                  Simply pick a question based on the difficulty you're pitting
                  yourself up against and we will match you with someone who's
                  just as determined and skilled as you!
                </Card.Subtitle>
                <div className="d-grid gap-2 mb-3">
                  {difficultyData.map((item, idx) => {
                    return (
                      <Button className="my-2" variant={item[1]} key={idx}>
                        <Cursor className="mb-1 me-1" />
                        {item[0]}
                        <br />
                      </Button>
                    );
                  })}
                </div>
                <Card.Text className="lh-sm">
                  Upon the start of a successful pairing, users can work on a
                  problem together with a messaging panel and a coshared text
                  editor. The session can be terminated any time and your XP
                  will be weighted accordingly based on your peer's feedback of
                  you.
                </Card.Text>
                <Card border="light">
                  <Card.Header>Get me PeerPrepped now!</Card.Header>
                  <Card.Body className="d-grid gap-2">
                    {difficultyData.map((item, idx) => {
                      return (
                        <Button
                          className="my-2"
                          variant={item[1]}
                          key={idx}
                          onClick={() => navInterviewPage(item[0])}
                        >
                          <Cursor className="mb-1 me-1" />
                          {item[0]}
                          <br />
                        </Button>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Friend List</Card.Header>
              <Card.Body className="d-grid gap-2">
                <ListGroup>
                  {friendData.map((item, idx) => {
                    return (
                      <ListGroup.Item
                        action
                        variant="primary"
                        className="my-2"
                        key={idx}
                      >
                        <PersonSquare className="mb-1 me-2" />
                        {"  " + item.friend_username}
                        <br />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
