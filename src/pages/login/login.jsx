import { useState, useEffect } from "react";
import { View, Text, Input } from "@tarojs/components";
import ktaro from '../../util/taro';

import './login.scss'

const Login = () => {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const getWxCode = async () => {
    const wxcode = await ktaro.wxCode()
    setCode(wxcode)
  }

  const handleChange = (event, type) => {
    type === 'username' ? setUsername(event.detail.value) : setPassword(event.detail.value)
  }

  const getUserInfo = async () => {
    if (!username || !password) {
      ktaro.showToast('内容不能为空！', 'none')
      return
    }
    const userInfo = await ktaro.getUserProfile('用于补充用户信息')
    ktaro.setStorage('userInfo', userInfo)
    handleSubmit(userInfo)
  }

  const handleSubmit = (userInfo) => {
    const data = {
      username, password, avatarUrl: userInfo.avatarUrl, code
    }
    console.log(data)
  }

  useEffect(() => {
    getWxCode()
  }, [])

  return (
    <View className='login'>
      <View className='kcat-logo'></View>
      <View className='kcat-name dark'>K-Note 猫舍</View>
      <View className='login-input m48 b-radius box-shadow df-ac-sb'>
        <Text className='li-label'>用户名</Text>
        <Input placeholder='请输入用户名' value={username} onInput={(v) => handleChange(v, 'username')} />
      </View>
      <View className='login-input m48 b-radius box-shadow df-ac-sb'>
        <Text className='li-label'>密&nbsp;&nbsp;&nbsp;码</Text>
        <Input placeholder='请输入密码' password value={password} onInput={(v) => handleChange(v, 'password')} />
      </View>
      <View className='login-submit m48 bgdark fff b-radius' onClick={getUserInfo}>登录</View>
    </View>
  );
};

export default Login;
