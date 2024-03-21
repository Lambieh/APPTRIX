import { Link } from "react-router-dom";
import "./Header.css";
import { UserMenu } from "../UserMenu/UserMenu";
export const Header = () => {
  return (
    <header>
      <div className="container">
        <nav className="navigation">
          <ul className="navigation__menu_list">
            <Link to="/menu" className="link_style_layout">
              Меню
            </Link>
          </ul>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};
