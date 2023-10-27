import Button from '@/components/Button';
import { useId } from 'react';
import S from '@/pages/SignIn/SignIn.module.css';
import I from '@/pages/SignUs/SignUs.module.css';

function SignUs() {
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
        <div className="flex-1 p-24 flex flex-col items-center justify-center bg-white z-10">
          <h2 className="text-2ㅍxl mb-8 text-[#454444]">회원가입</h2>
          <form className={`${I.wrapper} flex flex-col items-center gap-1`}>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                아이디<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="아이디를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                비밀번호<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                비밀번호 확인<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                이름<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                이메일<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                휴대전화<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                주소<span className="text-red-600"> *</span>
              </label>
              <input
                id={id}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>

            <div>
              <input type="checkbox" />
              <label>전체 동의합니다.</label>
            </div>
            <div>
              <input type="checkbox" />
              <label>[필수] 이용약관 동의 </label>
            </div>

            <div>
              <input type="checkbox" />
              <label>[필수] 개인정보 수집 및 이용 동의</label>
            </div>
            <div>
              <input type="checkbox" />
              <label>[선택] 쇼핑정보 수신 동의</label>
            </div>
            <div>
              <input type="checkbox" />
              <label>[선택] SMS 수신을 동의하십니까?</label>
            </div>
            <div>
              <input type="checkbox" />
              <label>[선택] 이메일 수신을 동의하십니까?</label>
            </div>
            <Button color="black" className="w-[25rem] my-5">
              가입하기
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUs;
