import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import AlertBanner from "./alertBanner";
import ScoopOption from "./scoop-option";
import ToppingOption from "./topping-option";

export default function Options({ optionType }: any) {
  const [iCreamItem, setICreamItem] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);

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

  return (
    <Row>
      {iCreamItem.map((item, index) => (
         <ItemComponent keyItem={index} name={item.name} imagePath={item.imagePath}/>
      ))}
    </Row>
  );
}
