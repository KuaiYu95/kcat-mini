import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View } from "@tarojs/components";
import { AtSearchBar, AtActivityIndicator } from 'taro-ui'
import BlogList from '../../components/common/BlogList';
import api from '../../api/index';
import './myblog.scss'

const MyBlog = () => {
  const [searchVal, setSearchVal] = useState('')
  const [blogList, setBlogList] = useState([]);
  const [blogTags, setBlogTags] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [blogType, setBlogType] = useState('');
  const [loading, setLoading] = useState(false);

  const getBlogsData = () => {
    setLoading(true)
    api.getBlogs({ pageNum, pageSize, searchVal, blogType }).then(res => {
      setBlogList(res.data)
      setLoading(false)
    })
  }
  const getBlogTags = () => {
    const userInfo = Taro.getStorageSync('userInfo')
    if (userInfo._id) {
      api.getBlogTags({}).then(res => {
        setBlogTags(res.data)
      })
    }
  }
  useDidShow(() => {
    getBlogsData()
    getBlogTags()
  })
  useEffect(() => {
    if (pageNum > 0) getBlogsData()
  }, [pageNum])

  return (
    <View className='myblog-page'>
      {blogList.length > 0 && <BlogList data={blogList} tags={blogTags} />}
      {loading && <AtActivityIndicator className='jcc m30' size={28} color='#13CE66' content='加载中...'></AtActivityIndicator>}
    </View>
  );
};

export default MyBlog;
