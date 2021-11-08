import React from "react";

const Question = (props: { title: string, image: string, description: string, testcases: any}) => {

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Question</title>
      <div className="question-set">
        <h3 className="question">{props.title}</h3>
        <div className="description pb-2">{props.description}</div>
        {props.image ? <img className="mb-3" width={300} height={200} src={`data:image/jpeg;base64,${props.image}`} alt="question_image" /> : null}
        <h5 className="mb-3"> Testcases</h5>
        <div className="input">
          {
          props.testcases.map((item, idx) => {
            return (
              <pre key={idx} style={{ fontSize: '12px'}}>
                <p style={{ marginBottom: '-2px'}}> <strong>Input:</strong>  {item.input} </p>
                <p >Output:  {item.output} </p>
              </pre>
            )
          })
          }</div>
      </div>
    </div>
  );
};

export default Question;