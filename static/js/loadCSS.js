// 动态加载css文件
 function loadStyles(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url+"?v=1.0";
        document.getElementsByTagName("head")[0].appendChild(link);
 }
 
// 测试
loadStyles("/admin/public/res/plugin/bootstrap/css/bootstrap.min.css");
loadStyles("/admin/public/res/foresee/base/css/font-awesome.min.css");

