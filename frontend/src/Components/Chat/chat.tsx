import { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import io from 'socket.io-client';
import {Button, TextField, Chip, Typography} from '@material-ui/core';
import "./chat.css";

const Chat = (props: any) => {
  const sessionId = props.sessionId;
  const username = props.username;
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const s = io("http://localhost:5002", {
      path: '/chat/new',
      forceNew: true,
    });
    if (connected === false) {
      setMessages((history) => [...history, {sender: 'system', text: '-- Connected --'}])
    }
    s.on(sessionId, (msg) => {
      console.log(`Msg recvd ${msg.text}`)
      setMessages((history) => [...history, msg]);
    });
    setSocket(s);
    setConnected(true);
    return () => {
      s.disconnect();
    };
    
  }, [sessionId, connected])

  const sendMessage = () => {
    if (draft !== '') {
      console.log(`Emitted ${sessionId} ${username} ${draft}`);
      socket.emit('new-message', {
        interviewId: sessionId,
        newMsg: {
          sender: username,
          text: draft,
        }
      });
      setDraft('');
    }
  }

  const msgOnChange = (e) => {
    setDraft(e.target.value);
  }


  return (
    <>
      <ReactScrollToBottom className="chat-message-container">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.sender === username
                ? 'chat-right'
                : 'chat-left'
            }
          >
            <Typography
              variant="caption"
              style={{ textTransform: 'capitalize' }}
              color="textSecondary"
            >
              {m.sender}
            </Typography>
            <Chip label={m.text} />
          </div>
        ))}
      </ReactScrollToBottom>
      <div className="chat-text-field">
        <TextField
          fullWidth
          size="small"
          value={draft}
          type="text"
          name="message"
          placeholder="Message"
          variant="outlined"
          onChange={msgOnChange}
          onKeyUp={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        />
        <Button
          onClick={sendMessage}
          type="submit"
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chat;
