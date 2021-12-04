export default {
  pages: [
    "pages/index/index",
    "pages/user/user",
    "pages/blogInfo/blogInfo",
    "pages/cat/cat",
  ],
  subpackages: [{
    "root": "subMy",
    "pages": [
      "mymap/mymap",
      "mycat/mycat",
      "myblog/myblog"
    ]
  }, {
  //   "root": "subCat",
  //   "pages": [
  //     "add-cat/add-cat"
  //   ]
  // }, {
    "root": "subLogin",
    "pages": [
      "login/login",
      "register/register"
    ]
  }],
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
      pagePath: "pages/cat/cat",
      text: "猫舍",
      iconPath: "./asserts/logos/white-cat.png",
      selectedIconPath: "./asserts/logos/orange-cat.png"
    }, {
      pagePath: "pages/user/user",
      text: "个人中心",
      iconPath: "./asserts/logos/user.png",
      selectedIconPath: "./asserts/logos/user-fill.png"
    }]
  }
};
