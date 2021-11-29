import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View } from "@tarojs/components";
import { AtActivityIndicator } from 'taro-ui'
import CatList from '../../components/private/CatList'
import ktaro from '../../util/taro'
import api from '../../api/index';
import './mycat.scss'

const MyCat = () => {
  const pageSize = 10
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [catList, setCatList] = useState([])

  const getUserCatsList = () => {
    api.getUserCatsList({ pageNum, pageSize }).then(res => {
      setCatList(res.data)
    })
  }

  useDidShow(() => {
    getUserCatsList()
  })
  return (
    <View className='mycat-page'>
      <CatList list={catList} /> 
      {loading && <AtActivityIndicator className='jcc m30' size={28} color='#13CE66' content='加载中...'></AtActivityIndicator>}
    </View>
  );
};

export default MyCat;
