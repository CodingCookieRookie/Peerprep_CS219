import { useCallback, useEffect, useState } from "react";
import "./chat.css";

const Chat = () => {
  const [value, setValue] = useState("");

  return (
    <form>
      <input />

      <button>Send</button>
    </form>
  );
};

export default Chat;
