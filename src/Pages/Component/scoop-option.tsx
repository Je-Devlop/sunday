import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";

export default function ScoopOption({ keyItem, name, imagePath }: {keyItem: number, name: string, imagePath: string}) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e: any) => {
    updateItemCount(name, parseInt(e.target.value), "scoops")
  }

  return (
    <>
      <Col key={keyItem} xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
        <img style={{ width: "75%" }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      </Col>
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{textAlign: "left"}}>
          <Form.Control
          type="number"
          defaultValue={0}
          onChange={handleChange}
          >

          </Form.Control>
        </Col>
      </Form.Group>
    </>
  );
}
