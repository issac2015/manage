$("#test_postMessage").click(function() {
    var iframeWin = document.getElementsByTagName('iframe')[0].contentWindow;
    iframeWin.postMessage('hello world!', "*");
});