import { render, screen } from "../testing-library-utils/testing-library-utils";
import Options from "../Pages/Component/options";
import userEvent from "@testing-library/user-event";


test('display image for each scoop option from server', async () => {
    render(<Options optionType="scoops"/>, {})

    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element: any) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('display image for each topping option from server', async () => {
    render(<Options optionType="topping"/>, {})

    const scoopImages = await screen.findAllByRole('img', {name: /topping$/i});
    expect(scoopImages).toHaveLength(3);

    const altText = scoopImages.map((element: any) => element.alt)
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
})

test('Should not display when input scoops is not valid', async () => {
    const user = userEvent.setup()

    render(<Options optionType="scoops"/>, {})

    const vanillaInput = await screen.findByRole('spinbutton', {name: /vanilla/i})
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "-1")

    const scoopSubTotal = screen.getByText(/Scoops total: /i)
    expect(scoopSubTotal).toHaveTextContent("$0.00")

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "100") 
    expect(scoopSubTotal).toHaveTextContent("$0.00")

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1.5") 
    expect(scoopSubTotal).toHaveTextContent("$0.00")
})