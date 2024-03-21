import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./Order.css";

interface Order {
  count: number;
  id: string;
  paymentCredentilas: {
    street: string;
    id: string;
    house: number;
    app: number;
  };
  data: {
    description: string;
    id: string;
    image: string;
    name: string;
    price: number;
  };
}

const Order = () => {
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState<null | any>(null);
  useEffect(() => {
    const fetchDocById = async () => {
      // @ts-ignore
      const docRef = doc(db, "cart", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data) {
        // @ts-ignore
        setOrder(data);
      }
    };

    fetchDocById();
  }, [id]);

  useEffect(() => {
    if (order?.orders?.length) {
      let arrSum = order.orders.map((item: any) => {
        return item.count * item.data.price;
      });

      setPrice(
        arrSum.reduce((acc: any, item: any) => {
          return acc + item;
        }, 0)
      );
    }
  }, [order]);

  if (order)
    return (
      <div className="order_all">
        <h2>Заказ оформлен</h2>
        <div className="address_order">
          <h3>Адрес доставки</h3>
          <div>Улица: {order.paymentCredentilas.street}</div>
          <div>Дом: {order.paymentCredentilas.house}</div>
          <div>Квартира: {order.paymentCredentilas.app}</div>
        </div>
        <div className="cart_order">
          <h3>Ваш заказ</h3>
          {order.orders.map((item: any) => {
            return (
              <div className="one_dish_on_order">
                <img src={item.data.image} width={100} />
                <div>{item.data.name}</div>
                <div>{item.data.price}</div>
                Кол-во: {item.count}
              </div>
            );
          })}
        </div>
        <div>
          <h3>Сумма: {price}</h3>
        </div>
      </div>
    );
};

export default Order;
