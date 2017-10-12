// demo1 配置模拟数据 -- 拦截 http 请求
Mock.mock('http://g.cn', {
    'name': '@name',
    'age|1-100': 100,
    'color': '@color'
});

$.ajax({
    url: 'http://g.cn',
    dataType: 'json'
    }).done(function(data, status, xhr) {
        console.log(data);
        console.log(JSON.stringify(data, null, 4));
        $("#fsMockRes").html(JSON.stringify(data, null, 4));
});

// demo2 随机生成 1-10 条数据
var data2 = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});
$("#fsMockRes2").html(JSON.stringify(data2, null, 4));

