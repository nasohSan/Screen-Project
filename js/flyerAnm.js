function ws_brick(t, e, a) {
    function r(a) {
        for (var r = {}, o = e.get(a), i = t.width / f, n = t.height / h, d = 0; f * h > d; d++) {
            var a = d % f,
                l = Math.floor(d / f);
            r[d] = s(o, {
                x: a * i,
                y: l * n,
                w: i,
                h: n
            })
        }
        return r
    }

    function o(t, e, a, r, o) {
        for (var i in e) e[i].topEdge.css({
            width: r,
            height: t,
            background: a[i],
            transform: "rotateX(90deg) translate3d(0,-" + t / 2 + "px," + t / 2 + "px)"
        }), e[i].bottomEdge.css({
            width: r,
            height: t,
            background: a[i],
            transform: "rotateX(90deg) translate3d(0,-" + t / 2 + "px," + (-o + t / 2) + "px)"
        }), e[i].leftEdge.css({
            width: t,
            height: o,
            background: a[i],
            transform: "rotateY(90deg) translate3d(" + t / 2 + "px,0,-" + t / 2 + "px)"
        }), e[i].rightEdge.css({
            width: t,
            height: o,
            background: a[i],
            transform: "rotateY(90deg) translate3d(" + t / 2 + "px,0," + (r - t / 2) + "px)"
        })
    }

    function i(t, e) {
        var a, r, o, i, n, s = (new Date).getTime(),
            l = function() {
                var f = (new Date).getTime();
                for (var h in t)
                    if (!(s + t[h].animate.delay > f)) {
                        var c = (f - (s + t[h].animate.delay)) / t[h].animate.duration;
                        if (n = {}, i = "", c > 1) {
                            if (t[h].part[0].ws_delay[1]) return cancelAnimationFrame(l), void e()
                        } else {.5 >= c ? (a = d.easing.easeInBack(1, 2 * c, 0, 1, 1, 1).toFixed(3), r = d.easing.easeInBackQ(1, 2 * c, 0, 1, 1, 1).toFixed(3), o = d.easing.easeInBackQ2(1, 2 * c, 0, 1, 1, 1).toFixed(3), t[h].back.css("backfaceVisibility", "hidden")) : (a = d.easing.easeOutBack(1, 2 * (c - .5), 0, 1, 1, 1).toFixed(3), r = d.easing.easeOutBackQ(1, 2 * (c - .5), 0, 1, 1, 1).toFixed(3), o = d.easing.easeOutBackQ2(1, 2 * (c - .5), 0, 1, 1, 1).toFixed(3), t[h].back.css("backfaceVisibility", "visible"));
                            for (var p in t[h].animate[.5 >= c ? "half" : "end"]) {
                                var g = t[h].animate[.5 >= c ? "begin" : "half"][p] || 0,
                                    u = t[h].animate[.5 >= c ? "half" : "end"][p] || 0;
                                "object" != typeof u && (u = "scale" === p || "rotateX" === p || "rotateY" === p ? g + (u - g) * r : "left" === p || "top" === p ? g + (u - g) * o : g + (u - g) * a), "rotateX" === p || "rotateY" === p || "rotateZ" === p ? i += p + "(" + u + "deg) " : "scale" === p ? i += p + "(" + u + ") " : "translate3d" === p ? i += p + "(" + (g[0] + (u[0] - g[0]) * a).toFixed(3) + "px," + (g[1] + (u[1] - g[1]) * a).toFixed(3) + "px," + (g[2] + (u[2] - g[2]) * a).toFixed(3) + "px) " : n[p] = u
                            }
                            t[h].wrapper.css({
                                transform: "translate3d(" + (n.left ? n.left : 0).toFixed(3) + "px," + (n.top ? n.top : 0).toFixed(3) + "px,0)"
                            }), delete n.left, delete n.top, i && (n.transform = i), t[h].part.css(n)
                        }
                    }
                requestAnimationFrame(l)
            };
        l()
    }

    function n(e, r, n, s) {
        var d = a.width(),
            l = a.height(),
            c = d / f,
            p = l / h,
            g = .4 * t.duration > 1e3 ? 1e3 : .4 * t.duration,
            u = .6 * t.duration,
            m = [0, 0];
        o(v, e, w[r], c, p), x.css({
            transformOrigin: d / 2 + "px " + l / 2 + "px 0",
            width: d,
            height: l
        });
        for (var b in e) {
            var k = T[b].delay * g;
            m[1] <= k && (m[0] = b, m[1] = k), e[b].part[0].ws_delay = [k, 0]
        }
        e[m[0]].part[0].ws_delay[1] = 1;
        for (var b in e) {
            {
                var Y = e[b];
                Math.floor(b / f)
            }
            Y.animate = {
                delay: Y.part[0].ws_delay[0],
                duration: u,
                begin: {
                    left: 0,
                    top: 0,
                    width: c,
                    height: p,
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    translate3d: [0, 0, y ? v : 0]
                },
                half: {
                    left: T[b].halfLeft * c,
                    top: T[b].halfTop * p,
                    scale: T[b].halfScale,
                    rotateX: T[b].rotateX / 2,
                    rotateY: T[b].rotateY / 2,
                    translate3d: [0, 0, (y ? 1 : .5) * v]
                },
                end: {
                    left: 0,
                    top: 0,
                    scale: 1,
                    rotateX: T[b].rotateX,
                    rotateY: T[b].rotateY,
                    translate3d: [0, 0, v]
                }
            }, Y.front.find("img").css(n), Y.back.css("backfaceVisibility", "hidden").find("img").css(n), Y.part.css({
                width: Y.animate.begin.width,
                height: Y.animate.begin.height,
                left: Y.animate.begin.left,
                top: Y.animate.begin.top
            })
        }
        i(e, s)
    }

    function s(t, e) {
        e = e || {}; {
            var a, r = 1,
                o = e.exclude || [],
                i = document.createElement("canvas"),
                n = i.getContext("2d");
            i.width = t.naturalWidth, i.height = t.naturalHeight
        }
        n.drawImage(t, 0, 0, t.naturalWidth, t.naturalHeight);
        try {
            a = n.getImageData(e.x ? e.x : 0, e.y ? e.y : 0, e.w ? e.w : t.width, e.h ? e.h : t.height).data
        } catch (s) {
            return console.log("error:unable to access image data: " + s), "#ccc"
        }
        for (var d = (e.w ? e.w : t.width * e.h ? e.h : t.height) || a.length, l = {}, f = "", h = [], c = {
                dominant: {
                    name: "",
                    count: 0
                }
            }, p = 0; d > p;) {
            if (h[0] = a[p], h[1] = a[p + 1], h[2] = a[p + 2], f = h.join(","), l[f] = f in l ? l[f] + 1 : 1, -1 === o.indexOf(["rgb(", f, ")"].join(""))) {
                var g = l[f];
                g > c.dominant.count && (c.dominant.name = f, c.dominant.count = g)
            }
            p += 4 * r
        }
        return ["rgb(", c.dominant.name, ")"].join("")
    }
    var d = jQuery,
        l = d(this),
        f = t.cols || 4,
        h = t.rows || 3,
        c = 2.5,
        p = 2,
        g = t.perspective || 2e3,
        u = a.find(".ws_list"),
        m = [],
        v = 30,
        w = {},
        x = d("<div>").addClass("ws_effect ws_brick").appendTo(a),
        b = t.support.transform && t.support.transition && t.support.perspective,
        y = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
        k = /Firefox/.test(navigator.userAgent),
        T = [{
            zIndex: 0,
            rotateX: 360,
            rotateZ: -360,
            rotateY: 180,
            halfScale: .5,
            halfLeft: .7,
            halfTop: .7,
            delay: .36
        }, {
            zIndex: 1,
            rotateX: -360,
            rotateZ: 360,
            rotateY: 180,
            halfScale: .5,
            halfLeft: .2,
            halfTop: .4,
            delay: .81
        }, {
            zIndex: 1,
            rotateX: 360,
            rotateZ: -360,
            rotateY: -180,
            halfScale: .5,
            halfLeft: -.2,
            halfTop: .4,
            delay: .45
        }, {
            zIndex: 0,
            rotateX: -360,
            rotateZ: 360,
            rotateY: -180,
            halfScale: .5,
            halfLeft: -.7,
            halfTop: .7,
            delay: .63
        }, {
            zIndex: 1,
            rotateX: -360,
            rotateZ: 360,
            rotateY: -180,
            halfScale: .5,
            halfLeft: .7,
            halfTop: 0,
            delay: .54
        }, {
            zIndex: 2,
            rotateX: 360,
            rotateZ: -360,
            rotateY: 180,
            halfScale: .5,
            halfLeft: .2,
            halfTop: 0,
            delay: .38
        }, {
            zIndex: 2,
            rotateX: 360,
            rotateZ: -360,
            rotateY: -180,
            halfScale: .5,
            halfLeft: -.2,
            halfTop: 0,
            delay: 0
        }, {
            zIndex: 1,
            rotateX: -360,
            rotateZ: 360,
            rotateY: 180,
            halfScale: .5,
            halfLeft: -.7,
            halfTop: 0,
            delay: .72
        }, {
            zIndex: 0,
            rotateX: -360,
            rotateZ: 360,
            rotateY: 180,
            halfScale: .5,
            halfLeft: .7,
            halfTop: -.7,
            delay: 1
        }, {
            zIndex: 1,
            rotateX: -360,
            rotateZ: 360,
            rotateY: -180,
            halfScale: .5,
            halfLeft: .2,
            halfTop: -.4,
            delay: .7
        }, {
            zIndex: 1,
            rotateX: 360,
            rotateZ: -360,
            rotateY: 180,
            halfScale: .5,
            halfLeft: -.2,
            halfTop: -.4,
            delay: .57
        }, {
            zIndex: 0,
            rotateX: 360,
            rotateZ: -360,
            rotateY: -180,
            halfScale: .5,
            halfLeft: -.7,
            halfTop: -.7,
            delay: .9
        }];
    x.css({
        position: "absolute",
        top: 0,
        left: 0,
        width: a.width(),
        height: a.height(),
        transform: "translate3d(0,0,0)",
        transformOrigin: t.width / 2 + "px " + t.height / 2 + "px 0",
        perspective: g
    }).hide();
    for (var Y = 0; f * h > Y; Y++) {
        var X = Y % f,
            I = Math.floor(Y / f),
            _ = d("<div>").css({
                position: "absolute",
                left: 100 * X / f + "%",
                top: 100 * I / h + "%",
                outline: "1px solid transparent",
                transformStyle: y || k ? "flat" : "preserve-3d",
                zIndex: T[Y].zIndex,
                overflow: b ? "visible" : "hidden"
            }).appendTo(x),
            F = d("<div>").css({
                transform: "scale(1) rotateX(0) rotateY(0) translate3d(0,0,0)",
                outline: "1px solid transparent",
                transformStyle: "preserve-3d"
            }).appendTo(_),
            S = d("<div>").addClass("ws_front_image").appendTo(F),
            L = b ? d("<div>").addClass("ws_back_image").appendTo(F) : 0;
        S.css({
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)"
        }).append(d("<img>").css({
            left: 100 * -X + "%",
            top: 100 * -I + "%",
            position: "absolute",
            outline: "1px solid transparent"
        })), b && L.css({
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg) translate3d(0,0," + v + "px)"
        }).append(d("<img>").css({
            left: 100 * -X + "%",
            top: 100 * -I + "%",
            position: "absolute",
            outline: "1px solid transparent"
        }));
        var z = {
            position: "absolute",
            outline: "1px solid transparent"
        };
        m[Y] = {
            part: F,
            front: S,
            back: L,
            wrapper: _,
            leftEdge: b ? d("<div>").addClass("ws_left_edge").css(z).appendTo(F) : 0,
            rightEdge: b ? d("<div>").addClass("ws_right_edge").css(z).appendTo(F) : 0,
            topEdge: b ? d("<div>").addClass("ws_top_edge").css(z).appendTo(F) : 0,
            bottomEdge: b ? d("<div>").addClass("ws_bottom_edge").css(z).appendTo(F) : 0
        }
    }
    var Z;
    this.go = function(o, i) {
        function s(t, e) {
            return Math.random() * (e - t + 1) + t
        }
        if (Z) return i;
        x.show();
        var g = d(e.get(i));
        if (g = {
                width: g.width(),
                height: g.height(),
                marginTop: parseFloat(g.css("marginTop")),
                marginLeft: parseFloat(g.css("marginLeft"))
            }, b) {
            m[0].front.find("img").on("load", function() {
                u.hide()
            });
            for (var v in m) m[v].front.find("img").attr("src", e.get(i).src), m[v].back.find("img").attr("src", e.get(o).src);
            w[i] || (w[i] = r(i)), Z = new n(m, i, g, function() {
                u.show(), l.trigger("effectEnd"), x.hide();
                for (var t in m) m[t].part.css({
                    transition: "",
                    transform: "rotateX(0) rotateY(0) translate3d(0,0,0)"
                });
                Z = 0
            })
        } else {
            Z = !0;
            var y = a.width(),
                k = a.height(),
                T = y / f,
                Y = k / h;
            x.css({
                width: y,
                height: k
            });
            var X = 0;
            for (var v in m) {
                var I = v % f,
                    _ = Math.floor(v / f);
                m[v].front.find("img").attr("src", e.get(o).src).css(g);
                var F = t.duration * (1 - Math.abs((p * c - I * _) / (2 * h * f))),
                    S = s(-1, 1) > 0 ? 1 : -1,
                    L = s(-1, 1) > 0 ? 1 : -1;
                m[v].wrapper.css({
                    width: T,
                    height: Y
                }), m[v].part.css({
                    position: "absolute",
                    top: S * Y,
                    left: L * T,
                    opacity: 0,
                    width: T,
                    height: Y
                }).animate({
                    top: 0,
                    left: 0,
                    opacity: 1
                }, F, function() {
                    X++, X == h * f && (u.stop(1, 1), Z = !1, l.trigger("effectEnd"))
                })
            }
        }
    }
}
jQuery.extend(jQuery.easing, {
    easeInBack: function(t, e, a, r, o, i) {
        return void 0 == i && (i = 1.70158), r * (e /= o) * e * ((i + 1) * e - i) + a
    },
    easeOutBack: function(t, e, a, r, o, i) {
        return void 0 == i && (i = 1.70158), r * ((e = e / o - 1) * e * ((i + 1) * e + i) + 1) + a
    },
    easeInBackQ: function(t, e, a, r, o) {
        var i = (e /= o) * e;
        return a + r * i * (4 * e * i - 8 * i + 8 * e - 3)
    },
    easeOutBackQ: function(t, e, a, r, o) {
        var i = (e /= o) * e;
        return a + r * (4 * i * e * i - 12 * i * i + 16 * i * e - 13 * i + 6 * e)
    },
    easeInBackQ2: function(t, e, a, r, o) {
        var i = (e /= o) * e;
        return a + r * i * (1.5 * e * i - 2.5 * i + 5 * e - 3)
    },
    easeOutBackQ2: function(t, e, a, r, o) {
        var i = (e /= o) * e;
        return a + r * (1.5 * i * e * i - 5 * i * i + 10 * i * e - 12 * i + 6.5 * e)
    }
});