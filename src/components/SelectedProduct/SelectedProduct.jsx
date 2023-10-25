import pb from '@/api/pocketbase';
import SelectedProductItem from '@/components/SelectedProductItem/SelectedProductItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import useStorage from '@/hooks/useStorage';

const PB = import.meta.env.VITE_PB_URL;
const PB_CART_ENDPOINT = `${PB}/api/collections/cart/records`;

async function fetchProducts() {
  const response = await axios(PB_CART_ENDPOINT);
  return await response.data;
}

function SelectedProduct() {
  // const { storageData } = useStorage('pocketbase_auth');
  // const authUser = storageData?.model;

  const [selectedCartData, setSelectedCartData] = useState([]);
  const [selectedCartUserDataId, setSelectedCartUserDataId] = useState([]);
  const [counts, setCounts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productedTotalPrice, setProductedTotalPrice] = useState([]);

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
        (item) => item.userName === '방서빈' //authUser.name // authUser.id
      );

      setSelectedCartData(filteredData);

      if (filteredData.length > 0) {
        const initialCartItems = filteredData.map((item) => ({
          ...item,
          count: item.selectedQuantity || 1,
        }));
        setCartItems(initialCartItems);
      }
      console.log('filteredData:', filteredData);
    }
  }, [isLoading, dataItems]);

  const increaseCount = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        count: newItems[index].count + 1,
      };

      const increaseCountTotalPrice =
        newItems[index]?.selectedPrice * newItems[index].count;

      setProductedTotalPrice((prevPrices) => {
        const updatedPrices = [...prevPrices];
        if (updatedPrices.length <= index) {
          updatedPrices.push(increaseCountTotalPrice);
        } else {
          updatedPrices[index] = increaseCountTotalPrice;
        }
        console.log('increaseCountTotalPrice:', increaseCountTotalPrice);
        console.log('productedTotalPrice:', productedTotalPrice);
        console.log('cartItems:', cartItems);
        console.log('newItems:', newItems);

        return updatedPrices;
      });

      return newItems;
    });
  };

  const decreaseCount = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        count: newItems[index].count - 1,
      };
      console.log('cartItems:', cartItems);
      console.log('newItems:', newItems);

      const decreaseCountTotalPrice =
        newItems[index].selectedPrice * newItems[index].count;
      setProductedTotalPrice((prevPrices) => {
        const updatedPrices = [...prevPrices];
        if (updatedPrices.length <= index) {
          updatedPrices.push(decreaseCountTotalPrice);
        } else {
          updatedPrices[index] = decreaseCountTotalPrice;
        }
        return updatedPrices;
      });

      return newItems;
    });
  };

  useEffect(() => {
    console.log('incrTotalPrice:', productedTotalPrice);
  }, [productedTotalPrice]);

  useEffect(() => {
    console.log('selectedCartData:', selectedCartData);
    if (Array.isArray(selectedCartData) && selectedCartData.length > 0) {
      selectedCartData.forEach((item) => {
        console.log('selectedCardDate ID:', item.id);
        const userDataId = item.user;
        setSelectedCartUserDataId(userDataId);
        console.log('selected Cart User id:', item.user);
      });
    }
  }, [selectedCartData]);

  useEffect(() => {
    const initialCartItems = selectedCartData.map((item) => ({
      ...item,
      count: item.selectedQuantity || 1,
    }));
    setCartItems(initialCartItems);
  }, [selectedCartData]);

  const calculateTotalPrice = () => {
    let calculatedTotalPrice = 0;

    if (Array.isArray(cartItems) && cartItems.length > 0) {
      cartItems.forEach((item) => {
        const count = item.count || item.selectedQuantity || 1;
        calculatedTotalPrice += item.selectedPrice * count;
      });
    }

    return calculatedTotalPrice;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
  });

  useEffect(() => {
    console.log('Updated Total Price:', totalPrice);
  }, [totalPrice]);

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
      <h2 className="sr-only">장바구니 페이지</h2>
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
        {selectedCartData?.toReversed().map((item, index) => {
          if (cartItems[index]) {
            const itemWithCount = { ...item, count: cartItems[index].count };
            const individualProductedTotalPrice =
              productedTotalPrice.length > index
                ? productedTotalPrice[index]
                : cartItems[index].selectedSubtotal;
            return (
              <SelectedProductItem
                key={item.id}
                item={itemWithCount}
                index={index}
                deleteItem={deleteItem}
                individualProductedTotalPrice={individualProductedTotalPrice}
                increaseCount={() => increaseCount(index)}
                decreaseCount={() => decreaseCount(index)}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col ml-[32rem] mb-10">
        <span className="text-[1.25rem] font-semibold">Cart Total</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[1rem] font-semibold">Subtotal</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[1rem] font-semibold">Total</span>
        <div className="w-[25rem] mb-6 border-t-2 border-black"></div>
        <div className="flex justify-end">
          <span className="text-[1.5rem] font-semibold">{`${totalPrice}`}</span>
        </div>
      </div>
      <div className="ml-[32rem]">
        <Link to={`/lumieleu/order`}>
          <button className="w-[25rem] h-[3.125rem] rounded-md text-white bg-black">
            PROCEEO TO CHECKOUT
          </button>
        </Link>
      </div>
    </>
  );
}

export default SelectedProduct;
