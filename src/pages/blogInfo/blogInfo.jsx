import { useDidShow, useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { View } from "@tarojs/components";
import { useNavigationBar } from "taro-hooks";
import '@tarojs/taro/html5.css'
import NoData from '../../components/common/NoData'
import day from '../../util/day';
import api from '../../api/index'
import './blogInfo.scss'

export default () => {
  const router = useRouter()
  const [detail, setDetail] = useState({})
  const [_, { setTitle }] = useNavigationBar({ title: "" });
  useDidShow(() => {
    api.getBlogDetail(router.params.id || '617ba9e34b5ae6b635a3b71e').then(res => {
      const { html, content, title } = res.data
      const c = html ? 
        html.replace(/\&lt\;/g, `<text><</text>`)
          .replace(/\&gt;/g, `<text>></text>`)
          .replace(/\&quot;/g, `<text>"</text>`)
          .replace(/\&amp;/g, `<text>&</text>`)
          .replace(/\&nbsp;/g, `<text> </text>`)
        : 
        content.replace(/\&lt;/g, `<text><</text>`)
          .replace(/\&gt;/g, `<text>></text>`)
          .replace(/\&quot;/g, `<text>"</text>`)
          .replace(/\&amp;/g, `<text>&</text>`)
          .replace(/\&nbsp;/g, `<text> </text>`)
      setDetail({ ...res.data, html: c })
      setTitle(title)
    })
  })
  return detail._id ? <View className='blog-info-page p30'>
    <View className='blog-count fs24 gray tac'>
      {detail.author}
      {' | 阅读：'}
      {detail.viewCount}
    </View>
    <View className='blog-detail' dangerouslySetInnerHTML={{ __html: detail.html || detail.content }}></View>
    <View className='blog-count fs24 gray tac mt20 mb96'>
      {detail.lastModifyTimeStamp ? '更新' : '发布'}：
      {day.format(detail.lastModifyTimeStamp || detail.timeStamp)}
    </View>
  </View> : <NoData />
}