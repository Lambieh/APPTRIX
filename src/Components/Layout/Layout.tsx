import { Outlet } from "react-router-dom";
import "./Layout.css";
import { Header } from "../Header/Header";

export const Layout = () => {
 
  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
