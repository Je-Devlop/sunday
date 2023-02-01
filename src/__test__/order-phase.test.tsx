import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Order phases for happy case", async () => {
  const user = userEvent.setup();

  const { unmount } = render(<App />);

  //add ice cream scoops and topping
  const vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const chocolateInput = screen.getByRole("spinbutton", { name: /chocolate/i });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", { name: /cherries/i });
  await user.click(cherriesCheckbox);

  // check summary subTotals
  const orderSummaryButton = screen.getByRole("button", { name: /order sunday/i });
  await user.click(orderSummaryButton);

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $8.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", { name: "Toppings: $1.50" });
  expect(toppingHeading).toBeInTheDocument();

  // check summary option items
  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(["2 Vanilla", "2 Chocolate", "Cherries"]);

  const termsAndCondition = screen.getByRole("checkbox", { name: /terms and conditions/i });
  await user.click(termsAndCondition);

  const confirmOrderButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmOrderButton);

  const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and topping have bee reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Topping total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // unmount the component to trigger cleanup and avoid
  // not wrapped in act() error
  unmount();
});
