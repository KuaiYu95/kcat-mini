import { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { AtNoticebar } from 'taro-ui'
import { View, Text } from "@tarojs/components";
import NoData from '../../components/common/NoData'
import day from '../../util/day'
import api from '../../api';
import './mymap.scss'

const MyMap = () => {
  const [makersList, setMakersList] = useState([])
  useDidShow(() => {
    api.getMap({}).then(res => {
      setMakersList(res.data.filter(it => !it.isPublic))
    })
  })
  return (
    <View className='mymap-page'>
      <AtNoticebar icon='volume-plus'>
        小程序仅供查看，如需记录足迹，请前往 https://kcat.site/ky 
      </AtNoticebar>
      {makersList.length > 0 ? <View className='map-maker'>
        {makersList.map(maker =>
          <View className='maker-item m30 p30 box-shadow' key={maker._id} style={{ backgroundImage: `url(${maker.imgs[0]})` }}>
            <View className='maker-place df-ac'>
              <Text className='iconfont icon-zuji fs50'></Text>
              <Text className='fs40'>{maker.place}</Text>
            </View>
            <View className='maker-position fs24 gray'>
              {day.format(maker.timeStamp, 'YYYY年MM月DD日')} [{maker.position.lat} - {maker.position.lng}]
            </View>
            <View className='maker-title'>{maker.title}</View>
            <View className='maker-peers fs24 gray'>同行：{maker.peers.join(', ')}</View>
            <View className='maker-experience two-ell gray'>{maker.experience}</View>
          </View>
        )}
      </View> : <NoData />}
    </View>
  );
};

export default MyMap;
