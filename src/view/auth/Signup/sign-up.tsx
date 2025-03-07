import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../../firebase_setup";
import "./styles.css"

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [houseType, setHouseType] = useState<string>("");
  const [block, setBlock] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const houseNumberParsed = Number(houseNumber);
    const phoneNumberParsed = Number(phoneNumber);

      setEmail("");
      setPassword("");
      setFullName("");
      setHouseNumber("");
      setPhoneNumber("");
      setHouseType("");
      setBlock("");
      setColor("");

      const res = await signUp({email, password, fullName, houseNumber: houseNumberParsed, phoneNumber: phoneNumberParsed, houseType, block, color});
      if (typeof res === "object" && res.error) {
        setError(res.error);
      } else {
        navigate("/dashboard");
        setError("");
      }
  };

  return (
    <>
    <div className="background-image">
    <div className="content">

        {error ? <div className="error">{error}</div> : null}
        <form onSubmit={handleSubmit}>
        <h1>Create your account</h1>
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
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Phone Number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
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
          <button type="submit">Register</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Signup;