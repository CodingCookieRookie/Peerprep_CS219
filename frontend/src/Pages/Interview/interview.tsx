import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Editor from "../../Components/Editor/editor"
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import './interview.css'

const editorSocket = io('http://localhost:5001');
const chatSocket = io('http://localhost:5002');

const Interview = () => {

  const onClickEndSession = () => {
    console.log("End session");
  }

  return (
      <Container >
        <div>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={{ textTransform: 'capitalize' }}
          >
            Interview
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ textTransform: 'capitalize' }}
          >
            Difficulty: {"FAKE_DIFFICULTY"}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ textTransform: 'capitalize' }}
          >
            Peer: {"FAKE_NAME"}
          </Typography>
        </div>
        <div>
          <Button
            style={{width: 140}}
            variant="contained"
            color="secondary"
            onClick={onClickEndSession}
          >
            End Session
          </Button>
        </div>
        <div className="interview-panel" style={{paddingTop: '20px'}}>
          <Editor />
          {/* <Chat /> */}
        </div>
      </Container>
  );
}

export default Interview;
