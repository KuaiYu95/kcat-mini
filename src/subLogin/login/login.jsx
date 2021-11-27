import { View } from "@tarojs/components";
import ktaro from '../../util/taro';
import project from '../../../project.config.json';
import api from '../../api/index';

import './login.scss'

const Login = () => {
  const getUserProfile = async () => {
    const user = await ktaro.getUserProfile('用于展示用户信息')
    const code = await ktaro.wxCode()
    const { nickName: username, avatarUrl: avatar } = user;
    ktaro.showLoading('加载中')
    const result = await api.login({
      username, avatar, code, timeStamp: new Date().getTime(), platform: 'wxapp', appid: project.appid
    })
    const { token, userInfo } = result.data
    ktaro.setStorage('userInfo', userInfo)
    ktaro.setStorage('token', token)
    ktaro.showToast(result.msg, 'success', () => ktaro.jumpPage('/pages/index/index', 'switchTab'))
  }

  return (
    <View className='login-page'>
      <View className='kcat-logo mt96'></View>
      <View className='kcat-name dark'>K-Note 猫舍</View>
      <View className='login-submit m96 bgdark fff b-radius' onClick={getUserProfile}>微信一键登录</View>
    </View>
  );
};

export default Login;
