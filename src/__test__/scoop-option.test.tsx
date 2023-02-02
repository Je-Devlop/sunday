import { render, screen } from "../testing-library-utils/testing-library-utils";
import ScoopOption from "../Pages/Component/scoop-option";
import userEvent from "@testing-library/user-event";


test("indicate if scoop count is non-int of out of range", async () => {
    const propsMock: any = { keyItem: 0, name: "vanilla", imagePath: "images/chocolate.png" };
    const user = userEvent.setup();
    render(<ScoopOption {...propsMock}/> , {})

    const vanillaInput = screen.getByRole("spinbutton", {name: /vanilla/i})

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "-1")
    expect(vanillaInput).toHaveClass("is-invalid")

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2.5")
    expect(vanillaInput).toHaveClass("is-invalid")

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2")
    expect(vanillaInput).not.toHaveClass("is-invalid")

})