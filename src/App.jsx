import { useState } from 'react';
import { 
  Theme, 
  Tag, 
  Button, 
  Link,
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
} from '@carbon/react';
import { Location, ArrowRight, ArrowLeft, Checkmark } from '@carbon/icons-react';
import Wizard from './components/Wizard/Wizard';
import craigslistLogoInvert from './assets/craiglist-logo-invert.svg';

function App() {
  // Lifted state for wizard navigation
  const [currentStep, setCurrentStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCancel = () => {
    // Navigate to home - reset wizard
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <Theme theme="g10">
      <div className="app-layout">
        {/* Dark Header */}
        <Theme theme="g100">
          <header 
            role="banner"
            aria-label="Service Posting"
            className="app-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 var(--cds-spacing-05)',
              height: '48px',
              backgroundColor: '#161616',
            }}
          >
            {/* Left side - Logo and Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-05)' }}>
              {/* Craigslist Logo - Inverted for dark theme */}
              <a 
                href="#" 
                aria-label="Craigslist home"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img 
                  src={craigslistLogoInvert} 
                  alt="Craigslist" 
                  style={{ height: '24px', width: 'auto' }}
                />
              </a>
              
              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-02)' }}>
                <Location size={20} aria-hidden="true" style={{ color: '#f4f4f4' }} />
                <Tag 
                  type="outline" 
                  size="md"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #f4f4f4',
                    color: '#f4f4f4',
                  }}
                >
                  Montreal, QC
                </Tag>
              </div>
            </div>

            {/* Right side - User info and Disconnect */}
            <nav 
              aria-label="User actions"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-06)' }}
            >
              <span style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 400,
                lineHeight: '18px',
                color: '#f4f4f4',
              }}>
                Connected as:{' '}
                <Link 
                  href="mailto:iam@andresrodriguez.net"
                  style={{ 
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: '#78a9ff',
                  }}
                >
                  iam@andresrodriguez.net
                </Link>
              </span>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); console.log('Disconnect clicked'); }}
                style={{
                  color: '#78a9ff',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 400,
                }}
              >
                Disconnect
              </Link>
            </nav>
          </header>
        </Theme>

        {/* Breadcrumbs */}
        <div 
          className="breadcrumb-container"
          style={{
            padding: 'var(--cds-spacing-03) var(--cds-spacing-05)',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#f4f4f4',
          }}
        >
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem href="#" onClick={handleCancel}>Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Post a service wizard</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Page Header - Hidden after submission */}
        {!isSubmitted && (
          <div 
            className="page-header"
            style={{
              padding: 'var(--cds-spacing-06) var(--cds-spacing-05)',
              paddingLeft: '16px',
              backgroundColor: '#f4f4f4',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <h1 
              style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '2rem', 
                fontWeight: 400,
                lineHeight: '40px',
                marginBottom: 'var(--cds-spacing-03)',
                color: '#161616',
              }}
            >
              Post A Service
            </h1>
          </div>
        )}

        {/* Main Content - Two Column Layout */}
        <main 
          className="main-content"
          style={{
            display: 'flex',
            minHeight: 'calc(100vh - 48px - 41px - 100px - 64px)', // header - breadcrumb - page-header - footer
            backgroundColor: '#f4f4f4',
          }}
        >
          {/* Wizard with vertical stepper */}
          <Wizard 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onCanProceedChange={setCanProceed}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
          />
        </main>

        {/* Fixed Bottom Navigation - Hidden after submission */}
        {!isSubmitted && (
          <footer 
            className="fixed-footer"
            role="contentinfo"
            aria-label="Wizard navigation"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 var(--cds-spacing-05)',
              height: '64px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e0e0e0',
              zIndex: 1000,
            }}
          >
            <Button
              kind="ghost"
              onClick={handleCancel}
              aria-label="Cancel wizard and return to home"
              style={{
                color: '#0f62fe',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 400,
              }}
            >
              Cancel
            </Button>

            <nav aria-label="Step navigation" style={{ display: 'flex', gap: 'var(--cds-spacing-03)' }}>
              <Button
                kind="secondary"
                onClick={handleBack}
                disabled={isFirstStep}
                size="lg"
                aria-label={isFirstStep ? 'Back (disabled, you are on the first step)' : `Go back to step ${currentStep}`}
                style={{ minWidth: '160px' }}
              >
                Back
              </Button>

              {isLastStep ? (
                <Button 
                  onClick={handleSubmit} 
                  kind="primary"
                  size="lg"
                  aria-label="Publish your listing"
                  style={{ minWidth: '160px' }}
                >
                  Publish Listing
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  kind="primary"
                  disabled={!canProceed}
                  size="lg"
                  aria-label={!canProceed ? 'Next (disabled, complete required fields first)' : `Proceed to step ${currentStep + 2}`}
                  style={{ minWidth: '160px' }}
                >
                  Next
                </Button>
              )}
            </nav>
          </footer>
        )}
      </div>
    </Theme>
  );
}

export default App;
