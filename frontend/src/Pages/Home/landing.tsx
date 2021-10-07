import Header from '../../Components/header'
import './landing.css'
import logo from '../../assets/collaboration.svg'
import { Accordion, Button } from 'react-bootstrap'


const Landing = (props:any) => {
    return (
        <div>
            <Header></Header>
            {/* landing content */}
            <div className="centering">
                <div className="container center">
                    <img className="img-style" src={logo} alt="logo" />
                    <h1>PeerPrep</h1>
                    <p>Acing technical interviews, <strong>together</strong></p>
                    <Button href="#signup" variant="outline-primary" size="sm" >Sign up here!</Button>
                </div>
                <hr />
                <h2 className="center">Details</h2>
                <div>
                <Accordion className="centering" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What do I gain out of this?</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How is the pair matching done?</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>
            </div>
            {/* footer  */}
            <footer className="p-5 bg-dark text-white text-center footer">
                <div className="container">
                    <p className="lead">Copyright &copy; CS3219 Team G23</p>
                    <a href="#home" className="position-absolute bottom-0 end-0 p-5">
                        <i className="bi bi-arrow-up-circle text-warning h1"></i>
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Landing;
