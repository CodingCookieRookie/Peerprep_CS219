import React from "react";
import Button from "@material-ui/core/Button";
import Editor from "../../Components/Editor/editor";
import Chat from "../../Components/Chat/chat";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Question from "../../Components/Question/question";
import * as qns from "../../questions/question-easy";
import "./interview.css";
import EndInterviewModal from "../../Components/EndInterviewModal/endInterviewModal";

const Interview = (props:any) => {

  const [cookies] = useCookies(["userInfo"]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const userInfo = cookies.userInfo;
    console.log(`userInfo.username = ${userInfo.user.username}`);
  });

  const onClickEndSession = () => {
    console.log("End session");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  }

  return (
    <>
      <Container className="main-container">
        <div>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={{ textTransform: "capitalize" }}
          >
            Interview
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ textTransform: "capitalize" }}
          >
            Difficulty: {"FAKE_DIFFICULTY"}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ textTransform: "capitalize" }}
          >
            Peer: {"FAKE_NAME"}
          </Typography>
        </div>
        <div>
          <Button
            style={{ width: 140 }}
            variant="contained"
            color="secondary"
            onClick={onClickEndSession}
          >
            End Session
          </Button>
        </div>
        <EndInterviewModal show={show} onHide={handleClose} />
        <div className="interview-panel" style={{ paddingTop: "20px" }}>
          <div className="left-panel">
            <Card style={{ display: "flex", flex: 1, marginBottom: 16 }}>
              <CardContent
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div className="interview-question-container">
                  <Question
                    title={qns.title}
                    description={qns.description}
                    image={qns.image}
                    testInput={qns.testInput}
                    testOutput={qns.testOutput}
                  />
                </div>
              </CardContent>
            </Card>
            <Card style={{ display: "flex", flex: 3, height: "5in" }}>
              <CardContent
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <h3>Chat</h3>
                <Chat
                  username={cookies.userInfo.user.username}
                  sessionId="TO_ADD_SESSION_ID"
                />
              </CardContent>
            </Card>
          </div>
          <div className="right-panel">
            <Card style={{ display: "flex", flex: 7, height: "10.51in" }}>
              <CardContent style={{ width: "9in" }}>
                <Editor />
              </CardContent>
            </Card>
          </div>
          <div style={{ paddingBottom: "20px" }} />
        </div>
      </Container>
    </>
  );
};

export default Interview;
