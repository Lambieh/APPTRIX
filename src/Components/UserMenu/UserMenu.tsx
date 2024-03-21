import { useNavigate } from "react-router-dom";
import { persistor } from "../../Store";
import { Cart } from "../Cart/Cart";

export const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    persistor.purge();
    window.location.reload();
    navigate("/login");
  };
  return (
    <div className="nav_menu_right">
      <Cart/>
      <div onClick={handleLogout} className="link_style_layout">
        Выход
      </div>
    </div>
  );
};
