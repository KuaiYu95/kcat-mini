import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View } from "@tarojs/components";
import { AtSearchBar, AtActivityIndicator } from 'taro-ui'
import BlogList from '../../components/common/BlogList';
import HomeSwiper from '../../components/private/HomeSwiper'
import ktaro from '../../util/taro'
import api from '../../api/index';
import './index.scss'

const Index = () => {
  const [searchVal, setSearchVal] = useState('')
  const [blogList, setBlogList] = useState([]);
  const [blogTags, setBlogTags] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [blogType, setBlogType] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSearchChange = (value) => {
    setSearchVal(value)
  }
  const handleSearch = () => {
    pageNum === 0 ? getBlogsData() : setPageNum(0)
  }
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
        const tags = {}
        res.data.forEach(it => {
          tags[+it.id] = it.title
        })
        setBlogTags(tags)
      })
    }
  }
  const handleDel = (_id, id) => {
    api.delBlog({ _id, id }).then(res => {
      ktaro.showToast(res.msg)
      getBlogsData()
    })
  }
  useDidShow(() => {
    getBlogsData()
    getBlogTags()
  })
  useEffect(() => {
    if (pageNum > 0) getBlogsData()
  }, [pageNum])

  return (
    <View className='index-page'>
      {/* <HomeSwiper /> */}
      <AtSearchBar
        value={searchVal}
        onChange={handleSearchChange}
        onConfirm={handleSearch}
        onActionClick={handleSearch}
      />
      {blogList.length > 0 && <BlogList data={blogList} tags={blogTags} onDel={handleDel} />}
      {loading && <AtActivityIndicator className='jcc m30' size={28} color='#13CE66' content='加载中...'></AtActivityIndicator>}
    </View>
  );
};

export default Index;
