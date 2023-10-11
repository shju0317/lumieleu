import S from './Heading.module.css';
import { Link } from 'react-router-dom';

function Heading() {
  return (
    <div className={S.headingWrapper}>
      <h1 className="text-white">헤더</h1>
      <Link to="signin" className="text-white">
        Sign In
      </Link>
    </div>
  );
}

export default Heading;
