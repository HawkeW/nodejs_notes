### Buffer(缓冲区):

#### Buffer 类

用来创建一个专门存放二进制数据的缓存区

```js
const buf = Buffer.from('runoob', 'ascii');

console.log(buf.toString('hex'));// 输出 72756e6f6f62

console.log(buf.toString('base64'));// 输出 cnVub29i
```

支持的字符编码包括:
- **ascii** - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- **utf8** - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- **utf16le** - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- **ucs2** - utf16le 的别名。
- **base64** - Base64 编码。
- **latin1** - 一种把 Buffer 编码成一字节编码的字符串的方式。
- **binary** - latin1 的别名。
- **hex** - 将每个字节编码为两个十六进制字符。

#### 创建Buffer相关 API

- `Buffer.alloc(size[, fill[, encoding]])`： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- `Buffer.allocUnsafe(size)`： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- `Buffer.allocUnsafeSlow(size)`
- `Buffer.from(array)`： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- `Buffer.from(arrayBuffer[, byteOffset[, length]])`： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- `Buffer.from(buffer)`： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- `Buffer.from(string[, encoding])`： 返回一个被 string 的值初始化的新的 Buffer 实例

```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 3);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'utf8');
```

#### 写入缓冲区

`buf.write(string[, offset[, length]][, encoding])`, 返回实际写入的大小。

```js
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");
console.log("写入字节数 : "+  len);
```

#### 从缓冲区读取数据
`buf.toString([encoding[, start[, end]]])`, 解码缓冲区数据并使用指定的编码返回字符串。

```js
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii')); // abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));//abcde
console.log( buf.toString('utf8',0,5));// abcde
console.log( buf.toString(undefined,0,5));//abcde
```

#### 转换为 JSON 对象

`buf.toJSON()`,  返回 JSON 对象。

- 当字符串化一个 Buffer 实例时，[JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html) 会隐式地调用该 **toJSON()**。

```js
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json); // {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

console.log(copy);// <Buffer 01 02 03 04 05>
```

#### 缓冲区合并

`Buffer.concat(list[, totalLength])`, 返回一个多个成员合并的新 Buffer 对象。

```js
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString()); //buffer3 内容: 菜鸟教程www.runoob.com
```

#### 缓冲区比较

`buf.compare(otherBuffer);`, 返回一个数字，表示 **buf** 在 **otherBuffer** 之前，之后或相同。 

```js
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
//ABC在ABCD之前
```

#### 拷贝缓冲区

`buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])`

```js
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());//abRUNOOBijkl
```

#### 缓冲区裁剪

`buf.slice([start[, end]])`, 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。

```js
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString()); //buffer2 content: rubuffer2 content: ru
```

#### 缓冲区长度

`buf.length;`