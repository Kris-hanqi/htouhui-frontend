# payday-loan-app

> 海投汇官网项目（PC）

## 开发环境搭建

1. 安装NodeJS(请安装v6.0.0以上版本)
2. 安装Yarn(安装教程请查阅[yarn](https://yarnpkg.com/zh-Hans/))
3. 安装开发依赖(命令行执行`yarn`)

## 命令介绍

* `yarn run dev` | `yarn run start ` 开发
* `yarn run build` 项目打包
* `yarn run unit` 单元测试
* `yarn run e2e` 端对端测试
* `yarn run test` 执行单元测试以及端对端测试
* `yarn run lint` 代码审查

## 开发依赖介绍

**vue 全家桶**

* [vue](https://github.com/vuejs/vue)
* [vuex](https://github.com/vuejs/vuex)
* [vue-router](https://github.com/vuejs/vue-router)

**vue插件**

* [vue-i18n](https://github.com/kazupon/vue-i18n) // 国际化组件
* [element](https://github.com/ElemeFE/element) // UI组件
* [vue-cookie](https://github.com/alfhen/vue-cookie) // 处理cookie
* [vue-lazyload](https://github.com/hilongjw/vue-lazyload) // 图片懒加载

**其他**

* [font-awesome](https://github.com/FortAwesome/Font-Awesome) // 图标库
* [normalize.css](https://github.com/necolas/normalize.css)
* [axios](https://github.com/mzabriskie/axios) // 基于 promise 的 HTTP 库
* [lodash](https://github.com/lodash/lodash) // js库(提供对常见数据类型的处理)

## 各个环境说明

* 测试环境 -- http://47.93.122.236:9600 端口: 9600-9699 
* 常驻测试环境 -- http://47.93.122.236:9666
* 预发环境 -- 待定
* 正式环境 -- 待定

## 开发规范

* js采用eslint进行代码审查 - 具体规则请查看[.eslintrc.js](./.eslintrc.js)
* css采用stylelint进行代码审查 - 具体规则请查看[.stylelintrc](./.stylelintrc)

详细请移步[开发规范](./code-guide.md)

## API中文文档集锦

* [vue中文官网](https://cn.vuejs.org/)
* [vuex中文文档](https://vuex.vuejs.org/zh-cn/)
* [vue-router中文文档](http://router.vuejs.org/zh-cn/)
* [lodash中文文档](http://www.css88.com/doc/lodash/)
* [axios中文文档](https://segmentfault.com/a/1190000008470355?utm_source=tuicool&utm_medium=referral)
