### Express 核心特性
- 可以设置中间件响应`HTTP`请求
- 定义了路由表用于执行不同的`HTTP`请求动作
- 可以通过向模板传递参数来动态渲染 `HTML` 页面
### 安装
```bash
npm install express --save
```

- `body-parser`: `node.js` 中间件，用于处理 `JSON`, `Raw`, `Text` 和 `URL` 编码的数据。
- `cookie-parser`: 一个解析Cookie的工具。 通过`req.cookies`可以取到传过来的`cookie`， 并把它们转成对象。
- `multer`: node.js 中间件，用于处理 `enctype="multipart/form-data"`（设置表单的`MIME`编码）的表单数据。
```bash
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
```