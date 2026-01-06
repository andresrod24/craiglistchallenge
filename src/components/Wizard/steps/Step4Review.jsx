import { 
  Stack, 
  Tile,
  Tag,
  Button,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  SkeletonText,
  SkeletonPlaceholder,
} from '@carbon/react';
import { 
  Checkmark, 
  Edit, 
  Warning, 
  Currency,
  Time,
  Certificate,
  DocumentTasks,
  BuildingInsights_1 as BuildingIcon,
} from '@carbon/icons-react';

const serviceCategories = {
  'automotive': 'Automotive',
  'beauty': 'Beauty',
  'cell-phone': 'Cell Phone / Mobile',
  'creative': 'Creative',
  'cycle': 'Cycle',
  'event': 'Event / Class',
  'household': 'Household',
  'labor': 'Labor',
  'legal': 'Legal',
  'travel': 'Travel / Vacation',
  'tutoring': 'Tutoring',
  'writing': 'Writing',
};

function Step4Review({ formData, isBuilding }) {
  // Show building/loading state
  if (isBuilding) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label="Building your listing preview, please wait"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: 'var(--cds-spacing-07)',
        }}
      >
        {/* Animated Building Icon */}
        <div
          style={{
            marginBottom: 'var(--cds-spacing-06)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          <BuildingIcon size={64} style={{ color: '#0f62fe' }} aria-hidden="true" />
        </div>
        
        {/* Loading Message */}
        <h3
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 400,
            lineHeight: '28px',
            color: '#161616',
            marginBottom: 'var(--cds-spacing-05)',
            textAlign: 'center',
          }}
        >
          Building your listing preview...
        </h3>
        
        <p
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '18px',
            color: '#525252',
            marginBottom: 'var(--cds-spacing-07)',
            textAlign: 'center',
          }}
        >
          Analyzing your content and preparing the preview
        </p>

        {/* Skeleton Preview */}
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            padding: 'var(--cds-spacing-05)',
          }}
        >
          <SkeletonText heading width="40%" style={{ marginBottom: 'var(--cds-spacing-04)' }} />
          <SkeletonText width="70%" style={{ marginBottom: 'var(--cds-spacing-03)' }} />
          <SkeletonText width="85%" style={{ marginBottom: 'var(--cds-spacing-03)' }} />
          <SkeletonText width="60%" style={{ marginBottom: 'var(--cds-spacing-05)' }} />
          <div style={{ display: 'flex', gap: 'var(--cds-spacing-04)' }}>
            <SkeletonPlaceholder style={{ width: '80px', height: '24px' }} />
            <SkeletonPlaceholder style={{ width: '100px', height: '24px' }} />
          </div>
        </div>

        {/* CSS Keyframe for pulse animation */}
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    );
  }

  // Quality checks
  const qualityChecks = [
    {
      label: 'Clear title',
      passed: formData.title?.length >= 20,
      suggestion: 'Add more details to your title for better visibility',
    },
    {
      label: 'Includes pricing',
      passed: !!formData.pricing?.trim(),
      suggestion: 'Add pricing information to attract serious customers',
    },
    {
      label: 'Service details',
      passed: !!formData.whatsIncluded?.trim(),
      suggestion: 'Describe what\'s included in your service',
    },
    {
      label: 'Has photos',
      passed: formData.photos?.length > 0,
      suggestion: 'Add photos to increase visibility by 3x',
    },
    {
      label: 'Good scanability',
      passed: (formData.whatsIncluded?.includes('•') || formData.whatsIncluded?.includes('-')),
      suggestion: 'Use bullet points to make your listing easier to read',
    },
  ];

  const passedChecks = qualityChecks.filter(c => c.passed).length;
  const qualityScore = Math.round((passedChecks / qualityChecks.length) * 100);

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
          Review your listing
        </h2>
        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          color: '#525252', 
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
        }}>
          Here's how your listing will appear to customers. Make sure everything looks good before publishing.
        </p>
      </div>

      {/* Quality Score */}
      <Tile 
        role="region"
        aria-label={`Listing quality assessment: Score is ${qualityScore} percent. ${qualityScore >= 75 ? 'Good quality listing.' : qualityScore >= 50 ? 'Fair quality listing. Consider improvements.' : 'Needs improvement.'}`}
        style={{ 
          backgroundColor: qualityScore >= 75 ? '#defbe6' : qualityScore >= 50 ? '#fcf4d6' : '#fff1f1',
          border: '1px solid',
          borderColor: qualityScore >= 75 ? '#24a148' : qualityScore >= 50 ? '#f1c21b' : '#da1e28',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 
              id="quality-score-heading"
              style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                marginBottom: 'var(--cds-spacing-03)', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                lineHeight: '18px',
                color: qualityScore >= 75 ? '#0e6027' : qualityScore >= 50 ? '#161616' : '#750e13',
              }}
            >
              Listing Quality Score
            </h4>
            <div 
              role="list" 
              aria-label={`Quality checks: ${passedChecks} of ${qualityChecks.length} passed`}
              style={{ display: 'flex', gap: 'var(--cds-spacing-03)', flexWrap: 'wrap' }}
            >
              {qualityChecks.map((check, index) => (
                <Tag 
                  key={index} 
                  type={check.passed ? 'green' : 'gray'}
                  size="sm"
                  role="listitem"
                  title={check.passed ? `${check.label}: Passed` : `${check.label}: ${check.suggestion}`}
                >
                  {check.passed ? <Checkmark size={12} aria-hidden="true" /> : <Warning size={12} aria-hidden="true" />}
                  <span style={{ marginLeft: 'var(--cds-spacing-02)' }}>
                    {check.label}
                    <span className="cds--visually-hidden">
                      : {check.passed ? 'passed' : `not passed. ${check.suggestion}`}
                    </span>
                  </span>
                </Tag>
              ))}
            </div>
          </div>
          <div 
            role="status"
            aria-live="polite"
            style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: qualityScore >= 75 ? '#0e6027' : qualityScore >= 50 ? '#8a6116' : '#750e13',
            }}
          >
            <span aria-label={`Quality score: ${qualityScore} percent. ${qualityScore >= 75 ? 'Good' : qualityScore >= 50 ? 'Fair' : 'Needs improvement'}`}>
              {qualityScore}%
            </span>
          </div>
        </div>
      </Tile>

      {/* Listing Preview Card */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
        {/* Preview Header */}
        <div style={{ 
          backgroundColor: '#f4f4f4', 
          padding: 'var(--cds-spacing-04) var(--cds-spacing-05)',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '0.75rem', 
            fontWeight: 400,
            lineHeight: '16px',
            letterSpacing: '0.32px',
            color: '#525252', 
            textTransform: 'uppercase',
          }}>
            Preview – How customers will see your listing
          </span>
          <Tag type="outline" size="sm">Draft</Tag>
        </div>

        {/* Preview Content */}
        <div style={{ padding: 'var(--cds-spacing-06)' }}>
          {/* Category Tag */}
          <Tag type="blue" size="sm" style={{ marginBottom: 'var(--cds-spacing-04)' }}>
            {serviceCategories[formData.serviceCategory] || 'Service'}
          </Tag>

          {/* Title */}
          <h3 style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1.25rem', 
            fontWeight: 600, 
            lineHeight: '28px',
            marginBottom: 'var(--cds-spacing-05)',
            color: '#161616',
          }}>
            {formData.title || 'Your listing title will appear here'}
          </h3>

          {/* Quick Info */}
          <div style={{ 
            display: 'flex', 
            gap: 'var(--cds-spacing-06)', 
            marginBottom: 'var(--cds-spacing-06)',
            flexWrap: 'wrap',
          }}>
            {formData.pricing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)' }}>
                <Currency size={16} style={{ color: '#525252' }} aria-hidden="true" />
                <span style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem', 
                  fontWeight: 400,
                  lineHeight: '18px',
                  letterSpacing: '0.16px',
                  color: '#525252' 
                }}>
                  {formData.pricing.substring(0, 40)}...
                </span>
              </div>
            )}
            {formData.availability && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)' }}>
                <Time size={16} style={{ color: '#525252' }} aria-hidden="true" />
                <span style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem', 
                  fontWeight: 400,
                  lineHeight: '18px',
                  letterSpacing: '0.16px',
                  color: '#525252' 
                }}>
                  {formData.availability.substring(0, 30)}...
                </span>
              </div>
            )}
          </div>

          {/* Description Preview */}
          {formData.whatsIncluded && (
            <div style={{ marginBottom: 'var(--cds-spacing-05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)', marginBottom: 'var(--cds-spacing-03)' }}>
                <DocumentTasks size={16} style={{ color: '#0f62fe' }} aria-hidden="true" />
                <span style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  lineHeight: '18px',
                }}>What's Included</span>
              </div>
              <p style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                color: '#525252',
                whiteSpace: 'pre-line',
              }}>
                {formData.whatsIncluded.substring(0, 200)}
                {formData.whatsIncluded.length > 200 && '...'}
              </p>
            </div>
          )}

          {formData.experience && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-03)', marginBottom: 'var(--cds-spacing-03)' }}>
                <Certificate size={16} style={{ color: '#0f62fe' }} aria-hidden="true" />
                <span style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  lineHeight: '18px',
                }}>Experience</span>
              </div>
              <p style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                color: '#525252',
                whiteSpace: 'pre-line',
              }}>
                {formData.experience.substring(0, 150)}
                {formData.experience.length > 150 && '...'}
              </p>
            </div>
          )}

          {/* Photos Gallery Preview */}
          {formData.photos?.length > 0 && (
            <div style={{ marginTop: 'var(--cds-spacing-05)' }}>
              <span style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 600,
                lineHeight: '18px',
                display: 'block',
                marginBottom: 'var(--cds-spacing-03)',
              }}>Photos ({formData.photos.length})</span>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: 'var(--cds-spacing-03)',
                }}
              >
                {formData.photos.slice(0, 4).map((photo) => (
                  <div
                    key={photo.id}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: '1px solid #e0e0e0',
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
                  </div>
                ))}
                {formData.photos.length > 4 && (
                  <div
                    style={{
                      aspectRatio: '1',
                      borderRadius: '4px',
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#525252',
                    }}
                  >
                    +{formData.photos.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Edit Options */}
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Section</StructuredListCell>
            <StructuredListCell head>Status</StructuredListCell>
            <StructuredListCell head>Action</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell>Service Category</StructuredListCell>
            <StructuredListCell>
              <Tag type="green" size="sm">
                <Checkmark size={12} aria-hidden="true" />
                <span style={{ marginLeft: 'var(--cds-spacing-02)' }}>Complete</span>
              </Tag>
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit} aria-label="Edit service category">Edit</Button>
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Title</StructuredListCell>
            <StructuredListCell>
              {formData.title ? (
                <Tag type="green" size="sm">
                  <Checkmark size={12} aria-hidden="true" />
                  <span style={{ marginLeft: 'var(--cds-spacing-02)' }}>Complete</span>
                </Tag>
              ) : (
                <Tag type="red" size="sm">Missing</Tag>
              )}
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit} aria-label="Edit title">Edit</Button>
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Description</StructuredListCell>
            <StructuredListCell>
              {formData.whatsIncluded && formData.pricing ? (
                <Tag type="green" size="sm">
                  <Checkmark size={12} aria-hidden="true" />
                  <span style={{ marginLeft: 'var(--cds-spacing-02)' }}>Complete</span>
                </Tag>
              ) : (
                <Tag type="gray" size="sm">Incomplete</Tag>
              )}
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit} aria-label="Edit description">Edit</Button>
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Photos</StructuredListCell>
            <StructuredListCell>
              {formData.photos?.length > 0 ? (
                <Tag type="green" size="sm">
                  <Checkmark size={12} aria-hidden="true" />
                  <span style={{ marginLeft: 'var(--cds-spacing-02)' }}>{formData.photos.length} photo{formData.photos.length !== 1 ? 's' : ''}</span>
                </Tag>
              ) : (
                <Tag type="gray" size="sm">Optional</Tag>
              )}
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit} aria-label="Edit photos">Edit</Button>
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>

      {/* Final Note */}
      <Tile style={{ backgroundColor: '#f4f4f4' }}>
        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '0.875rem', 
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
          color: '#525252' 
        }}>
          <span style={{ fontWeight: 600 }}>Ready to publish?</span> Your listing will be reviewed and typically goes live within 24 hours. 
          You can edit your listing at any time after publishing.
        </p>
      </Tile>
    </Stack>
  );
}

export default Step4Review;

