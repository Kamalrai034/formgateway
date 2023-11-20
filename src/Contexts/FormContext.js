// FormContext.js
import React, { createContext, useContext, useReducer, useState } from "react";

const FormContext = createContext();

const initialState = {
  basicDetails: {
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
  },
  documentCollection: {
    class10Marksheet: {
      name: "",
      type: "",
      size: undefined,
    },
    class12Marksheet: {
      name: "",
      type: "",
      size: undefined,
    },
    graduationMarksheet: {
      name: "",
      type: "",
      size: undefined,
    },
    postGraduationMarksheet: {
      name: "",
      type: "",
      size: undefined,
    },
    resume: {
      name: "",
      type: "",
      size: undefined,
    },
    recommendationLetter: {
      name: "",
      type: "",
      size: undefined,
    },
    salarySlips: {
      name: "",
      type: "",
      size: undefined,
    },
    others: {
      name: "",
      type: "",
      size: undefined,
    },
  },
  statementOfPurpose: {
    question1: '',
    question2: '',
    question3: '',
  },
  interviewAvailability: {
    email: '',
    location: '',
    interviewDate: '',
    interviewTime: '',
    timeZone: '',
    interviewMedium: '',
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          ...action.data,
        },
      };
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [validationErrors, setValidationErrors1] = useState({});
  const updateFormData = (section, data) => {
    dispatch({ type: "UPDATE_FORM_DATA", section, data });
  };
  const setValidationErrors =(val)=>{
    setValidationErrors1(val)
  }

  return (
    <FormContext.Provider value={{ state, updateFormData,validationErrors,setValidationErrors }}>
      {children}
    </FormContext.Provider>
  );
};

const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useForm };
