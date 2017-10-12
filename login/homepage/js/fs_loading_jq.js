/**
 * @file fsLoading 加载动画 和 进度条
 * @author 
 * @par Copyright (c): foresee
 * @detail 使用 $.fn.XXX 将其扩展进jQuery中
 *
 * **/

$.fn.fsLoading = function() {
    var data = { // JSON对象数据的封装
        injectedHTML: "", // 注入的 HTML
        opts: {
            "elem": "body", //父节点 -- 将动画元素append进elem中
            "type": "1",
            "kind": "load", // load -- 加载动画；other --进度条
            "scrollElem": "document",
            "property": { // fs_loading 的属性值
                "elem": ".fs-loading", // jq 选择器定位到该元素 -- 不要改变该值
                "class": "fs-loading-center"
            },
        },
        progress: { // progress_bar 的属性值
            "elem": "fs-progress-bar", // 该属性没有用
            "class": "fs-progress-bar"
        }
    };

    var _createLoadElem = function (type=1) {
        // src="/demo/static/img/loading-0.gif"
        data.injectedHTML = 
            '<div class="fs-loading '+data.opts.property.class+'" >' +
                '<div class="fs-cover-layer"></div>'+
                '<div class="fs-load fs-load-'+type+'" >' +
                '</div>' +
            '</div>'
        return data.injectedHTML;
   
    };
    var _createProgressBar = function (type=1) {
        var progressBarType = "";
        switch(String(type)) {
            case "0":
                progressBarType = " progress-bar-success";
                break;
            case "1":
                progressBarType = " progress-bar-info";
                break;
            case "2":
                progressBarType = " progress-bar-warning";
                break;
            case "3":
                progressBarType = " progress-bar-danger";
                break;
            default:
                progressBarType = "";
        }
        data.injectedHTML = 
    '<div class="progress">' +
        '<div class="progress-bar'+progressBarType+' '+data.progress.class+'" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">' +
            '60%'+
        '</div>'+
    '</div>'
        
        return data.injectedHTML;
    };
    var progress = function (value=30) {
        // $('.'+data.progress.elem).css("width",value + "%").text(value + "%");
        $(data.opts.elem).find("."+data.progress.class).css("width",value + "%").text(value + "%");

    };

    var opts = arguments[0]; // 获取传入的第一个参数
    // if (opts === undefined) { // 要求用户必须传值进来
    //     alert('fsLoading expects at least 1 attribute!');
    //     return false;
    // }
    var params = $.extend(true, {}, data.opts); // 传入默认的参数 key、value 给临时变量params

    // 判断用户传入值的形式： string or object.
    switch (typeof opts) {
        // eg: startLoading("#mydiv", "1", "loading or progressbar");
        case 'string':
            params.elem = opts || data.opts.elem;
            params.type = arguments[1] || data.opts.type;
            params.kind = arguments[2] || data.opts.kind;
            break;
            // eg: startLoading({elem:"#mydiv", type: "1", kind: "load" });
        case 'object':
            if (opts.elem) {
                var patt = /^(#|\.)/; // 判断开始字符是否是 #(id) 或 .(class)
                if (!patt.test(opts.elem)) {
                    alert('"elem" argument should be a html\'s id or class!');
                    return false;
                }
            } else {
                opts.elem = data.opts.elem; // 如果用户传入空值，则赋默认值给它
            }

            $.extend(true, params, opts);
            break;
        default:
            break;
            // 要求用户必须传值进来
            // alert('Unexpected type of argument! Expected "string" or "object", got ' + typeof opts);
            // return false;
    }
    // 选择注入的html模板 -- injectHTML
    if (params.kind == "load") {
        var injectHTML = _createLoadElem(params.type);
    } else {
        var injectHTML = _createProgressBar(params.type);
    }
    console.log(this);
    // 判断用户的注入方式
    if (!$(this)[0]) { // 如果是 $().fsLoading(); 调用
        // 注入html -- 先寻找 elem 是否存在 "fs_loading"
        if (!$(params.elem).find(data.opts.property.elem)[0]) { // 避免生成多个加载div
            $(params.elem).append(injectHTML);
        }
        var loadControler = $(params.elem).find(data.opts.property.elem);
    } else { // 如果是 $("#mydiv").fsLoading(); 调用
        data.opts.elem = this;
        // 注入html
        if (!$(this).find(data.opts.property.elem)[0]) {
            $(this).append(injectHTML);
        }
        var loadControler = $(this).find(data.opts.property.elem);
    }
    // 如果kind是"load",则返回元素控件；否则返回object对象
    if (params.kind == "load") {
        return loadControler;
    } else {
        return {
            "progress": progress,
            "progressCtr": $(data.opts.elem).find(".progress")
        }
    }
    
}

$.fn.fsEndLoading = function() {
    // if (!$(this)[0]) { // 如果用户没有选择器传进来
    //     $("body .fs-load").hide();
    // } else {
    //     $(this).find(".fs-load").hide();
    // }
    $(".fs-loading").hide();
}
$.extend({
    fsEndLoading: function() {
        $(".fs-loading").hide();
    }
});
$.fn.fsStartLoading = function(type) {
    if (!$(this)[0]) { // 如果用户没有选择器传进来
        if (!$("body .fs-load")[0]) {
            $("body .fs-load").fsLoading({"type": type, kind: "load" });
        }
        $("body .fs-load").show();
    } else {
        if (!$(this).find(".fs-load")[0]) {
            $(this).fsLoading({"type": type, kind: "load" });
        }
        $(this).find(".fs-load").show();
    }
}