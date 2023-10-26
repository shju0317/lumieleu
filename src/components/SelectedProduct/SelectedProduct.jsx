import pb from '@/api/pocketbase';
import SelectedProductItem from '@/components/SelectedProductItem/SelectedProductItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
// import useStorage from '@/hooks/useStorage';

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
  const [reverseIndex, setReverseIndex] = useState([]);

  const {
    isLoading,
    data: cartData,
    error,
  } = useQuery(['cart'], fetchProducts, {
    retry: 2,
  });

  let dataItems = cartData?.items || [];

  /* if (Array.isArray(dataItems) && dataItems.length > 0) {
    dataItems.forEach((item) => {
      const userName = item.userName;
    });
  } */

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
    }
  }, [isLoading, dataItems]);

  const increaseCount = async (itemIndex) => {
    const reverseIndex = cartItems.length - 1 - itemIndex;
    setReverseIndex(reverseIndex);

    const currentCartItem = cartItems[reverseIndex];
    const updatedCount = currentCartItem.count + 1;
    const increaseCountTotalPrice =
      currentCartItem.selectedPrice * updatedCount;

    const updatedCartItem = {
      ...currentCartItem,
      count: updatedCount,
      selectedSubtotal: increaseCountTotalPrice,
    };

    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[reverseIndex] = updatedCartItem;

      return newItems;
    });

    await pb.collection('cart').update(updatedCartItem.id, {
      selectedQuantity: updatedCartItem.count,
      selectedSubtotal: increaseCountTotalPrice,
    });

    setProductedTotalPrice((prevPrices) => {
      const updatedPrices = prevPrices.map((price, index) => {
        if (index === itemIndex) {
          return increaseCountTotalPrice;
        } else {
          return price;
        }
      });

      return updatedPrices;
    });
  };

  const decreaseCount = async (itemIndex) => {
    const reverseIndex = cartItems.length - 1 - itemIndex;
    const currentCartItem = cartItems[reverseIndex];

    if (currentCartItem.count <= 1) {
      return;
    }

    const updatedCount = currentCartItem.count - 1;
    const increaseCountTotalPrice =
      currentCartItem.selectedPrice * updatedCount;

    const updatedCartItem = {
      ...currentCartItem,
      count: updatedCount,
      selectedSubtotal: increaseCountTotalPrice,
    };

    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[reverseIndex] = updatedCartItem;

      return newItems;
    });

    await pb.collection('cart').update(updatedCartItem.id, {
      selectedQuantity: updatedCartItem.count,
      selectedSubtotal: increaseCountTotalPrice,
    });

    setProductedTotalPrice((prevPrices) => {
      const updatedPrices = prevPrices.map((price, index) => {
        if (index === itemIndex) {
          return increaseCountTotalPrice;
        } else {
          return price;
        }
      });

      return updatedPrices;
    });
  };

  useEffect(() => {
    console.log('incrTotalPrice:', productedTotalPrice);
  }, [productedTotalPrice]);

  useEffect(() => {
    if (Array.isArray(selectedCartData) && selectedCartData.length > 0) {
      selectedCartData.forEach((item) => {
        const userDataId = item.user;
        setSelectedCartUserDataId(userDataId);
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

  useEffect(() => {
    console.log(cartItems);
  });

  const calculateTotalPrice = () => {
    let calculatedTotalPrice = 0;

    if (Array.isArray(cartItems) && cartItems.length > 0) {
      cartItems.forEach((item) => {
        const count = item.count || item.selectedQuantity || 1;
        const selectedPrice = item.selectedPrice || 0;
        calculatedTotalPrice += selectedPrice * count;
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

  const deleteItem = async (itemIndex) => {
    const reverseIndex = cartItems.length - 1 - itemIndex;

    if (reverseIndex < 0 || reverseIndex >= selectedCartData.length) {
      console.log('Error: Reverse index is out of range.');
      return;
    }

    const updatedCartItems = [...cartItems];

    if (reverseIndex >= updatedCartItems.length || reverseIndex < 0) {
      console.log('Error: Item does not exist in cartItems.');
      console.log('updatedCartItems:', updatedCartItems);
      return;
    }

    const currentCartItem = updatedCartItems[reverseIndex];

    if (!currentCartItem || !currentCartItem.id) {
      console.log('Error: Item or item id is undefined.');
      return;
    }

    const itemId = currentCartItem.id;

    await pb.collection('cart').delete(itemId);

    let updatedCounts = [...counts];
    updatedCounts.splice(reverseIndex, 1);

    let updatedCartData = [...selectedCartData];
    updatedCartData.splice(reverseIndex, 1);

    setCartItems(updatedCartItems);
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
        className="text-2xl font-bold mt-[10rem] mb-[4.5rem]"
        aria-label="장바구니"
        aria-hidden
      >
        C H E C K O U T
      </span>
      <ul className="w-[930px] flex pb-2">
        <li className="ml-2 mr-[37.5rem]">
          <span className="font-semibold">Product</span>
        </li>
        <li className="mr-9">
          <span className="font-semibold">Price</span>
        </li>
        <li className="mr-9">
          <span className="font-semibold">Quantity</span>
        </li>
        <li>
          <span className="font-semibold">Subotal</span>
        </li>
      </ul>
      <div>
        {dataItems.length <= 0 ? (
          <>
            <div className="w-[960px] border-t-2 border-black ml-6"></div>
            <div className="h-[20rem] flex flex-col justify-center items-center">
              <span>장바구니가 비어있습니다.</span>
            </div>
          </>
        ) : (
          <>
            {cartItems?.toReversed().map((item, index) => {
              const cartItem = cartItems.find(
                (cartItem) => cartItem.id === item.id
              );
              if (cartItem) {
                const itemWithCount = {
                  ...item,
                  count: cartItem.count,
                };
                const reverseIndex = cartItems.length - 1 - index;
                const individualProductedTotalPrice =
                  productedTotalPrice.length > reverseIndex
                    ? productedTotalPrice[reverseIndex]
                    : cartItem.selectedSubtotal;
                return (
                  <SelectedProductItem
                    key={item.id}
                    item={itemWithCount}
                    index={index}
                    deleteItem={deleteItem}
                    individualProductedTotalPrice={
                      individualProductedTotalPrice
                    }
                    increaseCount={() => increaseCount(index)}
                    decreaseCount={() => decreaseCount(index)}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      <div className="flex flex-col ml-[32rem] mt-10 mb-10">
        <span className="text-[1.25rem] font-semibold">Cart Total</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[1rem] font-semibold">Subtotal</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[1rem] font-semibold">Total</span>
        <div className="w-[25rem] mb-6 border-t-2 border-black"></div>
        <div className="flex justify-end">
          <span className="text-[1.5rem] font-semibold">
            {`${totalPrice.toLocaleString('ko-KR')}`} 원
          </span>
        </div>
      </div>
      <div className="ml-[32rem]">
        <Link to={`/lumieleu/order`}>
          <button className="w-[25rem] h-[3.125rem] mb-[5rem] rounded-md text-white bg-black">
            PROCEEO TO CHECKOUT
          </button>
        </Link>
      </div>
    </>
  );
}

export default SelectedProduct;
