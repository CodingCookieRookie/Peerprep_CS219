import { Navbar, Button } from "react-bootstrap";
import "./header.css";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = (props: { isSignedIn: boolean }) => {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  const handleLogout = async () => {
    removeCookie("userInfo");
    history.push("/");
  };

  return (
    <header>
      <Navbar className="header" bg="light" expand="lg">
        <Navbar.Brand href="#">PeerPrep</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end">
          {!props.isSignedIn ? (
            <>
              <Button className="m-1" href="/login" variant="outline-success">
                Login
              </Button>
              <Button className="ml-1" href="/signup" variant="outline-primary">
                Sign up
              </Button>
            </>
          ) : (
            <Button
              className="m-1"
              variant="outline-primary"
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
