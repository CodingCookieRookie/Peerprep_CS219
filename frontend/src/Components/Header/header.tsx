import { Navbar, Button } from "react-bootstrap";
import "./header.css";

const Header = (props: any) => {
  return (
    <header>
      <Navbar className="header" bg="light" expand="lg">
        <Navbar.Brand href="#">PeerPrep</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end">
          <Button href="#login" variant="outline-success">
            Login
          </Button>
          <Button href="#signup" variant="outline-primary">
            Sign up
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
