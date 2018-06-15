/**
 * @file fs_paging.js 前端分页功能的封装
 * @author 
 * @par Copyright (c):
 * @detail -- rely on jQuery
 *
 * **/
var fsPaging = {
    /**
     *  {data JSON对象数据的封装}
     * **/
    data: {
        opts: { // 初始化 options
            language: { // 显示的文字信息
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "尾页"
                }
            },
            page: {
                currentPage: 0, // 当前页码
                pageCount: 5, // 每页显示几条数据
                numBtnCount: 3, // 当前页 左右两边 各多少个 页码按钮
                maxCount: 0, // 总页码数 -- 此数值由前端计算
                // 页码 按钮 显示的内容
                // numBtnVal: ["广州", "深圳", "珠海", "东莞", "惠州", "佛山", "清远"],
                // numBtnVal: [1, 2, 3, 4, 5, 6, 7],
                numBtnVal: [],
                datas: [] // ajax 请求的数据
            },
            dom: {
                paginationBox: "fs-pagination", //分页 容器
                mainBox: "fs-main-box", // 内容 容器
                numBtnBox: "fs-pagenum-box", // 页码 按钮 容器
                btnBox: "fs-btn-box", //按钮 容器
                inputSearch: "fs-page-input", // 搜索 输入框
                searchBtn: "fs-page-search", // 搜索 按钮
                currentBtn: "fs-active" // 当前 选中 页码 按钮
            },
            foreseeAjax: {
                "serviceName": "system.getCustomerServiceName()",
                "type": "default",
                "url": "customerService",
                "method": "queryCustomerList"
            }
        }
    },
    /**
     *  {fsPaging -- 初始化函数的封装}
     *  @param opts 配置信息参数
     *  
     * **/
    fsPaging: function(opts) {
        var that = this;
        // 配置信息的初始化
        $.extend(true, that.data.opts, opts || {});
        // 创建容器主体
        that.createMainDom();
        // 搜索页面数据
        that.searchPage();
    },
    /**
     *  {createMainDom -- 创建容器主体}
     *  @param 
     *  
     * **/
    createMainDom: function() {
        var that = this;
        var injectHTML = 
        '<div class="' + that.data.opts.dom.btnBox + '">'
            +'<button data-page="first" class="fs-first-btn">'+that.data.opts.language.oPaginate.sFirst+'</button>'
            +'<button data-page="prev" class="fs-prev-btn">'+that.data.opts.language.oPaginate.sPrevious+'</button>'
            +'<span class="' + that.data.opts.dom.numBtnBox + '"></span>'
            +'<button data-page="next" class="fs-next-btn">'+that.data.opts.language.oPaginate.sNext+'</button>'
            +'<input type="text" placeholder="请输入页码" class="' + that.data.opts.dom.inputSearch + '">'
            +'<button class="' + that.data.opts.dom.searchBtn+'">'+that.data.opts.language.sSearch+'</button>'
            +'<button data-page="last" class="fs-last-btn">'+that.data.opts.language.oPaginate.sLast+'</button>'
        +'</div>'
        +'<div class="' + that.data.opts.dom.mainBox + '"></div>'
        
        // 分页 容器
        $('.' + that.data.opts.dom.paginationBox).html(injectHTML);

        // inputSearch 搜索 输入框的值变化时,将其值赋值给 searchBtn(搜索 按钮)
        $('.' + that.data.opts.dom.btnBox + ' .' + that.data.opts.dom.inputSearch).change(function() {
            // 如果输入的值是数字
            if (!isNaN($(this).val())) {
                // 如果该值大于总页码, 则跳转尾页
                if ($(this).val() > that.data.opts.page.maxCount) {
                    $(this).val(that.data.opts.page.maxCount);
                }
                // 如果该值小于1, 则跳转首页
                if ($(this).val() < 1) {
                    $(this).val(1);
                }
            } else {
                // 如果该值不是数字, 则清空value
                $(this).val('');
            }
            // 赋值给 searchBtn(搜索 按钮)
            $('.' + that.data.opts.dom.btnBox + ' .' + that.data.opts.dom.searchBtn).attr('data-page', $(this).val() ? $(this).val() - 1 : '');
        });
        // 上一页、下一页等按钮绑定 搜索时间 -- 只绑定一次
        $('.' + that.data.opts.dom.btnBox + ' button').each(function(i, item) {
            $(this).click(function() {
                //有值且不是上一次的页码时才调用
                if (item.getAttribute('data-page') && item.getAttribute('data-page') != that.data.opts.page.currentPage) {
                    that.searchPage(item.getAttribute('data-page'));
                }
            });
        });

    },
    /**
     *  {createNumBtn -- 创建页码 按钮}
     *  @param currentPage 当前页码
     *  
     * **/
    createNumBtn: function(currentPage) {
        var that = this;
        // 自定义按钮 value -- 若小于 最大页码数,则显示为数字
        if (that.data.opts.page.numBtnVal.length < that.data.opts.page.maxCount) {
            for (var i= that.data.opts.page.numBtnVal.length; i<that.data.opts.page.maxCount; i++) {
                that.data.opts.page.numBtnVal.push(i+1);
            }
        }

        var injectHTML = that.createNumBtnHtml(currentPage);
        // 页码 按钮 容器
        $('.' + that.data.opts.dom.numBtnBox).html(injectHTML);
        // 钩子函数 -- 页码按钮渲染完毕


        //按钮禁用 -- 除了 currentBtn 按钮外，其它按钮都可以用
        $('.' + that.data.opts.dom.btnBox + ' button').not('.' + that.data.opts.dom.currentBtn).attr('disabled', false);
        // currentPage 为 0 时
        if (!currentPage) {
            //首页时 -- 禁止首页+上一页
            $('.' + that.data.opts.dom.btnBox + ' .fs-first-btn').attr('disabled', true);
            $('.' + that.data.opts.dom.btnBox + ' .fs-prev-btn').attr('disabled', true);
        }
        if (currentPage == that.data.opts.page.maxCount - 1) { 
            //尾页时 -- 禁止尾页+下一页
            $('.' + that.data.opts.dom.btnBox + ' .fs-last-btn').attr('disabled', true);
            $('.' + that.data.opts.dom.btnBox + ' .fs-next-btn').attr('disabled', true);
        }

    },
    /**
     *  {createNumBtnHtml -- 创建页码 按钮}
     *  @param currentPage 当前页码
     *  
     * **/
    createNumBtnHtml: function(currentPage) {
        var that = this;
        var injectHTML = "";
        // maxCount 大于等于 numBtnCount*2+1 时
        if (that.data.opts.page.maxCount > that.data.opts.page.numBtnCount * 2) {
            // 当前页左边 的渲染
            if (currentPage - that.data.opts.page.numBtnCount > -1) {
                // 此页左边有 numBtnCount 页时, currentPage页码从 0开始
                for (var m = that.data.opts.page.numBtnCount; m > 0; m--) {
                    injectHTML += '<button data-page="' + (currentPage - m) + '">' + that.data.opts.page.numBtnVal[(currentPage - m)] + '</button>';
                }
            } else {
                for (var k = 0; k < currentPage; k++) {
                    injectHTML += '<button data-page="' + k + '">' + that.data.opts.page.numBtnVal[(k)] + '</button>';
                }
            }
            // 当前页
            injectHTML += '<button data-page="' + currentPage + '" class="' + that.data.opts.dom.currentBtn + '" disabled="disabled">' + that.data.opts.page.numBtnVal[(currentPage)] + '</button>';
            // 当前页右边 的渲染
            if (that.data.opts.page.maxCount - currentPage > 3) { 
                //此页右边有 numBtnCount 页时, currentPage页码从 0开始
                for (var j = 1; j < that.data.opts.page.numBtnCount + 1; j++) {
                    injectHTML += '<button data-page="' + (currentPage + j) + '">' + that.data.opts.page.numBtnVal[(currentPage + j)] + '</button>';
                }
            } else {
                for (var i = currentPage + 1; i < that.data.opts.page.maxCount; i++) {
                    injectHTML += '<button data-page="' + i + '">' + that.data.opts.page.numBtnVal[(i)] + '</button>';
                }
            }


            // 当左边 或 右边 按钮数少于 numBtnCount 时 -- 此处做调整, 保证显示按钮数正确
            if (injectHTML.match(/<\/button>/ig).length < that.data.opts.page.numBtnCount * 2 + 1) {
                injectHTML = '';
                if (currentPage < that.data.opts.page.numBtnCount) { //此页左边页码少于固定按钮数时
                    for (var n = 0; n < currentPage; n++) { //此页左边
                        injectHTML += '<button data-page="' + n + '">' + that.data.opts.page.numBtnVal[(n)] + '</button>';
                    }
                    injectHTML += '<button data-page="' + currentPage + '" class="' + that.data.opts.dom.currentBtn + '" disabled="disabled">' + that.data.opts.page.numBtnVal[(currentPage)] + '</button>'; //此页
                    for (var x = 1; x < that.data.opts.page.numBtnCount * 2 + 1 - currentPage; x++) { //此页右边
                        injectHTML += '<button data-page="' + (currentPage + x) + '">' + that.data.opts.page.numBtnVal[(currentPage + x)] + '</button>';
                    }
                }
                if (that.data.opts.page.maxCount - currentPage - 1 < that.data.opts.page.numBtnCount) {
                    for (var y = that.data.opts.page.numBtnCount * 2 - (that.data.opts.page.maxCount - currentPage - 1); y > 0; y--) { //此页左边
                        injectHTML += '<button data-page="' + (currentPage - y) + '">' + that.data.opts.page.numBtnVal[(currentPage - y)] + '</button>';
                    }
                    injectHTML += '<button data-page="' + currentPage + '" class="' + that.data.opts.dom.currentBtn + '" disabled="disabled">' + that.data.opts.page.numBtnVal[(currentPage)] + '</button>'; //此页
                    for (var z = currentPage + 1; z < that.data.opts.page.maxCount; z++) { //此页右边
                        injectHTML += '<button data-page="' + z + '">' + that.data.opts.page.numBtnVal[(z)] + '</button>';
                    }
                }
            }
            
            return injectHTML;
        } else {
        // maxCount 小于 numBtnCount*2+1 时

            // 当前页左边 的渲染
            for (var n = 0; n < currentPage; n++) {
                injectHTML += '<button data-page="' + n + '">' + that.data.opts.page.numBtnVal[(n)] + '</button>';
            }
            // 当前页
            injectHTML += '<button data-page="' + currentPage + '" class="' + that.data.opts.dom.currentBtn + '" disabled="disabled">' + that.data.opts.page.numBtnVal[(currentPage)] + '</button>';
            // 当前页右边 的渲染
            for (var x = 1; x < that.data.opts.page.maxCount - currentPage; x++) { //此页右边
                injectHTML += '<button data-page="' + (currentPage + x) + '">' + that.data.opts.page.numBtnVal[(currentPage + x)] + '</button>';
            }
            return injectHTML;
        }

    },
    /**
     *  {searchPage -- 搜索页面数据}
     *  @param 
     *  
     * **/
    searchPage: function(pageNum) {
        console.log(pageNum);
        var that = this;
        var obj = { other: {}, value: ["www","www","www","www","asdas","asdas","asdas","asdas","asdas",11, 22, 33, 44] };
        //将展示的数据赋值给that.data.opts.page.datas (array)
        that.data.opts.page.datas = obj.value;
        //设置ajax请求数据分成的最大页码 -- 能否取整
        that.data.opts.page.maxCount = that.data.opts.page.datas.length % that.data.opts.page.pageCount ? parseInt(that.data.opts.page.datas.length / that.data.opts.page.pageCount) + 1 :
            that.data.opts.page.datas.length / that.data.opts.page.pageCount;
        // 设置当前页码
        if (!isNaN(pageNum)) { //数字按钮
            that.data.opts.page.currentPage = parseInt(pageNum);
        } else {
            switch (pageNum) {
                case 'first':
                    that.data.opts.page.currentPage = 0;
                    break;
                case 'prev':;
                    if (that.data.opts.page.currentPage > 0) {
                        --that.data.opts.page.currentPage;
                    }
                    break;
                case 'next':
                    if (that.data.opts.page.currentPage + 1 < that.data.opts.page.maxCount) {
                        ++that.data.opts.page.currentPage;
                    }
                    break;
                case 'last':
                    that.data.opts.page.currentPage = that.data.opts.page.maxCount - 1;
                    break;
            }
        }
        //创建数字按钮
        that.createNumBtn(that.data.opts.page.currentPage);
        //赋值给页码跳转输入框的value，表示当前页码
        $('.' + that.data.opts.dom.btnBox + ' .' + that.data.opts.page.inputSearch).val(that.data.opts.page.currentPage + 1);

        // 为每个 页码 按钮 绑定请求数据页面跳转方法  -- 不包括上一页、下一页等按钮
        $('.' + that.data.opts.dom.numBtnBox + ' button').each(function(i, item) {
            $(this).click(function() {
                //有值 且 不是上一次的页码时 才调用 搜索方法
                if (item.getAttribute('data-page') && item.getAttribute('data-page') != that.data.opts.page.currentPage) {
                    that.searchPage(item.getAttribute('data-page'));
                }
            });
        });
    },
    searchPage33: function(pageNum) {
        console.log(pageNum);
        var that = this;
        //obj为ajax请求数据
        // var obj = { other: {}, value: ["www","www","www","www","asdas","asdas","asdas","asdas","asdas",11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0] };
        var obj = { other: {}, value: ["www","www","www","www","asdas","asdas","asdas","asdas","asdas",11, 22, 33, 44] };
        //将展示的数据赋值给that.data.opts.page.datas (array)
        that.data.opts.page.datas = obj.value;
        //设置ajax请求数据分成的最大页码 -- 能否取整
        that.data.opts.page.maxCount = that.data.opts.page.datas.length % that.data.opts.page.pageCount ? parseInt(that.data.opts.page.datas.length / that.data.opts.page.pageCount) + 1 :
            that.data.opts.page.datas.length / that.data.opts.page.pageCount;
        // 设置当前页码
        if (!isNaN(pageNum)) { //数字按钮
            that.data.opts.page.currentPage = parseInt(pageNum);
        } else {
            switch (pageNum) {
                case 'first':
                    that.data.opts.page.currentPage = 0;
                    break;
                case 'prev':;
                    if (that.data.opts.page.currentPage > 0) {
                        --that.data.opts.page.currentPage;
                    }
                    break;
                case 'next':
                    if (that.data.opts.page.currentPage + 1 < that.data.opts.page.maxCount) {
                        ++that.data.opts.page.currentPage;
                    }
                    break;
                case 'last':
                    that.data.opts.page.currentPage = that.data.opts.page.maxCount - 1;
                    break;
            }
        }
        //创建数字按钮
        that.createNumBtn(that.data.opts.page.currentPage);
        //赋值给页码跳转输入框的value，表示当前页码
        $('.' + that.data.opts.dom.btnBox + ' .' + that.data.opts.page.inputSearch).val(that.data.opts.page.currentPage + 1);

        // 为每个 页码 按钮 绑定请求数据页面跳转方法  -- 不包括上一页、下一页等按钮
        $('.' + that.data.opts.dom.numBtnBox + ' button').each(function(i, item) {
            $(this).click(function() {
                //有值 且 不是上一次的页码时 才调用 搜索方法
                if (item.getAttribute('data-page') && item.getAttribute('data-page') != that.data.opts.page.currentPage) {
                    that.searchPage(item.getAttribute('data-page'));
                }
            });
        });

        // 内容区填充数据
        var arrDatas = [];
        var injectHTML = '';
        // slice() 方法不会改变原始数组。
        var _start = that.data.opts.page.pageCount * that.data.opts.page.currentPage;
        var _verify = that.data.opts.page.datas.length - that.data.opts.page.pageCount * (that.data.opts.page.currentPage + 1) > -1;
        var _end =  _verify ? that.data.opts.page.pageCount * (that.data.opts.page.currentPage + 1) : that.data.opts.page.datas.length;
        arrDatas = that.data.opts.page.datas.slice(_start, _end);
        for (i in arrDatas) {
            injectHTML += '<div data-index="'+i+'">' + arrDatas[i] + '</div>';
        }
        $('.' + that.data.opts.dom.mainBox).html(injectHTML);

    }

}