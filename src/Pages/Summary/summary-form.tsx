import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import { useOrderDetails } from "../../context/order-detail";
import { orderSunday } from "../../service/api";
import AlertBanner from "../Component/alertBanner";

export default function SummaryForm() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-mixed-operators, no-undef
  const [isChecked, setIsChecked] = useState(Boolean);
  const [error, setError] = useState<boolean>();
  
  const { resetOrder } = useOrderDetails()

  const onConfirmOrder =  async() => {
    const response = await orderSunday();
    if (response.status === 200) {
      resetOrder()
      navigate(`/order-confirm/${response.data}`)
    } else {
      setError(true);
    }
  }

  const handlerSubmit = (event: any) => {
    event.preventDefault()
    onConfirmOrder()
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>no ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  if (error) {
    return <AlertBanner />;
  }


  return (
    <>
      <Form onSubmit={handlerSubmit}>
        <Form.Group>
          <Form.Check
            id={"termsAndCondition"}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
            label={checkboxLabel}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isChecked}>
          Confirm Order
        </Button>
      </Form>
    </>
  );
}
