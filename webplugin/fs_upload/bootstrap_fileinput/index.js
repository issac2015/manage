$(document).ready(function () {
    console.log(">>> 11");

    // $("#input-24").fileinput({
    //     initialPreview: [
    //         'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/631px-FullMoon2010.jpg',
    //         'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/600px-Earth_Eastern_Hemisphere.jpg'
    //     ],
    //     initialPreviewAsData: true,
    //     initialPreviewConfig: [
    //         {caption: "Moon.jpg", size: 930321, width: "120px", key: 1},
    //         {caption: "Earth.jpg", size: 1218822, width: "120px", key: 2}
    //     ],
    //     deleteUrl: "/site/file-delete", // 默认为 post
    //     uploadUrl: "/api/fileUpload", // 上传地址
    //     overwriteInitial: false,
    //     // maxFileSize: 100,
    //     initialCaption: "The Moon and the Earth"
    // });

    $("#input-44").fileinput({
        language: 'zh',
        uploadUrl: '/api/fileUpload'
        // maxFilePreviewSize: 10240
    });
});