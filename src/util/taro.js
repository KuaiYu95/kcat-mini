import Taro from '@tarojs/taro'

export default {
  chooseImg: ({
    count
  }) => {
    return new Promise((result) => {
      Taro.chooseImage({
        count,
        sizeType: 'compressed',
        success: (res) => {
          if (res.errMsg === "chooseImage:ok") {
            result(res.tempFilePaths)
          } else {
            this.showToast(res.errMsg, 'none')
          }
        },
        fail: () => {
          this.showToast('上传出现问题，请检查网络', 'none')
        }
      })
    })
  },
  checkSession: () => {
    return new Promise((res) => {
      Taro.checkSession({
        success: () => res(),
        fail: () => {
          this.showToast('登录已过期，请重新登录', 'none', () => {
            this.removeStorage('userInfo')
            this.removeStorage('token')
            this.jumpPage('/subLogin/login/login')
          })
        }
      })
    })
  },
  jumpPage: (url, type = 'navigateTo') => {
    Taro[type]({
      url
    })
  },
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
  showToast: (t = '成功', i = 'success', f = () => {}, d = 1500) => {
    Taro.showToast({
      title: t,
      icon: i,
      duration: d,
      success: () => setTimeout(f, d)
    })
  },
  showLoading: (t = '成功') => {
    Taro.showLoading({
      title: t,
      mask: true
    })
  },
  setStorage: (key, data) => {
    Taro.setStorage({
      key,
      data
    })
  },
  removeStorage: (key) => {
    Taro.removeStorage({
      key
    })
  },
  getStorage: (key) => {
    return new Promise(result => {
      Taro.getStorage({
        key,
        success: res => result(res.data)
      })
    })
  },
  showModal: ({
    title,
    content,
    success = () => {},
    fail = () => {},
    complete = () => {},
    showCancel = true,
    cancelText = '取消',
    confirmText = '确定',
  }) => {
    Taro.showModal({
      title,
      content,
      showCancel,
      success,
      fail,
      complete,
      cancelColor: '#bbb5ac',
      cancelText,
      confirmColor: '#2b1216',
      confirmText,
    })
  },
}
