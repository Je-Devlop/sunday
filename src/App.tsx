import { Route, Routes } from "react-router-dom";
import { OrderDetailsProvider } from "./context/order-detail";
import OrderEntry from "./Pages/Component/order-entry";
import OrderConfirmation from "./Pages/Confirmation/order-success";
import OrderSummary from "./Pages/Summary/order-summery";

function App() {
  return (
    <OrderDetailsProvider>
       <Routes>
        <Route path="/" element={<OrderEntry/>} />
        <Route path={"/order-summary"} element={<OrderSummary/>}/>
        <Route path={"/order-confirm"} element={<OrderConfirmation/>}/>
       </Routes>
    </OrderDetailsProvider>
  );
}

export default App;
