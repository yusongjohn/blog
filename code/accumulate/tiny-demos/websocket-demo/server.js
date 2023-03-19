const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const host = '127.0.0.1';
app.use(express.static(path.resolve(__dirname, './client')));

app.listen(port, host, () => {//监听服务
    console.log(`客户端服务器为:http://${host}:${port}`)
})
