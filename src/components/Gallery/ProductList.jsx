import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import S from './ProductList.module.css';
import pb from '@/api/pocketbase';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import {
  Mousewheel,
  FreeMode,
  Pagination,
  Navigation,
  Scrollbar,
  Keyboard,
} from 'swiper/modules';
import { useRef } from 'react';

function ProductList() {
  const [productList, setProductList] = useState([]);
  const circleRef = useRef(null);

  const handleMouseMove = (e) => {
    const mouseX = e.clientX - 20;
    const mouseY = e.clientY - 90;
    circleRef.current.style.left = mouseX + 'px';
    circleRef.current.style.top = mouseY + 'px';
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const getHomeList = async () => {
      try {
        const ProductListData = await pb.collection('products').getFullList();
        setProductList(ProductListData);
      } catch (error) {
        throw new Error('Error fetching product list');
      }
    };
    getHomeList();
  }, []);

  const handleSlideChange = (swiper) => {
    const { activeIndex } = swiper;

    if (activeIndex >= 7 && activeIndex < swiper.slides.length - 2) {
      swiper.slideTo(swiper.slides.length - 1);
    } else if (activeIndex === 9) {
      swiper.slideTo(6);
    } else if (activeIndex === swiper.slides.length - 1) {
      // 마지막 페이지인 경우
      // 원을 작동시키는 코드 추가
      if (circleRef.current) {
        circleRef.current.classList.add(S.active); // 작동을 나타내는 클래스 추가
      }
    } else {
      // 마지막 페이지가 아닌 경우, 원 작동 클래스 제거
      if (circleRef.current) {
        circleRef.current.classList.remove(S.active);
      }
    }
  };

  return (
    <Swiper
      slidesPerView="auto"
      // spaceBetween={40}
      mousewheel={true}
      navigation={true}
      freeMode={true}
      keyboard={true}
      pagination={{
        type: 'progressbar',
      }}
      scrollbar={{
        hide: true,
      }}
      modules={[
        Scrollbar,
        Mousewheel,
        Pagination,
        Navigation,
        FreeMode,
        Keyboard,
      ]}
      className={`${S.swiper}`}
      // centeredSlides={1}
      onSlideChange={handleSlideChange}
    >
      <SwiperSlide className={`${S.swiperSlide}`}>
        <p className=" w-[700px] -left-[250px] top-[250px] -rotate-90 relative  h-[200px] text-[40px] ">
          Lorem Ipsum is simply dummy text of the printing and tyunce with
          righteous indignation and dislike men who are so beguiled and
        </p>
      </SwiperSlide>

      {productList
        ?.sort((a, b) => a.index - b.index)
        .map((products, index) => (
          <SwiperSlide key={products.id} className={S.swiperSlide}>
            <ProductItem products={products} index={index} />
          </SwiperSlide>
        ))}

      <SwiperSlide className={`${S.swiperSlide}`}>
        <div className={S.active} ref={circleRef}></div>
        <span className="block   font-serif text-[80px] text-center">
          LUMIÉRE <br />
          DE LAUBE
        </span>
      </SwiperSlide>
      {/* <revButton ref={navigationPreveRef}>

      </revButton> */}
    </Swiper>
  );
}

export default ProductList;
