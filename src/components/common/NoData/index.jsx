import { View } from "@tarojs/components";
import './index.scss'

const NoData = () => {
  return <View>
    <View className='no-data'></View>
    <View className='no-data-msg gray fs24'>暂无数据</View>
  </View>
}

export default NoData;