import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Cart.css";
import { RootState } from "../../Store";

 export const Cart = () => {
  const count = useSelector((state: RootState) => state.cart);
  let sum = 0;
  for (let i = 0; i < count.cart.length; i++) {
    sum += count.cart[i].count;
  }
  return (
    <Link to="/cart" className="link_style_cart">
      Корзина: {sum}
    </Link>
  );
};

