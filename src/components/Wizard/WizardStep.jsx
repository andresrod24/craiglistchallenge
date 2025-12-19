function WizardStep({ children, isActive }) {
  if (!isActive) {
    return null;
  }

  return (
    <div className="wizard-step" style={{ padding: 'var(--cds-spacing-07) 0' }}>
      {children}
    </div>
  );
}

export default WizardStep;

