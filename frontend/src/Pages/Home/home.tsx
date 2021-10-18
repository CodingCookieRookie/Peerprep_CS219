import Header from "../../Components/Header/header";
import "./home.css";
import home from "../../assets/home-welcome.svg";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Home = (props: any) => {
  const [username, setUsername] = useState("");
  // const [userData, setUserData] = useState();
  const [cookies] = useCookies(["userInfo"]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = cookies.userInfo;

    // No record of session login
    if (!userInfo) {
      history.push("/");
    } else {
      // Set name
      const data = userInfo.user.username;
      setUsername(data);
    }
  }, [cookies.userInfo, history]);

  return (
    <div className="content">
      <Header isSignedIn={true}></Header>
      <div className="p-4">
        <h1 className="pt-1 ms-3 text-primary">Welcome, {username} </h1>
        <h4 className="pt-1 ms-3">
          {" "}
          <em> What's on your mind today? </em>
        </h4>
        {/* landing content */}
        <section className="centering">
          <div className="container landing-center">
            <img className="home-img-style mb-4" src={home} alt="logo" />
            <h1>PeerPrep</h1>
            <p>
              Acing technical interviews, <strong>together</strong>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
