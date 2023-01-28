import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./scoop-option";
import ToppingOption from "./topping-option";

export default function Options({ optionType }: any) {
  const [iCreamItem, setICreamItem] = useState<any[]>([]);

  useEffect(() => {
    const onCallGetICreamItem = async () => {
      const result: any = await axios.get(`http://localhost:8989/${optionType}`);
      setICreamItem(result.data);
    };
    onCallGetICreamItem();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  return (
    <Row>
      {iCreamItem.map((item, index) => (
         <ItemComponent keyItem={index} name={item.name} imagePath={item.imagePath}/>
      ))}
    </Row>
  );
}
