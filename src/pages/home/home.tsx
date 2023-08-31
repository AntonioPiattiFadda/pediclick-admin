import { Link } from 'react-router-dom';
import './home.scss';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < 560);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 560);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const infoLargeScreen = {
    title: 'para el éxito de tu negocio online',
    description: `: administra tus productos de forma
    eficiente, expande tu alcance a miles de usuarios y lleva tu tienda al
    siguiente nivel`,
  };
  return (
    <div className="home_container">
      <div className="home_info">
        <h1 className="home_info__title">
          Transforma datos en inteligencia{' '}
          {isLargeScreen && infoLargeScreen.title}{' '}
        </h1>
        <h3 className="home_info__desciption">
          Descubre el poder de la gestión{' '}
          {isLargeScreen && infoLargeScreen.description}
        </h3>
        <div className="home_info__buttons__container">
          <>
            <Link to={'/login'}>
              <Button variant="contained">Get started</Button>
            </Link>
            <Link to={'/'}>
              <Button variant="outlined">Learn More</Button>
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};

export default Home;
