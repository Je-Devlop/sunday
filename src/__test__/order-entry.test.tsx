import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../mocks/server";
import OrderEntry from "../Pages/Component/order-entry";

test("handle error for scoops and topping api", async () => {
  server.resetHandlers(
    rest.get("http://localhost:8989/scoops", (req, res, ctx) => res(ctx.status(500))),
    rest.get("http://localhost:8989/topping", (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alert = await screen.findAllByRole("alert");

    expect(alert).toHaveLength(2);
  });
});
