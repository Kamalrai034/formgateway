// BasicDetails.js
import React, { useState } from 'react';
import { useForm } from '../../Contexts/FormContext';
import { basicDetailsSchema } from '../../Utils/validationSchemas';
import { Form, Button, Card } from 'react-bootstrap';

const BasicDetails = () => {
  const { validationErrors,state, updateFormData,setValidationErrors } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData('basicDetails', { [name]: value });
  };

  const handleSubmit = () => {
    try {
      // Validate using Zod
      basicDetailsSchema.parse(state.basicDetails);
      // Clear previous validation errors if any
      setValidationErrors({});
    } catch (error) {
      // Handle validation errors
      console.error(error.errors);
      setValidationErrors(error.errors.reduce((acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }), {}));
    }
  };

  return (
    <Card style={{ backgroundColor: '#FFFFFF' }}>
        <div style={{ color: '#000', backgroundColor: '#1A8FE626', padding: '30px 20px' }}>
          <Card.Title style={{ color: '#000' }}>Basic Details</Card.Title>
          <Card.Text style={{ color: '#343434E5' }}>
            Provide your basic information below.
          </Card.Text>
        </div>
      <Card.Body>
        <div style={{ padding: '50px 100px' }}>
          <Form>
            <Form.Group controlId="formName" style={{ marginBottom: '32px' }}>
              <Form.Label>1. Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={state.basicDetails.name}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.name}
                required
              />
              <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" style={{ marginBottom: '32px' }}>
              <Form.Label>2. Email*</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={state.basicDetails.email}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formMobileNumber" style={{ marginBottom: '32px' }}>
              <Form.Label>3. Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your mobile number"
                name="mobileNumber"
                value={state.basicDetails.mobileNumber}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.mobileNumber}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.mobileNumber}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDateOfBirth" style={{ marginBottom: '32px' }}>
              <Form.Label>4. Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={state.basicDetails.dateOfBirth}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.dateOfBirth}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BasicDetails;
