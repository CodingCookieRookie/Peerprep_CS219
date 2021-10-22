import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];


const Editor = () => {
  const [socket, setSocket] = useState<any>("");
  // const socket = useSocketIo();
  const [quill, setQuill] = useState<any>();
  const { interviewId: interviewId } = useParams<any>();

  useEffect(() => {
    const s = io("http://localhost:4001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null ) return
    socket.once("load-editor", document => {
      quill.setContents(document)
      quill.enable()
    })
  }, [socket, quill, interviewId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta)
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // return (
  //   <div>
  //     <ReactQuill theme="snow" value={value} onChange={setValue} />
  //   </div>
  // );
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    // q.disable()
    // q.setText("Loading...")
    setQuill(q)
  }, [])
  return <div className="container" ref={wrapperRef}></div>
};



export default Editor;
