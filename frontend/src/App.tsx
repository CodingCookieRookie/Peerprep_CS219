// import logo from './logo.svg';
import "./App.css";
import { Footer } from "./Components/Footer/footer";
import Landing from "./Pages/Home/landing";
import Interview from "./Pages/Interview/interview";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/SignUp/signup";


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
