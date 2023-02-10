import { useOrderDetails } from "../../context/order-detail";
import { ScoopsDetail, ToppingsDetail } from "../../models/order-detail";
import { formatCurrency } from "../../utils";
import SummaryForm from "./summary-form";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = optionCounts.scoops;
  const toppingArray = optionCounts.toppings;

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>
        {scoopArray.map((scoop:ScoopsDetail) => (
          <li key={scoop.name}>
            <>
              {scoop.amount} {scoop.name}
            </>
          </li>
        ))}
      </ul>
      {totals.topping !== 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>
            {toppingArray.map((topping: ToppingsDetail) => (
              <>
                <li key={topping.name}>{topping.name}</li>
              </>
            ))}
          </ul>
        </>
      )}
      <SummaryForm/>
    </>
  );
}
