import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";
import { orderSunday } from "../../service/api";

export default function OrderConfirmation({ setOrderPhase }: any) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState();

  const orderICream = async () => {
    const response = await orderSunday();
    if (response.status === 201) {
      setOrderNumber(response.data.orderNumber);
    } else {
      // TODO handle error
    }
  };

  const handleClick = () => {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase("inprogress");
  };

  useEffect(() => {
    orderICream();
  }, []);

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
