
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
preview
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

### Set 和 Map
#### Set
##### Set基本知识
- `Set` 本身是一个构造函数，用来生成 `Set` 数据结构
```js
const s = new Set();

[2, 3, 3, 4, 5, 2, 2].forEach((x)=>s.add(x))

console.log(s) // Set(4) {2, 3, 4, 5}

```

- `Set` 函数可以接收一个数组作为初始化参数

```js
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56
```

- **数组去重**
```js
// 去除数组的重复成员
[...new Set(array)]
//去除字符串里面的重复字符
[...new Set('ababbc')].join('')
// "abc"
```
- 特例1： 在 Set 内部, 两个`NaN`是相等的
```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```
- 特例2： 在 Set 内部，两个对象总是不相等的
```js
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```

#####  Set 实例的属性和方法
1. 属性
- `Set.prototype.constructor`：构造函数，默认就是Set函数。
- `Set.prototype.size`：返回Set实例的成员总数。

2. 方法，有两大类
2.1 操作方法： 用于操作数据
+ `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
+ `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
+ `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为Set的成员。
+ `Set.prototype.clear()`：清除所有成员，没有返回值。
2.2 遍历操作： 用于遍历成员
- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员
- 在判断是否包括一个键上面，Object结构和Set结构的写法不同。

```js
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```
```js
// 对象的写法
const properties = {
  'width': 1,
  'height': 1
};

if (properties[someName]) {
  // do something
}

// Set的写法
const properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
  // do something
}
```

- `Array.from`方法可以将 Set 结构转为数组
```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

```js
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

- keys()，values()，entries() : 返回的都是遍历器对象,Set 结构没有键名, 所以keys方法和values方法的行为完全一致
```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```
- Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。这意味着，可以省略values方法, 直接用for...of循环遍历
```js
Set.prototype[Symbol.iterator] === Set.prototype.values
// true
```

```js
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```
- forEach(), 函数的参数与数组的forEach一致，依次为键值、键名、集合本身

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```
- 遍历的应用
**扩展运算符**
```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
```
**扩展运算符和Set结构结合，去除数组的重复成员**
```js
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]
```
**使用数组的`map`和`filter`**
```js
let set = new Set([1,2,3,4,5]);
set = new Set([...set].filter((x)=>(x%2)==0));

let set = new Set([1,2,3,4,5]);
set = new Set([...set].map((x)=>x*2));

```
**并集（Union），交集（Intersect），差集（Difference）**
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

//并集
let union = new Set([...a, ...b]);

// 交集
let intersect = new Set([...a].filter(x=>b.has(x)));

//a相对于b的差集
let difference = new Set([...a].filter(x=>!b.has(x)))

```

#### WeakSet

```js
 new WeakSet([iterable]);
```

##### 含义
- 与Set的区别
	- WeakSet的成员只能是对象，而不能是其他的类型的值
	- WeakSet中的对象都是弱引用，垃圾回收机制不考虑其对该对象的引用
```js
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
ws.add([1,2,3])
// TypeError: invalid value used in weak set
```
- 三个方法
	- `WeakSet.prototype.add(value)`：向 WeakSet 实例添加一个新成员
	- `WeakSet.prototype.delete(value)`：清除 WeakSet 实例的指定成员。
	- `WeakSet.prototype.has(value)`：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
	- WeakSet 是无法遍历的，也没有`size`属性和`forEach`方法
```js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); //true
ws.has(foo); //false

ws.delete(window); 
ws.has(window); //false

//没有size属性和forEach方法
ws.size // undefined
ws.forEach // undefined

ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function
```
- 相较于Set，WeakSet有一个优势：储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄露
下面的代码保证了`Foo`的实例方法，只能在`Foo`的实例上调用。这里使用 WeakSet 的好处是， `foos`对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑`foos`，也不会出现内存泄漏。
```js
const foos = new WeakSet();
class Foo{
	constructor(){
		foos.add(this)
	}
	create(){
		if(!foos.has(this)){
			throw new TypeError('Foo.prototype.create 只能在Foo的实例上调用！')
		}
	}
}
```

#### Map


#### WeakMap