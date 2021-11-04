// import logo from './logo.svg';
import "./App.css";
import { Footer } from "./Components/Footer/footer";
import Landing from "./Pages/Landing/landing";
import Interview from "./Pages/Interview/interview";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/SignUp/signup";
import Home from "./Pages/Home/home";
import Loading from "./Pages/Loading/loading";
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
          {/* <Switch> */}
          <Route exact path="/" component={() => <Landing />} />
          {/* <Route
            exact path="/loading"
            component={() => <Interview isRed={false} />}
          /> */}
          <Route
            path="/login"
            component={({ history }) => <Login history={history} />}
          />
          <Route path="/signup" component={() => <SignUp />} />
          <Route
            path="/home"
            component={({ history }) => <Home history={history} />}
          />
          {/* interview id shall replace uuid */}
          {/* <Route 
            path="/interview" exact
          >
            <Redirect to={`/interview/${uuidV4()}`} />
          </Route> */}
          <Route
            path="/interview/:interviewId/:title"
            component={() => <Interview />}
          />
          {/* <Route path="/interview/" component={() => <Interview />} /> */}

          {/* </Switch> */}
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
