import OrderExchange from '@/components/ProductDetails/OrderExchange';
import untitle from './untitle.jpg';
import QuantityCheck from '@/components/ProductDetails/QuantityCheck';
import { Link } from 'react-router-dom';

export default function ProductDetails() {
  // 제품 정보 데이터
  const productInfo = [
    { label: 'price', value: 'KRW 24,000' },
    { label: 'Size', value: '290 X 410' },
    { label: 'Texture', value: 'Chiffon Fabric' },
  ];

  return (
    <main className="h-screen flex items-center justify-center">
      {/* 제품 이미지와 캡션 */}
      <figure className="m-10">
        <img src={untitle} alt="제품" className="w-[350px]" />
        <figcaption>
          Untitle, Photo by MinJee <br />
          2023.10.11
        </figcaption>
      </figure>

      {/* 제품 설명 및 상세 정보 */}
      <section className="w-[322px] h-[573px] flex flex-col">
        {/* 제품 설명 */}
        <article className="h-[322px] flex-grow text-justify">
          가로등 아래 노을이 서서히 물들어가네 어둠을 밝히며 도시의 잠들 시간을
          알린다 노을 도시의 풍경이 서서히 변해가는데 가로등은 노을과 함께 빛을
          드리운다 도시의 잠들 시간을 알리며 그 소중한 순간을 함께 간직하고 싶어
        </article>

        {/* 제품 상세 정보 */}
        <section className="mb-4">
          {/* 제목 */}
          <h3 className="border-b-2 border-gray-600 mb-2 pb-2">Untitle</h3>

          {/* 가격, 사이즈, 재질 등의 정보 표시 */}
          {productInfo.map((info) => (
            <dl
              key={info.label}
              className="border-b-2 border-gray-600 mb-2 flex justify-between pb-2"
            >
              <dt>{info.label}</dt>
              <dd>{info.value}</dd>
            </dl>
          ))}
        </section>
        <p className="font-semibold">Untitle</p>
        {/* 수량 체크 */}
        <QuantityCheck />
        <div className="flex gap-2">
          <Link to={`/lumieleu/order`}>
            <button className="bg-black text-white w-[220px] h-[50px] rounded-md">
              구매하기
            </button>
          </Link>
          <Link to={`/lumieleu/cart`}>
            <button className="border-2 border-black rounded-md w-[105px] h-[50px]">
              장바구니
            </button>
          </Link>
        </div>
        <div className="flex gap-11 justify-center">
          {/* 교환 / 주문 모달 창 */}
          <OrderExchange />
        </div>
      </section>
    </main>
  );
}
