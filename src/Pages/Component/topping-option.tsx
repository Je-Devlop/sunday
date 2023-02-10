import { Col, Form } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";
import { IceCreamType } from "../../models/order-detail";

export default function ToppingOption ({ keyItem, name, price, imagePath }: any) {
  const { updateItemCount } = useOrderDetails()
  const hanldleChange = (e: any) => {
    updateItemCount(name, e.target.checked ? 1 : 0, price, IceCreamType.TOPPING)
  }
    return (
        <>
          <Col key={keyItem} xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
            <img style={{ width: "75%" }} src={`http://localhost:8081${imagePath}`} alt={`${name} topping`} />
            <Form.Group controlId={`${name}-topping-checkbox`}>
              <Form.Check type="checkbox" onChange={hanldleChange} label={name}></Form.Check>
            </Form.Group>
          </Col>
        </>
      );
}