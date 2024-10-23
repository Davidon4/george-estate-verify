import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const App = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the George Crescent Verify</h1>
      {authContext && authContext.user ? (
        <div>
          <p>Logged in as: {authContext.user.email}</p>
          <Link to="/dashboard">Go to Dashboard</Link>
          <Link to="/code-verify">Verify Code</Link>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default App;