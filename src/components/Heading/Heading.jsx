import Nav from '@/layout/Nav/Nav';
import S from './Heading.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/store';

function Heading() {
  /* 인증 정보에 따른 로그인 ➡️ 로그아웃으로 변경 */
  const isAuth = useAuthStore((state) => state.isAuth);
  // console.log(isAuth);

  /* 로그인 시 userName || name렌더링 */
  const user = useAuthStore((state) => state.user);

  /* 일반사용자 로그아웃 및 카카오 사용자 로그아웃 */
  const signOut = useAuthStore((state) => state.signOut);
  const handleSignOut = () => {
    toast.success('정상적으로 로그아웃 되었습니다.', { duration: 1000 });
    signOut();
    // kakaoLogout();
  };

  const location = useLocation();

  return (
    <div
      className={`${S.headingWrapper} ${
        location.pathname === '/lumieleu/' ? S.textWhite : ''
      }`}
    >
      <Link
        to="/lumieleu/"
        className={`text-xs text-center ${
          location.pathname === '/lumieleu/' ? `` : `font-bold`
        }`}
      >
        lumière <br /> de l&#39;aube
      </Link>
      <Nav className={location.hash === '#home' ? S.navTextWhite : ''} />

      {/* {isAuth ? (
        <div className=" cursor-pointer" onClick={handleSignOut}>
          로그아웃
        </div>
      ) : (
        <Link to="signin">Sign In</Link>
      )}

      {!isAuth && <Link to="signup">Sign Up</Link>}

      {isAuth && user && <li>{user.name || user.username}님</li>} */}
    </div>
  );
}

export default Heading;
