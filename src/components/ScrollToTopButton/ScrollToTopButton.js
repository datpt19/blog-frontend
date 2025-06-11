import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <Button
      color="primary"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '30px',
        display: visible ? 'inline' : 'none',
        borderRadius: '50%',
        padding: '12px',
        zIndex: 999,
      }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </Button>
  );
};
export default ScrollToTopButton;