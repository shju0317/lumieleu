import Button from '@/components/Button';
import { useId } from 'react';
import S from './SignIn.module.css';

function Signin() {
  const id = useId();
  return (
    <>
      <section className="flex flex-1 h-screen">
        <div className="flex-1 p-24 bg-black text-white py-24 relative">
          <p className="absolute bottom-48 left-7 text-6xl font-light">
            lumière de l'aube
          </p>
          <p className="absolute bottom-32 left-8 font-thin">
            Lorem Ipsum is simply dummy text of the printing and tyunce with
            <br></br>
            righteous indignation and dislike men who are so beguiled and
          </p>
          <div className="flex">
            <div className={S.solid}></div>
            <div className={S.dashed}></div>
            <div className={S.solid}></div>
          </div>
        </div>
        <div className="flex-1 px-24 flex flex-col items-center justify-center bg-white z-10">
          <h2 className="text-center text-7xl mb-16 text-[#454444]">Sign In</h2>
          <form className="flex flex-col items-center gap-5">
            <div>
              <label htmlFor={id}></label>
              <input
                id={id}
                type="text"
                placeholder="아이디를 입력해 주세요"
                className="border w-[25rem] h-[3.125rem] pl-5"
              />
            </div>
            <div>
              <label htmlFor={id}></label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className="border w-[25rem] h-[3.125rem] pl-5"
              />
            </div>
            <Button color="black" className="w-[25rem]">
              가입하기
            </Button>
            <Button color="white" className="w-[25rem]">
              카카오 로그인
            </Button>
            <Button color="white" className="w-[25rem]">
              회원가입
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signin;
