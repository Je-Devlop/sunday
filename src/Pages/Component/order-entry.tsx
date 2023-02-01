import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";
import { formatCurrency } from "../../utils";
import Options from "./options";

export default function OrderEntry({setOrderPhase}: any): any {
  const { totals } = useOrderDetails();

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="topping" />
      <h2>grand total: {formatCurrency(totals.scoops + totals.topping)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order sunday</Button>
    </>
  );
}
