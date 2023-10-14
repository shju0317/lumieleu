import pb from '@/api/pocketbase';
import SelectedProductItem from '@/components/SelectedProductItem/SelectedProductItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const PB = import.meta.env.VITE_PB_URL;
const PB_CART_ENDPOINT = `${PB}/api/collections/cart/records?expand=selectedProductId`;

async function fetchProducts() {
  const response = await axios(PB_CART_ENDPOINT);
  return await response.data;
}

function SelectedProduct() {
  // const { user } = useAuth();
  const [selectedCartData, setSelectedCartData] = useState([]);
  const [counts, setCounts] = useState([]);

  const {
    isLoading,
    data: cartData,
    error,
  } = useQuery(['cart'], fetchProducts, {
    retry: 2,
  });

  let dataItems = cartData?.items || [];
  console.log('dataItems:', dataItems);

  if (Array.isArray(dataItems) && dataItems.length > 0) {
    dataItems.forEach((item) => {
      const userName = item.userName;
      console.log('userName:', userName);
    });
  }

  useEffect(() => {
    if (!isLoading && Array.isArray(dataItems) && dataItems.length > 0) {
      const filteredData = dataItems.filter(
        (item) => item.userName === '방서빈' //user.name // user.id
      );
      console.log('filteredData:', filteredData);
      setSelectedCartData(filteredData);
    }
  }, [isLoading, dataItems]);

  useEffect(() => {
    console.log('selectedCartData:', selectedCartData);
  }, [selectedCartData]);

  const deleteItem = async (index) => {
    const itemId = selectedCartData[index].id;
    console.log(itemId);

    await pb.collection('cart').delete(itemId);

    let updatedCounts = [...counts];
    updatedCounts.splice(index, 1);

    let updatedCartData = [...selectedCartData];
    updatedCartData.splice(index, 1);

    setCounts(updatedCounts);
    setSelectedCartData(updatedCartData);
  };

  if (isLoading) {
    return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="sr-only">CHECKOUT</h1>
      <span
        className="text-2xl font-bold mb-[4.5rem]"
        aria-label="장바구니"
        aria-hidden
      >
        C H E C K O U T
      </span>
      <ul className="w-[930px] flex pb-2">
        <li className="mr-[38.5rem]">
          <span className="font-semibold">Product</span>
        </li>
        <li className="mr-7">
          <span className="font-semibold">Price</span>
        </li>
        <li className="mr-7">
          <span className="font-semibold">Quantity</span>
        </li>
        <li>
          <span className="font-semibold">Subotal</span>
        </li>
      </ul>
      <div>
        {selectedCartData?.toReversed().map((item, index) => (
          <SelectedProductItem
            key={item.id}
            item={item}
            count={counts}
            index={index}
            deleteItem={deleteItem}
          />
        ))}
      </div>
      <div className="flex flex-col ml-[32rem] mb-10">
        <span className="text-[1.25rem] font-semibold">Cart Total</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[1rem] font-semibold">Subtotal</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[1rem] font-semibold">Total</span>
        <div className="w-[25rem] mb-6 border-t-2 border-black"></div>
        <div className="flex justify-end">
          <span className="text-[1.5rem] font-semibold">2,000,000 원</span>
        </div>
      </div>
      <div className="ml-[32rem]">
        <Link to="/lumieleu/order">
          <button className="w-[25rem] h-[3.125rem] rounded-md text-white bg-black">
            PROCEEO TO CHECKOUT
          </button>
        </Link>
      </div>
    </>
  );
}

export default SelectedProduct;
