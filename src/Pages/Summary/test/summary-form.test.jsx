import {screen, render, fireEvent } from "@testing-library/react"
import SummaryForm from "../summary-form"

test("Check box should enable AND button should be disable", () => {
    render(<SummaryForm/>)

    const checkBox = screen.getByRole('checkbox', {name: /terms and conditions/i})
    const confirmButton = screen.getByRole("button")

    expect(checkBox).not.toBeChecked()
    expect(confirmButton).toBeDisabled()
})

test("Button should be enable when check box is checked", () => {
    render(<SummaryForm/>)

    const checkBox = screen.getByRole('checkbox', {name: /terms and conditions/i})
    const confirmButton = screen.getByRole("button")

    expect(checkBox).toBeEnabled()
    fireEvent.click(checkBox)
    expect(confirmButton).toBeEnabled()
})