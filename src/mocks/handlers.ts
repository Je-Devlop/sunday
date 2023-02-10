// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8081/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Chocolate", imagePath: "images/chocolate.png", price: 2 },
        { name: "Vanilla", imagePath: "images/vanilla.png",  price: 2 },
      ])
    );
  }),

  rest.get("http://localhost:8081/toppings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Cherries", imagePath: "images/cherries.png",  price: 1.5 },
        { name: "M&Ms", imagePath: "images/m-and-m.png", price: 1.5 },
        { name: "Hot fudge", imagePath: "images/hot-fudge.png", price: 1.5 },
      ])
    );
  }),

  rest.post("http://localhost:8081/order", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ orderNumber: 123455676 }))
   
  }),
];
