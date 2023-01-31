import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./context/order-detail";
import OrderEntry from "./Pages/Component/order-entry";

function App() {
  return (
    <Container className="App">
      <OrderDetailsProvider>
        {/* {summary page and entry page need provider} */}
      <OrderEntry/>
      </OrderDetailsProvider>
        {/* {confirmation page doesn't need provider} */}
    </Container>
  );
}

export default App;
