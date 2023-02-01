import { httpClient } from "./http-client";

const controller = new AbortController();

export const getICreamScoops = async () => {
  let result: any;
  try {
    result = await httpClient.get("/scoops", { signal: controller.signal });
  } catch (error) {
    return error;
  }

  return result;
};

export const getICreamTopping = async () => {
  let result: any;
  try {
    result = await httpClient.get("/toppings", { signal: controller.signal });
  } catch (error) {
    return error;
  }

  return result;
};

export const orderSunday = async () => {
  let result: any;
  try {
    result = await httpClient.post("/order", { signal: controller.signal });
  } catch (error) {
    return error;
  }
  return result;
};
