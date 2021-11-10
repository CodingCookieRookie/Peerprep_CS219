import Header from "../../Components/Header/header";
import "./landing.css";
import logo from "../../assets/collaboration.svg";
import { Accordion, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { API_HEADERS, QNS_API_URL } from "../../api";

const QuestionImage = ({ image }) => (
  <img src={`data:image/jpeg;base64,${image}`} alt="question_image" />
);

const Landing = () => {
  const history = useHistory();
  const [cookies] = useCookies(["userInfo"]);
  const [image, setImage] = useState(null);

  // sample handler method for parsing image;
  const getQuestion = async () => {
    await fetch(QNS_API_URL + "/questions/", {
      method: "GET",
      headers: API_HEADERS,
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          var question = result.data[0];
          console.log(question);
          setImage(question.image);
        } else {
          return result.message;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestion();
    const userInfo = cookies.userInfo;

    if (userInfo) {
      history.push("/home");
    }
  }, [cookies.userInfo, history]);

  return (
    <div className="content">
      <Header isSignedIn={false}></Header>
      {/* landing content */}
      <section className="centering">
        <div className="container landing-center">
          <img className="img-style" src={logo} alt="logo" />
          <h1>PeerPrep</h1>
          <p>
            Acing technical interviews, <strong>together</strong>
          </p>
          <Button href="/signup" variant="outline-primary" size="sm">
            Sign up here!
          </Button>
        </div>
        <hr />
        <h2 className="landing-center">Details</h2>
        <div>
          <Accordion className="p-4" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What do I gain out of this?</Accordion.Header>
              <Accordion.Body>
                With Peerprep, you are match with like-minded users to practise
                technical interview questions together. You can make use of this
                platform to learn from one another and sharpen your skills
                before you interview with your dream company. Our platform
                provides a rich question bank for you to choose, with different
                difficulty levels ranging from easy to hard!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                How is the pair matching done?
              </Accordion.Header>
              <Accordion.Body>
                Matching is done using a <i>xp</i> point system. We will try to
                match you with a user with <i>xp</i> points that are close
                to yours. This way, you are likely to be matched with somone
                that has an equal skillset, and thus maximising the opportunity
                to learn from each other!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Landing;
