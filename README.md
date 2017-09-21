# Lynx Command-Line Interface

Create, build, and run native apps for iOS and Android using JavaScript.

## Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g lynx-cli
```

## Init Project

``` bash
$ lynx init <project-name>
```

Example:

``` bash
$ lynx init my-project
```

The above command pulls the template from [hxxft/lynx-simple-template](https://github.com/hxxft/lynx-simple-template), prompts for some information, and generates the project at `./my-project/`.

## Build Project

``` bash
$ lynx build
```

Build the project according to the manifest.json. All pages defined in the manifest file will be built.

## Add Platforms 
After you have created your project, you can start adding target platforms to it. You should check android/ios develop environment at first.

``` bash
$ lynx platform add android
$ lynx platform add ios
```
`platform add` creates the `android` and the `ios` subdirectories in the `platforms` directory.

## Build Platforms Project
Build your project to target paltform. Before this your should execute `lynx build` at first

``` bash
$ lynx platform build android
$ lynx platform build ios
```

## Debug
Quickly viewing source code changes with ‘hot reload’

``` bash
$ lynx debug androd <page-name>
$ lynx debug ios <page-name>
```

Example:

``` bash
$ lynx debug androd app
```
