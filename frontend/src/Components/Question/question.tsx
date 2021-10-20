import React from "react";

const Question = (props: any) => {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Question</title>
          <div className="question-set" >
            <h3 className="question">
                {props.title}
            </h3>
            <div className="description">
                {props.description}
            </div>
            <img src={props.image} alt={props.title} width={300} height={200} />
            <div className="input"> 
                {props.testInput}
            </div>
            <div className="output">
                {props.testOutput}
            </div>
        </div>
      </div>
    );
  }

export default Question;