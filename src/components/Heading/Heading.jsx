import Nav from '@/layout/Nav/Nav';
import S from './Heading.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Heading() {
  const location = useLocation();

  return (
    <div
      className={`${S.headingWrapper} ${
        location.pathname === '/lumieleu/' ? S.textWhite : ''
      }`}
    >
      <Link to="/lumieleu/">로고</Link>
      <Nav className={location.hash === '#home' ? S.navTextWhite : ''} />
    </div>
  );
}

export default Heading;
