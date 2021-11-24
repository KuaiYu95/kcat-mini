import { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import './login.scss'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const getImgs = async () => {
  }
  useEffect(() => {
    getImgs();
  }, [])
  return (
    <View className="wrapper">
    </View>
  );
};

export default Login;
