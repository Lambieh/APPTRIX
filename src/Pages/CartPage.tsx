import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import "./CartPage.css";
import { addCart, removeFromCart } from "../Store/apptrixSlice";
import { useState } from "react";
import ModWindow from "./ModWindow";

const CartPage = () => {
  const [modAct, setModAct] = useState(false);
  const count = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  let sum = 0;

  let arrSum = count.cart.map((item: any) => {
    return item.count * item.data.price;
  });
  sum = arrSum.reduce((acc: any, item: any) => {
    return acc + item;
  }, 0);

  return (
    <div className="cart_dish_page">
      {count.cart.map((item: any) => {
        return (
          <div className="one_dish_cart" key={item.data.id}>
            <img src={item.data.image} width={100} />
            <div className="one_dish_name">
              <div style={{ fontWeight: "bold" }}>Название:</div>
              <div>{item.data.name}</div>
            </div>
            <div className="one_dish_name">
              <div style={{ fontWeight: "bold" }}>Цена:</div>
              <div>{item.data.price}</div>
            </div>
            <div className="one_dish_name">
              <div className="one_dish_btn">
                <button
                  className="btn"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  -
                </button>
                {item.count}
                <button className="btn" onClick={() => dispatch(addCart(item))}>
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {count.cart.length > 0 ? (
        <div className="order_confirm">
          Сумма: {sum}
          <button className="btn" onClick={() => setModAct(true)}>
            Оформить
          </button>
        </div>
      ) : (
        <div className="cart_null">Ваша корзина пуста</div>
      )}
      {count.cart.length > 0 && modAct && (
        <ModWindow modAct={modAct} setModAct={setModAct} />
      )}
    </div>
  );
};

export default CartPage;
