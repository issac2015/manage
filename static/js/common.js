/**
 * @file common.js 公共函数
 * @author 
 * @par Copyright (c): issac
 *
 * **/

var common = {
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

        },
        /**
         *  {initData 初始化数据}
         * **/
        initData: function() {

        }
    },
    /*
     * {generateMixed 产生随机数}
     *
     */
    generateMixed: function(n) {
        if (!n) { n =5 }
        var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        var res = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*35);
            res += chars[id];
        }
        return res;
    },
    /*
     * {isMobile 判断是否为 移动端}
     * @return true/false
     */
    isMobile: function() {
        return /Android|SymbianOS|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|Opera Mini|Mobi/i.test(navigator.userAgent);
    },
    isPC: function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "IEMobile", "Opera Mini",
                "SymbianOS", "webOS", "BlackBerry","Windows Phone",
                "iPad", "iPod", "Mobi"];
        var flag = true;
        for (var i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    /*
     * {browser 返回browser.name 和 browser.version}
     * @detail
     *    "webkit": Safari or Chrome; version is WebKit build number
     *    "opera": the Opera browser; version is the public version number
     *    "mozilla": Firefox or other gecko-based browsers; version is Gecko version
     *    "msie": IE; version is public version number
     * @eg: Firefox 3.6, for example, returns: { name: "mozilla", version: "1.9.2" }
     */
    browser: function() {
        console.log(navigator.userAgent.toLowerCase());
        var s = navigator.userAgent.toLowerCase();
        var match = /(webkit)[ \/]([\w.]+)/.exec(s) ||
            /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s) ||
            /(msie) ([\w.]+)/.exec(s) ||
            !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
            [];

        return { name: match[1] || "", version: match[2] || "0" };
    },
    /*
     * {getViewportSize 返回 视窗的大小}
     * @return {w: 120, h: 23}
     */
    getViewportSize: function(w) {
        // Use the specified window or the current window if no argument
        w = w || window;  

        // This works for all browsers except IE8 and before
        if (w.innerWidth != null) {
            return {w: w.innerWidth, h:w.innerHeight};
        }

        // For IE (or any browser) in Standards mode
        var d = w.document;
        if (document.compatMode == "CSS1Compat") {
            return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
        }

        // For browsers in Quirks mode
        return { w: d.body.clientWidth, h: d.body.clientWidth };
    }
}


$(document).ready(function() {
    // common.init.initData();
    // common.init.initEvent();
    
});
