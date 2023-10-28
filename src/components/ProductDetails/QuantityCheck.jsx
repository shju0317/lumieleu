import { useState } from 'react';

export default function QuantityCheck() {
  // 수량 상태 관리
  const [quantity, setQuantity] = useState(1);

  // 수량 증가 함수
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 수량 감소 함수
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex justify-between mb-4">
      <span className="flex gap-2 p-1">
        <button onClick={decreaseQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={increaseQuantity}>+</button>
      </span>
      <span>KRW 24,000</span>
    </div>
  );
}
