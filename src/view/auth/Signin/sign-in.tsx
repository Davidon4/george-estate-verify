import { useState } from "react";
import { signIn } from "../../../firebase_setup";
import { useNavigate } from "react-router-dom";
import "./styles.css"

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signIn({email, password});
    if (typeof res === "object" && res.error) {
        setError(res.error);
      } else {
        navigate("/dashboard");
        setError("");
      }

      setEmail("");
      setPassword("");
  };
  return (
    <>
    <div className="background-image">
    <div className="content">
      {error ? <div className="error">{error}</div> : null}
      <form onSubmit={handleSubmit}>
      <h1>Login to your account</h1>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      </div>
      </div>
    </>
  );
};

export default Signin;