import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View } from "@tarojs/components";
import { AtIcon } from 'taro-ui'
import ktaro from '../../../util/taro'
import './index.scss'

const UploadImg = ({ onChange }) => {
  const [imgs, setImgs] = useState([])
  const [curPath, setCurPath] = useState('')
  const [loading, setLoading] = useState(false)
  const [imgPaths, setImgPaths] = useState([])

  const onUpload = async (path) => {
    setLoading(true)
    const uploadimg = await Taro.uploadFile({
      url: 'https://kcat.site/knote/upload-img',
      filePath: path,
      name: 'file',
      header: {
        'content-type': "Content-Type",
        'Authorization': Taro.getStorageSync('token')
      },
    })
    const result = JSON.parse(uploadimg.data)
    if (result.code != 200) {
      ktaro.showToast('上传失败', 'none')
    } else {
      const imgUrl = result.data.path
      const idx = imgPaths.indexOf(path) + 1
      setImgs([...imgs, imgUrl])
      setLoading(false)
      if (idx < imgPaths.length) {
        setCurPath(imgPaths[idx])
      } else {
        onChange([...imgs, imgUrl])
      }
    }
  }

  const onFile = () => {
    ktaro.chooseImg({ count: 9 - imgs.length }).then(res => {
      setImgPaths(res)
      setCurPath(res[0])
    })
  }

  useEffect(() => {
    if (curPath && !loading) onUpload(curPath)
  }, [curPath])

  return <View className='upload-img'>
    <View className='upload-text m30 fs32'>上传图片</View>
    <View className='img-list df-ac'>
      {imgs.map(img =>
        <View className='img-wrap img-show box-shadow' key={img} style={{ backgroundImage: `url(${img})` }}></View>
      )}
      {imgs.length < 9 && <View className='img-wrap add-btn box-shadow df-ac-jc' onClick={onFile}>
        <AtIcon value={loading ? 'loading-2' : 'add'} size='40' color='#ddd'></AtIcon>
      </View>}
    </View>
  </View>
}

export default UploadImg