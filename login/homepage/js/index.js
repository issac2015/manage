// loginparam 返回给客户端的参数
var loginparam = {
    "head": {
        "operateFlag": true,
        "operateCode": "00000200",
        "operateDesc": "易号码和纳税人识别号至少有一个不为空",
        "operateDate": "2017-07-19 09:32:38",
        "serviceTime": 2,
        "host": "http://gdn.esv.com.cn",
        "uri": "/cloud/ftcsp/rest/common/message/getNewMessageList"
    },
    "data": {
        "username": "",
        "password": "",
        "isRememb": "",
        "isAutologin": ""
    }
};

// 自动化操作 -- 传值给客户端
function autoInClient(loginparam) {
    // NotifyOpenUrl -- 先客户端请求用户上次登录的情况
    // var param = _omni.container.sendmessagetocontainer('{"ActionId":"NotifyOpenUrl","Param":""}');

$.get("/admin/static/datas/login/autoInClient.json", function(result) {
    // param = JSON.parse(result);
    param = result;

    loginparam.data.isRememb = param.isRememb;
    loginparam.data.isAutologin = param.isAutologin;
    if (loginparam.data.isRememb == "true" || loginparam.data.isAutologin == "true") {
        loginparam.data.username = param.username;
        loginparam.data.password = param.password;
        // 触发输入框文字动画
        $("#usernameSpan").animate({ left: '0px', top: '-28px' }, "slow");
        $("#passwordSpan").animate({ left: '0px', top: '-28px' }, "slow");
        setTimeout(function() { // 设置输入框的值
            $("#username").val(loginparam.data.username);
            $("#password").val(loginparam.data.password);
        }, 300);

        if (loginparam.data.isRememb == "true") { // 勾选 记住密码
            $("#rememberPW").attr("checked", true);
        }
        if (loginparam.data.isAutologin == "true") { // 勾选 自动登录
            $("#autoLogin").attr("checked", true);
            // console.log(">>> isAutologin");
            // 将 object 转为字符串。
            try {
                loginparam = JSON.stringify(loginparam);
            } catch(error) {
                // alert(error);
            }
            // 如果勾选了自动登录，就传值给客户端
            // var bb =_omni.container.sendmessagetocontainer('{"ActionId":"NotifyLogin","Param":' + loginparam+ '}');
        
        }
    }
});
}



$(document).ready(function() {
    
    autoInClient(loginparam); // 自动化操作 -- 传值给客户端

    // 绑定 用户名 输入框 点击事件 -- 触发动画
    $("#username").click(function() {
        $("#usernameSpan").animate({ left: '0px', top: '-28px' }, "slow");
    });
    // 绑定 密码 输入框 点击事件 -- 触发动画
    $("#password").click(function() {
        $("#passwordSpan").animate({ left: '0px', top: '-28px' }, "slow");
    });
    // 绑定 用户注册 按钮
    $("#fsUserRegister").click(function() { 
        var bb =_omni.container.sendmessagetocontainer('{"ActionId":"NotifyRegister","Param": ""}');
        
    });
    // 绑定 忘记密码 按钮
    $("#fsforgetPassword").click(function() { 
        var bb =_omni.container.sendmessagetocontainer('{"ActionId":"NotifyGetMember","Param": ""}');
        
    });

    // 登录按钮
    $("#fsLogin").on("click", function() {
		if (!loginparam) {
			// loginparam 返回给客户端的参数
			var loginparam = {
				"head": {
					"operateFlag": true,
					"operateCode": "00000200",
					"operateDesc": "易号码和纳税人识别号至少有一个不为空",
					"operateDate": "2017-07-19 09:32:38",
					"serviceTime": 2,
					"host": "http://gdn.esv.com.cn",
					"uri": "/cloud/ftcsp/rest/common/message/getNewMessageList"
				},
				"data": {
					"username": "",
					"password": "",
					"isRememb": "",
					"isAutologin": ""
				}
			};
		}
		
        var param = {};
        var param1 = $(".fs-form-container form").serializeArray(); // 得到的是一个数组

        param1.forEach(function(e) { // 转成 object
            param[e.name] = e.value.trim();
        });

        // 输入框的校验
        // var verifyPhone = /^1\d{10}$/; // 校验手机号码: 第一位为1，共11位数字
        // console.log(verifyPhone.test(param.username));
        // var verifyPassword = /\s/; // 匹配空白字符 -- 密码不能有空格

        // 构造 loginparam 参数值 -- 用于传给客户端
        loginparam.data.username = param.username;
        loginparam.data.password = param.password;

        if (param.rememberPW) {
            loginparam.data.isRememb = "true";
        } else {
            loginparam.data.isRememb = "false";
        }
        if (param.autoLogin) {
            loginparam.data.isAutologin = "true";
        } else {
            loginparam.data.isAutologin = "false";
        }
        // 将 object 转为字符串。
        try {
            loginparam = JSON.stringify(loginparam);
        } catch(error) {
            // alert(error);
        }
        
        // var bb =_omni.container.sendmessagetocontainer('{"ActionId":"NotifyLogin","Param":' + loginparam+ '}');

        // var controlLoading = $('.login-right').fsLoading(); // 启动登录动画
        // $.ajax({
        //     url: "/rest/security/hkj/login",
        //     type: "POST", // "GET"
        //     data: param, 
        //     success: function(res) {
        //         console.log(res);
        //         $.fsEndLoading();  //关闭 播放动画的方法。
        //     },
        //     error: function(res) {
        //         console.log(res);
        //         $.fsEndLoading();  //关闭 播放动画的方法。
        //     }
        // });
    });
});