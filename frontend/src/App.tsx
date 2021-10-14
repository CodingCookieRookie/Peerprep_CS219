// import logo from './logo.svg';
import "./App.css";
import { Footer } from "./Components/Footer/footer";
import Landing from "./Pages/Home/landing";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login/login";

const App = () => {
  const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={()  => setToken} />
  // }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
