import { View, Text } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { useState } from 'react'
import day from '../../../util/day';
import ktaro from '../../../util/taro';
import './index.scss';

const BlogList = ({ data, tags = [], onDel }) => {
  const userInfo = Taro.getStorageSync('userInfo')
  const [delId, setDelId] = useState('');
  const blogTags = {}
  tags.forEach(it => {
    blogTags[+it.id] = it.title
  })
  const handleDel = (blog) => {
    setDelId('')
    ktaro.showModal({
      title: '温馨提示',
      content: `确定要删除《${blog.title}》`,
      success: (res) => {
        if (res.confirm) {
          onDel(blog._id)
        }
      }
    })
  }
  const handleShowDel = (id) => {
    setDelId(id)
  }
  return (
    <View className='blog-list'>
      {data.map(it =>
        <View className='blog-item box-shadow b-radius m30 p30 pr' key={it._id}>
          <View className='blog-title fs32 df-sb fw'>
            <Text>{it.title}</Text>
            {userInfo._id && <Text className='iconfont icon-gengduo fs32' onClick={() => handleShowDel(it._id)}></Text>}
          </View>
          {delId === it._id && <View className='opra-blog pa box-shadow fs24'>
            <View onClick={() => handleDel(it)}>删除</View>
          </View>}
          <View className='blog-author fs24 df-ac-sb gray'>
            <Text><Text className='iconfont icon-user fs24'></Text>{it.author}</Text>
            {tags.length > 0 ?
              <Text><Text className='iconfont icon-pinpaitemai fs24'></Text>{blogTags[+it.blogType]}</Text>
              : null
            }
          </View>
          <View className='blog-content fs28 two-ell'>{
            it.content.slice(0, 200)
              .replace(/#{1,5}[\s]+[^\n]*/g, '')
              .replace(/[-`\|!#*\[\](\)]/g, '')
              .replace(/<[^>]+/g, '')
              .replace(/>/g, '')
          }</View>
          <View className='blog-type fs24 df-ac-sb gray'>
            <Text>
              <Text className='iconfont icon-date fs24'></Text>
              {day.format(it.lastModifyTimeStamp)}
            </Text>
            <Text>
              <Text className='iconfont icon-baokuan- fs24'></Text>
              {it.viewCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default BlogList;