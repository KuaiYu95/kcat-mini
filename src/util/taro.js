import Taro from '@tarojs/taro'

export default {
  getUserProfile: (desc) => {
    return new Promise((res, rej) => {
      Taro.getUserProfile({
        desc,
        success: (result) => {
          res(result.userInfo)
        },
        fail: (err) => {
          rej('获取用户信息失败：' + err.errMsg)
        }
      })
    })
  },
  wxCode: () => {
    return new Promise((res, rej) => {
      Taro.login({
        success: function (result) {
          if (result.code) {
            res(result.code)
          } else {
            rej('登录失败：' + rej.errMsg)
          }
        }
      })
    })
  },
  showToast: (t = '成功', i = 'success', d = 1500) => {
    Taro.showToast({
      title: t,
      icon: i,
      duration: d
    })
  },
  setStorage: (key, data) => {
    Taro.setStorage({
      key,
      data
    })
  }
}
