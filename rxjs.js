const express = require('express');
const bodyParser = require('body-parser')
const cors=require('cors');
app = express();

let servers = require('http').Server(app)
let io = require('socket.io')(servers)



app.use(bodyParser.json()) // 解析post请求
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // 设置静态文件地址
app.engine('.html', require('ejs').__express); // 设置模板
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); // 设置模板位置

app.get('/', function (req, res) {
    res.render('index', {title: 'titasdfasdfsdle'})
})

let arr = [];

io.on('connection', (socket) => {
    arr.push(socket.id);
    console.log(arr);
    // io.emit 广播 群聊 给所有在线的人发消息
    // socket.emit 谁给我发的消息 返回消息给谁,智能机器人的实现
    //监听客户端发来的消息
    //监听新用户加入
    socket.on('login', (obj) => {
        const idA = arr[1];
        console.log(io);
        io.to(idA).emit('login', obj);
    })
})

servers.listen(8088, () => {
    console.log('服务已经运行!')
});



