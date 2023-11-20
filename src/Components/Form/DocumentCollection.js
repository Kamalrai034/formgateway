// DocumentCollection.js
import React, { useState } from "react";
import { useForm } from "../../Contexts/FormContext";
import { documentCollectionSchema } from "../../Utils/validationSchemas";
import { Form, Button, Card } from "react-bootstrap";

const DocumentCollection = () => {
    const { validationErrors,state, updateFormData,setValidationErrors } = useForm();

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0]; // Assuming you only allow a single file
    if (file) {
      const { name: fileName, type: fileType, size: fileSize } = file;

      // Pass file details to updateFormData
      updateFormData("documentCollection", {
        [name]: {
          name: fileName,
          type: fileType,
          size: fileSize,
        },
      });
    }
  };

  const handleSubmit = () => {
    try {
      documentCollectionSchema.parse(state.documentCollection);
      setValidationErrors({});
    } catch (error) {
      setValidationErrors(
        error.errors
          ? error.errors.reduce(
              (acc, curr) => ({
                ...acc,
                [Array.isArray(curr.path) ? curr.path[0] : "unknownField"]:
                  curr.message,
              }),
              {}
            )
          : {}
      );
    }
  };

  // Array of form field data
  const formData = [
    {
      controlId: "class10Marksheet",
      label: "Class 10 Marksheet*",
      name: "class10Marksheet",
    },
    {
      controlId: "class12Marksheet",
      label: "Class 12 Marksheet*",
      name: "class12Marksheet",
    },
    {
      controlId: "graduationMarksheet",
      label: "Graduation Marksheet*",
      name: "graduationMarksheet",
    },
    {
      controlId: "postGraduationMarksheet",
      label: "Post Graduation Marksheet",
      name: "postGraduationMarksheet",
    },
    { controlId: "resume", label: "Resume/CV*", name: "resume" },
    {
      controlId: "recommendationLetter",
      label: "Recommendation Letter",
      name: "recommendationLetter",
    },
    { controlId: "salarySlips", label: "Salary Slips", name: "salarySlips" },
    { controlId: "others", label: "Others", name: "others" },
  ];

  return (
    <Card>
      <div
        style={{
          color: "#000",
          backgroundColor: "#1A8FE626",
          padding: "30px 20px",
        }}
      >
        <Card.Title style={{ color: "#000" }}>Education Details</Card.Title>
        <Card.Text style={{ color: "#343434E5" }}>
          Provide your education details here.
        </Card.Text>
      </div>
      <Card.Body>
        <div style={{ padding: "50px 100px" }}>
          <Form>
            {formData.map((field) => (
              <Form.Group
                key={field.controlId}
                controlId={field.controlId}
                style={{ marginBottom: "32px" }}
              >
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf, .doc, .docx"
                  name={field.name}
                  onChange={handleFileChange}
                  isInvalid={!!validationErrors[field.name]}
                  required={field.label.includes("*")}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors[field.name]}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DocumentCollection;
