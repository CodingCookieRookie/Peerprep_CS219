import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./editor.css";

const Editor = () => {
  const [value, setValue] = useState('')

  return (
  <div>
    <ReactQuill theme="snow" value = {value} onChange={setValue} />
  </div>
  );
};

export default Editor;
