import { useState } from "react";
import { View, Text, Navigator } from "@tarojs/components";
import Taro, { useDidShow, useReady } from '@tarojs/taro'
import AdSwiper from '../../components/common/AdSwiper'
import day from '../../util/day';

import './user.scss'

const User = () => {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const user = Taro.getStorageSync('userInfo')
    setUserInfo(user)
  }

  const logout = () => {
    setUserInfo({})
    Taro.clearStorage()
  }

  useReady(() => getUserInfo())

  useDidShow(() => getUserInfo());

  return (
    <View className='user-page'>
      {userInfo._id ?
        <View className='user-info df m30'>
          <View className='user-logo' style={{ backgroundImage: `url(${userInfo.avatar})` }}></View>
          <View className='user-name ml30 df-sa'>
            <View className='fs28'>{userInfo.username}</View>
            <View className='fs24'>
              <Text>活跃：{day.fromNow(userInfo.timeStamp) || 0}</Text>
            </View>
          </View>
        </View>
        :
        <View className='user-info df-ac m30'>
          <View className='user-logo default-bgi'></View>
          <View className='no-login-text ml30 df-sa fs28'>
            <Navigator hoverClass='none' url='/subLogin/login/login'>未登录</Navigator>
          </View>
        </View>
      }
      {/* <AdSwiper /> */}
      <View className='func-nav'>
        <View className='func-nav-item b-radius box-shadow m30 p30 fs24'>
          <Navigator hoverClass='none' url='/subMy/myblog/myblog'>我 的 博 客</Navigator>
        </View>
        {/* <View className='func-nav-item b-radius box-shadow m30 p30 fs24'>
          <Navigator hoverClass='none' url='/subMy/mycat/mycat'>我 的 猫 舍</Navigator>
        </View> */}
        <View className='func-nav-item b-radius box-shadow m30 p30 fs24'>
          <Navigator hoverClass='none' url='/subMy/mymap/mymap'>我 的 足 迹</Navigator>
        </View>
      </View>
      {userInfo._id && <View className='tac bgdark fff b-radius box-shadow m30 p30 mt96 fs28' onClick={logout}>登 出</View>}
    </View>
  );
};

export default User;
