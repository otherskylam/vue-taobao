!function (e) {
    var t, n, o, i, d, c,
        l = '<svg><symbol id="icon-sousuo" viewBox="0 0 1028 1024"><path d="M479.101684 53.252878A425.848806 425.848806 0 1 1 53.252878 479.101684 426.371463 426.371463 0 0 1 479.101684 53.252878m0-53.252878A479.101684 479.101684 0 1 0 958.203369 479.101684 479.101684 479.101684 0 0 0 479.101684 0z"  ></path><path d="M777.355587 810.395103m18.810485-18.803921l0.041071-0.041056q18.810486-18.803921 37.614407 0.006564l187.053852 187.119157q18.803921 18.810486-0.006565 37.614407l-0.041071 0.041057q-18.810486 18.803921-37.614407-0.006565l-187.053852-187.119157q-18.803921-18.810486 0.006565-37.614407Z"  ></path></symbol></svg>',
        s = (s = document.getElementsByTagName("script"))[s.length - 1].getAttribute("data-injectcss");
    if (s && !e.__iconfont__svg__cssinject__) {
        e.__iconfont__svg__cssinject__ = !0;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch (e) {
            console && console.log(e)
        }
    }

    function a() {
        d || (d = !0, o())
    }

    t = function () {
        var e, t, n, o;
        (o = document.createElement("div")).innerHTML = l, l = null, (n = o.getElementsByTagName("svg")[0]) && (n.setAttribute("aria-hidden", "true"), n.style.position = "absolute", n.style.width = 0, n.style.height = 0, n.style.overflow = "hidden", e = n, (t = document.body).firstChild ? (o = e, (n = t.firstChild).parentNode.insertBefore(o, n)) : t.appendChild(e))
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function () {
        document.removeEventListener("DOMContentLoaded", n, !1), t()
    }, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (o = t, i = e.document, d = !1, (c = function () {
        try {
            i.documentElement.doScroll("left")
        } catch (e) {
            return void setTimeout(c, 50)
        }
        a()
    })(), i.onreadystatechange = function () {
        "complete" == i.readyState && (i.onreadystatechange = null, a())
    })
}(window);