import Button from '@/components/Button';
import { useId } from 'react';
import S from '@/pages/SignIn/SignIn.module.css';
import I from '@/pages/SignUs/SignUs.module.css';
// import {engReg, pwReg} from "@/utils/Validation";
// import debounce from "@/utils/debounce";
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
// import {useNavigate} from "react-router-dom";

function SignUs() {
  const id = useId();
  /* Input 사용자 입력 값 감지 */
  const initalState = {
    id: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
  };
  const [formState, setFormState] = useState(initalState);
  const { name, email, password, passwordConfirm } = formState;

  // input의 onChange
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /* 회원가입 시 유효성 검사 */
  const validateSignUp = () => {
    // if (!pwReg(password)) {
    //   toast.error(
    //     "비밀번호는 10자리 이상, 14자리이하 하나의 알파벳 문자를 포함하는 특수문자를 입력해주세요!",
    //     {icon: "😡"}
    //   );
    //   throw new Error(
    //     "비밀번호는 10자리 이상, 14자리이하 하나의 알파벳 문자를 포함하는 특수문자를 입력해주세요!"
    //   );
    // }
    // if (name === "name" && !engReg(name)) {
    //   toast.error("닉네임은 영문으로만 입력해주세요!", {icon: "😡"});
    //   throw new Error("닉네임은 영문으로만 입력해주세요!");
    // }
    if (password !== passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다!', { icon: '😡' });
      throw new Error('비밀번호가 일치하지 않습니다!');
    }
  };

  // 전송버튼 클릭시
  const handleRegister = (e) => {
    e.preventDefault();
    // 비밀번호 일치하는지 확인
    validateSignUp();

    // SDK인증요청
    console.log('가입');
  };

  return (
    <>
      <section className=" h-screen">
        {/* 왼쪽영역 */}
        <div className=" p-24 bg-black text-white w-1/2 h-screen py-24 fixed top-0 left-0">
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
        {/* 오른쪽영역 */}
        <div className=" w-1/2 float-right p-24 flex flex-col items-center justify-center bg-white z-10">
          <h2 className="text-2ㅍxl mb-8 text-[#454444]">회원가입</h2>
          {/* input */}
          <form
            onSubmit={handleRegister}
            className={`${I.wrapper} flex flex-col items-center gap-1`}
          >
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                아이디<span className="text-red-600"> *</span>
              </label>
              {/* 아이디 */}
              <input
                id={id}
                type="text"
                name="id"
                onChange={handleInput}
                value={formState.name}
                placeholder="아이디를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                비밀번호<span className="text-red-600"> *</span>
              </label>
              {/* 패스워드 */}
              <input
                id={id}
                type="text"
                name="password"
                onChange={handleInput}
                value={formState.password}
                placeholder="비밀번호를 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                비밀번호 확인<span className="text-red-600"> *</span>
              </label>
              {/* 패스워드 확인 */}
              <input
                id={id}
                type="text"
                name="passwordConfirm"
                onChange={handleInput}
                value={formState.passwordConfirm}
                placeholder="비밀번호를 한번더 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                이름<span className="text-red-600"> *</span>
              </label>
              {/* 이름 */}
              <input
                id={id}
                type="text"
                name="name"
                onChange={handleInput}
                value={formState.name}
                placeholder="이름을 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                이메일<span className="text-red-600"> *</span>
              </label>
              {/* e-mail */}
              <input
                id={id}
                type="text"
                name="email"
                onChange={handleInput}
                value={formState.email}
                placeholder="이메일을 입력해 주세요"
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                휴대전화<span className="text-red-600"> *</span>
              </label>
              {/* phone */}
              <input
                id={id}
                type="text"
                name="phone"
                onChange={handleInput}
                value={formState.phone}
                className={I.input}
              />
            </div>
            <div className={I.inputWrapper}>
              <label htmlFor={id} className={I.label}>
                주소<span className="text-red-600"> *</span>
              </label>
              {/* 주소 */}
              <input
                id={id}
                type="text"
                name="address"
                onChange={handleInput}
                value={formState.address}
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

            <Button type="submit" color="black" className="w-[25rem] my-5">
              가입하기
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUs;
