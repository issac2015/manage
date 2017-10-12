function onMessage(e) {
    console.log(e);
    console.log(e.data);
    // 消息来源安全验证
    if(e.origin !="http://lzw.me") {
        return false;
    }
    // 消息处理...
}

window.addEventListener('message', onMessage, false);