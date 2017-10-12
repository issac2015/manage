var fsAlert = {
    alert: function(msg) {
        if (!msg) {
            msg ="提示内容";
        }
        $("#fsAlertDiv").remove();

        var injectHTML =     
        '<div id="fsAlertDiv" class="fs-alert" style="width: 290px;min-height: 150px;margin: auto;position: absolute;left: 40%;top: 20%;background: white;">'+
            '<div class="fs-alert-head" style="cursor:move;background: #2eb9f2;height: 30px;position: relative;">'+
                '<span style="position: absolute;color: white;left: 4px;top: 4px;">提示信息</span>'+
                '<span id="fsAlertBtnDel" style="position: absolute;right: 6px;color: white;top: 3px;cursor: pointer;font-size: 13px;">X</span>'+
            '</div>'+
            '<div style="height: 100%;border: 1px solid;border-top: 0px;position: relative;">'+
                '<div class="fs-alert-con" style="min-height: 90px;padding-top: 13px;position: relative;">'+
                    '<div style="display: inline-block;min-height: 16px;min-width: 40px;">'+
                        '<img src="img/info.png" style="position: absolute;top: 10px;left: 2px;">'+
                    '</div>'+
                    '<div id="fsAlertCon" style="word-wrap: break-word;display: inline-block;max-width: 240px;">'+
                    '</div>'+
                '</div>'+
                '<div class="fs-alert-foot">'+
                    '<div>'+
                        '<img id="fsAlertBtn" src="img/btn.png" style="cursor: pointer;float: right;margin-bottom: 2px;margin-right: 4px;">'+
                        '<div style="clear:both;height: 0; line-height: 0; font-size: 0;"></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'   
        // 插入 html
        $("body").append(injectHTML);
        $("#fsAlertCon").append(msg);

        // 设置 居中
        var setLeft = $(window).width() - $("#fsAlertDiv").outerWidth();
        var setTop = $(window).height() - $("#fsAlertDiv").outerHeight(); 
        $("#fsAlertDiv").css({ left: setLeft/2, top: setTop/2 });
        // 删除 按钮
        $("#fsAlertBtnDel").click(function() {
            $("#fsAlertDiv").remove();
        });
        // 确认 按钮
        $("#fsAlertBtn").click(function() {
            $("#fsAlertDiv").remove();
        });

        // 拖拽 标题
        fsAlert.move();
    },
    move: function() {
        var fsAlertDiv = $("#fsAlertDiv");
        var moveElem = $(".fs-alert-head");
        var dict = {};

        moveElem.on('mousedown', function(e) {
            e.preventDefault();
            
            dict.moveStart = true;
            dict.offset = [
                e.clientX - parseFloat(fsAlertDiv.css('left')),
                e.clientY - parseFloat(fsAlertDiv.css('top'))
            ];
            // moveElem.css('cursor', 'move').show();
        });
        $(document).on('mousemove', function(e){
            //拖拽移动
            if (dict.moveStart) {
                var X = e.clientX - dict.offset[0];
                var Y = e.clientY - dict.offset[1];
                e.preventDefault();
                
                // 控制 元素 不被 拖出窗口外
                var setLeft = $(window).width() - fsAlertDiv.outerWidth();
                var setTop = $(window).height() - fsAlertDiv.outerHeight(); 
                X < 0 && (X = 0);
                X > setLeft && (X = setLeft); 
                Y < 0 && (Y = 0);
                Y > setTop && (Y = setTop);

                fsAlertDiv.css({
                    left: X,
                    top: Y
                });
            }
        }).on('mouseup', function(e) {
            if(dict.moveStart){
                delete dict.moveStart;
                // ready.moveElem.hide();
            }
        });
    }
}

// fsAlert.alert("sfasfasf");


// $.get("/weChatMall/json/areaJson/queryCityLevelArea.json", function(res) { 
//     alert(res);
//     console.log(res);
// });


// $.post("/weChatMall/json/areaJson/queryCityLevelArea.json", function(res) { 
//     alert(res);
//     console.log(res);
// });


// $.ajax({
//     type: 'POST',
//     url: "/weChatMall/json/areaJson/queryCityLevelArea.json",
//     dataType: "json",
//     cache: false,
//     contentType :'application/json;charset=utf-8',
//     success: function(res) {
//         console.log(res);
//     }
// });


// $.ajax({
//     type: 'GET',
//     url: "/weChatMall/json/areaJson/queryCityLevelArea.json",
//     dataType: "json",
//     cache: false,
//     contentType :'application/json;charset=utf-8',
//     success: function(res) {
//         console.log(res);
//     }
// });


