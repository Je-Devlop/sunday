import { render, screen } from "../testing-library-utils/testing-library-utils";
import Options from "../Pages/Component/options";


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