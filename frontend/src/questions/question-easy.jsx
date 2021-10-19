import React from "react";
import qns from "./easy-ibt.png";

const QuestionEasy = () => {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Question</title>
          <h3 className="post-title">Invert Binary Tree</h3>
          <div className="post-sum">
            Given a root of a binary tree, invert the binary tree.
          </div>
          <img src={qns} alt="Invert Binary Tree" width={300} height={200} />
          <div className="input"> 
            Input: root = [1 2 3 4 5 6 7]
          </div>
          <div className="output">
            Output: root = [1 3 2 7 6 5 4]
          </div>
          <div className="post">
            <pre className="prettyprint nicefont">{"                            "}</pre>
          </div>
      </div>
    );
  }

export default QuestionEasy;