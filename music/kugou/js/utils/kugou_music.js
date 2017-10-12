// var searchURL = "/i/v2/?module=&cmd=23&behavior=play&appid=2739&pid=6&hash=4A8BABA113C950FDC921F3F53426019F&cdnBackup=1&key=35bc64c7269e7c60e07dc9b9ae67bda2"
// get
// var searchSong = "mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=%E7%BA%A2%E9%A2%9C%E6%B3%AA&page=1&pagesize=30&showtype=1&callback=kgJSONP721606236"
// 排行榜 500 首
// http://mobilecdn.kugou.com/api/v3/rank/song?page=1&ranktype=2&rankid=6666&pagesize=500 
// fm 电台
// www.kugou.com/fm/app/i/?cmd=1&uid=44333827&key=45bddce826dbd9555a2ddfa3a0d9a8ec

/**
 * {searchByHash 通过 hash 值来搜索歌曲}
 *
 */
function searchByHash(songhash="CCA26ACE7D98C222D6E31A99A8CCB1CE") {
    var argv = [].slice.call(arguments);
    var callback = argv.pop(); // 最后一个参数为回调函数

    var getSongInfo = "/kugou/app/i/getSongInfo.php"
    var param = {
        cmd: "playInfo",
        hash: songhash,
        from: "mkugou"
    };
    $.ajax({
        url: getSongInfo,
        type: "GET",  // POST
        data: param,
        success: function (res) {
            try {
                res = JSON.parse(res);
            } catch (e) {

            }
            var songURL = res.url;
            // console.log(res);
            if (typeof(callback) == "function") {
                callback(res); // 回调结果
            }
        },
        error: function (res) {
            // console.log(res);
            if (typeof(callback) == "function") {
                callback(res); // 回调结果
            }
        }
    });
}
/**
 * {kugouSearch 通过 keyword 等参数来搜索歌曲}
 * @keyword 歌手、歌名、拼音
 */
 function kugouSearch() {
    //http://mobilecdn.kugou.com/api/v3/search/song?format="jsonp"
    //     &keyword="繁星音乐盛典"&page=1&pagesize=30&showtype=1
    var argv = [].slice.call(arguments);
    var callback = argv.pop();

    var keyword = argv[0] || "繁星音乐盛典";   //歌名
    var pagesize = argv[1] || 60;  //每页多少首
    var page = argv[2] || 1;   
    var format = argv[3] || "String"; // 不提供该参数的更改作用
    var showtype = argv[4] || 1;
    var param = {
        keyword: keyword,
        format: 'String',
        page: page,
        pagesize: pagesize,
        showtype: showtype
    };
    // console.log(param);
    var kugouSearch = "/kugou/api/v3/search/song";
    $.ajax({
        url: kugouSearch,
        type: "GET",  // POST
        data: param,
        success: function (res) {
            try {
                res = JSON.parse(res);
            } catch (e) {

            }
            // console.log(res);
            if (typeof(callback) == "function") {
                callback(res); // 回调结果
            } 
        },
        error: function (res) {
            // console.log(res);
            if (typeof(callback) == "function") {
                callback(res); // 回调结果
            }
        }
    });
}
/**
 * {rankInfoSearch 通过 rankid 等参数来搜索歌曲}
 *
 */
function rankInfoSearch() { 
    // "http://m.kugou.com/rank/info?rankid=8888&page=1&json=true";
    var argv = [].slice.call(arguments);
    var callback = argv.pop(); // 最后一个参数为回调函数
    // 6666 -- 酷狗飙升榜 23784 -- 网络红歌榜 24971 -- DJ热歌榜 27 -- 华语新歌榜
    // 22050 -- 粤语新歌榜
    var rankid = argv[0] || "24971"; // 默认 TOP500
    var page = argv[1] || 1; 

    var param = {
        rankid: rankid,
        page: page,
        json: true
    }

    var rankInfoURL = "/kugou/rank/info";
    $.ajax({
        url: rankInfoURL,
        type: "GET",  // POST
        data: param,
        success: function (res) {
            try {
                res = JSON.parse(res);
            } catch (e) {

            }
            // console.log(res);
            if (typeof(callback) == "function") {
                callback(res); // 回调结果
            }
            
        },
        error: function (res) {
            // console.log(res);
            if (typeof(callback) == "function") {
                callback(res); // 回调结果
            }
        }
    });

}




