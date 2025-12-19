import { useState } from 'react';
import {
  ProgressIndicator,
  ProgressStep,
  Button,
  Grid,
  Column,
  InlineNotification,
} from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark } from '@carbon/icons-react';

import WizardStep from './WizardStep';
import Step1ServiceType from './steps/Step1ServiceType';
import Step2TitleCreation from './steps/Step2TitleCreation';
import Step3Description from './steps/Step3Description';
import Step4Review from './steps/Step4Review';

const steps = [
  { label: 'Basics', description: 'Service type & intent' },
  { label: 'Create', description: 'Assisted title creation' },
  { label: 'Describe', description: 'Structured description' },
  { label: 'Preview', description: 'Review & publish' },
];

function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Service Type & Basics
    serviceCategory: '',
    serviceLocation: 'Montreal, QC', // Default location from header
    serviceIntent: '',
    serviceOffering: '',
    // Step 2: Title
    title: '',
    selectedSuggestion: null,
    // Step 3: Description
    whatsIncluded: '',
    pricing: '',
    availability: '',
    experience: '',
    // Track AI-generated content for modification requirement
    generatedContent: null,
    hasModifiedContent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        // Require category, intent, and service offering
        return formData.serviceCategory !== '' && 
               formData.serviceIntent !== '' && 
               formData.serviceOffering?.trim() !== '';
      case 1:
        return formData.title.trim() !== '';
      case 2:
        // Require content AND modification if AI-generated
        const hasContent = formData.whatsIncluded.trim() !== '' && formData.pricing.trim() !== '';
        const contentWasGenerated = formData.generatedContent !== null;
        if (contentWasGenerated) {
          return hasContent && formData.hasModifiedContent;
        }
        return hasContent;
      default:
        return true;
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  if (isSubmitted) {
    return (
      <div className="wizard-success">
        <Grid>
          <Column lg={12} md={8} sm={4}>
            <InlineNotification
              kind="success"
              title="Your service has been posted!"
              subtitle="Your listing is now live and visible to potential customers."
              hideCloseButton
              lowContrast
            />
            <div style={{ marginTop: 'var(--cds-spacing-07)' }}>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(0);
                  setFormData({
                    serviceCategory: '',
                    serviceLocation: 'Montreal, QC',
                    serviceIntent: '',
                    serviceOffering: '',
                    title: '',
                    selectedSuggestion: null,
                    whatsIncluded: '',
                    pricing: '',
                    availability: '',
                    experience: '',
                    generatedContent: null,
                    hasModifiedContent: false,
                  });
                }}
              >
                Post Another Service
              </Button>
            </div>
          </Column>
        </Grid>
      </div>
    );
  }

  return (
    <div className="wizard-container" role="form" aria-labelledby="wizard-title" aria-describedby="wizard-description">
      {/* Header Section */}
      <div className="wizard-header" style={{ marginBottom: 'var(--cds-spacing-07)' }}>
        <h1 
          id="wizard-title"
          style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '2rem', 
            fontWeight: 400,
            lineHeight: '40px',
            marginBottom: 'var(--cds-spacing-05)' 
          }}
        >
          Post A Service
        </h1>
        <p 
          id="wizard-description"
          style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            color: '#161616', 
            fontSize: '1.75rem',
            fontWeight: 400,
            lineHeight: '36px',
          }}
        >
          Let's start with the basics. You can refine this later.
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentIndex={currentStep} spaceEqually style={{ marginBottom: 'var(--cds-spacing-08)' }}>
        {steps.map((step, index) => (
          <ProgressStep
            key={index}
            label={step.label}
            description={step.description}
          />
        ))}
      </ProgressIndicator>

      {/* Step Content */}
      <div 
        className="wizard-content" 
        style={{ minHeight: '400px' }}
        role="region"
        aria-label={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].label}`}
        aria-live="polite"
      >
        <WizardStep isActive={currentStep === 0}>
          <Step1ServiceType formData={formData} updateFormData={updateFormData} />
        </WizardStep>

        <WizardStep isActive={currentStep === 1}>
          <Step2TitleCreation formData={formData} updateFormData={updateFormData} />
        </WizardStep>

        <WizardStep isActive={currentStep === 2}>
          <Step3Description formData={formData} updateFormData={updateFormData} />
        </WizardStep>

        <WizardStep isActive={currentStep === 3}>
          <Step4Review formData={formData} updateFormData={updateFormData} />
        </WizardStep>
      </div>

      {/* Navigation Footer */}
      <nav
        className="wizard-footer"
        aria-label="Wizard navigation"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'var(--cds-spacing-07)',
          paddingTop: 'var(--cds-spacing-05)',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Button
          kind="secondary"
          onClick={handleBack}
          disabled={isFirstStep}
          renderIcon={ArrowLeft}
        >
          Previous
        </Button>

        {isLastStep ? (
          <Button onClick={handleSubmit} renderIcon={Checkmark} kind="primary">
            Publish Listing
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            renderIcon={ArrowRight}
            disabled={!canProceed()}
          >
            Next
          </Button>
        )}
      </nav>
    </div>
  );
}

export default Wizard;
