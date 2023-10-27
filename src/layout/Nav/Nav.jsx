// import S from './Nav.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  const categories = ['ABOUT', 'GALLERY', 'CART', 'MYPAGE', 'LOGOUT'];

  return (
    <nav>
      <ul className="flex flex-wrap gap-5 justify-evenly border-gray-1 top-13">
        {categories.map((category) => (
          <li key={category} className="">
            <Link
              to={`/lumieleu/${category.toLowerCase()}`}
              className={` py-2  ${
                location.pathname.toUpperCase().includes(category)
                  ? 'border-b-4 pb-1 box-border border-black '
                  : ''
              } `}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
