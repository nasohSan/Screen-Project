function ws_caption_fade(t, e, n, i) { e.stop(1, 1).fadeOut(t.captionDuration / 3, function () { e.html(i), e.fadeIn(t.captionDuration, function () { this.filters && this.style.removeAttribute("filter") }) }) }
function ws_caption_move(t, e, n, i) { var o = [{ left1: "100%", top2: "100%" }, { left1: "80%", left2: "-50%" }, { top1: "-100%", top2: "100%", distance: .7, easing: "easeOutBack" }, { top1: "-80%", top2: "-80%", distance: .3, easing: "easeOutBack" }, { top1: "-80%", left2: "80%" }, { left1: "80%", left2: "80%" }]; o = o[Math.floor(Math.random() * o.length)]; var a = .5, s = "easeOutElastic1"; e.stop(1, 1).fadeOut(t.captionDuration / 3, function () { function n(e) { var n = $(r[e]).css("opacity"); $(r[e]).css({ visibility: "visible" }).css({ opacity: 0 }).animate({ opacity: n }, t.captionDuration, "easeOutCirc").animate({ top: 0, left: 0 }, { duration: t.captionDuration, easing: o.easing || s, queue: !1 }) } e.html(i); var r = e.find(">span,>div").get(); $(r).css({ position: "relative", visibility: "hidden" }), e.show(); for (var l in o) if (/\%/.test(o[l])) { o[l] = parseInt(o[l]) / 100; var u = e.offset()[/left/.test(l) ? "left" : "top"], c = /left/.test(l) ? "width" : "height"; o[l] *= o[l] < 0 ? u : t.$this[c]() - e[c]() - u } $(r[0]).css({ left: (o.left1 || 0) + "px", top: (o.top1 || 0) + "px" }), $(r[1]).css({ left: (o.left2 || 0) + "px", top: (o.top2 || 0) + "px" }), n(0), setTimeout(function () { n(1) }, t.captionDuration * (o.distance || a)) }) }
function ws_caption_parallax(n, t, i, a, s, e) { function o(n, t, i) { var a = 1 * new Date, s = function () { var e = (1 * new Date - a) / t; e >= 1 ? (n(1), cancelAnimationFrame(s), i && i()) : (n(e), requestAnimationFrame(s)) }; s() } t.parent().css({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }), t.html(a).css("width", "100%").stop(1, 1), i.html(s).css("width", "100%").stop(1, 1), function (t, i, a, s, e, r) { function c(t, i) { return t.css(n.support.transform ? { transform: "translate3d(" + i + "px,0px,0px)" } : { marginLeft: i }).css("display", "inline-block") } var u = 15, p = n.$this.width(); if (u *= p / 100, n.prevIdx == n.curIdx) c(t, 0).fadeIn(e / 3), c($(">div,>span", t), 0); else { var d = $(">div", t), f = $(">div", i), l = $(">span", t), h = $(">span", i), v = u + p * (r ? -1 : 1), w = u + p * (r ? 1 : -1), m = (r ? -1 : 1) * u; c(t, v).show(), c(i, 0).show(), c(d, m), c(f, 0), c(l, 2 * m), c(h, 0), o(function (n) { n = $.easing.swing(n), c(t, (1 - n) * v), c(i, n * w) }, n.duration); var g = .8; o(function (n) { n *= g, c(l, 2 * (1 - n) * m), c(d, (1 - n) * m), c(h, -2 * n * m), c(f, n * -m) }, n.duration, function () { o(function (n) { n = $.easing.easeOutCubic(1, n, 0, 1, 1, 1); var t = 2 * (1 - g) * m, i = (1 - g) * m, a = -2 * g * m, s = g * -m; c(l, (1 - n) * t), c(d, (1 - n) * i), c(h, (1 - n) * a + -2 * n * m), c(f, (1 - n) * s + n * -m) }, /Firefox/g.test(navigator.userAgent) ? 1500 : n.delay) }) } }(t, i, a, s, n.captionDuration, e) }
function ws_caption_slide(t, e, n, i) { function o(t, e) { var n, i = document.defaultView; if (i && i.getComputedStyle) { var o = i.getComputedStyle(t, ""); o && (n = o.getPropertyValue(e)) } else { var a = e.replace(/\-\w/g, function (t) { return t.charAt(1).toUpperCase() }); n = t.currentStyle ? t.currentStyle[a] : t.style[a] } return n } function a(t, e, n) { for (var i = "padding-left|padding-right|border-left-width|border-right-width".split("|"), a = 0, s = 0; s < i.length; s++)a += parseFloat(o(t, i[s])) || 0; var r = parseFloat(o(t, "width")) || (t.offsetWidth || 0) - a; return e && (r += a), n && (r += (parseFloat(o(t, "margin-left")) || 0) + (parseFloat(o(t, "margin-right")) || 0)), r } function s(t, e, n) { for (var i = "padding-top|padding-bottom|border-top-width|border-bottom-width".split("|"), a = 0, s = 0; s < i.length; s++)a += parseFloat(o(t, i[s])) || 0; var r = parseFloat(o(t, "height")) || (t.offsetHeight || 0) - a; return e && (r += a), n && (r += (parseFloat(o(t, "margin-top")) || 0) + (parseFloat(o(t, "margin-bottom")) || 0)), r } function r(t, e) { var n = { position: 0, top: 0, left: 0, bottom: 0, right: 0 }; for (var i in n) n[i] = t.get(0).style[i]; t.show(); var r = { width: a(t.get(0), 1, 1), height: s(t.get(0), 1, 1), "float": t.css("float"), overflow: "hidden", opacity: 0 }; for (var i in n) r[i] = n[i] || o(t.get(0), i); var l = $("<div></div>").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }); t.wrap(l), l = t.parent(), "static" == t.css("position") ? (l.css({ position: "relative" }), t.css({ position: "relative" })) : ($.extend(r, { position: t.css("position"), zIndex: t.css("z-index") }), t.css({ position: "absolute", top: 0, left: 0, right: "auto", bottom: "auto" })), l.css(r).show(); var u = e.direction || "left", c = "up" == u || "down" == u ? "top" : "left", f = "up" == u || "left" == u, d = e.distance || ("top" == c ? t.outerHeight(!0) : t.outerWidth(!0)); t.css(c, f ? isNaN(d) ? "-" + d : -d : d); var p = {}; p[c] = (f ? "+=" : "-=") + d, l.animate({ opacity: 1 }, { duration: e.duration, easing: e.easing }), t.animate(p, { queue: !1, duration: e.duration, easing: e.easing, complete: function () { t.css(n), t.parent().replaceWith(t), e.complete && e.complete() } }) } e.stop(1, 1).fadeOut(t.captionDuration / 3, function () { e.html(i), r(e, { direction: "left", easing: "easeInOutExpo", complete: function () { e.get(0).filters && e.get(0).style.removeAttribute("filter") }, duration: t.captionDuration }) }) }
function ws_caption_traces(t, e, i, o) { function n(t) { var e, i = parseInt, t = t.replace(/\s\s*/g, ""); if (e = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(t)) e = [i(e[1], 16), i(e[2], 16), i(e[3], 16)]; else if (e = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(t)) e = [17 * i(e[1], 16), 17 * i(e[2], 16), 17 * i(e[3], 16)]; else if (e = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(t)) e = [+e[1], +e[2], +e[3], +e[4]]; else { if (!(e = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(t))) throw Error(t + " is not supported by $.parseColor"); e = [+e[1], +e[2], +e[3]] } return isNaN(e[3]) && (e[3] = 1), e.slice(0, 3 + !!l) } function r(t, e, i) { t = n(t), e = n(e); for (var o = [t], r = 0; i > r; r++) { var a = [Math.round(t[0] - (r + 1) * (t[0] - e[0]) / (i + 1)), Math.round(t[1] - (r + 1) * (t[1] - e[1]) / (i + 1)), Math.round(t[2] - (r + 1) * (t[2] - e[2]) / (i + 1))]; 4 == t.length && a.push(t[3] - (r + 1) * (t[3] - e[3]) / (i + 1)), o.push(a) } o.push(e); for (var r in o) o[r] = (4 == t.length ? "rgba(" : "rgb(") + o[r].join(",") + ")"; return o } function a(t, e) { if (!t || !t.length) return t; var i = 3, o = r(t.css("background-color"), t.css("color"), i) || f, n = { position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }, a = {}; e.top ? (n.top = -e.top * t.innerHeight(), a.height = 100 / o.length + "%") : e.left && (n.position = "absolute", a.height = "100%", a.width = 100 / o.length + "%", e.left < 0 ? (n.left = -e.left * t.innerWidth(), a["float"] = "left") : (n.right = e.left * t.innerWidth(), a["float"] = "right")); var s = $('<i class="ws-colored-traces">').css(n); for (var d in o) $("<i>").css({ display: "block", background: o[d] }).css(a).appendTo(s); return t.append(s) } function s(t) { return $(".ws-colored-traces", t).remove(), t } function d(e, i) { var o = { visibility: "visible" }, n = {}, r = {}; i.top ? (o.top = i.top * t.$this.height(), o.height = Math.abs(i.top) * t.$this.height(), n.top = 0, r.height = e.height()) : i.left && (o.left = i.left * t.$this.width() * 2, r.left = 0, i.left < 0 ? (n.left = o.left / 2, o.width = t.$this.width(), r.width = e.width() + 2) : (o.width = e.width() + 2, n.left = 0, o.paddingLeft = t.$this.width(), r.paddingLeft = e.css("paddingLeft"))), a(e, i).css(o).animate(n, { duration: .8 * t.captionDuration, easing: "easeInQuad" }).animate(r, .8 * t.captionDuration, "easeOutQuad", function () { s($(this)).css({ height: "", width: "", overflow: "", top: "", left: "", paddingLeft: "" }) }) } var f = ["#fff", "#ccc", "#555", "#000"], h = [[{ top: -1 }, { left: 1 }], [{ top: -1 }, { left: -1 }], [{ left: -1 }, { left: 1 }], [{ left: 1 }, { left: -1 }]][Math.floor(4 * Math.random())], l = function () { var t = $("<div>").css("backgroundColor", "rgba(100,255,20,.5)"); return /rgba/g.test(t.css("backgroundColor")) }(); e.parent().css({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }), e.stop(1, 1).fadeOut(t.captionDuration / 3, function () { e.html(o); var i = e.find(">span,>div").get(); $(i).css({ position: "relative", visibility: "hidden", verticalAlign: "top", overflow: "hidden" }), e.show(), d($(i[0]), h[0]), setTimeout(function () { d($(i[1]), h[1]) }, .3 * t.captionDuration) }) } jQuery.extend(jQuery.easing, { easeInQuad: function (t, e, i, o, n) { return o * (e /= n) * e + i }, easeOutQuad: function (t, e, i, o, n) { return -o * (e /= n) * (e - 2) + i } });

jQuery.fn.nasSlider = function (t) { function e(t) { return q.css({ left: -t + "00%" }) } function n(t) { return ((t || 0) + L) % L } function i(e) { if (window["ws_" + e]) { var n = new window["ws_" + e](t, H, O); n.name = "ws_" + e, X.push(n) } } function o(t, e) { J ? J.pause(t.curIndex, e) : e() } function s(t, e) { J ? J.play(t, 0, e) : e() } function a(t, e, i) { Z || (isNaN(t) && (t = Q(G, L)), t = n(t), G != t && (z ? z.load(t, function () { l(t, e, i) }) : l(t, e, i))) } function r(t) { for (var e = "", n = 0; n < t.length; n++)e += String.fromCharCode(t.charCodeAt(n) ^ 1 + (t.length - n) % 7); return e } function l(n, i, o) { if (!Z) { if (i) void 0 != o && (K = o ^ t.revers), e(n); else { if (Z) return; te = !1, function (e, n, i) { ee = Math.floor(Math.random() * X.length), k(X[ee]).trigger("effectStart", { curIndex: e, nextIndex: n, cont: k("." + X[ee].name, P), start: function () { K = void 0 != i ? i ^ t.revers : !!(n > e) ^ t.revers ? 1 : 0, X[ee].go(n, e, K) } }) }(G, n, o), P.trigger(k.Event("go", { index: n })) } G = n, G != t.stopOn || --t.loop || (t.autoPlay = 0), t.onStep && t.onStep(n) } } function c() { P.find(".ws_effect").fadeOut(200), e(G).fadeIn(200).find("img").css({ visibility: "visible" }) } function u(t, e, n, i, o, s) { new d(t, e, n, i, o, s) } function d(e, n, i, o, s, a) { var r, l, c, u, d = 0, f = 0, p = 0; e[0] || (e = k(e)), e.on((n ? "mousedown " : "") + "touchstart", function (e) { var n = e.originalEvent.touches ? e.originalEvent.touches[0] : e; 2 == t.gestures && P.addClass("ws_grabbing"), d = 0, n ? (r = n.pageX, l = n.pageY, f = p = 1, o && (f = p = o(e))) : f = p = 0, e.originalEvent.touches || (e.preventDefault(), e.stopPropagation()) }), k(document).on((n ? "mousemove " : "") + "touchmove", e, function (t) { if (f) { var e = t.originalEvent.touches ? t.originalEvent.touches[0] : t; d = 1, c = e.pageX - r, u = e.pageY - l, i && i(t, c, u) } }), k(document).on((n ? "mouseup " : "") + "touchend", e, function (e) { 2 == t.gestures && P.removeClass("ws_grabbing"), f && (d && s && s(e, c, u), !d && a && a(e), d && (e.preventDefault(), e.stopPropagation()), d = 0, f = 0) }), e.on("click", function (t) { p && (t.preventDefault(), t.stopPropagation()), p = 0 }) } function f(t, e, n) { var i = (new Date).getTime(), o = function () { var s = (new Date).getTime(), a = e ? (s - i) / e : 1; 1 > a ? (t(a), requestAnimationFrame(o)) : (cancelAnimationFrame(o), t(1), n && n()) }; o() } function p(e, n) { if (de.length && _(e), fe.length && x(e), t.caption && M(e, n), B) { var i = k("A", N.get(e)).get(0); i ? (B.setAttribute("href", i.href), B.setAttribute("target", i.target), B.style.display = "block") : B.style.display = "none" } t.responsive && F() } function h() { pe && (pe = 0, setTimeout(function () { P.trigger(k.Event("stop", {})) }, t.duration)) } function m() { !pe && t.autoPlay && (pe = 1, P.trigger(k.Event("start", {}))) } function v() { g(), h() } function w() { g(), t.autoPlay ? (ue = setTimeout(function () { he || a(void 0, void 0, 1) }, t.delay), m()) : h() } function g() { ue && clearTimeout(ue), ue = null } function b(t, e, n) { g(), t && t.preventDefault(), a(e, void 0, n), w(), Ee && Ce && Ce.play() } function y() { function e(t) { 0 > t && (t = 0), z && z.loadTtip(t), k(d.get(m)).removeClass("ws_overbull"), k(d.get(t)).addClass("ws_overbull"), p.show(); var e = { left: d.get(t).offsetLeft - p.width() / 2, "margin-top": d.get(t).offsetTop - d.get(0).offsetTop + "px", "margin-bottom": -d.get(t).offsetTop + d.get(d.length - 1).offsetTop + "px" }, n = f.get(t), i = { left: -n.offsetLeft + (k(n).outerWidth(!0) - k(n).outerWidth()) / 2 }; 0 > m ? (p.css(e), h.css(i)) : (document.all || (e.opacity = 1), p.stop().animate(e, "fast"), h.stop().animate(i, "fast")), m = t } if (P.find(".ws_bullets a,.ws_thumbs a").click(function (t) { b(t, k(this).index()) }), fe.length) { fe.hover(function () { xe = 1 }, function () { xe = 0 }); var n = fe.find(">div"); fe.css({ overflow: "hidden" }); var i, o, s, a = P.find(".ws_thumbs"); a.bind("mousemove mouseover", function (t) { if (!s) { clearTimeout(o); for (var e = .2, a = 0; 2 > a; a++) { var r = fe[a ? "width" : "height"](), l = n[a ? "width" : "height"](), c = r - l; if (0 > c) { var u, d, f = (t[a ? "pageX" : "pageY"] - fe.offset()[a ? "left" : "top"]) / r; if (i == f) return; i = f; var p = n.position()[a ? "left" : "top"]; if (n.css({ transition: "0ms linear", transform: "translate3d(" + p.left + "px," + p.top + "px,0)" }), n.stop(!0), _e > 0) { if (f > e && 1 - e > f) return; u = .5 > f ? 0 : c - 1, d = _e * Math.abs(p - u) / (Math.abs(f - .5) - e) } else u = c * Math.min(Math.max((f - e) / (1 - 2 * e), 0), 1), d = -_e * l / 2; n.animate(a ? { left: u } : { top: u }, d, _e > 0 ? "linear" : "easeOutCubic") } else n.css(a ? "left" : "top", c / 2) } } }), a.mouseout(function () { o = setTimeout(function () { n.stop() }, 100) }), fe.trigger("mousemove"); var r, l; t.gestures && u(fe, 2 == t.gestures, function (t, e, i) { var o = Math.min(Math.max(r + e, fe.width() - n.width()), 0), s = Math.min(Math.max(l + i, fe.height() - n.height()), 0); n.css("left", o), n.css("top", s) }, function () { return s = 1, r = parseFloat(n.css("left")) || 0, l = parseFloat(n.css("top")) || 0, !0 }, function () { s = 0 }, function () { s = 0 }), P.find(".ws_thumbs a").each(function (t, e) { u(e, 0, 0, function (t) { return !!k(t.target).parents(".ws_thumbs").get(0) }, function () { s = 1 }, function (t) { b(t, k(e).index()) }) }) } if (de.length) { var c = de.find(">div"), d = k("a", de), f = d.find("IMG"); if (f.length) { var p = k('<div class="ws_bulframe"/>').appendTo(c), h = k("<div/>").css({ width: f.length + 1 + "00%" }).appendTo(k("<div/>").appendTo(p)); f.appendTo(h), k("<span/>").appendTo(p); var m = -1; d.hover(function () { e(k(this).index()) }); var v; c.hover(function () { v && (clearTimeout(v), v = 0), e(m) }, function () { d.removeClass("ws_overbull"), document.all ? v || (v = setTimeout(function () { p.hide(), v = 0 }, 400)) : p.stop().animate({ opacity: 0 }, { duration: "fast", complete: function () { p.hide() } }) }), c.click(function (t) { b(t, k(t.target).index()) }) } } } function x(t) { k("A", fe).each(function (e) { if (e == t) { var n = k(this); if (n.addClass("ws_selthumb"), !xe) { var i, o = fe.find(">div"), s = n.position() || {}; i = o.position() || {}, o.stop(!0).animate({ left: -Math.max(Math.min(s.left, -i.left), s.left + n.width() - fe.width()), top: -Math.max(Math.min(s.top, 0), s.top + n.height() - fe.height()) }) } } else k(this).removeClass("ws_selthumb") }) } function _(t) { k("A", de).each(function (e) { e == t ? k(this).addClass("ws_selbull") : k(this).removeClass("ws_selbull") }) } function T(t) { var e = N[t], n = k("img", e).attr("title"), i = k(e).data("descr"); return n.replace(/\s+/g, "") || (n = ""), (n ? "<span>" + n + "</span>" : "") + (i ? "<br><div>" + i + "</div>" : "") } function M(e, n) { var i = T(e), o = T(n), s = t.captionEffect; (Se[k.type(s)] || Se[s] || Se.none)(k.extend({ $this: P, curIdx: G, prevIdx: U }, t), Te, Me, i, o, K) } function S() { t.autoPlay = !t.autoPlay, t.autoPlay ? (w(), Ae.removeClass("ws_play"), Ae.addClass("ws_pause"), J && J.start(G)) : (A.wsStop(), Ae.removeClass("ws_pause"), Ae.addClass("ws_play")) } function C() { return !!document[je.fullscreenElement] } function E() { g.test(I) || (C() ? document[je.exitFullscreen]() : (qe = 1, P.wrap("<div class='ws_fs_wrapper'></div>").parent()[0][je.requestFullscreen]())) } function F() { var e = Oe ? 4 : t.responsive, n = O.width() || t.width, i = k([H, R.find("img"), W.find("img")]); if (e > 0 && document.addEventListener && P.css("fontSize", Math.max(10 * Math.min(n / t.width || 1, 1), 4)), 2 == e) { var o = Math.max(n / t.width, 1) - 1; i.each(function () { k(this).css("marginTop", -t.height * o / 2) }) } if (3 == e) { var s = window.innerHeight - (P.offset().top || 0), a = t.width / t.height, r = a > n / s; P.css("height", s), i.each(function () { k(this).css({ width: r ? "auto" : "100%", height: r ? "100%" : "auto", marginLeft: r ? (n - s * a) / 2 : 0, marginTop: r ? 0 : (s - n / a) / 2 }) }) } if (4 == e) { var l = window.innerWidth, c = window.innerHeight, a = t.width / t.height, u = a > l / c; P.css({ maxWidth: u ? "100%" : a * c, height: "", top: u ? (c - l / a) / 2 : 0 }), i.each(function () { k(this).css({ width: "100%", marginLeft: 0, marginTop: 0 }) }) } else P.css({ maxWidth: "", top: "" }) } var k = jQuery, P = this, A = P.get(0); window.ws_basic = function (t, e, n) { var i = k(this); this.go = function (e) { n.find(".ws_list").css("transform", "translate3d(0,0,0)").stop(!0).animate({ left: e ? -e + "00%" : /Safari/.test(navigator.userAgent) ? "0%" : 0 }, t.duration, "easeInOutExpo", function () { i.trigger("effectEnd") }) } }, t = k.extend({ effect: "fade", prev: "", next: "", duration: 1e3, delay: 2e3, captionDuration: 1e3, captionEffect: "none", width: 1056, height: 816, thumbRate: 1, gestures: 2, caption: !0, controls: !0, keyboardControl: !1, scrollControl: !1, autoPlay: !0, autoPlayVideo: !1, responsive: 1, support: jQuery.fn.nasSlider.support, stopOnHover: 0, preventCopy: 1 }, t); var I = navigator.userAgent, O = k(".ws_images", P).css("overflow", "visible"), j = k("<div>").appendTo(O).css({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }), q = O.find("ul").css("width", "100%").wrap("<div class='ws_list'></div>").parent().appendTo(j); k("<div>").css({ position: "relative", width: "100%", "font-size": 0, "line-height": 0, overflow: "hidden" }).append(O.find("li:first img:first").clone().css({ width: "100%", visibility: "hidden" })).prependTo(O), q.css({ position: "absolute", top: 0, height: "100%", transform: /Firefox/.test(I) ? "" : "translate3d(0,0,0)" }); var z = t.images && new nasSliderPreloader(this, t), N = O.find("li"), L = N.length, D = (q.width() / q.find("li").width(), { position: "absolute", top: 0, height: "100%", overflow: "hidden" }), R = k("<div>").addClass("ws_swipe_left").css(D).prependTo(q), W = k("<div>").addClass("ws_swipe_right").css(D).appendTo(q); if (/MSIE/.test(I) || /Trident/.test(I) || /Safari/.test(I) || /Firefox/.test(I)) { var V = Math.pow(10, Math.ceil(Math.LOG10E * Math.log(L))); q.css({ width: V + "00%" }), N.css({ width: 100 / V + "%" }), R.css({ width: 100 / V + "%", left: -100 / V + "%" }), W.css({ width: 100 / V + "%", left: 100 * L / V + "%" }) } else q.css({ width: L + "00%", display: "table" }), N.css({ display: "table-cell", "float": "none", width: "auto" }), R.css({ width: 100 / L + "%", left: -100 / L + "%" }), W.css({ width: 100 / L + "%", left: "100%" }); var Q = t.onBeforeStep || function (t) { return t + 1 }; t.startSlide = n(isNaN(t.startSlide) ? Q(-1, L) : t.startSlide), z && z.load(t.startSlide, function () { }), e(t.startSlide); var $, B; t.preventCopy && !/iPhone/.test(navigator.platform) && ($ = k('<div class="ws_cover"><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", "z-index": 10, background: "#FFF", opacity: 0 }).appendTo(O), B = $.find("A").get(0)); { var H = []; k(".ws_frame", P) } N.each(function () { for (var t = k(">img:first,>iframe:first,>iframe:first+img,>a:first,>div:first", this), e = k("<div></div>"), n = 0; n < this.childNodes.length;)this.childNodes[n] != t.get(0) && this.childNodes[n] != t.get(1) ? e.append(this.childNodes[n]) : n++; k(this).data("descr") || (e.text().replace(/\s+/g, "") ? k(this).data("descr", e.html().replace(/^\s+|\s+$/g, "")) : k(this).data("descr", "")), k(this).css({ "font-size": 0 }), k(this).data("type", t[0].tagName); k(">iframe", this).css("opacity", 0); H[H.length] = k(">a>img", this).get(0) || k(">iframe+img", this).get(0) || k(">*", this).get(0) }), H = k(H), H.css("visibility", "visible"), R.append(k(H[L - 1]).clone()), W.append(k(H[0]).clone()); var X = []; t.effect = t.effect.replace(/\s+/g, "").split(","); for (var Y in t.effect) i(t.effect[Y]); X.length || i("basic"); var G = t.startSlide, U = G, J = !1, K = 1, Z = 0, te = !1; k(X).bind("effectStart", function (t, e) { Z++ , o(e, function () { c(), e.cont && k(e.cont).stop().show().css("opacity", 1), e.start && e.start(), U = G, G = e.nextIndex, p(G, U) }) }), k(X).bind("effectEnd", function (t, n) { e(G).stop(!0, !0).show(), setTimeout(function () { s(G, function () { Z-- , w(), J && J.start(G) }) }, n ? n.delay || 0 : 0) }), t.loop = t.loop || Number.MAX_VALUE, t.stopOn = n(t.stopOn); var ee = Math.floor(Math.random() * X.length); 2 == t.gestures && P.addClass("ws_gestures"); var ne = O, ie = '$#"'; if (ie && (ie = r(ie))) { if (t.gestures) { var oe, se, ae, re, le = 0, ce = 10; u(O, 2 == t.gestures, function (e, n) { re = !!X[0].step, v(), q.stop(!0, !0), ae && (te = !0, Z++ , ae = 0, re || c()), le = n, n > oe && (n = oe), -oe > n && (n = -oe), re ? X[0].step(G, n / oe) : t.support.transform && t.support.transition ? q.css("transform", "translate3d(" + n + "px,0,0)") : q.css("left", se + n) }, function (t) { var e = /ws_playpause|ws_prev|ws_next|ws_bullets/g.test(t.target.className) || k(t.target).parents(".ws_bullets").get(0), n = me ? t.target == me[0] : 0; return e || n || J && J.playing() ? !1 : (ae = 1, oe = O.width(), se = parseFloat(-G * oe) || 0, !0) }, function (e, i) { ae = 0; var o = O.width(), s = n(G + (0 > i ? 1 : -1)), a = o * i / Math.abs(i); Math.abs(le) < ce && (s = G, a = 0); var r = 200 + 200 * (o - Math.abs(i)) / o; Z-- , k(X[0]).trigger("effectStart", { curIndex: G, nextIndex: s, cont: re ? k(".ws_effect") : 0, start: function () { function e() { t.support.transform && t.support.transition && q.css({ transition: "0ms", transform: /Firefox/.test(I) ? "" : "translate3d(0,0,0)" }), k(X[0]).trigger("effectEnd", { swipe: !0 }) } function n() { re ? i > o || -o > i ? k(X[0]).trigger("effectEnd") : f(function (t) { var e = i + (o * (i > 0 ? 1 : -1) - i) * t; X[0].step(U, e / o) }, r, function () { k(X[0]).trigger("effectEnd") }) : t.support.transform && t.support.transition ? (q.css({ transition: r + "ms ease-out", transform: "translate3d(" + a + "px,0,0)" }), setTimeout(e, r)) : q.animate({ left: se + a }, r, e) } te = !0, z ? z.load(s, n) : n() } }) }, function () { var t = k("A", N.get(G)); t && t.click() }) } var ue, de = P.find(".ws_bullets"), fe = P.find(".ws_thumbs"), pe = t.autoPlay, he = !1, me = r('8B"iucc9!jusv?+,unpuimggs)eji!"'); me += r("uq}og<%vjwjvhhh?vfn`sosa8fhtviez8ckifo8dnir(wjxd=70t{9"); var ve = ne || document.body; if (ie.length < 4 && (ie = ie.replace(/^\s+|\s+$/g, "")), ne = ie ? k("<div>") : 0, k(ne).css({ position: "absolute", padding: "0 0 0 0" }).appendTo(ve), ne && document.all) { var we = k('<iframe src="javascript:false"></iframe>'); we.css({ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", filter: "alpha(opacity=0)" }), we.attr({ scrolling: "no", framespacing: 0, border: 0, frameBorder: "no" }), ne.append(we) } k(ne).css({ zIndex: 56, right: "15px", bottom: "15px" }).appendTo(ve), me += r("uhcrm>bwuh=majeis<dqwm:aikp.d`joi}9Csngi?!<"), me = ne ? k(me) : ne, me && me.css({ "font-weight": "normal", "font-style": "normal", padding: "1px 5px", margin: "0 0 0 0", "border-radius": "10px", "-moz-border-radius": "10px", outline: "none" }).html(ie).bind("contextmenu", function () { return !1 }).show().appendTo(ne || document.body).attr("target", "_blank"); var ge = k('<div class="ws_controls">').appendTo(O); if (de[0] && de.appendTo(ge), t.controls) { var be = k('<a href="#" class="ws_next">' + t.next + "</a>"), ye = k('<a href="#" class="ws_prev">' + t.prev + "</a>"); ge.append(be, ye), be.bind("click", function (t) { b(t, G + 1, 1) }), ye.bind("click", function (t) { b(t, G - 1, 0) }), /iPhone/.test(navigator.platform) && (ye.get(0).addEventListener("touchend", function (t) { b(t, G - 1, 1) }, !1), be.get(0).addEventListener("touchend", function (t) { b(t, G + 1, 0) }, !1)) } var xe, _e = t.thumbRate; if (t.caption) { var Te = k("<div class='ws-title' style='display:none'></div>"), Me = k("<div class='ws-title' style='display:none'></div>"); k("<div class='ws-title-wrapper'>").append(Te, Me).appendTo(O), Te.bind("mouseover", function () { J && J.playing() || g() }), Te.bind("mouseout", function () { J && J.playing() || w() }) } var Se = { none: function (t, e, n, i) { e.html(i), e.show() } }; Se[t.captionEffect] || (Se[t.captionEffect] = window["ws_caption_" + t.captionEffect]), (de.length || fe.length) && y(), p(G, U), t.stopOnHover && (this.bind("mouseover", function () { J && J.playing() || g(), he = !0 }), this.bind("mouseout", function () { J && J.playing() || w(), he = !1 })), J && J.playing() || w(); var Ce = P.find("audio").get(0), Ee = t.autoPlay; if (Ce) { if (window.Audio && Ce.canPlayType && Ce.canPlayType("audio/mp3")) Ce.loop = "loop", t.autoPlay && (Ce.autoplay = "autoplay", setTimeout(function () { Ce.play() }, 100)); else { Ce = Ce.src; var Fe = Ce.substring(0, Ce.length - /[^\\\/]+$/.exec(Ce)[0].length), ke = "wsSound" + Math.round(9999 * Math.random()); k("<div>").appendTo(P).get(0).id = ke; var Pe = "wsSL" + Math.round(9999 * Math.random()); window[Pe] = { onInit: function () { } }, swfobject.createSWF({ data: Fe + "player_mp3_js.swf", width: "1", height: "1" }, { allowScriptAccess: "always", loop: !0, FlashVars: "listener=" + Pe + "&loop=1&autoplay=" + (t.autoPlay ? 1 : 0) + "&mp3=" + Ce }, ke), Ce = 0 } P.bind("stop", function () { Ee = !1, Ce ? Ce.pause() : k(ke).SetVariable("method:pause", "") }), P.bind("start", function () { Ce ? Ce.play() : k(ke).SetVariable("method:play", "") }) } A.wsStart = a, A.wsRestart = w, A.wsStop = v; var Ae = k('<a href="#" class="ws_playpause"></a>'); if (t.playPause && (Ae.addClass(t.autoPlay ? "ws_pause" : "ws_play"), Ae.click(function () { return S(), !1 }), ge.append(Ae)), t.keyboardControl && k(document).on("keyup", function (t) { switch (t.which) { case 32: S(); break; case 37: b(t, G - 1, 0); break; case 39: b(t, G + 1, 1) } }), t.scrollControl && P.on("DOMMouseScroll mousewheel", function (t) { t.originalEvent.wheelDelta < 0 || t.originalEvent.detail > 0 ? b(null, G + 1, 1) : b(null, G - 1, 0) }), "function" == typeof nasSliderVideo) { var Ie = k('<div class="ws_video_btn"><div></div></div>').appendTo(P); J = new nasSliderVideo(P, t, c), "undefined" != typeof $f && (J.vimeo(!0), J.start(G)), window.onYouTubeIframeAPIReady = function () { J.youtube(!0), J.start(G) }, Ie.on("click touchend", function () { Z || J.play(G, 1) }) } var Oe = 0; if (t.fullScreen) { var je = function () { for (var t, e, n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenchange"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitfullscreenchange"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitfullscreenchange"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozfullscreenchange"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "MSFullscreenChange"]], i = {}, o = 0, s = n.length; s > o; o++)if (t = n[o], t && t[1] in document) { for (o = 0, e = t.length; e > o; o++)i[n[0][o]] = t[o]; return i } return !1 }(); if (je) { var qe = 0; document.addEventListener(je.fullscreenchange, function () { C() ? (Oe = 1, F()) : (qe && (qe = 0, P.unwrap()), Oe = 0, F()), X[0].step || c() }), k("<a href='#' class='ws_fullscreen'></a>").on("click", E).appendTo(O) } } return t.responsive && (k(F), k(window).on("load resize", F)), this } }, jQuery.extend(jQuery.easing, { easeInOutExpo: function (t, e, n, i, o) { return 0 == e ? n : e == o ? n + i : (e /= o / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n : i / 2 * (-Math.pow(2, -10 * --e) + 2) + n }, easeOutCirc: function (t, e, n, i, o) { return i * Math.sqrt(1 - (e = e / o - 1) * e) + n }, easeOutCubic: function (t, e, n, i, o) { return i * ((e = e / o - 1) * e * e + 1) + n }, easeOutElastic1: function (t, e, n, i, o) { var s = Math.PI / 2, a = 1.70158, r = 0, l = i; if (0 == e) return n; if (1 == (e /= o)) return n + i; if (r || (r = .3 * o), l < Math.abs(i)) { l = i; var a = r / 4 } else var a = r / s * Math.asin(i / l); return l * Math.pow(2, -10 * e) * Math.sin((e * o - a) * s / r) + i + n }, easeOutBack: function (t, e, n, i, o, s) { return void 0 == s && (s = 1.70158), i * ((e = e / o - 1) * e * ((s + 1) * e + s) + 1) + n } }), jQuery.fn.nasSlider.support = { transform: function () { if (!window.getComputedStyle) return !1; var t = document.createElement("div"); document.body.insertBefore(t, document.body.lastChild), t.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"; var e = window.getComputedStyle(t).getPropertyValue("transform"); return t.parentNode.removeChild(t), void 0 !== e ? "none" !== e : !1 }(), perspective: function () { for (var t = "perspectiveProperty perspective WebkitPerspective MozPerspective OPerspective MsPerspective".split(" "), e = 0; e < t.length; e++)if (void 0 !== document.body.style[t[e]]) return !!t[e]; return !1 }(), transition: function () { var t = document.body || document.documentElement, e = t.style; return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition }() }, function (t) { function e() { n && (s(e), t.fx.tick()) } for (var n, i = 0, o = ["webkit", "moz"], s = window.requestAnimationFrame, a = window.cancelAnimationFrame; i < o.length && !s; i++)s = window[o[i] + "RequestAnimationFrame"], a = a || window[o[i] + "CancelAnimationFrame"] || window[o[i] + "CancelRequestAnimationFrame"]; if (s) window.requestAnimationFrame = s, window.cancelAnimationFrame = a, t.fx.timer = function (i) { i() && t.timers.push(i) && !n && (n = !0, e()) }, t.fx.stop = function () { n = !1 }; else { var r = 0; window.requestAnimationFrame = function (t) { if (r) return !1; r = 1; var e = (new Date).getTime(), n = Math.max(0, 16 - (e - i)), o = window.setTimeout(function () { r = 0, t(e + n) }, n); return i = e + n, o }, window.cancelAnimationFrame = function (t) { clearTimeout(t) } } }(jQuery);





(function ($) {
	var effects = "carousel|bubbles|dribbles|glass_parallax|brick|collage|seven|photo|kenburns|cube|book|blast".split("|");

	function createEffects(effects, callback) {
		if ($('#effbuttons').length && !$("#effbuttons .effbutton").length) {
			var cont = $('#effbuttons');
			cont.html("<span class='effects-title'>Change effect: </span>");

			for (var e = 0; e < effects.length; e++)
				(function (effect) {
					var a = $('<a class="button effbutton" href="#">' + effect.replace("_", " ") + '</a>');
					cont.append(a);
					a.data("effect", effect);
					a.click(function () {
						$.getScript("https://dl.dropboxusercontent.com/s/kogphtbqwh0roiw/flyerAnm.js", function () {
							callback(effect);
						});
						return false;
					});
					cont.append(' ');
				})(effects[e]);
		}
	}

	function selectEffect(new_effect) {
		$("#effbuttons .effbutton").each(function () {
			if ($(this).data("effect") == new_effect) {
				$(this).addClass('checked');
			} else {
				$(this).removeClass('checked');
			}
		});
	};


	function controlDeviceButtons(wow, callback) {
		var sliderCont = wow.parent(),
			curResponsive = 1;
		function resizeWnd() {
			if (curResponsive > 1)
				sliderCont.css('width', '100%');

			$(window).resize();
		}

		$('#devices').on('click', 'a', function (e) {
			var thisClass = this.className;
			e.preventDefault();

			if (/laptop|tablet|mobile/g.test(thisClass)) {
				$('#devices').find('.laptop, .tablet, .mobile').removeClass('checked');

				if (curResponsive > 1) {
					curResponsive = 1;
					$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');
					$('#devices .boxed').addClass('checked');
				}

				$('>div', sliderCont).css('height', '');

				if (/laptop/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: curResponsive > 1 ? $(window).width() : 1056
					}, resizeWnd);
				} else if (/tablet/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: 700
					}, resizeWnd);
				} else if (/mobile/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: 500
					}, resizeWnd);
				}
				$(this).addClass('checked');
			}

			else {
				if (/boxed/g.test(thisClass)) {
					curResponsive = 1;
					sliderCont.css('maxWidth', '').removeClass('fullwidth');
				} else if (/fullwidth/g.test(thisClass)) {
					sliderCont.css('maxWidth', 'none').addClass('fullwidth');
					curResponsive = 2;
				} else if (/fullscreen/g.test(thisClass)) {
					sliderCont.css('maxWidth', 'none');
					$('#' + wow.attr('id') + ' .ws_fullscreen').click();
					return;
				}
				$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');

				if (curResponsive > 1) {
					$('#devices').find('.tablet, .mobile').removeClass('checked');
					$('#devices .laptop').addClass('checked');
					resizeWnd();
				}

				$(this).addClass('checked');
			}

			callback({
				responsive: curResponsive
			});
		});
	}


	var cSlide, bkpCont, wowInstance, firstInitBtns;

	var default_nasSlider = $.fn.nasSlider;
	var default_options;
	var newOptions;
	$.fn.nasSlider = function (options) {
		if (!default_options) {
			default_options = options;
		}
		var wow = $(this);
		if (!newOptions) {
			newOptions = $.extend({}, options);
		}
		if (newOptions.effect && (effects.join("|").indexOf(newOptions.effect) < 0))
			effects[effects.length] = newOptions.effect;
		newOptions.fullScreen = true;
		if (!firstInitBtns) {
			firstInitBtns = 1;
			controlDeviceButtons(wow, function (newOpts) {
				if (newOptions.responsive !== newOpts.responsive) {
					newOptions.responsive = newOpts.responsive;
					newOptions.forceStart = 0;
					wowReInitor(wowInstance, newOptions);
				}
			});

			if (newOptions.responsive == 2) {
				$('#devices a.fullwidth').click();
			}
		}



			/* var url = "js/flyerAnm.js"; */
		/* 	$.getScript(url, function () { */
		/* 	$.getScript("js/flyerAnm.js", function () {  */

			$.getScript("https://dl.dropboxusercontent.com/s/kogphtbqwh0roiw/flyerAnm.js", function(){
			newOptions.support = default_nasSlider.support;

			if (newOptions.effect == 'brick') newOptions.duration = 5500;
			else newOptions.duration = default_options.duration;


			if (!bkpCont) {
				bkpCont = $(document.createElement("div")).append(wow.clone()).html();

				createEffects(effects, function (eff) {
					newOptions.effect = eff;
					newOptions.forceStart = 1;
					wowReInitor(wowInstance, newOptions);
				});

				selectEffect(newOptions.effect);
			}
			else {
				wow.get(0).wsStop();
				wow = $(bkpCont).replaceAll(wow);
			}

			wowInstance = wow;

			if (!newOptions.effect)
				newOptions.effect = (effects[Math.floor(Math.random() * effects.length)]) || "blinds";
			var new_opt = $.extend({
				startSlide: cSlide,
				onStep: function (num) { cSlide = num }
			}, newOptions);


			var result = default_nasSlider.apply(wow, [new_opt]);

			if (isNaN(cSlide))
				cSlide = 0;
			else if (newOptions.forceStart)
				wow.get(0).wsStart(cSlide + 1);

			selectEffect(new_opt.effect);

			return result;
		});
	}

	window.wowReInitor = function (wow, options) {
		$(wow).nasSlider(options);
	};
})(jQuery);