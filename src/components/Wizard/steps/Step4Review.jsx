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
} from '@carbon/react';
import { 
  Checkmark, 
  Edit, 
  Warning, 
  Currency,
  Time,
  Certificate,
  DocumentTasks,
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

function Step4Review({ formData }) {
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
          marginBottom: '0.5rem' 
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
      <Tile style={{ 
        backgroundColor: qualityScore >= 75 ? '#defbe6' : qualityScore >= 50 ? '#fcf4d6' : '#fff1f1',
        border: '1px solid',
        borderColor: qualityScore >= 75 ? '#198038' : qualityScore >= 50 ? '#f1c21b' : '#da1e28',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ 
              fontFamily: "'IBM Plex Sans', sans-serif",
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: 600,
              lineHeight: '18px',
            }}>
              Listing Quality Score
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {qualityChecks.map((check, index) => (
                <Tag 
                  key={index} 
                  type={check.passed ? 'green' : 'gray'}
                  size="sm"
                >
                  {check.passed ? <Checkmark size={12} /> : <Warning size={12} />}
                  <span style={{ marginLeft: '4px' }}>{check.label}</span>
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: qualityScore >= 75 ? '#198038' : qualityScore >= 50 ? '#f1c21b' : '#da1e28',
          }}>
            {qualityScore}%
          </div>
        </div>
      </Tile>

      {/* Listing Preview Card */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
        {/* Preview Header */}
        <div style={{ 
          backgroundColor: '#f4f4f4', 
          padding: '0.75rem 1rem',
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
        <div style={{ padding: '1.5rem' }}>
          {/* Category Tag */}
          <Tag type="blue" size="sm" style={{ marginBottom: '0.75rem' }}>
            {serviceCategories[formData.serviceCategory] || 'Service'}
          </Tag>

          {/* Title */}
          <h3 style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1.25rem', 
            fontWeight: 600, 
            lineHeight: '28px',
            marginBottom: '1rem',
            color: '#161616',
          }}>
            {formData.title || 'Your listing title will appear here'}
          </h3>

          {/* Quick Info */}
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {formData.pricing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Currency size={16} style={{ color: '#525252' }} />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Time size={16} style={{ color: '#525252' }} />
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
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <DocumentTasks size={16} style={{ color: '#0f62fe' }} />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Certificate size={16} style={{ color: '#0f62fe' }} />
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
                <Checkmark size={12} />
                <span style={{ marginLeft: '4px' }}>Complete</span>
              </Tag>
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit}>Edit</Button>
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Title</StructuredListCell>
            <StructuredListCell>
              {formData.title ? (
                <Tag type="green" size="sm">
                  <Checkmark size={12} />
                  <span style={{ marginLeft: '4px' }}>Complete</span>
                </Tag>
              ) : (
                <Tag type="red" size="sm">Missing</Tag>
              )}
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit}>Edit</Button>
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>Description</StructuredListCell>
            <StructuredListCell>
              {formData.whatsIncluded && formData.pricing ? (
                <Tag type="green" size="sm">
                  <Checkmark size={12} />
                  <span style={{ marginLeft: '4px' }}>Complete</span>
                </Tag>
              ) : (
                <Tag type="gray" size="sm">Incomplete</Tag>
              )}
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="ghost" size="sm" renderIcon={Edit}>Edit</Button>
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

