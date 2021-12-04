import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { View, Map, Text } from '@tarojs/components'
import day from '../../util/day'
import api from '../../api'
import './map.scss'

export default function Index() {
  const mapCtx = Taro.createMapContext('myMap')
  const [makers, setMakers] = useState([])
  const [makerList, setMakerList] = useState([])
  const [selectMaker, setSelectMaker] = useState({})
  const onMarkerTap = (e) => {
    const { markerId } = e.detail
    const curClickTab = makers.filter(it => it.position.lat + it.position.lng === markerId)[0]
    setSelectMaker(curClickTab)
    const mapDom = document.getElementById('map-info')
    mapDom.style.top = '10vh'
  }
  const onTap = () => {
    setSelectMaker({})
    const mapDom = document.getElementById('map-info')
    mapDom.style.top = '100vh'
  }
  useDidShow(() => {
    api.getAllMaps({}).then(res => {
      const list = res.data.map(it => {
        return {
          id: it.position.lat + it.position.lng,
          latitude: it.position.lat,
          longitude: it.position.lng,
          title: it.title,
          width: 16,
          height: 25,
        }
      })
      const points = res.data.map(it => {
        return {
          latitude: it.position.lat,
          longitude: it.position.lng,
        }
      })
      setMakers(res.data)
      setMakerList(list)
      mapCtx.includePoints({
        points,
        padding: [100, 100, 100, 100],
      })
    })
  })
  return (
    <View className='map-page'>
      <Map
        id='myMap'
        setting={{}}
        markers={makerList}
        showLocation
        onTap={onTap}
        onMarkerTap={onMarkerTap}
        latitude={0}
        longitude={0}
        style={{ height: '100vh', width: '100vw' }}
      >
      </Map>
      <View id='map-info' className='map-info tac p30 pb96'>
        {selectMaker._id && <View>
          <View className='map-place fs50 tac bb'>{selectMaker.place}</View>
          {selectMaker.timeStamp && <View className='map-time fs24 gray mt20'>游玩时间：{day.format(selectMaker.timeStamp, 'YYYY-MM-DD')}</View>}
          {selectMaker.peers.length > 0 && <View className='map-peers fs24 gray mt20'>同行：{selectMaker.peers.join('，')}</View>}
          <View className='map-title fs40 mt20 tal alink'>{selectMaker.title} <Text className='map-position fs24 gray'>[{selectMaker.position.lat},{selectMaker.position.lng}]</Text></View>
          <View className='map-experience fs32 mt20 tal'>{selectMaker.experience}</View>
          <View className='map-imgs df mt48 mb96'>
            {selectMaker.imgs.length > 0 && selectMaker.imgs.map((img, idx) => {
              return <View className='map-img-item bgcov box-shadow b-radius fsh0' key={idx} style={{ backgroundImage: `url(${img})` }}></View>
            })}
          </View>
        </View>}
      </View>
    </View>
  )
}