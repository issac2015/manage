var iframe1_obj = {
    sfs: "asdjasd",
    tt: [ 
        {
            sad: "11",
            ttsd: "sadjhsd"
        },
        {
            sad: "22",
            ttsd: "sadjhsd22"
        },
        {
            sad: "33",
            ttsd: "sadjhsd33"
        },
        {
            sad: "44",
            ttsd: "sadjhsd44"
        },
        {
            sad: "55",
            ttsd: "sadjhsd55"
        }
    ],
    hasd: "true"
}

function iframe1_fun() {
   console.log(">>> iframe1_fun");
}


$(document).ready(function() {
    fsIframe2Win = window["fs_iframe2"];
    console.log(fsIframe2Win);
    console.log(fsIframe2Win.document);
    var iframe2_h1 = $(fsIframe2Win.document).find("#iframe2_h1");
    console.log(iframe2_h1);
    $(iframe2_h1).css("color", "red");

});
