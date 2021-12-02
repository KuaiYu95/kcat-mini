import { useDidShow, useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { View } from "@tarojs/components";
import '@tarojs/taro/html5.css'
import NoData from '../../components/common/NoData'
import api from '../../api/index'
import './blogInfo.scss'

export default () => {
  const router = useRouter()
  const [detail, setDetail] = useState({})
  useDidShow(() => {
    api.getBlogDetail(router.params.id).then(res => {
      setDetail(res.data)
    })
  })
  return detail._id ? <View className='blog-info-page p30'>
    <View className='blog-title'>{detail.title}</View>
    <View className='blog-count fs24 gray tac mt20'>阅读：{detail.viewCount}</View>
    <View className='blog-detail' dangerouslySetInnerHTML={{ __html: detail.html || detail.content }}></View>
  </View> : <NoData />
}