import { useState } from 'react'
import { View } from "@tarojs/components";
import { AtTextarea } from 'taro-ui'
import UploadImg from '../../components/common/UploadImg'
import ktaro from '../../util/taro'
import api from '../../api/index';
import './add-cat.scss'

const Cat = () => {
  const [content, setContent] = useState('');
  const [pictures, setPictures] = useState([])

  const getImgs = (imgs) => {
    setPictures(imgs)
  }

  const onSubmit = () => {
    const data = {
      pictures,
      content,
    }
    if (!content) {
      ktaro.showToast('请输入此刻的想法！')
      return;
    } 
    if (!pictures.length) {
      ktaro.showToast('请上传喵主照片！')
      return;
    }
    api.addCat(data).then(() => {
      ktaro.showToast('发布成功', 'success', () => {
        ktaro.jumpPage('/pages/cat/cat', 'switchTab')
      })
    })
  }

  return (
    <View className='add-cat-page'>
      <View className='bb'>
        <AtTextarea
          className='add-cat-text'
          autoFocus
          value={content}
          count={false}
          height={400}
          onChange={(value) => setContent(value)}
          placeholder='此刻的想法...'
        />
      </View>
      <View className='add-cat-pics mt48'>
        <UploadImg onChange={getImgs} />
      </View>
      <View className='add-cat-submit bgdark fff p30 m30 b-radius tac fs28' onClick={onSubmit}>发 布</View>
    </View>
  );
};

export default Cat;
