import pb from '@/api/pocketbase';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import S from './Cart.module.css';

async function Cart() {
  const { productId } = useParams();
  console.log(productId);

  const commentUser = await pb.collection('cart').getFullList();
  console.log(commentUser);

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
