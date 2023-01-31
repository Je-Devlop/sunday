import { useOrderDetails } from "../../context/order-detail";
import { formatCurrency } from "../../utils";
import SummaryForm from "./summary-form";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2]]
  const toppingArray = Object.entries(optionCounts.topping); // [["M&Ms", "Gummi Bear"]]

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>
        {scoopArray.map((key: any, value: any) => (
          <>
            <li key={key}>
              {value}
              {key}
            </li>
          </>
        ))}
      </ul>
      <h2>Topping: {formatCurrency(totals.topping)}</h2>
      <ul>
        {toppingArray.map((key: any) => (
          <>
            <li key={key}>
              {key}
            </li>
          </>
        ))}
      </ul>
      <SummaryForm />
    </>
  );
}
