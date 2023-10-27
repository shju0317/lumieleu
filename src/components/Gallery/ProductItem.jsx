import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductItem({ products, index }) {
  const isOddIndex = index % 2 !== 0;

  return (
    <div style={{ marginTop: isOddIndex ? '144px' : '0' }}>
      <Link to={`/lumieleu/gallery/${products.id}`}>
        <h3 className="text-[80px]">{`0${index + 1}`}</h3>
        <img
          src={getPbImageURL(products, 'image')}
          alt={products.title}
          className="w-full "
        />
        <p>{products.title}</p>
        <p>{products.price}</p>
      </Link>
    </div>
  );
}

ProductItem.propTypes = {
  products: PropTypes.object,
  index: PropTypes.number,
};

export default ProductItem;
