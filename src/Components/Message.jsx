// src/Components/Message.jsx
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Message({ message, type }) {
  const [isVisible, setIsVisible] = useState(true);
  const messageColor = type === 'error' ? 'red' : 'green';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Hide after 4 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [message, type]);

  if (!isVisible) return null;

  return (
    <div style={{
      color: 'white',
      position: 'relative', 
      top: 10, // Align to the top
      left: '50%', // Center horizontally
      transform: 'translateX(-50%)', // Adjust for exact centering
      padding: '10px',
      zIndex: 1000, // Ensure it's above other content
      backgroundColor: `${messageColor}`, // Optional: for better visibility
      border: `1px solid ${messageColor}`,
      width: '400px',
      textAlign: 'center'
    }}>
      {message}
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};