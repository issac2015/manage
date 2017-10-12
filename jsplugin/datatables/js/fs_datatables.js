/**
 * @file datatables.js 初始化的封装
 * @author issac
 * @par Copyright (c): All rights reserved.
 * @detail rely on https://datatables.net
 *
 * **/

var fsDataTables = {
    /**
     *  {data JSON对象数据的封装}
     * **/
    data: {
        tableListControl: "", // 表单控件 -- 由
        aoColumns: {}, // settings.aoColumns 用于传值给fsDataTables.fsCreateHeader(aoColumns)
        opts: { // 表单初始化options
            property: { // div标签属性
                tableId: "tableList" // 生成 表单所需要的 div
            },
            columnDefs: [], // 设置更加 复杂的自定义列
            columns: [], // datatables 列
            buttons: "",
            language: { // 显示的文字信息
                // "sProcessing": "处理中...",
                "sProcessing": "<div class='sProcessingDiv'></div><img src='/admin/public/res/images/loading/ajax-loading.gif' />",
                "sLengthMenu": "每页 _MENU_ 项",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "当前显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "当前显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "未搜索到数据",
                "sLoadingRecords": "载入中...", // 在表格中显示："载入中..."
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            // foreseeAjax: {
            //     "serviceName": system.getCustomerServiceName(),
            //     "type": "default",
            //     "url": "customerService",
            //     "method": "queryCustomerList"
            // },
            jqAjax: {
                url: "/kugou/api/v3/rank/song",
                type: "GET"
            },
            dtForm: {
                dtFormId: "dtFormId", // 生成 form 表单的id
                clearSearch: "clearSearch", // 重置按钮 id
                queryData: "queryDatatabel" // 搜索按钮 id
            },
            buttonDiv: {
                buttonId: "buttonId"
            },
            // ztree: {
            //     dtFormZtreeID: "areaTree",
            //     areaTreeDiv: "areaTreeDiv",
            //     inputVal: "areaName", // form 输入框填值
            //     requestUrl: "/gateway/customer/back/AreaManageService/queryAreaTree" + system.getRequestGatewayParam(),
            //     idFeild: "areaCode",
            //     textFeild: "areaName"
            // },
            // spinner: {
            //     serviceName: system.getSecurityServiceName(),
            //     url: "departmentService",
            //     method: "queryStoreAndFactoy",
            //     param: {
            //         userId: system.getUserId()
            //     },
            //     callback: ""
            // }
        }
    },
    /**
     *  {init 初始化}
     * **/
    init: {
        /**
         *  {initEvent初始化事件}
         * **/
        initEvent: function() {

        },
        /**
         *  {initData 初始化数据}
         * **/
        initData: function() {

        }
    },
    /**
     *  {dataTablesInit -- dataTables 初始化函数的封装}
     *  @param opts 配置信息参数
     *  @callback 回调函数，返回 DataTable 实例 Control
     * **/
    dataTablesInit: function(opts, callback) {
        // 配置信息的初始化
        $.extend(true, fsDataTables.data.opts, opts || {});
        // dataTable 的实例
        fsDataTables.data.tableListControl = $("#" + fsDataTables.data.opts.property.tableId).DataTable({
            "processing": true,
            "serverSide": true, // 开启服务器处理
            "searching": false, // 搜索框，默认是开启
            "orderMulti": false, // 启用多列排序
            "order": [], // 取消默认排序查询,否则复选框(即“选择”)一列会出现小箭头
            "columnDefs": fsDataTables.data.opts.columnDefs,
            "columns": fsDataTables.data.opts.columns, // 设置列
            "language": fsDataTables.data.opts.language,
            "scrollX": true, 
            "scrollCollapse": true,
            "renderer": "bootstrap", // 渲染样式：Bootstrap和jquery-ui
            "pagingType": "simple_numbers", // 分页样式：simple,simple_numbers,full,full_numbers
            // 控制 Datatables 元素的位置
            "dom": "<'row'<'col-sm-2'><'#" + fsDataTables.data.opts.buttonDiv.buttonId + "'><'col-sm-6'f>r>t<'row'<'col-sm-6'il><'col-sm-6'p>>",
            "ajax": function(data, callback, settings) {
                fsDataTables.data.aoColumns = settings.aoColumns;
                // 获取用户的表单信息
                var param = fsDataTables.getSearchFromData(data);

                $.ajax({
                    url: fsDataTables.data.opts.jqAjax.url,
                    type: fsDataTables.data.opts.jqAjax.type,  // POST
                    data: param,
                    success: function (res) {
                        try {
                            res = JSON.parse(res);
                        } catch (e) {

                        }
                        console.log(res);
                        // 封装返回数据
                        var returnData = {};
                        returnData.draw = data.draw; //这里直接自行返回了draw计数器,应该由后台返回
                        //返回全部数据的总数
                        returnData.recordsTotal = result.body.pager.recordCount;
                        //后台不实现过滤功能，每次查询均视作全部结果
                        returnData.recordsFiltered = result.body.pager.recordCount;
                        returnData.data = result.body.data; //返回的数据页面统计信息
                        //调用 DataTables 提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        callback(returnData);
                    },
                    error: function (res) {
                        console.log(res);
                       
                    }
                });

            },
            "headerCallback": function( thead, data, start, end, display ) {
                // 改变 header th 的值
                fsDataTables.fsCreateHeader(fsDataTables.data.aoColumns);
            },
            "initComplete": function(settings, json) { // 加载完成之后 -- 只执行一次
                // 插入 拓展按钮
                $("#" + fsDataTables.data.opts.buttonDiv.buttonId).append(fsDataTables.data.opts.buttons);

                // // 区域树
                // fsDataTables.fsAreaTree();
                // // 日历控件
                // fsDataTables.fsLaydate();

                // “查询” 按钮 -- 提交客户端表单
                fsDataTables.queryDatatabel();
                // // "重置" 按钮 
                fsDataTables.clearSearch();
            }

        }); // dataTable 的实例 结束

        callback(fsDataTables.data.tableListControl); // 回调 tableListControl控件

        new $.fn.dataTable.FixedColumns(fsDataTables.data.tableListControl, {  // 固定第一和第二列
            leftColumns: 1,
            leftColumns: 2
        });

        //错误信息提示
        $.fn.dataTable.ext.errMode = function(s, h, m) {
            if (h == 1) {
                alert("连接服务器失败！");
            } else if (h == 7) {
                alert("返回数据错误！");
            }
        };
    }, // dataTablesInit 结束
    /**
     *  {fsLaydate 日历控件 }
     * **/
    fsLaydate: function() {
        // 日历控件
        $(".timeDate").on('click', function() {
            layui.laydate({ elem: this, istime: true, format: 'YYYY-MM-DD hh:mm:ss' });
        })
    },
    /**
     *  {checkbox -- checkbox 的点击选中 }
     *  @param tableId 表单 ID
     *  
     * **/
    checkbox: function(tableId) {
        //每次加载时都先清理
        $('#' + tableId + ' tbody').off("click", "tr");
        $('#' + tableId + ' tbody').on("click", "tr", function() {
            $(this).toggleClass('selected');
            if ($(this).hasClass("selected")) {
                $(this).find("input").prop("checked", true);
            } else {
                $(this).find("input").prop("checked", false);
            }
        });
    },
    /**
     *  {getSearchFromData -- 获取用户的表单信息}
     *  
     * **/
    getSearchFromData: function(data) {
        // 封装请求参数
        var param = {};
        param.pageSize = data.length; // 页面显示记录条数，在页面显示每页显示多少项的时候
        param.start = data.start; // 开始的记录序号
        param.pageIndex = (data.start / data.length) + 1; // 当前页码
        // 序列化表单元素
        var param1 = $("#" + fsDataTables.data.opts.dtForm.dtFormId + " form").serializeArray();

        param1.forEach(function(e) {
            param[e.name] = e.value.trim();
        });

        //如果是订单页面过滤过来，需要过滤查询客户的数据
        var pageName = "";
        if (pageName == 'addOrder') {
            // 来自于订单页面调用，隐藏新增按钮
            var userId = system.getUserId();
            param.userId = userId;
        }

        //区域特殊处理
        var treeId = "";
        var areaName = $("#areaName").val();
        if (areaName == '') {
            treeId = '';
        }

        //机构
        var insTreeId = "";
        var insName = $("#insName").val();
        if (insName == '') {
            insTreeId = '';
        }

        param["treeId"] = treeId;
        param["insTreeId"] = insTreeId;

        // 遍历用户类型多选框
        var customerType = "";
        $("input[name='customerType1']:checked").each(function() {
            console.log(">>> customerType1")
            console.log($(this).val())
            customerType += $(this).val() + ",";
        });
        param["customerType"] = customerType;
        //param["postName"] = parent.parent.parent.document.getElementById("postNameDiv").innerHTML;
        param["postName"] = "金财管理员#";
        console.log(param);

        return param;
    },
    /**
     *  {clearSearch -- 清理搜索数据(即重置按钮)}
     *  
     * **/
    clearSearch: function() {
        $("#" + fsDataTables.data.opts.dtForm.clearSearch).on('click', function() {
            // 重置，清空表单查询条件
            $("#" + fsDataTables.data.opts.dtForm.dtFormId + " form")[0].reset();
            //重新读取数据
            fsDataTables.data.tableListControl.columns().search("").draw();
            //fsDataTables.data.tableListControl.ajax.reload();
        });
    },
    /**
     *  {queryDatatabel -- 向服务器发送 ajax 请求(即查询搜索按钮)}
     *  
     * **/
    queryDatatabel: function() {
        $("#" + fsDataTables.data.opts.dtForm.queryData).on('click', function() {
            fsDataTables.data.tableListControl.ajax.reload();
        });
    },
    /**
     *  {getRequest -- 获取 url 搜索部分键所对应的值}
     *  @param name 需要获取所对应值的键
     *  @return     匹配键所得到的值
     * **/
    getRequest: function(name) {
        // 去除 ?号 eg: name=Tony&id=1234
        var urlSearch = window.location.search.substr(1)
        var results = new RegExp("(^|&)" + name + "=([^&]*)").exec(urlSearch);
        if (results) {
            return results[2]
        } else {
            // alert("未匹配到数据！")
            return false
        }
    },
    /**
     *  { fsCreateHeader -- 改变 header th 的值 }
     *  @param aoColumns -- settings.aoColumns
     *  
     * **/
    fsCreateHeader: function(aoColumns) {
        if ($(".dataTables_scrollHeadInner").length > 0) { // 若用户设置了 scroll
            var dtHeaderTh = $(".dataTables_scrollHeadInner" + " table thead").find("th");
        } else { // 若用户没有设置 scroll
            var dtHeaderTh = $("#" + fsDataTables.data.opts.property.tableId + " thead").find("th");
        }

        if ($(".DTFC_LeftHeadWrapper").length > 0) {
            // console.log(">>> DTFC_LeftHeadWrapper");
            var dtDtfcHeaderTh = $(".dataTables_scrollHeadInner" + " table thead").find("th");
            var jThDtfc = 0;
            $.each(aoColumns, function(i, item) {
                if (item.bVisible) {
                    dtDtfcHeaderTh[jThDtfc].innerText = item.name;
                    jThDtfc = jThDtfc + 1;
                }
            });
        }
        var jTh = 0;
        $.each(aoColumns, function(i, item) {
            if (item.bVisible) {
                dtHeaderTh[jTh].innerText = item.name;
                jTh = jTh + 1;
            }
        });
    },
    /**
     *  { fsTemplate -- 模板引擎 }
     *  @param tpl -- html(字符串)
     *  
     * **/
    fsTemplate: function(tpl, model) {
        var fn = ""; // 创建的字符串函数
        var match = ""; // 匹配结果
        var code = ['var r=[];']; // 字符串代码（数组）
        var re = /\{\{\s*([a-zA-Z\.\_0-9()]+)\s*\}\}/m; // 匹配 mustache（{{ }}）
        var addLine = function (text) { // 在code数组中追加元素
            code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
        };
        while (match = re.exec(tpl)) { // 执行正则表达式，并赋值给match
            if (match.index > 0) {
                addLine(tpl.slice(0, match.index));
            }
            code.push('r.push(this.' + match[1] + ');'); // 将从 mustache匹配到的结果 进行字符串拼接
            tpl = tpl.substring(match.index + match[0].length); // 提取后面没有处理的tpl字符串，并赋值给tpl（刷新）
        }
        addLine(tpl);
        code.push('return r.join(\'\');');
        // 创建函数:
        fn = new Function(code.join('\n'));
        var html = fn.apply(model);
        return html;
    },
    /**
     *  { fsCreateColumns -- 读 json 数据，生成datatables 的配置选项columns }
     *  @param dtColumns -- json数据(object)
     *  @return dtColumns -- 适合 datatables.js 的配置选项columns
     * **/
    fsCreateColumns: function(dtColumns) {
        $.each(dtColumns, function(i, item) {
            if (item.render) {
                var jsonRender = item.render;
                dtColumns[i].render = function(data, type, row, meta) { // 该函数的四个参数是datatable.columns.render的参数
                    if (row) { // row 获取每一行的所有不同列的数据
                        // jsonRender eg: "<a href='#' onclick=\"showCusInfo('{{ cusId }}', '{{ cusName }}')\">{{cusName}}</a>"
                        var html = fsDataTables.fsTemplate(jsonRender, row); // 用row的数据替换掉mustache中的值
                        return html;
                    } else {
                        return "name";
                    }
                }
            };
        });
        return dtColumns;
    }
}
