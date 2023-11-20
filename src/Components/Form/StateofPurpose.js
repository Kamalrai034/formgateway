// StatementOfPurpose.js
import React, { useState } from "react";
import { useForm } from "../../Contexts/FormContext";
import { statementOfPurposeSchema } from "../../Utils/validationSchemas";
import { Form, Button, Card } from "react-bootstrap";

const StatementOfPurpose = () => {
  const { validationErrors, state, updateFormData, setValidationErrors } =
    useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData("statementOfPurpose", { [name]: value });
  };

  const handleSubmit = () => {
    try {
      statementOfPurposeSchema.parse(state.statementOfPurpose);
      setValidationErrors({});
      // Continue with form submission logic or navigate to the next step
    } catch (error) {
      console.error(error, "newerror");
      setValidationErrors(
        error.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        )
      );
    }
  };

  return (
    <Card>
      <div
        style={{
          color: "#000",
          backgroundColor: "#1A8FE626",
          padding: "30px 20px",
        }}
      >
        <Card.Title style={{ color: "#000" }}>Statement of Purpose</Card.Title>
        <Card.Text style={{ color: "#343434E5" }}>
          Share your thoughts on the provided questions.
        </Card.Text>
      </div>
      <Card.Body>
        <div style={{ padding: "50px 100px" }}>
          <Form>
            <Form.Group controlId="question1">
              <Form.Label>
                Tell me about a time you were asked to do something you had
                never done before. How did you react? What did you learn?*
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="question1"
                value={state.statementOfPurpose.question1}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.question1}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.question1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="question2">
              <Form.Label>
                Tell me about the last time something significant didn’t go
                according to plan at work. What was your role? What was the
                outcome?*
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="question2"
                value={state.statementOfPurpose.question2}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.question2}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.question2}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="question3">
              <Form.Label>
                What are the three things that are most important to you in a
                job?*
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="question3"
                value={state.statementOfPurpose.question3}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.question3}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.question3}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatementOfPurpose;
