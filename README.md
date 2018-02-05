# 后台管理系统 #

## 介绍

自己学习总结的一套前端SPA后台系统，带有获取实时数据，兼有一些基本的图表组件。适用于一些有监控需求的后台管理系统

## 技术栈

+ 基础框架：vue@2.5 +
+ UI框架：element-ui@2.00 +
+ 图表：echarts@3.5 +
+ 实时通讯：mqttws31
+ 打包：webpack@2.3.3
+ 脚手架：vue-cli
+ 语言：JavaScript（ES6）

## 特点

1. element-ui的tab组件结合vue-router-view组件，结合keepAlive组件构建类似tab-iframe架构的组件
2. 整体页面元素固定,排布紧凑,以便监控数据的时候减少视线的抖动
3. 结合后台推送技术,可以实现消息的实时推送/通知功能


## 总体架构

```
build/-----------开发/生产的webpack文件
config/----------开发/生产环境变量配置文件
mock/------------业务代码
src/-------------业务代码
static/----------静态资源，不需要打包的js、css和图片资源等
upload/----------上传文件的目录，可以不用
...--------------配置文件
```

## 业务架构

```
assets/----------css font image资源
common/----------公共的组件和逻辑
const/-----------变量存放
mixin/---------- mixin文件
filters/---------过滤器
view/------------视图，存放业务视图
utils/-----------工具类库
store/-----------vuex代码
router/----------router代码
resource/--------ajax请求资源
App.vue----------挂载的主文件
main.js----------入口文件
```

初始启动命令:

```
cnpm i
npm run dev
```

开发模式命令:
```
npm run dev
```
