/*
 * @Author: yu.kuai
 * @Date: 2021-11-24 11:50:40
 * @LastEditors: 
 * @LastEditTime: 2021-11-24 14:36:22
 * @Description: 
 */
export default {
  pages: ["pages/index/index", "pages/user/user"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#333",
    selectedColor: "#333",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [{
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "./asserts/logos/home.png",
      selectedIconPath: "./asserts/logos/home-fill.png"
    }, {
      pagePath: "pages/user/user",
      text: "个人中心",
      iconPath: "./asserts/logos/user.png",
      selectedIconPath: "./asserts/logos/user-fill.png"
    }]
  }
};
