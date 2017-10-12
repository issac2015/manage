$(document).ready(function () {
    // http://mobilecdn.kugou.com/api/v3/rank/song?page=1&ranktype=2&rankid=6666&pagesize=500
    var getSongInfo = "/kugou/api/v3/rank/song"
    var param = {
        page: "1",
        ranktype: "2",
        rankid: "6666",
        pagesize: "500"
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
            console.log(res);
         
        },
        error: function (res) {
            console.log(res);
           
        }
    });

});