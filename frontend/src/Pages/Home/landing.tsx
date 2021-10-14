import Header from "../../Components/Header/header";
import "./landing.css";
import logo from "../../assets/collaboration.svg";
import { Accordion, Button } from "react-bootstrap";

const Landing = (props: any) => {
  return (
    <div className="content">
      <Header></Header>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                How is the pair matching done?
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Landing;
