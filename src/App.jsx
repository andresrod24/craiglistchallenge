import { Content, Theme, Tag, Button, Link } from '@carbon/react';
import { Location } from '@carbon/icons-react';
import Wizard from './components/Wizard/Wizard';
import craigslistLogo from './assets/craiglist-logo.svg';

function App() {
  return (
    <Theme theme="g10">
      {/* Custom Header matching Figma design */}
      <header 
        role="banner"
        aria-label="Service Posting"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--cds-spacing-05)',
          height: '48px',
          backgroundColor: '#f4f4f4',
          borderBottom: '1px solid #c6c6c6',
        }}
      >
        {/* Left side - Logo and Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-05)' }}>
          {/* Craigslist Logo */}
          <a 
            href="#" 
            aria-label="Craigslist home"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img 
              src={craigslistLogo} 
              alt="Craigslist" 
              style={{ height: '30px', width: 'auto' }}
            />
          </a>
          
          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-02)' }}>
            <Location size={20} aria-hidden="true" style={{ color: '#161616' }} />
            <Tag 
              type="outline" 
              size="md"
              style={{
                backgroundColor: '#f4f4f4',
                border: '1px solid #161616',
                color: '#161616',
              }}
            >
              Montreal, QC
            </Tag>
          </div>
        </div>

        {/* Right side - User info and Disconnect */}
        <nav 
          aria-label="User actions"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--cds-spacing-06)' }}
        >
          <span style={{ 
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '1rem', 
            fontWeight: 400,
            lineHeight: '22px',
            color: '#0f62fe',
          }}>
            Connected as:{' '}
            <Link 
              href="mailto:iam@andresrodriguez.net"
              style={{ 
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '1rem',
                fontWeight: 400,
              }}
            >
              iam@andresrodriguez.net
            </Link>
          </span>
          <Button 
            kind="ghost" 
            size="md"
            onClick={() => console.log('Disconnect clicked')}
            style={{
              color: '#0f62fe',
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 400,
            }}
          >
            Disconnect
          </Button>
        </nav>
      </header>
      
      <Content style={{ padding: '2.5rem 2.5rem 6rem' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <Wizard />
        </div>
      </Content>
    </Theme>
  );
}

export default App;
