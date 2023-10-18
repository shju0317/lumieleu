import S from './OrderList.module.css';

function OrderList() {
  return (
    <>
      <div className={`${S.OrderLine} mt-11`}></div>
      <span className="mr-[48rem] mb-10 text-[1.5rem] font-bold">
        주문자 정보
      </span>
      <div className="flex mr-[13rem] mb-16">
        <span className="text-[1.25rem]">
          이메일
          <span className="mr-[12.5rem]">*</span>
        </span>
        <input className={S.LittleInput}></input>
        <span className="text-[1.5rem] text-gray-400 ml-8 mr-8 ">@</span>
        <input className={S.LittleInput}></input>
      </div>
      <input className={`${S.LargeInput} ml-[3.5rem]`}></input>
      <div className={S.OrderLine}></div>
      <span className="mr-[48rem] mb-10 text-[1.5rem] font-bold">
        배송지 정보
      </span>
      <span className="text-[1.25rem] flex mr-[48rem] mb-16">배송지 선택</span>
      <div className="flex ml-20 mb-16">
        <input className={S.MiddleInput}></input>
        <button className="w-[8.125rem] h-[3.125rem] ml-8 bg-black text-white rounded-md">
          주소찾기
        </button>
      </div>
      <div className="flex mr-12">
        <div className="flex justify-between mr-5 mb-16">
          <input
            type="checkbox"
            id="myCheckbox1"
            className="h-4 w-4 mr-2 appearance-none rounded-lg border border-gray-400 bg-gray-300 checked:bg-gray-500"
          ></input>
          <label htmlFor="myCheckbox1">회원 정보와 동일</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="myCheckbox2"
            className="h-4 w-4 mr-2 appearance-none rounded-lg border border-gray-400 bg-gray-300 checked:bg-gray-500"
          ></input>
          <label htmlFor="myCheckbox2">새로운 배송지</label>
        </div>
      </div>
      <div className="flex mr-48 mb-16">
        <span className="text-[1.25rem] flex self-start mr-48 mb-16">
          주소
          <span className="mr-9">*</span>
        </span>
        <div className="flex flex-col">
          <input className={`${S.LargeInput}`}></input>
          <input className={S.LargeInput}></input>
        </div>
      </div>
      <div className="mr-40 flex mb-16">
        <span className="text-[1.25rem] flex self-start mb-16">일반전화</span>
        <span className="mr-[11.5rem]">*</span>
        <input className={S.TinyInput} />
        <span className="ml-3 mr-3">-</span>
        <input className={S.TinyInput} />
        <span className="ml-3 mr-3">-</span>
        <input className={S.TinyInput} />
      </div>
      <div className="flex mr-40 mb-16">
        <span className="text-[1.25rem] flex self-start mb-16">휴대전화</span>
        <span className="mr-[11.5rem]">*</span>
        <input className={S.TinyInput} />
        <span className="ml-3 mr-3">-</span>
        <input className={S.TinyInput} />
        <span className="ml-3 mr-3">-</span>
        <input className={S.TinyInput} />
      </div>
      <div className="flex mr-48 mb-16">
        <span className="text-[1.25rem] flex self-start mb-16 mr-[11.5rem]">
          배송메시지
        </span>
        <input className={S.BigInput} />
      </div>
      <div className={S.OrderLine}></div>
      <span className="mr-[50rem] mb-10 text-[1.5rem] font-bold">결제수단</span>
      <div className="flex mr-52">
        <span className="text-[1.25rem] flex self-start mb-16 mr-48">
          결제방식
        </span>
        <button className="w-[25rem] h-[3.125rem] bg-yellow rounded-md">
          <span className="font-bold">카카오페이로 결제</span>
        </button>
      </div>
    </>
  );
}

export default OrderList;
