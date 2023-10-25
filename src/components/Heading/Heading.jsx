import S from './Heading.module.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/store';

function Heading() {
  /* 인증 정보에 따른 로그인 ➡️ 로그아웃으로 변경 */
  const isAuth = useAuthStore((state) => state.isAuth);
  console.log(isAuth);

  /* 로그인 시 userName || name렌더링 */
  const user = useAuthStore((state) => state.user);

  /* 일반사용자 로그아웃 및 카카오 사용자 로그아웃 */
  const signOut = useAuthStore((state) => state.signOut);
  const handleSignOut = () => {
    toast.success('정상적으로 로그아웃 되었습니다.');
    signOut();
    // kakaoLogout();
  };

  return (
    <div className={S.headingWrapper}>
      <h1 className="text-white">헤더</h1>
      {isAuth ? (
        <div className="text-white" onClick={handleSignOut}>
          로그아웃
        </div>
      ) : (
        <Link to="signin" className="text-white">
          Sign In
        </Link>
      )}

      {!isAuth && (
        <Link to="signUp" className="text-white">
          Sign Up
        </Link>
      )}

      {isAuth && user && (
        <li className="text-white">{user.name || user.username}님</li>
      )}
    </div>
  );
}

export default Heading;
