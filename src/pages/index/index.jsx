import { useState } from 'react'
import { View } from "@tarojs/components";
import { AtSearchBar } from 'taro-ui'
import AdSwiper from '../../components/common/AdSwiper'
import HomeSwiper from '../../components/private/HomeSwiper'

import './index.scss'

const Index = () => {
  const [searchVal, setSearchVal] = useState('')
  const handleSearch = (value) => {
    setSearchVal(value)
    console.log('handleSearch', value)
  }
  return (
    <View className='wrapper'>
      <AtSearchBar value={searchVal} onChange={handleSearch} />
      <HomeSwiper />
      <AdSwiper />
    </View>
  );
};

export default Index;
