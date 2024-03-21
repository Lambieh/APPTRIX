import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "../../firebase.js";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function logIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const jwtToken = await data.user?.getIdToken();
        localStorage.setItem("key", JSON.stringify(jwtToken));
        navigate("/menu");
        setError("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setError("Sorry, не нашли ваш аккаунт");
      });
  }

  return (
    <form onSubmit={logIn} className="page_signin">
      <h2>Log in</h2>
      <input
        type="email"
        placeholder="Please enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Repeat password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit" className="style_button">
        Login
      </button>
      {error ? <div style={{ color: "red" }}>{error}</div> : ""}
      <Link to="/registration" className="link_style">
        Создать аккаунт
      </Link>
    </form>
  );
};

export default SignIn;
