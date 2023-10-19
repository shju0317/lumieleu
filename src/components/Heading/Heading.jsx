import Nav from '@/layout/Nav/Nav';
import S from './Heading.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Heading() {
  const location = useLocation();
  if (location.hash === '#home') {
    localStorage.setItem('visitedPlaceOrMap', 'true');
  }

  return (
    <div
      className={`${S.headingWrapper} ${
        location.hash === '#home' ? S.textWhite : ''
      }`}
    >
      <Link to="/lumieleu/">로고</Link>
      <Nav className={location.hash === '#home' ? S.navTextWhite : ''} />
    </div>
  );
}

export default Heading;
