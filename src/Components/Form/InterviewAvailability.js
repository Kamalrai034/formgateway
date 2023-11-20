// InterviewAvailability.js
import React, { useState } from "react";
import { useForm } from "../../Contexts/FormContext";
import { interviewAvailabilitySchema } from "../../Utils/validationSchemas";
import { Form, Button, Card } from "react-bootstrap";

const fields = [
  { id: "email", label: "Email*", type: "email", size: "lg" },
  { id: "location", label: "Location*", type: "text", size: "lg" },
  {
    id: "interviewDate",
    label: "Interview Date*",
    type: "date",
    size: "lg",
    width: "small",
  },
  {
    id: "interviewTime",
    label: "Interview Time*",
    type: "time",
    size: "lg",
    width: "small",
  },
  {
    id: "timeZone",
    label: "Time Zone*",
    type: "select",
    options: ["EST", "PST"],
    size: "lg",
  },
  {
    id: "interviewMedium",
    label: "Interview Medium*",
    type: "select",
    options: ["In Person", "Phone", "Video Call"],
    size: "lg",
  },
];

const InterviewAvailability = () => {
  const { validationErrors, state, updateFormData, setValidationErrors } =
    useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData("interviewAvailability", { [name]: value });
  };

  const handleSubmit = () => {
    try {
      interviewAvailabilitySchema.parse(state.interviewAvailability);
      setValidationErrors({});
      // Continue with form submission logic or navigate to the next step
    } catch (error) {
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
        <Card.Title style={{ color: "#000" }}>
          Interview Availability
        </Card.Title>
        <Card.Text style={{ color: "#343434E5" }}>
          Provide your interview availability details below.
        </Card.Text>
      </div>
      <Card.Body>
        <div style={{ padding: "50px 100px" }}>
          <Form>
            {fields.map((field) => (
              <Form.Group
                key={field.id}
                controlId={field.id}
                style={{ marginBottom: "32px" }}
              >
                <Form.Label>{field.label}</Form.Label>
                {field.type === "select" ? (
                  <Form.Control
                    as="select"
                    name={field.id}
                    value={state.interviewAvailability[field.id]}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors[field.id]}
                    required
                    size={field.size}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label} details`}
                    name={field.id}
                    value={state.interviewAvailability[field.id]}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors[field.id]}
                    required={field.label.includes("*")}
                    size={field.size}
                    style={{
                      width: field.width === "small" ? "300px" : "100%",
                    }}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {validationErrors[field.id]}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InterviewAvailability;
