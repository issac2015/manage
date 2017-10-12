// E: 盘
var zTreeObj;
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
var zNodes = [];

// F: 盘
var zTreeObjF;
var settingF = {
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
var zNodesF = [];

$(document).ready(function() {
    // E: 盘
    var requestUrl = "/admin/memo/software/datas/softwareE.json"
    $.get(requestUrl, function(result) {
        zNodes = result;
        console.log(zNodes);
        zTreeObj = $.fn.zTree.init($("#treeSoftwareE"), setting, zNodes);
    });
    // F: 盘
    var requestUrlF = "/admin/memo/software/datas/softwareF.json"
    $.get(requestUrlF, function(result) {
        zNodesF = result;
        console.log(zNodesF);
        zTreeObjF = $.fn.zTree.init($("#treeSoftwareF"), settingF, zNodesF);
    });
});
