// import logo from './logo.svg';
import "./App.css";
import { Footer } from "./Components/Footer/footer";
import Landing from "./Pages/Home/landing";
import Interview from "./Pages/Interview/interview";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/SignUp/signup";
// import { v4 as uuidV4 } from "uuid";

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
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            {/* <Redirect to={`interview/${uuidV4()}`} /> */}
            {/* <Route path="/interview/:interviewId"> */}
            <Route path="/interview">
              <Interview />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
