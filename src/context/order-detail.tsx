import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetail = createContext<any>(undefined);

export function useOrderDetails() {
  const contextValue = useContext(OrderDetail);

  if (!contextValue) {
    throw new Error("useOrderDetails must be called within an OrderDetailsProvider");
  }

  return contextValue;
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState<any>({
    scoops: {}, // example: {Chocolate:1, Vanilla:2}
    topping: {}, // example: {Gummi Bears:1,}
  });

  const updateItemCount = (itemName: string, newItemCount: number, optionType: string) => {
    //make a copy of existing state
    const newOptionCounts: any = { ...optionCounts };

    //update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    //update the state with the updated copy
    setOptionCounts(newOptionCounts);
  };

  function resetOrder() {
    setOptionCounts({ scoops: {}, topping: {} });
  }

  //uttlity function
  function calculateTotal(optionType: string) {
    // get an array of counts for the option type (for example, [1, 2])
    const countsArray = Object.values(optionCounts[optionType]);

    //total the value in the array of counts
    const totalCount = countsArray.reduce((total: number, value: any) => total + value, 0);

    //multiply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    topping: calculateTotal("topping"),
  };

  const value = { optionCounts, updateItemCount, resetOrder, totals };
  return (
    <OrderDetail.Provider value={value} {...props}>
      {props.children}
    </OrderDetail.Provider>
  );
}
