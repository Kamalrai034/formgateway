// Layout.js
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import StepWizard from './StepWizard';
import Footer from './Footer';
import { FormProvider } from '../../Contexts/FormContext';
import { useStep } from '../../Contexts/StepContext';

const Layout = ({ children }) => {
    const {currentStep, goToNextStep, goToPreviousStep,setCurrentStep} = useStep()
  
  return (
    <Container fluid>
        <Row>
        <Col sm={12} style={{ padding: '20px' }}>
       <h1>Abc Comapny</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={3} style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          {/* Sidebar content goes here */}
          <FormProvider>
          <Sidebar  />
          </FormProvider>
          {/* Add any additional sidebar content */}
        </Col>
        <Col sm={9} style={{ padding: '20px' }}>
          {children}
        </Col>
      </Row>
      <>
     <Footer onNext={goToNextStep} currentStep={currentStep} totalSteps={4} onPrevious={goToPreviousStep} />
     </>

    </Container>
  );
};

export default Layout;
