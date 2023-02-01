import { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./context/order-detail";
import OrderEntry from "./Pages/Component/order-entry";
import OrderConfirmation from "./Pages/Confirmation/confirmation";
import OrderSummary from "./Pages/Summary/order-summery";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component: any = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
