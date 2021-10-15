// import logo from './logo.svg';
import "./App.css";
import { Footer } from "./Components/Footer/footer";
import Landing from "./Pages/Home/landing";
import Interview from "./Pages/Interview/interview";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={()  => setToken} />
  // }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/interview">
            <Interview />
          </Route>
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
