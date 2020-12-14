
#### `Babel` 转码器
1. ES6转码器，可以将ES6代码转为ES5代码
```js
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```
2. 安装
```bash
npm install --save-dev @babel/core
```

#### `.babelrc`配置文件

1. 用于设置转码规则和插件
2. 基本格式：
```js
{
  "presets": [],
  "plugins": []
}
```
3. 安装规则集
```bash
# 最新转码规则
npm install --save-dev @babel/preset-env

# react 转码规则
npm install --save-dev @babel/preset-react
```
4. 加入规则：
```js
  {
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
```

#### 命令行转码
1. 安装
```bash
npm install --save-dev @babel/cli
```
2. 使用
```bash
# 转码结果输出到标准输出
$ npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ npx babel example.js --out-file compiled.js
# 或者
$ npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ npx babel src --out-dir lib
# 或者
$ npx babel src -d lib

# -s 参数生成source map文件
$ npx babel src -d lib -s
```

#### babel-node
1. 提供一个支持 ES6 的REPL环境，支持Node的REPL环境的所有功能，并可以直接运行ES6代码
2. 安装
```bash
npm install --save-dev @babel/node
```
3. 运行
```bash
npx babel-node
> (x => x * 2)(1)
2
```

```bash
# es6.js 的代码
# console.log((x => x * 2)(1));
npx babel-node es6.js
2
```

#### @babel/register 模块
1. 该模块改写`require`命令，为它加上一个钩子，加载文件会使用Babel进行转码

2. 安装
```bash
npm install --save-dev @babel/register
```
3. 使用
```js
// index.js
require('@babel/register');
require('./es6.js');
```
```bash
node index.js
2
```
- 注意：该模块只对`require`命令加载的文件转码，而不会对当前文件转码
- 注意：它是实时转码，只适合在开发环境使用