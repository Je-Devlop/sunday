import OrderConfirmation from "../Pages/Confirmation/order-success";
import { render, screen } from "../testing-library-utils/testing-library-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({
    orderID: '1212121212',
  }),
}));

test("Should show error when submit order error", async () => {
    render(<OrderConfirmation/>, {})

    const orderId = screen.getByText(/Your order number is/i)
    expect(orderId).toHaveTextContent("1212121212")
  
  })