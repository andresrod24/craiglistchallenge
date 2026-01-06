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
  AILabel,
  AILabelContent,
  FileUploaderDropContainer,
  FileUploaderItem,
} from '@carbon/react';
import { MagicWand, Information, Checkmark, Warning, Image as ImageIcon, TrashCan, QrCode } from '@carbon/icons-react';

function Step3Description({ formData, updateFormData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle photo upload
  const handlePhotoUpload = (event, { addedFiles }) => {
    const newPhotos = addedFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      file: file,
      preview: URL.createObjectURL(file),
      status: 'complete',
    }));
    
    updateFormData('photos', [...(formData.photos || []), ...newPhotos]);
  };

  // Handle photo removal
  const handlePhotoRemove = (photoId) => {
    const updatedPhotos = (formData.photos || []).filter((photo) => photo.id !== photoId);
    // Revoke the object URL to free memory
    const photoToRemove = (formData.photos || []).find((photo) => photo.id === photoId);
    if (photoToRemove?.preview) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
    updateFormData('photos', updatedPhotos);
  };

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
          marginBottom: 'var(--cds-spacing-03)' 
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

      {/* Progress Indicator - Accessible Status Banner */}
      <div 
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Form completion status: ${status.filled} of ${status.total} sections completed${status.filled === status.total ? '. All sections complete.' : '. Continue filling out the remaining sections.'}`}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--cds-spacing-03)',
          padding: 'var(--cds-spacing-04) var(--cds-spacing-05)',
          backgroundColor: status.filled === status.total ? '#defbe6' : '#f4f4f4',
          borderRadius: '4px',
          border: status.filled === status.total ? '1px solid #24a148' : '1px solid #e0e0e0',
        }}
      >
        {status.filled === status.total ? (
          <Checkmark 
            size={16} 
            style={{ color: '#0e6027' }} 
            aria-hidden="true" 
          />
        ) : (
          <Information 
            size={16} 
            style={{ color: '#525252' }} 
            aria-hidden="true" 
          />
        )}
        <span style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '0.875rem', 
          fontWeight: status.filled === status.total ? 600 : 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
          color: status.filled === status.total ? '#0e6027' : '#161616',
        }}>
          {status.filled} of {status.total} sections completed
        </span>
        {status.filled === status.total && (
          <span className="cds--visually-hidden">
            All required sections have been filled out. You may proceed to the next step.
          </span>
        )}
      </div>

      {/* AI Draft Generator */}
      {!formData.generatedContent && (
        <Tile style={{ backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--cds-spacing-05)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)', marginBottom: 'var(--cds-spacing-03)' }}>
                <h4 style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  margin: 0,
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  lineHeight: '18px',
                }}>
                  Need help getting started?
                </h4>
                <AILabel size="mini" aria-label="AI-powered draft generation">
                  <AILabelContent>
                    <p style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.875rem',
                      lineHeight: '1.4',
                      margin: 0,
                    }}>
                      <strong>AI Draft Generation</strong>
                    </p>
                    <p style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.75rem',
                      color: '#525252',
                      marginTop: 'var(--cds-spacing-03)',
                      marginBottom: 0,
                    }}>
                      This feature uses AI to create a starting draft based on your service category and description. You must review and personalize the content before publishing.
                    </p>
                  </AILabelContent>
                </AILabel>
              </div>
              <p style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                color: '#525252', 
                marginBottom: 'var(--cds-spacing-05)' 
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)' }}>
              <span>What's Included</span>
              {formData.whatsIncluded?.trim() && (
                formData.generatedContent && formData.whatsIncluded === formData.generatedContent.whatsIncluded ? (
                  <AILabel size="mini" kind="inline" aria-label="AI-generated content" />
                ) : (
                  <Tag type="green" size="sm">Completed</Tag>
                )
              )}
            </div>
          }
          open
        >
          <Stack gap={4} style={{ padding: 'var(--cds-spacing-05) 0' }}>
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
              labelText="What's included in your service"
              hideLabel
              aria-label="What's included in your service"
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)' }}>
              <span>Pricing & Availability</span>
              {formData.pricing?.trim() && formData.availability?.trim() && (
                formData.generatedContent && 
                formData.pricing === formData.generatedContent.pricing && 
                formData.availability === formData.generatedContent.availability ? (
                  <AILabel size="mini" kind="inline" aria-label="AI-generated content" />
                ) : (
                  <Tag type="green" size="sm">Completed</Tag>
                )
              )}
            </div>
          }
        >
          <Stack gap={4} style={{ padding: 'var(--cds-spacing-05) 0' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)' }}>
              <span>Experience & Credentials</span>
              {formData.experience?.trim() && (
                formData.generatedContent && formData.experience === formData.generatedContent.experience ? (
                  <AILabel size="mini" kind="inline" aria-label="AI-generated content" />
                ) : (
                  <Tag type="green" size="sm">Completed</Tag>
                )
              )}
            </div>
          }
        >
          <Stack gap={4} style={{ padding: 'var(--cds-spacing-05) 0' }}>
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
              labelText="Experience and credentials"
              hideLabel
              aria-label="Experience and credentials"
              placeholder="Example:&#10;• 5 years of professional experience&#10;• Certified by [Organization]&#10;• Fully insured&#10;• Background checked"
              value={formData.experience || ''}
              onChange={(e) => updateFormData('experience', e.target.value)}
              rows={4}
              warn={formData.generatedContent && formData.experience === formData.generatedContent.experience}
              warnText="Please personalize this AI-generated content"
            />
          </Stack>
        </AccordionItem>

        {/* Add Photos - Optional Section */}
        <AccordionItem 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)' }}>
              <span>Add Photos</span>
              <Tag type="gray" size="sm">Optional</Tag>
              {(formData.photos?.length > 0) && (
                <Tag type="green" size="sm">{formData.photos.length} photo{formData.photos.length !== 1 ? 's' : ''}</Tag>
              )}
            </div>
          }
        >
          <Stack gap={5} style={{ padding: 'var(--cds-spacing-05) 0' }}>
            <p style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '0.875rem', 
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: '0.16px',
              color: '#525252' 
            }}>
              Add photos to showcase your work. Listings with photos get 3x more views.
            </p>

            {/* Dropzone */}
            <FileUploaderDropContainer
              accept={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
              labelText="Drag and drop files here or click to upload"
              multiple
              onAddFiles={handlePhotoUpload}
              aria-label="Drag and drop photos or click to upload"
              style={{
                backgroundColor: '#f4f4f4',
                border: '2px dashed #c6c6c6',
                borderRadius: '4px',
                padding: 'var(--cds-spacing-06)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background-color 0.15s ease',
              }}
            />

            {/* Photo Grid Preview */}
            {(formData.photos?.length > 0) && (
              <div 
                role="list" 
                aria-label={`Uploaded photos: ${formData.photos.length} photo${formData.photos.length !== 1 ? 's' : ''}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: 'var(--cds-spacing-04)',
                }}
              >
                {formData.photos.map((photo) => (
                  <div 
                    key={photo.id}
                    role="listitem"
                    style={{
                      position: 'relative',
                      aspectRatio: '1',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#f4f4f4',
                    }}
                  >
                    <img
                      src={photo.preview}
                      alt={photo.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handlePhotoRemove(photo.id)}
                      aria-label={`Remove ${photo.name}`}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(218, 30, 40, 0.9)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                    >
                      <TrashCan size={14} style={{ color: '#ffffff' }} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* QR Code Section for Mobile Upload */}
            <Tile 
              style={{ 
                backgroundColor: '#f4f4f4', 
                border: '1px solid #e0e0e0',
                padding: 'var(--cds-spacing-05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-05)' }}>
                {/* QR Code Placeholder */}
                <div 
                  aria-label="QR code for mobile photo upload"
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* SVG QR Code Placeholder */}
                  <svg 
                    width="80" 
                    height="80" 
                    viewBox="0 0 80 80" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* QR Code Pattern - Simplified representation */}
                    <rect width="80" height="80" fill="white"/>
                    {/* Top-left finder pattern */}
                    <rect x="4" y="4" width="24" height="24" fill="#161616"/>
                    <rect x="8" y="8" width="16" height="16" fill="white"/>
                    <rect x="12" y="12" width="8" height="8" fill="#161616"/>
                    {/* Top-right finder pattern */}
                    <rect x="52" y="4" width="24" height="24" fill="#161616"/>
                    <rect x="56" y="8" width="16" height="16" fill="white"/>
                    <rect x="60" y="12" width="8" height="8" fill="#161616"/>
                    {/* Bottom-left finder pattern */}
                    <rect x="4" y="52" width="24" height="24" fill="#161616"/>
                    <rect x="8" y="56" width="16" height="16" fill="white"/>
                    <rect x="12" y="60" width="8" height="8" fill="#161616"/>
                    {/* Data modules - simplified pattern */}
                    <rect x="32" y="4" width="4" height="4" fill="#161616"/>
                    <rect x="40" y="4" width="4" height="4" fill="#161616"/>
                    <rect x="32" y="12" width="4" height="4" fill="#161616"/>
                    <rect x="44" y="12" width="4" height="4" fill="#161616"/>
                    <rect x="36" y="20" width="4" height="4" fill="#161616"/>
                    <rect x="4" y="32" width="4" height="4" fill="#161616"/>
                    <rect x="12" y="36" width="4" height="4" fill="#161616"/>
                    <rect x="20" y="32" width="4" height="4" fill="#161616"/>
                    <rect x="32" y="32" width="4" height="4" fill="#161616"/>
                    <rect x="40" y="36" width="4" height="4" fill="#161616"/>
                    <rect x="48" y="32" width="4" height="4" fill="#161616"/>
                    <rect x="56" y="36" width="4" height="4" fill="#161616"/>
                    <rect x="64" y="32" width="4" height="4" fill="#161616"/>
                    <rect x="72" y="36" width="4" height="4" fill="#161616"/>
                    <rect x="32" y="44" width="4" height="4" fill="#161616"/>
                    <rect x="44" y="44" width="4" height="4" fill="#161616"/>
                    <rect x="52" y="48" width="4" height="4" fill="#161616"/>
                    <rect x="60" y="44" width="4" height="4" fill="#161616"/>
                    <rect x="32" y="52" width="4" height="4" fill="#161616"/>
                    <rect x="40" y="56" width="4" height="4" fill="#161616"/>
                    <rect x="48" y="52" width="4" height="4" fill="#161616"/>
                    <rect x="56" y="60" width="4" height="4" fill="#161616"/>
                    <rect x="64" y="52" width="4" height="4" fill="#161616"/>
                    <rect x="72" y="56" width="4" height="4" fill="#161616"/>
                    <rect x="32" y="64" width="4" height="4" fill="#161616"/>
                    <rect x="44" y="68" width="4" height="4" fill="#161616"/>
                    <rect x="52" y="64" width="4" height="4" fill="#161616"/>
                    <rect x="60" y="72" width="4" height="4" fill="#161616"/>
                    <rect x="72" y="68" width="4" height="4" fill="#161616"/>
                  </svg>
                </div>
                
                {/* QR Code Instructions */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)', marginBottom: 'var(--cds-spacing-03)' }}>
                    <QrCode size={20} style={{ color: '#0f62fe' }} aria-hidden="true" />
                    <span style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.875rem', 
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: '#161616',
                    }}>
                      Upload from your phone
                    </span>
                  </div>
                  <p style={{ 
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '0.75rem', 
                    fontWeight: 400,
                    lineHeight: '16px',
                    letterSpacing: '0.32px',
                    color: '#525252',
                    margin: 0,
                  }}>
                    Scan this QR code with your phone's camera to upload photos directly from your mobile device. The photos will appear here automatically.
                  </p>
                </div>
              </div>
            </Tile>

            {/* Accepted formats info */}
            <p style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '0.75rem', 
              fontWeight: 400,
              lineHeight: '16px',
              letterSpacing: '0.32px',
              color: '#6f6f6f',
              margin: 0,
            }}>
              Accepted formats: JPG, PNG, WebP, GIF. Maximum 10 photos.
            </p>
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

