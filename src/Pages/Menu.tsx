import { getDishes } from "../firebase.js";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeFromCart } from "../Store/apptrixSlice";
import { RootState } from "../Store/index.js";

const Menu = () => {
  const [menu, setMenu] = useState<DocumentData[]>([]);

  const count = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    getDishes().then((res) => setMenu(res));
  }, []);

  const dispatch = useDispatch();
  return (
    <div>
      <div className="menu_style_all">
        {menu.map((item) => {
          return (
            <div className="one_dish" key={crypto.randomUUID()}>
              <div className="dishes_image_container">
                <img src={item.image} />
              </div>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.description}</div>
              {count.cart.some((it: any) => it.id == item.id) ? (
                <div className="btn_size_plus_minus">
                  <button
                    className="btn"
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          count.cart.find((el: any) => el.id === item.id)
                        )
                      )
                    }
                  >
                    -
                  </button>
                  {count.cart.map((it: any) => {
                    if (it.id == item.id) {
                      return it.count;
                    }
                  })}
                  <button
                    className="btn"
                    onClick={() => dispatch(addCart(item))}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="btn" onClick={() => dispatch(addCart(item))}>
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
