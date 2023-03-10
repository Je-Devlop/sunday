import user from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../mocks/server";
import SummaryForm from "../Pages/Summary/summary-form";
import { screen, render, waitFor } from "../testing-library-utils/testing-library-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

test("Check box should enable AND button should be disable", () => {
  render(<SummaryForm />, {});

  const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button");

  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("Button should be enable when check box is checked", async () => {
  render(<SummaryForm />, {});

  const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button");

  expect(checkBox).toBeEnabled();
  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();
});

test("Popover should response to hover", async () => {
  render(<SummaryForm />, {});

  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  const termAndCondition = screen.getByText(/terms and conditions/i);
  await user.hover(termAndCondition);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  await user.unhover(termAndCondition);
  expect(popover).not.toBeInTheDocument();
});

test("Should show error when submit order error", async () => {
  server.resetHandlers(
    rest.get("http://localhost:8989/order", (req, res, ctx) => res(ctx.status(500))),
  );

  render(<SummaryForm />, {});

  const confirmButton = screen.getByRole('button', {name: /confirm order/i})
  expect(confirmButton).toBeDisabled()

  const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });

  expect(checkBox).toBeEnabled();
  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();
  await user.click(confirmButton)

  await waitFor(async () => {
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
})
