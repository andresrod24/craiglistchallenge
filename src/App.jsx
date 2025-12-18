import { Content, Theme, Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, Tag } from '@carbon/react';
import { UserAvatar, Location } from '@carbon/icons-react';
import Wizard from './components/Wizard/Wizard';

function App() {
  return (
    <Theme theme="g10">
      <Header aria-label="Service Posting">
        <HeaderName href="#" prefix="">
          <span style={{ fontWeight: 600 }}>craigslist</span>
        </HeaderName>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
          <Location size={16} />
          <Tag type="outline" size="sm">Montreal, QC</Tag>
        </div>

        <HeaderGlobalBar>
          <span style={{ 
            fontSize: '0.875rem', 
            color: '#0f62fe', 
            marginRight: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}>
            Connected as: <span style={{ marginLeft: '0.25rem' }}>user@example.com</span>
          </span>
          <HeaderGlobalAction aria-label="User">
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      
      <Content style={{ padding: '2.5rem 2.5rem 6rem' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <Wizard />
        </div>
      </Content>
    </Theme>
  );
}

export default App;
