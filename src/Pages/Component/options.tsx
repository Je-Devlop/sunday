import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../context/order-detail";
import { formatCurrency } from "../../utils";
import AlertBanner from "./alertBanner";
import ScoopOption from "./scoop-option";
import ToppingOption from "./topping-option";

export default function Options({ optionType }: any) {
  const [iCreamItem, setICreamItem] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    const onCallGetICreamItem = async () => {
      try {
        const result: any = await axios.get(`http://localhost:8989/${optionType}`);
        setICreamItem(result.data);
      } catch (error) {
        setError(true)
      }
    };
    onCallGetICreamItem();
  }, [optionType]);

  if(error) {
    return <AlertBanner/>;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  return (
    <Row>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>{title} total: {formatCurrency(totals[optionType])}</p>
      {iCreamItem.map((item, index) => (
         <ItemComponent keyItem={index} name={item.name} imagePath={item.imagePath}/>
      ))}
    </Row>
  );
}
