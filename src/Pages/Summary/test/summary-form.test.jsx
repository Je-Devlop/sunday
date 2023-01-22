import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import SummaryForm from "../summary-form";

test("Check box should enable AND button should be disable", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button");

  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("Button should be enable when check box is checked", async () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button");

  expect(checkBox).toBeEnabled();
  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();
});

test("Popover should response to hover", async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  const termAndCondition = screen.getByText(/terms and conditions/i)
  await user.hover(termAndCondition)
  
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  await user.unhover(termAndCondition)
  expect(popover).not.toBeInTheDocument();
});
