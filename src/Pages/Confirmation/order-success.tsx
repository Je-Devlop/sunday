import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { orderSunday } from "../../service/api";
import AlertBanner from "../Component/alertBanner";

export default function OrderConfirmation() {
  const [orderNumber, setOrderNumber] = useState<string>();
  const [error, setError] = useState<boolean>();

  const navigate = useNavigate();

  const orderICream = async () => {
    const response = await orderSunday();
    if (response.status === 201) {
      setOrderNumber(response.data.orderNumber);
    } else {
      setError(true);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    orderICream();
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  return (
    <>
      {orderNumber ? (
        <div style={{ textAlign: "center" }}>
          <h1>Thank You</h1>
          <p>Your order number is {orderNumber}</p>
          <p style={{ fontSize: "25%" }}>as per our terms and conditions, noting will happen now</p>
          <Button onClick={handleClick}>Create new order</Button>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
