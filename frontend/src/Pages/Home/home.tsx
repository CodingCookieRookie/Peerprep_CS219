import Header from "../../Components/Header/header";
import "./home.css";
import home from "../../assets/home-welcome.svg";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Cursor, PersonSquare } from "react-bootstrap-icons";
import { DEV_API_URL } from "../../api";

const Home = (props: any) => {
  const [username, setUsername] = useState("");
  const [friendData, setfriendData] = useState([]);
  const [cookies] = useCookies(["userInfo"]);
  const history = useHistory();

  const getFriends = async (token) => {
    await fetch(DEV_API_URL + "/user-friend/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + token
      },
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          setfriendData(result.data);
        } else {
          setfriendData(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const userInfo = cookies.userInfo;

    getFriends(userInfo.token);
    // No record of session login
    if (!userInfo) {
      history.push("/");
    } else {
      // Set name
      const data = userInfo.user.username;
      setUsername(data);
    }
    
  }, [cookies.userInfo, history]);

  const difficultyData = [
    ["Easy", "success"],
    ["Medium", "primary"],
    ["Hard", "danger"],
  ];

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
        <Row>
          <Col sm={7}>
            <Card>
              <Card.Header className="bold">User Profile</Card.Header>
              <Card.Body>
                {/* <Card.Title>User Profile</Card.Title> */}
                <Card.Subtitle className="mb-3 text-muted">
                  {username}
                </Card.Subtitle>
                <Card.Text>
                  <strong> Rank: </strong>
                </Card.Text>
                <Card.Text>
                  <strong> XP: </strong>
                </Card.Text>
                <Card>
                  <Card.Header>Past matches</Card.Header>
                  <Card.Body>
                    <Card.Title>Primary Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title> Find a peer and get cracking! </Card.Title>
                <Card.Subtitle
                  className="mt-2 mb-3 text-muted"
                  style={{ fontSize: 14 }}
                >
                  Simply pick a question based on the difficulty you're pitting
                  yourself up against and we will match you with someone who's
                  just as determined and skilled as you!
                </Card.Subtitle>
                <Card.Text>
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
                        <Button className="my-2" variant={item[1]} key={idx} >
                          <Cursor className="mb-1 me-1" />
                          {item[0]}
                          <br />
                        </Button>
                      );
                    })}
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Friend List</Card.Header>
                  <Card.Body className="d-grid gap-2">
                    <ListGroup>
                    {friendData.map((item, idx) => {
                      return (
                        <ListGroup.Item action variant="primary" className="my-2" key={idx} >
                          <PersonSquare className="mb-1 me-2" />
                          {"  " + item.friend_username}
                          <br />
                        </ListGroup.Item>
                      );
                    })}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* </Container> */}
        {/* <section className="centering">
          <div className="container landing-center">
            <img className="home-img-style mb-4" src={home} alt="logo" />
            <h1>PeerPrep</h1>
            <p>
              Acing technical interviews, <strong>together</strong>
            </p>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Home;
