import { rest } from "msw";
import { server } from "../mocks/server";
import OrderConfirmation from "../Pages/Confirmation/order-success";
import { render, waitFor, screen } from "../testing-library-utils/testing-library-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

test("Should show error when submit order error", async () => {
    server.resetHandlers(
      rest.get("http://localhost:8989/order", (req, res, ctx) => res(ctx.status(500))),
    );
  
    render(<OrderConfirmation/>, {})
  
    await waitFor(async () => {
      const alert = await screen.findByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  })