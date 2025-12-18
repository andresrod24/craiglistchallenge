import { useState, useEffect } from 'react';
import { 
  Stack, 
  TextInput, 
  RadioTile, 
  TileGroup,
  InlineNotification,
  Tag,
  SkeletonText,
} from '@carbon/react';
import { MagicWand, Checkmark } from '@carbon/icons-react';

// Simulated AI suggestions based on category with rationale
const getSuggestionsForCategory = (category) => {
  const suggestions = {
    'household': [
      {
        title: 'Professional House Cleaning in Montreal – Weekly or One-Time',
        rationale: 'Highlights flexibility and location, which are top search criteria for cleaning services.',
      },
      {
        title: 'Deep Clean & Sanitization Services – Eco-Friendly Products',
        rationale: 'Appeals to health-conscious customers seeking thorough cleaning with safe products.',
      },
      {
        title: 'Move-In/Move-Out Cleaning Specialist – Same Day Available',
        rationale: 'Targets a specific high-demand niche with urgency appeal for time-sensitive needs.',
      },
      {
        title: 'Regular Home Maintenance & Cleaning – Flexible Scheduling',
        rationale: 'Emphasizes convenience and recurring service potential for long-term clients.',
      },
    ],
    'automotive': [
      {
        title: 'Mobile Auto Detailing – We Come to You in Montreal',
        rationale: 'Convenience is a key differentiator; mobile service attracts busy professionals.',
      },
      {
        title: 'Full Service Oil Change & Tire Rotation – Same Day',
        rationale: 'Bundles common services together with urgency to capture maintenance seekers.',
      },
      {
        title: 'Brake Inspection & Repair – Certified Mechanic',
        rationale: 'Trust signals (certification) are crucial for safety-related automotive services.',
      },
      {
        title: 'Complete Car Care Package – Interior & Exterior',
        rationale: 'Comprehensive offering appeals to customers wanting one-stop solutions.',
      },
    ],
    'beauty': [
      {
        title: 'Professional Hair Styling – Salon Quality at Home',
        rationale: 'Combines convenience with quality promise, appealing to time-conscious clients.',
      },
      {
        title: 'Makeup Artist for Events – Weddings & Special Occasions',
        rationale: 'Targets high-value bookings with specific event mentions for better discoverability.',
      },
      {
        title: 'Men\'s Grooming & Haircuts – Mobile Service Available',
        rationale: 'Addresses an underserved market segment with convenience factor.',
      },
      {
        title: 'Nail Art & Manicure Services – Trendy Designs',
        rationale: 'Appeals to style-conscious customers looking for creative and current designs.',
      },
    ],
    'creative': [
      {
        title: 'Professional Photography – Events, Portraits & Products',
        rationale: 'Covers multiple service types to maximize search visibility across categories.',
      },
      {
        title: 'Graphic Design Services – Logos, Branding & Marketing',
        rationale: 'Lists specific deliverables that businesses commonly search for.',
      },
      {
        title: 'Video Production & Editing – Social Media & Business',
        rationale: 'Addresses both personal and commercial needs, widening your audience.',
      },
      {
        title: 'Custom Illustration & Digital Art – Any Style',
        rationale: 'Flexibility appeal attracts diverse clients with varying artistic preferences.',
      },
    ],
    'tutoring': [
      {
        title: 'Math & Science Tutoring – High School to University Level',
        rationale: 'Specifies subjects and levels to match specific student search queries.',
      },
      {
        title: 'Language Lessons – French, English, Spanish',
        rationale: 'Lists popular languages to appear in more searches; multilingual appeal.',
      },
      {
        title: 'Music Lessons – Piano, Guitar & Voice',
        rationale: 'Covers the most in-demand instruments for maximum visibility.',
      },
      {
        title: 'Test Prep Specialist – SAT, GMAT, LSAT',
        rationale: 'High-stakes tests command premium rates; specificity builds credibility.',
      },
    ],
    'default': [
      {
        title: 'Professional Service in Montreal – Quality Guaranteed',
        rationale: 'Includes location and trust signal to establish credibility and local relevance.',
      },
      {
        title: 'Experienced Provider – Flexible Scheduling Available',
        rationale: 'Highlights experience and convenience, two top factors in hiring decisions.',
      },
      {
        title: 'Custom Solutions for Your Needs – Free Consultation',
        rationale: 'Lowers barrier to contact with free consultation offer.',
      },
      {
        title: 'Reliable & Trusted Service – 5-Star Reviews',
        rationale: 'Social proof (reviews mention) builds immediate trust with potential clients.',
      },
    ],
  };

  return suggestions[category] || suggestions['default'];
};

function Step2TitleCreation({ formData, updateFormData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Simulate AI generating suggestions
    setIsLoading(true);
    const timer = setTimeout(() => {
      setSuggestions(getSuggestionsForCategory(formData.serviceCategory));
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [formData.serviceCategory]);

  const handleSuggestionSelect = (suggestionTitle) => {
    updateFormData('selectedSuggestion', suggestionTitle);
    updateFormData('title', suggestionTitle);
  };

  const handleTitleChange = (e) => {
    updateFormData('title', e.target.value);
    if (formData.selectedSuggestion && e.target.value !== formData.selectedSuggestion) {
      updateFormData('selectedSuggestion', null);
    }
  };

  const characterCount = formData.title?.length || 0;
  const maxCharacters = 80;
  const isOverLimit = characterCount > maxCharacters;

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
          Create your listing title
        </h2>
        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          color: '#525252', 
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.16px',
        }}>
          A great title helps customers find you. Choose a suggestion or write your own.
        </p>
      </div>

      {/* AI Suggestions Section */}
      <div style={{ 
        backgroundColor: '#f4f4f4', 
        padding: '1.5rem', 
        borderRadius: '4px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <MagicWand size={20} style={{ color: '#0f62fe' }} />
          <span style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 600, 
            fontSize: '1rem',
            lineHeight: '24px',
            color: '#161616' 
          }}>AI-Suggested Titles</span>
          <Tag type="blue" size="sm">Recommended</Tag>
        </div>

        {isLoading ? (
          <Stack gap={4}>
            <SkeletonText heading width="80%" />
            <SkeletonText heading width="75%" />
            <SkeletonText heading width="85%" />
            <SkeletonText heading width="70%" />
          </Stack>
        ) : (
          <TileGroup
            name="title-suggestions"
            valueSelected={formData.selectedSuggestion}
            onChange={(value) => handleSuggestionSelect(value)}
          >
            <Stack gap={3}>
              {suggestions.map((suggestion, index) => (
                <RadioTile
                  key={index}
                  id={`suggestion-${index}`}
                  value={suggestion.title}
                  style={{
                    padding: '1rem',
                    border: formData.selectedSuggestion === suggestion.title 
                      ? '2px solid #0f62fe' 
                      : '1px solid #c6c6c6',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {formData.selectedSuggestion === suggestion.title && (
                        <Checkmark size={16} style={{ color: '#0f62fe', flexShrink: 0 }} />
                      )}
                      <span style={{ 
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: '0.875rem', 
                        fontWeight: 400,
                        lineHeight: '18px',
                        letterSpacing: '0.16px',
                      }}>{suggestion.title}</span>
                    </div>
                    <p style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.75rem', 
                      fontWeight: 400,
                      lineHeight: '16px',
                      letterSpacing: '0.32px',
                      color: '#525252', 
                      margin: 0,
                      paddingLeft: formData.selectedSuggestion === suggestion.title ? '1.5rem' : '0',
                      fontStyle: 'italic',
                    }}>
                      {suggestion.rationale}
                    </p>
                  </div>
                </RadioTile>
              ))}
            </Stack>
          </TileGroup>
        )}

        <p style={{ 
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '0.75rem', 
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: '0.32px',
          color: '#525252', 
          marginTop: '1rem',
        }}>
          These suggestions are optimized for search visibility and include your location 
          and key service details.
        </p>
      </div>

      {/* Custom Title Input */}
      <div>
        <TextInput
          id="custom-title"
          labelText="Or write your own title"
          placeholder="e.g., House Cleaning in Downtown Montreal – Weekly or One-Time"
          value={formData.title || ''}
          onChange={handleTitleChange}
          maxLength={100}
          warn={isOverLimit}
          warnText="Consider keeping your title under 80 characters for better visibility"
          helperText={`${characterCount}/${maxCharacters} characters (recommended)`}
        />
      </div>

      {/* Tips */}
      {formData.title && (
        <InlineNotification
          kind="info"
          lowContrast
          hideCloseButton
          title="Title Tips"
          subtitle="Include your location, main service, and frequency options to attract more customers."
        />
      )}
    </Stack>
  );
}

export default Step2TitleCreation;

