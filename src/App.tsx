import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import "./App.css"

const App = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
<video autoPlay loop muted playsInline className="background-video">
  <source src="/gatevid.mp4" type="video/mp4" />
</video>
    <div className="content">
      <h1>Welcome to George Crescent Verify</h1>
      {authContext && authContext.user ? (
        <div className="loggedIn">
          <p>Logged in as: {authContext.user.email}</p>
          <Link to="/dashboard">Go to Dashboard</Link>
          <Link to="/code-verify">Verify Code</Link>
        </div>
      ) : (
        <div className="loggedIn">
          <p>You are not logged in.</p>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      )}
    </div>
    </>
  );
};

export default App;