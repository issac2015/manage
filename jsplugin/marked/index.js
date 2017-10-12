$(document).ready(function() {
    var defaultText = 
`jsd

# asdhj

## sadkjhsd

### asjdhsdjksd

#### asjdhsdds

###### ashdgsdkjshdsd

>hgsdasdkjhsdaskdjsd

* asjdhsd
* 交互式电视
* 啥计划为金匮肾气丸`
    
    // 初始化 值的设置
    console.log(defaultText);
    $("#md").val(defaultText);
    var mdToHTML = marked($("#md").val());
    console.log(mdToHTML);
    $('#html').html(mdToHTML);

    $("#md").on("keyup blur",function () {
        $('#html').html(marked($("#md").val()));
    });

});

