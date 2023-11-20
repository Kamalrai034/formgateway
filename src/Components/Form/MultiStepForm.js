// MultiStepForm.js
import React, { useState } from 'react';
import BasicDetails from './BasicDeatils';
import { FormProvider } from '../../Contexts/FormContext';
import DocumentCollection from './DocumentCollection';
import StatementOfPurpose from './StateofPurpose';
import InterviewAvailability from './InterviewAvailability';
import { useStep } from '../../Contexts/StepContext';

const MultiStepForm = () => {
    const { currentStep, setCurrentStep } = useStep()

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      {currentStep === 1 && <BasicDetails />}
      {currentStep === 2 && <DocumentCollection />}
      {currentStep === 3 && <StatementOfPurpose />}
      {currentStep === 4 && <InterviewAvailability />}
    </>
  );
};

export default MultiStepForm;
