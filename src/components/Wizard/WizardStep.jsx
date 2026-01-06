function WizardStep({ children, isActive }) {
  if (!isActive) {
    return null;
  }

  return (
    <div className="wizard-step" style={{ padding: '0 0 var(--cds-spacing-07) 0' }}>
      {children}
    </div>
  );
}

export default WizardStep;

