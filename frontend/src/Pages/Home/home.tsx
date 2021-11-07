import Header from "../../Components/Header/header";
import "./home.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Arrow90degUp, Cursor, PersonSquare } from "react-bootstrap-icons";
import LoadingModal from "../../Components/LoadingModal/loadingmodal";
import { USER_API_URL, MATCH_API_URL, MATCH_URL, QNS_API_URL, API_HEADERS } from "../../api";
import SelectInput from "@material-ui/core/Select/SelectInput";
import PastMatch from "../../Components/PastMatch/pastmatch";
import io, { Socket } from "socket.io-client";
import { userInfo } from "os";
import { stringify } from "querystring";
import { FriendList } from "../../Components/FriendList/friendlist";
import MatchModal from "../../Components/FriendList/matchmodal";
import RequestModal from "../../Components/FriendList/requestmodal";
import { createUniqueName } from "typescript";
import EndInterviewModal from "../../Components/EndInterviewModal/endInterviewModal";
import { NotifyHandler, NotifyComponent } from 'react-notification-component';
import beginner_knight from "../../assets/beginner_knight.svg";
import decent_knight from "../../assets/decent_knight.svg";
import pro_knight from "../../assets/pro_knight.svg";
import { Chip } from "@material-ui/core";



const API_URL = USER_API_URL;


const Home = (props: any) => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);
  // const [spin, setSpin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  var [friendData, setfriendData] = useState([]);
  const [cookies] = useCookies(["userInfo"]);
  const [token, setToken] = useState("");
  const [xp, setXp] = useState("");
  const [sticker, setSticker] = useState({level: '', logo: ''});
  const [isOnline, setIsOnline] = useState(false);
  const [pastMatches, setPastMatches] = useState([]);
  
  const [matchModalShow, setMatchModalShow] = useState(false);
  const [targetMatchUsername, setTargetMatchUsername] = useState();

  const [showPopupModal, setShowPopupModal] = useState(false);
  const [incomingRequestUsername, setIncomingRequestUsername] = useState();
  const [incomingRequestQnTitle, setIncomingRequestQnTitle] = useState();
  const history = useHistory();

  friendData = [
      {
        friend_username: "Test"
      },
      {
        friend_username: "Le Pioche"
      },
      {
        friend_username: "El Matador"
      },
      {
        friend_username: "El Nino"
      }
  ]
  

  const getPastMatchDetails = async (uname, token) => {
    // const uname = cookies.userInfo.user.username;
    await fetch(USER_API_URL + `/user/profile/${uname}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        var result = await res.json();
        var data = result.data;
        if (res.status === 200) {
          setPastMatches(data.interviews)
          console.log(result.message)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }  

  const getUserMatchDetails = async () => {
    
    const uname = cookies.userInfo.user.username;
    await fetch(MATCH_API_URL + `/matches/match/${uname}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        var result = await res.json();
        var data = result.data;
        setXp(data.xp);
        setIsOnline(data.isOnline);
        setSticker(handleSticker(data.xp))
        console.log(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserProfile = async (matchedUsername, questionTitle) => {
    await fetch(USER_API_URL + `/user/profile/interview/${username}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        partnerUsername: matchedUsername,
        question: questionTitle,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        console.log(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClose = async () => {
    setShow(false);
    await fetch(MATCH_API_URL + "/matches/match", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        username: username,
        isOnline: isOnline,
        wantsMatch: false,
        xp: xp,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        console.log(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

const addDeclinedNotification = () => {
    NotifyHandler.add(
      "Declined",         // Notification title
      "The other party is busy at the moment.",       // Message
      {
        time: 2,                     // Time how much notification will be shown; default - 2
        animationDelay: 0.3,         // Delay for notification animation; default - 0.3
        animationTimeFunc: 'linear', // Animation func; default - 'linear'
        position: 'RT',              // Position. Options - 'RT', 'RB', 'LT', 'LB'; default - 'RT'; ('RT' - Right Top, 'LB' - Left Bottom)
        hide: true,                  // Hide after time (default - 2); default - true
        progress: false               // Show progress line (timeline); default - true
      },             // Settings
      {
        width: 220,                      // Notification width; default - 220
        height: 54,                      // Notification height; default - 54
        mainBackground: '#ff0000',       // Background color; default - '#16a085'
        mainBackgroundHover: '#1abc9c',  // Background color on hover; default - '#1abc9c'
        mainBackgroundHoverTime: 0.2, 
      },             // Styles
      () => { },       // Callback on click
      () => { }        // Callback on time end
    )
  }

  const onClickMatchFriend = (username: String) => {
    console.log(`On click match friend with ${username}`);
    setTargetMatchUsername(username);
    setMatchModalShow(true);
  }

  const handleSticker = (xp) => {
    var level;
    var logo;
    if (xp < 2000) {
      level = "Beginner"
      logo = beginner_knight;
    } else if (xp < 20000) {
      level = "Intermediate"
      logo = decent_knight
    } else {
      level = "Master"
      logo = pro_knight
    }
    return { level, logo }
  }

  const difficultyData = [
    ["Easy", "success"],
    ["Medium", "primary"],
    ["Hard", "danger"],
  ];

  useEffect(() => {
    const userInfo = cookies.userInfo;
    
    // No record of session login
    if (!userInfo) {
      history.push("/");
    } else {

      // Get params
      const uname = userInfo.user.username;
      const localToken = userInfo.token

      setUsername(uname);
      setToken(localToken);
      getUserMatchDetails();
      getPastMatchDetails(uname, localToken);

    }
  }, [cookies.userInfo, history, token, username]);

  // connect to match socket
  useEffect(() => {
    if (connected === false && username) {
      const sock = io(MATCH_URL);
      sock.on(`match-found-${username}`, (result) => {
        const matchedUsername = result.match;
        const questionTitle = result.questionTitle;
        console.log(`YOU ARE MATCHED WITH ... ${matchedUsername} !!!`);
        var sessionId = "";
        if (matchedUsername < username) {
          sessionId = matchedUsername + "-" + username;
        } else {
          sessionId = username + "-" + matchedUsername;
        }
        console.log("SESSION ID IS: " + sessionId);
        history.push(`/interview/${sessionId}/${questionTitle}`);
        updateUserProfile(matchedUsername, questionTitle)
        sock.disconnect();
      });
      sock.on(`${username}@incoming_request`, (result) => {
        console.log("Received!" + result);
        //pop up modal to join interview
        setIncomingRequestUsername(result.requester);
        setIncomingRequestQnTitle(result.qnTitle);
        setShowPopupModal(true);
        sock.disconnect();
      })
      setSocket(sock);
      setConnected(true);
    }
  }, [socket, connected, username, history]);

  

  // const renderStickers = (xp) => {
  //   if (xp < levels[0]) {
  //     return 
  //   }
  // }

  const navInterviewPage = async (qnDifficulty) => {

    setShow(true);

    // Get a random question and its information
    const qnTitle = await fetch(QNS_API_URL + `/questions/difficulty/${qnDifficulty.toLowerCase()}`, {
      method: "GET",
      headers: API_HEADERS
    }).then(async (res) => {
      var result = await res.json();
      return result.data.title;
    }).catch((err) => {
      console.log(err);
      return null; // TODO: require error handling
    });

    if (qnTitle === null || qnTitle === undefined) {
      console.log("Something went wrong.");
      setShow(false);
    } else {

      console.log(`Title = ${qnTitle}\n`);
      
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
          questionTitle: qnTitle, // add qn info
          questionDifficulty: qnDifficulty
        }),
      })
        .then(async (res) => {
          var result = await res.json();
          console.log(result.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };

  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onClickEndSession = () => {
    console.log("End session");
    setShowModal(true);
  };


  const hideMatchModal = () => {
    setMatchModalShow(false);
  }


  return (
    <div className="">
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
        <NotifyComponent maxNotify={ 2 } />  
        <LoadingModal show={show} onHide={handleClose} />
        <RequestModal show={showPopupModal} onHide={() => setShowPopupModal(false)} friend={incomingRequestUsername} qnTitle={incomingRequestQnTitle}/>
        <Row>
          <Col sm={7}>
            <Card className="mb-3 home-card">
              <Card.Body>
                <Card.Title className="fs-4 mb-3"> User Profile</Card.Title>
                <div className="d-flex">
                <div className="me-5 pe-5 flex-fill bd-highlight">
                <Card.Subtitle className="mt-2 mb-3 text-muted">
                  {username}
                </Card.Subtitle>
                <Card.Text>
                  <strong> Rank: </strong>
                </Card.Text>
                <Card.Text>
                  <strong> XP: </strong>
                </Card.Text>
                <Card.Subtitle className="mt-2 mb-3 text-muted">
                  {xp}
                </Card.Subtitle>
                </div>
                <div className="me-4" >
                <img
                    className="img-fluid"
                    src={sticker.logo} 
                    alt="logo"
                    width={110}
                    height={100}
                  />
                </div>
                </div>
              </Card.Body>
            </Card>
            <PastMatch pastMatches={pastMatches}/>
          </Col>
          <Col sm={5}>
            <Card className="mb-3 home-card">
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
                      <Button className="my-2" variant={item[1]} key={idx} onClick={() => navInterviewPage(item[0])}>
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
              </Card.Body>
            </Card>
            <MatchModal show={matchModalShow} onHide={hideMatchModal} username={targetMatchUsername} declinedCallback={addDeclinedNotification}/>
            <FriendList friendList={friendData} onClickCallback={onClickMatchFriend}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};


export default Home;