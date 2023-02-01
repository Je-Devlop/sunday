// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8989/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Chocolate", imagePath: "images/chocolate.png" },
        { name: "Vanilla", imagePath: "images/vanilla.png" },
      ])
    );
  }),

  rest.get("http://localhost:8989/toppings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Cherries", imagePath: "images/cherries.png" },
        { name: "M&Ms", imagePath: "images/m-and-m.png" },
        { name: "Hot fudge", imagePath: "images/hot-fudge.png" },
      ])
    );
  }),

  rest.post("http://localhost:8989/order", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ orderNumber: 123455676 }))
   
  }),
];
