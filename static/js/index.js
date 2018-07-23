/**
 * @file index.js 主页面 js (index.html)
 * @author 
 * @par Copyright (c): issac
 *
 * **/

var index = {
    /**
     *  {data JSON对象数据的封装}
     * **/
    data: {

    },
    /**
     *  {init 初始化}
     * **/
    init: {
        /**
         *  {initEvent 初始化事件}
         * **/
        initEvent: function() {
            // 设置页脚时间
            index.getCurrentTime();
            // 读取配置文件 -- 设置用户的自定义配置
            index.setConfig();
            // js 设置 .content-wrapper .content 的高度
            // index.setContentHeight();
            // 加载“侧边栏菜单”json数据 -- webplugin前端组件
            // index.loadMenus("/admin/static/datas/config/webplugin.json", function(res) {
            //     // 控制/监听iframe页面的操作
            //     index.controlIframe();
            // });
            $.get("/admin/static/datas/config/webplugin.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    // 控制/监听iframe页面的操作
                    index.controlIframe(); 
                });
            });
            // 加载“侧边栏菜单”json数据 -- creative前端组件
            $.get("/admin/static/datas/config/creative.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    // 控制/监听iframe页面的操作
                    index.controlIframe(); 
                });
            });
            $.get("/admin/static/datas/config/jsplugin.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    // 控制/监听iframe页面的操作
                    index.controlIframe(); 
                });
            });
            // 需解决问题
            $.get("/admin/static/datas/config/issue.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    // 控制/监听iframe页面的操作
                    index.controlIframe(); 
                });
            });
            // 备忘录
            $.get("/admin/static/datas/config/memo.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    index.controlIframe(); 
                });
            });
            // 我的文档
            $.get("/admin/static/datas/config/mydocs.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    index.controlIframe(); 
                });
            });
            // 方欣科技
            $.get("/admin/static/datas/config/foresee.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    index.controlIframe(); 
                });
            });
            // 相关代码
            $.get("/admin/static/datas/config/code.json", function(res) {
                index.loadMenusRecurve(res, function(result) {
                    index.controlIframe(); 
                });
            });

            // 监听 iframe 鼠标右键点击事件
            index.rightBtn();
        },
        /**
         *  {initData 初始化数据}
         * **/
        initData: function() {

        }
    },
    /**
     * {getCurrentTime 实时显示系统时间}
     *
     */
    getCurrentTime: function() {
        var dateObj = new Date(); //表示当前系统时间的Date对象 
        var year = dateObj.getFullYear(); //当前系统时间的完整年份值
        var month = dateObj.getMonth() + 1; //当前系统时间的月份值 
        var date = dateObj.getDate(); //当前系统时间的月份中的日
        var day = dateObj.getDay(); //当前系统时间中的星期值
        var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串 
        var hour = dateObj.getHours(); //当前系统时间的小时值 
        var minute = dateObj.getMinutes(); //当前系统时间的分钟值
        var second = dateObj.getSeconds(); //当前系统时间的秒钟值
        //如果月、日、小时、分、秒的值小于10，在前面补0
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        var newDate = year + "年" + month + "月" + date + "日 " + week + " " + hour + ":" + minute + ":" + second;
        document.getElementById("fsTimeFooter").innerHTML = newDate;
        setTimeout("index.getCurrentTime()", 1000); //每隔1秒重新调用一次该函数 
    },
    /*
     * {setConfig 读取配置文件 -- 设置用户的自定义配置}
     *
     */
    setConfig: function() {
        var requestUrl = "/admin/static/datas/config/base_config.json"
        $.get(requestUrl, function(res) {
            if (res.sidebarCollapse) { // 收起工具栏
                // console.log(">>>sidebarCollapse");
                $("body").removeClass("sidebar-collapse");
                $("body").addClass("sidebar-collapse"); // 收起工具栏
            }
            if (res.contentHeader) {
                $("#conHeaderSpan").html($.trim(res.contentHeader));
            }
            // 收起 内容的头部 content-header
            if (!res.contentHeaderVisible) {
                $(".content-header").hide();
            }
            _fs.baseConfig = res;
            sessionStorage.setItem('baseConfig', JSON.stringify(res));
        });
    },
    /*
     * {loadMenus 加载“侧边栏菜单”json数据}
     * @param url
     * @param callback 回调函数
     */
    loadMenus: function(url, callback) {
        $.get(url, function(res) {
            var treeviewLi = $('<li class="treeview"></li>');
            // 树形菜单 头部
            var treeContainer = $('<a href="#"></a>');
            treeContainer.append($("<i>", { "class": res.treeview.icon }));
            treeContainer.append($("<span>", { "text": res.treeview.span }));
            var spanHTML = 
                '<span class="pull-right-container">'+
                    '<i class="fa fa-angle-left pull-right"></i>'+
                '</span>'
            treeContainer.append(spanHTML);
            // 树形菜单 下拉选项
            var menuUl = $('<ul class="treeview-menu"></ul>');
            $.each(res.menus, function(i, item){
                var itemHTML = $("<li>");
                var aHTML = $("<a>", { "class": "control-iframe", "data-id": item.id, "data-url": item.url });
                aHTML.append($("<i>", { "class": item.icon }));
                aHTML.append($("<span>", { "text": item.span }));
                itemHTML.append(aHTML);
                menuUl.append(itemHTML);
            });
            // 插入树形菜单 到 DOM中
            treeviewLi.append(treeContainer);
            treeviewLi.append(menuUl);
            $("ul.sidebar-menu").append(treeviewLi);
            // 回调函数
            callback(true);
        });
    },
    /*
     * {loadMenusRecurve 加载“侧边栏菜单”json数据 -- 递归遍历}
     * @param res -- json 数据
     * @param callback 回调函数
     */
    loadMenusRecurve: function(res, callback) {
        var treeviewLi = $('<li class="treeview"></li>');
        // 树形菜单 头部
        var treeContainer = $('<a href="#"></a>');
        treeContainer.append($("<i>", { "class": res.treeview.icon }));
        treeContainer.append($("<span>", { "text": res.treeview.span }));
        var spanHTML =
            '<span class="pull-right-container">' +
            '<i class="fa fa-angle-left pull-right"></i>' +
            '</span>'
        treeContainer.append(spanHTML);
        // 树形菜单 下拉选项
        var menuUl = $('<ul class="treeview-menu"></ul>');
        $.each(res.menus, function(i, item) {
            if (item.treeview) {
                var childRes = {};
                childRes.treeview = item.treeview;
                childRes.menus = item.menus;
                childRes.childRes = true;
                var testTree = index.loadMenusRecurve(childRes);
                menuUl.append(testTree);
            } else {
                var itemHTML = $("<li>");
                // var aHTML = $("<a>", { "class": "control-iframe", "data-id": item.id, "data-url": item.url });
                var aHTML = $("<a>", { "class": "control-iframe", "data-id": item.id, "data-url": item.url, 
                    "data-toggle": "tooltip", "data-placement": "right", "data-original-title": item.tooltip, });
                aHTML.append($("<i>", { "class": item.icon }));
                aHTML.append($('<span>', { "text": item.span }));
                itemHTML.append(aHTML);
                menuUl.append(itemHTML);
            }
        });
        // 插入树形菜单 到 DOM中
        treeviewLi.append(treeContainer);
        treeviewLi.append(menuUl);

        // 回调函数
        if (!res.childRes) {
            // 如果 用户在 json 中配置了 res.treeview.anchor_dom, 还需要 在 html 中设置好锚点
            var verifyAnchorDOM = res.treeview.anchor_dom && 
                ($('ul.sidebar-menu li[data-anchor_dom="'+res.treeview.anchor_dom+'"]').length > 0);
            if (verifyAnchorDOM) {
                // 替换 锚点的 html
                $('ul.sidebar-menu li[data-anchor_dom="'+res.treeview.anchor_dom+'"]').replaceWith(treeviewLi);
            } else {
                $("ul.sidebar-menu").append(treeviewLi);
            }
            // debugger
            callback(true);
        } else {
            return treeviewLi;
        }
    },
    /*
     * {setIframeHeight 设置iframe的高度}
     * @param iframe -- $(".fs-content-iframe")
     * @remark 在父页面中控制
     */
    setIframeHeight: function(iframe) {
        var footerHeight = $(".main-footer").outerHeight(); // 51 px; -- number; jq height() 获取的不是实际高度
        var headerHeight = $(".main-header").outerHeight(); // 50 px;
        var contentHeaderH = $(".content-header").outerHeight(); // 41px; content-header
        var iframeContent = 30 + 15; // 外高度
        // var bodyHeight = $(document).height();
        var bodyHeight = document.body.clientHeight;
        var scrollTop = document.documentElement.scrollHeight || document.body.scrollHeight;
        // var resolution = window.screen.height; // 屏幕分辨率
        var resolution = window.screen.availHeight; // 屏幕可用区域 高
        var verify = scrollTop - (footerHeight + headerHeight + contentHeaderH) - iframeContent;

        if (iframe) {
            // iframe.contentWindow -- iframe的Window对象
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            
            if (iframeWin.document) {
                // console.log(">> iframeWin.document");
                // console.log(iframeWin.document.documentElement);
                var setHeightVal = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                
                if (setHeightVal < verify) {
                    setHeightVal = verify;
                }
                // 设置 iframe 的 高度
                iframe.height = setHeightVal;
                // 设置 iframe 中 HTML 的 高度
                if (iframeWin.document.documentElement) {
                    iframeWin.document.documentElement.clientHeight = setHeightVal;
                    // iframeWin.document.body.clientHeight = setHeightVal;
                }
            }

        }
    },
    /*
     * {setContentHeight js 设置 .content-wrapper .content 的高度}
     * @detail 
     */
    setContentHeight: function() {
        var headerHeight = $(".main-header").outerHeight(); // 50 px;
        var contentWrapper = $(".content-wrapper").height();
        console.log(contentWrapper);
        $("#fsIframe").height(contentWrapper-headerHeight);
    },
    /*
     * {controlIframe 控制/监听iframe页面的操作}
     * @detail 点击右侧导航栏 <a> 标签
     */
    controlIframe: function() {
        var that = this;
        $("a.control-iframe").on("click" ,function() {
            var thatA = this;

            // 设置所有 iframe 页面
            $("#fsIframe .fs-content-iframe").each(function() {
                $(this).css("display", "none");
            });

            // 设置 li active
            $(".sidebar-menu li").each(function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
            });
            $(thatA).parent().addClass("active")

            var iframeSrc = $(thatA).attr("data-url"); // 获取 data-url 属性值
            var iframeID = $(thatA).attr("data-id"); // 获取 data-id 属性值
            
            // 显示 或 插入 iframe
            if ($('iframe[src="'+iframeSrc+'"]').length > 0) {
                $('iframe[src="'+iframeSrc+'"]').css("display", "block");

                // 设置 content header h1 span 的值 -- 标题
                // console.log(window.frames[iframeID]); // 通过 name 属性操作子页面
                $("#conHeaderSpan").html($.trim(window.frames[iframeID].window.document.title));
            } else {
                var injectedHTML = '<iframe name="'+iframeID+'" id="'+iframeID+'" class="fs-content-iframe" src="'+iframeSrc+'"></iframe>';
                $("#fsIframe").append(injectedHTML);
                setTimeout(function() {
                    $('iframe[src="'+iframeSrc+'"]').css("display", "block");

                    // 设置 content header h1 span 的值
                    // $("#conHeaderSpan").html($.trim(window.frames[iframeID].window.document.title));
                    // $("#conHeaderSpanPath").html(iframeSrc);
                    // $("#conHeaderSpanPath").attr("href", iframeSrc);
                }, 300);
                // 设置 iframe 高度
                that.setIframeHeight($('iframe[src="'+iframeSrc+'"]')[0]);
            }
        });
        // bootstrap tooltip
        $('[data-toggle="tooltip"]').tooltip();
    },
    /*
     * {rightBtn 监听 iframe 鼠标右键点击事件}
     *
     */
    rightBtn: function() {
        $('.content-header').bind("contextmenu", function(e) {

            var injectedHTML =
        '<ul id="rightBtnDiv">'+
            '<li>'+
                '<div>'+
                    '<a onclick="refreshCurPage()" href="#">'+
                        '<i class="fa fa-refresh" aria-hidden="true"></i>'+
                        '刷新当前页面'+
                    '</a>'+
                '</div>'+
            '</li>'+
            '<li><div><a onclick="refreshAllPage()" href="#"><i class="fa fa-spinner" aria-hidden="true"></i>刷新浏览器</a></div></li>'+
            '<li><div><a onclick="rightMenuBarCtrl()" href="#"><i class="fa fa-toggle-on" aria-hidden="true"></i>右侧菜单栏</a></div></li>'+
        '</ul>'
            if (!($("#rightBtnDiv").length >0)) {
                $("body").append(injectedHTML);
            } 
            $('#rightBtnDiv').show();
            // 设置 位置
            $('#rightBtnDiv').css({
                'top': e.pageY + 'px',
                'left': e.pageX + 'px'
            });
            return false;
        });
        $(window).click(function() {
            $('#rightBtnDiv').hide();
        });
    }

}

/*
 * {refreshCurPage 刷新当前页面}
 *
 */
function refreshCurPage() {
    $(".fs-content-iframe").each(function(i, item) {
        if ($(item).css("display") == "block") {
            $(item).attr('src', $(item).attr('src'));
        }
    });
}
/*
 * {refreshAllPage 刷新浏览器}
 *
 */
function refreshAllPage() {
    location.reload();
}
/*
 * {rightMenuBarCtrl 右侧菜单栏开关}
 *
 */
function rightMenuBarCtrl() {
    if ($("body").hasClass("sidebar-collapse")) {
        $("body").removeClass("sidebar-collapse");
    } else {
        $("body").addClass("sidebar-collapse");
    }
}


$(document).ready(function () {
    index.init.initData();
    index.init.initEvent();

});