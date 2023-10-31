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
      <Link
        to="/lumieleu/"
        className={`text-xs text-center ${
          location.pathname === '/lumieleu/' ? `` : `font-bold`
        }`}
      >
        lumière <br /> de l&#39;aube
      </Link>
      <Nav />
    </div>
  );
}

export default Heading;
