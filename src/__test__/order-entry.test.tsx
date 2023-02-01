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

  render(<OrderEntry setOrderPhase={jest.fn()} />, {});

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

test("should change topping total when topping is selected", async () => {
  const user = userEvent.setup();
  render(<OrderEntry />, {});

  const topppingSubTotal = screen.getByText("Topping total: $", { exact: false });
  expect(topppingSubTotal).toHaveTextContent("0.00");

  const cherriesCheckBox = await screen.findByRole('checkbox', { name:'Cherries' })
  await user.click(cherriesCheckBox)
  expect(topppingSubTotal).toHaveTextContent("1.50");

  // no need await because if pass condition cherriesCheckBox data is loaded
  const hotFudgeCheckBox = screen.getByRole('checkbox', { name:'Hot fudge' }) 
  await user.click(hotFudgeCheckBox)
  expect(topppingSubTotal).toHaveTextContent("3.00");
})

describe("Grand total", () => {

  test("grand total should be stat with $0.00", () => {
    const { unmount } = render(<OrderEntry/>, {});

    const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i})
    expect(grandTotal).toHaveTextContent("0.00")

    unmount();
  })

  test("grand total update properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry/>, {});

    const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i})
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
  
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00")

    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
    await user.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent("3.50")
  })

  test("grand total update properly if toppping is added first", async () => {
    const user = userEvent.setup()
    
    render(<OrderEntry/>, {})

    const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i})

    const hotfugeCheckBox = await screen.findByRole("checkbox", {name:'Hot fudge'})
    await user.click(hotfugeCheckBox)
    expect(grandTotal).toHaveTextContent("1.50")

    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50")
  })

  test("grand total update properly if item is remove", async () => {
    const user = userEvent.setup()

    render(<OrderEntry/>, {})

    const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i})
    expect(grandTotal).toHaveTextContent("0.00")

    const hotFudgeCheckBox = await screen.findByRole("checkbox", {name: "Hot fudge"})
    await user.click(hotFudgeCheckBox)
    expect(grandTotal).toHaveTextContent("1.50")

    await user.click(hotFudgeCheckBox)
    expect(grandTotal).toHaveTextContent("0.00")
  })
})
