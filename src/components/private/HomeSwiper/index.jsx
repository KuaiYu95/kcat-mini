import { Image, Swiper, SwiperItem } from "@tarojs/components";
import './index.scss';

const data = [
  'https://kcat.site/wallpapers/upload_b934ce60620e83851418803383aa1e2e.jpg',
]

const HomeSwiper = () => {
  return (
    <Swiper
      className='home-swiper'
      indicatorColor='#fff'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay
    >
      {data.map(it => {
        return <SwiperItem key={it}>
          <Image className='swiper-img' src={it} />
        </SwiperItem>
      })}
    </Swiper>
  );
};

export default HomeSwiper;