'use strict';
var aa = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && b != null && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function r(a) {
    return ea(a())
}
da("globalThis", function(a) {
    return a || ca
});
da("Symbol.dispose", function(a) {
    return a ? a : Symbol("Symbol.dispose")
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    g[0] === "" && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var t = this || self;

function u(a, b) {
    a = a.split(".");
    b = b || t;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], b == null) return null;
    return b
}

function ha(a) {
    var b = typeof a;
    b = b != "object" ? b : a ? Array.isArray(a) ? "array" : b : "null";
    return b == "array" || b == "object" && typeof a.length == "number"
}

function ia(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function ja(a, b, c) {
    if (!a) throw Error();
    if (arguments.length > 2) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function ka(a, b, c) {
    ka = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? ia : ja;
    return ka.apply(null, arguments)
}

function w(a, b) {
    a = a.split(".");
    for (var c = t, d; a.length && (d = a.shift());) a.length || b === void 0 ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function la(a) {
    return a
}

function ma(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Ka = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.tb = function(d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g)
    }
};

function na(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, na);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    b !== void 0 && (this.cause = b)
}
ma(na, Error);
na.prototype.name = "CustomError";
const oa = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};
/*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
let pa = globalThis.trustedTypes,
    qa;

function ra() {
    let a = null;
    if (!pa) return a;
    try {
        const b = c => c;
        a = pa.createPolicy("goog#html", {
            createHTML: b,
            createScript: b,
            createScriptURL: b
        })
    } catch (b) {}
    return a
};
var sa = class {
    constructor(a) {
        this.h = a
    }
    toString() {
        return this.h + ""
    }
};

function ta(a, b = `unexpected value ${a}!`) {
    throw Error(b);
};

function ua(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function va(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function wa(a, b) {
    b = Array.prototype.indexOf.call(a, b, void 0);
    b >= 0 && Array.prototype.splice.call(a, b, 1)
}

function xa(a, b) {
    for (let c = 1; c < arguments.length; c++) {
        const d = arguments[c];
        if (ha(d)) {
            const e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (let g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};

function ya(a, b) {
    a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {});
    a.__closure__error__context__984382.severity = b
};

function za(a) {
    var b = u("window.location.href");
    a == null && (a = 'Unknown Error of type "null/undefined"');
    if (typeof a === "string") return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    let c, d;
    var e = !1;
    try {
        c = a.lineNumber || a.line || "Not available"
    } catch (f) {
        c = "Not available", e = !0
    }
    try {
        d = a.fileName || a.filename || a.sourceURL || t.$googDebugFname || b
    } catch (f) {
        d = "Not available", e = !0
    }
    b = Aa(a);
    if (!(!e && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        e = a.message;
        if (e ==
            null) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) e = a.constructor.name;
                else if (e = a.constructor, Ba[e]) e = Ba[e];
                else {
                    e = String(e);
                    if (!Ba[e]) {
                        const f = /function\s+([^\(]+)/m.exec(e);
                        Ba[e] = f ? f[1] : "[Anonymous]"
                    }
                    e = Ba[e]
                }
                e = 'Unknown Error of type "' + e + '"'
            } else e = "Unknown Error of unknown type";
            typeof a.toString === "function" && Object.prototype.toString !== a.toString && (e += ": " + a.toString())
        }
        return {
            message: e,
            name: a.name || "UnknownError",
            lineNumber: c,
            fileName: d,
            stack: b || "Not available"
        }
    }
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: b
    }
}

function Aa(a, b) {
    b || (b = {});
    b[Ca(a)] = !0;
    let c = a.stack || "";
    var d = a.cause;
    d && !b[Ca(d)] && (c += "\nCaused by: ", d.stack && d.stack.indexOf(d.toString()) == 0 || (c += typeof d === "string" ? d : d.message + "\n"), c += Aa(d, b));
    a = a.errors;
    if (Array.isArray(a)) {
        d = 1;
        let e;
        for (e = 0; e < a.length && !(d > 4); e++) b[Ca(a[e])] || (c += "\nInner error " + d++ + ": ", a[e].stack && a[e].stack.indexOf(a[e].toString()) == 0 || (c += typeof a[e] === "string" ? a[e] : a[e].message + "\n"), c += Aa(a[e], b));
        e < a.length && (c += "\n... " + (a.length - e) + " more inner errors")
    }
    return c
}

function Ca(a) {
    let b = "";
    typeof a.toString === "function" && (b = "" + a);
    return b + a.stack
}
var Ba = {};
var Da = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ea(a) {
    return a ? decodeURI(a) : a
}

function Fa(a, b, c) {
    if (Array.isArray(b))
        for (let d = 0; d < b.length; d++) Fa(a, String(b[d]), c);
    else b != null && c.push(a + (b === "" ? "" : "=" + encodeURIComponent(String(b))))
}

function Ga(a) {
    const b = [];
    for (const c in a) Fa(c, a[c], b);
    return b.join("&")
};

function Ha() {
    throw Error("Invalid UTF8");
}

function Ia(a, b) {
    b = String.fromCharCode.apply(null, b);
    return a == null ? b : a + b
}
let Ja = void 0,
    Ka;
const La = typeof TextDecoder !== "undefined";

function Ma(a) {
    t.setTimeout(() => {
        throw a;
    }, 0)
};
var Na, Oa = u("CLOSURE_FLAGS"),
    Pa = Oa && Oa[610401301];
Na = Pa != null ? Pa : !1;

function Qa() {
    var a = t.navigator;
    return a && (a = a.userAgent) ? a : ""
}
var Ra;
const Sa = t.navigator;
Ra = Sa ? Sa.userAgentData || null : null;

function Ta(a) {
    return Na ? Ra ? Ra.brands.some(({
        brand: b
    }) => b && b.indexOf(a) != -1) : !1 : !1
}

function x(a) {
    return Qa().indexOf(a) != -1
};

function Ua() {
    return Na ? !!Ra && Ra.brands.length > 0 : !1
}

function Va() {
    return Ua() ? Ta("Chromium") : (x("Chrome") || x("CriOS")) && !(Ua() ? 0 : x("Edge")) || x("Silk")
};
var Wa = Ua() ? !1 : x("Trident") || x("MSIE");
!x("Android") || Va();
Va();
var Xa = x("Safari") && !(Va() || (Ua() ? 0 : x("Coast")) || (Ua() ? 0 : x("Opera")) || (Ua() ? 0 : x("Edge")) || (Ua() ? Ta("Microsoft Edge") : x("Edg/")) || (Ua() ? Ta("Opera") : x("OPR")) || x("Firefox") || x("FxiOS") || x("Silk") || x("Android")) && !(x("iPhone") && !x("iPod") && !x("iPad") || x("iPad") || x("iPod"));
var Ya = {},
    Za = null;

function $a(a, b) {
    b === void 0 && (b = 0);
    ab();
    b = Ya[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            l = b[g >> 2];
        g = b[(g & 3) << 4 | h >> 4];
        h = b[(h & 15) << 2 | k >> 6];
        k = b[k & 63];
        c[f++] = "" + l + g + h + k
    }
    l = 0;
    k = d;
    switch (a.length - e) {
        case 2:
            l = a[e + 1], k = b[(l & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d
    }
    return c.join("")
}

function bb(a) {
    const b = a.length;
    let c = b * 3 / 4;
    c % 3 ? c = Math.floor(c) : "=.".indexOf(a[b - 1]) != -1 && (c = "=.".indexOf(a[b - 2]) != -1 ? c - 2 : c - 1);
    const d = new Uint8Array(c);
    let e = 0;
    cb(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function cb(a, b) {
    function c(e) {
        for (; d < a.length;) {
            const f = a.charAt(d++),
                g = Za[f];
            if (g != null) return g;
            if (!/^[\s\xa0]*$/.test(f)) throw Error("Unknown base64 encoding at char: " + f);
        }
        return e
    }
    ab();
    let d = 0;
    for (;;) {
        const e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
        if (h === 64 && e === -1) break;
        b(e << 2 | f >> 4);
        g != 64 && (b(f << 4 & 240 | g >> 2), h != 64 && b(g << 6 & 192 | h))
    }
}

function ab() {
    if (!Za) {
        Za = {};
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
            b = ["+/=", "+/", "-_=", "-_.", "-_"];
        for (let c = 0; c < 5; c++) {
            const d = a.concat(b[c].split(""));
            Ya[c] = d;
            for (let e = 0; e < d.length; e++) {
                const f = d[e];
                Za[f] === void 0 && (Za[f] = e)
            }
        }
    }
};
var db = typeof Uint8Array !== "undefined",
    eb = !Wa && typeof btoa === "function";

function fb(a) {
    if (!eb) return $a(a);
    let b = "",
        c = 0;
    const d = a.length - 10240;
    for (; c < d;) b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
    b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
    return btoa(b)
}
const gb = /[-_.]/g,
    hb = {
        "-": "+",
        _: "/",
        ".": "="
    };

function ib(a) {
    return hb[a] || ""
}

function jb(a) {
    if (!eb) return bb(a);
    gb.test(a) && (a = a.replace(gb, ib));
    a = atob(a);
    const b = new Uint8Array(a.length);
    for (let c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
    return b
}

function kb(a) {
    return db && a != null && a instanceof Uint8Array
}
var lb = {};

function mb() {
    return nb || (nb = new ob(null, lb))
}

function pb(a) {
    qb(lb);
    var b = a.h;
    b = b == null || kb(b) ? b : typeof b === "string" ? jb(b) : null;
    return b == null ? b : a.h = b
}
var ob = class {
    sizeBytes() {
        const a = pb(this);
        return a ? a.length : 0
    }
    constructor(a, b) {
        qb(b);
        this.h = a;
        if (a != null && a.length === 0) throw Error("ByteString should be constructed with non-empty values");
    }
};
let nb;

function qb(a) {
    if (a !== lb) throw Error("illegal external caller");
};
let rb = void 0;

function sb(a) {
    a = Error(a);
    ya(a, "warning");
    return a
}

function tb(a, b) {
    if (a != null) {
        var c;
        var d = (c = rb) != null ? c : rb = {};
        c = d[a] || 0;
        c >= b || (d[a] = c + 1, a = Error(), ya(a, "incident"), Ma(a))
    }
};
var ub = typeof Symbol === "function" && typeof Symbol() === "symbol",
    vb = new Set;

function wb(a, b, c = !1, d = !1) {
    a = typeof Symbol === "function" && typeof Symbol() === "symbol" ? d && Symbol.for && a ? Symbol.for(a) : a != null ? Symbol(a) : Symbol() : b;
    c && vb.add(a);
    return a
}
var xb = wb("jas", void 0, !0, !0),
    yb = wb(void 0, "2ex"),
    zb = wb(void 0, "1oa", !0),
    Ab = wb(void 0, Symbol(), !0),
    Bb = wb(void 0, "0actk");
[...Object.values({
    cb: 1,
    ab: 2,
    Za: 4,
    ib: 8,
    hb: 16,
    gb: 32,
    Qa: 64,
    ob: 128,
    Ya: 256,
    Xa: 512,
    bb: 1024,
    Va: 2048,
    nb: 4096,
    Wa: 8192,
    Ta: 16384
})];
const A = ub ? xb : "Ea",
    Cb = {
        Ea: {
            value: 0,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    },
    Db = Object.defineProperties;

function Eb(a, b) {
    ub || A in a || Db(a, Cb);
    a[A] |= b
}

function B(a, b) {
    ub || A in a || Db(a, Cb);
    a[A] = b
}

function Fb(a, b) {
    B(b, (a | 0) & -30975)
}

function Gb(a, b) {
    B(b, (a | 34) & -30941)
};

function Hb() {
    return typeof BigInt === "function"
};

function Ib(a) {
    return Array.prototype.slice.call(a)
};
var Jb = {};

function Kb(a) {
    return a !== null && typeof a === "object" && !Array.isArray(a) && a.constructor === Object
}
var Lb;
const Mb = [];
B(Mb, 55);
Lb = Object.freeze(Mb);

function Nb(a) {
    if (a & 2) throw Error();
}

function Ob(a, b) {
    const c = la(Ab);
    (b = c ? b[c] : void 0) && (a[Ab] = Ib(b))
}
var Pb = Object.freeze({});

function Qb(a) {
    a.Bb = !0;
    return a
};
var Rb = Qb(a => typeof a === "number"),
    Sb = Qb(a => typeof a === "string"),
    Tb = Qb(a => typeof a === "boolean"),
    Vb = Qb(a => a != null && typeof a === "object" && typeof a.then === "function");
var Wb = typeof t.BigInt === "function" && typeof t.BigInt(0) === "bigint";
var bc = Qb(a => Wb ? a >= Xb && a <= Yb : a[0] === "-" ? Zb(a, $b) : Zb(a, ac));
const $b = Number.MIN_SAFE_INTEGER.toString(),
    Xb = Wb ? BigInt(Number.MIN_SAFE_INTEGER) : void 0,
    ac = Number.MAX_SAFE_INTEGER.toString(),
    Yb = Wb ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;

function Zb(a, b) {
    if (a.length > b.length) return !1;
    if (a.length < b.length || a === b) return !0;
    for (let c = 0; c < a.length; c++) {
        const d = a[c],
            e = b[c];
        if (d > e) return !1;
        if (d < e) return !0
    }
};
const cc = typeof Uint8Array.prototype.slice === "function";
let C = 0,
    D = 0;

function dc(a) {
    const b = a >>> 0;
    C = b;
    D = (a - b) / 4294967296 >>> 0
}

function ec(a) {
    if (a < 0) {
        dc(0 - a);
        const [b, c] = fc(C, D);
        C = b >>> 0;
        D = c >>> 0
    } else dc(a)
}

function gc(a, b) {
    b >>>= 0;
    a >>>= 0;
    if (b <= 2097151) var c = "" + (4294967296 * b + a);
    else Hb() ? c = "" + (BigInt(b) << BigInt(32) | BigInt(a)) : (c = (a >>> 24 | b << 8) & 16777215, b = b >> 16 & 65535, a = (a & 16777215) + c * 6777216 + b * 6710656, c += b * 8147497, b *= 2, a >= 1E7 && (c += a / 1E7 >>> 0, a %= 1E7), c >= 1E7 && (b += c / 1E7 >>> 0, c %= 1E7), c = b + hc(c) + hc(a));
    return c
}

function hc(a) {
    a = String(a);
    return "0000000".slice(a.length) + a
}

function fc(a, b) {
    b = ~b;
    a ? a = ~a + 1 : b += 1;
    return [a, b]
};
const ic = typeof BigInt === "function" ? BigInt.asIntN : void 0,
    jc = Number.isSafeInteger,
    kc = Number.isFinite,
    lc = Math.trunc;

function mc(a) {
    return a.displayName || a.name || "unknown type name"
}
const nc = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;

function oc(a) {
    switch (typeof a) {
        case "bigint":
            return !0;
        case "number":
            return kc(a);
        case "string":
            return nc.test(a);
        default:
            return !1
    }
}

function pc(a) {
    if (a != null) {
        if (!kc(a)) throw sb("enum");
        a |= 0
    }
    return a
}

function qc(a) {
    if (typeof a !== "number") throw sb("int32");
    if (!kc(a)) throw sb("int32");
    return a | 0
}

function rc(a) {
    if (a == null) return a;
    if (typeof a === "string" && a) a = +a;
    else if (typeof a !== "number") return;
    return kc(a) ? a | 0 : void 0
}

function sc(a) {
    if (!oc(a)) throw sb("int64");
    switch (typeof a) {
        case "string":
            oc(a);
            var b = lc(Number(a));
            if (jc(b)) a = String(b);
            else if (b = a.indexOf("."), b !== -1 && (a = a.substring(0, b)), b = a.length, !(a[0] === "-" ? b < 20 || b === 20 && Number(a.substring(0, 7)) > -922337 : b < 19 || b === 19 && Number(a.substring(0, 6)) < 922337)) {
                if (a.length < 16) ec(Number(a));
                else if (Hb()) a = BigInt(a), C = Number(a & BigInt(4294967295)) >>> 0, D = Number(a >> BigInt(32) & BigInt(4294967295));
                else {
                    b = +(a[0] === "-");
                    D = C = 0;
                    var c = a.length;
                    for (let e = 0 + b, f = (c - b) % 6 + b; f <= c; e =
                        f, f += 6) {
                        var d = Number(a.slice(e, f));
                        D *= 1E6;
                        C = C * 1E6 + d;
                        C >= 4294967296 && (D += Math.trunc(C / 4294967296), D >>>= 0, C >>>= 0)
                    }
                    if (b) {
                        const [e, f] = fc(C, D);
                        C = e;
                        D = f
                    }
                }
                a = C;
                b = D;
                if (b & 2147483648)
                    if (Hb()) a = "" + (BigInt(b | 0) << BigInt(32) | BigInt(a >>> 0));
                    else {
                        const [e, f] = fc(a, b);
                        a = "-" + gc(e, f)
                    }
                else a = gc(a, b)
            }
            return a;
        case "bigint":
            b = a = ic(64, a);
            if (Sb(b)) {
                if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(b)) throw Error(String(b));
            } else if (Rb(b) && !Number.isSafeInteger(b)) throw Error(String(b));
            Wb ? a = BigInt(a) : a = Tb(a) ? a ? "1" : "0" : Sb(a) ? a.trim() || "0" :
                String(a);
            return a;
        default:
            oc(a);
            a = lc(a);
            if (!jc(a)) {
                ec(a);
                b = C;
                c = D;
                if (a = c & 2147483648) b = ~b + 1 >>> 0, c = ~c >>> 0, b == 0 && (c = c + 1 >>> 0);
                d = c * 4294967296 + (b >>> 0);
                b = Number.isSafeInteger(d) ? d : gc(b, c);
                a = typeof b === "number" ? a ? -b : b : a ? "-" + b : b
            }
            return a
    }
}

function tc(a) {
    if (a != null && typeof a !== "string") throw Error();
    return a
}

function uc(a, b) {
    if (!(a instanceof b)) throw Error(`Expected instanceof ${mc(b)} but got ${a&&mc(a.constructor)}`);
    return a
}

function vc(a, b, c) {
    if (a != null && typeof a === "object" && a.T === Jb) return a;
    if (Array.isArray(a)) {
        var d = a[A] | 0,
            e = d;
        e === 0 && (e |= c & 32);
        e |= c & 2;
        e !== d && B(a, e);
        return new b(a)
    }
};

function wc(a) {
    return a
};

function xc(a, b, c) {
    const d = Ib(a);
    var e = d.length;
    const f = b & 256 ? d[e - 1] : void 0;
    e += f ? -1 : 0;
    for (b = b & 512 ? 1 : 0; b < e; b++) d[b] = c(d[b]);
    if (f) {
        b = d[b] = {};
        for (const g in f) b[g] = c(f[g])
    }
    Ob(d, a);
    return d
}

function yc(a, b, c, d, e) {
    if (a != null) {
        if (Array.isArray(a)) {
            const f = a[A] | 0;
            return a.length === 0 && f & 1 ? void 0 : e && f & 2 ? a : zc(a, b, c, d !== void 0, e)
        }
        return b(a, d)
    }
}

function zc(a, b, c, d, e) {
    const f = d || c ? a[A] | 0 : 0;
    d = d ? !!(f & 32) : void 0;
    const g = Ib(a);
    let h = 0;
    const k = g.length;
    for (let v = 0; v < k; v++) {
        var l = g[v];
        if (v === k - 1 && Kb(l)) {
            var n = b,
                p = c,
                q = d,
                m = e;
            let z = void 0;
            for (let y in l) {
                const E = yc(l[y], n, p, q, m);
                if (E != null) {
                    let W;
                    ((W = z) != null ? W : z = {})[y] = E
                }
            }
            l = z
        } else l = yc(g[v], b, c, d, e);
        g[v] = l;
        l != null && (h = v + 1)
    }
    h < k && (g.length = h);
    c && (Ob(g, a), c(f, g));
    return g
}

function Ac(a) {
    switch (typeof a) {
        case "number":
            return Number.isFinite(a) ? a : "" + a;
        case "bigint":
            return bc(a) ? Number(a) : "" + a;
        case "boolean":
            return a ? 1 : 0;
        case "object":
            if (kb(a)) return fb(a);
            if (a.T === Jb) return Bc(a);
            if (a instanceof ob) {
                const b = a.h;
                return b == null ? "" : typeof b === "string" ? b : a.h = fb(b)
            }
            return
    }
    return a
}
let Cc;

function Dc(a) {
    try {
        return Bc(a)
    } finally {
        Cc = void 0
    }
}

function Bc(a) {
    var b = a.o;
    a = zc(b, Ac, void 0, void 0, !1);
    var c = b[A] | 0;
    if ((b = a.length) && !(c & 512)) {
        var d = a[b - 1],
            e = !1;
        Kb(d) ? (b--, e = !0) : d = void 0;
        var f, g = (f = Cc) != null ? f : wc;
        f = c & 512 ? 0 : -1;
        c = b - f;
        g = g(c, f, a, d);
        d && (a[b] = void 0);
        if (c < g && d) {
            c = !0;
            for (var h in d) {
                const k = +h;
                k <= g ? (e = k + f, a[e] = d[h], b = Math.max(e + 1, b), e = !1, delete d[h]) : c = !1
            }
            c && (d = void 0)
        }
        for (c = b - 1; b > 0; c = b - 1)
            if (h = a[c], h == null) b--, e = !0;
            else if (c -= f, c >= g) {
            let k;
            ((k = d) != null ? k : d = {})[c] = h;
            b--;
            e = !0
        } else break;
        e && (a.length = b);
        d && a.push(d)
    }
    return a
};
let Ec, Fc;

function Gc(a) {
    switch (typeof a) {
        case "boolean":
            return Ec || (Ec = [0, void 0, !0]);
        case "number":
            return a > 0 ? void 0 : a === 0 ? Fc || (Fc = [0, void 0]) : [-a, void 0];
        case "string":
            return [0, a];
        case "object":
            return a
    }
}

function Hc(a, b, c) {
    a = Ic(a, b[0], b[1], c ? 1 : 2);
    b !== Ec && c && Eb(a, 16384);
    return a
}

function Ic(a, b, c, d) {
    if (a == null) {
        var e = 96;
        c ? (a = [c], e |= 512) : a = [];
        b && (e = e & -33521665 | (b & 1023) << 15)
    } else {
        if (!Array.isArray(a)) throw Error("narr");
        e = a[A] | 0;
        16384 & e || !(64 & e) || 2 & e || Jc();
        if (e & 2048) throw Error("farr");
        if (e & 64) return a;
        d === 1 || d === 2 || (e |= 64);
        if (c && (e |= 512, c !== a[0])) throw Error("mid");
        a: {
            c = a;
            if (d = c.length) {
                const f = d - 1;
                if (Kb(c[f])) {
                    e |= 256;
                    b = f - (e & 512 ? 0 : -1);
                    if (b >= 1024) throw Error("pvtlmt");
                    e = e & -33521665 | (b & 1023) << 15;
                    break a
                }
            }
            if (b) {
                b = Math.max(b, d - (e & 512 ? 0 : -1));
                if (b > 1024) throw Error("spvt");
                e = e & -33521665 |
                    (b & 1023) << 15
            }
        }
    }
    B(a, e);
    return a
}

function Jc() {
    tb(Bb, 5)
};

function Kc(a, b, c = Gb) {
    if (a != null) {
        if (db && a instanceof Uint8Array) return b ? a : new Uint8Array(a);
        if (Array.isArray(a)) {
            var d = a[A] | 0;
            if (d & 2) return a;
            b && (b = d === 0 || !!(d & 32) && !(d & 64 || !(d & 16)));
            return b ? (B(a, (d | 34) & -12293), a) : zc(a, Kc, d & 4 ? Gb : c, !0, !0)
        }
        a.T === Jb && (c = a.o, d = c[A] | 0, a = d & 2 ? a : new a.constructor(Lc(c, d, !0)));
        return a
    }
}

function Lc(a, b, c) {
    const d = c || b & 2 ? Gb : Fb,
        e = !!(b & 32);
    a = xc(a, b, f => Kc(f, e, d));
    Eb(a, 32 | (c ? 2 : 0));
    return a
}

function Mc(a) {
    const b = a.o,
        c = b[A] | 0;
    return c & 2 ? new a.constructor(Lc(b, c, !1)) : a
};

function Nc(a, b) {
    a = a.o;
    return Oc(a, a[A] | 0, b)
}

function Oc(a, b, c, d) {
    if (c === -1) return null;
    const e = c + (b & 512 ? 0 : -1),
        f = a.length - 1;
    if (e >= f && b & 256) return a[f][c];
    if (d && b & 256 && (b = a[f][c], b != null)) return a[e] != null && tb(yb, 4), b;
    if (e <= f) return a[e]
}

function F(a, b, c) {
    const d = a.o;
    let e = d[A] | 0;
    Nb(e);
    G(d, e, b, c);
    return a
}

function G(a, b, c, d) {
    const e = b & 512 ? 0 : -1,
        f = c + e;
    var g = a.length - 1;
    if (f >= g && b & 256) return a[g][c] = d, b;
    if (f <= g) return a[f] = d, b & 256 && (a = a[g], c in a && delete a[c]), b;
    d !== void 0 && (g = b >> 15 & 1023 || 536870912, c >= g ? d != null && (a[g + e] = {
        [c]: d
    }, b |= 256, B(a, b)) : a[f] = d);
    return b
}

function Pc(a, b, c) {
    a = Oc(a, b, c);
    return Array.isArray(a) ? a : Lb
}

function Qc(a, b) {
    a === 0 && (a = Rc(a, b));
    return a | 1
}

function Sc(a) {
    return !!(2 & a) && !!(4 & a) || !!(2048 & a)
}

function Tc(a, b, c, d) {
    const e = a.o;
    var f = e[A] | 0;
    Nb(f);
    if (d == null) {
        var g = Uc(e);
        if (Vc(g, e, f, c) === b) g.set(c, 0);
        else return a
    } else {
        c.includes(b);
        g = Uc(e);
        const h = Vc(g, e, f, c);
        h !== b && (h && (f = G(e, f, h)), g.set(c, b))
    }
    G(e, f, b, d);
    return a
}

function Uc(a) {
    if (ub) {
        var b;
        return (b = a[zb]) != null ? b : a[zb] = new Map
    }
    if (zb in a) return a[zb];
    b = new Map;
    Object.defineProperty(a, zb, {
        value: b
    });
    return b
}

function Vc(a, b, c, d) {
    let e = a.get(d);
    if (e != null) return e;
    e = 0;
    for (let f = 0; f < d.length; f++) {
        const g = d[f];
        Oc(b, c, g) != null && (e !== 0 && (c = G(b, c, e)), e = g)
    }
    a.set(d, e);
    return e
}

function Wc(a, b, c, d) {
    let e = a[A] | 0;
    d = Oc(a, e, c, d);
    let f;
    if (d != null && d.T === Jb) return b = Mc(d), b !== d && G(a, e, c, b), b.o;
    if (Array.isArray(d)) {
        const g = d[A] | 0;
        g & 2 ? f = Hc(Lc(d, g, !1), b, !0) : g & 64 ? f = d : f = Hc(f, b, !0)
    } else f = Hc(void 0, b, !0);
    f !== d && G(a, e, c, f);
    return f
}

function Xc(a, b, c) {
    var d = a.o,
        e = d[A] | 0,
        f = Oc(d, e, c, !1);
    b = vc(f, b, e);
    b !== f && b != null && G(d, e, c, b);
    d = b;
    if (d == null) return d;
    a = a.o;
    e = a[A] | 0;
    e & 2 || (f = Mc(d), f !== d && (d = f, G(a, e, c, d)));
    return d
}

function Yc(a, b, c, d, e, f, g) {
    a = a.o;
    var h = !!(2 & b);
    const k = h ? 1 : e;
    f = !!f;
    g && (g = !h);
    e = Pc(a, b, d);
    var l = e[A] | 0;
    h = !!(4 & l);
    if (!h) {
        l = Qc(l, b);
        var n = e,
            p = b;
        const q = !!(2 & l);
        q && (p |= 2);
        let m = !q,
            v = !0,
            z = 0,
            y = 0;
        for (; z < n.length; z++) {
            const E = vc(n[z], c, p);
            if (E instanceof c) {
                if (!q) {
                    const W = !!((E.o[A] | 0) & 2);
                    m && (m = !W);
                    v && (v = W)
                }
                n[y++] = E
            }
        }
        y < z && (n.length = y);
        l |= 4;
        l = v ? l | 16 : l & -17;
        l = m ? l | 8 : l & -9;
        B(n, l);
        q && Object.freeze(n)
    }
    if (g && !(8 & l || !e.length && (k === 1 || k === 4 && 32 & l))) {
        Sc(l) && (e = Ib(e), l = Rc(l, b), b = G(a, b, d, e));
        c = e;
        g = l;
        for (n = 0; n < c.length; n++) l =
            c[n], p = Mc(l), l !== p && (c[n] = p);
        g |= 8;
        g = c.length ? g & -17 : g | 16;
        B(c, g);
        l = g
    }
    k === 1 || k === 4 && 32 & l ? Sc(l) || (b = l, l |= !e.length || 16 & l && (!h || 32 & l) ? 2 : 2048, l !== b && B(e, l), Object.freeze(e)) : (k === 2 && Sc(l) && (e = Ib(e), l = Rc(l, b), l = Zc(l, b, f), B(e, l), b = G(a, b, d, e)), Sc(l) || (d = l, l = Zc(l, b, f), l !== d && B(e, l)));
    return e
}

function H(a, b, c, d) {
    d != null ? uc(d, b) : d = void 0;
    return F(a, c, d)
}

function Rc(a, b) {
    a = (2 & b ? a | 2 : a & -3) | 32;
    return a &= -2049
}

function Zc(a, b, c) {
    32 & b && c || (a &= -33);
    return a
}

function $c(a, b, c, d) {
    const e = a.o[A] | 0;
    Nb(e);
    a = Yc(a, e, c, b, 2, !0);
    d = d != null ? uc(d, c) : new c;
    a.push(d);
    a[A] = (d.o[A] | 0) & 2 ? a[A] & -9 : a[A] & -17
}

function I(a, b) {
    a = Nc(a, b);
    return a == null || typeof a === "string" ? a : void 0
}

function ad(a, b) {
    let c;
    return (c = I(a, b)) != null ? c : ""
}

function bd(a, b) {
    var c = cd;
    const d = a.o;
    c = Vc(Uc(d), d, d[A] | 0, c);
    return I(a, c === b ? b : -1)
}

function J(a, b, c) {
    return F(a, b, tc(c))
};

function dd(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function ed() {
    return Error("Failed to read varint, encoding is invalid.")
}

function fd(a, b) {
    return Error(`Tried to read past the end of the data ${b} > ${a}`)
};

function gd(a) {
    if (typeof a === "string") return {
        buffer: jb(a),
        J: !1
    };
    if (Array.isArray(a)) return {
        buffer: new Uint8Array(a),
        J: !1
    };
    if (a.constructor === Uint8Array) return {
        buffer: a,
        J: !1
    };
    if (a.constructor === ArrayBuffer) return {
        buffer: new Uint8Array(a),
        J: !1
    };
    if (a.constructor === ob) return {
        buffer: pb(a) || new Uint8Array(0),
        J: !0
    };
    if (a instanceof Uint8Array) return {
        buffer: new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
        J: !1
    };
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
};

function hd(a) {
    const b = a.j;
    let c = a.h,
        d = b[c++],
        e = d & 127;
    if (d & 128 && (d = b[c++], e |= (d & 127) << 7, d & 128 && (d = b[c++], e |= (d & 127) << 14, d & 128 && (d = b[c++], e |= (d & 127) << 21, d & 128 && (d = b[c++], e |= d << 28, d & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128))))) throw ed();
    id(a, c);
    return e
}

function id(a, b) {
    a.h = b;
    if (b > a.i) throw fd(a.i, b);
}

function jd(a, b) {
    if (b < 0) throw Error(`Tried to read a negative byte length: ${b}`);
    const c = a.h,
        d = c + b;
    if (d > a.i) throw fd(b, a.i - c);
    a.h = d;
    return c
}
var kd = class {
        constructor(a, b) {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.init(a, void 0, void 0, b)
        }
        init(a, b, c, {
            Y: d = !1
        } = {}) {
            this.Y = d;
            a && (a = gd(a), this.j = a.buffer, this.m = a.J, this.l = b || 0, this.i = c !== void 0 ? this.l + c : this.j.length, this.h = this.l)
        }
        clear() {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.Y = !1
        }
        reset() {
            this.h = this.l
        }
    },
    ld = [];

function md(a, {
    ha: b = !1
} = {}) {
    a.ha = b
}

function nd(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.j = a.h.h;
    var c = hd(a.h) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(c >= 0 && c <= 5)) throw dd(c, a.j);
    if (b < 1) throw Error(`Invalid field number: ${b} (at position ${a.j})`);
    a.l = b;
    a.i = c;
    return !0
}

function od(a) {
    switch (a.i) {
        case 0:
            if (a.i != 0) od(a);
            else a: {
                a = a.h;
                var b = a.h;
                const c = b + 10,
                    d = a.j;
                for (; b < c;)
                    if ((d[b++] & 128) === 0) {
                        id(a, b);
                        break a
                    }
                throw ed();
            }
            break;
        case 1:
            a = a.h;
            id(a, a.h + 8);
            break;
        case 2:
            a.i != 2 ? od(a) : (b = hd(a.h) >>> 0, a = a.h, id(a, a.h + b));
            break;
        case 5:
            a = a.h;
            id(a, a.h + 4);
            break;
        case 3:
            b = a.l;
            do {
                if (!nd(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (a.i == 4) {
                    if (a.l != b) throw Error("Unmatched end-group tag");
                    break
                }
                od(a)
            } while (1);
            break;
        default:
            throw dd(a.i, a.j);
    }
}

function pd(a, b, c) {
    const d = a.h.i,
        e = hd(a.h) >>> 0,
        f = a.h.h + e;
    let g = f - d;
    g <= 0 && (a.h.i = f, c(b, a, void 0, void 0, void 0), g = f - a.h.h);
    if (g) throw Error("Message parsing ended unexpectedly. Expected to read " + `${e} bytes, instead read ${e-g} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
    a.h.h = f;
    a.h.i = d
}
var qd = class {
        constructor(a, b) {
            if (ld.length) {
                const c = ld.pop();
                c.init(a, void 0, void 0, b);
                a = c
            } else a = new kd(a, b);
            this.h = a;
            this.j = this.h.h;
            this.i = this.l = -1;
            md(this, b)
        }
        reset() {
            this.h.reset();
            this.j = this.h.h;
            this.i = this.l = -1
        }
    },
    rd = [];
var K = class {
    constructor(a, b, c) {
        this.o = Ic(a, b, c)
    }
    toJSON() {
        return Dc(this)
    }
    clone() {
        const a = this.o;
        return new this.constructor(Lc(a, a[A] | 0, !1))
    }
    J() {
        return !!((this.o[A] | 0) & 2)
    }
};
K.prototype.T = Jb;

function sd() {
    const a = class {
        constructor() {
            throw Error();
        }
    };
    Object.setPrototypeOf(a, a.prototype);
    return a
}
var td = sd();
var ud = class {
    constructor(a, b) {
        this.W = a;
        a = la(td);
        this.h = !!a && b === a || !1
    }
};
const vd = new ud(function(a, b, c, d, e) {
        if (a.i !== 2) return !1;
        pd(a, Wc(b, d, c), e);
        return !0
    }, td),
    wd = new ud(function(a, b, c, d, e) {
        if (a.i !== 2) return !1;
        pd(a, Wc(b, d, c, !0), e);
        return !0
    }, td);
var xd = Symbol(),
    yd = Symbol();
let zd, Ad;

function Bd(a) {
    var b = Cd,
        c = Dd,
        d = a[xd];
    if (d) return d;
    d = {};
    d.ub = a;
    d.la = Gc(a[0]);
    var e = a[1];
    let f = 1;
    e && e.constructor === Object && (d.extensions = e, e = a[++f], typeof e === "function" && (d.Fa = !0, zd != null || (zd = e), Ad != null || (Ad = a[f + 1]), e = a[f += 2]));
    const g = {};
    for (; e && Array.isArray(e) && e.length && typeof e[0] === "number" && e[0] > 0;) {
        for (var h = 0; h < e.length; h++) g[e[h]] = e;
        e = a[++f]
    }
    for (h = 1; e !== void 0;) {
        typeof e === "number" && (h += e, e = a[++f]);
        let n;
        var k = void 0;
        e instanceof ud ? n = e : (n = vd, f--);
        let p;
        if ((p = n) == null ? 0 : p.h) {
            e = a[++f];
            k = a;
            var l = f;
            typeof e === "function" && (e = e(), k[l] = e);
            k = e
        }
        e = a[++f];
        l = h + 1;
        typeof e === "number" && e < 0 && (l -= e, e = a[++f]);
        for (; h < l; h++) {
            const q = g[h];
            k ? c(d, h, n, k, q) : b(d, h, n, q)
        }
    }
    return a[xd] = d
};

function Cd(a, b, c, d) {
    const e = c.W;
    a[b] = d ? (f, g, h) => e(f, g, h, d) : e
}

function Dd(a, b, c, d, e) {
    const f = c.W;
    let g, h;
    a[b] = (k, l, n) => f(k, l, n, h || (h = Bd(d).la), g || (g = Ed(d)), e)
}

function Ed(a) {
    let b = a[yd];
    if (b != null) return b;
    const c = Bd(a);
    b = c.Fa ? (d, e) => zd(d, e, c) : (d, e) => {
        const f = d[A] | 0;
        for (; nd(e) && e.i != 4;) {
            var g = e.l,
                h = c[g];
            if (h == null) {
                var k = c.extensions;
                k && (k = k[g]) && (k = Fd(k), k != null && (h = c[g] = k))
            }
            if (h == null || !h(e, d, g)) {
                h = e;
                g = h.j;
                od(h);
                if (h.ha) h = void 0;
                else {
                    k = h.h.h - g;
                    h.h.h = g;
                    b: {
                        h = h.h;g = k;
                        if (g == 0) {
                            h = mb();
                            break b
                        }
                        const l = jd(h, g);h.Y && h.m ? g = h.j.subarray(l, l + g) : (h = h.j, k = l, g = l + g, g = k === g ? new Uint8Array(0) : cc ? h.slice(k, g) : new Uint8Array(h.subarray(k, g)));h = g.length == 0 ? mb() : new ob(g, lb)
                    }
                }
                g = d;
                h && ((k = g[Ab]) ? k.push(h) : g[Ab] = [h])
            }
        }
        f & 16384 && Eb(d, 34);
        return !0
    };
    return a[yd] = b
}

function Fd(a) {
    a = Array.isArray(a) ? a[0] instanceof ud ? a : [wd, a] : [a, void 0];
    const b = a[0].W;
    if (a = a[1]) {
        const c = Ed(a),
            d = Bd(a).la;
        return (e, f, g) => b(e, f, g, d, c)
    }
    return b
};
var Gd;
Gd = new ud(function(a, b, c) {
    if (a.i !== 2) return !1;
    var d = hd(a.h) >>> 0;
    a = a.h;
    var e = jd(a, d);
    a = a.j;
    if (La) {
        var f = a,
            g;
        (g = Ka) || (g = Ka = new TextDecoder("utf-8", {
            fatal: !0
        }));
        d = e + d;
        f = e === 0 && d === f.length ? f : f.subarray(e, d);
        try {
            var h = g.decode(f)
        } catch (l) {
            if (Ja === void 0) {
                try {
                    g.decode(new Uint8Array([128]))
                } catch (n) {}
                try {
                    g.decode(new Uint8Array([97])), Ja = !0
                } catch (n) {
                    Ja = !1
                }
            }!Ja && (Ka = void 0);
            throw l;
        }
    } else {
        h = e;
        d = h + d;
        e = [];
        let l = null;
        let n;
        for (; h < d;) {
            var k = a[h++];
            k < 128 ? e.push(k) : k < 224 ? h >= d ? Ha() : (n = a[h++], k < 194 || (n & 192) !==
                128 ? (h--, Ha()) : e.push((k & 31) << 6 | n & 63)) : k < 240 ? h >= d - 1 ? Ha() : (n = a[h++], (n & 192) !== 128 || k === 224 && n < 160 || k === 237 && n >= 160 || ((g = a[h++]) & 192) !== 128 ? (h--, Ha()) : e.push((k & 15) << 12 | (n & 63) << 6 | g & 63)) : k <= 244 ? h >= d - 2 ? Ha() : (n = a[h++], (n & 192) !== 128 || (k << 28) + (n - 144) >> 30 !== 0 || ((g = a[h++]) & 192) !== 128 || ((f = a[h++]) & 192) !== 128 ? (h--, Ha()) : (k = (k & 7) << 18 | (n & 63) << 12 | (g & 63) << 6 | f & 63, k -= 65536, e.push((k >> 10 & 1023) + 55296, (k & 1023) + 56320))) : Ha();
            e.length >= 8192 && (l = Ia(l, e), e.length = 0)
        }
        h = Ia(l, e)
    }
    G(b, b[A] | 0, c, h);
    return !0
}, sd());
var Hd = function(a, b, c = td) {
    return new ud(a, c)
}(function(a, b, c, d, e) {
    if (a.i !== 2) return !1;
    d = Hc(void 0, d, !0);
    var f = b[A] | 0;
    Nb(f);
    var g = !!(64 & f) || !(16384 & f);
    let h = Pc(b, f, c);
    const k = h !== Lb;
    if (g || !k) {
        let l = g = k ? h[A] | 0 : 0;
        if (!k || 2 & l || Sc(l) || 4 & l && !(32 & l)) h = Ib(h), l = Rc(l, f), f = G(b, f, c, h);
        l = Qc(l, f) & -13;
        l = Zc(l & -17, f, !0);
        l !== g && B(h, l)
    }
    h.push(d);
    pd(a, d, e);
    return !0
}, function(a, b, c, d, e) {
    if (Array.isArray(b))
        for (let l = 0; l < b.length; l++) {
            var f = e,
                g = a,
                h = g.h;
            var k = b[l];
            k = k instanceof K ? k.o : Array.isArray(k) ? Hc(k, d, !1) : void 0;
            h.call(g, c, k, f)
        }
});

function Id() {};

function Jd(a) {
    for (const b in a) return !1;
    return !0
}

function Kd(a) {
    if (!a || typeof a !== "object") return a;
    if (typeof a.clone === "function") return a.clone();
    if (typeof Map !== "undefined" && a instanceof Map) return new Map(a);
    if (typeof Set !== "undefined" && a instanceof Set) return new Set(a);
    if (a instanceof Date) return new Date(a.getTime());
    const b = Array.isArray(a) ? [] : typeof ArrayBuffer !== "function" || typeof ArrayBuffer.isView !== "function" || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = Kd(a[c]);
    return b
}
const Ld = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function Md(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < Ld.length; f++) c = Ld[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function Nd(a, b) {
    this.h = a === Od && b || ""
}
Nd.prototype.toString = function() {
    return this.h
};
var Od = {};
new Nd(Od, "");

function Pd(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a.indexOf("blob:") === 0 && (a = a.substring(5));
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    a.indexOf("//") == 0 && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/");
    c != -1 && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if (c !== "http" && c !== "https" && c !== "chrome-extension" &&
        c !== "moz-extension" && c !== "file" && c !== "android-app" && c !== "chrome-search" && c !== "chrome-untrusted" && c !== "chrome" && c !== "app" && c !== "devtools") throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (d != -1) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if (c === "http" && e !== "80" || c === "https" && e !== "443") a = ":" + e
    }
    return c + "://" + b + a
};

function Qd() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        n = l = 0
    }

    function b(p) {
        for (var q = g, m = 0; m < 64; m += 4) q[m / 4] = p[m] << 24 | p[m + 1] << 16 | p[m + 2] << 8 | p[m + 3];
        for (m = 16; m < 80; m++) p = q[m - 3] ^ q[m - 8] ^ q[m - 14] ^ q[m - 16], q[m] = (p << 1 | p >>> 31) & 4294967295;
        p = e[0];
        var v = e[1],
            z = e[2],
            y = e[3],
            E = e[4];
        for (m = 0; m < 80; m++) {
            if (m < 40)
                if (m < 20) {
                    var W = y ^ v & (z ^ y);
                    var Ub = 1518500249
                } else W = v ^ z ^ y, Ub = 1859775393;
            else m < 60 ? (W = v & z | y & (v | z), Ub = 2400959708) : (W = v ^ z ^ y, Ub = 3395469782);
            W = ((p << 5 | p >>> 27) & 4294967295) + W + E + Ub + q[m] & 4294967295;
            E = y;
            y = z;
            z = (v << 30 | v >>> 2) & 4294967295;
            v = p;
            p = W
        }
        e[0] = e[0] + p & 4294967295;
        e[1] = e[1] + v & 4294967295;
        e[2] = e[2] + z & 4294967295;
        e[3] = e[3] + y & 4294967295;
        e[4] = e[4] + E & 4294967295
    }

    function c(p, q) {
        if (typeof p === "string") {
            p = unescape(encodeURIComponent(p));
            for (var m = [], v = 0, z = p.length; v < z; ++v) m.push(p.charCodeAt(v));
            p = m
        }
        q || (q = p.length);
        m = 0;
        if (l == 0)
            for (; m + 64 < q;) b(p.slice(m, m + 64)), m += 64, n += 64;
        for (; m < q;)
            if (f[l++] = p[m++], n++, l == 64)
                for (l = 0, b(f); m + 64 < q;) b(p.slice(m, m + 64)), m += 64, n += 64
    }

    function d() {
        var p = [],
            q = n * 8;
        l < 56 ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var m = 63; m >= 56; m--) f[m] = q & 255, q >>>= 8;
        b(f);
        for (m = q = 0; m < 5; m++)
            for (var v = 24; v >= 0; v -= 8) p[q++] = e[m] >> v & 255;
        return p
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; k < 64; ++k) h[k] = 0;
    var l, n;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        ya: function() {
            for (var p = d(), q = "", m = 0; m < p.length; m++) q += "0123456789ABCDEF".charAt(Math.floor(p[m] / 16)) + "0123456789ABCDEF".charAt(p[m] % 16);
            return q
        }
    }
};

function Rd(a, b, c) {
    var d = String(t.location.href);
    return d && a && b ? [b, Sd(Pd(d), a, c || null)].join(" ") : null
}

function Sd(a, b, c) {
    var d = [];
    let e = [];
    if ((Array.isArray(c) ? 2 : 1) == 1) return e = [b, a], ua(d, function(h) {
        e.push(h)
    }), Td(e.join(" "));
    const f = [],
        g = [];
    ua(c, function(h) {
        g.push(h.key);
        f.push(h.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = f.length == 0 ? [c, b, a] : [f.join(":"), c, b, a];
    ua(d, function(h) {
        e.push(h)
    });
    a = Td(e.join(" "));
    a = [c, a];
    g.length == 0 || a.push(g.join(""));
    return a.join("_")
}

function Td(a) {
    const b = Qd();
    b.update(a);
    return b.ya().toLowerCase()
};

function Ud() {
    this.h = document || {
        cookie: ""
    }
}
Ud.prototype.isEnabled = function() {
    if (!t.navigator.cookieEnabled) return !1;
    if (this.h.cookie) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        ka: 60
    });
    if (this.get("TESTCOOKIESENABLED") !== "1") return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
Ud.prototype.set = function(a, b, c) {
    let d, e, f, g = !1,
        h;
    typeof c === "object" && (h = c.Ob, g = c.Pb || !1, f = c.domain || void 0, e = c.path || void 0, d = c.ka);
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    d === void 0 && (d = -1);
    this.h.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (e ? ";path=" + e : "") + (d < 0 ? "" : d == 0 ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + d * 1E3)).toUTCString()) + (g ? ";secure" : "") + (h != null ? ";samesite=" + h : "")
};
Ud.prototype.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = oa(d[e]);
        if (f.lastIndexOf(c, 0) == 0) return f.slice(c.length);
        if (f == a) return ""
    }
    return b
};
Ud.prototype.remove = function(a, b, c) {
    const d = this.get(a) !== void 0;
    this.set(a, "", {
        ka: 0,
        path: b,
        domain: c
    });
    return d
};
Ud.prototype.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = oa(a[f]), d = e.indexOf("="), d == -1 ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; a >= 0; a--) this.remove(b[a])
};

function Vd(a, b, c, d) {
    (a = t[a]) || typeof document === "undefined" || (a = (new Ud).get(b));
    return a ? Rd(a, c, d) : null
};
var Wd = typeof AsyncContext !== "undefined" && typeof AsyncContext.Snapshot === "function" ? a => a && AsyncContext.Snapshot.wrap(a) : a => a;

function Xd() {
    this.l = this.l;
    this.i = this.i
}
Xd.prototype.l = !1;
Xd.prototype.dispose = function() {
    this.l || (this.l = !0, this.m())
};
Xd.prototype[Symbol.dispose] = function() {
    this.dispose()
};
Xd.prototype.addOnDisposeCallback = function(a, b) {
    this.l ? b !== void 0 ? a.call(b) : a() : (this.i || (this.i = []), b && (a = a.bind(b)), this.i.push(a))
};
Xd.prototype.m = function() {
    if (this.i)
        for (; this.i.length;) this.i.shift()()
};

function Yd(a, b) {
    a.l(b);
    a.i < 100 && (a.i++, b.next = a.h, a.h = b)
}
class Zd {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        this.i > 0 ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};
class $d {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = ae.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var ae = new Zd(() => new be, a => a.reset());
class be {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};
let ce, de = !1,
    ee = new $d,
    ge = (a, b) => {
        ce || fe();
        de || (ce(), de = !0);
        ee.add(a, b)
    },
    fe = () => {
        const a = Promise.resolve(void 0);
        ce = () => {
            a.then(he)
        }
    };

function he() {
    let a;
    for (; a = ee.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            Ma(b)
        }
        Yd(ae, a)
    }
    de = !1
};

function L(a) {
    this.h = 0;
    this.v = void 0;
    this.l = this.i = this.j = null;
    this.m = this.s = !1;
    if (a != Id) try {
        const b = this;
        a.call(void 0, function(c) {
            ie(b, 2, c)
        }, function(c) {
            ie(b, 3, c)
        })
    } catch (b) {
        ie(this, 3, b)
    }
}

function je() {
    this.next = this.context = this.i = this.j = this.h = null;
    this.l = !1
}
je.prototype.reset = function() {
    this.context = this.i = this.j = this.h = null;
    this.l = !1
};
var ke = new Zd(function() {
    return new je
}, function(a) {
    a.reset()
});

function le(a, b, c) {
    const d = ke.get();
    d.j = a;
    d.i = b;
    d.context = c;
    return d
}

function me(a) {
    if (a instanceof L) return a;
    const b = new L(Id);
    ie(b, 2, a);
    return b
}
L.prototype.then = function(a, b, c) {
    return ne(this, Wd(typeof a === "function" ? a : null), Wd(typeof b === "function" ? b : null), c)
};
L.prototype.$goog_Thenable = !0;
L.prototype.C = function(a, b) {
    return ne(this, null, Wd(a), b)
};
L.prototype.catch = L.prototype.C;
L.prototype.cancel = function(a) {
    if (this.h == 0) {
        const b = new oe(a);
        ge(function() {
            pe(this, b)
        }, this)
    }
};

function pe(a, b) {
    if (a.h == 0)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                var d = 0,
                    e = null,
                    f = null;
                for (let g = c.i; g && (g.l || (d++, g.h == a && (e = g), !(e && d > 1))); g = g.next) e || (f = g);
                e && (c.h == 0 && d == 1 ? pe(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : qe(c), re(c, e, 3, b)))
            }
            a.j = null
        } else ie(a, 3, b)
}

function se(a, b) {
    a.i || a.h != 2 && a.h != 3 || te(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function ne(a, b, c, d) {
    const e = le(null, null, null);
    e.h = new L(function(f, g) {
        e.j = b ? function(h) {
            try {
                const k = b.call(d, h);
                f(k)
            } catch (k) {
                g(k)
            }
        } : f;
        e.i = c ? function(h) {
            try {
                const k = c.call(d, h);
                k === void 0 && h instanceof oe ? g(h) : f(k)
            } catch (k) {
                g(k)
            }
        } : g
    });
    e.h.j = a;
    se(a, e);
    return e.h
}
L.prototype.H = function(a) {
    this.h = 0;
    ie(this, 2, a)
};
L.prototype.K = function(a) {
    this.h = 0;
    ie(this, 3, a)
};

function ie(a, b, c) {
    if (a.h == 0) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.H,
                f = a.K;
            if (d instanceof L) {
                se(d, le(e || Id, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var h = !!d.$goog_Thenable
                } catch (k) {
                    h = !1
                } else h = !1;
                if (h) d.then(e, f, a), g = !0;
                else {
                    h = typeof d;
                    if (h == "object" && d != null || h == "function") try {
                        const k = d.then;
                        if (typeof k === "function") {
                            ue(d, k, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (k) {
                        f.call(a, k);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.v = c, a.h = b, a.j = null, te(a), b != 3 || c instanceof oe || ve(a, c))
    }
}

function ue(a, b, c, d, e) {
    function f(k) {
        h || (h = !0, d.call(e, k))
    }

    function g(k) {
        h || (h = !0, c.call(e, k))
    }
    let h = !1;
    try {
        b.call(a, g, f)
    } catch (k) {
        f(k)
    }
}

function te(a) {
    a.s || (a.s = !0, ge(a.B, a))
}

function qe(a) {
    let b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
L.prototype.B = function() {
    let a;
    for (; a = qe(this);) re(this, a, this.h, this.v);
    this.s = !1
};

function re(a, b, c, d) {
    if (c == 3 && b.i && !b.l)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, we(b, c, d);
    else try {
        b.l ? b.j.call(b.context) : we(b, c, d)
    } catch (e) {
        xe.call(null, e)
    }
    Yd(ke, b)
}

function we(a, b, c) {
    b == 2 ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c)
}

function ve(a, b) {
    a.m = !0;
    ge(function() {
        a.m && xe.call(null, b)
    })
}
var xe = Ma;

function oe(a) {
    na.call(this, a)
}
ma(oe, na);
oe.prototype.name = "cancel";
const ye = self;
class ze {
    constructor() {
        this.promise = new Promise((a, b) => {
            this.resolve = a;
            this.reject = b
        })
    }
};

function M(a) {
    Xd.call(this);
    this.H = 1;
    this.s = [];
    this.v = 0;
    this.h = [];
    this.j = {};
    this.X = !!a
}
ma(M, Xd);
M.prototype.K = function(a, b, c) {
    let d = this.j[a];
    d || (d = this.j[a] = []);
    const e = this.H;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.H = e + 3;
    d.push(e);
    return e
};
M.prototype.C = function(a) {
    const b = this.h[a];
    if (b) {
        const c = this.j[b];
        this.v != 0 ? (this.s.push(a), this.h[a + 1] = () => {}) : (c && wa(c, a), delete this.h[a], delete this.h[a + 1], delete this.h[a + 2])
    }
    return !!b
};
M.prototype.B = function(a, b) {
    var c = this.j[a];
    if (c) {
        const e = Array(arguments.length - 1);
        var d = arguments.length;
        let f;
        for (f = 1; f < d; f++) e[f - 1] = arguments[f];
        if (this.X)
            for (f = 0; f < c.length; f++) d = c[f], Ae(this.h[d + 1], this.h[d + 2], e);
        else {
            this.v++;
            try {
                for (f = 0, d = c.length; f < d && !this.l; f++) {
                    const g = c[f];
                    this.h[g + 1].apply(this.h[g + 2], e)
                }
            } finally {
                if (this.v--, this.s.length > 0 && this.v == 0)
                    for (; c = this.s.pop();) this.C(c)
            }
        }
        return f != 0
    }
    return !1
};

function Ae(a, b, c) {
    ge(function() {
        a.apply(b, c)
    })
}
M.prototype.clear = function(a) {
    if (a) {
        const b = this.j[a];
        b && (b.forEach(this.C, this), delete this.j[a])
    } else this.h.length = 0, this.j = {}
};
M.prototype.m = function() {
    M.Ka.m.call(this);
    this.clear();
    this.s.length = 0
};
/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
let N = {};
var Be = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
N.assign = function(a) {
    for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
        var c = b.shift();
        if (c) {
            if (typeof c !== "object") throw new TypeError(c + "must be non-object");
            for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
        }
    }
    return a
};
N.Sb = function(a, b) {
    if (a.length === b) return a;
    if (a.subarray) return a.subarray(0, b);
    a.length = b;
    return a
};
var Ce = {
        va: function(a, b, c, d, e) {
            if (b.subarray && a.subarray) a.set(b.subarray(c, c + d), e);
            else
                for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        za: function(a) {
            var b, c;
            var d = c = 0;
            for (b = a.length; d < b; d++) c += a[d].length;
            var e = new Uint8Array(c);
            d = c = 0;
            for (b = a.length; d < b; d++) {
                var f = a[d];
                e.set(f, c);
                c += f.length
            }
            return e
        }
    },
    De = {
        va: function(a, b, c, d, e) {
            for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        za: function(a) {
            return [].concat.apply([], a)
        }
    };
N.Ja = function() {
    Be ? (N.qa = Uint8Array, N.oa = Uint16Array, N.pa = Int32Array, N.assign(N, Ce)) : (N.qa = Array, N.oa = Array, N.pa = Array, N.assign(N, De))
};
N.Ja();
try {
    new Uint8Array(1)
} catch (a) {};

function Ee(a) {
    for (var b = a.length; --b >= 0;) a[b] = 0
}
Ee(Array(576));
Ee(Array(60));
Ee(Array(512));
Ee(Array(256));
Ee(Array(29));
Ee(Array(30));
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Fe = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var Ge = class {
    constructor(a) {
        this.name = a
    }
};
var He = new Ge("rawColdConfigGroup");
var Ie = new Ge("rawHotConfigGroup");
var Je = class extends K {
    constructor(a) {
        super(a)
    }
};
var Ke = class extends K {
    constructor(a) {
        super(a)
    }
};
var Le = class extends K {
    constructor(a) {
        super(a)
    }
};
var Me = class extends K {
    constructor(a) {
        super(a)
    }
    getPlayerType() {
        var a = Nc(this, 36);
        a = a == null ? a : kc(a) ? a | 0 : void 0;
        return a != null ? a : 0
    }
    setHomeGroupInfo(a) {
        return H(this, Le, 81, a)
    }
    clearLocationPlayabilityToken() {
        return F(this, 89)
    }
};
var Ne = class extends K {
        constructor(a) {
            super(a)
        }
        getKey() {
            return ad(this, 1)
        }
    },
    Oe = [2, 3, 4, 5, 6];
var Pe = class extends K {
    constructor(a) {
        super(a)
    }
    setTrackingParams(a) {
        if (a != null)
            if (typeof a === "string") a = a ? new ob(a, lb) : mb();
            else if (a.constructor !== ob)
            if (kb(a)) a = a.length ? new ob(new Uint8Array(a), lb) : mb();
            else throw Error();
        return F(this, 1, a)
    }
};
var Qe = class extends K {
    constructor(a) {
        super(a)
    }
};
var Re = class extends K {
    constructor(a) {
        super(a)
    }
};
var Se = class extends K {
    constructor(a) {
        super(a)
    }
};
var Te = class extends K {
    constructor(a) {
        super(a)
    }
    setSafetyMode(a) {
        return F(this, 5, pc(a))
    }
};
var Ue = class extends K {
    constructor(a) {
        super(a)
    }
    j(a) {
        return H(this, Me, 1, a)
    }
};
var Ve = class extends K {
    constructor(a) {
        super(a, 500)
    }
};
var We = class extends K {
    constructor(a) {
        super(a)
    }
};
var Xe = class extends K {
        constructor(a) {
            super(a)
        }
        setVideoId(a) {
            return Tc(this, 1, cd, tc(a))
        }
        getPlaylistId() {
            return bd(this, 2)
        }
    },
    cd = [1, 2];
var Ye = class extends K {
    constructor(a) {
        super(a)
    }
};
var Ze = new Ge("recordNotificationInteractionsEndpoint");
var $e = ["notification/convert_endpoint_to_url"],
    af = ["notification/record_interactions"],
    bf = ["notification_registration/set_registration"];
var cf = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var df = ["notifications_register", "notifications_check_registration"];
var ef = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};
let ff = null;

function O(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return gf().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function hf() {
    return O("IndexedDBCheck", "testing IndexedDB").then(() => jf("IndexedDBCheck")).then(a => a === "testing IndexedDB" ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function jf(a) {
    const b = new ef("Error accessing DB");
    return gf().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function gf() {
    return ff ? Promise.resolve(ff) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) ff = d, a(ff);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), gf()
        };
        c.onupgradeneeded = kf
    })
}

function kf(a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const lf = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function mf(a) {
    if (a.length === 1) return a[0];
    var b = lf.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries(lf).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function nf(a) {
    return `/youtubei/v1/${mf(a)}`
};
var of = class extends K {
    constructor(a) {
        super(a)
    }
};
var pf = class extends K {
    constructor(a) {
        super(a, 0, "yt.sw.adr")
    }
};
const qf = t.window;
let rf, sf;
const tf = (qf == null ? void 0 : (rf = qf.yt) == null ? void 0 : rf.config_) || (qf == null ? void 0 : (sf = qf.ytcfg) == null ? void 0 : sf.data_) || {};
w("yt.config_", tf);

function P(...a) {
    a = arguments;
    a.length > 1 ? tf[a[0]] = a[1] : a.length === 1 && Object.assign(tf, a[0])
}

function Q(a, b) {
    return a in tf ? tf[a] : b
};
const uf = [];

function vf(a) {
    uf.forEach(b => b(a))
}

function wf(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            xf(b)
        }
    } : a
}

function xf(a) {
    var b = u("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0, void 0, void 0) : (b = Q("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0, void 0, void 0]), P("ERRORS", b));
    vf(a)
}

function yf(a) {
    var b = u("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0, void 0, void 0) : (b = Q("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0, void 0, void 0]), P("ERRORS", b))
};
const zf = /^[\w.]*$/,
    Af = {
        q: !0,
        search_query: !0
    };

function Bf(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const h = b[f].split("=");
        if (h.length === 1 && h[0] || h.length === 2) try {
            const k = Cf(h[0] || ""),
                l = Cf(h[1] || "");
            if (k in c) {
                const n = c[k];
                Array.isArray(n) ? xa(n, l) : c[k] = [n, l]
            } else c[k] = l
        } catch (k) {
            var d = k,
                e = h[0];
            const l = String(Bf);
            d.args = [{
                key: e,
                value: h[1],
                query: a,
                method: Df === l ? "unchanged" : l
            }];
            Af.hasOwnProperty(e) || yf(d)
        }
    }
    return c
}
const Df = String(Bf);

function Ef(a) {
    a.charAt(0) === "?" && (a = a.substring(1));
    return Bf(a, "&")
}

function Ff(a, b) {
    return Gf(a, b || {}, !0)
}

function Gf(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = d.length > 1 ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = Ef(e[1] || "");
    for (var f in b) !c && e !== null && f in e || (e[f] = b[f]);
    b = a;
    a = Ga(e);
    a ? (c = b.indexOf("#"), c < 0 && (c = b.length), f = b.indexOf("?"), f < 0 || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.slice(0, f), e, b.slice(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function Hf(a) {
    if (!b) var b = window.location.href;
    const c = a.match(Da)[1] || null,
        d = Ea(a.match(Da)[3] || null);
    c && d ? (a = a.match(Da), b = b.match(Da), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ea(b.match(Da)[3] || null) === d && (Number(b.match(Da)[4] || null) || null) === (Number(a.match(Da)[4] || null) || null) : !0;
    return a
}

function Cf(a) {
    return a && a.match(zf) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};

function If(a, b) {
    typeof a === "function" && (a = wf(a));
    return window.setTimeout(a, b)
};
var Jf = "client_dev_domain client_dev_expflag client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" "),
    Kf = [...Jf, "client_dev_set_cookie"];

function R(a) {
    a = Lf(a);
    return typeof a === "string" && a === "false" ? !1 : !!a
}

function S(a, b) {
    a = Lf(a);
    return a === void 0 && b !== void 0 ? b : Number(a || 0)
}

function Mf() {
    return Q("EXPERIMENTS_TOKEN", "")
}

function Lf(a) {
    return Q("EXPERIMENT_FLAGS", {})[a]
}

function Nf() {
    const a = [],
        b = Q("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c of Object.keys(b)) a.push({
        key: c,
        value: String(b[c])
    });
    c = Q("EXPERIMENT_FLAGS", {});
    for (const d of Object.keys(c)) d.startsWith("force_") && b[d] === void 0 && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
[...Jf];
let Of = !1;

function Pf(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    b.priority && (c.priority = b.priority);
    a = Qf(a, b);
    const d = Rf(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || t;
    let f = !1,
        g;
    fetch(a, c).then(h => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var k = h.ok,
                l = n => {
                    n = n || {};
                    k ? b.onSuccess && b.onSuccess.call(e, n, h) : b.onError && b.onError.call(e, n, h);
                    b.onFinish && b.onFinish.call(e, n, h)
                };
            (b.format || "JSON") === "JSON" && (k || h.status >= 400 && h.status < 500) ? h.json().then(l, () => {
                l(null)
            }): l(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    a = b.timeout || 0;
    b.onFetchTimeout && a > 0 && (g = If(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || t))
    }, a))
}

function Qf(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = Q("XSRF_FIELD_NAME");
    if (b = b.urlParams) b[c] && delete b[c], a = Ff(a, b);
    return a
}

function Rf(a, b) {
    const c = Q("XSRF_FIELD_NAME"),
        d = Q("XSRF_TOKEN");
    var e = b.postBody || "",
        f = b.postParams;
    const g = Q("XSRF_FIELD_NAME");
    let h;
    b.headers && (h = b.headers["Content-Type"]);
    b.excludeXsrf || Ea(a.match(Da)[3] || null) && !b.withCredentials && Ea(a.match(Da)[3] || null) !== document.location.hostname || b.method !== "POST" || h && h !== "application/x-www-form-urlencoded" || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    (R("ajax_parse_query_data_only_when_filled") && f && Object.keys(f).length > 0 || f) && typeof e === "string" &&
        (e = Ef(e), Md(e, f), e = b.postBodyFormat && b.postBodyFormat === "JSON" ? JSON.stringify(e) : Ga(e));
    f = e || f && !Jd(f);
    !Of && f && b.method !== "POST" && (Of = !0, xf(Error("AJAX request with postData should use POST")));
    return e
};
const Sf = [{
    ba: a => `Cannot read property '${a.key}'`,
    U: {
        Error: [{
            u: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            u: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            u: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            u: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            u: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            u: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            u: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    ba: a => `Cannot call '${a.key}'`,
    U: {
        TypeError: [{
            u: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
            groups: ["base", "key"]
        }, {
            u: /([^ ]+) called on (null or undefined)/,
            groups: ["key", "value"]
        }, {
            u: /Object (.*) has no method '([^ ]+)'/,
            groups: ["base", "key"]
        }, {
            u: /Object doesn't support property or method '([^ ]+)'/,
            groups: ["key"]
        }, {
            u: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
            groups: ["key"]
        }, {
            u: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
            groups: ["key"]
        }]
    }
}, {
    ba: a => `${a.key} is not defined`,
    U: {
        ReferenceError: [{
            u: /(.*) is not defined/,
            groups: ["key"]
        }, {
            u: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var Uf = {
    F: [],
    D: [{
        callback: Tf,
        weight: 500
    }]
};

function Tf(a) {
    if (a.name === "JavaException") return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function Vf() {
    if (!Wf) {
        var a = Wf = new Xf;
        a.F.length = 0;
        a.D.length = 0;
        Yf(a, Uf)
    }
    return Wf
}

function Yf(a, b) {
    b.F && a.F.push.apply(a.F, b.F);
    b.D && a.D.push.apply(a.D, b.D)
}
var Xf = class {
        constructor() {
            this.D = [];
            this.F = []
        }
    },
    Wf;
const Zf = new M;

function $f(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = ag(d);
        if (e === Infinity) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = ag(d);
                if (f === 2) return e;
                break;
            case 1:
                if (f === 2) return;
                c += 8;
                break;
            case 2:
                e = ag(d);
                if (f === 2) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (f === 2) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function ag(a) {
    let b = a(),
        c = b & 127;
    if (b < 128) return c;
    b = a();
    c |= (b & 127) << 7;
    if (b < 128) return c;
    b = a();
    c |= (b & 127) << 14;
    if (b < 128) return c;
    b = a();
    return b < 128 ? c | (b & 127) << 21 : Infinity
};

function bg(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += cg(d, a[d], b, c), e > 500)); d++);
            d = e
        } else if (typeof a === "object")
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    h = b,
                    k = c;
                f = typeof g !== "string" || f !== "clickTrackingParams" && f !== "trackingParams" ? 0 : (g = $f(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? cg(`${f}.ve`, g, h, k) : 0;
                d += f;
                d += cg(e, a[e], b, c);
                if (d > 500) break
            }
        } else c[b] = dg(a), d += c[b].length;
    else c[b] = dg(a), d += c[b].length;
    return d
}

function cg(a, b, c, d) {
    c += `.${a}`;
    a = dg(b);
    d[c] = a;
    return c.length + a.length
}

function dg(a) {
    try {
        return (typeof a === "string" ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};

function eg() {
    fg.h || (fg.h = new fg);
    return fg.h
}

function gg(a, b) {
    a = {};
    var c = [];
    "USER_SESSION_ID" in tf && c.push({
        key: "u",
        value: Q("USER_SESSION_ID")
    });
    var d = Pd(String(t.location.href));
    var e = [];
    var f;
    (f = t.__SAPISID || t.__APISID || t.__3PSAPISID || t.__1PSAPISID || t.__OVERRIDE_SID) ? f = !0: (typeof document !== "undefined" && (f = new Ud, f = f.get("SAPISID") || f.get("APISID") || f.get("__Secure-3PAPISID") || f.get("__Secure-1PAPISID")), f = !!f);
    f && (f = (d = d.indexOf("https:") == 0 || d.indexOf("chrome-extension:") == 0 || d.indexOf("chrome-untrusted://new-tab-page") == 0 || d.indexOf("moz-extension:") ==
        0) ? t.__SAPISID : t.__APISID, f || typeof document === "undefined" || (f = new Ud, f = f.get(d ? "SAPISID" : "APISID") || f.get("__Secure-3PAPISID")), (f = f ? Rd(f, d ? "SAPISIDHASH" : "APISIDHASH", c) : null) && e.push(f), d && ((d = Vd("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", c)) && e.push(d), (c = Vd("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", c)) && e.push(c)));
    if (e = e.length == 0 ? null : e.join(" ")) a.Authorization = e, e = b = b == null ? void 0 : b.sessionIndex, e === void 0 && (e = Number(Q("SESSION_INDEX", 0)), e = isNaN(e) ? 0 : e), R("voice_search_auth_header_removal") ||
        (a["X-Goog-AuthUser"] = e.toString()), "INNERTUBE_HOST_OVERRIDE" in tf || (a["X-Origin"] = window.location.origin), b === void 0 && "DELEGATED_SESSION_ID" in tf && (a["X-Goog-PageId"] = Q("DELEGATED_SESSION_ID"));
    return a
}
var fg = class {
    constructor() {
        this.La = !0
    }
};
var hg = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};

function ig(a) {
    switch (a) {
        case "DESKTOP":
            return 1;
        case "UNKNOWN_PLATFORM":
            return 0;
        case "TV":
            return 2;
        case "GAME_CONSOLE":
            return 3;
        case "MOBILE":
            return 4;
        case "TABLET":
            return 5
    }
};
w("ytglobal.prefsUserPrefsPrefs_", u("ytglobal.prefsUserPrefsPrefs_") || {});

function jg() {
    if (Q("DATASYNC_ID") !== void 0) return Q("DATASYNC_ID");
    throw new ef("Datasync ID not set", "unknown");
};

function kg(a, b) {
    return lg(a, 0, b)
}

function mg(a) {
    const b = u("yt.scheduler.instance.addImmediateJob");
    b ? b(a) : a()
}
var ng = class {
    h(a) {
        lg(a, 1)
    }
};

function og() {
    pg.h || (pg.h = new pg);
    return pg.h
}

function lg(a, b, c) {
    c !== void 0 && Number.isNaN(Number(c)) && (c = void 0);
    const d = u("yt.scheduler.instance.addJob");
    return d ? d(a, b, c) : c === void 0 ? (a(), NaN) : If(a, c || 0)
}
var pg = class extends ng {
        R(a) {
            if (a === void 0 || !Number.isNaN(Number(a))) {
                var b = u("yt.scheduler.instance.cancelJob");
                b ? b(a) : window.clearTimeout(a)
            }
        }
        start() {
            const a = u("yt.scheduler.instance.start");
            a && a()
        }
    },
    qg = og();
const rg = [];
let sg, tg = !1;

function ug(a) {
    tg || (sg ? sg.handleError(a) : (rg.push({
        type: "ERROR",
        payload: a
    }), rg.length > 10 && rg.shift()))
}

function vg(a, b) {
    tg || (sg ? sg.S(a, b) : (rg.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), rg.length > 10 && rg.shift()))
};

function wg(a) {
    if (a.indexOf(":") >= 0) throw Error("Database name cannot contain ':'");
}

function xg(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const yg = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    zg = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    Ag = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var T = class extends ef {
        constructor(a, b = {}, c = yg[a], d = zg[a], e = Ag[a]) {
            super(c, Object.assign({}, {
                name: "YtIdbKnownError",
                isSw: self.document === void 0,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, T.prototype)
        }
    },
    Bg = class extends T {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, yg.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, Bg.prototype)
        }
    },
    Cg = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, Cg.prototype)
        }
    };
const Dg = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function Eg(a, b, c, d) {
    b = xg(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof T) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if (e.name === "QuotaExceededError") return new T("QUOTA_EXCEEDED", a);
    if (Xa && e.name === "UnknownError") return new T("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof Cg) return new T("MISSING_INDEX", Object.assign({}, a, {
        objectStore: e.objectStore,
        index: e.index
    }));
    if (e.name === "InvalidStateError" && Dg.some(f => e.message.includes(f))) return new T("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if (e.name === "AbortError") return new T("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign({}, a, {
        name: "IdbError",
        Fb: e.name
    })];
    e.level = "WARNING";
    return e
}

function Fg(a, b, c) {
    return new T("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function Gg(a) {
    if (!a) throw Error();
    throw a;
}

function Hg(a) {
    return a
}
var Ig = class {
    constructor(a) {
        this.h = a
    }
};

function Jg(a, b, c, d, e) {
    try {
        if (a.state.status !== "FULFILLED") throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof Kg ? Lg(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function Mg(a, b, c, d, e) {
    try {
        if (a.state.status !== "REJECTED") throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof Kg ? Lg(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function Lg(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof Kg ? Lg(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var Kg = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.i = [];
        a = a.h;
        const b = d => {
                if (this.state.status === "PENDING") {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if (this.state.status === "PENDING") {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.i) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new Kg(new Ig((b, c) => {
            const d = [];
            let e = a.length;
            e === 0 && b(d);
            for (let f = 0; f < a.length; ++f) Kg.resolve(a[f]).then(g => {
                d[f] = g;
                e--;
                e === 0 && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static resolve(a) {
        return new Kg(new Ig((b, c) => {
            a instanceof Kg ? a.then(b, c) : b(a)
        }))
    }
    static reject(a) {
        return new Kg(new Ig((b, c) => {
            c(a)
        }))
    }
    then(a, b) {
        const c = a != null ? a : Hg,
            d = b != null ? b : Gg;
        return new Kg(new Ig((e, f) => {
            this.state.status === "PENDING" ? (this.h.push(() => {
                Jg(this, this, c, e, f)
            }), this.i.push(() => {
                Mg(this, this, d, e, f)
            })) : this.state.status === "FULFILLED" ? Jg(this, this, c, e, f) : this.state.status === "REJECTED" && Mg(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function Ng(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function Og(a) {
    return new Promise((b, c) => {
        Ng(a, b, c)
    })
}

function U(a) {
    return new Kg(new Ig((b, c) => {
        Ng(a, b, c)
    }))
};

function Pg(a, b) {
    return new Kg(new Ig((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};
const Qg = window;
var V = Qg.ytcsi && Qg.ytcsi.now ? Qg.ytcsi.now : Qg.performance && Qg.performance.timing && Qg.performance.now && Qg.performance.timing.navigationStart ? () => Qg.performance.timing.navigationStart + Qg.performance.now() : () => (new Date).getTime();

function X(a, b, c, d) {
    return r(function*() {
        const e = {
            mode: "readonly",
            A: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        typeof c === "string" ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.A ? 3 : 1;
        let g = 0,
            h;
        for (; !h;) {
            g++;
            const n = Math.round(V());
            try {
                var k = a.h.transaction(b, e.mode),
                    l = d;
                const p = new Rg(k),
                    q = yield Sg(p, l), m = Math.round(V());
                Tg(a, n, m, g, void 0, b.join(), e);
                return q
            } catch (p) {
                l = Math.round(V());
                const q = Eg(p, a.h.name, b.join(), a.h.version);
                if (q instanceof T && !q.h || g >= f) Tg(a, n, l, g, q, b.join(), e), h = q
            }
        }
        return Promise.reject(h)
    })
}

function Ug(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new Vg(a)
}

function Wg(a, b, c, d) {
    return X(a, [b], {
        mode: "readwrite",
        A: !0
    }, e => {
        e = e.objectStore(b);
        return U(e.h.put(c, d))
    })
}

function Tg(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof T && (e.type === "QUOTA_EXCEEDED" || e.type === "QUOTA_MAYBE_EXCEEDED") && vg("QUOTA_EXCEEDED", {
        dbName: xg(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof T && e.type === "UNKNOWN_ABORT" && (c -= a.j, c < 0 && c >= 2147483648 && (c = 0), vg("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), Xg(a, !1, d, f, b, g.tag), ug(e)) : Xg(a, !0, d, f, b, g.tag)
}

function Xg(a, b, c, d, e, f = "IDB_TRANSACTION_TAG_UNKNOWN") {
    vg("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: f
    })
}
var Yg = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(V());
        this.i = !1
    }
    add(a, b, c) {
        return X(this, [a], {
            mode: "readwrite",
            A: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return X(this, [a], {
            mode: "readwrite",
            A: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        this.h.close();
        let a;
        ((a = this.options) == null ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return X(this, [a], {
            mode: "readonly",
            A: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return X(this, [a], {
            mode: "readwrite",
            A: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return X(this, [a], {
            mode: "readonly",
            A: !0
        }, c => c.objectStore(a).get(b))
    }
    getAll(a, b, c) {
        return X(this, [a], {
            mode: "readonly",
            A: !0
        }, d => d.objectStore(a).getAll(b, c))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function Zg(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return $g(a).then(d => Pg(d, c))
}

function ah(a, b) {
    return Zg(a, {
        query: b
    }, c => c.delete().then(() => bh(c))).then(() => {})
}

function ch(a, b, c) {
    const d = [];
    return Zg(a, {
        query: b
    }, e => {
        if (!(c !== void 0 && d.length >= c)) return d.push(e.cursor.value), bh(e)
    }).then(() => d)
}
var Vg = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return U(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return U(this.h.clear()).then(() => {})
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? ah(this, a) : U(this.h.delete(a))
    }
    get(a) {
        return U(this.h.get(a))
    }
    getAll(a, b) {
        return "getAll" in IDBObjectStore.prototype ? U(this.h.getAll(a, b)) : ch(this, a, b)
    }
    index(a) {
        try {
            return new dh(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && b.name === "NotFoundError") throw new Cg(a,
                this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function Sg(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(([d]) => d)
}
var Rg = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = T;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const h = e.item(g);
                        if (h === null) throw Error("Invariant: item in DOMStringList is null");
                        f.push(h)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new T("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new Vg(a), this.j.set(a, b));
        return b
    }
};

function eh(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return $g(a).then(f => Pg(f, c))
}

function fh(a, b, c) {
    const d = [];
    return eh(a, {
        query: b
    }, e => {
        if (!(c !== void 0 && d.length >= c)) return d.push(e.cursor.value), bh(e)
    }).then(() => d)
}
var dh = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return eh(this, {
            query: a
        }, b => b.delete().then(() => bh(b)))
    }
    get(a) {
        return U(this.h.get(a))
    }
    getAll(a, b) {
        return "getAll" in IDBIndex.prototype ? U(this.h.getAll(a, b)) : fh(this, a, b)
    }
    getKey(a) {
        return U(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function $g(a) {
    return U(a).then(b => b ? new gh(a, b) : null)
}

function bh(a) {
    a.cursor.continue(void 0);
    return $g(a.request)
}

function hh(a) {
    a.cursor.advance(5);
    return $g(a.request)
}
var gh = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    delete() {
        return U(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    update(a) {
        return U(this.cursor.update(a))
    }
};

function ih(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = b !== void 0 ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.wa,
            h = c.blocking,
            k = c.Ma,
            l = c.upgrade,
            n = c.closed;
        let p;
        const q = () => {
            p || (p = new Yg(f.result, {
                closed: n
            }));
            return p
        };
        f.addEventListener("upgradeneeded", m => {
            try {
                if (m.newVersion === null) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (f.transaction === null) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                m.dataLoss && m.dataLoss !== "none" && vg("IDB_DATA_CORRUPTED", {
                    reason: m.dataLossMessage || "unknown reason",
                    dbName: xg(a)
                });
                const v = q(),
                    z = new Rg(f.transaction);
                l && l(v, y => m.oldVersion < y && m.newVersion >= y, z);
                z.done.catch(y => {
                    e(y)
                })
            } catch (v) {
                e(v)
            }
        });
        f.addEventListener("success", () => {
            const m = f.result;
            h && m.addEventListener("versionchange", () => {
                h(q())
            });
            m.addEventListener("close", () => {
                vg("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: xg(a),
                    dbVersion: m.version
                });
                k && k()
            });
            d(q())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function jh(a, b, c = {}) {
    return ih(a, b, c)
}

function kh(a, b = {}) {
    return r(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.wa;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield Og(c)
        } catch (c) {
            throw Eg(c, a, "", -1);
        }
    })
};

function lh(a, b) {
    return new T("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function mh(a, b) {
    if (!b) throw Fg("openWithToken", xg(a.name));
    return a.open()
}
var nh = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.j = !0;
        this.m = this.l = 0
    }
    i(a, b, c = {}) {
        return jh(a, b, c)
    }
    delete(a = {}) {
        return kh(this.name, a)
    }
    open() {
        if (!this.j) throw lh(this);
        if (this.h) return this.h;
        let a;
        const b = () => {
                this.h === a && (this.h = void 0)
            },
            c = {
                blocking: e => {
                    e.close()
                },
                closed: b,
                Ma: b,
                upgrade: this.options.upgrade
            },
            d = () => {
                const e = this;
                return r(function*() {
                    var f, g = (f = Error().stack) != null ? f : "";
                    try {
                        const k = yield e.i(e.name, e.options.version, c);
                        f = k;
                        var h = e.options;
                        const l = [];
                        for (const n of Object.keys(h.M)) {
                            const {
                                L: p,
                                Kb: q = Number.MAX_VALUE
                            } = h.M[n];
                            !(f.h.version >= p) || f.h.version >= q || f.h.objectStoreNames.contains(n) || l.push(n)
                        }
                        if (l.length !== 0) {
                            const n = Object.keys(e.options.M),
                                p = k.objectStoreNames();
                            if (e.m < S("ytidb_reopen_db_retries", 0)) return e.m++, k.close(), ug(new T("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: n,
                                foundObjectStores: p
                            })), d();
                            if (e.l < S("ytidb_remake_db_retries", 1)) return e.l++, yield e.delete(), ug(new T("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: n,
                                foundObjectStores: p
                            })), d();
                            throw new Bg(p, n);
                        }
                        return k
                    } catch (k) {
                        if (k instanceof DOMException ? k.name === "VersionError" : "DOMError" in self && k instanceof DOMError ? k.name === "VersionError" : k instanceof Object && "message" in k && k.message === "An attempt was made to open a database using a lower version than the existing version.") {
                            g =
                                yield e.i(e.name, void 0, Object.assign({}, c, {
                                    upgrade: void 0
                                }));
                            h = g.h.version;
                            if (e.options.version !== void 0 && h > e.options.version + 1) throw g.close(), e.j = !1, lh(e, h);
                            return g
                        }
                        b();
                        k instanceof Error && !R("ytidb_async_stack_killswitch") && (k.stack = `${k.stack}\n${g.substring(g.indexOf("\n")+1)}`);
                        let l;
                        throw Eg(k, e.name, "", (l = e.options.version) != null ? l : -1);
                    }
                })
            };
        return this.h = a = d()
    }
};
const oh = new nh("YtIdbMeta", {
    M: {
        databases: {
            L: 1
        }
    },
    upgrade(a, b) {
        b(1) && Ug(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function ph(a, b) {
    return r(function*() {
        return X(yield mh(oh, b), ["databases"], {
            A: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return U(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function qh(a, b) {
    return r(function*() {
        if (a) return (yield mh(oh, b)).delete("databases", a)
    })
};
let rh;
const sh = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function th() {
    return r(function*() {
        return !0
    })
}

function uh() {
    if (rh !== void 0) return rh;
    tg = !0;
    return rh = th().then(a => {
        tg = !1;
        return a
    })
}

function vh() {
    return u("ytglobal.idbToken_") || void 0
}

function wh() {
    const a = vh();
    return a ? Promise.resolve(a) : uh().then(b => {
        (b = b ? sh : void 0) && w("ytglobal.idbToken_", b);
        return b
    })
};
new ze;

function xh(a) {
    try {
        jg();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new T("AUTH_INVALID", {
        dbName: a
    }), ug(a), a;
    b = jg();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function yh(a, b, c, d) {
    return r(function*() {
        var e, f = (e = Error().stack) != null ? e : "";
        e = yield wh();
        if (!e) throw e = Fg("openDbImpl", a, b), R("ytidb_async_stack_killswitch") || (e.stack = `${e.stack}\n${f.substring(f.indexOf("\n")+1)}`), ug(e), e;
        wg(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : xh(a);
        try {
            return yield ph(f, e), yield jh(f.actualName, b, d)
        } catch (g) {
            try {
                yield qh(f.actualName, e)
            } catch (h) {}
            throw g;
        }
    })
}

function zh(a, b, c = {}) {
    return yh(a, b, !1, c)
}

function Ah(a, b, c = {}) {
    return yh(a, b, !0, c)
}

function Bh(a, b = {}) {
    return r(function*() {
        const c = yield wh();
        if (c) {
            wg(a);
            var d = xh(a);
            yield kh(d.actualName, b);
            yield qh(d.actualName, c)
        }
    })
}

function Ch(a, b = {}) {
    return r(function*() {
        const c = yield wh();
        c && (wg(a), yield kh(a, b), yield qh(a, c))
    })
};

function Dh(a, b) {
    let c;
    return () => {
        c || (c = new Eh(a, b));
        return c
    }
}
var Eh = class extends nh {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        wg(a)
    }
    i(a, b, c = {}) {
        return (this.options.shared ? Ah : zh)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.shared ? Ch : Bh)(this.name, a)
    }
};

function Fh(a, b) {
    return Dh(a, b)
};
var Gh = Fh("ytGcfConfig", {
    M: {
        coldConfigStore: {
            L: 1
        },
        hotConfigStore: {
            L: 1
        }
    },
    shared: !1,
    upgrade(a, b) {
        b(1) && (Ug(a, "hotConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("hotTimestampIndex", "timestamp", {
            unique: !1
        }), Ug(a, "coldConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("coldTimestampIndex", "timestamp", {
            unique: !1
        }))
    },
    version: 1
});

function Hh(a) {
    return mh(Gh(), a)
}

function Ih(a, b, c) {
    return r(function*() {
        const d = {
                config: a,
                hashData: b,
                timestamp: V()
            },
            e = yield Hh(c);
        yield e.clear("hotConfigStore");
        return yield Wg(e, "hotConfigStore", d)
    })
}

function Jh(a, b, c, d) {
    return r(function*() {
        const e = {
                config: a,
                hashData: b,
                configData: c,
                timestamp: V()
            },
            f = yield Hh(d);
        yield f.clear("coldConfigStore");
        return yield Wg(f, "coldConfigStore", e)
    })
}

function Kh(a) {
    return r(function*() {
        let b = void 0;
        yield X(yield Hh(a), ["coldConfigStore"], {
            mode: "readwrite",
            A: !0
        }, c => eh(c.objectStore("coldConfigStore").index("coldTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.cursor.value
        }));
        return b
    })
}

function Lh(a) {
    return r(function*() {
        let b = void 0;
        yield X(yield Hh(a), ["hotConfigStore"], {
            mode: "readwrite",
            A: !0
        }, c => eh(c.objectStore("hotConfigStore").index("hotTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.cursor.value
        }));
        return b
    })
};
var Mh = class extends Xd {
    constructor() {
        super();
        this.j = [];
        this.h = [];
        const a = u("yt.gcf.config.hotUpdateCallbacks");
        a ? (this.j = [...a], this.h = a) : (this.h = [], w("yt.gcf.config.hotUpdateCallbacks", this.h))
    }
    m() {
        for (const b of this.j) {
            var a = this.h;
            const c = a.indexOf(b);
            c >= 0 && a.splice(c, 1)
        }
        this.j.length = 0;
        super.m()
    }
};

function Nh(a, b, c) {
    return r(function*() {
        if (R("start_client_gcf")) {
            c && (a.j = c, w("yt.gcf.config.hotConfigGroup", a.j || null));
            a.hotHashData = b;
            w("yt.gcf.config.hotHashData", a.hotHashData || null);
            var d = vh();
            if (d) {
                if (!c) {
                    var e;
                    c = (e = yield Lh(d)) == null ? void 0 : e.config
                }
                yield Ih(c, b, d)
            }
            if (c) {
                d = a.i;
                e = c;
                for (const f of d.h) f(e)
            }
        }
    })
}

function Oh(a, b, c) {
    return r(function*() {
        if (R("start_client_gcf")) {
            a.coldHashData = b;
            w("yt.gcf.config.coldHashData", a.coldHashData || null);
            const d = vh();
            if (d) {
                if (!c) {
                    let e;
                    c = (e = yield Kh(d)) == null ? void 0 : e.config
                }
                c && (yield Jh(c, b, c.configData, d))
            }
        }
    })
}
var Ph = class {
    constructor() {
        this.h = 0;
        this.i = new Mh
    }
};

function Qh() {
    return "INNERTUBE_API_KEY" in tf && "INNERTUBE_API_VERSION" in tf
}

function Rh() {
    return {
        innertubeApiKey: Q("INNERTUBE_API_KEY"),
        innertubeApiVersion: Q("INNERTUBE_API_VERSION"),
        Z: Q("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        Aa: Q("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        Ba: Q("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: Q("INNERTUBE_CONTEXT_CLIENT_VERSION"),
        ja: Q("INNERTUBE_CONTEXT_HL"),
        ia: Q("INNERTUBE_CONTEXT_GL"),
        Ca: Q("INNERTUBE_HOST_OVERRIDE") || "",
        Da: !!Q("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        Ab: !!Q("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: Q("SERIALIZED_CLIENT_CONFIG_DATA")
    }
}

function Sh(a) {
    const b = {
        client: {
            hl: a.ja,
            gl: a.ia,
            clientName: a.Aa,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.Z
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = t.devicePixelRatio;
    c && c != 1 && (b.client.screenDensityFloat = String(c));
    c = Mf();
    c !== "" && (b.client.experimentsToken = c);
    c = Nf();
    c.length > 0 && (b.request = {
        internalExperimentFlags: c
    });
    Th(void 0, b);
    Uh(a, void 0, b);
    R("start_client_gcf") && Vh(void 0, b);
    Q("DELEGATED_SESSION_ID") && !R("pageid_as_header_web") && (b.user = {
        onBehalfOfUser: Q("DELEGATED_SESSION_ID")
    });
    !R("fill_delegate_context_in_gel_killswitch") && (a = Q("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT")) && (b.user = Object.assign({}, b.user, {
        serializedDelegationContext: a
    }));
    a = Q("INNERTUBE_CONTEXT");
    var d;
    if (R("enable_persistent_device_token") && (a == null ? 0 : (d = a.client) == null ? 0 : d.rolloutToken)) {
        var e;
        b.client.rolloutToken = a == null ? void 0 : (e = a.client) == null ? void 0 : e.rolloutToken
    }
    d = Object;
    e = d.assign;
    a = b.client;
    var f = Q("DEVICE", "");
    c = {};
    for (const [g, h] of Object.entries(Ef(f))) {
        f =
            g;
        const k = h;
        f === "cbrand" ? c.deviceMake = k : f === "cmodel" ? c.deviceModel = k : f === "cbr" ? c.browserName = k : f === "cbrver" ? c.browserVersion = k : f === "cos" ? c.osName = k : f === "cosver" ? c.osVersion = k : f === "cplatform" && (c.platform = k)
    }
    b.client = e.call(d, a, c);
    return b
}

function Th(a, b) {
    const c = u("yt.embedded_player.embed_url");
    c && (a ? (b = Xc(a, Re, 7) || new Re, J(b, 4, c), H(a, Re, 7, b)) : b && (b.thirdParty = {
        embedUrl: c
    }))
}

function Uh(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = (d = Xc(b, Ke, 62)) != null ? d : new Ke;
            J(c, 6, a.appInstallData);
            H(b, Ke, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function Wh(a, b, c = {}) {
    let d = {};
    Q("EOM_VISITOR_DATA") ? d = {
        "X-Goog-EOM-Visitor-Id": Q("EOM_VISITOR_DATA")
    } : d = {
        "X-Goog-Visitor-Id": c.visitorData || Q("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    b = c.sb || Q("AUTHORIZATION");
    b || (a ? b = `Bearer ${u("gapi.auth.getToken")().rb}` : (a = gg(eg()), R("pageid_as_header_web") || delete a["X-Goog-PageId"], d = Object.assign({}, d, a)));
    b && (d.Authorization = b);
    return d
}

function Vh(a, b) {
    if (!Ph.h) {
        var c = new Ph;
        Ph.h = c
    }
    c = Ph.h;
    var d = V() - c.h;
    if (c.h !== 0 && d < S("send_config_hash_timer")) c = void 0;
    else {
        d = u("yt.gcf.config.coldConfigData");
        var e = u("yt.gcf.config.hotHashData"),
            f = u("yt.gcf.config.coldHashData");
        d && e && f && (c.h = V());
        c = {
            coldConfigData: d,
            hotHashData: e,
            coldHashData: f
        }
    }
    if (d = c)
        if (e = d.coldConfigData, c = d.coldHashData, d = d.hotHashData, a) {
            var g;
            b = (g = Xc(a, Ke, 62)) != null ? g : new Ke;
            g = J(b, 1, e);
            g = J(g, 3, c);
            J(g, 5, d);
            H(a, Ke, 62, b)
        } else b && (b.client.configInfo = b.client.configInfo || {},
            e && (b.client.configInfo.coldConfigData = e), c && (b.client.configInfo.coldHashData = c), d && (b.client.configInfo.hotHashData = d))
};
typeof TextEncoder !== "undefined" && new TextEncoder;

function Xh(a) {
    this.version = 1;
    this.args = a
};

function Yh() {
    var a = Zh;
    this.topic = "screen-created";
    this.h = a
}
Yh.prototype.toString = function() {
    return this.topic
};
const $h = u("ytPubsub2Pubsub2Instance") || new M;
M.prototype.subscribe = M.prototype.K;
M.prototype.unsubscribeByKey = M.prototype.C;
M.prototype.publish = M.prototype.B;
M.prototype.clear = M.prototype.clear;
w("ytPubsub2Pubsub2Instance", $h);
const ai = u("ytPubsub2Pubsub2SubscribedKeys") || {};
w("ytPubsub2Pubsub2SubscribedKeys", ai);
const bi = u("ytPubsub2Pubsub2TopicToKeys") || {};
w("ytPubsub2Pubsub2TopicToKeys", bi);
const ci = u("ytPubsub2Pubsub2IsAsync") || {};
w("ytPubsub2Pubsub2IsAsync", ci);
w("ytPubsub2Pubsub2SkipSubKey", null);

function di(a, b) {
    const c = ei();
    c && c.publish.call(c, a.toString(), a, b)
}

function fi(a) {
    var b = gi;
    const c = ei();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = u("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (ai[d]) try {
                if (f && b instanceof Yh && b != e) try {
                    var h = b.h,
                        k = f;
                    if (!k.args || !k.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!h.na) {
                            const m = new h;
                            h.na = m.version
                        }
                        var l = h.na
                    } catch (m) {}
                    if (!l || k.version != l) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        l = Reflect;
                        var n = l.construct; {
                            var p = k.args;
                            const m = p.length;
                            if (m > 0) {
                                const v = Array(m);
                                for (k = 0; k < m; k++) v[k] = p[k];
                                var q = v
                            } else q = []
                        }
                        f = n.call(l, h, q)
                    } catch (m) {
                        throw m.message = "yt.pubsub2.Data.deserialize(): " + m.message, m;
                    }
                } catch (m) {
                    throw m.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + m.message, m;
                }
                a.call(window, f)
            } catch (m) {
                xf(m)
            }
        }, ci[b.toString()] ? u("yt.scheduler.instance") ? qg.h(g) : If(g, 0) : g())
    });
    ai[d] = !0;
    bi[b.toString()] || (bi[b.toString()] = []);
    bi[b.toString()].push(d);
    return d
}

function hi() {
    var a = ii;
    const b = fi(function(c) {
        a.apply(void 0, arguments);
        ji(b)
    });
    return b
}

function ji(a) {
    const b = ei();
    b && (typeof a === "number" && (a = [a]), ua(a, c => {
        b.unsubscribeByKey(c);
        delete ai[c]
    }))
}

function ei() {
    return u("ytPubsub2Pubsub2Instance")
};
let ki = void 0,
    li = void 0;
var mi = {
    accountStateChangeSignedIn: 23,
    accountStateChangeSignedOut: 24,
    delayedEventMetricCaptured: 11,
    latencyActionBaselined: 6,
    latencyActionInfo: 7,
    latencyActionTicked: 5,
    offlineTransferStatusChanged: 2,
    offlineImageDownload: 335,
    playbackStartStateChanged: 9,
    systemHealthCaptured: 3,
    mangoOnboardingCompleted: 10,
    mangoPushNotificationReceived: 230,
    mangoUnforkDbMigrationError: 121,
    mangoUnforkDbMigrationSummary: 122,
    mangoUnforkDbMigrationPreunforkDbVersionNumber: 133,
    mangoUnforkDbMigrationPhoneMetadata: 134,
    mangoUnforkDbMigrationPhoneStorage: 135,
    mangoUnforkDbMigrationStep: 142,
    mangoAsyncApiMigrationEvent: 223,
    mangoDownloadVideoResult: 224,
    mangoHomepageVideoCount: 279,
    mangoHomeV3State: 295,
    mangoImageClientCacheHitEvent: 273,
    sdCardStatusChanged: 98,
    framesDropped: 12,
    thumbnailHovered: 13,
    deviceRetentionInfoCaptured: 14,
    thumbnailLoaded: 15,
    backToAppEvent: 318,
    streamingStatsCaptured: 17,
    offlineVideoShared: 19,
    appCrashed: 20,
    youThere: 21,
    offlineStateSnapshot: 22,
    mdxSessionStarted: 25,
    mdxSessionConnected: 26,
    mdxSessionDisconnected: 27,
    bedrockResourceConsumptionSnapshot: 28,
    nextGenWatchWatchSwiped: 29,
    kidsAccountsSnapshot: 30,
    zeroStepChannelCreated: 31,
    tvhtml5SearchCompleted: 32,
    offlineSharePairing: 34,
    offlineShareUnlock: 35,
    mdxRouteDistributionSnapshot: 36,
    bedrockRepetitiveActionTimed: 37,
    unpluggedDegradationInfo: 229,
    uploadMp4HeaderMoved: 38,
    uploadVideoTranscoded: 39,
    uploadProcessorStarted: 46,
    uploadProcessorEnded: 47,
    uploadProcessorReady: 94,
    uploadProcessorRequirementPending: 95,
    uploadProcessorInterrupted: 96,
    uploadFrontendEvent: 241,
    assetPackDownloadStarted: 41,
    assetPackDownloaded: 42,
    assetPackApplied: 43,
    assetPackDeleted: 44,
    appInstallAttributionEvent: 459,
    playbackSessionStopped: 45,
    adBlockerMessagingShown: 48,
    distributionChannelCaptured: 49,
    dataPlanCpidRequested: 51,
    detailedNetworkTypeCaptured: 52,
    sendStateUpdated: 53,
    receiveStateUpdated: 54,
    sendDebugStateUpdated: 55,
    receiveDebugStateUpdated: 56,
    kidsErrored: 57,
    mdxMsnSessionStatsFinished: 58,
    appSettingsCaptured: 59,
    mdxWebSocketServerHttpError: 60,
    mdxWebSocketServer: 61,
    startupCrashesDetected: 62,
    coldStartInfo: 435,
    offlinePlaybackStarted: 63,
    liveChatMessageSent: 225,
    liveChatUserPresent: 434,
    liveChatBeingModerated: 457,
    liveCreationCameraUpdated: 64,
    liveCreationEncodingCaptured: 65,
    liveCreationError: 66,
    liveCreationHealthUpdated: 67,
    liveCreationVideoEffectsCaptured: 68,
    liveCreationStageOccured: 75,
    liveCreationBroadcastScheduled: 123,
    liveCreationArchiveReplacement: 149,
    liveCreationCostreamingConnection: 421,
    liveCreationStreamWebrtcStats: 288,
    mdxSessionRecoveryStarted: 69,
    mdxSessionRecoveryCompleted: 70,
    mdxSessionRecoveryStopped: 71,
    visualElementShown: 72,
    visualElementHidden: 73,
    visualElementGestured: 78,
    visualElementStateChanged: 208,
    screenCreated: 156,
    playbackAssociated: 202,
    visualElementAttached: 215,
    playbackContextEvent: 214,
    cloudCastingPlaybackStarted: 74,
    webPlayerApiCalled: 76,
    tvhtml5AccountDialogOpened: 79,
    foregroundHeartbeat: 80,
    foregroundHeartbeatScreenAssociated: 111,
    kidsOfflineSnapshot: 81,
    mdxEncryptionSessionStatsFinished: 82,
    playerRequestCompleted: 83,
    liteSchedulerStatistics: 84,
    mdxSignIn: 85,
    spacecastMetadataLookupRequested: 86,
    spacecastBatchLookupRequested: 87,
    spacecastSummaryRequested: 88,
    spacecastPlayback: 89,
    spacecastDiscovery: 90,
    tvhtml5LaunchUrlComponentChanged: 91,
    mdxBackgroundPlaybackRequestCompleted: 92,
    mdxBrokenAdditionalDataDeviceDetected: 93,
    tvhtml5LocalStorage: 97,
    tvhtml5DeviceStorageStatus: 147,
    autoCaptionsAvailable: 99,
    playbackScrubbingEvent: 339,
    flexyState: 100,
    interfaceOrientationCaptured: 101,
    mainAppBrowseFragmentCache: 102,
    offlineCacheVerificationFailure: 103,
    offlinePlaybackExceptionDigest: 217,
    vrCopresenceStats: 104,
    vrCopresenceSyncStats: 130,
    vrCopresenceCommsStats: 137,
    vrCopresencePartyStats: 153,
    vrCopresenceEmojiStats: 213,
    vrCopresenceEvent: 141,
    vrCopresenceFlowTransitEvent: 160,
    vrCowatchPartyEvent: 492,
    vrCowatchUserStartOrJoinEvent: 504,
    vrPlaybackEvent: 345,
    kidsAgeGateTracking: 105,
    offlineDelayAllowedTracking: 106,
    mainAppAutoOfflineState: 107,
    videoAsThumbnailDownload: 108,
    videoAsThumbnailPlayback: 109,
    liteShowMore: 110,
    renderingError: 118,
    kidsProfilePinGateTracking: 119,
    abrTrajectory: 124,
    scrollEvent: 125,
    streamzIncremented: 126,
    kidsProfileSwitcherTracking: 127,
    kidsProfileCreationTracking: 129,
    buyFlowStarted: 136,
    mbsConnectionInitiated: 138,
    mbsPlaybackInitiated: 139,
    mbsLoadChildren: 140,
    liteProfileFetcher: 144,
    mdxRemoteTransaction: 146,
    reelPlaybackError: 148,
    reachabilityDetectionEvent: 150,
    mobilePlaybackEvent: 151,
    courtsidePlayerStateChanged: 152,
    musicPersistentCacheChecked: 154,
    musicPersistentCacheCleared: 155,
    playbackInterrupted: 157,
    playbackInterruptionResolved: 158,
    fixFopFlow: 159,
    anrDetection: 161,
    backstagePostCreationFlowEnded: 162,
    clientError: 163,
    gamingAccountLinkStatusChanged: 164,
    liteHousewarming: 165,
    buyFlowEvent: 167,
    kidsParentalGateTracking: 168,
    kidsSignedOutSettingsStatus: 437,
    kidsSignedOutPauseHistoryFixStatus: 438,
    tvhtml5WatchdogViolation: 444,
    ypcUpgradeFlow: 169,
    yongleStudy: 170,
    ypcUpdateFlowStarted: 171,
    ypcUpdateFlowCancelled: 172,
    ypcUpdateFlowSucceeded: 173,
    ypcUpdateFlowFailed: 174,
    liteGrowthkitPromo: 175,
    paymentFlowStarted: 341,
    transactionFlowShowPaymentDialog: 405,
    transactionFlowStarted: 176,
    transactionFlowSecondaryDeviceStarted: 222,
    transactionFlowSecondaryDeviceSignedOutStarted: 383,
    transactionFlowCancelled: 177,
    transactionFlowPaymentCallBackReceived: 387,
    transactionFlowPaymentSubmitted: 460,
    transactionFlowPaymentSucceeded: 329,
    transactionFlowSucceeded: 178,
    transactionFlowFailed: 179,
    transactionFlowPlayBillingConnectionStartEvent: 428,
    transactionFlowSecondaryDeviceSuccess: 458,
    transactionFlowErrorEvent: 411,
    liteVideoQualityChanged: 180,
    watchBreakEnablementSettingEvent: 181,
    watchBreakFrequencySettingEvent: 182,
    videoEffectsCameraPerformanceMetrics: 183,
    adNotify: 184,
    startupTelemetry: 185,
    playbackOfflineFallbackUsed: 186,
    outOfMemory: 187,
    ypcPauseFlowStarted: 188,
    ypcPauseFlowCancelled: 189,
    ypcPauseFlowSucceeded: 190,
    ypcPauseFlowFailed: 191,
    uploadFileSelected: 192,
    ypcResumeFlowStarted: 193,
    ypcResumeFlowCancelled: 194,
    ypcResumeFlowSucceeded: 195,
    ypcResumeFlowFailed: 196,
    adsClientStateChange: 197,
    ypcCancelFlowStarted: 198,
    ypcCancelFlowCancelled: 199,
    ypcCancelFlowSucceeded: 200,
    ypcCancelFlowFailed: 201,
    ypcCancelFlowGoToPaymentProcessor: 402,
    ypcDeactivateFlowStarted: 320,
    ypcRedeemFlowStarted: 203,
    ypcRedeemFlowCancelled: 204,
    ypcRedeemFlowSucceeded: 205,
    ypcRedeemFlowFailed: 206,
    ypcFamilyCreateFlowStarted: 258,
    ypcFamilyCreateFlowCancelled: 259,
    ypcFamilyCreateFlowSucceeded: 260,
    ypcFamilyCreateFlowFailed: 261,
    ypcFamilyManageFlowStarted: 262,
    ypcFamilyManageFlowCancelled: 263,
    ypcFamilyManageFlowSucceeded: 264,
    ypcFamilyManageFlowFailed: 265,
    restoreContextEvent: 207,
    embedsAdEvent: 327,
    autoplayTriggered: 209,
    clientDataErrorEvent: 210,
    experimentalVssValidation: 211,
    tvhtml5TriggeredEvent: 212,
    tvhtml5FrameworksFieldTrialResult: 216,
    tvhtml5FrameworksFieldTrialStart: 220,
    musicOfflinePreferences: 218,
    watchTimeSegment: 219,
    appWidthLayoutError: 221,
    accountRegistryChange: 226,
    userMentionAutoCompleteBoxEvent: 227,
    downloadRecommendationEnablementSettingEvent: 228,
    musicPlaybackContentModeChangeEvent: 231,
    offlineDbOpenCompleted: 232,
    kidsFlowEvent: 233,
    kidsFlowCorpusSelectedEvent: 234,
    videoEffectsEvent: 235,
    unpluggedOpsEogAnalyticsEvent: 236,
    playbackAudioRouteEvent: 237,
    interactionLoggingDebugModeError: 238,
    offlineYtbRefreshed: 239,
    kidsFlowError: 240,
    musicAutoplayOnLaunchAttempted: 242,
    deviceContextActivityEvent: 243,
    deviceContextEvent: 244,
    templateResolutionException: 245,
    musicSideloadedPlaylistServiceCalled: 246,
    embedsStorageAccessNotChecked: 247,
    embedsHasStorageAccessResult: 248,
    embedsItpPlayedOnReload: 249,
    embedsRequestStorageAccessResult: 250,
    embedsShouldRequestStorageAccessResult: 251,
    embedsRequestStorageAccessState: 256,
    embedsRequestStorageAccessFailedState: 257,
    embedsItpWatchLaterResult: 266,
    searchSuggestDecodingPayloadFailure: 252,
    siriShortcutActivated: 253,
    tvhtml5KeyboardPerformance: 254,
    latencyActionSpan: 255,
    elementsLog: 267,
    ytbFileOpened: 268,
    tfliteModelError: 269,
    apiTest: 270,
    yongleUsbSetup: 271,
    touStrikeInterstitialEvent: 272,
    liteStreamToSave: 274,
    appBundleClientEvent: 275,
    ytbFileCreationFailed: 276,
    adNotifyFailure: 278,
    ytbTransferFailed: 280,
    blockingRequestFailed: 281,
    liteAccountSelector: 282,
    liteAccountUiCallbacks: 283,
    dummyPayload: 284,
    browseResponseValidationEvent: 285,
    entitiesError: 286,
    musicIosBackgroundFetch: 287,
    mdxNotificationEvent: 289,
    layersValidationError: 290,
    musicPwaInstalled: 291,
    liteAccountCleanup: 292,
    html5PlayerHealthEvent: 293,
    watchRestoreAttempt: 294,
    liteAccountSignIn: 296,
    notaireEvent: 298,
    kidsVoiceSearchEvent: 299,
    adNotifyFilled: 300,
    delayedEventDropped: 301,
    analyticsSearchEvent: 302,
    systemDarkThemeOptOutEvent: 303,
    flowEvent: 304,
    networkConnectivityBaselineEvent: 305,
    ytbFileImported: 306,
    downloadStreamUrlExpired: 307,
    directSignInEvent: 308,
    lyricImpressionEvent: 309,
    accessibilityStateEvent: 310,
    tokenRefreshEvent: 311,
    genericAttestationExecution: 312,
    tvhtml5VideoSeek: 313,
    unpluggedAutoPause: 314,
    scrubbingEvent: 315,
    bedtimeReminderEvent: 317,
    tvhtml5UnexpectedRestart: 319,
    tvhtml5StabilityTraceEvent: 478,
    tvhtml5OperationHealth: 467,
    tvhtml5WatchKeyEvent: 321,
    voiceLanguageChanged: 322,
    tvhtml5LiveChatStatus: 323,
    parentToolsCorpusSelectedEvent: 324,
    offerAdsEnrollmentInitiated: 325,
    networkQualityIntervalEvent: 326,
    deviceStartupMetrics: 328,
    heartbeatActionPlayerTransitioned: 330,
    tvhtml5Lifecycle: 331,
    heartbeatActionPlayerHalted: 332,
    adaptiveInlineMutedSettingEvent: 333,
    mainAppLibraryLoadingState: 334,
    thirdPartyLogMonitoringEvent: 336,
    appShellAssetLoadReport: 337,
    tvhtml5AndroidAttestation: 338,
    tvhtml5StartupSoundEvent: 340,
    iosBackgroundRefreshTask: 342,
    iosBackgroundProcessingTask: 343,
    sliEventBatch: 344,
    postImpressionEvent: 346,
    musicSideloadedPlaylistExport: 347,
    idbUnexpectedlyClosed: 348,
    voiceSearchEvent: 349,
    mdxSessionCastEvent: 350,
    idbQuotaExceeded: 351,
    idbTransactionEnded: 352,
    idbTransactionAborted: 353,
    tvhtml5KeyboardLogging: 354,
    idbIsSupportedCompleted: 355,
    creatorStudioMobileEvent: 356,
    idbDataCorrupted: 357,
    parentToolsAppChosenEvent: 358,
    webViewBottomSheetResized: 359,
    activeStateControllerScrollPerformanceSummary: 360,
    navigatorValidation: 361,
    mdxSessionHeartbeat: 362,
    clientHintsPolyfillDiagnostics: 363,
    clientHintsPolyfillEvent: 364,
    proofOfOriginTokenError: 365,
    kidsAddedAccountSummary: 366,
    musicWearableDevice: 367,
    ypcRefundFlowEvent: 368,
    tvhtml5PlaybackMeasurementEvent: 369,
    tvhtml5WatermarkMeasurementEvent: 370,
    clientExpGcfPropagationEvent: 371,
    mainAppReferrerIntent: 372,
    leaderLockEnded: 373,
    leaderLockAcquired: 374,
    googleHatsEvent: 375,
    persistentLensLaunchEvent: 376,
    parentToolsChildWelcomeChosenEvent: 378,
    browseThumbnailPreloadEvent: 379,
    finalPayload: 380,
    mdxDialAdditionalDataUpdateEvent: 381,
    webOrchestrationTaskLifecycleRecord: 382,
    startupSignalEvent: 384,
    accountError: 385,
    gmsDeviceCheckEvent: 386,
    accountSelectorEvent: 388,
    accountUiCallbacks: 389,
    mdxDialAdditionalDataProbeEvent: 390,
    downloadsSearchIcingApiStats: 391,
    downloadsSearchIndexUpdatedEvent: 397,
    downloadsSearchIndexSnapshot: 398,
    dataPushClientEvent: 392,
    kidsCategorySelectedEvent: 393,
    mdxDeviceManagementSnapshotEvent: 394,
    prefetchRequested: 395,
    prefetchableCommandExecuted: 396,
    gelDebuggingEvent: 399,
    webLinkTtsPlayEnd: 400,
    clipViewInvalid: 401,
    persistentStorageStateChecked: 403,
    cacheWipeoutEvent: 404,
    playerEvent: 410,
    sfvEffectPipelineStartedEvent: 412,
    sfvEffectPipelinePausedEvent: 429,
    sfvEffectPipelineEndedEvent: 413,
    sfvEffectChosenEvent: 414,
    sfvEffectLoadedEvent: 415,
    sfvEffectUserInteractionEvent: 465,
    sfvEffectFirstFrameProcessedLatencyEvent: 416,
    sfvEffectAggregatedFramesProcessedLatencyEvent: 417,
    sfvEffectAggregatedFramesDroppedEvent: 418,
    sfvEffectPipelineErrorEvent: 430,
    sfvEffectGraphFrozenEvent: 419,
    sfvEffectGlThreadBlockedEvent: 420,
    mdeQosEvent: 510,
    mdeVideoChangedEvent: 442,
    mdePlayerPerformanceMetrics: 472,
    mdeExporterEvent: 497,
    genericClientExperimentEvent: 423,
    homePreloadTaskScheduled: 424,
    homePreloadTaskExecuted: 425,
    homePreloadCacheHit: 426,
    polymerPropertyChangedInObserver: 427,
    applicationStarted: 431,
    networkCronetRttBatch: 432,
    networkCronetRttSummary: 433,
    repeatChapterLoopEvent: 436,
    seekCancellationEvent: 462,
    lockModeTimeoutEvent: 483,
    externalVideoShareToYoutubeAttempt: 501,
    parentCodeEvent: 502,
    offlineTransferStarted: 4,
    musicOfflineMixtapePreferencesChanged: 16,
    mangoDailyNewVideosNotificationAttempt: 40,
    mangoDailyNewVideosNotificationError: 77,
    dtwsPlaybackStarted: 112,
    dtwsTileFetchStarted: 113,
    dtwsTileFetchCompleted: 114,
    dtwsTileFetchStatusChanged: 145,
    dtwsKeyframeDecoderBufferSent: 115,
    dtwsTileUnderflowedOnNonkeyframe: 116,
    dtwsBackfillFetchStatusChanged: 143,
    dtwsBackfillUnderflowed: 117,
    dtwsAdaptiveLevelChanged: 128,
    blockingVisitorIdTimeout: 277,
    liteSocial: 18,
    mobileJsInvocation: 297,
    biscottiBasedDetection: 439,
    coWatchStateChange: 440,
    embedsVideoDataDidChange: 441,
    shortsFirst: 443,
    cruiseControlEvent: 445,
    qoeClientLoggingContext: 446,
    atvRecommendationJobExecuted: 447,
    tvhtml5UserFeedback: 448,
    producerProjectCreated: 449,
    producerProjectOpened: 450,
    producerProjectDeleted: 451,
    producerProjectElementAdded: 453,
    producerProjectElementRemoved: 454,
    producerAppStateChange: 509,
    tvhtml5ShowClockEvent: 455,
    deviceCapabilityCheckMetrics: 456,
    youtubeClearcutEvent: 461,
    offlineBrowseFallbackEvent: 463,
    getCtvTokenEvent: 464,
    startupDroppedFramesSummary: 466,
    screenshotEvent: 468,
    miniAppPlayEvent: 469,
    elementsDebugCounters: 470,
    fontLoadEvent: 471,
    webKillswitchReceived: 473,
    webKillswitchExecuted: 474,
    cameraOpenEvent: 475,
    manualSmoothnessMeasurement: 476,
    tvhtml5AppQualityEvent: 477,
    polymerPropertyAccessEvent: 479,
    miniAppSdkUsage: 480,
    cobaltTelemetryEvent: 481,
    crossDevicePlayback: 482,
    channelCreatedWithObakeImage: 484,
    channelEditedWithObakeImage: 485,
    offlineDeleteEvent: 486,
    crossDeviceNotificationTransfer: 487,
    androidIntentEvent: 488,
    unpluggedAmbientInterludesCounterfactualEvent: 489,
    keyPlaysPlayback: 490,
    shortsCreationFallbackEvent: 493,
    vssData: 491,
    castMatch: 494,
    miniAppPerformanceMetrics: 495,
    userFeedbackEvent: 496,
    kidsGuestSessionMismatch: 498,
    musicSideloadedPlaylistMigrationEvent: 499,
    sleepTimerSessionFinishEvent: 500,
    watchEpPromoConflict: 503,
    innertubeResponseCacheMetrics: 505,
    miniAppAdEvent: 506,
    dataPlanUpsellEvent: 507,
    producerProjectRenamed: 508,
    producerMediaSelectionEvent: 511,
    embedsAutoplayStatusChanged: 512,
    remoteConnectEvent: 513,
    connectedSessionMisattributionEvent: 514,
    producerProjectElementModified: 515
};
const ni = ["client.name", "client.version"];

function oi(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? ni.includes(b.key) : !1);
    return a
};
var pi = Fh("ServiceWorkerLogsDatabase", {
    M: {
        SWHealthLog: {
            L: 1
        }
    },
    shared: !0,
    upgrade: (a, b) => {
        b(1) && Ug(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function qi(a, b) {
    return r(function*() {
        var c = yield mh(pi(), b), d = Q("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = oi(e.clientError));
        e.interface = d;
        return Wg(c, "SWHealthLog", e)
    })
};
w("ytNetworklessLoggingInitializationOptions", t.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1
});

function ri(a, b, c, d) {
    !Q("VISITOR_DATA") && b !== "visitor_id" && Math.random() < .01 && yf(new ef("Missing VISITOR_DATA when sending innertube request.", b, c, d));
    if (!a.isReady()) throw a = new ef("innertube xhrclient not ready", b, c, d), xf(a), a;
    c = {
        headers: d.headers || {},
        method: "POST",
        postParams: c,
        postBody: d.postBody,
        postBodyFormat: d.postBodyFormat || "JSON",
        onTimeout: () => {
            d.onTimeout()
        },
        onFetchTimeout: d.onTimeout,
        onSuccess: (h, k) => {
            if (d.onSuccess) d.onSuccess(k)
        },
        onFetchSuccess: h => {
            if (d.onSuccess) d.onSuccess(h)
        },
        onError: (h, k) => {
            if (d.onError) d.onError(k)
        },
        onFetchError: h => {
            if (d.onError) d.onError(h)
        },
        timeout: d.timeout,
        withCredentials: !0,
        compress: d.compress
    };
    c.headers["Content-Type"] || (c.headers["Content-Type"] = "application/json");
    let e = "";
    var f = a.config_.Ca;
    f && (e = f);
    f = a.config_.Da || !1;
    const g = Wh(f, e, d);
    Object.assign(c.headers, g);
    c.headers.Authorization && !e && f && (c.headers["x-origin"] = window.location.origin);
    a = Ff(`${e}${`/${"youtubei"}/${a.config_.innertubeApiVersion}/${b}`}`, {
        alt: "json"
    });
    try {
        Pf(a, c)
    } catch (h) {
        if (h.name === "InvalidAccessError") yf(Error("An extension is blocking network request."));
        else throw h;
    }
}
var si = class {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : Qh() && (this.config_ = Rh())
    }
    isReady() {
        !this.config_ && Qh() && (this.config_ = Rh());
        return !!this.config_
    }
};
let ti = 0;
w("ytDomDomGetNextId", u("ytDomDomGetNextId") || (() => ++ti));
w("ytEventsEventsListeners", t.ytEventsEventsListeners || {});
w("ytEventsEventsCounter", t.ytEventsEventsCounter || {
    count: 0
});
t.ytPubsubPubsubInstance || new M;
var ui = Symbol("injectionDeps"),
    vi = class {
        constructor() {
            this.name = "INNERTUBE_TRANSPORT_TOKEN"
        }
        toString() {
            return `InjectionToken(${this.name})`
        }
    },
    wi = class {
        constructor() {
            this.key = Ph
        }
    };

function xi(a) {
    var b = {
        ca: yi,
        ma: zi.h
    };
    a.i.set(b.ca, b);
    const c = a.j.get(b.ca);
    if (c) try {
        c.Mb(a.resolve(b.ca))
    } catch (d) {
        c.Jb(d)
    }
}

function Ai(a, b, c, d = !1) {
    if (c.indexOf(b) > -1) throw Error(`Deps cycle for: ${b}`);
    if (a.h.has(b)) return a.h.get(b);
    if (!a.i.has(b)) {
        if (d) return;
        throw Error(`No provider for: ${b}`);
    }
    d = a.i.get(b);
    c.push(b);
    if (d.ma !== void 0) var e = d.ma;
    else if (d.Oa) e = d[ui] ? Bi(a, d[ui], c) : [], e = d.Oa(...e);
    else if (d.Na) {
        e = d.Na;
        const f = e[ui] ? Bi(a, e[ui], c) : [];
        e = new e(...f)
    } else throw Error(`Could not resolve providers for: ${b}`);
    c.pop();
    d.Tb || a.h.set(b, e);
    return e
}

function Bi(a, b, c) {
    return b ? b.map(d => d instanceof wi ? Ai(a, d.key, c, !0) : Ai(a, d, c)) : []
}
var Ci = class {
    constructor() {
        this.i = new Map;
        this.j = new Map;
        this.h = new Map
    }
    resolve(a) {
        return a instanceof wi ? Ai(this, a.key, [], !0) : Ai(this, a, [])
    }
};
let Di;

function Ei() {
    Di || (Di = new Ci);
    return Di
};
let Fi = window;

function Gi() {
    let a, b;
    return "h5vcc" in Fi && ((a = Fi.h5vcc.traceEvent) == null ? 0 : a.traceBegin) && ((b = Fi.h5vcc.traceEvent) == null ? 0 : b.traceEnd) ? 1 : "performance" in Fi && Fi.performance.mark && Fi.performance.measure ? 2 : 0
}

function Hi(a) {
    const b = Gi();
    switch (b) {
        case 1:
            Fi.h5vcc.traceEvent.traceBegin("YTLR", a);
            break;
        case 2:
            Fi.performance.mark(`${a}-start`);
            break;
        case 0:
            break;
        default:
            ta(b, "unknown trace type")
    }
}

function Ii(a) {
    var b = Gi();
    switch (b) {
        case 1:
            Fi.h5vcc.traceEvent.traceEnd("YTLR", a);
            break;
        case 2:
            b = `${a}-start`;
            const c = `${a}-end`;
            Fi.performance.mark(c);
            Fi.performance.measure(a, b, c);
            break;
        case 0:
            break;
        default:
            ta(b, "unknown trace type")
    }
};
var Ji = R("web_enable_lifecycle_monitoring") && Gi() !== 0,
    Ki = R("web_enable_lifecycle_monitoring");

function Li(a) {
    let b, c;
    (c = (b = window).onerror) == null || c.call(b, a.message, "", 0, 0, a)
};

function Mi(a) {
    let b;
    return (b = a.priority) != null ? b : 0
}

function Ni(a) {
    var b = Array.from(a.h.keys()).sort((c, d) => Mi(a.h[d]) - Mi(a.h[c]));
    for (const c of b) b = a.h[c], b.jobId === void 0 || b.V || (a.scheduler.R(b.jobId), lg(b.aa, 10))
}
var Oi = class {
    constructor(a) {
        this.scheduler = og();
        this.i = new ze;
        this.h = a;
        for (let b = 0; b < this.h.length; b++) {
            const c = this.h[b];
            a = () => {
                c.aa();
                this.h[b].V = !0;
                this.h.every(e => e.V === !0) && this.i.resolve()
            };
            const d = lg(a, Mi(c));
            this.h[b] = Object.assign({}, c, {
                aa: a,
                jobId: d
            })
        }
    }
    cancel() {
        for (const a of this.h) a.jobId === void 0 || a.V || this.scheduler.R(a.jobId), a.V = !0;
        this.i.resolve()
    }
};

function Pi(a, b, c) {
    Ki && console.groupCollapsed && console.groupEnd && (console.groupCollapsed(`[${a.constructor.name}] '${a.state}' to '${b}'`), console.log("with message: ", c), console.groupEnd())
}

function Qi(a, b) {
    const c = b.filter(e => Ri(a, e) === 10),
        d = b.filter(e => Ri(a, e) !== 10);
    return a.l.Rb ? (...e) => r(function*() {
        yield Si(c, ...e);
        Ti(a, d, ...e)
    }) : (...e) => {
        Ui(c, ...e);
        Ti(a, d, ...e)
    }
}

function Ri(a, b) {
    let c, d;
    return (d = (c = a.j) != null ? c : b.priority) != null ? d : 0
}

function Si(a, ...b) {
    return r(function*() {
        og();
        for (const c of a) {
            let d;
            mg(() => {
                Vi(c.name);
                const e = Wi(() => c.callback(...b));
                Vb(e) ? d = R("web_lifecycle_error_handling_killswitch") ? e.then(() => {
                    Xi(c.name)
                }) : e.then(() => {
                    Xi(c.name)
                }, f => {
                    Li(f);
                    Xi(c.name)
                }) : Xi(c.name)
            });
            d && (yield d)
        }
    })
}

function Ti(a, b, ...c) {
    b = b.map(d => ({
        aa: () => {
            Vi(d.name);
            Wi(() => d.callback(...c));
            Xi(d.name)
        },
        priority: Ri(a, d)
    }));
    b.length && (a.i = new Oi(b))
}

function Ui(a, ...b) {
    og();
    for (const c of a) mg(() => {
        Vi(c.name);
        Wi(() => c.callback(...b));
        Xi(c.name)
    })
}

function Vi(a) {
    Ji && a && Hi(a)
}

function Xi(a) {
    Ji && a && Ii(a)
}
var Yi = class {
    constructor() {
        this.state = "none";
        this.plugins = [];
        this.j = void 0;
        this.l = {};
        Ji && Hi(this.state)
    }
    get currentState() {
        return this.state
    }
    install(a) {
        this.plugins.push(a);
        return this
    }
    transition(a, b) {
        Ji && Ii(this.state);
        var c = this.transitions.find(d => Array.isArray(d.from) ? d.from.find(e => e === this.state && d.P === a) : d.from === this.state && d.P === a);
        if (c) {
            this.i && (Ni(this.i), this.i = void 0);
            Pi(this, a, b);
            this.state = a;
            Ji && Hi(this.state);
            c = c.action.bind(this);
            const d = this.plugins.filter(e => e[a]).map(e => e[a]);
            c(Qi(this, d), b)
        } else throw Error(`no transition specified from ${this.state} to ${a}`);
    }
};

function Wi(a) {
    if (R("web_lifecycle_error_handling_killswitch")) return a();
    try {
        return a()
    } catch (b) {
        Li(b)
    }
};

function Zi() {
    $i || ($i = new aj);
    return $i
}
var aj = class extends Yi {
        constructor() {
            super();
            this.h = null;
            this.j = 10;
            this.transitions = [{
                    from: "none",
                    P: "application_navigating",
                    action: this.m
                }, {
                    from: "application_navigating",
                    P: "none",
                    action: this.s
                }, {
                    from: "application_navigating",
                    P: "application_navigating",
                    action: () => {}
                },
                {
                    from: "none",
                    P: "none",
                    action: () => {}
                }
            ]
        }
        m(a, b) {
            this.h = kg(() => {
                this.currentState === "application_navigating" && this.transition("none")
            }, 5E3);
            a(b == null ? void 0 : b.event)
        }
        s(a, b) {
            this.h && (qg.R(this.h), this.h = null);
            a(b == null ? void 0 : b.event)
        }
    },
    $i;
let bj = [];
w("yt.logging.transport.getScrapedGelPayloads", function() {
    return bj
});

function cj(a, b) {
    const c = dj(b);
    if (a.h[c]) return a.h[c];
    const d = Object.keys(a.store) || [];
    if (d.length <= 1 && dj(b) === d[0]) return d;
    const e = [];
    for (let g = 0; g < d.length; g++) {
        const h = d[g].split("/");
        if (ej(b.auth, h[0])) {
            var f = b.isJspb;
            ej(f === void 0 ? "undefined" : f ? "true" : "false", h[1]) && ej(b.cttAuthInfo, h[2]) && (f = b.tier, f = f === void 0 ? "undefined" : JSON.stringify(f), ej(f, h[3]) && e.push(d[g]))
        }
    }
    return a.h[c] = e
}

function ej(a, b) {
    return a === void 0 || a === "undefined" ? !0 : a === b
}
var fj = class {
    constructor() {
        this.store = {};
        this.h = {}
    }
    storePayload(a, b) {
        a = dj(a);
        this.store[a] ? this.store[a].push(b) : (this.h = {}, this.store[a] = [b]);
        R("more_accurate_gel_parser") && (b = new CustomEvent("TRANSPORTING_NEW_EVENT"), window.dispatchEvent(b));
        return a
    }
    smartExtractMatchingEntries(a) {
        if (!a.keys.length) return [];
        const b = cj(this, a.keys.splice(0, 1)[0]),
            c = [];
        for (let d = 0; d < b.length; d++) this.store[b[d]] && a.sizeLimit && (this.store[b[d]].length <= a.sizeLimit ? (c.push(...this.store[b[d]]), delete this.store[b[d]]) :
            c.push(...this.store[b[d]].splice(0, a.sizeLimit)));
        (a == null ? 0 : a.sizeLimit) && c.length < (a == null ? void 0 : a.sizeLimit) && (a.sizeLimit -= c.length, c.push(...this.smartExtractMatchingEntries(a)));
        return c
    }
    extractMatchingEntries(a) {
        a = cj(this, a);
        const b = [];
        for (let c = 0; c < a.length; c++) this.store[a[c]] && (b.push(...this.store[a[c]]), delete this.store[a[c]]);
        return b
    }
    getSequenceCount(a) {
        a = cj(this, a);
        let b = 0;
        for (let c = 0; c < a.length; c++) {
            let d;
            b += ((d = this.store[a[c]]) == null ? void 0 : d.length) || 0
        }
        return b
    }
};
fj.prototype.getSequenceCount = fj.prototype.getSequenceCount;
fj.prototype.extractMatchingEntries = fj.prototype.extractMatchingEntries;
fj.prototype.smartExtractMatchingEntries = fj.prototype.smartExtractMatchingEntries;
fj.prototype.storePayload = fj.prototype.storePayload;

function dj(a) {
    return [a.auth === void 0 ? "undefined" : a.auth, a.isJspb === void 0 ? "undefined" : a.isJspb, a.cttAuthInfo === void 0 ? "undefined" : a.cttAuthInfo, a.tier === void 0 ? "undefined" : a.tier].join("/")
};

function gj(a, b) {
    if (a) return a[b.name]
};
const hj = S("initial_gel_batch_timeout", 2E3),
    ij = S("gel_queue_timeout_max_ms", 6E4),
    jj = S("gel_min_batch_size", 5);
let kj = void 0;
class lj {
    constructor() {
        this.l = this.h = this.i = 0;
        this.j = !1
    }
}
const mj = new lj,
    nj = new lj,
    oj = new lj,
    pj = new lj;
let qj, rj = !0,
    sj = 1;
const tj = new Map,
    uj = t.ytLoggingTransportTokensToCttTargetIds_ || {},
    vj = t.ytLoggingTransportTokensToJspbCttTargetIds_ || {};
let wj = {};

function xj() {
    let a = u("yt.logging.ims");
    a || (a = new fj, w("yt.logging.ims", a));
    return a
}

function yj(a, b) {
    if (a.endpoint === "log_event") {
        zj();
        var c = Aj(a),
            d = Bj(a.payload) || "";
        a: {
            if (R("enable_web_tiered_gel")) {
                var e = mi[d || ""];
                var f, g;
                if (Ei().resolve(new wi) == null) var h = void 0;
                else {
                    let k;
                    h = (k = u("yt.gcf.config.hotConfigGroup")) != null ? k : Q("RAW_HOT_CONFIG_GROUP");
                    h = h == null ? void 0 : (f = h.loggingHotConfig) == null ? void 0 : (g = f.eventLoggingConfig) == null ? void 0 : g.payloadPolicies
                }
                if (f = h)
                    for (g = 0; g < f.length; g++)
                        if (f[g].payloadNumber === e) {
                            e = f[g];
                            break a
                        }
            }
            e = void 0
        }
        f = 200;
        if (e) {
            if (e.enabled === !1 && !R("web_payload_policy_disabled_killswitch")) return;
            f = Cj(e.tier);
            if (f === 400) {
                Dj(a, b);
                return
            }
        }
        wj[c] = !0;
        c = {
            cttAuthInfo: c,
            isJspb: !1,
            tier: f
        };
        xj().storePayload(c, a.payload);
        Ej(b, c, d === "gelDebuggingEvent")
    }
}

function Ej(a, b, c = !1) {
    a && (kj = new a);
    a = S("tvhtml5_logging_max_batch_ads_fork") || S("tvhtml5_logging_max_batch") || S("web_logging_max_batch") || 100;
    const d = V(),
        e = Fj(!1, b.tier),
        f = e.l;
    c && (e.j = !0);
    c = 0;
    b && (c = xj().getSequenceCount(b));
    c >= 1E3 ? Gj({
        writeThenSend: !0
    }, !1, b.tier) : c >= a ? qj || (qj = Hj(() => {
        Gj({
            writeThenSend: !0
        }, !1, b.tier);
        qj = void 0
    }, 0)) : d - f >= 10 && (Ij(!1, b.tier), e.l = d)
}

function Dj(a, b) {
    if (a.endpoint === "log_event") {
        R("more_accurate_gel_parser") && xj().storePayload({
            isJspb: !1
        }, a.payload);
        zj();
        var c = Aj(a),
            d = new Map;
        d.set(c, [a.payload]);
        var e = Bj(a.payload) || "";
        b && (kj = new b);
        return new L((f, g) => {
            kj && kj.isReady() ? Jj(d, kj, f, g, {
                bypassNetworkless: !0
            }, !0, e === "gelDebuggingEvent") : f()
        })
    }
}

function Aj(a) {
    var b = "";
    if (a.dangerousLogToVisitorSession) b = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        b = a.cttAuthInfo;
        const c = {};
        b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId);
        uj[a.cttAuthInfo.token] = c;
        b = a.cttAuthInfo.token
    }
    return b
}

function Gj(a = {}, b = !1, c) {
    new L((d, e) => {
        const f = Fj(b, c),
            g = f.j;
        f.j = !1;
        Kj(f.i);
        Kj(f.h);
        f.h = 0;
        kj && kj.isReady() ? c === void 0 && R("enable_web_tiered_gel") ? Lj(d, e, a, b, 300, g) : Lj(d, e, a, b, c, g) : (Ij(b, c), d())
    })
}

function Lj(a, b, c = {}, d = !1, e = 200, f = !1) {
    var g = kj,
        h = new Map;
    const k = new Map,
        l = {
            isJspb: d,
            cttAuthInfo: void 0,
            tier: e
        },
        n = {
            isJspb: d,
            cttAuthInfo: void 0
        };
    if (d) {
        for (const p of Object.keys(wj)) b = R("enable_web_tiered_gel") ? xj().smartExtractMatchingEntries({
            keys: [l, n],
            sizeLimit: 1E3
        }) : xj().extractMatchingEntries({
            isJspb: !0,
            cttAuthInfo: p
        }), b.length > 0 && h.set(p, b), (R("web_fp_via_jspb_and_json") && c.writeThenSend || !R("web_fp_via_jspb_and_json")) && delete wj[p];
        Mj(h, g, a, c, f)
    } else {
        for (const p of Object.keys(wj)) h = R("enable_web_tiered_gel") ?
            xj().smartExtractMatchingEntries({
                keys: [{
                    isJspb: !1,
                    cttAuthInfo: p,
                    tier: e
                }, {
                    isJspb: !1,
                    cttAuthInfo: p
                }],
                sizeLimit: 1E3
            }) : xj().extractMatchingEntries({
                isJspb: !1,
                cttAuthInfo: p
            }), h.length > 0 && k.set(p, h), (R("web_fp_via_jspb_and_json") && c.writeThenSend || !R("web_fp_via_jspb_and_json")) && delete wj[p];
        Jj(k, g, a, b, c, !1, f)
    }
}

function Ij(a = !1, b = 200) {
    const c = () => {
            Gj({
                writeThenSend: !0
            }, a, b)
        },
        d = Fj(a, b);
    var e = d === pj || d === oj ? 5E3 : ij;
    R("web_gel_timeout_cap") && !d.h && (e = Hj(() => {
        c()
    }, e), d.h = e);
    Kj(d.i);
    e = Q("LOGGING_BATCH_TIMEOUT", S("web_gel_debounce_ms", 1E4));
    R("shorten_initial_gel_batch_timeout") && rj && (e = hj);
    e = Hj(() => {
        S("gel_min_batch_size") > 0 ? xj().getSequenceCount({
            cttAuthInfo: void 0,
            isJspb: a,
            tier: b
        }) >= jj && c() : c()
    }, e);
    d.i = e
}

function Jj(a, b, c, d, e = {}, f, g) {
    const h = Math.round(V());
    let k = a.size;
    const l = Nj(g);
    for (const [n, p] of a) {
        a = n;
        g = p;
        const q = Kd({
            context: Sh(b.config_ || Rh())
        });
        if (!ha(g) && !R("throw_err_when_logevent_malformed_killswitch")) {
            d();
            break
        }
        q.events = g;
        (g = uj[a]) && Oj(q, a, g);
        delete uj[a];
        const m = a === "visitorOnlyApprovedKey";
        Pj(q, h, m);
        Qj(e);
        const v = E => {
            R("start_client_gcf") && qg.h(() => r(function*() {
                yield Rj(E)
            }));
            k--;
            k || c()
        };
        let z = 0;
        const y = () => {
            z++;
            if (e.bypassNetworkless && z === 1) try {
                ri(b, l, q, Sj({
                    writeThenSend: !0
                }, m, v, y, f)), rj = !1
            } catch (E) {
                xf(E), d()
            }
            k--;
            k || c()
        };
        try {
            ri(b, l, q, Sj(e, m, v, y, f)), rj = !1
        } catch (E) {
            xf(E), d()
        }
    }
}

function Mj(a, b, c, d = {}, e) {
    const f = Math.round(V()),
        g = {
            value: a.size
        };
    var h = new Map([...a]);
    for (const [z] of h) {
        var k = z,
            l = a.get(k);
        h = new Ye;
        var n = b.config_ || Rh(),
            p = new Ue,
            q = new Me;
        J(q, 1, n.ja);
        J(q, 2, n.ia);
        F(q, 16, pc(n.Ba));
        J(q, 17, n.innertubeContextClientVersion);
        if (n.Z) {
            var m = n.Z,
                v = new Ke;
            m.coldConfigData && J(v, 1, m.coldConfigData);
            m.appInstallData && J(v, 6, m.appInstallData);
            m.coldHashData && J(v, 3, m.coldHashData);
            m.hotHashData && J(v, 5, m.hotHashData);
            H(q, Ke, 62, v)
        }
        if ((m = t.devicePixelRatio) && m != 1) {
            if (m != null && typeof m !==
                "number") throw Error(`Value of float/double field must be a number, found ${typeof m}: ${m}`);
            F(q, 65, m)
        }
        m = Mf();
        m !== "" && J(q, 54, m);
        m = Nf();
        if (m.length > 0) {
            v = new Qe;
            for (let y = 0; y < m.length; y++) {
                const E = new Ne;
                J(E, 1, m[y].key);
                Tc(E, 2, Oe, tc(m[y].value));
                $c(v, 15, Ne, E)
            }
            H(p, Qe, 5, v)
        }
        Th(p);
        Uh(n, q);
        R("start_client_gcf") && Vh(q);
        Q("DELEGATED_SESSION_ID") && !R("pageid_as_header_web") && (n = new Te, J(n, 3, Q("DELEGATED_SESSION_ID")));
        !R("fill_delegate_context_in_gel_killswitch") && (m = Q("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT")) &&
            (v = Xc(p, Te, 3) || new Te, n = p, m = J(v, 18, m), H(n, Te, 3, m));
        n = q;
        m = Q("DEVICE", "");
        for (const [y, E] of Object.entries(Ef(m))) m = y, v = E, m === "cbrand" ? J(n, 12, v) : m === "cmodel" ? J(n, 13, v) : m === "cbr" ? J(n, 87, v) : m === "cbrver" ? J(n, 88, v) : m === "cos" ? J(n, 18, v) : m === "cosver" ? J(n, 19, v) : m === "cplatform" && F(n, 42, pc(ig(v)));
        p.j(q);
        H(h, Ue, 1, p);
        if (q = vj[k]) a: {
            if (bd(q, 1)) p = 1;
            else if (q.getPlaylistId()) p = 2;
            else break a;H(h, Xe, 4, q);q = Xc(h, Ue, 1) || new Ue;n = Xc(q, Te, 3) || new Te;m = new Se;J(m, 2, k);F(m, 1, pc(p));$c(n, 12, Se, m);H(q, Te, 3, n)
        }
        delete vj[k];
        k = k === "visitorOnlyApprovedKey";
        Tj() || F(h, 2, f == null ? f : sc(f));
        !k && (p = Q("EVENT_ID")) && (q = Uj(), n = new We, J(n, 1, p), F(n, 2, q == null ? q : sc(q)), H(h, We, 5, n));
        Qj(d);
        if (R("jspb_serialize_with_worker")) {
            li || ((p = Q("WORKER_SERIALIZATION_URL")) ? ((p = p.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue) ? (qa === void 0 && (qa = ra()), q = qa, p = new sa(q ? q.createScriptURL(p) : p)) : p = null, li = p) : li = null);
            q = li || void 0;
            if (!ki && q !== void 0) {
                p = Worker;
                if (q instanceof sa) q = q.h;
                else throw Error("");
                ki = new p(q, void 0)
            }
            if ((p = ki) && d.writeThenSend) {
                tj.set(sj, {
                    client: b,
                    resolve: c,
                    networklessOptions: d,
                    isIsolated: !1,
                    useVSSEndpoint: e,
                    dangerousLogToVisitorSession: k,
                    requestsOutstanding: g
                });
                a = p;
                b = a.postMessage;
                c = Dc(h);
                b.call(a, {
                    op: "gelBatchToSerialize",
                    batchRequest: c,
                    clientEvents: l,
                    key: sj
                });
                sj++;
                break
            }
        }
        if (l) {
            p = [];
            for (q = 0; q < l.length; q++) try {
                p.push(new Ve(l[q]))
            } catch (y) {
                xf(new ef("Transport failed to deserialize " + String(l[q])))
            }
            l = p
        } else l = [];
        for (const y of l) $c(h, 3, Ve, y);
        l = {
            startTime: V(),
            ticks: {},
            infos: {}
        };
        h = JSON.stringify(Dc(h));
        l.ticks.geljspc = V();
        R("log_jspb_serialize_latency") &&
            Math.random() < .001 && di("meta_logging_csi_event", {
                timerName: "gel_jspb_serialize",
                Ub: l
            });
        Vj(h, b, c, d, e, k, g)
    }
}

function Vj(a, b, c, d = {}, e, f, g = {
    value: 0
}) {
    e = Nj(e);
    d = Sj(d, f, h => {
        R("start_client_gcf") && qg.h(() => r(function*() {
            yield Rj(h)
        }));
        g.value--;
        g.value || c()
    }, () => {
        g.value--;
        g.value || c()
    }, !1);
    d.headers["Content-Type"] = "application/json+protobuf";
    d.postBodyFormat = "JSPB";
    d.postBody = a;
    ri(b, e, "", d);
    rj = !1
}

function Qj(a) {
    R("always_send_and_write") && (a.writeThenSend = !1)
}

function Sj(a, b, c, d, e) {
    a = {
        retry: !0,
        onSuccess: c,
        onError: d,
        networklessOptions: a,
        dangerousLogToVisitorSession: b,
        vb: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: "",
        compress: R("compress_gel") || R("compress_gel_lr")
    };
    Tj() && (a.headers["X-Goog-Request-Time"] = JSON.stringify(Math.round(V())));
    return a
}

function Pj(a, b, c) {
    Tj() || (a.requestTimeMs = String(b));
    R("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = Q("EVENT_ID")) && (c = Uj(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function Uj() {
    let a = Q("BATCH_CLIENT_COUNTER") || 0;
    a || (a = Math.floor(Math.random() * 65535 / 2));
    a++;
    a > 65535 && (a = 1);
    P("BATCH_CLIENT_COUNTER", a);
    return a
}

function Oj(a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function zj() {
    var a;
    (a = u("yt.logging.transport.enableScrapingForTest")) || (a = Lf("il_payload_scraping"), a = (a !== void 0 ? String(a) : "") !== "enable_il_payload_scraping");
    a || (bj = [], w("yt.logging.transport.enableScrapingForTest", !0), w("yt.logging.transport.scrapedPayloadsForTesting", bj), w("yt.logging.transport.payloadToScrape", "visualElementShown visualElementHidden visualElementAttached screenCreated visualElementGestured visualElementStateChanged".split(" ")), w("yt.logging.transport.getScrapedPayloadFromClientEventsFunction"),
        w("yt.logging.transport.scrapeClientEvent", !0))
}

function Tj() {
    return R("use_request_time_ms_header") || R("lr_use_request_time_ms_header")
}

function Hj(a, b) {
    return R("transport_use_scheduler") === !1 ? If(a, b) : R("logging_avoid_blocking_during_navigation") || R("lr_logging_avoid_blocking_during_navigation") ? kg(() => {
        Zi().currentState === "none" ? a() : Zi().install({
            none: {
                callback: a
            }
        })
    }, b) : kg(a, b)
}

function Kj(a) {
    R("transport_use_scheduler") ? qg.R(a) : window.clearTimeout(a)
}

function Rj(a) {
    return r(function*() {
        var b, c = a == null ? void 0 : (b = a.responseContext) == null ? void 0 : b.globalConfigGroup;
        b = gj(c, Ie);
        const d = c == null ? void 0 : c.hotHashData,
            e = gj(c, He);
        c = c == null ? void 0 : c.coldHashData;
        const f = Ei().resolve(new wi);
        f && (d && (b ? yield Nh(f, d, b): yield Nh(f, d)), c && (e ? yield Oh(f, c, e): yield Oh(f, c)))
    })
}

function Fj(a, b = 200) {
    return a ? b === 300 ? pj : nj : b === 300 ? oj : mj
}

function Bj(a) {
    a = Object.keys(a);
    for (const b of a)
        if (mi[b]) return b
}

function Cj(a) {
    switch (a) {
        case "DELAYED_EVENT_TIER_UNSPECIFIED":
            return 0;
        case "DELAYED_EVENT_TIER_DEFAULT":
            return 100;
        case "DELAYED_EVENT_TIER_DISPATCH_TO_EMPTY":
            return 200;
        case "DELAYED_EVENT_TIER_FAST":
            return 300;
        case "DELAYED_EVENT_TIER_IMMEDIATE":
            return 400;
        default:
            return 200
    }
}

function Nj(a = !1) {
    return a && R("vss_through_gel_video_stats") ? "video_stats" : "log_event"
};
const Wj = t.ytLoggingGelSequenceIdObj_ || {};

function Xj(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || V());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    a = u("_lact", window);
    a = a == null ? -1 : Math.max(Date.now() - a, 0);
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(a) ? -1 : a)
    };
    d.sequenceGroup && !R("web_gel_sequence_info_killswitch") && (a = e.context, b = d.sequenceGroup, Wj[b] = b in Wj ? Wj[b] + 1 : 0, a.sequence = {
        index: Wj[b],
        groupKey: b
    }, d.endOfSequence && delete Wj[d.sequenceGroup]);
    (d.sendIsolatedPayload ? Dj : yj)({
        endpoint: "log_event",
        payload: e,
        cttAuthInfo: d.cttAuthInfo,
        dangerousLogToVisitorSession: d.dangerousLogToVisitorSession
    }, c)
}

function Yj(a = !1) {
    Gj(void 0, a)
};
let Zj = [];

function Y(a, b, c = {}) {
    let d = si;
    Q("ytLoggingEventsDefaultDisabled", !1) && si === si && (d = null);
    Xj(a, b, d, c)
};
var ak = new Set,
    bk = 0,
    ck = 0,
    dk = 0,
    ek = [];
const fk = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function gk(a) {
    hk(a)
}

function ik(a) {
    hk(a, "WARNING")
}

function hk(a, b = "ERROR") {
    var c = {};
    c.name = Q("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = Q("INNERTUBE_CONTEXT_CLIENT_VERSION");
    jk(a, c, b)
}

function jk(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (R("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(bk >= 5)) {
            var e = za(a);
            d = e.message || "Unknown Error";
            const p =
                e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${p}: ${d}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let q = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var h = 0; h < a.args.length && !(q = bg(a.args[h], `params.${h}`, b, q), q >= 500); h++);
            else if (a.hasOwnProperty("params") && a.params) {
                const m = a.params;
                if (typeof a.params === "object")
                    for (h in m) {
                        if (!m[h]) continue;
                        const v = `params.${h}`,
                            z = dg(m[h]);
                        b[v] = z;
                        q += v.length +
                            z.length;
                        if (q > 500) break
                    } else b.params = dg(m)
            }
            if (ek.length)
                for (h = 0; h < ek.length && !(q = bg(ek[h], `params.context.${h}`, b, q), q >= 500); h++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: d,
                name: p,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if (a.level === "IGNORED") var k = 0;
            else a: {
                a = Vf();
                for (k of a.F)
                    if (b.message && b.message.match(k.Ga)) {
                        k = k.weight;
                        break a
                    }
                for (var l of a.D)
                    if (l.callback(b)) {
                        k =
                            l.weight;
                        break a
                    }
                k = 1
            }
            b.sampleWeight = k;
            k = b;
            for (var n of Sf)
                if (n.U[k.name]) {
                    l = n.U[k.name];
                    for (const m of l)
                        if (l = k.message.match(m.u)) {
                            k.params["params.error.original"] = l[0];
                            a = m.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = l[d + 1], k.params[`params.error.${a[d]}`] = l[d + 1];
                            k.message = n.ba(b);
                            break
                        }
                }
            k.params || (k.params = {});
            n = Vf();
            k.params["params.errorServiceSignature"] = `msg=${n.F.length}&cb=${n.D.length}`;
            k.params["params.serviceWorker"] = "true";
            t.document && t.document.querySelectorAll && (k.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            (new Nd(Od, "sample")).constructor !== Nd && (k.params["params.fconst"] = "true");
            window.yterr && typeof window.yterr === "function" && window.yterr(k);
            k.sampleWeight === 0 || ak.has(k.message) || kk(k, c)
        }
    }
}

function kk(a, b = "ERROR") {
    if (b === "ERROR") {
        Zf.B("handleError", a);
        if (R("record_app_crashed_web") && dk === 0 && a.sampleWeight === 1) {
            dk++;
            var c = {
                appCrashType: "APP_CRASH_TYPE_BREAKPAD"
            };
            R("report_client_error_with_app_crash_ks") || (c.systemHealth = {
                crashData: {
                    clientError: {
                        logMessage: {
                            message: a.message
                        }
                    }
                }
            });
            Y("appCrashed", c)
        }
        ck++
    } else b === "WARNING" && Zf.B("handleWarning", a);
    c = {};
    b: {
        for (e of fk) {
            var d = Qa();
            if (d && d.toLowerCase().indexOf(e.toLowerCase()) >= 0) {
                var e = !0;
                break b
            }
        }
        e = !1
    }
    if (e) c = void 0;
    else {
        d = {
            stackTrace: a.stack
        };
        a.fileName && (d.filename = a.fileName);
        e = a.lineNumber && a.lineNumber.split ? a.lineNumber.split(":") : [];
        e.length !== 0 && (e.length !== 1 || isNaN(Number(e[0])) ? e.length !== 2 || isNaN(Number(e[0])) || isNaN(Number(e[1])) || (d.lineNumber = Number(e[0]), d.columnNumber = Number(e[1])) : d.lineNumber = Number(e[0]));
        e = {
            level: "ERROR_LEVEL_UNKNOWN",
            message: a.message,
            errorClassName: a.name,
            sampleWeight: a.sampleWeight
        };
        b === "ERROR" ? e.level = "ERROR_LEVEL_ERROR" : b === "WARNING" && (e.level = "ERROR_LEVEL_WARNNING");
        d = {
            isObfuscated: !0,
            browserStackInfo: d
        };
        c.pageUrl = window.location.href;
        c.kvPairs = [];
        Q("FEXP_EXPERIMENTS") && (c.experimentIds = Q("FEXP_EXPERIMENTS"));
        var f = Q("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS");
        const k = tf.EXPERIMENT_FLAGS;
        if ((!k || !k.web_disable_gel_stp_ecatcher_killswitch) && f)
            for (var g of Object.keys(f)) c.kvPairs.push({
                key: g,
                value: String(f[g])
            });
        if (g = a.params)
            for (var h of Object.keys(g)) c.kvPairs.push({
                key: `client.${h}`,
                value: String(g[h])
            });
        h = Q("SERVER_NAME");
        g = Q("SERVER_VERSION");
        h && g && (c.kvPairs.push({
                key: "server.name",
                value: h
            }),
            c.kvPairs.push({
                key: "server.version",
                value: g
            }));
        c = {
            errorMetadata: c,
            stackTrace: d,
            logMessage: e
        }
    }
    if (c && (Y("clientError", c), b === "ERROR" || R("errors_flush_gel_always_killswitch"))) a: {
        if (R("web_fp_via_jspb")) {
            b = Zj;
            Zj = [];
            if (b)
                for (const k of b) Xj(k.N, k.payload, si, k.options);
            Yj(!0);
            if (!R("web_fp_via_jspb_and_json")) break a
        }
        Yj()
    }
    try {
        ak.add(a.message)
    } catch (k) {}
    bk++
}

function lk(a, ...b) {
    a.args || (a.args = []);
    a.args.push(...b)
};

function mk(a) {
    return r(function*() {
        var b = yield t.fetch(a.i);
        if (b.status !== 200) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === "yt.sw.adr") {
                    b = new pf(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function nk(a = !1) {
    const b = ok.h;
    return r(function*() {
        if (a || !b.h) b.h = mk(b).then(b.j).catch(c => {
            delete b.h;
            hk(c)
        });
        return b.h
    })
}
var ok = class {
    constructor() {
        this.i = pk("/sw.js_data")
    }
    j(a) {
        const b = Xc(a, of , 2);
        if (b) {
            var c = ad(b, 5);
            c && (t.__SAPISID = c);
            I(b, 10) != null ? P("EOM_VISITOR_DATA", ad(b, 10)) : I(b, 7) != null && P("VISITOR_DATA", ad(b, 7));
            if (rc(Nc(b, 4)) != null) {
                c = String;
                let e;
                var d = (e = rc(Nc(b, 4))) != null ? e : 0;
                P("SESSION_INDEX", c(d))
            }
            I(b, 8) != null && P("DELEGATED_SESSION_ID", ad(b, 8));
            I(b, 12) != null && P("USER_SESSION_ID", ad(b, 12));
            I(b, 11) != null && P("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT", ad(b, 11))
        }
        return a
    }
};

function qk(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, typeof b.expirationSeconds === "string" && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, Number(b.expirationSeconds) * 1E3))
}
var rk = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        if (!b) throw Error("request needs to be passed into ConsistencyService");
        let c, d;
        b = ((c = b.G.context) == null ? void 0 : (d = c.request) == null ? void 0 : d.consistencyTokenJars) || [];
        let e;
        if (a = (e = a.responseContext) == null ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            qk(this, a)
        }
    }
};
let sk = Date.now().toString();

function tk() {
    if (window.crypto && window.crypto.getRandomValues) try {
        var a = Array(16),
            b = new Uint8Array(16);
        window.crypto.getRandomValues(b);
        for (var c = 0; c < a.length; c++) a[c] = b[c];
        return a
    } catch (d) {}
    a = Array(16);
    for (b = 0; b < 16; b++) {
        c = Date.now();
        for (let d = 0; d < c % 23; d++) a[b] = Math.random();
        a[b] = Math.floor(Math.random() * 256)
    }
    if (sk)
        for (b = 1, c = 0; c < sk.length; c++) a[b % 16] = a[b % 16] ^ a[(b - 1) % 16] / 4 ^ sk.charCodeAt(c), b++;
    return a
};
var uk;
let vk = t.ytLoggingDocDocumentNonce_;
if (!vk) {
    const a = tk(),
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    vk = b.join("")
}
uk = vk;
var wk = {
    Sa: 0,
    Pa: 1,
    Ra: 2,
    eb: 3,
    Ua: 4,
    qb: 5,
    fb: 6,
    mb: 7,
    kb: 8,
    lb: 9,
    pb: 10,
    jb: 11,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS",
    9: "RICH_GRID_WATCH",
    10: "UNPLUGGED_BROWSE",
    11: "PICTURE_IN_PICTURE"
};
let xk = 1;

function yk(a) {
    return new zk({
        trackingParams: a
    })
}

function Ak(a, b, c, d, e, f) {
    const g = xk++;
    return new zk({
        veType: a,
        veCounter: g,
        elementIndex: c,
        dataElement: b,
        youtubeData: d,
        jspbYoutubeData: e,
        loggingDirectives: f
    })
}
var zk = class {
    constructor(a) {
        this.h = a
    }
    getAsJson() {
        const a = {};
        this.h.trackingParams !== void 0 ? a.trackingParams = this.h.trackingParams : (a.veType = this.h.veType, this.h.veCounter !== void 0 && (a.veCounter = this.h.veCounter), this.h.elementIndex !== void 0 && (a.elementIndex = this.h.elementIndex));
        this.h.dataElement !== void 0 && (a.dataElement = this.h.dataElement.getAsJson());
        this.h.youtubeData !== void 0 && (a.youtubeData = this.h.youtubeData);
        this.h.isCounterfactual && (a.isCounterfactual = !0);
        return a
    }
    getAsJspb() {
        const a = new Pe;
        if (this.h.trackingParams !== void 0) a.setTrackingParams(this.h.trackingParams);
        else {
            if (this.h.veType !== void 0) {
                var b = this.h.veType;
                F(a, 2, b == null ? b : qc(b))
            }
            this.h.veCounter !== void 0 && (b = this.h.veCounter, F(a, 6, b == null ? b : qc(b)));
            this.h.elementIndex !== void 0 && (b = this.h.elementIndex, F(a, 3, b == null ? b : qc(b)));
            this.h.isCounterfactual && F(a, 5, !0)
        }
        this.h.dataElement !== void 0 && (b = this.h.dataElement.getAsJspb(), H(a, Pe, 7, b));
        this.h.youtubeData !== void 0 && H(a, Je, 8, this.h.jspbYoutubeData);
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.h.trackingParams &&
            !!this.h.veType
    }
    getLoggingDirectives() {
        return this.h.loggingDirectives
    }
};

function Bk(a = 0) {
    return Q("client-screen-nonce-store", {})[a]
}

function Ck(a, b = 0) {
    let c = Q("client-screen-nonce-store");
    c || (c = {}, P("client-screen-nonce-store", c));
    c[b] = a
}

function Dk(a = 0) {
    return a === 0 ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function Ek(a = 0) {
    return Q(Dk(a))
}

function Fk(a = 0) {
    return (a = Ek(a)) ? new zk({
        veType: a,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    }) : null
}

function Gk() {
    let a = Q("csn-to-ctt-auth-info");
    a || (a = {}, P("csn-to-ctt-auth-info", a));
    return a
}

function Hk() {
    return Object.values(Q("client-screen-nonce-store", {})).filter(a => a !== void 0)
}

function Z(a = 0) {
    a = Bk(a);
    if (!a && !Q("USE_CSN_FALLBACK", !0)) return null;
    a || (a = "UNDEFINED_CSN");
    return a ? a : null
}

function Ik(a) {
    for (const b of Object.values(wk))
        if (Z(b) === a) return !0;
    return !1
}

function Jk(a, b, c) {
    const d = Gk();
    (c = Z(c)) && delete d[c];
    b && (d[a] = b)
}

function Kk(a) {
    return Gk()[a]
}

function Lk(a, b, c = 0, d) {
    if (a !== Bk(c) || b !== Q(Dk(c)))
        if (Jk(a, d, c), Ck(a, c), P(Dk(c), b), b = () => {
                setTimeout(() => {
                    a && Y("foregroundHeartbeatScreenAssociated", {
                        clientDocumentNonce: uk,
                        clientScreenNonce: a
                    })
                }, 0)
            }, "requestAnimationFrame" in window) try {
            window.requestAnimationFrame(b)
        } catch (e) {
            b()
        } else b()
};

function Mk() {
    var a = Q("INNERTUBE_CONTEXT");
    if (!a) return hk(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = Kd(a);
    R("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = Mf();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    rk.h || (rk.h = new rk);
    b = rk.h.h;
    c = [];
    let d = 0;
    for (var e in b) c[d++] = b[e];
    a.request = Object.assign({}, a.request, {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    if (e = Q("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT")) a.user.serializedDelegationContext = e;
    return a
};

function Nk(a) {
    var b = a;
    if (a = Q("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(Da);
        b = d[5];
        var e = d[6];
        d = d[7];
        let f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};

function Ok(a) {
    const b = {
        "Content-Type": "application/json"
    };
    Q("EOM_VISITOR_DATA") ? b["X-Goog-EOM-Visitor-Id"] = Q("EOM_VISITOR_DATA") : Q("VISITOR_DATA") && (b["X-Goog-Visitor-Id"] = Q("VISITOR_DATA"));
    b["X-Youtube-Bootstrap-Logged-In"] = Q("LOGGED_IN", !1);
    Q("DEBUG_SETTINGS_METADATA") && (b["X-Debug-Settings-Metadata"] = Q("DEBUG_SETTINGS_METADATA"));
    a !== "cors" && ((a = Q("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = Q("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a =
        Q("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), (a = Q("DOMAIN_ADMIN_STATE")) && (b["X-Youtube-Domain-Admin-State"] = a), Q("ENABLE_LAVA_HEADER_ON_IT_EXPANSION") && (a = Q("SERIALIZED_LAVA_DEVICE_CONTEXT")) && (b["X-YouTube-Lava-Device-Context"] = a));
    return b
};
var Pk = class {
    constructor() {
        this.h = {}
    }
    get(a) {
        if (Object.prototype.hasOwnProperty.call(this.h, a)) return this.h[a]
    }
    set(a, b) {
        this.h[a] = b
    }
    remove(a) {
        delete this.h[a]
    }
};
new class {
    constructor() {
        this.mappings = new Pk
    }
    get(a) {
        a: {
            var b = this.mappings.get(a.toString());
            switch (b.type) {
                case "mapping":
                    a = b.value;
                    break a;
                case "factory":
                    b = b.value();
                    this.mappings.set(a.toString(), {
                        type: "mapping",
                        value: b
                    });
                    a = b;
                    break a;
                default:
                    a = ta(b, void 0)
            }
        }
        return a
    }
};
var Qk = class {},
    Rk = class extends Qk {};
const Sk = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends Rk {})
};
class Zh extends Xh {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const gi = new Yh,
    Tk = [];
let Vk = Uk,
    Wk = 0;
const Xk = new Map,
    Yk = new Map,
    Zk = new Map;

function $k(a, b, c, d, e, f, g, h) {
    const k = Vk(),
        l = new zk({
            veType: b,
            youtubeData: f,
            jspbYoutubeData: void 0
        });
    f = al({}, k);
    e && (f.cttAuthInfo = e);
    e = {
        csn: k,
        pageVe: l.getAsJson()
    };
    R("expectation_logging") && h && h.screenCreatedLoggingExpectations && (e.screenCreatedLoggingExpectations = h.screenCreatedLoggingExpectations);
    c && c.visualElement ? (e.implicitGesture = {
        parentCsn: c.clientScreenNonce,
        gesturedVe: c.visualElement.getAsJson()
    }, g && (e.implicitGesture.gestureType = g)) : c && ik(new ef("newScreen() parent element does not have a VE - rootVe",
        b));
    d && (e.cloneCsn = d);
    a ? Xj("screenCreated", e, a, f) : Y("screenCreated", e, f);
    di(gi, new Zh(k));
    Xk.clear();
    Yk.clear();
    Zk.clear();
    return k
}

function bl(a, b, c, d, e = !1) {
    cl(a, b, c, [d], e)
}

function cl(a, b, c, d, e = !1) {
    const f = al({
        cttAuthInfo: Kk(b) || void 0
    }, b);
    for (const h of d) {
        var g = h.getAsJson();
        (Jd(g) || !g.trackingParams && !g.veType) && ik(Error("Child VE logged with no data"));
        if (R("no_client_ve_attach_unless_shown")) {
            const k = dl(h, b);
            if (g.veType && !Yk.has(k) && !Zk.has(k) && !e) {
                if (!R("il_attach_cache_limit") || Xk.size < 1E3) {
                    Xk.set(k, [a, b, c, h]);
                    return
                }
                R("il_attach_cache_limit") && Xk.size > 1E3 && ik(new ef("IL Attach cache exceeded limit"))
            }
            g = dl(c, b);
            Xk.has(g) ? el(c, b) : Zk.set(g, !0)
        }
    }
    d = d.filter(h => {
        h.csn !==
            b ? (h.csn = b, h = !0) : h = !1;
        return h
    });
    c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: va(d, h => h.getAsJson())
    };
    b === "UNDEFINED_CSN" ? fl("visualElementAttached", f, c) : a ? Xj("visualElementAttached", c, a, f) : Y("visualElementAttached", c, f)
}

function gl(a, b, c, d, e) {
    hl(a, b, c, e)
}

function hl(a, b, c, d) {
    il(c, b);
    const e = al({
        cttAuthInfo: Kk(b) || void 0
    }, b);
    c = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    };
    d && (c.clientData = d);
    b === "UNDEFINED_CSN" ? fl("visualElementShown", e, c) : a ? Xj("visualElementShown", c, a, e) : Y("visualElementShown", c, e)
}

function jl(a, b, c, d = !1) {
    const e = d ? 16 : 8;
    d = al({
        cttAuthInfo: Kk(b) || void 0,
        endOfSequence: d
    }, b);
    c = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    };
    b === "UNDEFINED_CSN" ? fl("visualElementHidden", d, c) : a ? Xj("visualElementHidden", c, a, d) : Y("visualElementHidden", c, d)
}

function kl(a, b, c, d) {
    var e = void 0;
    il(c, b);
    e = e || "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";
    const f = al({
        cttAuthInfo: Kk(b) || void 0
    }, b);
    c = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: e
    };
    d && (c.clientData = d);
    b === "UNDEFINED_CSN" ? fl("visualElementGestured", f, c) : a ? Xj("visualElementGestured", c, a, f) : Y("visualElementGestured", c, f)
}

function Uk() {
    let a;
    a = tk();
    const b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    return b.join("")
}

function fl(a, b, c) {
    Tk.push({
        N: a,
        payload: c,
        Cb: void 0,
        options: b
    });
    Wk || (Wk = hi())
}

function ii(a) {
    if (Tk) {
        for (const b of Tk) b.payload && (b.payload.csn = a.csn, Y(b.N, b.payload, b.options));
        Tk.length = 0
    }
    Wk = 0
}

function dl(a, b) {
    return `${a.getAsJson().veType}${a.getAsJson().veCounter}${b}`
}

function il(a, b) {
    if (R("no_client_ve_attach_unless_shown")) {
        var c = dl(a, b);
        Yk.set(c, !0);
        el(a, b)
    }
}

function el(a, b) {
    a = dl(a, b);
    Xk.has(a) && (b = Xk.get(a) || [], bl(b[0], b[1], b[2], b[3], !0), Xk.delete(a))
}

function al(a, b) {
    R("log_sequence_info_on_gel_web") && (a.sequenceGroup = b);
    return a
};
Object.assign({
    auto_search: "LATENCY_ACTION_AUTO_SEARCH",
    ad_to_ad: "LATENCY_ACTION_AD_TO_AD",
    ad_to_video: "LATENCY_ACTION_AD_TO_VIDEO",
    app_startup: "LATENCY_ACTION_APP_STARTUP",
    browse: "LATENCY_ACTION_BROWSE",
    cast_splash: "LATENCY_ACTION_CAST_SPLASH",
    channel_activity: "LATENCY_ACTION_KIDS_CHANNEL_ACTIVITY",
    channels: "LATENCY_ACTION_CHANNELS",
    chips: "LATENCY_ACTION_CHIPS",
    commerce_transaction: "LATENCY_ACTION_COMMERCE_TRANSACTION",
    direct_playback: "LATENCY_ACTION_DIRECT_PLAYBACK",
    editor: "LATENCY_ACTION_EDITOR",
    embed: "LATENCY_ACTION_EMBED",
    embed_no_video: "LATENCY_ACTION_EMBED_NO_VIDEO",
    entity_key_serialization_perf: "LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF",
    entity_key_deserialization_perf: "LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF",
    explore: "LATENCY_ACTION_EXPLORE",
    favorites: "LATENCY_ACTION_FAVORITES",
    home: "LATENCY_ACTION_HOME",
    inboarding: "LATENCY_ACTION_INBOARDING",
    library: "LATENCY_ACTION_LIBRARY",
    live: "LATENCY_ACTION_LIVE",
    live_pagination: "LATENCY_ACTION_LIVE_PAGINATION",
    management: "LATENCY_ACTION_MANAGEMENT",
    mini_app: "LATENCY_ACTION_MINI_APP_PLAY",
    notification_settings: "LATENCY_ACTION_KIDS_NOTIFICATION_SETTINGS",
    onboarding: "LATENCY_ACTION_ONBOARDING",
    parent_profile_settings: "LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS",
    parent_tools_collection: "LATENCY_ACTION_PARENT_TOOLS_COLLECTION",
    parent_tools_dashboard: "LATENCY_ACTION_PARENT_TOOLS_DASHBOARD",
    player_att: "LATENCY_ACTION_PLAYER_ATTESTATION",
    prebuffer: "LATENCY_ACTION_PREBUFFER",
    prefetch: "LATENCY_ACTION_PREFETCH",
    profile_settings: "LATENCY_ACTION_KIDS_PROFILE_SETTINGS",
    profile_switcher: "LATENCY_ACTION_LOGIN",
    projects: "LATENCY_ACTION_PROJECTS",
    reel_watch: "LATENCY_ACTION_REEL_WATCH",
    results: "LATENCY_ACTION_RESULTS",
    red: "LATENCY_ACTION_PREMIUM_PAGE_GET_BROWSE",
    premium: "LATENCY_ACTION_PREMIUM_PAGE_GET_BROWSE",
    privacy_policy: "LATENCY_ACTION_KIDS_PRIVACY_POLICY",
    review: "LATENCY_ACTION_REVIEW",
    search_overview_answer: "LATENCY_ACTION_SEARCH_OVERVIEW_ANSWER",
    search_ui: "LATENCY_ACTION_SEARCH_UI",
    search_suggest: "LATENCY_ACTION_SUGGEST",
    search_zero_state: "LATENCY_ACTION_SEARCH_ZERO_STATE",
    secret_code: "LATENCY_ACTION_KIDS_SECRET_CODE",
    seek: "LATENCY_ACTION_PLAYER_SEEK",
    settings: "LATENCY_ACTION_SETTINGS",
    store: "LATENCY_ACTION_STORE",
    supervision_dashboard: "LATENCY_ACTION_KIDS_SUPERVISION_DASHBOARD",
    tenx: "LATENCY_ACTION_TENX",
    video_preview: "LATENCY_ACTION_VIDEO_PREVIEW",
    video_to_ad: "LATENCY_ACTION_VIDEO_TO_AD",
    watch: "LATENCY_ACTION_WATCH",
    watch_it_again: "LATENCY_ACTION_KIDS_WATCH_IT_AGAIN",
    "watch,watch7": "LATENCY_ACTION_WATCH",
    "watch,watch7_html5": "LATENCY_ACTION_WATCH",
    "watch,watch7ad": "LATENCY_ACTION_WATCH",
    "watch,watch7ad_html5": "LATENCY_ACTION_WATCH",
    wn_comments: "LATENCY_ACTION_LOAD_COMMENTS",
    ww_rqs: "LATENCY_ACTION_WHO_IS_WATCHING",
    voice_assistant: "LATENCY_ACTION_VOICE_ASSISTANT",
    cast_load_by_entity_to_watch: "LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH",
    networkless_performance: "LATENCY_ACTION_NETWORKLESS_PERFORMANCE",
    gel_compression: "LATENCY_ACTION_GEL_COMPRESSION",
    gel_jspb_serialize: "LATENCY_ACTION_GEL_JSPB_SERIALIZE",
    attestation_challenge_fetch: "LATENCY_ACTION_ATTESTATION_CHALLENGE_FETCH"
}, {
    "analytics.explore": "LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE",
    "artist.analytics": "LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS",
    "artist.events": "LATENCY_ACTION_CREATOR_ARTIST_CONCERTS",
    "artist.presskit": "LATENCY_ACTION_CREATOR_ARTIST_PROFILE",
    "asset.claimed_videos": "LATENCY_ACTION_CREATOR_CMS_ASSET_CLAIMED_VIDEOS",
    "asset.composition": "LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION",
    "asset.composition_ownership": "LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION_OWNERSHIP",
    "asset.composition_policy": "LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION_POLICY",
    "asset.embeds": "LATENCY_ACTION_CREATOR_CMS_ASSET_EMBEDS",
    "asset.history": "LATENCY_ACTION_CREATOR_CMS_ASSET_HISTORY",
    "asset.issues": "LATENCY_ACTION_CREATOR_CMS_ASSET_ISSUES",
    "asset.licenses": "LATENCY_ACTION_CREATOR_CMS_ASSET_LICENSES",
    "asset.metadata": "LATENCY_ACTION_CREATOR_CMS_ASSET_METADATA",
    "asset.ownership": "LATENCY_ACTION_CREATOR_CMS_ASSET_OWNERSHIP",
    "asset.policy": "LATENCY_ACTION_CREATOR_CMS_ASSET_POLICY",
    "asset.references": "LATENCY_ACTION_CREATOR_CMS_ASSET_REFERENCES",
    "asset.shares": "LATENCY_ACTION_CREATOR_CMS_ASSET_SHARES",
    "asset.sound_recordings": "LATENCY_ACTION_CREATOR_CMS_ASSET_SOUND_RECORDINGS",
    "asset_group.assets": "LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_ASSETS",
    "asset_group.campaigns": "LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_CAMPAIGNS",
    "asset_group.claimed_videos": "LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_CLAIMED_VIDEOS",
    "asset_group.metadata": "LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_METADATA",
    "song.analytics": "LATENCY_ACTION_CREATOR_SONG_ANALYTICS",
    creator_channel_dashboard: "LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD",
    "channel.analytics": "LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS",
    "channel.comments": "LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS",
    "channel.content": "LATENCY_ACTION_CREATOR_POST_LIST",
    "channel.content.promotions": "LATENCY_ACTION_CREATOR_PROMOTION_LIST",
    "channel.copyright": "LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT",
    "channel.editing": "LATENCY_ACTION_CREATOR_CHANNEL_EDITING",
    "channel.monetization": "LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION",
    "channel.music": "LATENCY_ACTION_CREATOR_CHANNEL_MUSIC",
    "channel.music_storefront": "LATENCY_ACTION_CREATOR_CHANNEL_MUSIC_STOREFRONT",
    "channel.playlists": "LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS",
    "channel.translations": "LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS",
    "channel.videos": "LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS",
    "channel.live_streaming": "LATENCY_ACTION_CREATOR_LIVE_STREAMING",
    "dialog.copyright_strikes": "LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES",
    "dialog.video_copyright": "LATENCY_ACTION_CREATOR_DIALOG_VIDEO_COPYRIGHT",
    "dialog.uploads": "LATENCY_ACTION_CREATOR_DIALOG_UPLOADS",
    owner: "LATENCY_ACTION_CREATOR_CMS_DASHBOARD",
    "owner.allowlist": "LATENCY_ACTION_CREATOR_CMS_ALLOWLIST",
    "owner.analytics": "LATENCY_ACTION_CREATOR_CMS_ANALYTICS",
    "owner.art_tracks": "LATENCY_ACTION_CREATOR_CMS_ART_TRACKS",
    "owner.assets": "LATENCY_ACTION_CREATOR_CMS_ASSETS",
    "owner.asset_groups": "LATENCY_ACTION_CREATOR_CMS_ASSET_GROUPS",
    "owner.bulk": "LATENCY_ACTION_CREATOR_CMS_BULK_HISTORY",
    "owner.campaigns": "LATENCY_ACTION_CREATOR_CMS_CAMPAIGNS",
    "owner.channel_invites": "LATENCY_ACTION_CREATOR_CMS_CHANNEL_INVITES",
    "owner.channels": "LATENCY_ACTION_CREATOR_CMS_CHANNELS",
    "owner.claimed_videos": "LATENCY_ACTION_CREATOR_CMS_CLAIMED_VIDEOS",
    "owner.claims": "LATENCY_ACTION_CREATOR_CMS_MANUAL_CLAIMING",
    "owner.claims.manual": "LATENCY_ACTION_CREATOR_CMS_MANUAL_CLAIMING",
    "owner.delivery": "LATENCY_ACTION_CREATOR_CMS_CONTENT_DELIVERY",
    "owner.delivery_templates": "LATENCY_ACTION_CREATOR_CMS_DELIVERY_TEMPLATES",
    "owner.issues": "LATENCY_ACTION_CREATOR_CMS_ISSUES",
    "owner.licenses": "LATENCY_ACTION_CREATOR_CMS_LICENSES",
    "owner.pitch_music": "LATENCY_ACTION_CREATOR_CMS_PITCH_MUSIC",
    "owner.policies": "LATENCY_ACTION_CREATOR_CMS_POLICIES",
    "owner.releases": "LATENCY_ACTION_CREATOR_CMS_RELEASES",
    "owner.reports": "LATENCY_ACTION_CREATOR_CMS_REPORTS",
    "owner.videos": "LATENCY_ACTION_CREATOR_CMS_VIDEOS",
    "playlist.videos": "LATENCY_ACTION_CREATOR_PLAYLIST_VIDEO_LIST",
    "post.comments": "LATENCY_ACTION_CREATOR_POST_COMMENTS",
    "post.edit": "LATENCY_ACTION_CREATOR_POST_EDIT",
    "promotion.edit": "LATENCY_ACTION_CREATOR_PROMOTION_EDIT",
    "video.analytics": "LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS",
    "video.claims": "LATENCY_ACTION_CREATOR_VIDEO_CLAIMS",
    "video.comments": "LATENCY_ACTION_CREATOR_VIDEO_COMMENTS",
    "video.copyright": "LATENCY_ACTION_CREATOR_VIDEO_COPYRIGHT",
    "video.edit": "LATENCY_ACTION_CREATOR_VIDEO_EDIT",
    "video.editor": "LATENCY_ACTION_CREATOR_VIDEO_EDITOR",
    "video.editor_async": "LATENCY_ACTION_CREATOR_VIDEO_EDITOR_ASYNC",
    "video.live_settings": "LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS",
    "video.live_streaming": "LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING",
    "video.monetization": "LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION",
    "video.policy": "LATENCY_ACTION_CREATOR_VIDEO_POLICY",
    "video.rights_management": "LATENCY_ACTION_CREATOR_VIDEO_RIGHTS_MANAGEMENT",
    "video.translations": "LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS"
});
w("ytLoggingLatencyUsageStats_", t.ytLoggingLatencyUsageStats_ || {});
const ll = window;
class ml {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var nl = ll.performance || ll.mozPerformance || ll.msPerformance || ll.webkitPerformance || new ml;
ka(nl.clearResourceTimings || nl.webkitClearResourceTimings || nl.mozClearResourceTimings || nl.msClearResourceTimings || nl.oClearResourceTimings || Id, nl);
const ol = ["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse", "type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.PlayerResponse"];

function pl(a) {
    var b = {
            xb: {}
        },
        c = eg();
    if (zi.h !== void 0) {
        const d = zi.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new ef("InnerTubeTransportService is already initialized", a);
    } else zi.h = new zi(b, a, c)
}

function ql(a, b) {
    return r(function*() {
        var c;
        const d = a == null ? void 0 : (c = a.ea) == null ? void 0 : c.sessionIndex;
        c = yield me(gg(0, {
            sessionIndex: d
        }));
        return Promise.resolve(Object.assign({}, Ok(b), c))
    })
}

function rl(a, b, c, d = () => {}) {
    return r(function*() {
        var e;
        if (b == null ? 0 : (e = b.G) == null ? 0 : e.context) {
            e = b.G.context;
            for (var f of []) yield f.Ib(e)
        }
        var g;
        if ((g = a.i) == null ? 0 : g.Qb(b.input, b.G)) return yield a.i.Eb(b.input, b.G);
        var h;
        if ((g = (h = b.config) == null ? void 0 : h.Lb) && a.h.has(g)) var k = a.h.get(g);
        else {
            h = JSON.stringify(b.G);
            let q;
            f = (q = (k = b.O) == null ? void 0 : k.headers) != null ? q : {};
            b.O = Object.assign({}, b.O, {
                headers: Object.assign({}, f, c)
            });
            k = Object.assign({}, b.O);
            b.O.method === "POST" && (k = Object.assign({}, k, {
                body: h
            }));
            k = a.l.fetch(b.input, k, b.config);
            g && a.h.set(g, k)
        }
        k = yield k;
        var l;
        let n;
        if (k && "error" in k && ((l = k) == null ? 0 : (n = l.error) == null ? 0 : n.details)) {
            l = k.error.details;
            for (const q of l)(l = q["@type"]) && ol.indexOf(l) > -1 && (delete q["@type"], k = q)
        }
        g && a.h.has(g) && a.h.delete(g);
        let p;
        !k && ((p = a.i) == null ? 0 : p.wb(b.input, b.G)) && (k = yield a.i.Db(b.input, b.G));
        d();
        return k || void 0
    })
}

function sl(a, b, c) {
    var d = {
        ea: {
            identity: hg
        }
    };
    let e = () => {};
    b.context || (b.context = Mk());
    return new L(f => r(function*() {
        var g = Nk(c);
        g = Hf(g) ? "same-origin" : "cors";
        if (a.j.La) {
            var h, k = d == null ? void 0 : (h = d.ea) == null ? void 0 : h.sessionIndex;
            h = gg(0, {
                sessionIndex: k
            });
            g = Object.assign({}, Ok(g), h)
        } else g = yield ql(d, g);
        h = Nk(c);
        k = {};
        R("json_condensed_response") && (k.prettyPrint = "false");
        h = Gf(h, k || {}, !1);
        k = {
            method: "POST",
            mode: Hf(h) ? "same-origin" : "cors",
            credentials: Hf(h) ? "same-origin" : "include"
        };
        var l = {};
        const n = {};
        for (const p of Object.keys(l)) l[p] && (n[p] = l[p]);
        Object.keys(n).length >
            0 && (k.headers = n);
        f(rl(a, {
            input: h,
            O: k,
            G: b,
            config: d
        }, g, e))
    }))
}
var zi = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.da || (a.da = {});
        a.da = Object.assign({}, Sk, a.da)
    }
};
var yi = new vi;
let tl;

function ul() {
    if (!tl) {
        const a = Ei();
        pl({
            fetch: (b, c) => me(fetch(new Request(b, c)))
        });
        xi(a);
        tl = a.resolve(yi)
    }
    return tl
};

function vl(a) {
    return r(function*() {
        yield wl();
        ik(a)
    })
}

function xl(a) {
    return r(function*() {
        yield wl();
        hk(a)
    })
}

function yl(a) {
    r(function*() {
        var b = yield wh();
        b ? yield qi(a, b): (yield nk(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            N: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            N: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && Y(b.N, b.payload))
    })
}

function wl() {
    return r(function*() {
        try {
            yield nk()
        } catch (a) {}
    })
};
var zl = Symbol("trackingData"),
    Al = new WeakMap;

function Bl() {
    Cl.h || (Cl.h = new Cl);
    return Cl.h
}

function Dl(a) {
    const b = El(a);
    let c, d;
    if (R("il_use_view_model_logging_context") && (b == null ? 0 : (c = b.context) == null ? 0 : (d = c.loggingContext) == null ? 0 : d.loggingDirectives)) return b.context.loggingContext.loggingDirectives.trackingParams || "";
    let e, f;
    if (b == null ? 0 : (e = b.rendererContext) == null ? 0 : (f = e.loggingContext) == null ? 0 : f.loggingDirectives) return b.rendererContext.loggingContext.loggingDirectives.trackingParams || "";
    if (b == null ? 0 : b.loggingDirectives) return b.loggingDirectives.trackingParams || "";
    let g;
    return ((g =
        a.veContainer) == null ? 0 : g.trackingParams) ? a.veContainer.trackingParams : (b == null ? void 0 : b.trackingParams) || ""
}

function Fl(a, b, c) {
    const d = Z(c);
    return a.csn === null || d === a.csn || c ? d : (a = new ef("VisibilityLogger called before newScreen", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: d
    }), ik(a), null)
}

function Gl(a) {
    let b;
    return !((b = El(a)) == null || !b.loggingDirectives)
}

function Hl(a) {
    a = El(a);
    return Math.floor(Number(a && a.loggingDirectives && a.loggingDirectives.visibility && a.loggingDirectives.visibility.types || "")) || 1
}

function El(a) {
    let b, c = a.data || ((b = a.props) == null ? void 0 : b.data);
    if (a.isWebComponentWrapper) {
        let d;
        c = (d = Al.get(a)) == null ? void 0 : d[zl]
    }
    return c
}
var Cl = class {
    constructor() {
        this.l = new Set;
        this.i = new Set;
        this.h = new Map;
        this.client = void 0;
        this.csn = null
    }
    j(a) {
        this.client = a
    }
    m() {
        this.clear();
        this.csn = Z()
    }
    clear() {
        this.l.clear();
        this.i.clear();
        this.h.clear();
        this.csn = null
    }
    v(a, b, c) {
        var d = Dl(a),
            e = a.visualElement ? a.visualElement : d;
        b = this.l.has(e);
        var f = this.h.get(e);
        this.l.add(e);
        this.h.set(e, !0);
        a.impressionLog && !b && a.impressionLog();
        if (d || a.visualElement)
            if (c = Fl(this, a, c)) {
                var g = Gl(a);
                if (Hl(a) || g) e = a.visualElement ? a.visualElement : yk(d), d = a.interactionLoggingClientData,
                    g || b ? Hl(a) & 4 ? f || (a = this.client, il(e, c), b = al({
                        cttAuthInfo: Kk(c) || void 0
                    }, c), f = {
                        csn: c,
                        ve: e.getAsJson(),
                        eventType: 4
                    }, d && (f.clientData = d), c === "UNDEFINED_CSN" ? fl("visualElementShown", b, f) : a ? Xj("visualElementShown", f, a, b) : Y("visualElementShown", f, b)) : Hl(a) & 1 && !b && hl(this.client, c, e, d) : hl(this.client, c, e, d)
            }
    }
    s(a, b, c) {
        var d = Dl(a);
        const e = a.visualElement ? a.visualElement : d;
        b = this.i.has(e);
        const f = this.h.get(e);
        this.i.add(e);
        this.h.set(e, !1);
        if (f === !1) return !0;
        if (!d && !a.visualElement) return !1;
        c = Fl(this, a, c);
        if (!c || !Hl(a) && Gl(a)) return !1;
        d = a.visualElement ? a.visualElement : yk(d);
        Hl(a) & 8 ? jl(this.client, c, d) : Hl(a) & 2 && !b && (a = this.client, b = al({
            cttAuthInfo: Kk(c) || void 0
        }, c), d = {
            csn: c,
            ve: d.getAsJson(),
            eventType: 2
        }, c === "UNDEFINED_CSN" ? fl("visualElementHidden", b, d) : a ? Xj("visualElementHidden", d, a, b) : Y("visualElementHidden", d, b));
        return !0
    }
};

function Il() {
    Jl.h || (Jl.h = new Jl)
}

function Kl(a) {
    Il();
    wf(Bl().v).bind(Bl())(a, void 0, 8)
}

function Ll(a) {
    Il();
    wf(Bl().s).bind(Bl())(a, void 0, 8)
}
var Jl = class {
    j(a) {
        wf(Bl().j).bind(Bl())(a)
    }
    clear() {
        wf(Bl().clear).bind(Bl())()
    }
};

function Ml() {
    Nl.h || (Nl.h = new Nl);
    return Nl.h
}

function Ol(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.m = () => {
        Pl(a, b, c);
        const d = Fk(c.layer);
        if (d) {
            for (const e of a.B) Ql(a, e[0], e[1] || d, c.layer);
            for (const e of a.C) Rl(a, e[0], e[1])
        }
    };
    Z(c.layer) || a.m();
    if (c.ga)
        for (const d of c.ga) Sl(a, d, c.layer);
    else hk(Error("Delayed screen needs a data promise."))
}

function Pl(a, b, c = {}) {
    var d = void 0;
    c.layer || (c.layer = 0);
    d = c.Ha !== void 0 ? c.Ha : c.layer;
    const e = Z(d);
    d = Fk(d);
    let f;
    d && (c.parentCsn !== void 0 ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && e !== "UNDEFINED_CSN" && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    let g;
    const h = Q("EVENT_ID");
    e === "UNDEFINED_CSN" && h && (g = {
        servletData: {
            serializedServletEventId: h
        }
    });
    R("combine_ve_grafts") && e && Tl(a, e);
    R("no_client_ve_attach_unless_shown") && d && e && el(d, e);
    let k;
    try {
        k = $k(a.client, b, f, c.fa, c.cttAuthInfo, g, c.zb, c.loggingExpectations)
    } catch (p) {
        lk(p, {
            Nb: b,
            rootVe: d,
            Hb: void 0,
            yb: e,
            Gb: f,
            fa: c.fa
        });
        hk(p);
        return
    }
    Lk(k, b, c.layer, c.cttAuthInfo);
    e && e !== "UNDEFINED_CSN" && d && !Ik(e) && jl(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = k || "");
    Il();
    wf(Bl().m).bind(Bl())();
    const l = Fk(c.layer);
    e && e !== "UNDEFINED_CSN" && l && (R("web_mark_root_visible") || R("music_web_mark_root_visible")) && wf(gl)(void 0, k, l, void 0, void 0, void 0);
    a.i.delete(c.layer || 0);
    a.m = void 0;
    let n;
    (n = a.X.get(c.layer)) == null || n.forEach((p, q) => {
        p ? Ql(a, q, p, c.layer) :
            l && Ql(a, q, l, c.layer)
    });
    Ul(a)
}

function Vl(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    wf(() => {
        [28631].includes(b) || (ik(new ef("createClientScreen() called with a non-page VE", b)), b = 83769);
        c.isHistoryNavigation || a.h.push({
            rootVe: b,
            key: c.key || ""
        });
        a.B = [];
        a.C = [];
        c.ga ? Ol(a, b, c) : Pl(a, b, c)
    })()
}

function Sl(a, b, c = 0) {
    wf(() => {
        b.then(d => {
            a.i.has(c) && a.m && a.m();
            const e = Z(c),
                f = Fk(c);
            if (e && f) {
                var g;
                (d == null ? 0 : (g = d.response) == null ? 0 : g.trackingParams) && bl(a.client, e, f, yk(d.response.trackingParams));
                var h;
                (d == null ? 0 : (h = d.playerResponse) == null ? 0 : h.trackingParams) && bl(a.client, e, f, yk(d.playerResponse.trackingParams))
            }
        })
    })()
}

function Ql(a, b, c, d = 0) {
    return wf(() => {
        if (a.i.has(d)) return a.B.push([b, c]), !0;
        const e = Z(d),
            f = c || Fk(d);
        if (e && f) {
            if (R("combine_ve_grafts")) {
                const g = a.l.get(f.toString());
                g ? g.push(b) : (a.v.set(f.toString(), f), a.l.set(f.toString(), [b]));
                a.K || (a.K = kg(() => {
                    Tl(a, e)
                }, 1200))
            } else bl(a.client, e, f, b);
            return !0
        }
        return !1
    })()
}

function Wl(a, b) {
    return wf(() => {
        const c = yk(b);
        Ql(a, c, void 0, 8);
        return c
    })()
}

function Tl(a, b) {
    if (b === void 0) {
        const c = Hk();
        for (let d = 0; d < c.length; d++) c[d] !== void 0 && Tl(a, c[d])
    } else a.l.forEach((c, d) => {
        (d = a.v.get(d)) && cl(a.client, b, d, c)
    }), a.l.clear(), a.v.clear(), a.K = void 0
}

function Xl(a, b, c, d = 0) {
    if (!b) return !1;
    d = Z(d);
    if (!d) return !1;
    kl(a.client, d, yk(b), c);
    return !0
}

function Rl(a, b, c, d = 0) {
    const e = Z(d);
    b = b || Fk(d);
    e && b && (a = a.client, d = al({
        cttAuthInfo: Kk(e) || void 0
    }, e), c = {
        csn: e,
        ve: b.getAsJson(),
        clientData: c
    }, e === "UNDEFINED_CSN" ? fl("visualElementStateChanged", d, c) : a ? Xj("visualElementStateChanged", c, a, d) : Y("visualElementStateChanged", c, d))
}

function Ul(a) {
    for (var b = 0; b < a.s.length; b++) {
        var c = a.s[b];
        try {
            c()
        } catch (d) {
            hk(d)
        }
    }
    a.s.length = 0;
    for (b = 0; b < a.H.length; b++) {
        c = a.H[b];
        try {
            c()
        } catch (d) {
            hk(d)
        }
    }
}
var Nl = class {
    constructor() {
        this.B = [];
        this.C = [];
        this.h = [];
        this.s = [];
        this.H = [];
        this.l = new Map;
        this.v = new Map;
        this.i = new Set;
        this.X = new Map
    }
    j(a) {
        this.client = a
    }
    clickCommand(a, b, c = 0) {
        return Xl(this, a.clickTrackingParams, b, c)
    }
    stateChanged(a, b, c = 0) {
        this.visualElementStateChanged(yk(a), b, c)
    }
    visualElementStateChanged(a, b, c = 0) {
        c === 0 && this.i.has(c) ? this.C.push([a, b]) : Rl(this, a, b, c)
    }
};
const Yl = {
        granted: "GRANTED",
        denied: "DENIED",
        unknown: "UNKNOWN"
    },
    Zl = RegExp("^(?:[a-z]+:)?//", "i");

function $l(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    a === "notifications_register" ? (O("IDToken", b), am()) : a === "notifications_check_registration" && bm(b)
}

function cm() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function dm(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function em(a) {
    return r(function*() {
        const b = dm(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = nf($e);
        return fm().then(e => sl(e, c, d).then(f => {
            f.json().then(g => g && g.endpointUrl ? gm(a, g.endpointUrl) : Promise.resolve()).catch(g => {
                xl(g);
                Promise.reject(g)
            })
        }))
    })
}

function hm(a, b) {
    var c = Z(8);
    if (c == null || !b) return a;
    a = Zl.test(a) ? new URL(a) : new URL(a, self.registration.scope);
    a.searchParams.set("parentCsn", c);
    a.searchParams.set("parentTrackingParams", b);
    return a.toString()
}

function gm(a, b) {
    a.deviceId && O("DeviceId", a.deviceId);
    a.timestampSec && O("TimestampLowerBound", a.timestampSec);
    const c = a.payload.chrome,
        d = Ml();
    Vl(d);
    var e;
    const f = (e = c.postedEndpoint) == null ? void 0 : e.clickTrackingParams;
    e = c == null ? void 0 : c.loggingDirectives;
    const g = c.title,
        h = {
            body: c.body,
            icon: c.iconUrl,
            data: {
                nav: hm(b, e == null ? void 0 : e.trackingParams),
                id: c.notificationId,
                attributionTag: c.attributionTag,
                clickEndpoint: c.clickEndpoint,
                postedEndpoint: c.postedEndpoint,
                clickTrackingParams: f,
                isDismissed: !0,
                loggingDirectives: e
            },
            tag: c.notificationTag || c.title + c.body + c.iconUrl,
            requireInteraction: !0
        };
    return self.registration.showNotification(g, h).then(() => {
        var k;
        ((k = h.data) == null ? 0 : k.postedEndpoint) && im(h.data.postedEndpoint);
        let l;
        if ((l = h.data) == null ? 0 : l.loggingDirectives) k = h.data.loggingDirectives, R("enable_client_ve_spec") && k.clientVeSpec ? (k = Ak(k.clientVeSpec.uiType, void 0, k.clientVeSpec.elementIndex, k.clientVeSpec.clientYoutubeData, void 0, k), k = Ql(d, k, void 0, 8) ? k : null) : k = k.trackingParams ? Wl(d, k.trackingParams) : null, Kl({
            screenLayer: 8,
            visualElement: k
        });
        jm(a.displayCap)
    }).catch(() => {})
}

function im(a) {
    if (!gj(a, Ze)) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: gj(a, Ze).serializedInteractionsRequest
        },
        c = nf(af);
    return fm().then(d => sl(d, b, c)).then(d => d)
}

function jm(a) {
    a !== -1 && self.registration.getNotifications().then(b => {
        for (let d = 0; d < b.length - a; d++) {
            b[d].data.isDismissed = !1;
            b[d].close();
            let e, f;
            if ((e = b[d].data) == null ? 0 : (f = e.loggingDirectives) == null ? 0 : f.trackingParams) {
                var c = yk(b[d].data.loggingDirectives.trackingParams);
                const g = {
                        screenLayer: 8,
                        visualElement: c
                    },
                    h = Ak(82046),
                    k = Ml();
                Ql(k, h, c, 8);
                Kl({
                    screenLayer: 8,
                    visualElement: h
                });
                (c = Z(8)) && kl(k.client, c, h);
                Ll(g)
            }
        }
    })
}

function bm(a) {
    const b = [km(a), jf("RegistrationTimestamp").then(lm), mm(), nm(), om()];
    Promise.all(b).catch(() => {
        O("IDToken", a);
        am();
        return Promise.resolve()
    })
}

function lm(a) {
    return Date.now() - (a || 0) <= 9E7 ? Promise.resolve() : Promise.reject()
}

function km(a) {
    return jf("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function mm() {
    return jf("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function nm() {
    return jf("Endpoint").then(a => pm().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function om() {
    return jf("application_server_key").then(a => qm().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function rm() {
    var a = Notification.permission;
    if (Yl[a]) return Yl[a]
}

function am() {
    O("RegistrationTimestamp", 0);
    Promise.all([pm(), sm(), tm(), qm()]).then(([a, b, c, d]) => {
        b = b ? cf(b) : null;
        c = c ? cf(c) : null;
        d = d ? $a(new Uint8Array(d), 4) : null;
        um(a, b, c, d)
    }).catch(() => {
        um()
    })
}

function um(a = null, b = null, c = null, d = null) {
    hf().then(e => {
        e && (O("Endpoint", a), O("P256dhKey", b), O("AuthKey", c), O("application_server_key", d), O("Permission", Notification.permission), Promise.all([jf("DeviceId"), jf("NotificationsDisabled")]).then(([f, g]) => {
            if (f != null) var h = f;
            else {
                f = [];
                var k;
                h = h || Fe.length;
                for (k = 0; k < 256; k++) f[k] = Fe[0 | Math.random() * h];
                h = f.join("")
            }
            vm(h, a != null ? a : void 0, b != null ? b : void 0, c != null ? c : void 0, d != null ? d : void 0, g != null ? g : void 0)
        }))
    })
}

function vm(a, b, c, d, e, f) {
    r(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: rm()
                    }
                }
            },
            h = nf(bf);
        return fm().then(k => sl(k, g, h).then(() => {
            O("DeviceId", a);
            O("RegistrationTimestamp", Date.now());
            O("TimestampLowerBound", Date.now())
        }, l => {
            vl(l)
        }))
    })
}

function pm() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function sm() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function tm() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function qm() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function fm() {
    return r(function*() {
        try {
            return yield nk(!0), ul()
        } catch (a) {
            return yield vl(a), Promise.reject(a)
        }
    })
};
let wm = self.location.origin + "/";

function pk(a) {
    let b = typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope ? ye.registration.scope : wm;
    b.endsWith("/") && (b = b.slice(0, -1));
    return a === "/" ? b : b + a
};
let xm = void 0;

function ym(a) {
    return r(function*() {
        xm || (xm = yield a.open("yt-appshell-assets"));
        return xm
    })
}

function zm(a, b) {
    return r(function*() {
        const c = yield ym(a), d = b.map(e => Am(c, e));
        return Promise.all(d)
    })
}

function Bm(a, b) {
    return r(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function Cm(a, b) {
    return r(function*() {
        const c = yield ym(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function Dm(a, b, c) {
    return r(function*() {
        yield(yield ym(a)).put(b, c)
    })
}

function Em(a, b) {
    r(function*() {
        yield(yield ym(a)).delete(b)
    })
}

function Am(a, b) {
    return r(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var Fm = Fh("yt-serviceworker-metadata", {
    M: {
        auth: {
            L: 1
        },
        ["resource-manifest-assets"]: {
            L: 2
        }
    },
    shared: !0,
    upgrade(a, b) {
        b(1) && Ug(a, "resource-manifest-assets");
        b(2) && Ug(a, "auth")
    },
    version: 2
});
let Gm = null;

function Hm(a) {
    return mh(Fm(), a)
}

function Im() {
    return r(function*() {
        const a = yield wh();
        if (a) return Jm.h || (Jm.h = new Jm(a)), Jm.h
    })
}

function Km(a, b) {
    return r(function*() {
        yield X(yield Hm(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return U(d.h.put(b, e)).then(() => {
                Gm = e;
                let f = !0;
                return Zg(d, {
                    query: IDBKeyRange.bound(0, Date.now()),
                    direction: "prev"
                }, g => f ? (f = !1, hh(g)) : d.delete(g.getKey()).then(() => bh(g)))
            })
        })
    })
}

function Lm(a, b) {
    return r(function*() {
        let c = !1,
            d = 0;
        yield X(yield Hm(a.token), ["resource-manifest-assets"], "readonly", e => Zg(e.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, f => {
            if (f.cursor.value.includes(b)) c = !0;
            else return d += 1, bh(f)
        }));
        return c ? d : -1
    })
}

function Mm(a) {
    return r(function*() {
        Gm || (yield X(yield Hm(a.token), ["resource-manifest-assets"], "readonly", b => Zg(b.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, c => {
            Gm = c.getKey()
        })));
        return Gm
    })
}
var Jm = class {
    constructor(a) {
        this.token = a
    }
};

function Nm() {
    return r(function*() {
        const a = yield wh();
        if (a) return Om.h || (Om.h = new Om(a)), Om.h
    })
}

function Pm(a, b) {
    return r(function*() {
        yield Wg(yield Hm(a.token), "auth", b, "shell_identifier_key")
    })
}

function Qm(a) {
    return r(function*() {
        return (yield(yield Hm(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function Rm(a) {
    return r(function*() {
        yield(yield Hm(a.token)).clear("auth")
    })
}
var Om = class {
    constructor(a) {
        this.token = a
    }
};

function Sm() {
    r(function*() {
        const a = yield Nm();
        a && (yield Rm(a))
    })
};
var Tm = class extends K {
    constructor(a) {
        super(a)
    }
    hasUrl() {
        return I(this, 1) != null
    }
};

function Um(a) {
    var b;
    void 0 === Pb ? b = 2 : b = 4;
    const c = a.o[A] | 0;
    return Yc(a, c, Tm, 1, b, !1, !(2 & c))
}
var Vm = function(a, b) {
    return (c, d) => {
        if (rd.length) {
            const f = rd.pop();
            md(f, d);
            f.h.init(c, void 0, void 0, d);
            c = f
        } else c = new qd(c, d);
        try {
            const f = new a,
                g = f.o;
            Ed(b)(g, c);
            var e = f
        } finally {
            c.h.clear(), c.l = -1, c.i = -1, rd.length < 100 && rd.push(c)
        }
        return e
    }
}(class extends K {
    constructor(a) {
        super(a)
    }
}, [0,
    Hd, [0, Gd]
]);

function Wm(a) {
    return r(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(Xm(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function Xm(a) {
    return Um(Vm(decodeURIComponent(a))).reduce((b, c) => {
        (c = ad(c, 1)) && b.push(c);
        return b
    }, [])
};

function Ym(a) {
    return r(function*() {
        const b = yield nk();
        if (b && I(b, 3) != null) {
            var c = yield Nm();
            c && (c = yield Qm(c), I(b, 3) !== c && (Em(a.caches, a.I), Sm()))
        }
    })
}

function Zm(a) {
    return r(function*() {
        let b, c;
        try {
            c = yield $m(a.h), b = yield Wm(c), yield zm(a.caches, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield an(), yield Dm(a.caches, a.I, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield bn(a, b, a.I)
        } catch (d) {}
        return Promise.resolve()
    })
}

function $m(a) {
    return r(function*() {
        try {
            return yield t.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function an() {
    return r(function*() {
        var a = yield nk();
        let b;
        a && I(a, 3) != null && (b = ad(a, 3));
        return b ? (a = yield Nm()) ? Promise.resolve(Pm(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function bn(a, b, c) {
    return r(function*() {
        const d = yield Im();
        if (d) try {
            yield Km(d, b)
        } catch (e) {
            yield vl(e)
        }
        b.push(c);
        try {
            yield Cm(a.caches, b)
        } catch (e) {
            yield vl(e)
        }
        return Promise.resolve()
    })
}

function cn(a, b) {
    return r(function*() {
        return Bm(a.caches, b)
    })
}

function dn(a) {
    return r(function*() {
        return Bm(a.caches, a.I)
    })
}
var en = class {
    constructor() {
        var a = self.caches;
        let b;
        b = pk("/app_shell");
        R("service_worker_forward_exp_params") && (b += self.location.search);
        var c = pk("/app_shell_home");
        this.caches = a;
        this.h = b;
        this.I = c
    }
    initialize() {
        const a = this;
        return r(function*() {
            yield Ym(a);
            return Zm(a)
        })
    }
};
var fn = class {
    constructor() {
        const a = this;
        this.stream = new ReadableStream({
            start(b) {
                a.close = () => void b.close();
                a.h = c => {
                    const d = c.getReader();
                    return d.read().then(function h({
                        done: f,
                        value: g
                    }) {
                        if (f) return Promise.resolve();
                        b.enqueue(g);
                        return d.read().then(h)
                    })
                };
                a.i = () => {
                    const c = (new TextEncoder).encode("<script>if (window.fetchInitialData) { window.fetchInitialData(); } else { window.getInitialData = undefined; }\x3c/script>");
                    b.enqueue(c)
                }
            }
        })
    }
};

function gn(a, b) {
    return r(function*() {
        const c = b.request,
            d = yield cn(a.h, c.url);
        if (d) return a.i && yl({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: V()
        }), d;
        hn(a, c);
        return jn(b)
    })
}

function kn(a, b) {
    return r(function*() {
        const c = yield ln(b);
        if (c.response && (c.response.ok || c.response.type === "opaqueredirect" || c.response.status === 429 || c.response.status === 303 || c.response.status >= 300 && c.response.status < 400)) return c.response;
        const d = yield dn(a.h);
        if (d) return mn(a), nn(d, b);
        on(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function pn(a, b) {
    b = new URL(b);
    if (!a.config.ra.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    b = new URLSearchParams(b.search);
    for (const c of a.config.ta) {
        if (c.key === "*") return !0;
        a = b.get(c.key);
        if (c.value === void 0 || a === c.value)
            if (b.delete(c.key), !b.toString()) return !0
    }
    return !1
}

function qn(a, b) {
    return r(function*() {
        const c = yield dn(a.h);
        if (!c) return on(a), jn(b);
        mn(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(V() - d);
                break a
            }
            d = -1
        }
        if (!(d > -1 && d / 864E5 >= 7)) return nn(c, b);
        d = yield ln(b);
        return d.response && d.response.ok ? d.response : nn(c, b)
    })
}

function jn(a) {
    return Promise.resolve(a.preloadResponse).then(b => b && !rn(b) ? b : t.fetch(a.request))
}

function hn(a, b) {
    if (a.i) {
        var c = {
            assetPath: b.url,
            cacheHit: !1
        };
        Im().then(d => {
            if (d) {
                var e = Mm(d).then(f => {
                    f && (c.currentAppBundleTimestampSec = String(Math.floor(f / 1E3)))
                });
                d = Lm(d, b.url).then(f => {
                    c.appBundleVersionDiffCount = f
                });
                Promise.all([e, d]).catch(f => {
                    vl(f)
                }).finally(() => {
                    yl({
                        appShellAssetLoadReport: c,
                        timestamp: V()
                    })
                })
            } else yl({
                appShellAssetLoadReport: c,
                timestamp: V()
            })
        })
    }
}

function mn(a) {
    a.i && yl({
        appShellAssetLoadReport: {
            assetPath: a.h.I,
            cacheHit: !0
        },
        timestamp: V()
    })
}

function on(a) {
    a.i && yl({
        appShellAssetLoadReport: {
            assetPath: a.h.I,
            cacheHit: !1
        },
        timestamp: V()
    })
}

function nn(a, b) {
    if (!R("sw_nav_preload_pbj")) return a;
    const c = new fn,
        d = c.h(a.body);
    Promise.resolve(b.preloadResponse).then(e => {
        if (!e || !rn(e)) throw Error("no pbj preload response available");
        d.then(() => c.h(e.body)).then(() => void c.close())
    }).catch(() => {
        d.then(() => {
            c.i();
            c.close()
        })
    });
    return new Response(c.stream, {
        status: a.status,
        statusText: a.statusText,
        headers: a.headers
    })
}

function ln(a) {
    return r(function*() {
        try {
            return {
                response: yield jn(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}

function rn(a) {
    return a.headers.get("x-navigation-preload-response-type") === "pbj"
}
var An = class {
    constructor() {
        var a = sn;
        var b = {
            xa: tn,
            Ia: un([vn, /\/signin/, /\/logout/]),
            ra: ["/", "/feed/downloads"],
            ta: wn([{
                key: "feature",
                value: "ytca"
            }]),
            sa: xn(R("kevlar_sw_app_wide_fallback") ? yn : zn)
        };
        this.h = a;
        this.config = b;
        a = S("app_shell_asset_log_fraction");
        this.i = !0;
        a && (this.i = Math.random() < a)
    }
};
const Bn = /^\/$/,
    zn = [Bn, /^\/feed\/downloads$/],
    yn = [Bn, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function xn(a) {
    return new RegExp(a.map(b => b.source).join("|"))
}
const Cn = /^https:\/\/([\w-]*\.)*youtube\.com.*/;

function un(a) {
    a = xn(a);
    return new RegExp(`${Cn.source}(${a.source})`)
}
const Dn = xn([/\.css$/, /\.js$/, /\.ico$/, /\/ytmweb\/_\/js\//, /\/ytmweb\/_\/ss\//, /\/kabuki\/_\/js\//, /\/kabuki\/_\/ss\//, /\/ytmainappweb\/_\/ss\//]),
    tn = new RegExp(`${Cn.source}(${Dn.source})`),
    vn = /purge_shell=1/;

function wn(a = []) {
    const b = [];
    for (const c of Kf) b.push({
        key: c
    });
    for (const c of a) b.push(c);
    return b
}
un([vn]);
wn();
var Fn = class {
    constructor() {
        var a = sn,
            b = En,
            c = self;
        if (t.URLPattern) {
            var d = [];
            R("service_worker_static_routing_exclude_embed") && d.push({
                condition: {
                    urlPattern: new URLPattern({
                        pathname: "/embed*"
                    })
                },
                source: "network"
            });
            R("service_worker_static_routing_exclude_innertube") && d.push({
                condition: {
                    urlPattern: new URLPattern({
                        pathname: "/youtubei/v1/*"
                    })
                },
                source: "network"
            })
        } else d = [];
        this.h = c;
        this.i = a;
        this.s = b;
        this.C = df;
        this.j = d
    }
    init() {
        this.h.oninstall = this.v.bind(this);
        this.h.onactivate = this.l.bind(this);
        this.h.onfetch =
            this.m.bind(this);
        this.h.onmessage = this.B.bind(this)
    }
    v(a) {
        this.h.skipWaiting();
        if (R("service_worker_static_routing_registration") && this.j.length > 0 && a.addRoutes) try {
            a.addRoutes(this.j)
        } catch (c) {}
        const b = this.i.initialize().catch(c => {
            vl(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    l(a) {
        const b = [this.h.clients.claim()],
            c = this.h.registration;
        c.navigationPreload && (b.push(c.navigationPreload.enable()), R("sw_nav_preload_pbj") && b.push(c.navigationPreload.setHeaderValue("pbj")));
        a.waitUntil(Promise.all(b))
    }
    m(a) {
        const b = this;
        return r(function*() {
            var c = b.s,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.config.Ia.test(e.url)) ok.h && (delete ok.h.h, t.__SAPISID = void 0, P("VISITOR_DATA", void 0), P("SESSION_INDEX", void 0), P("DELEGATED_SESSION_ID", void 0), P("USER_SESSION_ID",
                void 0), P("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT", void 0)), d = a.respondWith, c = c.h, Em(c.caches, c.I), Sm(), c = jn(a), d.call(a, c);
            else if (c.config.xa.test(e.url)) a.respondWith(gn(c, a));
            else if (e.mode === "navigate") {
                const f = new URL(e.url);
                c.config.sa.test(f.pathname) ? a.respondWith(kn(c, a)) : pn(c, e.url) ? a.respondWith(qn(c, a)) : d && a.respondWith(jn(a))
            }
        })
    }
    B(a) {
        const b = a.data;
        this.C.includes(b.type) ? $l(a) : b.type === "refresh_shell" && Zm(this.i).catch(c => {
            vl(c)
        })
    }
};

function Gn() {
    let a = u("ytglobal.storage_");
    a || (a = new Hn, w("ytglobal.storage_", a));
    return a
}
var Hn = class {
    estimate() {
        return r(function*() {
            const a = navigator;
            let b;
            if ((b = a.storage) == null ? 0 : b.estimate) return a.storage.estimate();
            let c;
            if ((c = a.webkitTemporaryStorage) == null ? 0 : c.queryUsageAndQuota) return In()
        })
    }
};

function In() {
    const a = navigator;
    return new Promise((b, c) => {
        let d;
        (d = a.webkitTemporaryStorage) != null && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
w("ytglobal.storageClass_", Hn);

function Jn(a, b) {
    Gn().estimate().then(c => {
        c = Object.assign({}, b, {
            isSw: self.document === void 0,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: Kn(c == null ? void 0 : c.usage),
            deviceStorageQuotaMbytes: Kn(c == null ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class Ln {
    constructor() {
        var a = Mn;
        this.handleError = Nn;
        this.h = a;
        this.i = !1;
        self.document === void 0 || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= .2
    }
    S(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                R("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                R("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                Jn(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && Math.random() <= .1 && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a = Object.assign({},
                    b, {
                        hasWindowUnloaded: this.i
                    }), this.h("idbTransactionAborted", a)
        }
    }
}

function Kn(a) {
    return typeof a === "undefined" ? "-1" : String(Math.ceil(a / 1048576))
};
Yf(Vf(), {
    F: [{
        Ga: /Failed to fetch/,
        weight: 500
    }],
    D: []
});
({
    handleError: Nn = gk,
    S: Mn = Y
} = {
    handleError: xl,
    S: function(a, b) {
        return r(function*() {
            yield wl();
            Y(a, b)
        })
    }
});
var Mn, Nn;
for (sg = new Ln; rg.length > 0;) {
    const a = rg.shift();
    switch (a.type) {
        case "ERROR":
            sg.handleError(a.payload);
            break;
        case "EVENT":
            sg.S(a.eventType, a.payload)
    }
}
ok.h = new ok;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(im(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    var b = a.notification.data,
        c;
    if (b == null ? 0 : (c = b.loggingDirectives) == null ? 0 : c.trackingParams) {
        a = yk(b.loggingDirectives.trackingParams);
        c = {
            screenLayer: 8,
            visualElement: a
        };
        if (b.isDismissed) {
            b = Ak(74726);
            const d = Ml();
            Ql(d, b, a, 8);
            Kl({
                screenLayer: 8,
                visualElement: b
            });
            (a = Z(8)) && kl(d.client, a, b)
        }
        Ll(c)
    }
};
self.onpush = function(a) {
    a.waitUntil(jf("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return em(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(cm())
};
self.onpushsubscriptionchange = function() {
    am()
};
const sn = new en,
    En = new An;
(new Fn).init();