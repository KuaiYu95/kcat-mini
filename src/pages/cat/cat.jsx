import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text } from "@tarojs/components";
import { AtActivityIndicator, AtFab } from 'taro-ui'
import CatList from '../../components/private/CatList'
import ktaro from '../../util/taro'
import api from '../../api/index';
import './cat.scss'

const Cat = () => {
  const pageSize = 10
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [catList, setCatList] = useState([])

  const getCatsList = () => {
    setLoading(true)
    api.getCatsList({ pageNum, pageSize }).then(res => {
      setLoading(false)
      setCatList(res.data)
    })
  }

  const onAdd = () => {
    ktaro.checkSession().then(res => {
      if (res) {
        ktaro.jumpPage('/subCat/add-cat/add-cat')
      }
    })
  }

  useDidShow(() => {
    getCatsList()
  })

  useEffect(() => {
    getCatsList()
  }, [pageNum])


  return (
    <View className='cat-page pr'>
      <View className='add-fab pf'>
        <AtFab className='bgdark' onClick={onAdd}>
          <Text className='at-fab__icon at-icon at-icon-add'></Text>
        </AtFab>
      </View>
      <CatList list={catList} />
      {loading && <AtActivityIndicator className='jcc m30' size={28} color='#13CE66' content='加载中...'></AtActivityIndicator>}
    </View>
  );
};

export default Cat;
