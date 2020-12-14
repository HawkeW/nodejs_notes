## ECMAScript 6 -- 笔记
### ECMAScript 6.0 
- ECMAScript 6.0 是 `JavaScript` 语言的下一代标准
- 2015年6月发布

#### `ECMAScript` 与 `JavaScript`
- 前者是后者的标准/规格
- 后者是前者的一种实现

#### ES6 与 `ECMAScript2015（ES2015）`
- ES6泛指5.1版以后的JavaScript的下一代标准，含 ES2015、ES2016、ES2017
- ES2015 指2015年发布的正式版本

各浏览器对ES6的支持情况：https://kangax.github.io/compat-table/es6/

#### Node.js环境
1. 运行
```bash
$ node
> let sitename="runoob"
undefined
> console.log(sitename)
runoob
undefined
>
```

2. 查看已实现特性
```bash
node --v8-options | grep harmony
```

#### webpack
核心概念：
 - 入口（entry）
 - 输出 (output)
 - loader
 - 插件 (plugin)

1. 入口（entry）
入口指示 webpack 应该使用哪个模块，作为构建其内部依赖图的开始
- 单个入口（简写）:
```js
const config = {
  entry: "./src/main.js"
}
```
- 对象语法:
```js
const config = {
	app: "./src/main.js",
	vendors: "./src/vendors.js"
}
```
2. 输出 (output)
输出会告诉 webppack 在哪里输出它创建的 bundles ，以及如何命名这些文件，默认为`./dist`
```js
const config = {
  entry: "./src/main.js",
  output: {
  	filename: "bundles.js",
  	path: path.resolve(__dirname, 'dist')
  }
}
```
3. `loader`
`loader` 让 webpack 可以去处理那些非 JavaScript 文件， 被用于转换某些类型的模块(SCSS/SASS/vue/)
```js
const config = {
  entry: "./src/main.js",
  output: {
  	filename: "bundles.js",
  	path: path.resolve(__dirname, 'dist')
  },
  modules:{
  	rules: [
  	  {
  	  	test:/\.js$/,
  	  	exclude: /node_modules/, 
  	  	loader:"babel-loader", // 通过 babel-loader 将 ES6 的语法转为 ES5
  	  	options: [
  	  	  presets: ["env"] // 开发环境下使用
  	  	]
  	  }
  	]
  }
}
```

4. 插件 (plugins)
插件可以完成各种各样的任务，常用于打包优化、压缩、定义环境变量等等

```js
//通过 npm 安装
const HtmlWebpackPlugin = require('html-webpack-plugin');
//用于访问内置插件
const webpack = require('webpack');

const config = {
  entry: "./src/main.js",
  output: {
  	filename: "bundles.js",
  	path: path.resolve(__dirname, 'dist')
  },
  modules:{
  	rules: [
  	  {
  	  	test:/\.js$/,
  	  	exclude: /node_modules/, 
  	  	loader:"babel-loader"
  	  }
  	]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```
5. 使用 webpack 搭建应用

```js
//webpack.config.js

const path = require('path');

const config = {
  mode: "development", // "production" | "development"
  // 选择 development 为开发模式， production 为生产模式
  entry: "./src/main.js",
  output: {
  	filename: "bundles.js",
  	path: path.resolve(__dirname, 'dist')
  },
  modules:{
  	rules: [
  	  {
  	  	test:/\.js$/,
  	  	exclude: /node_modules/, 
  	  	loader:"babel-loader"
  	  }
  	]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```
#### gulp
1. 全局安装
```bash
npm install --global gulp
```
2. 项目引入依赖
```bash
npm install --save-dev gulp
```
3. 项目根目录创建`gulpfile.js`
```js
const gulp = require('gulp');

// default 表示一个任务名，为默认执行任务
gulp.task('default', function() {
  // 放置默认的任务代码
})
```
4. 运行
```bash
gulp
```
5. 使用 gulp 搭建应用

```js
const gulp = require('gulp');
const uglify = require("gulp-uglify");  
 
gulp.task('default', function() {
  gulp.src('./src/main.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
})
```

### let 和 const

### 解构赋值
- 是对赋值运算符的拓展
- 针对数组或对象进行模式匹配， 并对其中变量进行赋值
- 方便复杂对象中的数据字段获取

### Symbol