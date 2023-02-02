import { useOrderDetails } from "../../context/order-detail";
import { formatCurrency } from "../../utils";
import SummaryForm from "./summary-form";

export default function OrderSummary({ setOrderPhase }: any) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2]]
  const toppingArray = Object.keys(optionCounts.topping); // [["M&Ms", "Gummi Bear"]]

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>
        {scoopArray.map(([key, value]) => (
          <li key={key}>
            <>
              {value} {key}
            </>
          </li>
        ))}
      </ul>
      {totals.topping !== 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.topping)}</h2>
          <ul>
            {toppingArray.map((key: any) => (
              <>
                <li key={key}>{key}</li>
              </>
            ))}
          </ul>
        </>
      )}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
}
