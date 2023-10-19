import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import S from './IndexPage.module.css';

function IndexPage() {
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      setIsMouseMoving(true);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsMouseMoving(false);
      }, 3000); // 마우스 움직임이 없으면 다시 아래로 내려감
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative w-screen h-screen">
      <video
        className="w-screen h-screen"
        autoPlay
        loop
        muted
        style={{ objectFit: 'cover' }}
      >
        <source src="/videos/main_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <p className="font-serif text-4xl text-center text-white">
          lumière <br /> de l&#39;aube
        </p>
      </div>
      <div className={`${S.goGallery} ${isMouseMoving ? S.moveUp : ''}`}>
        <Link to="/lumieleu/#gallery" className="font-serif text-2xl">
          상실의 시작 작품 보러가기
          <br />
          <span>&#8744;</span>
        </Link>
      </div>
    </section>
  );
}

export default IndexPage;
