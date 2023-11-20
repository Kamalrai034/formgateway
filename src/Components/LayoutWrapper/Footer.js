// Footer.js
import React from "react";
import { Button } from "react-bootstrap";
import { basicDetailsSchema, documentCollectionSchema, interviewAvailabilitySchema, statementOfPurposeSchema } from "../../Utils/validationSchemas";
import { useForm } from "../../Contexts/FormContext";

const Footer = ({ onNext, currentStep, totalSteps, onPrevious }) => {
  const { state, validationErrors, setValidationErrors } = useForm();

  const handleSubmit = () => {
    try {
      // Validate using Zod
      if (currentStep === 1) {
        basicDetailsSchema.parse(state.basicDetails);
      }
      if (currentStep === 2) {
        documentCollectionSchema.parse(state.documentCollection);
      }
      if (currentStep === 3) {
        statementOfPurposeSchema.parse(state.statementOfPurpose);
      }
      if (currentStep === 4) {
        interviewAvailabilitySchema.parse(state.interviewAvailability);
      }
      setValidationErrors({});
      onNext();
    } catch (error) {
      // Handle validation errors
      console.error(
        error.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        ),
        "ert1"
      );
      setValidationErrors(
        error.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        )
      );
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "20px",
          padding: "20px",
        }}
      >
        {currentStep > 1 && (
          <Button type="primary" onClick={onPrevious}>
            Previous
          </Button>
        )}
        {currentStep < 4 && (
          <Button type="primary" onClick={handleSubmit}>
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default Footer;
