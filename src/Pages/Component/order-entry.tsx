import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrderDetails } from "../../context/order-detail";
import { IceCreamType } from "../../models/order-detail";
import { formatCurrency } from "../../utils";
import Options from "./options";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const navigate = useNavigate();

  const onOrderSunday = () => {
    navigate("/order-summary")
  }

  return (
    <>
      <Options optionType={IceCreamType.SCOOPS} />
      <Options optionType={IceCreamType.TOPPING} />
      <h2>grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button disabled={totals.scoops <= 0 || Number.isNaN(totals.scoops)} onClick={onOrderSunday}>Order sunday</Button>
    </>
  );
}
