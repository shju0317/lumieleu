import MyPageButton from './MyPageButton';

function OrderedProduct() {
  return (
    <div>
      <div className="flex justify-between text-sm px-1">
        <p>주문번호 2023100408</p>
        <p>주문일자 2023-10-10</p>
      </div>
      <div className="flex gap-4 justify-between items-center border border-black rounded px-6 py-4">
        <div className="w-24 h-36 border">이미지</div>
        <dl className="text-sm">
          <dt className="font-semibold text-base">상실의 시작</dt>
          <dd>25,000원 / 1개</dd>
          <dt className="font-semibold">받는사람</dt><dd>김회원</dd>
          <dt className="font-semibold">받는주소</dt><dd>서울특별시 성동구 성수동 123-48</dd>
        </dl>
        <div className="">배송완료</div>
        <div className="flex flex-col gap-2">
          <MyPageButton text="구매평 작성"/> 
          <MyPageButton text="배송조회"/> 
        </div>
      </div>
    </div>
  )
}

export default OrderedProduct