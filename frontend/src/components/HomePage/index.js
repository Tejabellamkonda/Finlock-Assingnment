import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Home = () => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <p>Lets Connect to your workspace</p>
      <p className="text">Please enter your Email to continue</p>
    </div>
  );
};

export default Home;
