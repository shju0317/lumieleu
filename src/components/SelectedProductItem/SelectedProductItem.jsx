import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPbImageURL } from '@/utils';
import S from './SelectedProductItem.module.css';
import Addittion from '/Addition.svg';
import Subtract from '/Subtract.svg';
import Delete from '/Delete.svg';

function SelectedProductItem({
  item,
  index,
  decreaseCount,
  increaseCount,
  deleteItem,
  individualProductedTotalPrice,
}) {
  console.log('item:', item);

  return (
    <>
      <ul className="flex">
        <li>
          <div className="w-[930px] border-t-2 border-black"></div>
          <div className="flex mt-5 mb-5">
            <Link to={`/${item?.selectedProductId}`}>
              <div className="flex">
                <img
                  src={getPbImageURL(item, 'selectedImage')}
                  alt={`${item?.selectedProductTitle}`}
                  className={`${S.selectedImage} mr-10`}
                />
                <span>{`${item?.selectedProductTitle}`}</span>
              </div>
            </Link>
            <span className="ml-[13rem]">{`${item?.selectedSize}`}</span>
            <div className="flex">
              <span className="ml-[12rem]">{`${item?.selectedPrice}`}</span>
              <div className="flex ml-[1.5rem]">
                <button
                  className="h-[1.5rem]"
                  onClick={() => decreaseCount(index)}
                >
                  <img src={Subtract} alt="빼기" />
                </button>
                <span className="px-3">{item?.count}</span>
                <button
                  className="h-[1.5rem]"
                  onClick={() => increaseCount(index)}
                >
                  <img src={Addittion} alt="추가" />
                </button>
                <span className="ml-[1.8rem]">{`${individualProductedTotalPrice}`}</span>
                <button
                  className="h-[1.5rem] ml-[1.3rem]"
                  onClick={() => deleteItem(index)}
                >
                  <img src={Delete} alt="삭제" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default SelectedProductItem;

SelectedProductItem.propTypes = {
  decreaseCount: PropTypes.func.isRequired,
  increaseCount: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  individualProductedTotalPrice: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string,
    selectedProductTitle: PropTypes.string,
    selectedPrice: PropTypes.number.isRequired,
    selectedSubtotal: PropTypes.number.isRequired,
    selectedSize: PropTypes.string,
    selectedProductId: PropTypes.string,
    count: PropTypes.number.isRequired,
  }).isRequired,
};
