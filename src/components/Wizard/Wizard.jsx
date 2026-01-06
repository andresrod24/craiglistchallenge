import { useState, useEffect } from 'react';
import {
  ProgressIndicator,
  ProgressStep,
  Button,
  Grid,
  Column,
  InlineNotification,
  Tile,
  Tag,
} from '@carbon/react';
import {
  Checkmark,
  Add,
  View,
  List,
  Time,
  Certificate,
  Image as ImageIcon,
} from '@carbon/icons-react';

import WizardStep from './WizardStep';
import Step1ServiceType from './steps/Step1ServiceType';
import Step2TitleCreation from './steps/Step2TitleCreation';
import Step3Description from './steps/Step3Description';
import Step4Review from './steps/Step4Review';

const steps = [
  { label: 'Basic Info.', secondaryLabel: '' },
  { label: 'Create Title', secondaryLabel: '' },
  { label: 'Describe Listing', secondaryLabel: '' },
  { label: 'Preview Listing', secondaryLabel: '' },
];

function Wizard({ currentStep, setCurrentStep, onCanProceedChange, isSubmitted, setIsSubmitted }) {
  const [isBuilding, setIsBuilding] = useState(false);
  const [previousStep, setPreviousStep] = useState(currentStep);
  
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
    photos: [], // Array of uploaded photo objects { id, name, preview }
    // Track AI-generated content for modification requirement
    generatedContent: null,
    hasModifiedContent: false,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate if user can proceed based on current step
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

  // Notify parent of canProceed changes
  useEffect(() => {
    onCanProceedChange(canProceed());
  }, [formData, currentStep]);

  // Trigger building animation when entering Step 4 (Preview) from Step 3 (Describe)
  useEffect(() => {
    // Only trigger if moving forward from step 3 to step 4
    if (previousStep === 2 && currentStep === 3) {
      setIsBuilding(true);
      // Auto-dismiss after 1.5 seconds
      const timer = setTimeout(() => {
        setIsBuilding(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    setPreviousStep(currentStep);
  }, [currentStep, previousStep]);

  if (isSubmitted) {
    return (
      <div 
        className="wizard-layout" 
        role="region"
        aria-label="Submission successful"
        style={{ 
          width: '100%', 
          padding: 'var(--cds-spacing-07)',
          backgroundColor: '#f4f4f4',
          minHeight: 'calc(100vh - 189px)', // Adjust for header and breadcrumbs
        }}
      >
        <div className="wizard-success" style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Success Heading */}
          <h1 
            style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '2rem', 
              fontWeight: 300,
              lineHeight: '40px',
              marginBottom: 'var(--cds-spacing-07)',
              color: '#161616',
            }}
          >
            Your Service Is Live!
          </h1>

          {/* Listing Preview Card */}
          <Tile
            style={{
              padding: 'var(--cds-spacing-05)',
              marginBottom: 'var(--cds-spacing-06)',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--cds-spacing-05)' }}>
              {/* Thumbnail - Show first photo or empty state */}
              {formData.photos?.length > 0 ? (
                <div 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={formData.photos[0].preview}
                    alt={`Listing photo: ${formData.photos[0].name}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ) : (
                <div 
                  role="img"
                  aria-label="No image added to listing"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #a8a8a8',
                  }}
                >
                  <ImageIcon 
                    size={32} 
                    style={{ color: '#6f6f6f' }}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Listing Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  lineHeight: '22px',
                  marginBottom: 'var(--cds-spacing-03)',
                  color: '#161616',
                }}>
                  {formData.title || 'Your Service Listing'}
                </h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--cds-spacing-04)',
                  color: '#525252',
                  fontSize: '0.875rem',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-02)' }}>
                    <Time size={16} aria-hidden="true" />
                    Posted just now
                  </span>
                  <span>•</span>
                  <span>0 Views</span>
                  <span>•</span>
                  <span>0 Inquiries</span>
                </div>
              </div>

              {/* Active Status Badge */}
              <Tag 
                type="green" 
                size="md"
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#24a148',
                  color: '#ffffff',
                }}
              >
                Active
              </Tag>
            </div>
          </Tile>

          {/* Tips For Success Section */}
          <Tile
            style={{
              padding: 'var(--cds-spacing-05)',
              marginBottom: 'var(--cds-spacing-06)',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)', marginBottom: 'var(--cds-spacing-04)' }}>
              <Certificate size={20} style={{ color: '#161616' }} aria-hidden="true" />
              <h4 style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '1rem', 
                fontWeight: 600,
                lineHeight: '22px',
                color: '#161616',
                margin: 0,
              }}>
                Tips For Success
              </h4>
            </div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--cds-spacing-03)',
            }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 'var(--cds-spacing-03)',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem',
                lineHeight: '20px',
                color: '#525252',
              }}>
                <Checkmark size={16} style={{ color: '#525252', marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                Respond to inquiries within 24 hours for better visibility
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 'var(--cds-spacing-03)',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem',
                lineHeight: '20px',
                color: '#525252',
              }}>
                <Checkmark size={16} style={{ color: formData.photos?.length > 0 ? '#24a148' : '#525252', marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                {formData.photos?.length > 0 
                  ? `Great! You added ${formData.photos.length} photo${formData.photos.length !== 1 ? 's' : ''} to your listing`
                  : 'Add photos after posting to increase visibility by 3x'
                }
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 'var(--cds-spacing-03)',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem',
                lineHeight: '20px',
                color: '#525252',
              }}>
                <Checkmark size={16} style={{ color: '#525252', marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                Update your listing if availability changes
              </li>
            </ul>
          </Tile>

          {/* What Would You Like To Do Next Section */}
          <div>
            <h4 style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '1.25rem', 
              fontWeight: 400,
              lineHeight: '28px',
              color: '#161616',
              marginBottom: 'var(--cds-spacing-05)',
            }}>
              What would you like to do next?
            </h4>
            
            <div style={{ 
              display: 'flex', 
              gap: 'var(--cds-spacing-04)',
              flexWrap: 'wrap',
            }}>
              {/* Post Another Service */}
                <button
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
                      photos: [],
                      generatedContent: null,
                      hasModifiedContent: false,
                    });
                  }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--cds-spacing-04) var(--cds-spacing-05)',
                  minWidth: '180px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #0f62fe',
                  borderRadius: '0',
                  cursor: 'pointer',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#0f62fe',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5f0ff'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                <span>Post another service</span>
                <Add size={16} aria-hidden="true" />
              </button>

              {/* Browse Listings */}
              <button
                onClick={() => console.log('Browse Listings clicked')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--cds-spacing-04) var(--cds-spacing-05)',
                  minWidth: '180px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #0f62fe',
                  borderRadius: '0',
                  cursor: 'pointer',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#0f62fe',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5f0ff'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                <span>Browse Listings</span>
                <Add size={16} aria-hidden="true" />
              </button>

              {/* My Listings */}
              <button
                onClick={() => console.log('My Listings clicked')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--cds-spacing-04) var(--cds-spacing-05)',
                  minWidth: '180px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #0f62fe',
                  borderRadius: '0',
                  cursor: 'pointer',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#0f62fe',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5f0ff'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                <span>My Listings</span>
                <Add size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-layout" style={{ display: 'flex', width: '100%' }}>
      {/* Vertical Stepper Sidebar */}
      <aside 
        className="wizard-sidebar"
        role="navigation"
        aria-label={`Wizard progress: Step ${currentStep + 1} of ${steps.length}`}
        style={{
          width: '256px',
          minWidth: '256px',
          padding: 'var(--cds-spacing-05)',
          paddingTop: 'var(--cds-spacing-05)', // 16px - matching form content
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
        }}
      >
        <ProgressIndicator 
          currentIndex={currentStep} 
          vertical
          style={{ width: '100%' }}
        >
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const stepStatus = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';
            
            return (
              <ProgressStep
                key={index}
                label={step.label}
                secondaryLabel={step.secondaryLabel}
                description={`Step ${index + 1}: ${step.label} - ${stepStatus}`}
                onClick={() => {
                  // Allow clicking on completed steps to navigate back
                  if (isCompleted) {
                    setCurrentStep(index);
                  }
                }}
                style={{ cursor: isCompleted ? 'pointer' : 'default' }}
              />
            );
          })}
        </ProgressIndicator>
      </aside>

      {/* Form Content Area */}
      <div 
        className="wizard-content-area"
        role="form"
        aria-label={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].label}`}
        aria-live="polite"
        style={{
          flex: 1,
          backgroundColor: '#f4f4f4', // Carbon gray-10, lighter background
          padding: 'var(--cds-spacing-05)', // 16px - matching sidebar
          paddingBottom: 'calc(var(--cds-spacing-05) + 64px)', // Account for fixed footer
          minHeight: '100%',
        }}
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
          <Step4Review formData={formData} updateFormData={updateFormData} isBuilding={isBuilding} />
        </WizardStep>
      </div>
    </div>
  );
}

export default Wizard;
