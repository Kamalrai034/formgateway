// Sidebar.js
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useStep } from '../../Contexts/StepContext';

const Sidebar = ({ onTabSelect }) => {// Default to the first step
  const { currentStep, setCurrentStep } = useStep()
  const handleTabSelect = (selectedTab) => {
    setCurrentStep(selectedTab);
    // onTabSelect(selectedTab);
  };

  const renderTabContent = (tabKey, heading, subheading,currentStep) => (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div
        style={{
          width: '70px',
          height: '70px',
          backgroundColor: currentStep === tabKey ? '#B4D9F4' : '#D8D8D8',
          marginRight: '16px',
        }}
      ></div>
      <div style={{ display: 'flex', flexDirection:'column',alignItems:'start'}}>
        <h6 style={{color:'#000',margin:0}}>{heading}</h6>
        <p style={{ fontSize: '0.8rem', color: '#343434E5',textAlign:'start',wordWrap: 'break-word',overflowWrap: 'break-word',width:'216px' }}>{subheading}</p>
      </div>
    </div>
  );

  const allTabs = [{
    key:'Details Collection',
    heading:'Basic Deatails',
    step:1,
    description:'Enter basic details like name,email etc.'
  },{
    key:'Document Collection',
    heading:'Education Deatails',
    step:2,
    description:'Give your education details'
  },
  {
    key:'Statement of Purpose',
    heading:'Prelimanary Questions',
    step:3,
    description:'Answer some questions on challanges faced by you.'
  },
  {
    key:'Interview',
    heading:'Interview Availability',
    step:4,
    description:'Give your interview availability'
  }]

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      {/* Section for New Form button */}
      <button style={{ marginBottom: '5px',borderRadius: '8px', border:'1px solid #888888',padding:'10px 16px',backgroundColor:'#FFFFFF' }}>
      {renderTabContent('new form','New form','Click to start a new form.','new form')}
      </button>
      {/* Add any additional content for the new form section */}
      <hr />

      {/* Section for 4 steps of the form as vertical tabs */}
      <h5 style={{textAlign:'left'}}>
        Form section
      </h5>
      <Nav variant="pills" className="flex-column">
        {allTabs.map(({key,step,heading,description})=><Nav.Item key={key} style={{ marginBottom: '5px',borderRadius: '8px', border:currentStep === step ? '1px solid #1A8FE6' : '1px solid #888888' }}>
          <Nav.Link
            eventKey={step}
            onClick={() => handleTabSelect(step)}
            active={currentStep === step}
            style={{ backgroundColor: currentStep === step ? '#F5F8FA' : '#FFFFFF' }}
          >
            {renderTabContent(step, heading, description,currentStep)}
          </Nav.Link>
        </Nav.Item>)}
      </Nav>
    </div>
  );
};

export default Sidebar;
