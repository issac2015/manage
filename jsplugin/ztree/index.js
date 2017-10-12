var zTreeObj; // 如此做是为了把它设为 全局变量
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
// var setting = {
//     check: {
//         enable: true
//     }
// };
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
// var zNodes = [];
// var zNodes = [
//     {
//         "name": "运动",
//         "open": true,
//         "iconOpen": "/admin/static/plugin/ztree/css/img/diy/1_open.png", 
//         "iconClose": "/admin/static/plugin/ztree/css/img/diy/1_close.png",
//         "children": [
//             {
//                 "name": "网球"
//             }, 
//             {
//                 "name": "足球"
//             }
//         ]
//     }, 
//     {
//         "name": "学习",
//         "open": false,
//         "children": [
//             {
//                 "name": "Python"
//             }, 
//             {
//                 "name": "Node.js"
//             },
//             {
//                 "name": "PHP"
//             }
//         ]
//     },
//     {
//         "name": "其它事情",
//         "open": true,
//         "children": [
//             {
//                 "name": "朋友"
//             }, 
//             {
//                 "name": "家人",
//                 "open": true,
//                 "children": [
//                     {
//                         "name": "弟弟"
//                     },
//                     {
//                         "name": "妹妹"
//                     },
//                     {
//                         "name": "父母"
//                     }
//                 ]
//             },
//             {
//                 "name": "同事"
//             }
//         ]
//     },
//     {
//         "name": "影视娱乐",
//         "open": true,
//         "children": [
//             {
//                 "name": "战狼2"
//             }, 
//             {
//                 "name": "权利游戏"
//             },
//             {
//                 "name": "我的前半生"
//             }
//         ]
//     }
// ]


var setting = {
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
var zNodes = [
    { id:1, pId:0, name:"pNode 1", open:false},
    { id:11, pId:1, name:"pNode 11"},
    { id:111, pId:11, name:"leaf node 111"},
    { id:112, pId:11, name:"leaf node 112"},
    { id:113, pId:11, name:"leaf node 113"},
    { id:114, pId:11, name:"leaf node 114"},
    { id:115, pId:11, name:"leaf node 115"},
    { id:12, pId:1, name:"pNode 12"},
    { id:121, pId:12, name:"leaf node 121"},
    { id:122, pId:12, name:"leaf node 122"},
    { id:123, pId:12, name:"leaf node 123"},
    { id:124, pId:12, name:"leaf node 124"},
    { id:13, pId:1, name:"pNode 13 - no child", isParent:true},
    { id:2, pId:0, name:"pNode 2"},
    { id:21, pId:2, name:"pNode 21", open:true},
    { id:211, pId:21, name:"leaf node 211"},
    { id:212, pId:21, name:"leaf node 212"},
    { id:213, pId:21, name:"leaf node 213"},
    { id:214, pId:21, name:"leaf node 214"},
    { id:22, pId:2, name:"pNode 22"},
    { id:221, pId:22, name:"leaf node 221"},
    { id:222, pId:22, name:"leaf node 222"},
    { id:223, pId:22, name:"leaf node 223"},
    { id:224, pId:22, name:"leaf node 224"},
    { id:23, pId:2, name:"pNode 23"},
    { id:231, pId:23, name:"leaf node 231"},
    { id:232, pId:23, name:"leaf node 232"},
    { id:233, pId:23, name:"leaf node 233"},
    { id:234, pId:23, name:"leaf node 234"},
    { id:3, pId:0, name:"pNode 3 - no child", isParent:true},
    { id:31, pId:3, name:"leaf node 321 - no child"}//isParent:true 在文件名前面加个文件夹图标
];

// 获得选中的 元素
// zTreeObj.getCheckedNodes()
$(document).ready(function() {
    // var requestUrl = "/admin/static/datas/ztree/zNodes.json"
    // $.get(requestUrl, function(result) {
    //     zNodes = result;
    //     console.log(zNodes);
    //     zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    // });
    zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});


// var setting2 = {
//     view: {
//         selectedMulti: true, //设置是否能够同时选中多个节点
//         showIcon: true, //设置是否显示节点图标
//         showLine: true, //设置是否显示节点与节点之间的连线
//         showTitle: true, //设置是否显示节点的title提示信息
//     },
//     data: {
//         simpleData: {
//             enable: false, //设置是否启用简单数据格式（zTree支持标准数据格式跟简单数据格式，上面例子中是标准数据格式）
//             idKey: "id", //设置启用简单数据格式时id对应的属性名称
//             pidKey: "pId" //设置启用简单数据格式时parentId对应的属性名称,ztree根据id及pid层级关系构建树结构
//         }
//     },
//     check: {
//         enable: true //设置是否显示checkbox复选框
//     },
//     callback: {
//         onClick: onClick, //定义节点单击事件回调函数
//         onRightClick: OnRightClick, //定义节点右键单击事件回调函数
//         beforeRename: beforeRename, //定义节点重新编辑成功前回调函数，一般用于节点编辑时判断输入的节点名称是否合法
//         onDblClick: onDblClick, //定义节点双击事件回调函数
//         onCheck: onCheck //定义节点复选框选中或取消选中事件的回调函数
//     },
//     async: {
//         enable: true, //设置启用异步加载
//         type: "get", //异步加载类型:post和get
//         contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
//         url: "/Design/Get", //定义数据请求路径
//         autoParam: ["id=id", "name=name"] //定义提交时参数的名称，=号前面标识节点属性，后面标识提交时json数据中参数的名称
//     }
// };
// zTree的每一个节点都是一个treeNode对象，treeNode对象经常用到的属性和方法如下： 


// treeNode= {
//     name, //节点显示的文本
//     checked, //节点是否勾选，ztree配置启用复选框时有效
//     open, //节点是否展开
//     icon, //节点的图标
//     iconOpen, //节点展开式的图标
//     iconClose, //节点折叠时的图标
//     id, //节点的标识属性，对应的是启用简单数据格式时idKey对应的属性名，并不一定是id,如果setting中定义的idKey:"zId",那么此处就是zId
//     pId, //节点parentId属性，命名规则同id
//     children, //得到该节点所有孩子节点，直接下级，若要得到所有下属层级节点，需要自己写递归得到
//     isParent, //判断该节点是否是父节点，一般应用中通常需要判断只有叶子节点才能进行相关操作，或者删除时判断下面是有子节点时经常用到。
//     getPath() //得到该节点的路径，即所有父节点，包括自己，此方法返回的是一个数组，通常用于创建类似面包屑导航的东西A-->B-->C 
// }
