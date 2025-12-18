import { useState, useEffect } from 'react';
import { 
  Stack, 
  ClickableTile, 
  TextArea, 
  RadioButtonGroup, 
  RadioButton,
  Tag,
  Button,
  Tile,
} from '@carbon/react';
import { Checkmark, Edit, ArrowLeft } from '@carbon/icons-react';

const serviceCategories = [
  { id: 'automotive', title: 'Automotive', description: 'Oil change, tire rotation, brake service' },
  { id: 'beauty', title: 'Beauty', description: 'Haircuts, styling, and makeup' },
  { id: 'cell-phone', title: 'Cell Phone / Mobile', description: 'Fix, repairs, cleaning' },
  { id: 'creative', title: 'Creative', description: 'Graphic design, photography, video' },
  { id: 'cycle', title: 'Cycle', description: 'Maintenance, bicycle fit, training' },
  { id: 'event', title: 'Event / Class', description: 'Meetups, workshops, performances' },
  { id: 'household', title: 'Household', description: 'Deep cleaning, regular maintenance, move-in/out' },
  { id: 'labor', title: 'Labor', description: 'Moving, assembly, handyman services' },
  { id: 'legal', title: 'Legal', description: 'Lawyer services, paralegal' },
  { id: 'travel', title: 'Travel / Vacation', description: 'Tour guides, travel planning' },
  { id: 'tutoring', title: 'Tutoring', description: 'Music, languages, sports, test prep' },
  { id: 'writing', title: 'Writing', description: 'Transcription, editing, and copywriting' },
];

function Step1ServiceType({ formData, updateFormData }) {
  const [showBasicsForm, setShowBasicsForm] = useState(false);

  // Transition to basics form after category selection
  useEffect(() => {
    if (formData.serviceCategory && !showBasicsForm) {
      const timer = setTimeout(() => {
        setShowBasicsForm(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [formData.serviceCategory, showBasicsForm]);

  const handleSelect = (categoryId) => {
    updateFormData('serviceCategory', categoryId);
  };

  const handleChangeCategory = () => {
    setShowBasicsForm(false);
    updateFormData('serviceCategory', '');
    updateFormData('serviceIntent', '');
    updateFormData('serviceOffering', '');
  };

  const selectedCategory = serviceCategories.find(c => c.id === formData.serviceCategory);

  // Show the basics form after category selection
  if (showBasicsForm && formData.serviceCategory) {
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
          Tell us more about your service
        </h2>
        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          color: '#525252', 
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
        }}>
          Help us understand what you're offering so we can create the best listing for you.
        </p>
      </div>

        {/* Selected Category Display */}
        <Tile style={{ 
          backgroundColor: '#e5f0ff', 
          border: '1px solid #0f62fe',
          padding: '1rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Checkmark size={20} style={{ color: '#0f62fe' }} />
              <div>
                <span style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.75rem', 
                  fontWeight: 400,
                  lineHeight: '16px',
                  letterSpacing: '0.32px',
                  color: '#525252', 
                  display: 'block' 
                }}>
                  Service Category
                </span>
                <span style={{ 
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  lineHeight: '24px',
                  color: '#161616' 
                }}>
                  {selectedCategory?.title}
                </span>
              </div>
            </div>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Edit}
              onClick={handleChangeCategory}
            >
              Change
            </Button>
          </div>
        </Tile>

        {/* Service Intent */}
        <div>
          <h3 style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1rem', 
            fontWeight: 600, 
            lineHeight: '24px',
            marginBottom: '0.75rem' 
          }}>
            What are you looking to do?
          </h3>
          <RadioButtonGroup
            name="service-intent"
            valueSelected={formData.serviceIntent || ''}
            onChange={(value) => updateFormData('serviceIntent', value)}
            orientation="vertical"
          >
            <RadioButton
              id="intent-offer"
              value="offering"
              labelText="I'm offering a service"
            />
            <RadioButton
              id="intent-seek"
              value="seeking"
              labelText="I'm looking to hire someone"
            />
          </RadioButtonGroup>
        </div>

        {/* Service Offering Description */}
        <div>
          <TextArea
            id="service-offering"
            labelText="Briefly describe what you're offering"
            placeholder="e.g., Professional house cleaning service with eco-friendly products. I specialize in deep cleaning, regular maintenance, and move-in/move-out cleaning."
            value={formData.serviceOffering || ''}
            onChange={(e) => updateFormData('serviceOffering', e.target.value)}
            rows={4}
            helperText="This helps us generate better suggestions for your listing title and description."
          />
        </div>

        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '0.875rem', 
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
          color: '#161616',
          marginTop: '0.5rem'
        }}>
          <span style={{ fontWeight: 700 }}>Cost:</span> A fee of $5 per published listing applies.
        </p>
      </Stack>
    );
  }

  // Show category selection cards
  return (
    <Stack gap={6}>
      <div>
        <h2 style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '1.25rem', 
          fontWeight: 400, 
          lineHeight: '28px',
          marginBottom: '1rem' 
        }}>
          What type of service are you offering?
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {serviceCategories.map((category) => (
          <ClickableTile
            key={category.id}
            onClick={() => handleSelect(category.id)}
            style={{
              border: formData.serviceCategory === category.id 
                ? '2px solid #0f62fe' 
                : '1px solid #8d8d8d',
              backgroundColor: formData.serviceCategory === category.id 
                ? '#e5f0ff' 
                : 'white',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <div>
              <h3 style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '1rem', 
                fontWeight: 600, 
                lineHeight: '24px',
                marginBottom: '0.25rem',
                color: '#161616'
              }}>
                {category.title}
              </h3>
              <p style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.875rem', 
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                color: '#525252',
                margin: 0,
              }}>
                {category.description}
              </p>
            </div>
          </ClickableTile>
        ))}
      </div>

      <p style={{ 
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: '0.875rem', 
        fontWeight: 400,
        lineHeight: '18px',
        letterSpacing: '0.16px',
        color: '#161616',
        marginTop: '1rem'
      }}>
        <span style={{ fontWeight: 700 }}>Cost:</span> A fee of $5 per published listing applies.
      </p>
    </Stack>
  );
}

export default Step1ServiceType;

