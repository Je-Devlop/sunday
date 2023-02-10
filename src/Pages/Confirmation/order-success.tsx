import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderConfirmation() {
  
  let { orderID } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      {orderID ? (
        <div style={{ textAlign: "center" }}>
          <h1>Thank You</h1>
          <p>Your order number is {orderID}</p>
          <p style={{ fontSize: "25%" }}>as per our terms and conditions, noting will happen now</p>
          <Button onClick={handleClick}>Create new order</Button>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
