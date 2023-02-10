import { createContext, useContext, useState } from "react";
import { IceCreamType, OptionCount } from "../models/order-detail";

const OrderDetail = createContext<any>(undefined);

export function useOrderDetails() {
  const contextValue = useContext(OrderDetail);

  if (!contextValue) {
    throw new Error("useOrderDetails must be called within an OrderDetailsProvider");
  }

  return contextValue;
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState<OptionCount>({
    scoops: [],
    toppings: [],
  });

  const updateItemCount = (itemName: string, newItemCount: number, price: number, optionType: IceCreamType) => {
    let newOptionCounts: OptionCount = { ...optionCounts };

    const isDuplicated = newOptionCounts[optionType].some((item) => item.name === itemName);

    if (!isDuplicated) {
      newOptionCounts[optionType].push({
        name: itemName,
        amount: newItemCount,
        pricePerItem: price,
      });
    } else {
      if (newItemCount === 0) {
        newOptionCounts[optionType] = newOptionCounts[optionType].filter((item) => item.name !== itemName);
      } else {
        const index: number = newOptionCounts[optionType].findIndex((item) => item.name === itemName);
        newOptionCounts[optionType][index].amount = newItemCount;
      }
    }
    setOptionCounts(newOptionCounts);
  };

  function resetOrder() {
    setOptionCounts({
      scoops: [],
      toppings: [],
    });
  }

  function calculateTotal(optionType: IceCreamType) {
    const countsArray: Array<any> = optionCounts[optionType];
    const totalCount = countsArray.reduce((total, value) => total + value.pricePerItem * value.amount, 0);

    return totalCount;
  }

  const totals = {
    scoops: calculateTotal(IceCreamType.SCOOPS),
    toppings: calculateTotal(IceCreamType.TOPPING),
  };

  const value = { optionCounts, updateItemCount, resetOrder, totals };
  return (
    <OrderDetail.Provider value={value} {...props}>
      {props.children}
    </OrderDetail.Provider>
  );
}
