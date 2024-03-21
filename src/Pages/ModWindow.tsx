import { useState } from "react";
import "./ModWindow.css";
import { addCart } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
const ModWindow = (props: any) => {
  const [data, setData] = useState<{
    street: string;
    house: string;
    app: string;
    sel: string;
  }>({
    street: "",
    house: "",
    app: "",
    sel: "",
  });

  const navigate = useNavigate();
  const count = useSelector((state: RootState) => state.cart);

  const handleCreateOrder = async (data: any) => {
    let obj = {
      paymentCredentilas: { ...data },
      // @ts-ignore
      orders: [...count.cart.map(({ id, ...rest }) => ({ ...rest }))],
    };

    console.log(obj);

    const result = await addCart(obj);
    setData({ street: "", house: "", app: "", sel: "" });
    localStorage.removeItem("persist:root");
    navigate(`/order/${result?.id}`);
    window.location.reload();
  };

  return (
    <div className="mod_window" onClick={() => props.setModAct(false)}>
      <div className="mod_content" onClick={(event) => event.stopPropagation()}>
        <input
          value={data.street}
          type="text"
          onChange={(event) => setData({ ...data, street: event.target.value })}
          placeholder="Улица"
        />
        <input
          value={data.house}
          type="number"
          onChange={(event) => setData({ ...data, house: event.target.value })}
          placeholder="Дом"
        />
        <input
          value={data.app}
          type="number"
          onChange={(event) => setData({ ...data, app: event.target.value })}
          placeholder="Квартира"
        />
        <select>
          <option>Наличными</option>
          <option>Картой при получении</option>
        </select>
        <button className="btn" onClick={() => handleCreateOrder(data)}>
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default ModWindow;
