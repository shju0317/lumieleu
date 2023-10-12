import Button from '@/components/Button';
import { useId } from 'react';

function Signin() {
  const id = useId();
  return (
    <>
      <section className="py-28">
        <h2 className="text-center text-7xl mb-16 text-[#454444]">Sign In</h2>
        <form className="flex flex-col items-center gap-5">
          <div>
            <label htmlFor={id}></label>
            <input
              id={id}
              type="text"
              placeholder="아이디를 입력해 주세요"
              className="border w-[400px] h-[50px] pl-5"
            />
          </div>
          <div>
            <label htmlFor={id}></label>
            <input
              id={id}
              type="text"
              placeholder="비밀번호를 입력해 주세요"
              className="border w-[400px] h-[50px] pl-5"
            />
          </div>
          <Button color="black" className="w-[400px]">
            가입하기
          </Button>
          <Button color="white" className="w-[400px]">
            카카오 로그인
          </Button>
          <Button color="white" className="w-[400px]">
            회원가입
          </Button>
        </form>
      </section>
    </>
  );
}

export default Signin;
