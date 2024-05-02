/**
 * @license
 * Copyright 2016 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

(function () {
  var f,
    aa =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (c.get || c.set)
              throw new TypeError("ES3 does not support getters and setters.");
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    k =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this;
  function l() {
    l = function () {};
    k.Symbol || (k.Symbol = ba);
  }
  var ca = 0;
  function ba(a) {
    return "jscomp_symbol_" + (a || "") + ca++;
  }
  function m() {
    l();
    var a = k.Symbol.iterator;
    a || (a = k.Symbol.iterator = k.Symbol("iterator"));
    "function" != typeof Array.prototype[a] &&
      aa(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
          return da(this);
        },
      });
    m = function () {};
  }
  function da(a) {
    var b = 0;
    return ea(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }
  function ea(a) {
    m();
    a = { next: a };
    a[k.Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  function fa(a) {
    m();
    l();
    m();
    var b = a[Symbol.iterator];
    return b ? b.call(a) : da(a);
  }
  function n(a) {
    if (!(a instanceof Array)) {
      a = fa(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  function ha(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.ha = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    for (var d in b)
      if (Object.defineProperties) {
        var e = Object.getOwnPropertyDescriptor(b, d);
        e && Object.defineProperty(a, d, e);
      } else a[d] = b[d];
  }
  var p = window.Element.prototype,
    ia =
      p.matches ||
      p.matchesSelector ||
      p.webkitMatchesSelector ||
      p.mozMatchesSelector ||
      p.msMatchesSelector ||
      p.oMatchesSelector;
  function ja(a, b) {
    if (a && 1 == a.nodeType && b) {
      if ("string" == typeof b || 1 == b.nodeType) return a == b || ka(a, b);
      if ("length" in b)
        for (var c = 0, d; (d = b[c]); c++) if (a == d || ka(a, d)) return !0;
    }
    return !1;
  }
  function ka(a, b) {
    if ("string" != typeof b) return !1;
    if (ia) return ia.call(a, b);
    b = a.parentNode.querySelectorAll(b);
    for (var c = 0, d; (d = b[c]); c++) if (d == a) return !0;
    return !1;
  }
  function la(a) {
    for (var b = []; a && a.parentNode && 1 == a.parentNode.nodeType; )
      (a = a.parentNode), b.push(a);
    return b;
  }
  function q(a, b, c) {
    function d(a) {
      var d;
      if (h.composed && "function" == typeof a.composedPath)
        for (var e = a.composedPath(), g = 0, F; (F = e[g]); g++)
          1 == F.nodeType && ja(F, b) && (d = F);
      else
        a: {
          if ((d = a.target) && 1 == d.nodeType && b)
            for (d = [d].concat(la(d)), e = 0; (g = d[e]); e++)
              if (ja(g, b)) {
                d = g;
                break a;
              }
          d = void 0;
        }
      d && c.call(d, a, d);
    }
    var e = document,
      h = { composed: !0, S: !0 },
      h = void 0 === h ? {} : h;
    e.addEventListener(a, d, h.S);
    return {
      j: function () {
        e.removeEventListener(a, d, h.S);
      },
    };
  }
  function ma(a) {
    var b = {};
    if (!a || 1 != a.nodeType) return b;
    a = a.attributes;
    if (!a.length) return {};
    for (var c = 0, d; (d = a[c]); c++) b[d.name] = d.value;
    return b;
  }
  var na = /:(80|443)$/,
    r = document.createElement("a"),
    t = {};
  function u(a) {
    a = a && "." != a ? a : location.href;
    if (t[a]) return t[a];
    r.href = a;
    if ("." == a.charAt(0) || "/" == a.charAt(0)) return u(r.href);
    var b = "80" == r.port || "443" == r.port ? "" : r.port,
      b = "0" == b ? "" : b,
      c = r.host.replace(na, "");
    return (t[a] = {
      hash: r.hash,
      host: c,
      hostname: r.hostname,
      href: r.href,
      origin: r.origin ? r.origin : r.protocol + "//" + c,
      pathname: "/" == r.pathname.charAt(0) ? r.pathname : "/" + r.pathname,
      port: b,
      protocol: r.protocol,
      search: r.search,
    });
  }
  var v = [];
  function oa(a, b) {
    var c = this;
    this.context = a;
    this.P = b;
    this.f = (this.c = /Task$/.test(b)) ? a.get(b) : a[b];
    this.b = [];
    this.a = [];
    this.g = function (a) {
      for (var b = [], d = 0; d < arguments.length; ++d)
        b[d - 0] = arguments[d];
      return c.a[c.a.length - 1].apply(null, [].concat(n(b)));
    };
    this.c ? a.set(b, this.g) : (a[b] = this.g);
  }
  function w(a, b, c) {
    a = pa(a, b);
    a.b.push(c);
    qa(a);
  }
  function x(a, b, c) {
    a = pa(a, b);
    c = a.b.indexOf(c);
    -1 < c && (a.b.splice(c, 1), 0 < a.b.length ? qa(a) : a.j());
  }
  function qa(a) {
    a.a = [];
    for (var b, c = 0; (b = a.b[c]); c++) {
      var d = a.a[c - 1] || a.f.bind(a.context);
      a.a.push(b(d));
    }
  }
  oa.prototype.j = function () {
    var a = v.indexOf(this);
    -1 < a &&
      (v.splice(a, 1),
      this.c
        ? this.context.set(this.P, this.f)
        : (this.context[this.P] = this.f));
  };
  function pa(a, b) {
    var c = v.filter(function (c) {
      return c.context == a && c.P == b;
    })[0];
    c || ((c = new oa(a, b)), v.push(c));
    return c;
  }
  function y(a, b, c, d, e, h) {
    if ("function" == typeof d) {
      var g = c.get("buildHitTask");
      return {
        buildHitTask: function (c) {
          c.set(a, null, !0);
          c.set(b, null, !0);
          d(c, e, h);
          g(c);
        },
      };
    }
    return z({}, a, b);
  }
  function A(a, b) {
    var c = ma(a),
      d = {};
    Object.keys(c).forEach(function (a) {
      if (!a.indexOf(b) && a != b + "on") {
        var e = c[a];
        "true" == e && (e = !0);
        "false" == e && (e = !1);
        a = ra(a.slice(b.length));
        d[a] = e;
      }
    });
    return d;
  }
  function sa(a) {
    "loading" == document.readyState
      ? document.addEventListener("DOMContentLoaded", function c() {
          document.removeEventListener("DOMContentLoaded", c);
          a();
        })
      : a();
  }
  function ta(a, b) {
    var c;
    return function (d) {
      for (var e = [], h = 0; h < arguments.length; ++h)
        e[h - 0] = arguments[h];
      clearTimeout(c);
      c = setTimeout(function () {
        return a.apply(null, [].concat(n(e)));
      }, b);
    };
  }
  function ua(a) {
    function b() {
      c || ((c = !0), a());
    }
    var c = !1;
    setTimeout(b, 2e3);
    return b;
  }
  var B = {};
  function va(a, b) {
    function c() {
      clearTimeout(e.timeout);
      e.send && x(a, "send", e.send);
      delete B[d];
      e.R.forEach(function (a) {
        return a();
      });
    }
    var d = a.get("trackingId"),
      e = (B[d] = B[d] || {});
    clearTimeout(e.timeout);
    e.timeout = setTimeout(c, 0);
    e.R = e.R || [];
    e.R.push(b);
    e.send ||
      ((e.send = function (a) {
        return function (b) {
          for (var d = [], e = 0; e < arguments.length; ++e)
            d[e - 0] = arguments[e];
          c();
          a.apply(null, [].concat(n(d)));
        };
      }),
      w(a, "send", e.send));
  }
  var z =
    Object.assign ||
    function (a, b) {
      for (var c = [], d = 1; d < arguments.length; ++d)
        c[d - 1] = arguments[d];
      for (var d = 0, e = c.length; d < e; d++) {
        var h = Object(c[d]),
          g;
        for (g in h)
          Object.prototype.hasOwnProperty.call(h, g) && (a[g] = h[g]);
      }
      return a;
    };
  function ra(a) {
    return a.replace(/[\-\_]+(\w?)/g, function (a, c) {
      return c.toUpperCase();
    });
  }
  function C(a) {
    return "object" == typeof a && null !== a;
  }
  var D = function wa(b) {
    return b
      ? (b ^ ((16 * Math.random()) >> (b / 4))).toString(16)
      : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, wa);
  };
  function G(a, b) {
    var c = window.GoogleAnalyticsObject || "ga";
    window[c] =
      window[c] ||
      function (a) {
        for (var b = [], d = 0; d < arguments.length; ++d)
          b[d - 0] = arguments[d];
        (window[c].q = window[c].q || []).push(b);
      };
    window.gaDevIds = window.gaDevIds || [];
    0 > window.gaDevIds.indexOf("i5iSjo") && window.gaDevIds.push("i5iSjo");
    window[c]("provide", a, b);
    window.gaplugins = window.gaplugins || {};
    window.gaplugins[a.charAt(0).toUpperCase() + a.slice(1)] = b;
  }
  var H = { T: 1, U: 2, V: 3, X: 4, Y: 5, Z: 6, $: 7, aa: 8, ba: 9, W: 10 },
    I = Object.keys(H).length;
  function J(a, b) {
    a.set("\x26_av", "2.4.0");
    var c = a.get("\x26_au"),
      c = parseInt(c || "0", 16).toString(2);
    if (c.length < I) for (var d = I - c.length; d; ) (c = "0" + c), d--;
    b = I - b;
    c = c.substr(0, b) + 1 + c.substr(b + 1);
    a.set("\x26_au", parseInt(c || "0", 2).toString(16));
  }
  function K(a, b) {
    J(a, H.T);
    this.a = z({}, b);
    this.g = a;
    this.b =
      this.a.stripQuery && this.a.queryDimensionIndex
        ? "dimension" + this.a.queryDimensionIndex
        : null;
    this.f = this.f.bind(this);
    this.c = this.c.bind(this);
    w(a, "get", this.f);
    w(a, "buildHitTask", this.c);
  }
  K.prototype.f = function (a) {
    var b = this;
    return function (c) {
      if ("page" == c || c == b.b) {
        var d = { location: a("location"), page: a("page") };
        return xa(b, d)[c];
      }
      return a(c);
    };
  };
  K.prototype.c = function (a) {
    var b = this;
    return function (c) {
      var d = xa(b, { location: c.get("location"), page: c.get("page") });
      c.set(d, null, !0);
      a(c);
    };
  };
  function xa(a, b) {
    var c = u(b.page || b.location),
      d = c.pathname;
    if (a.a.indexFilename) {
      var e = d.split("/");
      a.a.indexFilename == e[e.length - 1] &&
        ((e[e.length - 1] = ""), (d = e.join("/")));
    }
    "remove" == a.a.trailingSlash
      ? (d = d.replace(/\/+$/, ""))
      : "add" == a.a.trailingSlash &&
        (/\.\w+$/.test(d) || "/" == d.substr(-1) || (d += "/"));
    d = { page: d + (a.a.stripQuery ? ya(a, c.search) : c.search) };
    b.location && (d.location = b.location);
    a.b && (d[a.b] = c.search.slice(1) || "(not set)");
    return "function" == typeof a.a.urlFieldsFilter
      ? ((b = a.a.urlFieldsFilter(d, u)),
        (c = { page: b.page, location: b.location }),
        a.b && (c[a.b] = b[a.b]),
        c)
      : d;
  }
  function ya(a, b) {
    if (Array.isArray(a.a.queryParamsWhitelist)) {
      var c = [];
      b.slice(1)
        .split("\x26")
        .forEach(function (b) {
          var d = fa(b.split("\x3d"));
          b = d.next().value;
          d = d.next().value;
          -1 < a.a.queryParamsWhitelist.indexOf(b) && d && c.push([b, d]);
        });
      return c.length
        ? "?" +
            c
              .map(function (a) {
                return a.join("\x3d");
              })
              .join("\x26")
        : "";
    }
    return "";
  }
  K.prototype.remove = function () {
    x(this.g, "get", this.f);
    x(this.g, "buildHitTask", this.c);
  };
  G("cleanUrlTracker", K);
  function L(a, b) {
    var c = this;
    J(a, H.U);
    if (window.addEventListener) {
      this.a = z(
        { events: ["click"], fieldsObj: {}, attributePrefix: "ga-" },
        b
      );
      this.f = a;
      this.c = this.c.bind(this);
      var d = "[" + this.a.attributePrefix + "on]";
      this.b = {};
      this.a.events.forEach(function (a) {
        c.b[a] = q(a, d, c.c);
      });
    }
  }
  L.prototype.c = function (a, b) {
    var c = this.a.attributePrefix;
    if (
      !(
        0 >
        b
          .getAttribute(c + "on")
          .split(/\s*,\s*/)
          .indexOf(a.type)
      )
    ) {
      var c = A(b, c),
        d = z({}, this.a.fieldsObj, c);
      this.f.send(
        c.hitType || "event",
        y({ transport: "beacon" }, d, this.f, this.a.hitFilter, b, a)
      );
    }
  };
  L.prototype.remove = function () {
    var a = this;
    Object.keys(this.b).forEach(function (b) {
      a.b[b].j();
    });
  };
  G("eventTracker", L);
  function za(a, b) {
    var c = this;
    J(a, H.V);
    window.IntersectionObserver &&
      window.MutationObserver &&
      ((this.a = z(
        { rootMargin: "0px", fieldsObj: {}, attributePrefix: "ga-" },
        b
      )),
      (this.c = a),
      (this.M = this.M.bind(this)),
      (this.O = this.O.bind(this)),
      (this.K = this.K.bind(this)),
      (this.L = this.L.bind(this)),
      (this.b = null),
      (this.items = []),
      (this.i = {}),
      (this.h = {}),
      sa(function () {
        c.a.elements && c.observeElements(c.a.elements);
      }));
  }
  f = za.prototype;
  f.observeElements = function (a) {
    var b = this;
    a = M(this, a);
    this.items = this.items.concat(a.items);
    this.i = z({}, a.i, this.i);
    this.h = z({}, a.h, this.h);
    a.items.forEach(function (a) {
      var c = (b.h[a.threshold] =
        b.h[a.threshold] ||
        new IntersectionObserver(b.O, {
          rootMargin: b.a.rootMargin,
          threshold: [+a.threshold],
        }));
      (a = b.i[a.id] || (b.i[a.id] = document.getElementById(a.id))) &&
        c.observe(a);
    });
    this.b ||
      ((this.b = new MutationObserver(this.M)),
      this.b.observe(document.body, { childList: !0, subtree: !0 }));
    requestAnimationFrame(function () {});
  };
  f.unobserveElements = function (a) {
    var b = [],
      c = [];
    this.items.forEach(function (d) {
      a.some(function (a) {
        a = Aa(a);
        return (
          a.id === d.id &&
          a.threshold === d.threshold &&
          a.trackFirstImpressionOnly === d.trackFirstImpressionOnly
        );
      })
        ? c.push(d)
        : b.push(d);
    });
    if (b.length) {
      var d = M(this, b),
        e = M(this, c);
      this.items = d.items;
      this.i = d.i;
      this.h = d.h;
      c.forEach(function (a) {
        if (!d.i[a.id]) {
          var b = e.h[a.threshold],
            c = e.i[a.id];
          c && b.unobserve(c);
          d.h[a.threshold] || e.h[a.threshold].disconnect();
        }
      });
    } else this.unobserveAllElements();
  };
  f.unobserveAllElements = function () {
    var a = this;
    Object.keys(this.h).forEach(function (b) {
      a.h[b].disconnect();
    });
    this.b.disconnect();
    this.b = null;
    this.items = [];
    this.i = {};
    this.h = {};
  };
  function M(a, b) {
    var c = [],
      d = {},
      e = {};
    b.length &&
      b.forEach(function (b) {
        b = Aa(b);
        c.push(b);
        e[b.id] = a.i[b.id] || null;
        d[b.threshold] = a.h[b.threshold] || null;
      });
    return { items: c, i: e, h: d };
  }
  f.M = function (a) {
    for (var b = 0, c; (c = a[b]); b++) {
      for (var d = 0, e; (e = c.removedNodes[d]); d++) N(this, e, this.L);
      for (d = 0; (e = c.addedNodes[d]); d++) N(this, e, this.K);
    }
  };
  function N(a, b, c) {
    1 == b.nodeType && b.id in a.i && c(b.id);
    for (var d = 0, e; (e = b.childNodes[d]); d++) N(a, e, c);
  }
  f.O = function (a) {
    for (var b = [], c = 0, d; (d = a[c]); c++)
      for (var e = 0, h; (h = this.items[e]); e++) {
        var g;
        if ((g = d.target.id === h.id))
          (g = h.threshold)
            ? (g = d.intersectionRatio >= g)
            : ((g = d.intersectionRect),
              (g = 0 < g.top || 0 < g.bottom || 0 < g.left || 0 < g.right));
        if (g) {
          var E = h.id;
          g = document.getElementById(E);
          var E = {
              transport: "beacon",
              eventCategory: "Viewport",
              eventAction: "impression",
              eventLabel: E,
              nonInteraction: !0,
            },
            Na = z({}, this.a.fieldsObj, A(g, this.a.attributePrefix));
          this.c.send("event", y(E, Na, this.c, this.a.hitFilter, g));
          h.trackFirstImpressionOnly && b.push(h);
        }
      }
    b.length && this.unobserveElements(b);
  };
  f.K = function (a) {
    var b = this,
      c = (this.i[a] = document.getElementById(a));
    this.items.forEach(function (d) {
      a == d.id && b.h[d.threshold].observe(c);
    });
  };
  f.L = function (a) {
    var b = this,
      c = this.i[a];
    this.items.forEach(function (d) {
      a == d.id && b.h[d.threshold].unobserve(c);
    });
    this.i[a] = null;
  };
  f.remove = function () {
    this.unobserveAllElements();
  };
  G("impressionTracker", za);
  function Aa(a) {
    "string" == typeof a && (a = { id: a });
    return z({ threshold: 0, trackFirstImpressionOnly: !0 }, a);
  }
  function Ba() {
    this.a = {};
  }
  function Ca(a, b) {
    (a.a.externalSet = a.a.externalSet || []).push(b);
  }
  Ba.prototype.ca = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    (this.a[a] = this.a[a] || []).forEach(function (a) {
      return a.apply(null, [].concat(n(c)));
    });
  };
  var O = {},
    P = !1,
    Q;
  function R(a, b) {
    b = void 0 === b ? {} : b;
    this.a = {};
    this.b = a;
    this.w = b;
    this.l = null;
  }
  ha(R, Ba);
  function S(a, b, c) {
    a = ["autotrack", a, b].join(":");
    O[a] ||
      ((O[a] = new R(a, c)),
      P || (window.addEventListener("storage", Da), (P = !0)));
    return O[a];
  }
  function Ea() {
    if (null != Q) return Q;
    try {
      window.localStorage.setItem("autotrack", "autotrack"),
        window.localStorage.removeItem("autotrack"),
        (Q = !0);
    } catch (a) {
      Q = !1;
    }
    return Q;
  }
  R.prototype.get = function () {
    if (this.l) return this.l;
    if (Ea())
      try {
        this.l = Fa(window.localStorage.getItem(this.b));
      } catch (a) {}
    return (this.l = z({}, this.w, this.l));
  };
  R.prototype.set = function (a) {
    this.l = z({}, this.w, this.l, a);
    if (Ea())
      try {
        var b = JSON.stringify(this.l);
        window.localStorage.setItem(this.b, b);
      } catch (c) {}
  };
  function Ga(a) {
    a.l = {};
    if (Ea())
      try {
        window.localStorage.removeItem(a.b);
      } catch (b) {}
  }
  R.prototype.j = function () {
    delete O[this.b];
    Object.keys(O).length ||
      (window.removeEventListener("storage", Da), (P = !1));
  };
  function Da(a) {
    var b = O[a.key];
    if (b) {
      var c = z({}, b.w, Fa(a.oldValue));
      a = z({}, b.w, Fa(a.newValue));
      b.l = a;
      b.ca("externalSet", a, c);
    }
  }
  function Fa(a) {
    var b = {};
    if (a)
      try {
        b = JSON.parse(a);
      } catch (c) {}
    return b;
  }
  var T = {};
  function U(a, b, c) {
    this.f = a;
    this.timeout = b || Ha;
    this.timeZone = c;
    this.b = this.b.bind(this);
    w(a, "sendHitTask", this.b);
    try {
      this.c = new Intl.DateTimeFormat("en-US", { timeZone: this.timeZone });
    } catch (d) {}
    this.a = S(a.get("trackingId"), "session", { hitTime: 0, isExpired: !1 });
    this.a.get().id || this.a.set({ id: D() });
  }
  function Ia(a, b, c) {
    var d = a.get("trackingId");
    return T[d] ? T[d] : (T[d] = new U(a, b, c));
  }
  function V(a) {
    return a.a.get().id;
  }
  U.prototype.isExpired = function (a) {
    a = void 0 === a ? V(this) : a;
    if (a != V(this)) return !0;
    a = this.a.get();
    if (a.isExpired) return !0;
    var b = a.hitTime;
    return b &&
      ((a = new Date()),
      (b = new Date(b)),
      a - b > 6e4 * this.timeout ||
        (this.c && this.c.format(a) != this.c.format(b)))
      ? !0
      : !1;
  };
  U.prototype.b = function (a) {
    var b = this;
    return function (c) {
      a(c);
      var d = c.get("sessionControl");
      c = "start" == d || b.isExpired();
      var d = "end" == d,
        e = b.a.get();
      e.hitTime = +new Date();
      c && ((e.isExpired = !1), (e.id = D()));
      d && (e.isExpired = !0);
      b.a.set(e);
    };
  };
  U.prototype.j = function () {
    x(this.f, "sendHitTask", this.b);
    this.a.j();
    delete T[this.f.get("trackingId")];
  };
  var Ha = 30;
  function W(a, b) {
    J(a, H.W);
    window.addEventListener &&
      ((this.b = z(
        { increaseThreshold: 20, sessionTimeout: Ha, fieldsObj: {} },
        b
      )),
      (this.f = a),
      (this.c = Ja(this)),
      (this.g = ta(this.g.bind(this), 500)),
      (this.o = this.o.bind(this)),
      (this.a = S(a.get("trackingId"), "plugins/max-scroll-tracker")),
      (this.m = Ia(a, this.b.sessionTimeout, this.b.timeZone)),
      w(a, "set", this.o),
      Ka(this));
  }
  function Ka(a) {
    100 > (a.a.get()[a.c] || 0) && window.addEventListener("scroll", a.g);
  }
  W.prototype.g = function () {
    var a = document.documentElement,
      b = document.body,
      a = Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (window.pageYOffset /
              (Math.max(
                a.offsetHeight,
                a.scrollHeight,
                b.offsetHeight,
                b.scrollHeight
              ) -
                window.innerHeight)) *
              100
          )
        )
      ),
      b = V(this.m);
    b != this.a.get().sessionId && (Ga(this.a), this.a.set({ sessionId: b }));
    if (this.m.isExpired(this.a.get().sessionId)) Ga(this.a);
    else if (
      ((b = this.a.get()[this.c] || 0),
      a > b &&
        ((100 != a && 100 != b) || window.removeEventListener("scroll", this.g),
        (b = a - b),
        100 == a || b >= this.b.increaseThreshold))
    ) {
      var c = {};
      this.a.set(((c[this.c] = a), (c.sessionId = V(this.m)), c));
      a = {
        transport: "beacon",
        eventCategory: "Max Scroll",
        eventAction: "increase",
        eventValue: b,
        eventLabel: String(a),
        nonInteraction: !0,
      };
      this.b.maxScrollMetricIndex &&
        (a["metric" + this.b.maxScrollMetricIndex] = b);
      this.f.send("event", y(a, this.b.fieldsObj, this.f, this.b.hitFilter));
    }
  };
  W.prototype.o = function (a) {
    var b = this;
    return function (c, d) {
      a(c, d);
      var e = {};
      (C(c) ? c : ((e[c] = d), e)).page &&
        ((c = b.c), (b.c = Ja(b)), b.c != c && Ka(b));
    };
  };
  function Ja(a) {
    a = u(a.f.get("page") || a.f.get("location"));
    return a.pathname + a.search;
  }
  W.prototype.remove = function () {
    this.m.j();
    window.removeEventListener("scroll", this.g);
    x(this.f, "set", this.o);
  };
  G("maxScrollTracker", W);
  var La = {};
  function Ma(a, b) {
    J(a, H.X);
    window.matchMedia &&
      ((this.a = z(
        {
          changeTemplate: this.changeTemplate,
          changeTimeout: 1e3,
          fieldsObj: {},
        },
        b
      )),
      C(this.a.definitions) &&
        ((b = this.a.definitions),
        (this.a.definitions = Array.isArray(b) ? b : [b]),
        (this.b = a),
        (this.c = []),
        Oa(this)));
  }
  function Oa(a) {
    a.a.definitions.forEach(function (b) {
      if (b.name && b.dimensionIndex) {
        var c = Pa(b);
        a.b.set("dimension" + b.dimensionIndex, c);
        Qa(a, b);
      }
    });
  }
  function Pa(a) {
    var b;
    a.items.forEach(function (a) {
      Ra(a.media).matches && (b = a);
    });
    return b ? b.name : "(not set)";
  }
  function Qa(a, b) {
    b.items.forEach(function (c) {
      c = Ra(c.media);
      var d = ta(function () {
        var c = Pa(b),
          d = a.b.get("dimension" + b.dimensionIndex);
        c !== d &&
          (a.b.set("dimension" + b.dimensionIndex, c),
          (c = {
            transport: "beacon",
            eventCategory: b.name,
            eventAction: "change",
            eventLabel: a.a.changeTemplate(d, c),
            nonInteraction: !0,
          }),
          a.b.send("event", y(c, a.a.fieldsObj, a.b, a.a.hitFilter)));
      }, a.a.changeTimeout);
      c.addListener(d);
      a.c.push({ fa: c, da: d });
    });
  }
  Ma.prototype.remove = function () {
    for (var a = 0, b; (b = this.c[a]); a++) b.fa.removeListener(b.da);
  };
  Ma.prototype.changeTemplate = function (a, b) {
    return a + " \x3d\x3e " + b;
  };
  G("mediaQueryTracker", Ma);
  function Ra(a) {
    return La[a] || (La[a] = window.matchMedia(a));
  }
  function X(a, b) {
    J(a, H.Y);
    window.addEventListener &&
      ((this.a = z(
        {
          formSelector: "form",
          shouldTrackOutboundForm: this.shouldTrackOutboundForm,
          fieldsObj: {},
          attributePrefix: "ga-",
        },
        b
      )),
      (this.b = a),
      (this.c = q("submit", this.a.formSelector, this.f.bind(this))));
  }
  X.prototype.f = function (a, b) {
    var c = {
      transport: "beacon",
      eventCategory: "Outbound Form",
      eventAction: "submit",
      eventLabel: u(b.action).href,
    };
    if (this.a.shouldTrackOutboundForm(b, u)) {
      navigator.sendBeacon ||
        (a.preventDefault(),
        (c.hitCallback = ua(function () {
          b.submit();
        })));
      var d = z({}, this.a.fieldsObj, A(b, this.a.attributePrefix));
      this.b.send("event", y(c, d, this.b, this.a.hitFilter, b, a));
    }
  };
  X.prototype.shouldTrackOutboundForm = function (a, b) {
    a = b(a.action);
    return a.hostname != location.hostname && "http" == a.protocol.slice(0, 4);
  };
  X.prototype.remove = function () {
    this.c.j();
  };
  G("outboundFormTracker", X);
  function Y(a, b) {
    var c = this;
    J(a, H.Z);
    window.addEventListener &&
      ((this.a = z(
        {
          events: ["click"],
          linkSelector: "a, area",
          shouldTrackOutboundLink: this.shouldTrackOutboundLink,
          fieldsObj: {},
          attributePrefix: "ga-",
        },
        b
      )),
      (this.f = a),
      (this.c = this.c.bind(this)),
      (this.b = {}),
      this.a.events.forEach(function (a) {
        c.b[a] = q(a, c.a.linkSelector, c.c);
      }));
  }
  Y.prototype.c = function (a, b) {
    if (this.a.shouldTrackOutboundLink(b, u)) {
      var c = b.getAttribute("href") || b.getAttribute("xlink:href"),
        d = u(c),
        e = {
          transport: "beacon",
          eventCategory: "Outbound Link",
          eventAction: a.type,
          eventLabel: d.href,
        };
      navigator.sendBeacon ||
        "click" != a.type ||
        "_blank" == b.target ||
        a.metaKey ||
        a.ctrlKey ||
        a.shiftKey ||
        a.altKey ||
        1 < a.which ||
        window.addEventListener("click", function (a) {
          a.defaultPrevented ||
            (a.preventDefault(),
            (e.hitCallback = ua(function () {
              location.href = c;
            })));
        });
      d = z({}, this.a.fieldsObj, A(b, this.a.attributePrefix));
      this.f.send("event", y(e, d, this.f, this.a.hitFilter, b, a));
    }
  };
  Y.prototype.shouldTrackOutboundLink = function (a, b) {
    a = a.getAttribute("href") || a.getAttribute("xlink:href");
    b = b(a);
    return b.hostname != location.hostname && "http" == b.protocol.slice(0, 4);
  };
  Y.prototype.remove = function () {
    var a = this;
    Object.keys(this.b).forEach(function (b) {
      a.b[b].j();
    });
  };
  G("outboundLinkTracker", Y);
  var Z = D();
  function Sa(a, b) {
    var c = this;
    J(a, H.$);
    document.visibilityState &&
      ((this.a = z(
        {
          sessionTimeout: Ha,
          visibleThreshold: 5e3,
          sendInitialPageview: !1,
          fieldsObj: {},
        },
        b
      )),
      (this.b = a),
      (this.g = document.visibilityState),
      (this.m = null),
      (this.o = !1),
      (this.v = this.v.bind(this)),
      (this.s = this.s.bind(this)),
      (this.G = this.G.bind(this)),
      (this.N = this.N.bind(this)),
      (this.c = S(a.get("trackingId"), "plugins/page-visibility-tracker")),
      Ca(this.c, this.N),
      (this.f = Ia(a, this.a.sessionTimeout, this.a.timeZone)),
      w(a, "set", this.v),
      window.addEventListener("unload", this.G),
      document.addEventListener("visibilitychange", this.s),
      va(this.b, function () {
        if ("visible" == document.visibilityState)
          c.a.sendInitialPageview && (Ta(c, { ea: !0 }), (c.o = !0)),
            c.c.set({
              time: +new Date(),
              state: "visible",
              pageId: Z,
              sessionId: V(c.f),
            });
        else if (c.a.sendInitialPageview && c.a.pageLoadsMetricIndex) {
          var a = {},
            a =
              ((a.transport = "beacon"),
              (a.eventCategory = "Page Visibility"),
              (a.eventAction = "page load"),
              (a.eventLabel = "(not set)"),
              (a["metric" + c.a.pageLoadsMetricIndex] = 1),
              (a.nonInteraction = !0),
              a);
          c.b.send("event", y(a, c.a.fieldsObj, c.b, c.a.hitFilter));
        }
      }));
  }
  f = Sa.prototype;
  f.s = function () {
    var a = this;
    if (
      "visible" == document.visibilityState ||
      "hidden" == document.visibilityState
    ) {
      var b = Ua(this),
        c = {
          time: +new Date(),
          state: document.visibilityState,
          pageId: Z,
          sessionId: V(this.f),
        };
      "visible" == document.visibilityState &&
        this.a.sendInitialPageview &&
        !this.o &&
        (Ta(this), (this.o = !0));
      "hidden" == document.visibilityState && this.m && clearTimeout(this.m);
      this.f.isExpired(b.sessionId)
        ? (Ga(this.c),
          "hidden" == this.g &&
            "visible" == document.visibilityState &&
            (clearTimeout(this.m),
            (this.m = setTimeout(function () {
              a.c.set(c);
              Ta(a, { hitTime: c.time });
            }, this.a.visibleThreshold))))
        : (b.pageId == Z && "visible" == b.state && Va(this, b), this.c.set(c));
      this.g = document.visibilityState;
    }
  };
  function Ua(a) {
    var b = a.c.get();
    "visible" == a.g &&
      "hidden" == b.state &&
      b.pageId != Z &&
      ((b.state = "visible"), (b.pageId = Z), a.c.set(b));
    return b;
  }
  function Va(a, b, c) {
    c = (c ? c : {}).hitTime;
    var d = { hitTime: c },
      d = (d ? d : {}).hitTime;
    (b = b.time ? (d || +new Date()) - b.time : 0) &&
      b >= a.a.visibleThreshold &&
      ((b = Math.round(b / 1e3)),
      (d = {
        transport: "beacon",
        nonInteraction: !0,
        eventCategory: "Page Visibility",
        eventAction: "track",
        eventValue: b,
        eventLabel: "(not set)",
      }),
      c && (d.queueTime = +new Date() - c),
      a.a.visibleMetricIndex && (d["metric" + a.a.visibleMetricIndex] = b),
      a.b.send("event", y(d, a.a.fieldsObj, a.b, a.a.hitFilter)));
  }
  function Ta(a, b) {
    var c = b ? b : {};
    b = c.hitTime;
    var c = c.ea,
      d = { transport: "beacon" };
    b && (d.queueTime = +new Date() - b);
    c &&
      a.a.pageLoadsMetricIndex &&
      (d["metric" + a.a.pageLoadsMetricIndex] = 1);
    a.b.send("pageview", y(d, a.a.fieldsObj, a.b, a.a.hitFilter));
  }
  f.v = function (a) {
    var b = this;
    return function (c, d) {
      var e = {},
        e = C(c) ? c : ((e[c] = d), e);
      e.page && e.page !== b.b.get("page") && "visible" == b.g && b.s();
      a(c, d);
    };
  };
  f.N = function (a, b) {
    a.time != b.time &&
      (b.pageId != Z ||
        "visible" != b.state ||
        this.f.isExpired(b.sessionId) ||
        Va(this, b, { hitTime: a.time }));
  };
  f.G = function () {
    "hidden" != this.g && this.s();
  };
  f.remove = function () {
    this.c.j();
    this.f.j();
    x(this.b, "set", this.v);
    window.removeEventListener("unload", this.G);
    document.removeEventListener("visibilitychange", this.s);
  };
  G("pageVisibilityTracker", Sa);
  function Wa(a, b) {
    J(a, H.aa);
    window.addEventListener &&
      ((this.a = z({ fieldsObj: {}, hitFilter: null }, b)),
      (this.b = a),
      (this.u = this.u.bind(this)),
      (this.J = this.J.bind(this)),
      (this.D = this.D.bind(this)),
      (this.A = this.A.bind(this)),
      (this.B = this.B.bind(this)),
      (this.F = this.F.bind(this)),
      "complete" != document.readyState
        ? window.addEventListener("load", this.u)
        : this.u());
  }
  f = Wa.prototype;
  f.u = function () {
    if (window.FB)
      try {
        window.FB.Event.subscribe("edge.create", this.B),
          window.FB.Event.subscribe("edge.remove", this.F);
      } catch (a) {}
    window.twttr && this.J();
  };
  f.J = function () {
    var a = this;
    try {
      window.twttr.ready(function () {
        window.twttr.events.bind("tweet", a.D);
        window.twttr.events.bind("follow", a.A);
      });
    } catch (b) {}
  };
  function Xa(a) {
    try {
      window.twttr.ready(function () {
        window.twttr.events.unbind("tweet", a.D);
        window.twttr.events.unbind("follow", a.A);
      });
    } catch (b) {}
  }
  f.D = function (a) {
    if ("tweet" == a.region) {
      var b = {
        transport: "beacon",
        socialNetwork: "Twitter",
        socialAction: "tweet",
        socialTarget:
          a.data.url || a.target.getAttribute("data-url") || location.href,
      };
      this.b.send(
        "social",
        y(b, this.a.fieldsObj, this.b, this.a.hitFilter, a.target, a)
      );
    }
  };
  f.A = function (a) {
    if ("follow" == a.region) {
      var b = {
        transport: "beacon",
        socialNetwork: "Twitter",
        socialAction: "follow",
        socialTarget:
          a.data.screen_name || a.target.getAttribute("data-screen-name"),
      };
      this.b.send(
        "social",
        y(b, this.a.fieldsObj, this.b, this.a.hitFilter, a.target, a)
      );
    }
  };
  f.B = function (a) {
    this.b.send(
      "social",
      y(
        {
          transport: "beacon",
          socialNetwork: "Facebook",
          socialAction: "like",
          socialTarget: a,
        },
        this.a.fieldsObj,
        this.b,
        this.a.hitFilter
      )
    );
  };
  f.F = function (a) {
    this.b.send(
      "social",
      y(
        {
          transport: "beacon",
          socialNetwork: "Facebook",
          socialAction: "unlike",
          socialTarget: a,
        },
        this.a.fieldsObj,
        this.b,
        this.a.hitFilter
      )
    );
  };
  f.remove = function () {
    window.removeEventListener("load", this.u);
    try {
      window.FB.Event.unsubscribe("edge.create", this.B),
        window.FB.Event.unsubscribe("edge.remove", this.F);
    } catch (a) {}
    Xa(this);
  };
  G("socialWidgetTracker", Wa);
  function Ya(a, b) {
    J(a, H.ba);
    history.pushState &&
      window.addEventListener &&
      ((this.a = z(
        {
          shouldTrackUrlChange: this.shouldTrackUrlChange,
          trackReplaceState: !1,
          fieldsObj: {},
          hitFilter: null,
        },
        b
      )),
      (this.b = a),
      (this.c = location.pathname + location.search),
      (this.H = this.H.bind(this)),
      (this.I = this.I.bind(this)),
      (this.C = this.C.bind(this)),
      w(history, "pushState", this.H),
      w(history, "replaceState", this.I),
      window.addEventListener("popstate", this.C));
  }
  f = Ya.prototype;
  f.H = function (a) {
    var b = this;
    return function (c) {
      for (var d = [], e = 0; e < arguments.length; ++e)
        d[e - 0] = arguments[e];
      a.apply(null, [].concat(n(d)));
      Za(b, !0);
    };
  };
  f.I = function (a) {
    var b = this;
    return function (c) {
      for (var d = [], e = 0; e < arguments.length; ++e)
        d[e - 0] = arguments[e];
      a.apply(null, [].concat(n(d)));
      Za(b, !1);
    };
  };
  f.C = function () {
    Za(this, !0);
  };
  function Za(a, b) {
    setTimeout(function () {
      var c = a.c,
        d = location.pathname + location.search;
      c != d &&
        a.a.shouldTrackUrlChange.call(a, d, c) &&
        ((a.c = d),
        a.b.set({ page: d, title: document.title }),
        (b || a.a.trackReplaceState) &&
          a.b.send(
            "pageview",
            y({ transport: "beacon" }, a.a.fieldsObj, a.b, a.a.hitFilter)
          ));
    }, 0);
  }
  f.shouldTrackUrlChange = function (a, b) {
    return !(!a || !b);
  };
  f.remove = function () {
    x(history, "pushState", this.H);
    x(history, "replaceState", this.I);
    window.removeEventListener("popstate", this.C);
  };
  G("urlChangeTracker", Ya);
})();
//# sourceMappingURL=autotrack.js.map
