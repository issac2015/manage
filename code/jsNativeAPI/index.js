// 原生js 实现 jq $(document).ready(function(){ });
document.ready = function(callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    } else if (document.lastChild == document.body) {
        callback();
    }
}

// 查询窗口 滚动条的位置 -- 兼容IE
function getScrollOffsets(w) {
    w = w || window;
    if (w.pageXOffset != null) {
        return {x: w.pageXOffset, y:w.pageYOffset};
    }
    var d = w.document;
    if (document.compatMode == "CSS1Compat") {
        return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
    }
    return { x: d.body.scrollLeft, y: d.body.scrollTop };
}
function run_getScrollOffsets() {
    var run_val = getScrollOffsets();
    console.log(run_val);
}


// 查询窗口 的视口尺寸
function getViewportSize(w) {
    w = w || window;  
    // 除了 IE8 及更早版本的以外，其他浏览器都可以用
    if (w.innerWidth != null) {
        return {w: w.innerWidth, h:w.innerHeight};
    }
    // 对于标准模式的 IE(或任意浏览器)
    var d = w.document;
    if (document.compatMode == "CSS1Compat") {
        return { w: d.documentElement.clientWidth,
                 h: d.documentElement.clientHeight };
    }
    // 对 怪异模式下的 浏览器
    return { w: d.body.clientWidth, h: d.body.clientWidth };
}

// 查询 选取的文本
function getSelectedText() {
    if (window.getSelection) { // HTML5 标准API
        return window.getSelection().toString();
    } else if (document.selection) { // IE 特有的技术
        return document.selection.createRange.text;
    } else {
        return null;
    }
}
// 自动上传 文件 -- 监听事件 change
// 上传的 url 设置在 data-uploadto 中
function autoUploadFiles() {
    // 所有的 input 元素
    var elts = document.getElementsByTagName("input"); 
    for(var i = 0; i < elts.length; i++) {           
        var input = elts[i];
        if (input.type !== "file") { // 必须为 file 类型
            continue; 
        }
        // 获取上传的 url
        var url = input.getAttribute("data-uploadto"); 
        if (!url) {
            continue;
        }
        // 绑定 change 事件 -- When user selects file
        input.addEventListener("change", function() {
            // 假设是 单文件 选择
            var file = this.files[0]; 
            if (!file) {
                return; // If no file, do nothing
            }
            // 创建一个 新的请求
            var xhr = new XMLHttpRequest();   
            // POST to the URL
            xhr.open("POST", url);
            // Send the file as body         
            xhr.send(file);
        }, false);
    }
}

// 兼容 IE 的 事件处理程序注册代码
// var b = document.getElementById("mybutton");
// var handler = function() { alert("测试"); };
// if (b.addEventListener) {
//     b.addEventListener("click", handler, false);
// } else {
//     b.attachEvent("onclick", handler);
// }

// 使用 attachEvent() 注册的处理程序作为函数调用时，它们的 this值 是全局（Window）对象。
// 可以用 如下代码来 解决这个问题。
function addEvent(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else {
        target.attachEvent("on"+type, function(event) {
            // 把处理程序 作为事件目标的方法调用，传递事件对象
            return handler.call(target, event);
        });
    }
}


window.onload = function() {
    // run_getScrollOffsets()
    var asdkhjsd = getViewportSize();
    console.log(asdkhjsd);
}