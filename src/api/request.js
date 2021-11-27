import Taro from '@tarojs/taro'
import ktaro from '../util/taro';

class httpRequest {
  baseOptions(params, method = "GET") {
    let {
      url,
      data
    } = params;
    const BASE_URL = 'https://kcat.site/knote';
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data,
      method,
      header: {
        'content-type': contentType,
        'Authorization': Taro.getStorageSync('token')
      }
    };
    return new Promise((res, rej) => {
      Taro.request({
        ...option,
        success: (result) => {
          if (result.data.code === 300 || result.data.code === 400) {
            ktaro.showToast(result.data.msg, 'none')
            return;
          } else {
            res(result.data)
          }
        },
        fail: (err) => {
          ktaro.showToast(err.message, 'none')
          rej(err)
        }
      });
    })
  }

  get(url, data = "", other) {
    let option = {
      url,
      data
    };
    return this.baseOptions(option, "GET", other);
  }

  post(url, data, contentType) {
    let params = {
      url,
      data,
      contentType
    };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = {
      url,
      data
    };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = {
      url,
      data
    };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()
