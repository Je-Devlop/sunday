import { render, screen, waitFor } from "../testing-library-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../mocks/server";
import OrderEntry from "../Pages/Component/order-entry";

test("handle error for scoops and topping api", async () => {
  server.resetHandlers(
    rest.get("http://localhost:8989/scoops", (req, res, ctx) => res(ctx.status(500))),
    rest.get("http://localhost:8989/topping", (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />, {});

  await waitFor(async () => {
    const alert = await screen.findAllByRole("alert");
    expect(alert).toHaveLength(2);
  });
});

test("should change scoop total when scoop change", async () => {
  const user = userEvent.setup();
  render(<OrderEntry />, {});

  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubTotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");
  expect(scoopsSubTotal).toHaveTextContent("2.00");
});
