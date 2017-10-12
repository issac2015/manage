$(document).ready(function() {
    var this_browser = common.browser();
    $("#this_browser_name").html(this_browser.name);
    $("#this_browser_version").html(this_browser.version);
    console.log(this_browser);

});