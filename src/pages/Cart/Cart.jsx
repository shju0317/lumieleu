import useStorage from '@/hooks/useStorage';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import S from './Cart.module.css';

function Cart() {
  const { productsId } = useParams();
  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  useEffect(() => {
    setAuthUserData(storageData?.model);
  }, [storageData]);
  console.log(authUserData);
  console.log(productsId);
  return (
    <div className={S.cartWrapper}>
      <h1 className="sr-only">CHECKOUT</h1>
      <span
        className="text-2xl font-bold mb-[4.5rem]"
        aria-label="장바구니"
        aria-hidden
      >
        C H E C K O U T
      </span>
      <ul className="flex pb-2 mb-8 border-b-2 border-black">
        <li className="mr-[56.26rem]">
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
      <ul>
        <li>
          <img alt="사진" src="" />
          <span>Hello</span>
        </li>
      </ul>
    </div>
  );
}

export default Cart;
