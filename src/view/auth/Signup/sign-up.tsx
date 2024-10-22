import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../../firebase_setup";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [houseType, setHouseType] = useState<string>("");
  const [block, setBlock] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [error, seterror] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const houseNumberParsed = Number(houseNumber);

      setEmail("");
      setPassword("");
      setFullName("");
      setHouseNumber("");
      setHouseType("");
      setBlock("");
      setColor("");

      const res = await signUp({email, password, fullName, houseNumber: houseNumberParsed, houseType, block, color});
      if (typeof res === "object" && res.error) {
        seterror(res.error); // Set the error message if there's an error
      } else {
        // Handle successful login (if necessary)
        seterror(""); // Clear any previous error
      }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <div>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="fullName"
            value={fullName}
            placeholder="Full Name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="number"
            name="houseNumber"
            value={houseNumber}
            placeholder="House Number"
            required
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <input
            type="text"
            name="houseType"
            value={houseType}
            placeholder="House Type"
            required
            onChange={(e) => setHouseType(e.target.value)}
          />
          <input
            type="text"
            name="block"
            value={block}
            placeholder="Block"
            required
            onChange={(e) => setBlock(e.target.value)}
          />
          <input
            type="text"
            name="color"
            value={color}
            placeholder="House Color"
            required
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          already registered? <Link to="/sign-in">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;