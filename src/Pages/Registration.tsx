import { Link } from "react-router-dom";
import SignUp from "../Components/Auth/SignUp";
import "./Registration.css";

const Registration = () => {
  return (
    <div className="registration_page">
      <SignUp />
      <Link to="/login" className="link_style">
        Назад
      </Link>
    </div>
  );
};

export default Registration;
