import { useState } from "react";
import { Button, Form, Popover, OverlayTrigger } from "react-bootstrap";

export default function SummaryForm({setOrderPhase}: any) {
  // eslint-disable-next-line no-mixed-operators, no-undef
  const [isChecked, setIsChecked] = useState(Boolean);

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    setOrderPhase("completed")
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
