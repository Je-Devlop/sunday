import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";

export default function ScoopOption({ keyItem, name, imagePath }: {keyItem: number, name: string, imagePath: string}) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: any) => {
    const currentValue = e?.target?.value

    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid = 0 <= currentValueFloat && currentValueFloat <= 10 && Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid)
    const newValue = valueIsValid ? parseInt(currentValue) : 0;
    updateItemCount(name, newValue, "scoops")
  }

  return (
    <>
      <Col key={keyItem} xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
        <img style={{ width: "75%" }} src={`http://localhost:8989${imagePath}`} alt={`${name} scoop`} />
        <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{textAlign: "left"}}>
          <Form.Control
          type="number"
          min={0}
          defaultValue={0}
          onChange={handleChange}
          isInvalid={!isValid}
          >
          </Form.Control>
        </Col>
      </Form.Group>
      </Col>
     
    </>
  );
}
