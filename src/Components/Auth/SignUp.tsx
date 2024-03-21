import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== copyPassword) {
      setError("Password didn`t match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
        navigate("/login");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form onSubmit={register} className="page_signUp">
        <h2>Create an account</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat your password"
          value={copyPassword}
          onChange={(event) => setCopyPassword(event.target.value)}
        />
        <button className="style_button">Create</button>
        {error ? <div style={{ color: "red" }}>{error}</div> : ""}
      </form>
    </div>
  );
};

export default SignUp;
