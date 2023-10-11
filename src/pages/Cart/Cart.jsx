import S from './Cart.module.css';

function Cart() {
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
      <ul className="flex">
        <li className="mr-[20.625rem]">
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
    </div>
  );
}

export default Cart;
