import Taro from "@tarojs/taro";
import { useState } from 'react'
import { View, Input, Text } from "@tarojs/components";
import * as md5 from "../../util/md5";
import ktaro from '../../util/taro'
import api from '../../api/index'
import './register.scss'

const Register = () => {
  const userInfo = Taro.getStorageSync('userInfo')
  const [username, setUsername] = useState(userInfo.username)
  const [password, setPassword] = useState('')
  const onRegister = () => {
    if (!username || !password) {
      ktaro.showToast('用户名称及密码不能为空', 'none')
      return;
    }
    const data = { ...userInfo, username, password: md5.hexMD5(password) }
    delete data.code
    api.register(data).then(res => {
      ktaro.showToast(res.msg, 'success', () => {
        ktaro.showLoading('正在为您登录')
        api.login(data).then(result => {
          ktaro.setStorage('userInfo', result.data.userInfo)
          ktaro.setStorage('token', result.data.token)
          Taro.hideLoading()
          ktaro.showToast('登录成功', 'success', () => Taro.navigateBack({ delta: 2 }))
        })
      })
    })
  }
  return (
    <View className='register-page'>
      <View className='kcat-logo mt96'></View>
      <View className='kcat-name dark'>K-Note 猫舍</View>
      <View className='m30 mt96'>
        <View className='t-input df-ac-sb p30 b-radius box-shadow'>
          <Text className='fsh0 mr30 dark'>用户名称：</Text>
          <Input className='fg1 tal' value={username} onInput={(e) => setUsername(e.detail.value)} />
        </View>
        <View className='t-input df-ac-sb mt30 p30 b-radius box-shadow'>
          <Text className='fsh0 mr30 dark'>账户密码：</Text>
          <Input className='fg1 tal' password value={password} onInput={(e) => setPassword(e.detail.value)} />
        </View>
        <View className='tal fs24 gray mt30'>* 如已在 https://kcat.site 注册，请输入用户名和密码进行绑定</View>
      </View>
      <View className='bgdark fff p30 m30 b-radius mt96' onClick={onRegister}>注 册</View>
    </View>
  );
};

export default Register;
