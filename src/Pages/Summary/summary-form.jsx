import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SummaryForm() {
  // eslint-disable-next-line no-mixed-operators, no-undef
  const [isChecked, setIsChecked] = useState(Boolean);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );

  return (
    <>
      <Form>
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
