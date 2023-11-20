// StepContext.js
import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
  };

  return (
    <StepContext.Provider value={{ currentStep, goToNextStep, goToPreviousStep,setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};

const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};

export { StepProvider, useStep };
