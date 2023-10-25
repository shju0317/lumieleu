import OrderExchange from '@/components/ProductDetails/OrderExchange';
import untitle from './untitle.jpg';

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
        <article className="mb-20 flex-grow">
          우리는 끝을 두려워할 필요도 없다. 끝에는 다시 시작이 있을 것이니.
          시작의 끝은 상실이지만 상실의 끝 또한 시작이다.
        </article>

        {/* 제품 상세 정보 */}
        <section className="mb-4">
          {/* 제목 */}
          <h2 className="border-b-2 border-gray-600 mb-2 pb-2">Untitle</h2>

          {/* 가격, 사이즈, 재질 등의 정보를 반복적으로 표시 */}
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
        <div className="flex justify-between mb-4">
          <span className="flex gap-2 p-1">
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </span>
          <span>KRW 24,000</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-black text-white w-[220px] h-[50px] rounded-md">
            구매하기
          </button>
          <button className="border-2 border-black rounded-md w-[120px] h-[50px]">
            장바구니
          </button>
        </div>
        <div className="flex gap-11 justify-center mt-10">
          <OrderExchange />
        </div>
      </section>
    </main>
  );
}
