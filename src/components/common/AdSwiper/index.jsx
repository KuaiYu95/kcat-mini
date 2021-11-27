import { Image, Swiper, SwiperItem } from "@tarojs/components";
import './index.scss';

const data = [
  'https://kcat.site/wallpapers/upload_b934ce60620e83851418803383aa1e2e.jpg',
]

const AdSwiper = () => {
  return (
    <Swiper
      className='ad-swiper m30'
      indicatorColor='#fff'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay
    >
      {data.map(it => {
        return <SwiperItem key={it} className='swiper-item'>
          <Image className='swiper-img' src={it} />
        </SwiperItem>
      })}
    </Swiper>
  );
};

export default AdSwiper;