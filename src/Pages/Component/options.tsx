import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";
import { IceCreamType } from "../../models/order-detail";
import { getICreamScoops, getICreamTopping } from "../../service/api";
import { formatCurrency } from "../../utils";
import AlertBanner from "./alertBanner";
import ScoopOption from "./scoop-option";
import ToppingOption from "./topping-option";

export default function Options({ optionType }: any) {
  const [iCreamItem, setICreamItem] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { totals } = useOrderDetails();
  const apiPath = optionType === IceCreamType.SCOOPS ? getICreamScoops : getICreamTopping;

  useEffect(() => {
    const onCallGetICreamItem = async () => {
      const result: any = await apiPath();
      if (result.status === 200) {
        setICreamItem(result.data);
      } else {
        if (result.name !== "CanceledError") setError(true);
      }
    };
    onCallGetICreamItem();
  }, [optionType, apiPath]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <Row>
      <h2>{title}</h2>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      {iCreamItem.map((item, index) => (
        <ItemComponent keyItem={index} name={item.name} price={item.price} imagePath={item.image_path} />
      ))}
    </Row>
  );
}
