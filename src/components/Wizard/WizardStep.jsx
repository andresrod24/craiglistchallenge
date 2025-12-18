function WizardStep({ children, isActive }) {
  if (!isActive) {
    return null;
  }

  return (
    <div className="wizard-step" style={{ padding: '2rem 0' }}>
      {children}
    </div>
  );
}

export default WizardStep;

