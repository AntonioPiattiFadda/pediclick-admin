import { useEffect, useState } from 'react';
import './footer.scss';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < 560);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 475);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const smallScreenStyle =
    isLargeScreen || isHome
      ? {}
      : {
          marginBottom: '75px',
        };

  return (
    <div className="footer" style={smallScreenStyle}>
      {isLargeScreen && <span>Pediclick</span>}
      <span>© Pediclick Admin Dashboard</span>
    </div>
  );
};

export default Footer;
