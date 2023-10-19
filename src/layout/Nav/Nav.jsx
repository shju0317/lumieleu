// import S from './Nav.module.css';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Nav({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const categories = ['ABOUT', 'GALLERY', 'CART', 'MYPAGE', 'LOGOUT'];

  return (
    <nav>
      <ul className="flex flex-wrap gap-5 justify-evenly border-gray-1 top-13">
        {categories.map((category) => (
          <li key={category} className="">
            <Link
              to={`/lumieleu/${category.toLowerCase()}`}
              onClick={() => handleCategoryClick(category)}
              className={` py-2  ${
                selectedCategory === category
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

Nav.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};
