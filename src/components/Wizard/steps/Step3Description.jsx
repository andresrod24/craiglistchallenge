import { useState, useEffect } from 'react';
import { 
  Stack, 
  TextArea, 
  TextInput,
  Accordion,
  AccordionItem,
  Button,
  InlineNotification,
  Tag,
  Tile,
} from '@carbon/react';
import { MagicWand, Information, Checkmark, Warning } from '@carbon/icons-react';

function Step3Description({ formData, updateFormData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Check if content has been modified from the generated version
  const checkIfModified = (currentContent, generatedContent) => {
    if (!generatedContent) return true;
    
    // Check if any field has been meaningfully changed
    const whatsIncludedChanged = currentContent.whatsIncluded !== generatedContent.whatsIncluded;
    const pricingChanged = currentContent.pricing !== generatedContent.pricing;
    const availabilityChanged = currentContent.availability !== generatedContent.availability;
    const experienceChanged = currentContent.experience !== generatedContent.experience;
    
    return whatsIncludedChanged || pricingChanged || availabilityChanged || experienceChanged;
  };

  // Update modification status whenever form content changes
  useEffect(() => {
    if (formData.generatedContent) {
      const isModified = checkIfModified(
        {
          whatsIncluded: formData.whatsIncluded,
          pricing: formData.pricing,
          availability: formData.availability,
          experience: formData.experience,
        },
        formData.generatedContent
      );
      
      if (isModified !== formData.hasModifiedContent) {
        updateFormData('hasModifiedContent', isModified);
      }
    }
  }, [formData.whatsIncluded, formData.pricing, formData.availability, formData.experience, formData.generatedContent]);

  const handleGenerateDraft = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const draft = {
        whatsIncluded: `Our professional ${formData.serviceCategory || 'service'} includes:\n• Initial consultation and assessment\n• High-quality materials and equipment\n• Thorough completion of all tasks\n• Clean-up and final inspection\n• Satisfaction guarantee`,
        pricing: 'Starting at $75 for basic service. Custom quotes available for larger projects. No hidden fees.',
        availability: 'Available Monday-Saturday, 8am-6pm. Same-day appointments available. Weekend slots upon request.',
        experience: '5+ years of professional experience. Fully licensed and insured. Over 100 satisfied customers in the Montreal area.',
      };
      
      // Auto-populate the text areas immediately
      updateFormData('whatsIncluded', draft.whatsIncluded);
      updateFormData('pricing', draft.pricing);
      updateFormData('availability', draft.availability);
      updateFormData('experience', draft.experience);
      
      // Store the generated content to track modifications
      updateFormData('generatedContent', draft);
      updateFormData('hasModifiedContent', false);
      
      setIsGenerating(false);
    }, 1500);
  };

  const getCompletionStatus = () => {
    const fields = ['whatsIncluded', 'pricing', 'availability', 'experience'];
    const filled = fields.filter(f => formData[f]?.trim()).length;
    return { filled, total: fields.length };
  };

  const status = getCompletionStatus();

  return (
    <Stack gap={6}>
      <div>
        <h2 style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '1.25rem', 
          fontWeight: 400, 
          lineHeight: '28px',
          marginBottom: '0.5rem' 
        }}>
          Describe your service
        </h2>
        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          color: '#525252', 
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
        }}>
          Help customers understand exactly what you offer. Fill in each section below.
        </p>
      </div>

      {/* Progress Indicator */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: status.filled === status.total ? '#defbe6' : '#f4f4f4',
        borderRadius: '4px',
      }}>
        {status.filled === status.total ? (
          <Checkmark size={16} style={{ color: '#198038' }} />
        ) : (
          <Information size={16} style={{ color: '#525252' }} />
        )}
        <span style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '0.875rem', 
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
          color: '#161616' 
        }}>
          {status.filled} of {status.total} sections completed
        </span>
      </div>

      {/* AI Draft Generator */}
      {!formData.generatedContent && (
        <Tile style={{ backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <MagicWand size={24} style={{ color: '#0f62fe', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                marginBottom: '0.5rem', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                lineHeight: '18px',
              }}>
                Need help getting started?
              </h4>
              <p style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                color: '#525252', 
                marginBottom: '1rem' 
              }}>
                Let AI generate a draft based on your service type. The content will be filled in automatically for you to customize.
              </p>
              <Button
                kind="tertiary"
                size="sm"
                renderIcon={MagicWand}
                onClick={handleGenerateDraft}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Draft'}
              </Button>
            </div>
          </div>
        </Tile>
      )}

      {/* Modification Required Warning */}
      {formData.generatedContent && !formData.hasModifiedContent && (
        <InlineNotification
          kind="warning"
          lowContrast
          hideCloseButton
          title="Personalization Required"
          subtitle="Please modify at least one field to personalize the AI-generated content before proceeding. This ensures your listing accurately represents your unique service."
        />
      )}

      {/* Content Modified Success */}
      {formData.generatedContent && formData.hasModifiedContent && (
        <InlineNotification
          kind="success"
          lowContrast
          hideCloseButton
          title="Content Personalized"
          subtitle="Great! You've customized the AI-generated draft. You can continue to make more changes or proceed to the next step."
        />
      )}

      {/* Structured Input Sections */}
      <Accordion>
        <AccordionItem 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>What's Included</span>
              {formData.whatsIncluded?.trim() && (
                formData.generatedContent && formData.whatsIncluded === formData.generatedContent.whatsIncluded ? (
                  <Tag type="purple" size="sm">AI Generated</Tag>
                ) : (
                  <Tag type="green" size="sm">Completed</Tag>
                )
              )}
            </div>
          }
          open
        >
          <Stack gap={4} style={{ padding: '1rem 0' }}>
            <p style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '0.875rem', 
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: '0.16px',
              color: '#525252' 
            }}>
              List what customers will receive. Be specific about deliverables.
            </p>
            <TextArea
              id="whats-included"
              labelText=""
              placeholder="Example:&#10;• Initial consultation&#10;• 2-hour deep cleaning session&#10;• All cleaning supplies included&#10;• Follow-up check after 24 hours"
              value={formData.whatsIncluded || ''}
              onChange={(e) => updateFormData('whatsIncluded', e.target.value)}
              rows={5}
              warn={formData.generatedContent && formData.whatsIncluded === formData.generatedContent.whatsIncluded}
              warnText="Please personalize this AI-generated content"
            />
          </Stack>
        </AccordionItem>

        <AccordionItem 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Pricing & Availability</span>
              {formData.pricing?.trim() && formData.availability?.trim() && (
                formData.generatedContent && 
                formData.pricing === formData.generatedContent.pricing && 
                formData.availability === formData.generatedContent.availability ? (
                  <Tag type="purple" size="sm">AI Generated</Tag>
                ) : (
                  <Tag type="green" size="sm">Completed</Tag>
                )
              )}
            </div>
          }
        >
          <Stack gap={4} style={{ padding: '1rem 0' }}>
            <TextInput
              id="pricing"
              labelText="Pricing"
              placeholder="e.g., Starting at $50/hour, or $200 flat rate for full service"
              value={formData.pricing || ''}
              onChange={(e) => updateFormData('pricing', e.target.value)}
              helperText="Be transparent about your rates. Include any range or factors that affect pricing."
              warn={formData.generatedContent && formData.pricing === formData.generatedContent.pricing}
              warnText="Please personalize this AI-generated content"
            />
            <TextInput
              id="availability"
              labelText="Availability"
              placeholder="e.g., Weekdays 9am-5pm, Weekends by appointment"
              value={formData.availability || ''}
              onChange={(e) => updateFormData('availability', e.target.value)}
              helperText="Let customers know when you're available to provide service."
              warn={formData.generatedContent && formData.availability === formData.generatedContent.availability}
              warnText="Please personalize this AI-generated content"
            />
          </Stack>
        </AccordionItem>

        <AccordionItem 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Experience & Credentials</span>
              {formData.experience?.trim() && (
                formData.generatedContent && formData.experience === formData.generatedContent.experience ? (
                  <Tag type="purple" size="sm">AI Generated</Tag>
                ) : (
                  <Tag type="green" size="sm">Completed</Tag>
                )
              )}
            </div>
          }
        >
          <Stack gap={4} style={{ padding: '1rem 0' }}>
            <p style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '0.875rem', 
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: '0.16px',
              color: '#525252' 
            }}>
              Share your qualifications, certifications, or experience that builds trust.
            </p>
            <TextArea
              id="experience"
              labelText=""
              placeholder="Example:&#10;• 5 years of professional experience&#10;• Certified by [Organization]&#10;• Fully insured&#10;• Background checked"
              value={formData.experience || ''}
              onChange={(e) => updateFormData('experience', e.target.value)}
              rows={4}
              warn={formData.generatedContent && formData.experience === formData.generatedContent.experience}
              warnText="Please personalize this AI-generated content"
            />
          </Stack>
        </AccordionItem>
      </Accordion>

      {/* Inline Tips */}
      <InlineNotification
        kind="info"
        lowContrast
        hideCloseButton
        title="Pro Tip"
        subtitle="Listings with complete descriptions get 3x more inquiries. Take your time to fill in each section."
      />
    </Stack>
  );
}

export default Step3Description;

