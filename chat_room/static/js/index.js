var fsWebsocket = "";
var username = common.generateMixed();
var socket = io("http://localhost:3002"); //默认连接部署网站的服务器

// 初始化 客服妹妹 -- 初始化一个对话框 界面
layui.use('layim', function(layim) {
    
    console.log(username);
    //先来个客服模式压压精
    layim.config({
        init: {
            //我的信息
            "mine": {
                "username": username, //我的昵称
                "id": username, //我的ID
                "status": "online", //在线状态 online：在线、hide：隐身
                "sign": "爱生活，爱运动", //我的签名
                "avatar": "/admin/chat_room/static/img/pic.jpg" //我的头像
            }
        },
        // init: url,
        brief: false //是否简约模式（如果true则不显示主面板）
    })
    .chat({
            name: '客服妹妹',
            type: 'friend',
            avatar: '/admin/chat_room/static/img/customer_service.jpg', // 客服的头像
            id: "10001",
            offset: ['89px', '200px']
        });

    // layim.setChatMin();  // 如果你在初始的状态下不想展开聊天面板(最小化)

    socket.emit("addUser",{nickname:username, color:"red"});
    //接收到新消息
    socket.on('messageAdded', function(data) {
        console.log(data);
    });
    // socket.emit("addMessage", "sadasf"); // 发送消息
});
// 初始化界面的监听事件
layui.use('layim', function(layim) {
    //layim建立就绪 -- 用于监听LayIM初始化就绪。
    layim.on('ready', function(res) {
        // res 携带一些基础配置信息、我的用户信息、好友/群列表信息、本地数据库信息等
         console.log(res);
        // 离线消息
        // return unread_msg_tips(msg_data);
    });
    //监听发送消息 -- 在 layIM 中进行聊天
    layim.on('sendMessage', function(data) {
        console.log(data);
        var resData = JSON.stringify(data);
        socket.emit("addMessage", resData);  // 发送聊天信息 给后台服务器

    });
    //监听在线状态的切换事件
    layim.on('online', function(data) { // 隐身--data="hide"; 在线--data="online"
        console.log(data);
        // fsWebsocket.send(JSON.stringify({ type: data }));
    });
    //更改个性签名
    layim.on('sign', function(value) { // 个性签名的文字信息
         console.log(value);
    });
    // 监听更换背景皮肤
    layim.on('setSkin', function(filename, src){
        console.log(filename); //获得文件名，如：1.jpg
        console.log(src); //获得背景路径，如：http://res.layui.com/layui/src/css/modules/layim/skin/1.jpg
    });  
    // 监听查看群员
    layim.on('members', function(data) {
        console.log(data);
    });
    // 监听聊天窗口的切换
    layim.on('chatChange', function(obj) {
        console.log(obj);
    });

});


$(document).ready(function () {
    // connectWebsockect();
});
