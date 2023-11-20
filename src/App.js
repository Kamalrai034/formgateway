import { useState } from "react";
import "./App.css";
import MultiStepForm from "./Components/Form/MultiStepForm";
import Footer from "./Components/LayoutWrapper/Footer";
import Layout from "./Components/LayoutWrapper/Layout";
import StepWizard from "./Components/LayoutWrapper/StepWizard";
import { StepProvider } from "./Contexts/StepContext";
import { FormProvider } from "./Contexts/FormContext";

function App() {
  return (
    <div className="App">
      <StepProvider>
        <FormProvider>
        <Layout>
          <MultiStepForm />
        </Layout>
        </FormProvider>
      </StepProvider>
    </div>
  );
}

export default App;
