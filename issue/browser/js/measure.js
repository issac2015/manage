$(document).ready(function() {
    var footerHeight = $(".main-footer").outerHeight(); // 51 px; -- number; jq height() 获取的不是实际高度
    var headerHeight = $(".main-header").outerHeight(); // 50 px;
    var contentHeaderH = $(".content-header").outerHeight(); // 41px; content-header
    var iframeContent = 30 + 15; // 外高度
    var bodyHeight2 = $(document).height();
    var bodyHeight = document.body.clientHeight;
    var scrollTop = document.documentElement.scrollHeight || document.body.scrollHeight;
    var resolution2 = window.screen.height; // 屏幕分辨率
    var resolution = window.screen.availHeight; // 屏幕可用区域 高
    var verify = scrollTop - (footerHeight + headerHeight + contentHeaderH) - iframeContent;
    // console.log(iframe);

    console.log(">>> $ bodyHeight2", bodyHeight2);
    console.log(">>> bodyHeight", bodyHeight);
    console.log(">>> scrollTop", scrollTop);
    console.log(">>> window.screen.height", resolution2);
    console.log(">>> window.screen.availHeight", resolution);
    console.log(">>> window.screenTop", window.screenTop);
    console.log(">>> window.screenLeft", window.screenLeft);
    console.log(">>> scrollTop", scrollTop);
    console.log(">>> scrollTop", scrollTop);

    var s = ""; 
    s += " 网页可见区域宽："+ document.body.clientWidth + "\n";  
    s += " 网页可见区域高："+ document.body.clientHeight + "\n"; 
    s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)" + "\n"; 
    s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)" + "\n"; 
    s += " 网页正文全文宽："+ document.body.scrollWidth + "\n"; 
    s += " 网页正文全文高："+ document.body.scrollHeight + "\n"; 
    s += " 网页被卷去的高(ff)："+ document.body.scrollTop + "\n"; 
    s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop + "\n"; 
    s += " 网页被卷去的左："+ document.body.scrollLeft + "\n"; 
    s += " 网页正文部分上："+ window.screenTop + "\n"; 
    s += " 网页正文部分左："+ window.screenLeft + "\n"; 
    s += " 获取窗口高度："+ window.innerHeight + "\n"; 
    s += " window.height："+ window.height + "\n"; 
    s += " 屏幕分辨率的高："+ window.screen.height + "\n"; 
    s += " 屏幕分辨率的宽："+ window.screen.width + "\n"; 
    s += " 屏幕可用工作区高度："+ window.screen.availHeight + "\n"; 
    s += " 屏幕可用工作区宽度："+ window.screen.availWidth + "\n"; 
    s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色" + "\n"; 
    s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"; 
    console.log(s);

});