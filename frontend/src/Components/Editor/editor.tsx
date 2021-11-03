import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: ["black", "cyan", "red", "white"] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const Editor = () => {
  const [socket, setSocket] = useState<any>("");
  const [quill, setQuill] = useState<any>();
  const { interviewId: interviewId } = useParams<any>();

  // connect to editor MS
  useEffect(() => {
    const s = io("https://editor-6i7ougacoq-de.a.run.app");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // to create editor
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-editor", (editor) => {
      quill.setContents(editor);
      quill.enable();
    });
    socket.emit("get-editor", interviewId);
  }, [socket, quill, interviewId]);

  // to save editor
  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      // console.log(quill.getContents())
      socket.emit("save-editor", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // to send changes
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

  // to receive changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // editor box
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText("Loading...");
    setQuill(q);
  }, []);
  return (
    <div className="ql-container">
      <div ref={wrapperRef} />
    </div>
  );
};

export default Editor;
