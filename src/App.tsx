import React from 'react';

const App: React.FC = () => {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      margin: '20px'
    },
    heading: {
      color: 'blue',
      textAlign: 'center' as const
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>This is my React App!</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );
};

export default App;