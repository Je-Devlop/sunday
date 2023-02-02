import { rest } from "msw";
import { server } from "../mocks/server";
import OrderConfirmation from "../Pages/Confirmation/confirmation";
import { render, waitFor, screen } from "../testing-library-utils/testing-library-utils";

test("Should show error when submit order error", async () => {
    server.resetHandlers(
      rest.get("http://localhost:8989/order", (req, res, ctx) => res(ctx.status(500))),
    );
  
    render(<OrderConfirmation orderPhase={jest.fn()}/>, {})
  
    await waitFor(async () => {
      const alert = await screen.findByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  })