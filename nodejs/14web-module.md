### 定义
- Web服务器 一般指网站服务器
- 基本功能就是提供Web信息浏览服务
- 只需支持 HTTP协议、 HTML文档格式 及 URL
- 与客户端的网络浏览器配合
- 一般都支持服务端脚本语言（`php`/`python`/`ruby`等），并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器
- 目前最主流的三个web服务器是
	1. Apache
	2. Nginx
	3. IIS

### Web应用框架
- Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
- Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
- Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
- Data - 数据层，一般由数据库组成。

### `Node`创建Web服务器
- `http`模块
```js
var http = require('http');
var fs = require('fs');
var url = require('url');

//创建服务器
http.createServer((req, res)=>{
	//解析请求，包括文件名
	var pathname = url.parse(req.url).pathnamel

	//输出请求的文件名
	console.log("Request for " + pathname + " received.");

	//从文件系统中读取请求的文件内容
	fs.readFile(pathname.substr(1), (err, data)=>{
		if(err) {
			console.log(err);
			//HTTP 状态码： 404 ： Not Found
			//Content Type: text/html
			res.writeHead(404, {'Content-Type': 'text/html'});
		}else{
			// HTTP 状态码: 200 : OK
            // Content Type: text/html
			res.writeHead(200, {'Content-Type': 'text/html'});

			//返回响应文件内容
			res.write(data.toString());
		}
		 //  发送响应数据
      	res.end();
	})
}).listen(8080)

console.log('Server running at http://127.0.0.1:8080/');

```
