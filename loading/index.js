Vue.component('loading-demo', {
    template: '\
        <div class="loading-demo">\
            <div class="rect1"></div>\
            <div class="rect2"></div>\
            <div class="rect3"></div>\
            <div class="rect4"></div>\
            <div class="rect5"></div>\
        </div>\
    '
})

Vue.component('loading-demo2', {
    template: '\
        <div class="loading-demo2">\
            <div class="cube1">&nbsp;</div>\
            <div class="cube2">&nbsp;</div>\
        </div>\
    '
})

Vue.component('loading-demo3', {
    template: '\
        <div class="loading-demo3">\
            <div class="dot1">&nbsp;</div>\
            <div class="dot2">&nbsp;</div>\
        </div>\
    '
})

Vue.component('loading-demo4', {
    template: '\
        <div class="loading-demo4">\
            <div class="bounce1">&nbsp;</div>\
            <div class="bounce2">&nbsp;</div>\
            <div class="bounce3">&nbsp;</div>\
        </div>\
    '
})

Vue.component('loading-demo5', {
    template: '\
        <div class="loading-demo5">\
            <div class="loading-demo-container container1">\
                <div class="circle1">&nbsp;</div>\
                <div class="circle2">&nbsp;</div>\
                <div class="circle3">&nbsp;</div>\
                <div class="circle4">&nbsp;</div>\
            </div>\
            <div class="loading-demo-container container2">\
                <div class="circle1">&nbsp;</div>\
                <div class="circle2">&nbsp;</div>\
                <div class="circle3">&nbsp;</div>\
                <div class="circle4">&nbsp;</div>\
            </div>\
            <div class="loading-demo-container container3">\
                <div class="circle1">&nbsp;</div>\
                <div class="circle2">&nbsp;</div>\
                <div class="circle3">&nbsp;</div>\
                <div class="circle4">&nbsp;</div>\
            </div>\
        </div>\
    '
})

$(document).ready(function () {
    new Vue({
        el: '#loading-demo',
        data: {
            loadingShow1: true,
            loadingShow2: true,
            loadingShow3: true
        }
    });

});



var requestUrl = "/admin/static/datas/crmDemo.json"
$.get(requestUrl, function(result) {
    console.log(result);
});