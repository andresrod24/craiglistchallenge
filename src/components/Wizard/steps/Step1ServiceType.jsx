import { useState, useEffect } from 'react';
import { 
  Stack, 
  RadioTile, 
  TextArea, 
  RadioButtonGroup, 
  RadioButton,
  Tag,
  Button,
  Tile,
  Search,
  Link,
  InlineNotification,
} from '@carbon/react';
import { Checkmark, Edit, Add } from '@carbon/icons-react';

// Nearby city suggestions for quick selection
const nearbyCities = [
  { id: 'montreal', label: 'Montreal, QC' },
  { id: 'brossard', label: 'Brossard, QC' },
  { id: 'laval', label: 'Laval, QC' },
  { id: 'mirabel', label: 'Mirabel, QC' },
];

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
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [locationSearchValue, setLocationSearchValue] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Default location from header (would come from user profile in real app)
  const defaultLocation = 'Montreal, QC';

  // Initialize service location if not set
  useEffect(() => {
    if (!formData.serviceLocation) {
      updateFormData('serviceLocation', defaultLocation);
    }
  }, []);

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

  const handleLocationSelect = (location) => {
    updateFormData('serviceLocation', location);
    setShowLocationSearch(false);
    setLocationSearchValue('');
  };

  const handleChangeLocation = () => {
    setShowLocationSearch(true);
  };

  const handleCancelLocationSearch = () => {
    setShowLocationSearch(false);
    setLocationSearchValue('');
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
          marginBottom: 'var(--cds-spacing-03)' 
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
          padding: 'var(--cds-spacing-05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-04)' }}>
              <Checkmark size={20} style={{ color: '#0f62fe' }} aria-hidden="true" />
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

        {/* Where Will You Provide This Service? */}
        <div>
          <h3 style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1.25rem', 
            fontWeight: 400, 
            lineHeight: '28px',
            marginBottom: 'var(--cds-spacing-05)',
            color: '#161616',
          }}>
            Where Will You Provide This Service?
          </h3>

          {showLocationSearch ? (
            /* Search Mode - First Time User / Change Location */
            <Stack gap={5}>
              <Search
                id="location-search"
                labelText="Search"
                placeholder="Enter at least 3 letters (city, province, or postal code)"
                value={locationSearchValue}
                onChange={(e) => setLocationSearchValue(e.target.value)}
                size="lg"
              />
              
              {/* City Suggestions as Tags */}
              <div 
                role="group" 
                aria-label="Nearby cities"
                style={{ 
                  display: 'flex', 
                  gap: 'var(--cds-spacing-04)', 
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {nearbyCities.map((city) => (
                  <Tag
                    key={city.id}
                    type="outline"
                    size="md"
                    onClick={() => handleLocationSelect(city.label)}
                    style={{ 
                      cursor: 'pointer',
                      border: '1px solid #161616',
                      backgroundColor: formData.serviceLocation === city.label ? '#161616' : '#f4f4f4',
                      color: formData.serviceLocation === city.label ? 'white' : '#161616',
                    }}
                  >
                    {city.label}
                  </Tag>
                ))}
              </div>

              {/* Enter a different city button */}
              <div style={{ paddingTop: 'var(--cds-spacing-05)' }}>
                <Button
                  kind="tertiary"
                  size="md"
                  renderIcon={Add}
                  onClick={handleCancelLocationSearch}
                >
                  Enter a different city
                </Button>
              </div>
            </Stack>
          ) : (
            /* Default Mode - Returning User */
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--cds-spacing-04)',
              }}
            >
              <Tag
                type="high-contrast"
                size="md"
                style={{
                  backgroundColor: '#161616',
                  color: 'white',
                }}
              >
                {formData.serviceLocation || defaultLocation}
              </Tag>
              <Link
                onClick={handleChangeLocation}
                style={{ 
                  cursor: 'pointer',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: '22px',
                }}
              >
                Change Location
              </Link>
            </div>
          )}
        </div>

        {/* Service Intent */}
        <div>
          <h3 style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1rem', 
            fontWeight: 600, 
            lineHeight: '24px',
            marginBottom: 'var(--cds-spacing-04)' 
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
      </Stack>
    );
  }

  // Show category selection cards
  return (
    <Stack gap={6}>
      <div>
        <h2 
          id="service-category-heading"
          style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1.25rem', 
            fontWeight: 400, 
            lineHeight: '28px',
            marginBottom: 'var(--cds-spacing-05)' 
          }}
        >
          What type of service are you offering?
        </h2>
      </div>

      {/* Cost Information - Inline Notification */}
      <InlineNotification
        kind="info"
        lowContrast
        hideCloseButton
        title="Cost"
        subtitle="A fee of $5 per published listing applies."
        role="status"
        aria-live="polite"
      />

      <fieldset 
        style={{ border: 'none', padding: 0, margin: 0 }}
        role="radiogroup"
        aria-labelledby="service-category-heading"
      >
        <legend className="cds--visually-hidden">Select a service category</legend>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--cds-spacing-05)',
          }}
        >
          {serviceCategories.map((category) => {
            const isSelected = formData.serviceCategory === category.id;
            const isHovered = hoveredCard === category.id;
            
            const getBackgroundColor = () => {
              if (isSelected) {
                return isHovered ? '#d0e2ff' : '#e5f0ff';
              }
              return isHovered ? '#e8e8e8' : 'white';
            };

            const getBorderColor = () => {
              if (isSelected) {
                return '#0f62fe';
              }
              return isHovered ? '#525252' : '#8d8d8d';
            };

            return (
              <RadioTile
                key={category.id}
                id={`category-${category.id}`}
                name="service-category"
                value={category.id}
                checked={isSelected}
                onChange={() => handleSelect(category.id)}
                className="service-category-card"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  border: isSelected ? '2px solid #0f62fe' : `1px solid ${getBorderColor()}`,
                  backgroundColor: getBackgroundColor(),
                  padding: 'var(--cds-spacing-05)',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <span 
                    style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      lineHeight: '24px',
                      marginBottom: 'var(--cds-spacing-02)',
                      color: '#161616',
                      display: 'block',
                    }}
                  >
                    {category.title}
                  </span>
                  <span 
                    style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.875rem', 
                      fontWeight: 400,
                      lineHeight: '18px',
                      letterSpacing: '0.16px',
                      color: '#525252',
                      display: 'block',
                    }}
                  >
                    {category.description}
                  </span>
                </div>
              </RadioTile>
            );
          })}
        </div>
      </fieldset>
    </Stack>
  );
}

export default Step1ServiceType;

