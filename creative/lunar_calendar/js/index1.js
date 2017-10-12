_loader.use("jquery",
function() {
    function l() {
        t.slideDown(),
        r.slideDown(),
        i == "1" && $.ajax({
            url: v("https://open.onebox.haosou.com/dataApi"),
            dataType: "jsonp",
            data: {
                query: "日历",
                url: "日历",
                type: "rili",
                user_tpl: "ajax/rili/html",
                selectorPrefix: s,
                asynLoading: i,
                src: "onebox",
                tpl: "1"
            },
            timeout: 5e3,
            success: function(t) {
                t && t.html ? (e.find(".mh-rili-widget").html(t.html), n.hide().addClass("mh-err"), i = "0") : d()
            },
            error: function() {
                d()
            }
        })
    }
    function c(t, n) {
        t = t.replace("\u6e05\u660e", "\u6e05\u660e\u8282").replace("\u56fd\u9645\u52b3\u52a8\u8282", "\u52b3\u52a8\u8282");
        var r = new RegExp(u);
        f = f || e.find("#mh-date-y").html(),
        u && n == f && r.test(t) ? a = !0 : a = !1,
        o.val(t).trigger("change")
    }
    function h() {
        $.each(o.find("option"),
        function(e, t) {
            var n = $(this);
            n.data("desc") && n.val() && (u += n.val() + "|")
        }),
        u = u.substring(0, u.length - 2)
    }
    function p() {
        n.hide()
    }
    function d() {
        n.addClass("mh-err")
    }
    function v(e) {
        return location.protocol == "https:" ? "https://open.onebox.haosou.com/api/proxy?__url__=" + encodeURIComponent(e) : e
    }
    jQuery.curCSS = jQuery.css;
    var e = $("#mohe-rili"),
    t = $(".mh-rili-wap", e),
    n = $(".mh-tips", e),
    r = $(".mh-rili-foot", e),
    i = "0",
    s = "#mohe-rili .mh-rili-widget",
    o = e.find(".mh-holiday-data"),
    u = "",
    a = !1,
    f = e.find("#mh-date-y").html();
    h(),
    e.on("click", ".mh-op a",
    function(e) {
        e.preventDefault();
        var n = $(this).closest(".mh-op");
        n.hasClass("mh-op-less") ? (t.slideUp(), r.slideUp()) : l(),
        n.toggleClass("mh-op-less")
    }).on("click", ".mh-js-reload",
    function(e) {
        e.preventDefault(),
        l()
    }).on("change", ".mh-holiday-data",
    function() {
        var e = $(this),
        t = e.val(),
        n = e.find("option:selected"),
        i = n.attr("data-desc") || "",
        s = n.attr("data-gl") || "";
        if (!a || t == "0" || i === "" && s === "") r.html("");
        else {
            var o = '<div class="mh-rili-holiday">[holidayDetail][holidaySug]</div>';
            i && (i = "<p>" + i + "</p>"),
            s && (s = "<p><span>\u4f11\u5047\u653b\u7565\uff1a</span>" + s + "</p>"),
            o = o.replace("[holidayDetail]", i).replace("[holidaySug]", s),
            r.html(o)
        }
    }),
    window.OB = window.OB || {},
    window.OB.RiLi = window.OB.RiLi || {},
    window.OB.RiLi.rootSelector = "#mohe-rili ",
    window.OB.RiLi.CallBack = {
        afterInit: p,
        holiday: c
    }
})