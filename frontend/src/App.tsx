// import logo from './logo.svg';
import "./App.css";
import { Footer } from "./Components/Footer/footer";
import Landing from "./Pages/Landing/landing";
import Interview from "./Pages/Interview/interview";
import { Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/SignUp/signup";
import Home from "./Pages/Home/home";

const loader = document.querySelector(".preloader");
const showLoader = () => loader != null && loader.classList.remove("preloader");
const addClass = () => loader != null && loader.classList.add("loader-hide");

const App = () => {
  useEffect(() => {
    showLoader();
    addClass();
  }, []);

  return (
    <>
      <div>
        <BrowserRouter>
          {/* <Switch> */}
          <Route exact path="/" component={() => <Landing />} />
          <Route
            path="/login"
            component={({ history }) => <Login history={history} />}
          />
          <Route path="/signup" component={() => <SignUp />} />
          <Route
            path="/home"
            component={({ history }) => <Home history={history} />}
          />
          {/* <Route path="/interview" component={() => <Interview/>} /> */}
          {/* </Switch> */}
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
