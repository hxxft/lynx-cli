# Lynx Command-Line Interface

Lynx是一个使用Javascript来编写Android和iOS原生应用的框架。Lynx选用vue.js作为前端开发框架，当然因为Lynx兼容大部分DOM API，可以接入其他前端框架作为应用的基础开发框架

## 安装

安装要求: [Node.js](https://nodejs.org/en/) (>=6.x), npm(3+), [Git](https://git-scm.com/).

``` bash
$ npm install -g lynx-cli
```

## 初始化工程

``` bash
$ lynx init <project-name>
```

例如:

``` bash
$ lynx init my-project
```

init命令会从 [hxxft/lynx-simple-template](https://github.com/hxxft/lynx-simple-template)下载模版工程, 并且在 `./my-project/`目录下生成工程.

## 编译工程

``` bash
$ lynx build
```

Lynx会通过工程目录下面的`manfiest.json`的配置来编译工程，所有在`manifest.json`中配置过的页面都会被编译打包至dist目录下面

## 添加平台
在创建完工程之后，开发者可以添加自己想编译打包的平台。

目前暂时只支持`android`平台，`iOS`还在开发中，可以直接打开中[hxxft/lynx-native](https://github.com/hxxft/lynx-native)的iOS工程进行体验

``` bash
$ lynx platform add android
$ lynx platform add ios
```
`platform add` 命令会在`platforms`目录下面生成 `android` 或 `ios`目录

## 编译目标平台工程
Lynx可以帮助开发者编译出相应平台的可执行程序，在编译之前请查看相关平台的配置信息（android端需要在环境变量中设置`ANDROID_HOME`和`ANDROID_NDK`,来配置android的SDK和NDK路径），当然编译过程中也会对环境变量进行检查。在开始编译之前，请先执行`lynx build`

``` bash
$ lynx platform build android
$ lynx platform build ios
```

## 调试
Lynx支持快速调试页面，同时使用hot reload技术，应用无需重启，即可实时调试页面。在修改页面之后使用debug命令，Lynx将编译页面并重新加载页面，这个过程只需要保持在手机端应用处于运行状态即可

``` bash
$ lynx debug androd <page-name>
$ lynx debug ios <page-name>
```

例如:

``` bash
$ lynx debug androd app
```

## 配置文件

Lynx的工程配置信息全部存储在`manfiest.json`中，文件包含了项目名称，包名，页面信息等等

```
{
  "debug": "false",
  "application": {
    "packageName": "com.test",
    "icon": "icon.png",
    "name": "test",
    "versionCode": "",
    "versionName": "",
    "mainPage": "App.vue",
    "pages": [
      {
        "name": "App.vue"
      }
    ]
  }
}
```
配置文件中有如下参数

`debug` 设置应用是否允许被调试，默认不添加情况下是不允许被调试，可以在调试应用的时候加上，发布的时候去掉

`packageName` 打包应用的包名，为确保应用不会和手机上的应用冲突

`icon` 应用图标，放置在`src`路径下面

`name` 应用的名字，用户能看到的显示出来的名字

`versionCode` 应用的版本号，用于应用升级，必须使用整数

`versionName` 显示给用户的版本号

`mainPage` 主页面，也就是应用启动的第一个页面

`pages` 应用中所有的页面配置

