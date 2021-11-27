import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text } from "@tarojs/components";
import { AtSearchBar, AtActivityIndicator } from 'taro-ui'
import BlogList from '../../components/common/BlogList';
import ktaro from '../../util/taro'
import NoData from '../../components/common/NoData'
import api from '../../api/index';
import './myblog.scss'

const MyBlog = () => {
  const pageSize = 10
  const [searchVal, setSearchVal] = useState('')
  const [blogList, setBlogList] = useState([]);
  const [blogTags, setBlogTags] = useState({});
  const [pageNum, setPageNum] = useState(0);
  const [blogType, setBlogType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showTagsSelect, setShowTagsSelect] = useState(false)
  const handleSearchChange = (value) => {
    setSearchVal(value)
  }
  const handleSearch = () => {
    pageNum === 0 ? getBlogsData() : setPageNum(0)
  }
  const handleShowTagsSelect = () => {
    setShowTagsSelect(!showTagsSelect)
  }
  const handleSelectTag = (type) => {
    setBlogType(type)
    setPageNum(0)
    handleShowTagsSelect()
  }
  const getBlogsData = () => {
    setLoading(true)
    api.getUserBlogs({ pageNum, pageSize, searchVal, blogType }).then(res => {
      setLoading(false)
      setBlogList(res.data)
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
    getBlogsData()
  }, [pageNum, blogType])

  return (
    <View className='myblog-page pr'>
      <View className='df-ac-sb p30'>
        <AtSearchBar
          className='fg1'
          value={searchVal}
          onChange={handleSearchChange}
          onConfirm={handleSearch}
          onActionClick={handleSearch}
        />
        <View className='fsh0 gray df-ac' onClick={handleShowTagsSelect}>
          <Text className='iconfont icon-gengduo fs50'></Text>
          <Text>{blogTags[blogType]}</Text>
        </View>
      </View>
      {showTagsSelect && <View className='tags-list pa box-shadow p30'>
        {Object.keys(blogTags).map(tag =>
          <View className='tags-item fs24 gray tac' key={tag} onClick={() => handleSelectTag(tag)}>{blogTags[tag]}</View>
        )}
      </View>}
      {blogList.length > 0 ? <BlogList data={blogList} tags={blogTags} onDel={handleDel} />
        :
        <NoData />
      }
      {loading && <AtActivityIndicator className='jcc m30' size={28} color='#13CE66' content='加载中...'></AtActivityIndicator>}
    </View>
  );
};

export default MyBlog;
