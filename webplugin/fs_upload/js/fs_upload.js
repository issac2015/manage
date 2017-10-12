/**
 * @file 上传文件的组件
 * @author 
 * @par Copyright (c): foresee
 *
 * **/

fsUpload = {
    /**
     *  {data JSON对象数据的封装}
     * **/
    data: {
        opts: {
            id: "fsFile", // 使用 label for 来绑定 input file(id)
            class: "fs-upload",
            name: "thumbnail",
            url: "/api/fileUpload",
            method: "post", // post or get
            success: function(res) {

            },
            label: {
                icon: "fa fa-cloud-upload",
                text: "上传文件"
            }
            
        }
    },
    /**
     *  {init 初始化}
     * **/
    init: {

    },
    fsUpload: function(opts) {
        // 配置信息的初始化
        $.extend(true, fsUpload.data.opts, opts || {});
        var formElem = $('<form target="_blank" method="'+ fsUpload.data.opts.method +'" enctype="multipart/form-data" action="'+ fsUpload.data.opts.url+'"></form>');
        var injertHTML = 
    '<input type="file" name="'+fsUpload.data.opts.name+'" id="'+fsUpload.data.opts.id+'" style="display: none;">'+
    '<label class="btn btn-default" for="'+fsUpload.data.opts.id+'">'+
        '<i class="'+fsUpload.data.opts.label.icon+'"></i>'+
        '<span>'+fsUpload.data.opts.label.text+'</span>'+
    '</label>'

        formElem.append($(injertHTML));
        $("body").append(formElem);
        // <input type="file"
        $('#'+fsUpload.data.opts.id).off('change').on('change', function() {
            $('#'+fsUpload.data.opts.id).parent().submit();
        });
    }
}


