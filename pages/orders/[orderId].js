import { useEffect, useState } from "react";

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(
    () => {
      const findTimeLeft = () => {
        const msLeft = new Date(order.expiresAt) - new Date();
        setTimeLeft(Math.round(msLeft / 1000));
      };

      // Update time left immediately before setInterval fires
      findTimeLeft();
      const timerId = setInterval(findTimeLeft, 1000);

      // invoke clearInterval when we navigate away or when this
      // component is re-rendered
      return () => {
        clearInterval(timerId);
      };
    },
    // order dependency ensures clearInterval is called when component is re-rendered
    [order]
  );

  return <div>Time left to pay: {timeLeft} seconds</div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
