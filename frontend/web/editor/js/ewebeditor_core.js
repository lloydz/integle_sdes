﻿/*
*######################################
* eWebEditor V10.3 - Advanced online web based WYSIWYG HTML editor.
* Copyright (c) 2003-2015 eWebSoft.com
*
* For further information go to http://www.ewebeditor.net/
* This copyright notice MUST stay intact for use.
*######################################
*/

String.prototype.fw = function(s) {
    return (this.indexOf(s) > -1);
};
String.prototype.Av = function(s) {
    return (this.substr(0, s.length) == s);
};
String.prototype.eg = function(s, ignoreCase) {
    var L1 = this.length;
    var L2 = s.length;
    if (L2 > L1) {
        return false;
    }
    if (ignoreCase) {
        var sV = new RegExp(s + '$', 'i');
        return sV.test(this);
    } else {
        return (L2 == 0 || this.substr(L1 - L2, L2) == s);
    }
};
String.prototype.oz = function() {
    return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '');
};
Array.prototype.IndexOf = function(s) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == s) {
            return i;
        }
    }
    return - 1;
}; (function() {
    var rJ = /()??/.exec("")[1] === undefined;
    var ph = function() {
        var x = /^/g;
        x.test("");
        return ! x.lastIndex;
    } ();
    var eS = {
        exec: RegExp.prototype.exec,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split,
        test: RegExp.prototype.test
    };
    var uF = function(array, item, from) {
        for (var i = from || 0; i < array.length; i++) {
            if (array[i] === item) {
                return i;
            }
        }
        return - 1;
    };
    var tF = function(cC) {
        return (cC.global ? "g": "") + (cC.ignoreCase ? "i": "") + (cC.multiline ? "m": "") + (cC.extended ? "x": "") + (cC.sticky ? "y": "");
    };
    var mZ = function(o) {
        return Object.prototype.toString.call(o) === "[object RegExp]";
    };
    RegExp.prototype.exec = function(bM) {
        var match = eS.exec.apply(this, arguments),
        name,
        r2;
        if (match) {
            if (!rJ && match.length > 1 && uF(match, "") > -1) {
                r2 = RegExp("^" + this.source + "$(?!\\s)", tF(this));
                eS.replace.call(match[0], r2,
                function() {
                    for (var i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === undefined) {
                            match[i] = undefined;
                        }
                    }
                });
            }
            if (!ph && this.global && this.lastIndex > (match.index + match[0].length)) {
                this.lastIndex--;
            }
        }
        return match;
    };
    if (!ph) {
        RegExp.prototype.test = function(bM) {
            var match = eS.exec.call(this, bM);
            if (match && this.global && this.lastIndex > (match.index + match[0].length)) {
                this.lastIndex--;
            }
            return ! !match;
        };
    }
    String.prototype.match = function(cC) {
        if (!mZ(cC)) {
            cC = RegExp(cC);
        }
        if (cC.global) {
            var result = eS.match.apply(this, arguments);
            cC.lastIndex = 0;
            return result;
        }
        return cC.exec(this);
    };
    String.prototype.split = function(s, dq) {
        if (!mZ(s)) {
            return eS.split.apply(this, arguments);
        }
        var bM = this + "",
        output = [],
        hz = 0,
        match,
        mp;
        if (dq === undefined || +dq < 0) {
            dq = Infinity;
        } else {
            dq = Math.floor( + dq);
            if (!dq) {
                return [];
            }
        }
        while (match = s.exec(bM)) {
            if (s.lastIndex > hz) {
                output.push(bM.slice(hz, match.index));
                if (match.length > 1 && match.index < bM.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                mp = match[0].length;
                hz = s.lastIndex;
                if (output.length >= dq) {
                    break;
                }
            }
            if (!match[0].length) {
                s.lastIndex++;
            }
        }
        if (hz === bM.length) {
            if (!eS.test.call(s, "") || mp) {
                output.push("");
            }
        } else {
            output.push(bM.slice(hz));
        }
        return output.length > dq ? output.slice(0, dq) : output;
    };
})();
var Ir = (function() {
    var Fy = 2147483647;
    var Gm = 36;
    var Gz = 1;
    var Gx = 26;
    var Hc = 38;
    var ET = 700;
    var Gt = 72;
    var Fn = 128;
    var Ij = /^xn--/;
    var Hk = /[^\x20-\x7E]/;
    var HH = /[\x2E\u3002\uFF0E\uFF61]/g;
    var ES = Gm - Gz;
    var Gd = Math.floor;
    var FI = String.fromCharCode;
    var GE = function(a, fn) {
        var l = a.length;
        var gG = [];
        while (l--) {
            gG[l] = fn(a[l]);
        }
        return gG;
    };
    var Fr = function(s, fn) {
        var Fu = s.split('@');
        var aI = '';
        if (Fu.length > 1) {
            aI = Fu[0] + '@';
            s = Fu[1];
        }
        var FG = s.split(HH);
        var EV = GE(FG, fn).join('.');
        return aI + EV;
    };
    var Fc = function(s) {
        var Gg = [],
        GI = 0,
        l = s.length,
        v,
        FU;
        while (GI < l) {
            v = s.charCodeAt(GI++);
            if (v >= 0xD800 && v <= 0xDBFF && GI < l) {
                FU = s.charCodeAt(GI++);
                if ((FU & 0xFC00) == 0xDC00) {
                    Gg.push(((v & 0x3FF) << 10) + (FU & 0x3FF) + 0x10000);
                } else {
                    Gg.push(v);
                    counter--;
                }
            } else {
                Gg.push(v);
            }
        }
        return Gg;
    };
    var FN = function(a) {
        return GE(a,
        function(v) {
            var Gr = '';
            if (v > 0xFFFF) {
                v -= 0x10000;
                Gr += FI(v >>> 10 & 0x3FF | 0xD800);
                v = 0xDC00 | v & 0x3FF;
            }
            Gr += FI(v);
            return Gr;
        }).join('');
    };
    var FP = function(FB) {
        if (FB - 48 < 10) {
            return FB - 22;
        }
        if (FB - 65 < 26) {
            return FB - 65;
        }
        if (FB - 97 < 26) {
            return FB - 97;
        }
        return Gm;
    };
    var Gj = function(Ft, flag) {
        return Ft + 22 + 75 * (Ft < 26) - ((flag != 0) << 5);
    };
    var Fe = function(FF, Gw, HX) {
        var k = 0;
        FF = HX ? Gd(FF / ET) : FF >> 1;
        FF += Gd(FF / Gw);
        for (; FF > ES * Gx >> 1; k += Gm) {
            FF = Gd(FF / ES);
        }
        return Gd(k + (ES + 1) * FF / (FF + Hc));
    };
    var FZ = function(Fh) {
        var Gg = [],
        Gn = Fh.length,
        out,
        i = 0,
        n = Fn,
        EP = Gt,
        FA,
        j,
        GJ,
        Gp,
        w,
        k,
        Ft,
        t,
        EQ;
        FA = Fh.lastIndexOf('-');
        if (FA < 0) {
            FA = 0;
        }
        for (j = 0; j < FA; ++j) {
            if (Fh.charCodeAt(j) >= 0x80) {
                return Fh;
            }
            Gg.push(Fh.charCodeAt(j));
        }
        for (GJ = FA > 0 ? FA + 1 : 0; GJ < Gn;) {
            for (Gp = i, w = 1, k = Gm;; k += Gm) {
                if (GJ >= Gn) {
                    return Fh;
                }
                Ft = FP(Fh.charCodeAt(GJ++));
                if (Ft >= Gm || Ft > Gd((Fy - i) / w)) {
                    return Fh;
                }
                i += Ft * w;
                t = k <= EP ? Gz: (k >= EP + Gx ? Gx: k - EP);
                if (Ft < t) {
                    break;
                }
                EQ = Gm - t;
                if (w > Gd(Fy / EQ)) {
                    return Fh;
                }
                w *= EQ;
            }
            out = Gg.length + 1;
            EP = Fe(i - Gp, out, Gp == 0);
            if (Gd(i / out) > Fy - n) {
                return Fh;
            }
            n += Gd(i / out);
            i %= out;
            Gg.splice(i++, 0, n);
        }
        return FN(Gg);
    };
    var Hx = function(Fh) {
        var n, FF, GH, FK, EP, j, m, q, k, t, Fz, Gg = [],
        Gn,
        FJ,
        EQ,
        Fj;
        Fh = Fc(Fh);
        Gn = Fh.length;
        n = Fn;
        FF = 0;
        EP = Gt;
        for (j = 0; j < Gn; ++j) {
            Fz = Fh[j];
            if (Fz < 0x80) {
                Gg.push(FI(Fz));
            }
        }
        GH = FK = Gg.length;
        if (FK) {
            Gg.push('-');
        }
        while (GH < Gn) {
            for (m = Fy, j = 0; j < Gn; ++j) {
                Fz = Fh[j];
                if (Fz >= n && Fz < m) {
                    m = Fz;
                }
            }
            FJ = GH + 1;
            if (m - n > Gd((Fy - FF) / FJ)) {
                return Fh;
            }
            FF += (m - n) * FJ;
            n = m;
            for (j = 0; j < Gn; ++j) {
                Fz = Fh[j];
                if (Fz < n && ++FF > Fy) {
                    return Fh;
                }
                if (Fz == n) {
                    for (q = FF, k = Gm;; k += Gm) {
                        t = k <= EP ? Gz: (k >= EP + Gx ? Gx: k - EP);
                        if (q < t) {
                            break;
                        }
                        Fj = q - t;
                        EQ = Gm - t;
                        Gg.push(FI(Gj(t + Fj % EQ, 0)));
                        q = Gd(Fj / EQ);
                    }
                    Gg.push(FI(Gj(q, 0)));
                    EP = Fe(FF, FJ, GH == FK);
                    FF = 0; ++GH;
                }
            }++FF; ++n;
        }
        return Gg.join('');
    };
    var Fb = function(Fh) {
        return Fr(Fh,
        function(s) {
            return Ij.test(s) ? FZ(s.slice(4).toLowerCase()) : s;
        });
    };
    var Fa = function(Fh) {
        return Fr(Fh,
        function(s) {
            return Hk.test(s) ? 'xn--' + Hx(s) : s;
        });
    };
    var Fv = function(aG, Fx) {
        var n = aG.indexOf("://");
        var FQ = "";
        if (n > 0) {
            FQ = aG.substr(0, n + 3);
            aG = aG.substr(n + 3);
        } else {
            return aG;
        }
        var Fd = "";
        n = aG.indexOf("/");
        if (n > 0) {
            Fd = aG.substr(n);
            aG = aG.substr(0, n);
        }
        n = aG.indexOf(":");
        if (n > 0) {
            Fd = aG.substr(n) + Fd;
            aG = aG.substr(0, n);
        }
        return FQ + (Fx ? Fa(aG) : Fb(aG)) + Fd;
    };
    return {
        Hq: function(Fh) {
            return Fb(Fh);
        },
        HV: function(Fh) {
            return Fa(Fh);
        },
        Ii: function(Fh) {
            return Fv(Fh, false);
        },
        Hm: function(Fh) {
            return Fv(Fh, true);
        }
    };
})();
var aA = (function() {
    var iW = new Object();
    var qR = document.location.search.substr(1).split("&");
    for (i = 0; i < qR.length; i++) {
        var qD = qR[i].split("=");
        iW[qD[0]] = qD[1];
    }
    var al = function(bA, sz) {
        return (iW[bA]) ? iW[bA] : sz;
    };
    var om = al("id", "");
    var pA = al("originalfilename", "");
    var qT = al("savefilename", "");
    var rc = al("savepathfilename", "");
    var sx = al("extcss", "");
    var rY = al("fullscreen", "");
    var rr = al("style", "coolblue");
    var ki = al("cusdir", "");
    var rH = al("skin", "");
    var rM = al("fixwidth", "");
    var ca = al("lang", "");
    var tk = al("areacssmode", "");
    var sc = al("readonly", "");
    var tf = al("skey", "");
    var sM = al("instanceid", om);
    var rA = al("autogrow", "");
    var Ct = al("titleimage", "");
    var Ix = al("attachev", "");
    var Hs = al("eqtype", "");
    var hw = document.location.host;
    var Gs = "";
    var n = hw.indexOf(":");
    if (n > 0) {
        Gs = hw.substr(n + 1);
        hw = hw.substr(0, n);
    }
    hw = Ir.HV(hw);
    var JO = document.location.protocol.toLowerCase();
    n = JO.indexOf(":");
    if (n > 0) {
        JO = JO.substr(0, n);
    }
    return {
        bs: om,
        vs: sM,
        wg: pA,
        vZ: qT,
        vj: rc,
        ExtCSS: sx,
        FullScreen: rY,
        StyleName: rr,
        CusDir: ki,
        Skin: rH,
        FixWidth: rM,
        Lang: ca,
        AreaCssMode: tk,
        ReadOnly: sc,
        SKey: tf,
        rD: rA,
        TitleImage: Ct,
        Ik: Ix,
        EQType: Hs,
        H: hw,
        Hw: Gs,
        Proto: JO
    };
})();
var F = (function() {
    var s = navigator.userAgent.toLowerCase();
    var os = (
    /*@cc_on!@*/
    false);
    var hs = 0;
    if (os) {
        try {
            hs = parseInt(s.match(/msie (\d+)/)[1], 10);
        } catch(e) {
            hs = 0;
        }
    }
    var Du = (document.documentMode >= 11);
    var Il = (os || Du);
    var Hn = s.fw('safari');
    var HQ = s.fw('chrome/');
    var Iy = s.fw('firefox');
    var GZ = 0;
    if (HQ) {
        var GN = s.match(/chrome\/(\d+)/);
        if (GN) {
            GZ = parseInt(GN[1], 10);
        }
    }
    var HI = s.fw('edge/');
    var tx = false;
    var GY = "";
    if (HI) {
        tx = true;
        GY = "edge";
    } else if (GZ >= 42) {
        tx = true;
        GY = "chrome";
        if (s.fw(' opr/') || s.fw('qqbrowser') || s.fw('lbbrowser') || s.fw('metasr') || s.fw('2345explorer') || s.fw('maxthon') || s.fw('bidubrowser') || s.fw('ubrowser')) {
            tx = false;
        }
        if (tx) {
            for (var IQ in navigator.mimeTypes) {
                var cT = navigator.mimeTypes[IQ].type;
                if (cT) {
                    if (cT.substr(0, 24) == "application/x-ewebeditor") {
                        tx = false;
                        break;
                    }
                }
            }
        }
        if (tx) {
            var IY = navigator.mimeTypes["application/x-shockwave-flash"];
            if (IY) {
                if (IY.description.toLowerCase().indexOf("adobe") >= 0) {
                    tx = false;
                }
            }
        }
    } else if (!Il && !HQ && !Iy && Hn) {
        tx = true;
        GY = "safari";
    }
    var Ho = window.navigator.platform;
    var Kj = (Ho.indexOf("Win") == 0) ? true: false;
    var Ki = (Ho == "Win64");
    return {
        as: os,
        xZ: (hs == 6),
        zW: (hs >= 6),
        gB: (hs >= 7),
        BX: (document.documentMode >= 10),
        eo: Du,
        EY: Il,
        Cf: (os && (s.indexOf("trident/5") > -1)),
        GD: (os && (s.indexOf("trident/6") > -1)),
        Hi: (os && (s.indexOf("trident/7") > -1)),
        An: !!document.documentMode,
        Ar: document.documentMode == 8,
        nb: document.documentMode == 9,
        IA: document.documentMode == 10,
        jo: s.fw('gecko/'),
        ik: Hn,
        jr: !!window.opera,
        Aq: s.fw('macintosh'),
        AM: HQ,
        Iq: HI,
        qJ: tx,
        IW: GY,
        xb: s.fw(' applewebkit/'),
        Cq: Ki,
        Bx: Kj,
        Ei: ((!os) || (os && (document.documentMode >= 9))),
        iF: true
    };
})();
var lang = new Object();
lang.ji = {
    "da": true,
    "de": true,
    "en": true,
    "fr": true,
    "it": true,
    "es": true,
    "ja": true,
    "nl": true,
    "no": true,
    "pt": true,
    "ru": true,
    "sv": true,
    "zh-cn": true,
    "zh-tw": true
};
lang.vc = function() {
    if (aA.Lang) {
        return aA.Lang;
    }
    if (config.AutoDetectLanguage == "1") {
        var cG;
        if (navigator.userLanguage) {
            cG = navigator.userLanguage.toLowerCase();
        } else if (navigator.language) {
            cG = navigator.language.toLowerCase();
        } else {
            return this.DefaultLanguage;
        }
        if (this.ji[cG]) {
            return cG;
        } else if (cG.length > 2) {
            cG = cG.substr(0, 2);
            if (this.ji[cG]) {
                return cG;
            }
        }
    }
    return this.DefaultLanguage;
};
lang.ag = function(J) {
    var gT = J.getElementsByTagName("INPUT");
    for (i = 0; i < gT.length; i++) {
        if (gT[i].getAttribute("lang")) {
            gT[i].value = lang[gT[i].getAttribute("lang")];
        }
    }
    var gZ = J.getElementsByTagName("SPAN");
    for (i = 0; i < gZ.length; i++) {
        if (gZ[i].getAttribute("lang")) {
            gZ[i].innerHTML = lang[gZ[i].getAttribute("lang")];
        }
    }
    var ht = J.getElementsByTagName("OPTION");
    for (i = 0; i < ht.length; i++) {
        if (ht[i].getAttribute("lang")) {
            ht[i].innerHTML = lang[ht[i].getAttribute("lang")];
        }
    }
};
lang.Init = function() {
    if (this.ji[config.DefaultLanguage]) {
        this.DefaultLanguage = config.DefaultLanguage;
    } else {
        this.DefaultLanguage = "en";
    }
    this.bF = this.vc();
};
var am = (function() {
    var ut = 9999789;
    var ac, cv, aP;
    var kP, bf, kp, kg;
    var bH = {
        x: 0,
        y: 0,
        ew: 0,
        rel: null
    };
    var un;
    var eA;
    var gg = false;
    var cN;
    var mv = function() {
        if (ac) {
            return;
        }
        kp = "<table border=0 cellpadding=0 cellspacing=0 class='Menu_Box' id=Menu_Box><tr><td class='Menu_Box'><table border=0 cellpadding=0 cellspacing=0 class='Menu_Table'>";
        bf = "<tr><td class='Menu_Sep'><table border=0 cellpadding=0 cellspacing=0 class='Menu_Sep'><tr><td></td></tr></table></td></tr>";
        kg = "</table></td></tr></table>";
        kP = "<html><head>" + "<link href='" + EWEB.cd + "/language/" + lang.bF + ".css?v.1' type='text/css' rel='stylesheet'>" + "<link href='" + EWEB.cd + "/skin/" + config.Skin + "/menuarea.css' type='text/css' rel='stylesheet'>" + "</head>" + "<body scroll='no'>";
        if (F.as) {
            cv = window.createPopup();
            ac = cv.document;
            ac.open();
            ac.write(kP);
            ac.close();
        } else {
            cN = R.lJ();
            var mK = cN.document;
            aP = mK.createElement('iframe');
            R.hh(aP);
            aP.src = 'javascript:void(0)';
            aP.allowTransparency = true;
            aP.frameBorder = '0';
            aP.scrolling = 'no';
            aP.style.width = aP.style.height = '0px';
            R.cP(aP, {
                position: 'absolute',
                zIndex: ut
            });
            aP.kw = window;
            mK.body.appendChild(aP);
            var ln = aP.contentWindow;
            ac = ln.document;
            ac.open();
            ac.write(kP);
            ac.close();
            un = R.fR(ac);
            R.ko(ac.body);
            R.az(ln, 'focus', sF);
            R.az(ln, 'blur', rK);
        }
        eA = ac.body.appendChild(ac.createElement('DIV'));
        eA.style.cssFloat = 'left';
        R.az(ac, 'contextmenu', R.aw);
        R.az(ac, 'dragstart', R.aw);
        R.az(ac, 'selectstart', R.aw);
        R.az(ac, 'select', R.aw);
    };
    var dY = function(aW, pP, jn, V) {
        var dX = "";
        var js;
        if (F.as) {
            js = "var w=parent;w." + pP + ";w.am.Hide();";
        } else {
            js = "var w=frameElement.kw;w.am.Hide();w." + pP + ";"
        }
        if (aW == "") {
            dX += "<tr><td class='Menu_Item'><table border=0 cellpadding=0 cellspacing=0 width='100%'><tr><td valign=middle class=MouseOut onMouseOver=\"this.className='MouseOver'\" onMouseOut=\"this.className='MouseOut'\" onclick=\"" + js + "\">";
        } else {
            dX += "<tr><td class='Menu_Item'><table border=0 cellpadding=0 cellspacing=0 width='100%'><tr><td valign=middle class=MouseDisabled>";
        }
        aW = (aW) ? "_Disabled": "";
        dX += "<table border=0 cellpadding=0 cellspacing=0><tr><td class=Menu_Image_TD>";
        if (typeof(jn) == "number") {
            var cA = "skin/" + config.Skin + "/buttons.gif";
            var dM = 16 - jn * 16;
            dX += "<div class='Menu_Image" + aW + "'><img src='" + cA + "' style='top:" + dM + "px'></div>";
        } else if (jn != "") {
            var cA = "skin/" + config.Skin + "/" + jn;
            dX += "<img class='Menu_Image" + aW + "' src='" + cA + "'>";
        }
        dX += "</td><td class='Menu_Label" + aW + "'>" + V + "</td></tr></table>";
        dX += "</td></tr></table></td><\/tr>";
        return dX;
    };
    var O = function(aW, aM, ca) {
        var di = Buttons[aM];
        if (!ca) {
            ca = lang[aM];
        } else {
            ca = lang[ca];
        }
        var hL = di[1] ? di[1] : "exec('" + aM + "')";
        return dY(aW, hL, di[0], ca);
    };
    var bb = function(aM, aV) {
        var aW = "";
        if (!aV) {
            aV = aM;
        }
        try {
            if (!EWEB.T.queryCommandEnabled(aV)) {
                aW = "disabled";
            }
        } catch(e) {}
        if (aW) {
            if (aV == "Copy" || aV == "Cut") {
                if (config.AutoDetectPaste == "1") {
                    aW = "";
                }
            }
        }
        return O(aW, aM);
    };
    var eN = function(what) {
        var G = "";
        var aW = "disabled";
        switch (what) {
        case "TableInsert":
            if (!bI.gl()) {
                aW = "";
            }
            G += O(aW, "TableInsert");
            break;
        case "TableProp":
            if (bI.gl() || bI.bp()) {
                aW = "";
            }
            G += O(aW, "TableProp");
            break;
        case "TableCell":
            if (bI.bp()) {
                aW = "";
            }
            G += O(aW, "TableCellProp");
            G += O(aW, "TableCellSplit");
            G += bf;
            G += O(aW, "TableRowProp");
            G += O(aW, "TableRowInsertAbove");
            G += O(aW, "TableRowInsertBelow");
            G += O(aW, "TableRowMerge");
            G += O(aW, "TableRowSplit");
            G += O(aW, "TableRowDelete");
            G += bf;
            G += O(aW, "TableColInsertLeft");
            G += O(aW, "TableColInsertRight");
            G += O(aW, "TableColMerge");
            G += O(aW, "TableColSplit");
            G += O(aW, "TableColDelete");
            break;
        }
        return G;
    };
    var mV = function(aH, dg, iG) {
        if (C.ai() == "Control") {
            if (aH) {
                var el = C.ax();
                if (el.tagName.toUpperCase() == aH) {
                    if ((dg) && (iG)) {
                        if (el.getAttribute(dg, 2).toLowerCase() == iG.toLowerCase()) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        }
        return false;
    };
    tA = function() {
        if (ac.readyState != "complete" && ac.readyState != "interactive") {
            return false;
        }
        if (ac.images) {
            for (var i = 0; i < ac.images.length; i++) {
                var img = ac.images[i];
                if (!img.complete) {
                    return false;
                }
            }
        }
        return true;
    };
    return {
        Show: function() {
            if (F.as) {
                if (!tA()) {
                    window.setTimeout("am.Show()", 50);
                    return;
                }
                var w = ac.body.scrollWidth;
                var h = ac.body.scrollHeight;
                if (bH.x + w > document.body.clientWidth) {
                    bH.x = bH.x - w + bH.ew;
                }
                cv.show(bH.x, bH.y, w, h, bH.rel);
            } else {
                var w = eA.offsetWidth;
                var h = eA.offsetHeight;
                var x = bH.x;
                var y = bH.y;
                if (ac.readyState != "complete") {
                    window.setTimeout("am.Show()", 50);
                    return;
                }
                R.cP(aP, {
                    width: w + 'px',
                    height: h + 'px',
                    left: x + 'px',
                    top: y + 'px'
                });
                gg = true;
            }
        },
        fJ: function(e, an) {
            if (EWEB.ae != "EDIT") {
                return R.aw(e);
            }
            mv();
            if (gg) {
                this.Hide();
            }
            EWEB.Focus();
            C.Save(true);
            var G = "";
            switch (an) {
            case "font":
                G += bb("Bold");
                G += bb("Italic");
                G += bb("UnderLine");
                G += bb("StrikeThrough");
                G += bf;
                G += bb("SuperScript");
                G += bb("SubScript");
                G += bf;
                G += O("", "UpperCase");
                G += O("", "LowerCase");
                G += bf;
                G += O("", "ForeColor");
                G += O("", "BackColor");
                G += bf;
                G += O("", "Big");
                G += O("", "Small");
                break;
            case "paragraph":
                G += bb("JustifyLeft");
                G += bb("JustifyCenter");
                G += bb("JustifyRight");
                G += bb("JustifyFull");
                G += bf;
                G += bb("OrderedList", "insertorderedlist");
                G += bb("UnOrderedList", "insertunorderedlist");
                G += bb("Indent");
                G += bb("Outdent");
                G += bf;
                G += bb("Paragraph", "insertparagraph");
                G += O("", "BR");
                G += bf;
                G += O((iY()) ? "": "disabled", "ParagraphAttr", "CMenuParagraph");
                break;
            case "edit":
                var aW = "";
                if (!ap.HO()) {
                    aW = "disabled";
                }
                G += O(aW, "UnDo");
                if (!ap.rC()) {
                    aW = "disabled";
                }
                G += O(aW, "ReDo");
                G += bf;
                G += bb("Cut");
                G += bb("Copy");
                G += O("", "Paste");
                G += O("", "PasteText");
                G += O("", "PasteWord");
                G += bf;
                G += bb("Delete");
                G += bb("RemoveFormat");
                G += bf;
                G += bb("SelectAll");
                G += bb("UnSelect");
                G += bf;
                G += O("", "FindReplace");
                G += O("", "QuickFormat");
                break;
            case "object":
                G += O("", "BgColor");
                G += O("", "BackImage");
                G += bf;
                G += O("", "absolutePosition");
                G += O("", "zIndexForward");
                G += O("", "zIndexBackward");
                G += bf;
                G += O("", "ShowBorders");
                G += bf;
                G += O("", "Quote");
                G += O("", "Code");
                break;
            case "component":
                G += O("", "Image");
                G += O("", "Flash");
                G += O("", "Media");
                G += O("", "File");
                G += bf;
                G += O("", "RemoteUpload");
                G += O("", "LocalUpload");
                G += bf;
                G += O("", "Fieldset");
                G += O("", "Iframe");
                G += bb("HorizontalRule", "InsertHorizontalRule");
                G += O("", "Marquee");
                G += bf;
                G += O("", "CreateLink");
                G += O("", "Anchor");
                G += O("", "Map");
                G += bb("Unlink");
                break;
            case "tool":
                G += O("", "Template");
                G += O("", "Symbol");
                G += O("", "Excel");
                G += O("", "Emot");
                G += bf;
                G += O("", "MathFlowEQ");
                G += O("", "Art");
                G += bf;
                G += O("", "NowDate");
                G += O("", "NowTime");
                G += bf;
                G += O("", "ImportWord");
                G += O("", "ImportExcel");
                G += O("", "ImportPPT");
                G += O("", "Capture");
                G += bf;
                G += O("", "Pagination");
                G += O("", "PaginationInsert");
                break;
            case "file":
                G += O("", "Refresh");
                G += bf;
                G += O("", "ModeCode");
                G += O("", "ModeEdit");
                G += O("", "ModeText");
                G += O("", "ModeView");
                G += bf;
                G += O("", "SizePlus");
                G += O("", "SizeMinus");
                G += bf;
                G += O("", "Print");
                G += bf;
                G += O("", "About");
                G += O("", "Site");
                height = 208;
                break;
            case "table":
                G += eN("TableInsert");
                G += eN("TableProp");
                G += bf;
                G += eN("TableCell");
                break;
            case "form":
                G += O("", "FormText");
                G += O("", "FormTextArea");
                G += O("", "FormRadio");
                G += O("", "FormCheckbox");
                G += O("", "FormDropdown");
                G += O("", "FormButton");
                break;
            case "gallery":
                G += O("", "GalleryImage");
                G += O("", "GalleryFlash");
                G += O("", "GalleryMedia");
                G += O("", "GalleryFile");
                break;
            case "zoom":
                for (var i = 0; i < cY.Options.length; i++) {
                    if (cY.Options[i] == cY.qr) {
                        G += dY("", "cY.Execute(" + cY.Options[i] + ")", 120, cY.Options[i] + "%");
                    } else {
                        G += dY("", "cY.Execute(" + cY.Options[i] + ")", 119, cY.Options[i] + "%");
                    }
                }
                break;
            case "fontsize":
                var v = C.BA();
                for (var i = 0; i < lang["FontSizeItem"].length; i++) {
                    if (lang["FontSizeItem"][i][0] == v) {
                        G += dY("", "fq('size','" + lang["FontSizeItem"][i][0] + "')", 120, lang["FontSizeItem"][i][1]);
                    } else {
                        G += dY("", "fq('size','" + lang["FontSizeItem"][i][0] + "')", 119, lang["FontSizeItem"][i][1]);
                    }
                }
                break;
            case "fontname":
                var v = EWEB.T.queryCommandValue("FontName");
                for (var i = 0; i < lang["FontNameItem"].length; i++) {
                    var DM = lang["FontNameItem"][i];
                    var DV = DM.toLowerCase().split(",");
                    var EE = DM.split(",")[0];
                    if (v && DV.IndexOf(v.toLowerCase()) >= 0) {
                        G += dY("", "fq('face','" + DM + "')", 120, EE);
                    } else {
                        G += dY("", "fq('face','" + DM + "')", 119, EE);
                    }
                }
                break;
            case "formatblock":
                var v = EWEB.T.queryCommandValue("FormatBlock");
                if (v) {
                    v = v.toLowerCase();
                } else {
                    v = "";
                }
                for (var i = 0; i < lang["FormatBlockItem"].length; i++) {
                    if (lang["FormatBlockItem"][i][0].toLowerCase() == v) {
                        G += dY("", "format('FormatBlock','" + lang["FormatBlockItem"][i][0] + "')", 120, lang["FormatBlockItem"][i][1]);
                    } else {
                        G += dY("", "format('FormatBlock','" + lang["FormatBlockItem"][i][0] + "')", 119, lang["FormatBlockItem"][i][1]);
                    }
                }
                break;
            }
            eA.innerHTML = kp + G + kg;
            R.ko(eA);
            if (cv) {
                cv.show(0, 0, 0, 0, document.body);
                e = window.event;
                e.returnValue = false;
                var el = e.srcElement;
                var x = e.clientX - e.offsetX;
                var y = e.clientY - e.offsetY;
                if (el.style.top) {
                    y = y - parseInt(el.style.top);
                }
                if (el.tagName.toLowerCase() == "img") {
                    el = el.parentNode;
                    x = x - el.offsetLeft - el.clientLeft;
                    y = y - el.offsetTop - el.clientTop;
                }
                if (el.className == "TB_Btn_Image") {
                    el = el.parentNode;
                    x = x - el.offsetLeft - el.clientLeft;
                    y = y - el.offsetTop - el.clientTop;
                }
                y = y + el.offsetHeight;
                var ew = parseInt(el.offsetWidth);
                bH.x = x;
                bH.y = y;
                bH.ew = ew;
                bH.rel = R.fR(document) ? document.documentElement: document.body;
                am.Show();
            } else {
                var el = e.target;
                if (el.tagName.toLowerCase() == "img" || el.className == "TB_Btn_Image") {
                    el = el.parentNode;
                }
                var x = 0;
                var y = 0;
                var ew = el.offsetWidth;
                if (F.ik) {
                    x = e.clientX;
                    y = e.clientY;
                } else {
                    x = e.pageX;
                    y = e.pageY;
                }
                var fs = R.hg(cN, el);
                x = fs.x;
                y = fs.y + el.offsetHeight;
                bH.x = x;
                bH.y = y;
                bH.ew = ew;
                aP.contentWindow.focus();
                window.setTimeout("am.Show()", 1);
            }
        },
        rw: function(e) {
            if (EWEB.ae != "EDIT") {
                return R.aw(e);
            }
            mv();
            if (gg) {
                am.Hide();
            }
            C.Save(true);
            var G = "";
            G += bb("Cut");
            G += bb("Copy");
            G += O("", "Paste");
            G += bb("Delete");
            G += bb("SelectAll");
            G += bf;
            if (bI.bp()) {
                G += eN("TableProp");
                G += eN("TableCell");
                G += bf;
            }
            if (mV("TABLE")) {
                G += eN("TableProp");
                G += bf;
            }
            if (mV("IMG")) {
                var da = aE.wv();
                if (!da) {
                    G += O("", "Image", "CMenuImg");
                    if (config.TitleImage) {
                        G += O("", "TitleImage");
                    }
                    G += bf;
                    G += O("", "zIndexForward");
                    G += O("", "zIndexBackward");
                    G += bf;
                }
                if (da == "flash") {
                    G += O("", "Flash", "CMenuFlash");
                    G += bf;
                }
                if (da == "mediaplayer6" || da == "mediaplayer7" || da == "realplayer" || da == "quicktime" || da == "flv" || da == "vlc") {
                    G += O("", "Media", "CMenuMedia");
                    G += bf;
                }
            }
            if (mV("HR")) {
                G += O("", "HorizontalRule", "CMenuHr");
                G += bf;
            }
            if (iY()) {
                G += O("", "ParagraphAttr", "CMenuParagraph");
                G += bf;
            }
            G += O("", "FindReplace");
            eA.innerHTML = kp + G + kg;
            R.ko(eA);
            if (cv) {
                cv.show(0, 0, 0, 0, document.body);
                e = eWebEditor.event;
                bH.x = e.clientX;
                bH.y = e.clientY;
                bH.ew = 0;
                bH.rel = EWEB.T.documentElement;
                am.Show();
            } else {
                R.aw(e);
                bH.x = e.pageX;
                bH.y = e.pageY;
                var el = EWEB.T;
                var fs = R.hg(cN, (R.fR(el) ? el.documentElement: el.body));
                bH.x += fs.x;
                bH.y += fs.y;
                bH.ew = 0;
                aP.contentWindow.focus();
                window.setTimeout("am.Show()", 1);
            }
            return false;
        },
        Hide: function() {
            if (cv) {
                cv.hide();
            } else {
                if (!gg) {
                    return;
                }
                aP.style.width = aP.style.height = '0px';
                gg = false;
                C.Restore(true);
                C.Release();
            }
        }
    };
})();
function sF(e) {};
function rK(e) {
    am.Hide();
};
var ec = (function() {
    var eP;
    var us = 9999789;
    var cB;
    var fK;
    var cN;
    var cg;
    var ks = function() {
        return++us;
    };
    var oH = function() {
        if (!cB) {
            return;
        }
        var Bk = R.fR(cg) ? cg.documentElement: cg.body;
        R.cP(cB, {
            'width': Math.max(Bk.scrollWidth, Bk.clientWidth, cg.scrollWidth || 0) - 1 + 'px',
            'height': Math.max(Bk.scrollHeight, Bk.clientHeight, cg.scrollHeight || 0) - 1 + 'px'
        });
    };
    var pj = function(el) {
        R.cP(el, {
            'zIndex': ks()
        });
    };
    var tu = function() {
        if (!cN) {
            cN = R.lJ();
            cg = cN.document;
        }
        cB = cg.createElement("div");
        R.hh(cB);
        R.cP(cB, {
            "position": "absolute",
            "zIndex": ks(),
            "top": "0px",
            "left": "0px",
            "backgroundColor": "#ffffff"
        });
        R.rN(cB, 0.50);
        if (F.as && !F.gB) {
            fK = cg.createElement("iframe");
            R.hh(fK);
            fK.hideFocus = true;
            fK.frameBorder = 0;
            fK.src = R.iO();
            R.cP(fK, {
                "width": "100%",
                "height": "100%",
                "position": "absolute",
                "left": "0px",
                "top": "0px",
                "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
            });
            cB.appendChild(fK);
        }
        R.az(cN, "resize", oH);
        oH();
        cg.body.appendChild(cB);
    };
    var uW = function() {
        R.cE(cB);
    };
    return {
        OpenDialog: function(rz, fP) {
            C.Save(true);
            if (!eP) {
                tu();
            } else {
                pj(cB);
            }
            var tI = {
                vz: cN,
                aR: window,
                Page: rz,
                Hide: fP
            };
            var ei = 160;
            var cq = 100;
            var dialog = cg.createElement('iframe');
            R.hh(dialog);
            dialog.frameBorder = 0;
            dialog.allowTransparency = true;
            var sJ = F.as && (!F.gB || !R.fR(cN.document));
            R.cP(dialog, {
                'position': (sJ) ? 'absolute': 'fixed',
                'width': ei + 'px',
                'height': cq + 'px',
                'zIndex': ks()
            });
            if (fP) {
                R.cP(dialog, {
                    'top': '-10000px',
                    'left': '-10000px'
                });
            } else {
                this.oP(dialog, ei, cq);
            }
            dialog.src = EWEB.hW + EWEB.cd + "/dialog/dialog.htm";
            dialog.kw = tI;
            cg.body.appendChild(dialog);
            dialog.la = eP;
            eP = dialog;
        },
        wH: function(wd, Eh, kv) {
            FT.jT(false);
            var dialog = wd.frameElement;
            R.cE(dialog);
            if (dialog.la) {
                eP = dialog.la;
                pj(eP);
            } else {
                uW();
                setTimeout(function() {
                    eP = null;
                },
                0);
                C.Release();
                if (EWEB.ae != "EDIT") {
                    EWEB.Focus();
                }
                if (Eh) {
                    ap.jO();
                    ap.Save();
                }
                if (kv) {
                    if (kv.flag) {
                        R.oQ(sk, 200, null, [kv]);
                    }
                }
                R.oQ(sk, 200, null, [{
                    flag: "DialogClose",
                    ok: Eh
                }]);
            }
        },
        oP: function(dialog, ei, cq) {
            if (!ei) {
                ei = parseInt(dialog.style.width, 10);
            }
            if (!cq) {
                cq = parseInt(dialog.style.height, 10);
            }
            var oh = R.eF(cN);
            var kc = {
                'X': 0,
                'Y': 0
            };
            var uS = F.as && (!F.gB || !R.fR(cN.document));
            if (uS) {
                kc = R.gL(cN);
            }
            var dM = Math.max(kc.Y + (oh.Height - cq - 20) / 2, 0);
            var jq = Math.max(kc.X + (oh.Width - ei - 20) / 2, 0);
            R.cP(dialog, {
                'top': dM + 'px',
                'left': jq + 'px'
            });
        },
        yH: function() {
            return cB;
        },
        Ab: function() {
            return eP;
        }
    };
})();
var ci = (function() {
    var BO = 1;
    var rR = true;
    var tW = function(dW) {
        dW.onmouseover = tY;
        dW.onmouseout = vg;
        dW.onmousedown = uJ;
        dW.onmouseup = tZ;
        dW.ondragstart = R.aw;
        dW.onselectstart = R.aw;
        dW.onselect = R.aw;
        dW.qn = true;
        return true;
    };
    var jv = function(e) {
        if (!e) {
            e = window.event;
        }
        var el = e.srcElement || e.target;
        if (el.tagName == "IMG") {
            el = el.parentNode;
        }
        if (el.className == "TB_Btn_Image") {
            el = el.parentNode;
        }
        return el;
    };
    var tY = function(e) {
        var el = jv(e);
        el.className = "TB_Btn_Over";
    };
    var vg = function(e) {
        var el = jv(e);
        if (el.dj) {
            el.className = "TB_Btn_Down";
        } else {
            el.className = "TB_Btn";
        }
    };
    var uJ = function(e) {
        var el = jv(e);
        el.className = "TB_Btn_Down";
    };
    var tZ = function(e) {
        var el = jv(e);
        if (el.className = "TB_Btn_Down") {
            el.className = "TB_Btn_Over";
        } else {
            if (el.dj) {
                el.className = "TB_Btn_Down";
            } else {
                el.className = "TB_Btn";
            }
        }
    };
    var eV;
    var kT = function() {
        if (eV) {
            return;
        }
        var oa = {
            normal: ["Bold", "Italic", "UnderLine", "StrikeThrough", "SuperScript", "SubScript", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyFull"],
            mode: ["ModeCode", "ModeEdit", "ModeView", "ModeText"],
            other: ["ShowBlocks", "ShowBorders", "Maximize", "FormatBrush", "ExpandToolbar"]
        };
        var K = $("eWebEditor_Toolbar").getElementsByTagName("DIV");
        eV = new Object;
        for (gM in oa) {
            var oD = oa[gM];
            var iH = new Object;
            for (var i = 0; i < oD.length; i++) {
                var aV = oD[i];
                iH[aV] = new Array();
                for (var j = 0; j < K.length; j++) {
                    var el = K[j];
                    if (el.getAttribute("name") == "TB_Name_" + aV) {
                        iH[aV][iH[aV].length] = el;
                    }
                }
            }
            eV[gM] = iH;
        }
    };
    var tJ = function(gV) {
        kT();
        var fl = "";
        if (F.as && C.ai() != "Control") {
            var p = C.lF(["P", "DIV", "TD", "TH"]);
            if (p) {
                fl = p.style.textAlign;
                if (!fl) {
                    fl = p.getAttribute("align");
                }
            }
        }
        var hi = eV["normal"];
        for (aV in hi) {
            var v;
            if (fl && aV.substring(0, 7) == "Justify") {
                var ab = aV.substr(7).toLowerCase();
                if (ab == "full") {
                    ab = "justify";
                }
                if (fl.toLowerCase() == ab) {
                    v = fl;
                } else {
                    v = "";
                }
            } else {
                v = EWEB.T.queryCommandState(aV);
            }
            var K = hi[aV];
            for (var j = 0; j < K.length; j++) {
                var el = K[j];
                el.dj = v;
                if (gV) {
                    el.className = "TB_Btn";
                } else {
                    if (v) {
                        el.className = "TB_Btn_Down";
                    } else {
                        el.className = "TB_Btn";
                    }
                }
            }
        }
    };
    var sj = function() {
        kT();
        var hi = eV["mode"];
        for (aV in hi) {
            var K = hi[aV];
            for (var j = 0; j < K.length; j++) {
                var el = K[j];
                var ay = el.getAttribute("name");
                ay = ay.substr(ay.length - 4).toUpperCase();
                if (ay == EWEB.ae) {
                    el.dj = "on";
                    el.className = "TB_Btn_Down";
                } else {
                    el.dj = "";
                    el.className = "TB_Btn";
                }
            }
        }
    };
    var tN = function(gV) {
        var en, v;
        en = "FontName";
        if (gV) {
            v = "";
        } else {
            try {
                v = EWEB.T.queryCommandValue(en);
            } catch(e) {
                v = "";
            }
        }
        nQ(en, v);
        en = "FontSize";
        v = C.BA();
        nQ(en, v);
    };
    var nQ = function(en, v) {
        var K = document.getElementsByName("TB_Name_" + en);
        for (var i = 0; i < K.length; i++) {
            var el = K[i];
            if (v) {
                v = v.toLowerCase();
                v = v.replace(/[\'\"]/gi, '');
                var b = false;
                for (var j = 0; j < el.options.length; j++) {
                    var pn = el.options[j].value.toLowerCase();
                    if (pn == v || pn.split(',').IndexOf(v) >= 0 || (en == "FontSize" && uV(pn, v))) {
                        el.selectedIndex = j;
                        b = true;
                        break;
                    }
                }
                if (!b && v != "ewebeditor_temp_fontname") {
                    el.options[el.options.length] = new Option(v, v);
                    el.selectedIndex = el.options.length - 1;
                }
            } else {
                el.selectedIndex = 0;
            }
        }
    };
    var uV = function(ab, aF) {
        ab = ab.toLowerCase();
        aF = aF.toLowerCase();
        if (ab == aF) {
            return true;
        }
        if (ab.eg("pt") && aF.eg("px")) {
            var gj = 0;
            ab = parseFloat(ab) + "";
            var n = ab.indexOf(".");
            if (n >= 0) {
                var s = ab.substr(n + 1);
                gj = s.length;
            }
            if (gj > 0) {
                if (ab == Math.round(parseFloat(aF) * 3 / 4 * Math.pow(10, gj) + 0.01) / Math.pow(10, gj)) {
                    return true;
                }
            } else {
                if (ab == parseInt(parseFloat(aF) * 3 / 4 + 0.01)) {
                    return true;
                }
            }
        }
        return false;
    };
    return {
        vF: function() {
            var i, K, el, p;
            p = $("eWebEditor_Toolbar");
            K = p.getElementsByTagName("div");
            for (i = 0; i < K.length; i++) {
                el = K[i];
                if (el.className == "TB_Btn") {
                    if (el.qn == null) {
                        if (!tW(el)) {
                            alert("Problem initializing:" + el.id);
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        eW: function() {
            if (EWEB.ae != "EDIT") {
                return;
            }
            var b = (C.ai() == "Control") ? true: false;
            tJ(b);
            tN(b);
        },
        rk: function() {
            sj();
        },
        hV: function(gM, rI) {
            kT();
            return eV[gM][rI];
        },
        CO: function(dO) {
            BO = dO;
            rR = false;
        },
        CY: function() {
            if (EWEB.ae != "EDIT") {
                return;
            }
            if (config.Toolbars.length <= 1) {
                return;
            }
            rR = (!rR);
            var Bg = ((rR) ? "": "none");
            for (var i = BO; i < config.Toolbars.length; i++) {
                $("eWebEditor_Toolbar_Edit_TR" + i).style.display = Bg;
            }
            if (Bg == "none" && F.eo) {
                $("eWebEditor_ToolarTREdit").style.display = Bg;
                window.setTimeout(function() {
                    $("eWebEditor_ToolarTREdit").style.display = "";
                },
                100);
            }
            Dj();
            this.nT("other", "ExpandToolbar", rR);
        },
        nT: function(gM, rI, Bj, CK, Cl) {
            var cp = this.hV(gM, rI);
            for (var j = 0; j < cp.length; j++) {
                var el = cp[j];
                var sa;
                if (Bj) {
                    el.dj = "on";
                    el.className = "TB_Btn_Down";
                    sa = Cl;
                } else {
                    el.dj = null;
                    el.className = "TB_Btn";
                    sa = CK;
                }
                if (sa) {
                    var vC = el.getElementsByTagName("IMG");
                    if (vC) {
                        var dM = 16 - sa * 16;
                        if (F.as) {
                            vC[0].style.top = dM + "px";
                        } else {
                            vC[0].style.backgroundPosition = "0px " + dM + "px";
                        }
                    }
                }
            }
        }
    };
})();
var bI = (function() {
    var aS;
    var au;
    var nS;
    var dk;
    return {
        bp: function() {
            if (C.ai() != "Control") {
                var el = C.cI();
                while (el) {
                    if (!el.tagName) {
                        el = null;
                        break;
                    }
                    if (el.tagName.toUpperCase() == "TD" || el.tagName.toUpperCase() == "TH") {
                        break;
                    } else if (el.tagName.toUpperCase() == "BODY" || el.tagName.toUpperCase() == "HTML") {
                        el = null;
                        break;
                    }
                    el = el.parentNode;
                }
                if (el) {
                    aS = el;
                    au = aS.parentNode;
                    nS = au.parentNode;
                    dk = nS.parentNode;
                    return true;
                }
            }
            return false;
        },
        gl: function() {
            if (C.ai() == "Control") {
                var el = C.ax();
                if (el.tagName.toUpperCase() == "TABLE") {
                    dk = el;
                    return true;
                }
            }
            return false;
        },
        TableInsert: function() {
            if (!bI.gl()) {
                aK('table.htm', true);
            }
        },
        TableProp: function() {
            if (bI.gl() || bI.bp()) {
                aK('table.htm?action=modify', true);
            }
        },
        tK: function() {
            if (bI.bp()) {
                aK('tablecell.htm', true);
            }
        },
        uC: function() {
            if (bI.bp()) {
                aK('tablecellsplit.htm', true);
            }
        },
        sT: function() {
            if (bI.bp()) {
                aK('tablecell.htm?action=row', true);
            }
        },
        qt: function() {
            if (!bI.bp()) {
                return;
            }
            var Ge = 0;
            var CW = au.cells;
            for (var i = 0; i < CW.length; i++) {
                Ge = Ge + CW[i].colSpan;
            }
            var CU = dk.insertRow(au.rowIndex);
            for (i = 0; i < Ge; i++) {
                var Dy = CU.insertCell( - 1);
                Dy.innerHTML = "&nbsp;";
            }
        },
        sR: function() {
            if (!bI.bp()) {
                return;
            }
            var Ge = 0;
            var CW = au.cells;
            for (var i = 0; i < CW.length; i++) {
                Ge = Ge + CW[i].colSpan;
            }
            var CU = dk.insertRow(au.rowIndex + 1);
            for (i = 0; i < Ge; i++) {
                var Dy = CU.insertCell( - 1);
                Dy.innerHTML = "&nbsp;";
            }
        },
        rv: function() {
            if (!bI.bp()) {
                return;
            }
            var ze = aS.rowSpan;
            ba = dk.rows;
            if (au.rowIndex + 1 != ba.length) {
                var rq = ba[au.rowIndex + aS.rowSpan].cells;
                var lx = rq[aS.cellIndex].rowSpan;
                var moveTo = aS.rowSpan;
                if (!lx) lx = 1;
                aS.rowSpan = aS.rowSpan + lx;
                ba[au.rowIndex + moveTo].deleteCell(aS.cellIndex);
            }
        },
        pI: function(mu) {
            if (!bI.bp()) {
                return;
            }
            if (mu < 2) {
                return;
            }
            var sC = mu - 1;
            var jQ = sC;
            var gp = 0;
            for (var i = 0; i < aS.cellIndex; i++) {
                gp += au.cells[i].colSpan;
            }
            var ba = dk.rows;
            while (aS.rowSpan > 1 && jQ > 0) {
                var kM = ba[au.rowIndex + aS.rowSpan - 1];
                aS.rowSpan -= 1;
                var gJ = 0;
                var position = -1;
                for (var n = 0; n < kM.cells.length; n++) {
                    gJ += kM.cells[n].colSpan;
                    if (gJ > gp) {
                        position = n;
                        break;
                    }
                }
                var fL = kM.insertCell(position);
                fL.innerHTML = "&nbsp;";
                jQ -= 1;
            }
            for (var n = 0; n < jQ; n++) {
                var cQ = 0;
                cz = au.cells;
                for (var i = 0; i < cz.length; i++) {
                    cQ = cQ + cz[i].colSpan;
                }
                var gu = dk.insertRow(au.rowIndex + 1);
                for (var j = 0; j < au.rowIndex; j++) {
                    for (var k = 0; k < ba[j].cells.length; k++) {
                        if ((ba[j].cells[k].rowSpan > 1) && (ba[j].cells[k].rowSpan >= au.rowIndex - ba[j].rowIndex + 1)) {
                            ba[j].cells[k].rowSpan += 1;
                        }
                    }
                }
                for (i = 0; i < cz.length; i++) {
                    if (i != aS.cellIndex) {
                        au.cells[i].rowSpan += 1;
                    } else {
                        fL = gu.insertCell( - 1);
                        fL.colSpan = aS.colSpan;
                        fL.innerHTML = "&nbsp;";
                    }
                }
            }
        },
        qa: function() {
            if (!bI.bp()) {
                return;
            }
            dk.deleteRow(au.rowIndex);
        },
        sf: function() {
            if (!bI.bp()) {
                return;
            }
            hy = (au.cells.length - 1) - (aS.cellIndex);
            ba = dk.rows;
            for (i = 0; i < ba.length; i++) {
                kq = ba[i].cells.length - 1;
                position = kq - hy;
                if (position < 0) {
                    position = 0;
                }
                dN = ba[i].insertCell(position);
                dN.innerHTML = "&nbsp;";
            }
        },
        sK: function() {
            if (!bI.bp()) {
                return;
            }
            hy = (au.cells.length - 1) - (aS.cellIndex);
            ba = dk.rows;
            for (i = 0; i < ba.length; i++) {
                kq = ba[i].cells.length - 1;
                position = kq - hy;
                if (position < 0) {
                    position = 0;
                }
                dN = ba[i].insertCell(position + 1);
                dN.innerHTML = "&nbsp;";
            }
        },
        sq: function() {
            if (!bI.bp()) {
                return;
            }
            var sH = aS.colSpan;
            cz = au.cells;
            if (aS.cellIndex + 1 != au.cells.length) {
                var ru = cz[aS.cellIndex + 1].colSpan;
                aS.colSpan = sH + ru;
                au.deleteCell(aS.cellIndex + 1);
            }
        },
        rX: function() {
            if (!bI.bp()) {
                return;
            }
            hy = (au.cells.length - 1) - (aS.cellIndex);
            ba = dk.rows;
            for (var i = 0; i < ba.length; i++) {
                vE = ba[i].cells.length - 1;
                position = vE - hy;
                if (position < 0) {
                    position = 0;
                }
                kl = ba[i].cells;
                if (kl[position].colSpan > 1) {
                    kl[position].colSpan = kl[position].colSpan - 1;
                } else {
                    ba[i].deleteCell(position);
                }
            }
        },
        qY: function(mJ) {
            if (!bI.bp()) {
                return;
            }
            if (mJ < 2) {
                return;
            }
            var sS = mJ - 1;
            var hb = sS;
            var dN;
            var gp = 0;
            var lb = 0;
            for (var i = 0; i < aS.cellIndex; i++) {
                gp += au.cells[i].colSpan;
                if (au.cells[i].rowSpan > 1) {
                    lb += 1;
                }
            }
            var ba = dk.rows;
            while (aS.colSpan > 1 && hb > 0) {
                dN = au.insertCell(aS.cellIndex + 1);
                dN.innerHTML = "&nbsp;";
                aS.colSpan -= 1;
                hb -= 1;
            }
            for (i = 0; i < ba.length; i++) {
                var gJ = 0;
                var position = -1;
                for (var n = 0; n < ba[i].cells.length; n++) {
                    gJ += ba[i].cells[n].colSpan;
                    if (gJ + lb > gp) {
                        position = n;
                        break;
                    }
                }
                if (au.rowIndex != i) {
                    if (position != -1) {
                        ba[i].cells[position + lb].colSpan += hb;
                    }
                } else {
                    for (var n = 0; n < hb; n++) {
                        dN = ba[i].insertCell(aS.cellIndex + 1);
                        dN.innerHTML = "&nbsp;";
                        dN.rowSpan = aS.rowSpan;
                    }
                }
            }
        }
    };
})();
var cW = (function() {
    var oy = 4;
    var or = 5;
    var df = false;
    var dQ = false;
    var fj = false;
    var dz = null;
    var kj = 0;
    var nF = 0;
    var cU = null;
    var nC = 0;
    var lB = 0;
    var ot;
    var po;
    var nN;
    var op;
    var kA;
    var lk;
    var cJ = null;
    var av = null;
    var jd = null;
    var ma;
    var mt;
    var nx;
    var mT;
    var hc = new Array();
    var hK = new Array();
    var gf = new Array();
    var iL = new Array();
    var nX = false;
    var ur = function() {
        dz = $("div_TableResizeSepV");
        dz.className = "TableResizeSepV";
        cU = $("div_TableResizeSepH");
        cU.className = "TableResizeSepH";
        R.az(document, 'mousemove', cW.PMM);
        nX = true;
    };
    var ee = function() {
        df = false;
        dQ = false;
        fj = false;
        cJ = null;
        av = null;
        jd = null;
        hc.length = 0;
        hK.length = 0;
        gf.length = 0;
        iL.length = 0;
        dz.style.display = "none";
        cU.style.display = "none";
    };
    var tL = function(be) {
        var n = be.offsetWidth;
        n = n - jF(R.ce(be, "padding-left"));
        n = n - jF(R.ce(be, "padding-right"));
        return n;
    };
    var uZ = function(be) {
        var n = be.offsetHeight;
        n = n - jF(R.ce(be, "padding-top"));
        n = n - jF(R.ce(be, "padding-bottom"));
        return n;
    };
    var lP = function(be) {
        if (isNaN(parseInt(be.rowSpan))) {
            return 1;
        } else {
            return parseInt(be.rowSpan);
        }
    };
    var jF = function(bv) {
        if (!bv) {
            return 0;
        }
        if (isNaN(parseInt(bv))) {
            return 0;
        }
        bv = bv.toLowerCase();
        if (parseFloat(bv) == 0) {
            return 0;
        } else if (bv.eg("px")) {
            return parseInt(bv);
        } else if (bv.eg("pt")) {
            return parseInt(parseFloat(bv) * 4 / 3);
        } else if (bv.eg("cm")) {
            return parseInt(parseFloat(bv) * 28.35 * 4 / 3);
        } else if (bv.eg("mm")) {
            return parseInt(parseFloat(bv) * 0.001 * 28.35 * 4 / 3);
        } else {
            return 0;
        }
    };
    var pp = function() {
        dz.style.display = "none";
        cU.style.display = "none";
        if (df) {
            dz.style.cursor = "e-resize";
            dz.style.display = "";
        }
        if (dQ) {
            cU.style.cursor = "s-resize";
            cU.style.display = "";
        }
        if (df && dQ) {
            dz.style.cursor = "se-resize";
            cU.style.cursor = "se-resize";
        }
    };
    return {
        xf: function() {
            return fj;
        },
        MM: function(e) {
            if (fj) {
                this.MM2(e);
                return;
            }
            if (!nX) {
                ur();
            }
            ee();
            var el = e.srcElement || e.target;
            if (R.dV(el) != EWEB.T) {
                ee();
                return;
            }
            while (el.tagName.toUpperCase() != "TD" && el.tagName.toUpperCase() != "TH") {
                if (el.tagName.toUpperCase() == "BODY" || el.tagName.toUpperCase() == "HTML") {
                    ee();
                    return;
                }
                el = el.parentNode;
                if (!el) {
                    ee();
                    return;
                }
            }
            cJ = el;
            var jq = 0;
            var dM = 0;
            while (el) {
                jq += el.offsetLeft;
                dM += el.offsetTop;
                el = el.offsetParent;
            }
            var oW = R.gL(EWEB.aR);
            var mf = jq + cJ.offsetWidth - oW.X;
            nN = e.screenX - e.clientX;
            kA = mf - oy;
            if (e.clientX > kA) {
                df = true;
            }
            var mo = dM + cJ.offsetHeight - oW.Y;
            op = e.screenY - e.clientY;
            lk = mo - oy;
            if (e.clientY > lk) {
                dQ = true;
            }
            if (df || dQ) {
                kj = mf + $("eWebEditor").offsetLeft + $("eWebEditor_Layout").offsetLeft;
                nF = $("eWebEditor").offsetTop + $("eWebEditor_Layout").offsetTop + $("eWebEditor_ToolarPTR").offsetHeight;
                dz.style.left = kj + "px";
                dz.style.top = nF + "px";
                dz.style.width = or + "px";
                dz.style.height = $("eWebEditor").offsetHeight + "px";
                nC = $("eWebEditor").offsetLeft + $("eWebEditor_Layout").offsetLeft;
                lB = mo + $("eWebEditor").offsetTop + $("eWebEditor_Layout").offsetTop + $("eWebEditor_ToolarPTR").offsetHeight;
                cU.style.left = nC + "px";
                cU.style.top = lB + "px";
                cU.style.width = $("eWebEditor").offsetWidth + "px";
                cU.style.height = or + "px";
            }
            pp();
        },
        MD2: function(e) {
            if (!e) {
                e = eWebEditor.event;
            }
            fj = true;
            ot = e.screenX;
            po = e.screenY;
            av = R.tz(cJ, "TABLE");
            if (df) {
                mt = av.offsetWidth;
                av.style.width = av.offsetWidth;
                ma = cJ.offsetWidth;
                for (var i = 0; i < av.rows.length; i++) {
                    for (var j = 0; j < av.rows[i].cells.length; j++) {
                        var be = av.rows[i].cells[j];
                        be.style.width = tL(be);
                        be.removeAttribute("width");
                    }
                }
                hc.length = 0;
                hK.length = 0;
                var n = 0;
                for (var i = 0; i < av.rows.length; i++) {
                    for (var j = 0; j < av.rows[i].cells.length; j++) {
                        var be = av.rows[i].cells[j];
                        if ((be.offsetLeft + be.offsetWidth) >= (cJ.offsetLeft + cJ.offsetWidth) && (be.offsetLeft < (cJ.offsetLeft + cJ.offsetWidth))) {
                            hc[n] = be;
                            hK[n] = parseInt(be.style.width);
                            n++;
                            break;
                        }
                    }
                }
            }
            if (dQ) {
                jd = cJ.parentNode;
                nx = av.offsetHeight;
                av.style.height = av.offsetHeight;
                mT = cJ.offsetHeight;
                for (var i = 0; i < av.rows.length; i++) {
                    for (var j = 0; j < av.rows[i].cells.length; j++) {
                        var be = av.rows[i].cells[j];
                        be.style.height = uZ(be);
                        be.removeAttribute("height");
                    }
                }
                gf.length = 0;
                iL.length = 0;
                var n = 0;
                var lf = jd.rowIndex + lP(jd);
                for (var i = 0; i < lf; i++) {
                    for (var j = 0; j < av.rows[i].cells.length; j++) {
                        var be = av.rows[i].cells[j];
                        if ((lP(be) + i) >= lf && i < lf) {
                            gf[n] = be;
                            iL[n] = parseInt(be.style.height);
                            n++;
                        }
                    }
                }
            }
        },
        MM2: function(e) {
            if (!e) {
                e = eWebEditor.event;
            }
            if (!fj) {
                var fU = false;
                if (e.screenX - nN > kA) {
                    if (!df) {
                        fU = true;
                        df = true;
                    }
                } else {
                    if (df) {
                        fU = true;
                        df = false;
                    }
                }
                if (e.screenY - op > lk) {
                    if (!dQ) {
                        fU = true;
                        dQ = true;
                    }
                } else {
                    if (dQ) {
                        fU = true;
                        dQ = false;
                    }
                }
                if (fU) {
                    pp();
                }
                return;
            }
            if (df) {
                var eK = e.screenX - ot;
                var gD = eK;
                if (av.align.toLowerCase() == "center") {
                    gD = 2 * gD;
                }
                var uQ = gD + ma;
                var tP = gD + mt;
                if (uQ >= 2) {
                    av.style.width = tP + "px";
                    dz.style.left = (kj + eK) + "px";
                    for (var i = 0; i < hc.length; i++) {
                        try {
                            hc[i].style.width = (gD + hK[i]) + "px";
                        } catch(er) {}
                    }
                }
            }
            if (dQ) {
                var eK = e.screenY - po;
                var vu = eK + mT;
                var uw = eK + nx;
                if (vu >= 2) {
                    av.style.height = uw + "px";
                    cU.style.top = (lB + eK) + "px";
                    for (var i = 0; i < gf.length; i++) {
                        try {
                            gf[i].style.height = (eK + iL[i]) + "px";
                        } catch(er) {}
                    }
                }
            }
        },
        MU2: function(e) {
            if (!fj) {
                return;
            }
            ee();
        },
        PMM: function(e) {
            if (!e) {
                e = window.event;
            }
            if (F.as && e.button != 1 && fj) {
                ee();
            }
        }
    };
})();
var ap = (function() {
    var dm = [];
    var dv = 0;
    var dR = [];
    var ha = false;
    var Ej = 10000000;
    var DY = 0;
    var ox = function() {
        var lw = dR[dv];
        if (lw) {
            if (F.as) {
                eWebEditor_Layout.focus();
                if (lw.substring(0, 8) != "[object]") {
                    var r = EWEB.T.body.createTextRange();
                    if (r.moveToBookmark(dR[dv])) {
                        r.select();
                    }
                } else {
                    if (EWEB.ae == "EDIT") {
                        var r = EWEB.T.body.createControlRange();
                        var a = lw.split("|");
                        var K = EWEB.T.body.getElementsByTagName(a[1]);
                        var el = K[a[2]];
                        r.addElement(el);
                        r.select();
                    }
                }
            } else {}
        }
    };
    var tq = function(el) {
        var K = EWEB.T.body.getElementsByTagName(el.tagName);
        for (var i = 0; i < K.length; i++) {
            if (K[i] == el) {
                return i;
            }
        }
        return null;
    };
    return {
        HO: function() {
            if (dm.length <= 1 || dv <= 0) {
                return false;
            }
            return true;
        },
        rC: function() {
            if (dv >= dm.length - 1 || dm.length == 0) {
                return false;
            }
            return true;
        },
        jO: function() {
            if (EWEB.ae != "EDIT") {
                return;
            }
            ha = false;
        },
        Save: function() {
            if (EWEB.ae != "EDIT") {
                return;
            }
            if (ha) {
                return;
            }
            ha = true;
            var V = getHTML();
            if (dm[dv] == V) {
                return;
            }
            var ws = dm.length - dv;
            for (var i = 1; i < ws; i++) {
                DY = DY - dm[dm.length - 1].length;
                dm.pop();
                dR.pop();
            }
            dm[dm.length] = V;
            DY = DY + V.length;
            while (DY > Ej && dm.length > 1) {
                DY = DY - dm[0].length;
                dm.shift();
                dR.shift();
            }
            if (F.as) {
                if (C.ai() != "Control") {
                    try {
                        dR[dR.length] = EWEB.T.selection.createRange().getBookmark();
                    } catch(e) {
                        dR[dR.length] = "";
                    }
                } else {
                    var el = C.ax();
                    dR[dR.length] = "[object]|" + el.tagName + "|" + tq(el);
                }
            } else {
                try {
                    dR[dR.length] = EWEB.aR.getSelection().getRangeAt(0).endContainer;
                } catch(e) {
                    dR[dR.length] = "";
                }
            }
            dv = dm.length - 1;
        },
        Go: function(v) {
            if (EWEB.ae != "EDIT") {
                return;
            }
            if (!ha) {
                this.Save();
            }
            var EJ = dv + v;
            if (EJ >= 0 && EJ < dm.length) {
                dv = EJ;
                setHTML(dm[dv], true);
                ox();
            }
            EWEB.Focus();
            ci.eW();
        }
    };
})();
var FT = (function() {
    var EI = "6.7.0.0";
    var GF = EI.replace(/\./gi, "");
    var CV = function(oC) {
        var Do = oC.split(".");
        var EO = EI.split(".");
        if (Do.length == 4) {
            for (var i = 0; i < 4; i++) {
                var EA = parseInt(Do[i]);
                var EZ = parseInt(EO[i]);
                if (EA > EZ) {
                    return true;
                } else if (EA < EZ) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    var Gv = '<object type="application/x-ewebeditor-' + GF + '" id="obj_activex" height="0" width="0" progid="eWebSoft.eWebEditor' + GF + '" ></object>';
    var Ff = false;
    var Ih = "20035";
    var Iv = function() {
        var wx = "ewebeditorls:port=" + Ih;
        var cR = $("div_LS");
        cR.innerHTML = "";
        //alert(0);
        cR.innerHTML = "<iframe id='ifr_LS' width=1 height=1 src='" + wx + "'></iframe>";
    };
    var GK = function(rs, HG) {
        var aG = aA.Proto + "://127.0.0.1:" + Ih + "/";
        rs["V"] = GF;
        rs["Lang"] = lang.bF;
        rs["Charset"] = config.Charset;
        rs["SendUrl"] = EWEB.SendUrl;
        rs["LocalSize"] = config.AllowLocalSize;
        rs["LocalExt"] = config.AllowLocalExt;
        rs["Cookie"] = config.Cookie;
        rs["CertIssuer"] = config.CertIssuer;
        rs["CertSubject"] = config.CertSubject;
        IG.GW("post", aG, true, rs,
        function(HD) {
            HG(HD);
        });
    };
    var Hd = function(zP, Ey, HS) {
        var hT = {};
        var Hg = function() {
            if (Ey) {
                Ey({
                    "sucess": "yes"
                });
            } else {
                FT.Im();
            }
        };
        if (F.qJ) {
            var If = HS["Act"];
            GK(HS,
            function(GU) {
                if (GU["XhrStatus"] == 200 && GU["Data"]["Status"] == "ok") {
                    if ("|capture|localupload|showeq|importword|pasteword|importexcelsheet|pasteexcel|importppt|pastefilelist|pasteimage|".indexOf("|" + If + "|") >= 0) {
                        HS["Act"] = "status";
                        R.oQ(Hd, 100, null, [zP, Ey, HS]);
                        return;
                    }
                    hT = GU["Data"];
                    if (If == "isinstalled") {
                        if (hT["Ret"] == "yes") {
                            hT["Ret"] = true;
                            FT.kI = "LS";
                        } else {
                            hT["Ret"] = false;
                            if (HS["Param1"]) {
                                aK("installactivex.htm?action=install", true);
                            }
                        }
                    }
                    FT.HE = false;
                    if (typeof(zP) == 'function') {
                        zP(hT);
                    }
                    Hg();
                } else {
                    if (If == "isinstalled") {
                        if (FT.IB) {
                            FT.IB = false;
                            Iv();
                        } else if ((new Date() - FT._AjaxBeginTime) > 5000) {
                            hT["Ret"] = false;
                            FT.HE = false;
                            if (typeof(zP) == 'function') {
                                zP(hT);
                            }
                            if (HS["Param1"]) {
                                aK("installactivex.htm?action=install", true);
                            }
                            Hg();
                            return;
                        }
                    }
                    R.oQ(Hd, 100, null, [zP, Ey, HS]);
                    return;
                }
            });
        } else {
            hT["Status"] = FT.kI.Status;
            if (hT["Status"] != "ok") {
                R.oQ(Hd, 100, null, [zP, Ey]);
                return;
            } else {
                FT.HE = false;
                if (typeof(zP) == 'function') {
                    hT["Ret"] = "";
                    hT["Error"] = FT.kI.Error;
                    hT["Style"] = FT.kI.Style;
                    hT["Body"] = FT.kI.Body;
                    hT["OriginalFiles"] = FT.kI.OriginalFiles;
                    hT["SavedFiles"] = FT.kI.SavedFiles;
                    zP(hT);
                }
                Hg();
            }
        }
    };
    return {
        FV: function(ri) {
            if (this.kI) {
                this.Fm();
                return true;
            }
            var FL;
            var b = false;
            var an = "install";
            if (F.EY) {
                try {
                    FL = new ActiveXObject("eWebSoft.eWebEditor" + GF);
                    var oC = FL.Version;
                    if (CV(oC)) {
                        b = true;
                    } else {
                        FL = null;
                        an = "update";
                    }
                } catch(e) {}
            } else {
                try {
                    FL = $("obj_activex");
                    var oC = FL.Version;
                    if (oC) {
                        if (CV(oC)) {
                            b = true;
                        } else {
                            an = "update";
                        }
                    }
                } catch(e) {}
            }
            if (b) {
                FL.Lang = lang.bF;
                FL.Charset = config.Charset;
                FL.SendUrl = EWEB.SendUrl;
                FL.LocalSize = config.AllowLocalSize;
                FL.LocalExt = config.AllowLocalExt;
                FL.Cookie = config.Cookie;
                FL.CertIssuer = config.CertIssuer;
                FL.CertSubject = config.CertSubject;
                this.kI = FL;
                return true;
            } else {
                if (ri) {
                    aK("installactivex.htm?action=" + an, true);
                } else {
                    if (!F.EY) {
                        navigator.plugins.refresh(false);
                        $("div_activex").innerHTML = "";
                        $("div_activex").innerHTML = Gv;
                    }
                }
                return false;
            }
        },
        Fm: function() {
            if (!F.qJ) {
                this.kI.SendUrl = EWEB.SendUrl;
            }
        },
        FO: function(ri, zP) {
            if (!this.kI) {
                zP(false);
                return;
            }
            FT.wQ("isprinterexist", [],
            function(hT) {
                var b = ((hT["Ret"] + "") == "1");
                if (!b && ri) {
                    ec.OpenDialog("installprinter.htm");
                }
                zP(b);
            });
        },
        Fi: function(dU) {
            if (dU != "") {
                var fX, ge;
                if (dU.indexOf(":") >= 0) {
                    var a = dU.split(":");
                    fX = a[0];
                    ge = a[1];
                } else {
                    fX = dU;
                    ge = "";
                }
               /* switch (fX) {
                case "L":
                    alert(lang["ErrLicense"]);
                    break;
                case "InvalidFile":
                    alert(lang["ErrInvalidFile"] + ":" + ge);
                    break;
                case "HttpRequest":
                    alert(lang["ErrHttpRequest"] + ge);
                    break;
                default:
                    alert(dU);
                }*/
                return true;
            }
            return false;
        },
        jT: function(an) {
            Ff = an
        },
        FD: function() {
            if (Ff) {
                return true;
            } else {
                Ff = true;
                return false;
            }
        },
        FFObjectHTML: Gv,
        HK: [],
        Im: function() {
            if (FT.HK.length == 0) {
                return;
            }
            FT.wQ(FT.HK[0]["Act"], FT.HK[0]["Param"], FT.HK[0]["CallBack"], true,
            function(hT) {
                if (hT["sucess"]) {
                    FT.HK.shift();
                }
                window.setTimeout(FT.Im, 100);
            });
        },
        wQ: function(Iz, qD, zP, Ic, Ey) {
            if (!F.Bx) {
                zP({
                    "Ret": false
                });
                return;
            }
            if (Iz == "isinstalled") {
                if (FT.kI) {
                    if (!F.qJ) {
                        FT.Fm();
                    }
                    zP({
                        "Ret": true
                    });
                    if (Ey) {
                        Ey({
                            "sucess": "yes"
                        });
                    } else {
                        FT.Im();
                    }
                    return;
                }
            }
            var HD = {};
            if (FT.HE) {
                if (Ic) {
                    if (Ey) {
                        Ey({
                            "sucess": ""
                        });
                        return;
                    } else {
                        zP({
                            "sucess": ""
                        });
                        window.setTimeout(FT.Im, 100);
                        return;
                    }
                } else {
                    FT.HK.push({
                        "Act": Iz,
                        "Param": qD,
                        "CallBack": zP
                    });
                    window.setTimeout(FT.Im, 100);
                    return;
                }
            } else {
                FT.HE = true;
            }
            if (F.qJ) {
                var HS = {
                    "Act": Iz
                };
                for (var i = 0; i < qD.length; i++) {
                    HS["Param" + (i + 1)] = qD[i];
                }
                if (Iz == "isinstalled") {
                    FT.IB = true;
                    FT._AjaxBeginTime = new Date();
                }
                R.oQ(Hd, 100, null, [zP, Ey, HS]);
            } else {
                var Hy;
                switch (Iz) {
                case "isinstalled":
                    Hy = this.FV(qD[0]);
                    break;
                case "capture":
                    this.kI.Capture(qD[0]);
                    break;
                case "localupload":
                    this.kI.LocalUpload(qD[0]);
                    break;
                case "setclipboard":
                    this.kI.SetClipboard(qD[0], qD[1], qD[2]);
                    Hy = "ok";
                    break;
                case "showeq":
                    this.kI.ShowEQ(qD[0], qD[1]);
                    break;
                case "getclipboard":
                    Hy = this.kI.GetClipboard(qD[0]);
                    break;
                case "isprinterexist":
                    Hy = this.kI.IsPrinterExist();
                    break;
                case "importword":
                    this.kI.ImportWord(qD[0], qD[1]);
                    break;
                case "pasteword":
                    var bu = qD[0];
                    this.kI.PasteWord(bu);
                    break;
                case "dialogopen":
                    Hy = this.kI.DialogOpen(qD[0], qD[1], qD[2], qD[3], "", "");
                    break;
                case "importexcelsheet":
                    this.kI.ImportExcelSheet(qD[0], qD[1], qD[2]);
                    break;
                case "pasteexcel":
                    this.kI.PasteExcel(qD[0]);
                    break;
                case "getexcelworksheetname":
                    var Hy = this.kI.GetExcelWorkSheetName(qD[0]);
                    break;
                case "importppt":
                    this.kI.ImportPPT(qD[0], qD[1]);
                    break;
                case "pastefilelist":
                    this.kI.PasteFileList(qD[0]);
                    break;
                case "pasteimage":
                    this.kI.PasteImage(qD[0]);
                    break;
                case "quickformat":
                    this.kI.QuickFormat();
                    Hy = "ok";
                    break;
                case "getflashheader":
                    Hy = this.kI.GetFlashHeader(qD[0]);
                    break;
                case "mfu_fileinfo_fromto":
                    Hy = "";
                    for (var i = qD[0]; i <= qD[1]; i++) {
                        if (Hy) {
                            Hy += "\r";
                        }
                        Hy += this.kI.MFUFileInfo(i);
                    }
                    break;
                case "cancel":
                    this.kI.Cancel();
                    Hy = "ok";
                    break;
                case "remoteupload":
                    this.kI.RemoteUpload(qD[0], qD[1]);
                    break;
                case "importstatus":
                    Hy = this.kI.ImportStatus;
                    break;
                case "version":
                    Hy = this.kI.Version;
                    break;
                case "getinfo":
                    Hy = this.kI.GetInfo(qD[0], qD[1], qD[2]);
                    break;
                default:
                }
                if (typeof(Hy) == "undefined") {
                    R.oQ(Hd, 100, null, [zP, Ey]);
                } else {
                    FT.HE = false;
                    if (typeof(zP) == 'function') {
                        HD["Ret"] = Hy;
                        if (Iz != "isinstalled") {
                            HD["Error"] = FT.kI.Error;
                            HD["Style"] = FT.kI.Style;
                            HD["Body"] = FT.kI.Body;
                            HD["OriginalFiles"] = FT.kI.OriginalFiles;
                            HD["SavedFiles"] = FT.kI.SavedFiles;
                        }
                        zP(HD);
                        if (Ey) {
                            Ey({
                                "sucess": "yes"
                            });
                        } else {
                            this.Im();
                        }
                    }
                }
            }
        }
    };
})();
function exec(iA, iQ) {
    EWEB.Focus();
    ap.Save();
    iA = iA.toLowerCase();
    var kf = true;
    switch (iA) {
    case 'undo':
        ap.Go( - 1);
        kf = false;
        break;
    case 'redo':
        ap.Go(1);
        kf = false;
        break;
    case 'cut':
        kC.Execute('Cut');
        break;
    case 'copy':
        kC.Execute('Copy');
        kf = false;
        break;
    case 'paste':
        oX();
        break;
    case 'pastetext':
        ix();
        break;
    case 'pasteword':
        kF();
        break;
    case 'delete':
        format('delete');
        break;
    case 'removeformat':
        format('RemoveFormat');
        break;
    case 'selectall':
        format('selectall');
        kf = false;
        break;
    case 'unselect':
        format('unselect');
        kf = false;
        break;
    case 'findreplace':
        qu();
        kf = false;
        break;
    case 'spellcheck':
        uT();
        kf = false;
        break;
    case 'quickformat':
        if (config.AutoDoneQuickFormat) {
            aK("quickformat.htm?autodone=1", true, false, true);
        } else {
            aK("quickformat.htm", true);
        }
        kf = false;
        break;
    case 'formatbrush':
        vp.Execute();
        kf = false;
        break;
    case 'bold':
        format('bold');
        break;
    case 'italic':
        format('italic');
        break;
    case 'underline':
        format('underline');
        break;
    case 'strikethrough':
        format('StrikeThrough');
        break;
    case 'superscript':
        format('superscript');
        break;
    case 'subscript':
        format('subscript');
        break;
    case 'uppercase':
        pl('uppercase');
        break;
    case 'lowercase':
        pl('lowercase');
        break;
    case 'forecolor':
        aK('selcolor.htm?action=forecolor', true);
        kf = false;
        break;
    case 'backcolor':
        aK('selcolor.htm?action=backcolor', true);
        kf = false;
        break;
    case 'big':
        dB('big');
        break;
    case 'small':
        dB('small');
        break;
    case 'justifyleft':
        hZ.Execute('justifyleft');
        break;
    case 'justifycenter':
        hZ.Execute('justifycenter');
        break;
    case 'justifyright':
        hZ.Execute('justifyright');
        break;
    case 'justifyfull':
        hZ.Execute('justifyfull');
        break;
    case 'orderedlist':
        format('insertorderedlist');
        break;
    case 'unorderedlist':
        format('insertunorderedlist');
        break;
    case 'indent':
        format('indent');
        break;
    case 'outdent':
        format('outdent');
        break;
    case 'br':
        dB('br');
        break;
    case 'paragraph':
        format('InsertParagraph');
        break;
    case 'paragraphattr':
        tM();
        kf = false;
        break;
    case 'image':
        aK('img.htm', true);
        kf = false;
        break;
    case 'flash':
        aK('flash.htm', true);
        kf = false;
        break;
    case 'media':
        aK('media.htm', true);
        kf = false;
        break;
    case 'file':
        aK('file.htm', true);
        kf = false;
        break;
    case 'remoteupload':
        remoteUpload();
        kf = false;
        break;
    case 'localupload':
        localUpload();
        kf = false;
        break;
    case 'fieldset':
        aK('fieldset.htm', true);
        kf = false;
        break;
    case 'iframe':
        aK('iframe.htm', true);
        kf = false;
        break;
    case 'horizontalrule':
        aK('hr.htm', true);
        kf = false;
        break;
    case 'marquee':
        aK('marquee.htm', true);
        kf = false;
        break;
    case 'createlink':
        uB();
        kf = false;
        break;
    case 'unlink':
        format('UnLink');
        break;
    case 'map':
        tQ();
        kf = false;
        break;
    case 'anchor':
        aK('anchor.htm', true);
        kf = false;
        break;
    case 'galleryimage':
        aK('browse.htm?type=image', true);
        kf = false;
        break;
    case 'galleryflash':
        aK('browse.htm?type=flash', true);
        kf = false;
        break;
    case 'gallerymedia':
        aK('browse.htm?type=media', true);
        kf = false;
        break;
    case 'galleryfile':
        aK('browse.htm?type=file', true);
        kf = false;
        break;
    case 'bgcolor':
        aK('selcolor.htm?action=bgcolor', true);
        kf = false;
        break;
    case 'backimage':
        aK('backimage.htm', true);
        kf = false;
        break;
    case 'absoluteposition':
        uD();
        break;
    case 'zindexbackward':
        pe('backward');
        break;
    case 'zindexforward':
        pe('forward');
        break;
    case 'showborders':
        kh.Execute();
        kf = false;
        break;
    case 'showblocks':
        jK.Execute();
        kf = false;
        break;
    case 'quote':
        dB('quote');
        break;
    case 'code':
        dB('code');
        break;
    case 'symbol':
        aK('symbol.htm', true);
        kf = false;
        break;
    case 'printbreak':
        dB('printbreak');
        break;
    case 'excel':
        aK('owcexcel.htm', true, true);
        kf = false;
        break;
    case 'emot':
        aK('emot.htm', true);
        kf = false;
        break;
    case 'eq':
        return;
        aK('eq.htm', true);
        kf = false;
        break;
    case 'art':
        if (F.eo) {
            alert("Don't support IE11+.");
        } else {
            aK('art.htm', true, true);
        }
        kf = false;
        break;
    case 'nowdate':
        dB('nowdate');
        break;
    case 'nowtime':
        dB('nowtime');
        break;
    case 'importword':
        ow('word');
        kf = false;
        break;
    case 'importexcel':
        ow('excel');
        kf = false;
        break;
    case 'importppt':
        ow('ppt');
        kf = false;
        break;
    case 'template':
        aK('template.htm', true);
        kf = false;
        break;
    case 'capture':
        ue();
        kf = false;
        break;
    case 'pagination':
        aK('pagination.htm', true);
        kf = false;
        break;
    case 'paginationinsert':
        dp.fv();
        break;
    case 'titleimage':
        CF();
        kf = false;
        break;
    case 'imagedoc':
        Bw();
        kf = false;
        break;
    case 'formtext':
        eO.fv('inputtext');
        break;
    case 'formtextarea':
        eO.fv('textarea');
        break;
    case 'formradio':
        eO.fv('radio');
        break;
    case 'formcheckbox':
        eO.fv('checkbox');
        break;
    case 'formdropdown':
        eO.fv('select');
        break;
    case 'formbutton':
        eO.fv('button');
        break;
    case 'tableinsert':
        bI.TableInsert();
        kf = false;
        break;
    case 'tableprop':
        bI.TableProp();
        kf = false;
        break;
    case 'tablecellprop':
        bI.tK();
        kf = false;
        break;
    case 'tablecellsplit':
        bI.uC();
        kf = false;
        break;
    case 'tablerowprop':
        bI.sT();
        kf = false;
        break;
    case 'tablerowinsertabove':
        bI.qt();
        break;
    case 'tablerowinsertbelow':
        bI.sR();
        break;
    case 'tablerowmerge':
        bI.rv();
        break;
    case 'tablerowsplit':
        bI.pI(2);
        break;
    case 'tablerowdelete':
        bI.qa();
        break;
    case 'tablecolinsertleft':
        bI.sf();
        break;
    case 'tablecolinsertright':
        bI.sK();
        break;
    case 'tablecolmerge':
        bI.sq();
        break;
    case 'tablecolsplit':
        bI.qY(2);
        break;
    case 'tablecoldelete':
        bI.rX();
        break;
    case 'refresh':
        setHTML('');
        kf = false;
        break;
    case 'modecode':
        setMode('CODE');
        kf = false;
        break;
    case 'modeedit':
        setMode('EDIT');
        kf = false;
        break;
    case 'modetext':
        setMode('TEXT');
        kf = false;
        break;
    case 'modeview':
        setMode('VIEW');
        kf = false;
        break;
    case 'sizeplus':
        ej(300);
        kf = false;
        break;
    case 'sizeminus':
        ej( - 300);
        kf = false;
        break;
    case 'print':
        tp();
        kf = false;
        break;
    case 'maximize':
        kQ.Execute();
        kf = false;
        break;
    case 'minimize':
        parent.Minimize();
        kf = false;
        break;
    case 'expandtoolbar':
        ci.CY();
        kf = false;
        break;
    case 'help':
        aK('help.htm');
        kf = false;
        break;
    case 'about':
        aK('about.htm');
        kf = false;
        break;
    case 'site':
        window.open('http://www.ewebeditor.net');
        kf = false;
        break;
    case 'fontface':
        fq('face', iQ);
        break;
    case 'fontsize':
        fq('size', iQ);
        break;
    case 'formatblock':
        format('FormatBlock', iQ);
        break;
    case 'zoom':
        cY.Execute(iQ);
        kf = false;
        break;
    case "mathfloweq":
        Ht();
        kf = false;
        break;
    case "takepic":  //拍照
        aK('camera.htm', true);
        break;
    case "addmetial":
        aK('insert_materiel.htm', true);
        break;
    case "addsubmodule":
        parent.parent.addsubmodule = window;
        aK('add_sub_module.htm', true);
        break;
    case "inserttemperature":
        //插入摄氏度
        insertHTML("&nbsp;<sup>o</sup>C&nbsp;");
        break;
    }
    if (kf) {
        ap.jO();
        ap.Save();
    }
};

var EWEB = {
    T: null,
    aR: null,
    ae: null,
    bs: null,
    BaseHref: "",
    cd: "",
    hW: "",
    SendUrl: "",
    ReadyState: "",
    Focus: function() {
        if (EWEB.ae == "CODE" || EWEB.ae == "TEXT") {
            EWEB.db.focus();
            return;
        }
        C.Restore();
        if (F.as) {
            if (config.FixWidth) {
                if (document.activeElement.id != "eWebEditor") {
                    eWebEditor.focus();
                }
                try {
                    var aD = EWEB.T.selection.createRange();
                    if (aD.parentElement().tagName == "BODY") {
                        aD.moveToElementText(EWEB.T.getElementById("eWebEditor_FixWidth_DIV"));
                        aD.collapse(true);
                        aD.select();
                    } else {
                        aD.select();
                    }
                } catch(e) {}
            } else {
                eWebEditor.focus();
            }
        } else {
            var s = this.aR.getSelection();
            var dK = config.FixWidth ? EWEB.T.getElementById("eWebEditor_FixWidth_DIV") : EWEB.T.body;
            if (s.rangeCount < 1) {
                var r = this.T.createRange();
                r.selectNodeContents(dK);
                r.collapse(true);
                s.addRange(r);
            }
            this.aR.focus();
            this.T.body.focus();
            if (config.FixWidth) {
                dK.focus();
            }
        }
    },
    Init: function() {
        if (!config.L) {
            return;
        }
        if (!F.iF) {
            return;
        }
        this.hW = aA.Proto + "://" + aA.H + (aA.Hw ? ":" + aA.Hw: "");
        var s = document.location.pathname;
        this.cd = s.substr(0, s.length - 15);
        this.BaseHref = "";
        if (config.BaseHref != "") {
            this.BaseHref = "<base href='" + this.hW + config.BaseHref + "'></base>";
        }
        if (aA.ExtCSS) {
            this.ExtCSS = "<link href='" + uN(aA.ExtCSS) + "?v=3' type='text/css' rel='stylesheet'>";
        } else {
            this.ExtCSS = "";
        }
        if (aA.Skin) {
            config.Skin = aA.Skin;
        }
        if (aA.FixWidth) {
            config.FixWidth = aA.FixWidth;
        }
        if (aA.AreaCssMode) {
            config.AreaCssMode = aA.AreaCssMode;
        }
        if (aA.TitleImage) {
            config.TitleImage = aA.TitleImage;
        }
        if (aA.ReadOnly) {
            config.InitMode = "VIEW";
        }
        this.SendUrl = this.hW + this.cd + "/" + config.ServerExt + "/upload." + config.ServerExt + "?style=" + aA.StyleName + "&cusdir=" + aA.CusDir + "&sparams=" + config.SParams + "&skey=" + aA.SKey + "&h=" + aA.H;
        
        R.az(document, 'contextmenu', jt);
        R.az(document, 'dragstart', jt);
        R.az(document, 'selectstart', jt);
        R.az(document, 'select', jt);
        if (F.Ei) {
            window.onresize = function(e) {
                Dj();
            };
        }
    }
};
function focus() {
    EWEB.Focus();
};
function setReadOnly(dF) {
    if (dF != "1" && dF != "2") {
        dF = "";
    }
    EWEB.ReadOnly = EWEB.ReadOnly || "";
    if (EWEB.ReadOnly == dF) {
        return;
    }
    var hI = $("eWebEditor_SB");
    var mF = $("eWebEditor_SB_Mode");
    if (hI) {
        switch (dF) {
        case "1":
            hI.style.display = "";
            mF.style.display = "none";
            break;
        case "2":
            hI.style.display = "none";
            break;
        default:
            hI.style.display = "";
            mF.style.display = "";
        }
    }
    EWEB.ReadOnly = dF;
    if (EWEB.ReadyState == "complete") {
        if (dF == "") {
            setMode("EDIT");
        } else {
            setMode("VIEW");
        }
    }
};
EWEB.lo = function() {
    var J = this.T;
    var defCon, expUpdate, body, jQuery = window.parent.parent.$;
    if (F.as || F.eo) {
        if (config.FixWidth) {
            J.body.contentEditable = false;
            var cR = J.getElementById("eWebEditor_FixWidth_DIV");
            cR.contentEditable = true;
        } else {
            J.body.contentEditable = true;
        }
        defCon = J.body.innerHTML,
        J.execCommand("2D-Position", true, true);
        body = J.body;
        body.onfocus = bodyFocus;
        body.onclick = bodyFocus;
    } else {
        try {
            var dK = J.body;
            if ('contentEditable' in dK) {
                dK.contentEditable = true;
            }
            if ('spellcheck' in dK) {
                dK.spellcheck = false;
            }
            dK.onfocus = bodyFocus;
            dK.onclick = bodyFocus;
            J.execCommand("styleWithCSS", false, "true");
            J.execCommand("enableInlineTableEditing", false, "false");
            if (config.EnterMode == "2") {
                J.execCommand("insertBrOnReturn", false, "true");
            }
            if (config.FixWidth) {
                dK.contentEditable = false;
                var cR = J.getElementById("eWebEditor_FixWidth_DIV");
                cR.contentEditable = true;
            }
            defCon = dK.innerHTML;
            body = dK;
        } catch(e) {}
    }
    console.log(body);
    if(body.attachEvent){
        body.attachEvent('oninput', function(){
            if(defCon != body.innerHTML){
                expUpdate = true;
            }else{
                expUpdate = false;
            }
            window.parent.parent.expUpdate = expUpdate;
            console.log('expUpdate');
        });
        body.attachEvent('onpropertychange', function(){
            if(defCon != body.innerHTML){
                expUpdate = true;
            }else{
                expUpdate = false;
            }
            window.parent.parent.expUpdate = expUpdate;
            console.log('expUpdate');
        });
    }else{
        body.addEventListener('input', function(){
            if(defCon != body.innerHTML){
                expUpdate = true;
            }else{
                expUpdate = false;
            }
            window.parent.parent.expUpdate = expUpdate;
            console.log('expUpdate');
        });
        body.addEventListener('propertychange', function(){
            if(defCon != body.innerHTML){
                expUpdate = true;
            }else{
                expUpdate = false;
            }
            window.parent.parent.expUpdate = expUpdate;
            console.log('expUpdate');
        });
        jQuery(body).on('keyup', function(){
            if(defCon != body.innerHTML){
                expUpdate = true;
            }else{
                expUpdate = false;
            }
            window.parent.parent.expUpdate = expUpdate;
            console.log('expUpdate');
        });
    }
};
//修改源码  隐藏工具栏功能
function bodyFocus(){
    var jQuery = window.parent.parent.$;
    window.parent.window.$('body').trigger('click');
    //document.body.scrollTop = 0;
    document.getElementById('eWebEditor_Toolbar').style.display = 'table';
    jQuery('.editor_iframe').removeAttr('style');
}
function jt(e) {
    if (EWEB.ae == "EDIT" || EWEB.ae == "VIEW") {
        return R.aw(e);
    }
};
function Dj() {
    if (!F.Ei || !EWEB.ae) {
        return;
    }
    var xv = document.getElementById('eWebEditor');
    if (xv) {
        var be = xv.parentNode;
        if (be.clientWidth > 0) {
            var He = R.eF(window);
            var GM = He.Width - BW(R.ce(document.body, "padding-left")) - BW(R.ce(document.body, "padding-right")) - BW(R.ce(document.body, "border-left-width")) - BW(R.ce(document.body, "border-right-width"));
            var Ip = He.Height - BW(R.ce(document.body, "padding-top")) - BW(R.ce(document.body, "padding-bottom")) - BW(R.ce(document.body, "border-top-width")) - BW(R.ce(document.body, "border-bottom-width"));
            var It = $("eWebEditor_Layout");
            It.style.width = GM + "px";
            It.style.height = Ip + "px";
            var GO = $("eWebEditor_Toolbar").offsetHeight;
            var IC = 0;
            if (config.StateFlag) {
                IC = $("eWebEditor_SB").offsetHeight;
            }
            var HC = Ip - GO - IC;
            var Ks = GM - BW(R.ce(be, "padding-left")) - BW(R.ce(be, "padding-right")) - BW(R.ce(be, "border-left-width")) - BW(R.ce(be, "border-right-width"));
            var Hf = HC - BW(R.ce(be, "padding-top")) - BW(R.ce(be, "padding-bottom")) - BW(R.ce(be, "border-top-width")) - BW(R.ce(be, "border-bottom-width"));
            be.style.height = Hf + "px";
            if (EWEB.ae == "EDIT" || EWEB.ae == "VIEW") {
                var Ee = BW(R.ce(xv, "border-top-width"));
                var EF = BW(R.ce(xv, "border-bottom-width"));
                var Dv = BW(R.ce(xv, "border-left-width"));
                var EG = BW(R.ce(xv, "border-right-width"));
                xv.style.width = (Ks - Dv - EG) + 'px';
                //xv.style.height = (Hf - Ee - EF) + 'px';
                xv.style.height = '100%'; //修改高度
                DN();
            } else {
                var Hb = (Ip) - (GO + IC + be.offsetHeight);
                if (Hb != 0) {
                    be.style.height = (Hf + Hb) + "px";
                }
            }
            window.scrollTo(0, 0);
            return;
        }
    }
    window.setTimeout(Dj, 10);
};
function DN() {
    var xv = $('eWebEditor');
    if (config.FixWidth) {
        if (F.Ei) {
            var J = xv.contentWindow.document;
            var dK = J.body;
            var cR = J.getElementById("eWebEditor_FixWidth_DIV");
            if (!cR) {
                return;
            }
            var DI = BW(R.ce(dK, "padding-top"));
            var DE = BW(R.ce(dK, "padding-bottom"));
            var DA = BW(R.ce(cR, "border-top-width"));
            var EL = BW(R.ce(cR, "border-bottom-width"));
            var En = BW(R.ce(cR, "padding-top"));
            var EC = BW(R.ce(cR, "padding-bottom"));
            cR.style.minHeight = (xv.clientHeight - DI - DE - DA - EL - En - EC) + "px";
        }
    } else {
        if (F.Ei && F.as) {
            var dK = xv.contentWindow.document.body;
            var DI = BW(R.ce(dK, "padding-top"));
            var DE = BW(R.ce(dK, "padding-bottom"));
            dK.style.minHeight = (xv.clientHeight - DI - DE) + "px";
        }
    }
};
var config = new Object();
window.onload = ts;
function ts() {
    if (parent == window) {
        return;
    }
    if (!config.L) {
        return;
    }
    if (EWEB.ReadyState) {
        return;
    }
    EWEB.ReadyState = "loading";
    if (!F.Bx) {
        if (config.AutoDetectPaste == "1") {
            config.AutoDetectPaste = "0";
        }
        config.MFUEnable = "0";
    }
    R.lE(window);
    if (!F.iF) {
        return;
    }
    EWEB.bs = parent.document.getElementsByName(aA.bs)[0];
    if (!EWEB.bs) {
        EWEB.bs = parent.document.getElementById(aA.bs);
    }
    if (!EWEB.bs) {
        alert('[EWEBEDITOR] The element with id or name "' + aA.bs + '" was not found.');
        return;
    }
    if (EWEB.bs.tagName == "TEXTAREA" || EWEB.bs.tagName.substring(0, 5) == "INPUT") {
        EWEB.hq = "INPUT";
    } else {
        EWEB.hq = "OTHER";
    }
    if (F.Ei) {
        Dj();
    }
    ci.vF();
    R.ko(document.body);
    if (F.as) {} else {
        $("eWebEditorTextarea").style.MozUserSelect = "text";
    }
    EWEB.aR = $("eWebEditor").contentWindow;
    EWEB.T = EWEB.aR.document;
    EWEB.db = $("eWebEditorTextarea");
    if (!F.iF) {
        config.InitMode = "TEXT";
    }
    if ($("D_ContentFlag").value == "0") {
        var qW = (EWEB.hq == "INPUT") ? EWEB.bs.value: EWEB.bs.innerHTML;
        $("D_ContentEdit").value = qW;
        $("D_ContentLoad").value = qW;
        $("D_CurrMode").value = config.InitMode;
        $("D_ContentFlag").value = "1";
    }
    setReadOnly(aA.ReadOnly);
    setMode($("D_CurrMode").value, true);
    tU();
    if (aA.rD) {
        window.setInterval(qG, 1000);
    }
    if (F.as) {
        lT();
    } else {
        window.setTimeout(lT, 200);
    }
};
function lT() {
    EWEB.ReadyState = "complete";
    sk({
        flag: "LoadComplete"
    });
};
function sk(fC) {
    fC.id = aA.vs;
    fC.linkid = aA.bs;
    fC.win = window;
    fC.doc = EWEB.T;
    try {
        parent.EWEBEDITOR.EVENT(fC);
    } catch(e) {}
    var jE;
    try {
        jE = parent.EWEBEDITOR_EVENT(fC);
    } catch(e) {}
    return (jE && typeof(jE) == "object") ? jE: {};
};
function tU() {
    if (aA.Ik == "0") {
        return;
    }
    if (!EWEB.bs) {
        return;
    }
    if (EWEB.hq != "INPUT") {
        return;
    }
    var aO = EWEB.bs.form;
    if (!aO) {
        return;
    }
    R.az(aO, 'submit', ie);
    if (!aO.submitEditor) {
        aO.submitEditor = new Array();
    }
    aO.submitEditor[aO.submitEditor.length] = ie;
    if (!aO.originalSubmit) {
        aO.originalSubmit = aO.submit;
        aO.submit = function() {
            if (this.submitEditor) {
                for (var i = 0; i < this.submitEditor.length; i++) {
                    try {
                        this.submitEditor[i]();
                    } catch(e) {}
                }
            }
            this.originalSubmit();
        };
    }
    R.az(aO, 'reset', iT);
    if (!aO.resetEditor) aO.resetEditor = new Array();
    aO.resetEditor[aO.resetEditor.length] = iT;
    if (!aO.originalReset) {
        aO.originalReset = aO.reset;
        aO.reset = function() {
            if (this.resetEditor) {
                for (var i = 0; i < this.resetEditor.length; i++) {
                    try {
                        this.resetEditor[i]();
                    } catch(e) {}
                }
            }
            this.originalReset();
        };
    }
};
function ie() {
    var aO = EWEB.bs.form;
    if (!aO) {
        return;
    }
    var V = getHTML();
    if (config.PaginationMode != "0" && config.PaginationAutoFlag != "0") {
        if (EWEB.ae != "EDIT") {
            setMode("EDIT");
        }
        var b = true;
        if (config.PaginationAutoFlag == "1") {
            var K = EWEB.T.getElementsByTagName("IMG");
            for (var i = 0; i < K.length; i++) {
                var cb = K[i].getAttribute("_ewebeditor_fake_tag", 2);
                if (cb) {
                    if (cb.toLowerCase() == "pagination") {
                        b = false;
                        break;
                    }
                }
            }
        }
        if (b) {
            dp.Auto(config.PaginationAutoNum);
            V = getHTML();
        }
    }
    $("D_ContentEdit").value = V;
    pb(EWEB.bs, V);
};
function iT() {
    setHTML($("D_ContentLoad").value);
};
function uO() {
    if (EWEB.hq != "INPUT") {
        return;
    }
    var aO = EWEB.bs.form;
    if (!aO) {
        return;
    }
    if (aO.onsubmit) {
        if (aO.onsubmit()) {
            aO.submit();
        }
    } else {
        aO.submit();
    }
};
function nM(e) {
    aK('about.htm');
    return R.aw(e);
};
function vd(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    if (F.EY) {
        return R.aw(e);
    } else {
        if (config.AutoDetectPaste == "0") {
            return true;
        } else {
            return R.aw(e);
        }
    }
};
function sU(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    var bK = e.keyCode || e.which;
    var bA = String.fromCharCode(bK).toUpperCase();
    if (e.ctrlKey || ((bK >= 33) && (bK <= 40)) || (bK == 13) || (bK == 8) || (bK == 46)) {
        ci.eW();
    }
    return true;
};
function sZ(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    var bK = e.keyCode || e.which;
    var bA = String.fromCharCode(bK).toUpperCase();
    var bo = false;
    if (bK == 112 && !F.as) {
        exec("about");
        bo = true;
    } else if (bK == 113) {
        exec("showborders");
        bo = true;
    } else if (bK == 114) {
        exec("showblocks");
        bo = true;
    }
    if (!bo && e.ctrlKey) {
        if (bK == 13) {
            uO();
            bo = true;
        } else if (bK == 187 || bK == 107) {
            exec("sizeplus");
            bo = true;
        } else if (bK == 189 || bK == 109) {
            exec("sizeminus");
            bo = true;
        } else if (bA == "1") {
            exec("modecode");
            bo = true;
        } else if (bA == "2") {
            exec("modeedit");
            bo = true;
        } else if (bA == "3") {
            exec("modetext");
            bo = true;
        } else if (bA == "4") {
            exec("modeview");
            bo = true;
        } else if (bA == "A") {
            exec("selectall");
            bo = true;
        } else if (bA == "R") {
            exec("findreplace");
            bo = true;
        } else if (bA == "Z") {
            exec("undo");
            bo = true;
        } else if (bA == "Y") {
            exec("redo");
            bo = true;
        }
    }
    if (!bo && F.as && (bK == 8) && (C.ai() == "Control")) {
        C.Delete();
        bo = true;
    }
    if (!bo && C.ai() == "Text") {
        if (! (e.ctrlKey && bA != "D" && bA != "V") && !e.metaKey && !e.shiftKey && !e.altKey) {
            var Ep = C.cI();
            if (Ep.className == "ewebeditor_template") {
                Ep.className = "";
            }
        }
    }
    if (!bo && e.ctrlKey) {
        if (bA == "D") {
            exec("pasteword");
            bo = true;
        } else if (bA == "V") {
            if (config.AutoDetectPaste != "0" || F.EY) {
                window.setTimeout("exec('paste')", 10);
                bo = true;
            }
        }
    }
    if (!bo) {
        if ((bK == 13) || (bK == 8) || (bK == 46)) {
            ap.Save();
            ap.jO();
        } else if ((bK >= 33) && (bK <= 40)) {
            ap.Save();
        } else if (! ((e.ctrlKey && bA == "A") || (e.ctrlKey && bA == "F"))) {
            ap.jO();
        }
    }
    if ((config.EnterMode == "2") && (bK == 13) && F.as) {
        var aD = EWEB.T.selection.createRange();
        if (e.shiftKey) {
            var p = aD.parentElement();
            if (p.tagName != "P" || p.innerHTML == "") {
                aD.pasteHTML("&nbsp;");
                aD.select();
                aD.collapse(false);
            }
            try {
                aD.pasteHTML("</P><P id=eWebEditor_Temp_P>");
            } catch(err) {
                return false;
            }
            e.cancelBubble = true;
            e.returnValue = false;
            var el = EWEB.T.getElementById("eWebEditor_Temp_P");
            if (el.innerHTML == "") {
                el.innerHTML = "&nbsp;";
            }
            aD.moveToElementText(el);
            aD.select();
            aD.collapse(false);
            aD.select();
            el.removeAttribute("id");
        } else {
            try {
                aD.pasteHTML("<br>");
            } catch(err) {
                return false;
            }
            e.cancelBubble = true;
            e.returnValue = false;
            aD.select();
            aD.moveEnd("character", 1);
            aD.moveStart("character", 1);
            aD.collapse(false);
        }
        bo = true;
    }
    if (bo) {
        return R.aw(e);
    } else {
        return true;
    }
};
function rU(e) {
    if (!e) {
        e = window.event;
    }
    if ((!F.as) && (!F.eo)) {
        var el = e.srcElement || e.target;
        if (el.tagName == "IMG") {
            if (F.Iq) {
                R.oQ(C.vR, 200, C, [el]);
            } else {
                C.vR(el);
            }
        }
    }
};
function rV(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    cW.MU2(e);
    if (e.button != 2) {
        vp.Di();
    }
    ap.Save();
    ci.eW();
};
function sr(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    cW.MM(e);
};
function DF(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    var el = e.srcElement || e.target;
    if (F.eo) {
        var Ha = EWEB.T.getElementsByTagName("HTML")[0];
        if (Ha == el) {
            EWEB.T.body.focus();
            return;
        }
    }
    if (el.className == "ewebeditor_template") {
        if (F.as) {
            var oRange = EWEB.T.body.createTextRange();
            oRange.moveToElementText(el);
            oRange.select();
        } else {
            var oRange = EWEB.T.createRange();
            oRange.selectNodeContents(el);
            var af = C.bG();
            af.removeAllRanges();
            af.addRange(oRange);
        }
    }
};
function HJ(e) {
    if (!e) {
        e = eWebEditor.event;
    }
    var el = e.srcElement || e.target;
    if (el.tagName == "IMG") {
        if (el.getAttribute("_tag", 2) == "math") {
            exec("mathfloweq");
        } else {
            var da = el.getAttribute("_ewebeditor_fake_tag", 2);
            if (!da) {
                exec("image");
            } else if (da == "flash") {
                exec("flash");
            } else if (da == "mediaplayer6" || da == "mediaplayer7" || da == "realplayer" || da == "quicktime" || da == "flv" || da == "vlc") {
                exec("media");
            }
        }
    }
};
function CE(e) {
    if (vp.Es()) {
        vp.Stop();
    } else {
        am.rw(e);
    }
    R.aw(e);
    return false;
};
function va() {
    ap.Save();
    return true;
};
function uN(aG) {
    if (aG.indexOf("://") >= 0) {
        return aG;
    }
    if (aG.substr(0, 1) == "/") {
        return aG;
    }
    var gx = EWEB.cd;
    while (aG.substr(0, 3) == "../") {
        aG = aG.substr(3);
        gx = gx.substring(0, gx.lastIndexOf("/"));
    }
    return gx + "/" + aG;
};
function insertHTML(V) {
    if (ps()) {
        return;
    }
    switch (EWEB.ae) {
    case "EDIT":
        C.Restore();
        EWEB.Focus();
        V = aE.jY(V);
        if (!window.getSelection) {
            if (EWEB.T.selection.type.toLowerCase() == "control") {
                EWEB.T.selection.clear();
            }
            V = '<span id="__ewebeditor_temp_remove__" style="display:none;">eWebEditor</span>' + V;
            EWEB.T.selection.createRange().pasteHTML(V);
            EWEB.T.getElementById('__ewebeditor_temp_remove__').removeNode(true);
        } else {
            var mW = EWEB.T.createDocumentFragment();
            var lc = EWEB.T.createElement('div');
            lc.innerHTML = V;
            var mz, Ew;
            while ((mz = lc.firstChild)) {
                Ew = mW.appendChild(lc.removeChild(mz));
            }
            var Bd = EWEB.aR.getSelection();
            var fA = Bd.getRangeAt(0);
            fA.deleteContents();
            fA.insertNode(mW);
            if (Ew) {
                fA = fA.cloneRange();
                fA.setStartAfter(Ew);
                fA.collapse(true);
                Bd.removeAllRanges();
                Bd.addRange(fA);
            }
        }
        ci.eW();
        break;
    case "TEXT":
    case "CODE":
        var wa = EWEB.db;
        wa.focus();
        if (document.selection) {
            var nr = document.selection.createRange();
            nr.text = V;
            nr.select();
        } else if (wa.selectionStart || wa.selectionStart == '0') {
            var CX = wa.selectionStart;
            var Ev = wa.selectionEnd;
            var ED = wa.scrollTop;
            wa.value = wa.value.substring(0, CX) + V + wa.value.substring(Ev, wa.value.length);
            if (ED > 0) {
                wa.scrollTop = ED;
            }
            wa.selectionStart = CX + V.length;
            wa.selectionEnd = CX + V.length;
        } else {
            wa.value += V;
        }
        break;
    }
};
function setHTML(V, ub) {
    var time = setInterval(function(){
        if(document.getElementById("D_ContentEdit")){
            document.getElementById("D_ContentEdit").value = V;
            switch (EWEB.ae) {
            case "CODE":
                EWEB.db.value = V;
                break;
            case "TEXT":
                V = GS(V);
                EWEB.db.value = V;
                break;
            case "EDIT":
                if (F.IA && V == "") {
                    V = "<p></p>";
                }
                EWEB.T.open('text/html', 'replace');
                EWEB.T.write(pG(aE.jY(V)));
                EWEB.T.close();
                EWEB.lo();
                R.az(EWEB.T.body, 'paste', vd);
                R.az(EWEB.T, 'help', nM);
                R.az(EWEB.T.body, 'dragend', va);
                R.az(EWEB.T, 'keydown', sZ);
                R.az(EWEB.T, 'keyup', sU);
                R.az(EWEB.T, 'contextmenu', CE);
                R.az(EWEB.T, 'mousedown', rU);
                R.az(EWEB.T, 'mouseup', rV);
                R.az(EWEB.T, 'mousemove', sr);
                R.az(EWEB.T, 'click', DF);
                R.az(EWEB.T, 'dblclick', HJ);
                if (F.EY) {
                    if (config.FixWidth) {
                        R.az(EWEB.T.getElementById("eWebEditor_FixWidth_DIV"), 'beforedeactivate',
                        function() {
                            C.Save();
                        });
                    } else {
                        R.az(EWEB.T, 'beforedeactivate',
                        function() {
                            C.Save();
                        });
                    }
                }
                DN();
                break;
            case "VIEW":
                EWEB.T.open('text/html', 'replace');
                EWEB.T.write(pG(V));
                EWEB.T.close();
                R.az(EWEB.T, 'help', nM);
                R.az(EWEB.T, 'contextmenu', R.aw);
                break;
            }
            if (!ub && (EWEB.ae == "EDIT")) {
                ap.jO();
                ap.Save();
            }
            clearInterval(time);
        }
    }, 300);
};
function getHTML() {
    var Cx = function(s) {
        var kU = s.replace(/\s+/gi, "");
        kU = kU.toLowerCase();
        if ((kU == "<p>&nbsp;</p>") || (kU == "<p></p>") || (kU == "<br>") || (kU == "<p><br></p>")) {
            return "";
        }
        return s;
    };
    var V;
    switch (EWEB.ae) {
    case "CODE":
        V = EWEB.db.value;
        break;
    case "EDIT":
        dp.wj();
        if (config.FixWidth) {
            V = EWEB.T.getElementById("eWebEditor_FixWidth_DIV").innerHTML;
        } else {
            V = EWEB.T.body.innerHTML;
        }
        V = aE.wV(V);
        V = Cx(V);
        break;
    case "VIEW":
        V = $("D_ContentEdit").value;
        V = Cx(V);
        break;
    case "TEXT":
        V = EWEB.db.value;
        V = FM(V);
        break;
    default:
        V = $("D_ContentEdit").value;
        V = Cx(V);
        break;
    }
    V = vy.vi(V);
    return V;
};
function appendHTML(V) {
    if (ps()) {
        return;
    }
    switch (EWEB.ae) {
    case "EDIT":
        V = aE.jY(V);
        var dK;
        if (config.FixWidth) {
            dK = EWEB.T.getElementById("eWebEditor_FixWidth_DIV");
        } else {
            dK = EWEB.T.body;
        }
        dK.innerHTML += V;
        break;
    case "CODE":
    case "TEXT":
        EWEB.db.value += V;
        break;
    }
};
function openUploadDialog(v, dF, pw, pN, qK, hA) {
    var cT;
    if (typeof(v) == "string") {
        cT = v;
    } else {
        cT = v.type ? v.type: 'image';
        dF = v.mode ? v.mode: '2';
        pw = v.savepathfilename ? v.savepathfilename: '';
        pN = v.savefilename ? v.savefilename: '';
        qK = v.originalfilename ? v.originalfilename: '';
        hA = v.returnflag ? v.returnflag: '';
    }
    var aG = 'i_upload.htm?type=' + cT + '&mode=' + dF + '&savepathfilename=' + pw + '&savefilename=' + pN + '&originalfilename=' + qK;
    if (hA) {
        aG += '&returnflag=' + hA;
    }
    ec.OpenDialog(aG);
};
function Remove() {
    if (aA.Ik == "0") {
        return;
    }
    if (EWEB.hq == "INPUT") {
        var aO = EWEB.bs.form;
        if (aO) {
            R.hf(aO, 'submit', ie);
            R.hf(aO, 'reset', iT);
        }
    }
};
function ed() {
    if (EWEB.ae == "EDIT") {
        return true;
    }
    alert(lang["MsgOnlyInEditMode"]);
    return false;
};
function ps() {
    if (EWEB.ae == "VIEW") {
        alert(lang["MsgCanotSetInViewMode"]);
        return true;
    }
    return false;
};
function hH() {
    if (F.as || F.eo) {
        return true;
    }
    alert(lang["MsgOnlyForIE"]);
    return false;
};
function HB() {
    if (F.Bx) {
        return true;
    }
    alert(lang["MsgOnlyForWindow"]);
    return false;
};
function format(aN, fN) {
    if (!ed()) {
        return;
    }
    EWEB.Focus();
    if ((aN == "unselect") && (!F.as)) {
        C.Collapse(true);
    } else if ((aN == "selectall") && (config.FixWidth)) {
        pk();
    } else {
        EWEB.T.execCommand(aN, false, fN);
    }
    C.Release();
    EWEB.Focus();
    ci.eW();
};
function pk() {
    var Bs = EWEB.T.getElementById("eWebEditor_FixWidth_DIV");
    if (F.as) {
        var r = EWEB.T.body.createTextRange();
        r.moveToElementText(Bs);
        r.select();
    } else {
        var r = EWEB.T.createRange();
        r.selectNodeContents(Bs);
        var s = C.bG();
        s.removeAllRanges();
        s.addRange(r);
    }
};
function nq(s) {
    var r;
    switch (s + "") {
    case "1":
        r = "8pt";
        break;
    case "2":
        r = "10pt";
        break;
    case "3":
        r = "12pt";
        break;
    case "4":
        r = "14pt";
        break;
    case "5":
        r = "18pt";
        break;
    case "6":
        r = "24pt";
        break;
    case "7":
        r = "36pt";
        break;
    default:
        r = "";
        break;
    }
    return r;
};
function setMode(dA, ud) {
    if (dA == EWEB.ae) {
        return;
    }
    if (dA == "TEXT") {
        if (EWEB.ae == $("D_CurrMode").value) {
            if (!confirm(lang["MsgHtmlToText"])) {
                return;
            }
        }
    }
    try {
        $("eWebEditor_CODE").className = "SB_Mode_BtnOff";
    } catch(e) {}
    try {
        $("eWebEditor_EDIT").className = "SB_Mode_BtnOff";
    } catch(e) {}
    try {
        $("eWebEditor_TEXT").className = "SB_Mode_BtnOff";
    } catch(e) {}
    try {
        $("eWebEditor_VIEW").className = "SB_Mode_BtnOff";
    } catch(e) {}
    try {
        $("eWebEditor_" + dA).className = "SB_Mode_BtnOn";
    } catch(e) {}
    var ja = $("eWebEditor_ToolarTREdit");
    var hQ = $("eWebEditor_ToolarTRText");
    var EN = $("eWebEditor_ToolarTRView");
    if (EWEB.ReadOnly) {
        ja.style.display = "none";
        hQ.style.display = "none";
        EN.style.display = "none";
    } else {
        if (dA == "EDIT") {
            ja.style.display = "";
            hQ.style.display = "none";
            EN.style.display = "none";
        } else {
            ja.style.display = "none";
            if (config.TB2Flag == "1") {
                if (dA == "VIEW") {
                    hQ.style.display = "none";
                    EN.style.display = "";
                } else {
                    hQ.style.display = "";
                    EN.style.display = "none";
                }
            } else {
                hQ.style.display = "none";
                EN.style.display = "none";
            }
        }
    }
    var V = getHTML();
    if (dA == "EDIT" || dA == "VIEW") {
        $("eWebEditor").style.display = "";
        $("eWebEditorTextarea").style.display = "none";
    } else {
        $("eWebEditor").style.display = "none";
        $("eWebEditorTextarea").style.display = "";
        if (dA == "CODE") {
            $("eWebEditorTextarea").className = "codemode";
        } else {
            $("eWebEditorTextarea").className = "textmode";
        }
    }
    EWEB.ae = dA;
    $("D_CurrMode").value = dA;
    Dj();
    setHTML(V);
    if (dA == "EDIT") {
        jK.jJ();
        kh.jJ();
    }
    ci.rk();
    if (!ud) {
        EWEB.Focus();
    }
};
function kZ(el) {
    var sl = ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "ol", "ul", "fieldset", "form", "table", "tr", "blockquote", "dl", "li", "br"];
    var rW = ["script", "style", "object", "embed"];
    var bE = "";
    var de = el.childNodes;
    for (var i = 0; i < de.length; i++) {
        if (de[i].nodeType == 1) {
            var aH = de[i].tagName.toLowerCase();
            if (rW.IndexOf(aH) < 0) {
                if (aH == "pre") {
                    var lg = de[i].innerHTML;
                    lg = lg.replace(/<[^>]*?>/gi, "");
                    bE += lg;
                } else {
                    bE += kZ(de[i]);
                }
            }
            if (sl.IndexOf(aH) >= 0) {
                bE += "\n";
            }
        } else if (de[i].nodeType == 3) {
            var fm = de[i].nodeValue;
            fm = fm.replace(/\n/gi, "");
            bE += fm;
        }
    }
    return bE;
};
function aK(aG, uE, tn, fP) {
    if (uE && !ed()) {
        return;
    }
    if (tn && !hH()) {
        return;
    }
    if (aG.indexOf(".") < 0) {
        aG = aG + ".htm";
    }
    ec.OpenDialog(aG, fP);
};

function FM(V) {
    if (V == null) {
        return "";
    }
    V = V.replace(/&/gi, "&amp;");
    V = V.replace(/\"/gi, "&quot;");
    V = V.replace(/</gi, "&lt;");
    V = V.replace(/>/gi, "&gt;");
    V = V.replace(/ (?= )/gi, "&nbsp;");
    V = V.replace(/\n/gi, "<br>");
    return V;
};
function uf(V) {
    if (V == null) {
        return "";
    }
    V = V.replace(/<br(?=[ \/>]).*?>/gi, "\n");
    V = V.replace(/&nbsp;;/gi, " ");
    V = V.replace(/&quot;/gi, "\"");
    V = V.replace(/&lt;/gi, "<");
    V = V.replace(/&gt;/gi, ">");
    V = V.replace(/&amp;/gi, "&");
    return V;
};
function addUploadFiles(ek, gw) {
    if (ek) {
        var ea = ek.split("|");
        var ey = gw.split("|");
        for (var i = 0; i < ea.length; i++) {
            if (ey[i]) {
                var cf = ea[i];
                var fo = ey[i];
                addUploadFile(cf, fo);
            }
        }
    }
};
function addUploadFile(cf, fo) {
    var qN = fo.substr(fo.lastIndexOf("/") + 1);
    hY(aA.wg, cf);
    hY(aA.vZ, qN);
    hY(aA.vj, fo);
    sk({
        flag: "AfterUploadOne",
        savepathfilename: fo,
        savefilename: qN,
        originalfilename: cf
    });
};
function hY(gn, bv) {
    if (bv == "") {
        return;
    }
    if (gn) {
        var cK = parent.document.getElementById(gn);
        if (!cK) {
            cK = parent.document.getElementsByName(gn)[0];
        }
        if (cK) {
            if (cK.value != "") {
                cK.value = cK.value + "|";
            }
            cK.value = cK.value + bv;
            try {
                cK.onchange();
            } catch(e) {}
        }
    }
};
function pb(hv, V) {
    hv.value = V;
};
function remoteUploadOK() {
    dw();
    if (EWEB.bs) {
        if (ld) {
            eval("parent." + ld);
        }
    }
    sk({
        flag: "AfterRemoteUpload"
    });
};
var ld;
function remoteUpload(pO) {
    if (config.AutoRemote != "1") {
        return;
    }
    if (EWEB.ae == "TEXT") {
        return;
    }
    ld = pO;
    var xc = document.getElementsByName("eWebEditor_UploadText")[0];
    pb(xc, getHTML());
    hF(lang["MsgRemoteUploading"]);
    $("eWebEditor_UploadForm").submit();
};
function localUpload() {
    if (!HB()) {
        return;
    }
    if (EWEB.ae == "TEXT") {
        return;
    }
    if (FT.FD()) {
        return;
    }
    FT.wQ("isinstalled", [true],
    function(hT) {
        if (!hT["Ret"]) {
            FT.jT(false);
            return;
        }
        hF(lang["MsgLocalUploading"]);
        var fh = getHTML();
        FT.wQ("localupload", [fh],
        function(hT) {
            Ec(hT, "");
        });
    });
};
function Ec(hT, Ef) {
    if (FT.Fi(hT["Error"])) {
        dw();
        FT.jT(false);
        return;
    }
    addUploadFiles(hT["OriginalFiles"], hT["SavedFiles"]);
    var fh = hT["Body"];
    if (Ef == "dB") {
        insertHTML(fh);
    } else {
        setHTML(fh);
    }
    dw();
    FT.jT(false);
    sk({
        flag: "AfterLocalUpload"
    });
};
function hF(msg) {
    $("msgProcessing").innerHTML = msg;
    var cR = $("divProcessing");
    cR.style.top = (document.body.clientHeight - parseFloat(cR.style.height)) / 2 + "px";
    cR.style.left = (document.body.clientWidth - parseFloat(cR.style.width)) / 2 + "px";
};
function dw() {
    $("divProcessing").style.left = "-10000px";
};
function pG(V) {
    var CR = function(s) {
        if (!F.EY && s == '') {
            if (config.EnterMode == "2") {
                return '<br>';
            } else {
                return '<p><br></p>';
            }
        }
        return s;
    };
    var dS;
    if (F.nb || F.BX) {
        dS = '<!DOCTYPE html>';
    } else {
        dS = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">';
    }
    dS += '<html unselectable=on><head>';
    dS += '<link href="' + EWEB.cd + '/skin/' + config.Skin + '/editarea.css" type="text/css" rel="stylesheet">';
    if (config.AreaCssMode != '1') {
        dS += '<link href="' + EWEB.cd + '/language/' + lang.bF + '.editarea.css" type="text/css" rel="stylesheet">';
    }
    switch (EWEB.ae) {
    case 'CODE':
        break;
    case 'TEXT':
        break;
    case 'EDIT':
    case 'VIEW':
        if (config.AreaCssMode != '1') {
            dS += '<link href="' + EWEB.cd + '/skin/' + config.Skin + '/editarea.' + lang.bF + '.css" type="text/css" rel="stylesheet">';
        }
        dS += EWEB.ExtCSS;
        break;
    }
    if (EWEB.ae == "VIEW") {
        dS += '<base target="_blank">';
        V = V.replace(/(<a\s[^>]*?target\s*?=\s*?[\'\"]?)\_[a-zA-Z]+([\'\"]?[^>]*?>)/gi, '$1_blank$2');
    }
    dS += EWEB.BaseHref + '</head>';
    var aI = dS + '<body';
    if (aA.rD) {
        aI += ' style="overflow-y:hidden"';
    }
    if (config.FixWidth) {
        aI += ' class="ewebeditor__fixwidth">' + '<div id="eWebEditor_FixWidth_DIV" style="width:' + config.FixWidth + ';" >';
        aI += CR(V) + '</div></body></html>';
    } else {
        aI += '>' + CR(V) + '</body></html>';
    }
    return aI;
};
function getCount(jN) {
    var bM = getText();
    bM = bM.replace(/\n/g, "");
    bM = bM.replace(/\r/g, "");
    var l = bM.length;
    var n = 0;
    for (var i = 0; i < l; i++) {
        if (bM.charCodeAt(i) < 0 || bM.charCodeAt(i) > 255) {
            if (jN != 0) {
                n++;
                if (jN == 3) {
                    n++;
                }
            }
        } else {
            if (jN != 1) {
                n++;
            }
        }
    }
    return n;
};
function getText() {
    var bE;
    if (EWEB.ae == "TEXT") {
        bE = EWEB.db.value;
    } else {
        bE = GS(getHTML());
    }
    return bE;
};
function GS(V) {
    V = V.replace(/<script[^>]*?>(?:[^a]|a)*?<\/script>/gi, "");
    V = V.replace(/<style[^>]*?>(?:[^a]|a)*?<\/style>/gi, "");
    V = V.replace(/<object[^>]*?>(?:[^a]|a)*?<\/object>/gi, "");
    V = V.replace(/<embed[^>]*?>(?:[^a]|a)*?<\/embed>/gi, "");
    V = V.replace(/(<br[\s]*?\/?>|<\/[a-zA-Z]+>)([\r\n]+)([^<])/gi, "$1$3");
    var el = $("eWebEditor_Temp_HTML");
    el.innerHTML = V;
    if (F.EY) {
        return el.innerText;
    } else {
        return kZ(el);
    }
};
function ng(url) {
    document.write('<scr' + 'ipt type="text/javascript" src="' + url + '" onerror="alert(\'Error loading \' + this.src);"><\/scr' + 'ipt>');
};
function wr() {
   /* if (!config.L) {
        document.write("<table style='width:100%;height:100%;border-collapse:collapse' borderColor='#999999' bgColor='#ffffff' border='1px'><tr><td align='center' style='font-size:9pt'>eWebEditor!<br><br>" + lang["ErrLicense"] + "</td></tr></table>");
        return;
    }*/
    
    var bC = "";
    bC += "<table id='eWebEditor_Layout' border='0' cellpadding='0' cellspacing='0' width='100%' height='100%' style='table-layout:fixed'>";
    bC += "<tr id='eWebEditor_ToolarPTR'><td>";
    bC += "<table id='eWebEditor_Toolbar' border=0 cellpadding=0 cellspacing=0 width='100%'>";
    bC += "<tr id='eWebEditor_ToolarTRText' style='display:none'><td>";
    bC += qy(vL("Text"), "Text");
    bC += "</td></tr>";
    bC += "<tr id='eWebEditor_ToolarTRView' style='display:none'><td>";
    bC += qy(vL("View"), "View");
    bC += "</td></tr>";
    bC += "<tr id='eWebEditor_ToolarTREdit' style='display:'><td>";
    bC += qy(config.Toolbars, "Edit");
    bC += "</td></tr>";
    bC += "</table>";
    bC += "</td></tr>";
    bC += "<tr><td id='eWebEditor_EditareaTD' height='100%'>";
    bC += "<input type='hidden' id='D_ContentEdit' value=''>";
    bC += "<input type='hidden' id='D_CurrMode' value=''>";
    bC += "<input type='hidden' id='D_ContentLoad' value=''>";
    bC += "<input type='hidden' id='D_ContentFlag' value='0'>";
    bC += "<input type='hidden' id='D_PaginationTitle' value=''>";
    bC += "<textarea id='eWebEditorTextarea' style='display:none;width:100%;height:100%;'></textarea>";
    bC += '<iframe id="eWebEditor" style="width:100%;height:100%"  frameborder="0" allowTransparency="true" src="' + R.iO() + '"></iframe>';
    bC += "</td></tr>";
    if (config.StateFlag) {
        bC += "<tr id='eWebEditor_SB'><td class='SB'>";
        bC += " <table border='0' cellpadding='0' cellspacing='0' width='100%' class='SB'>";
        bC += " <tr valign='middle'>";
        bC += " <td>";
        bC += "     <table id='eWebEditor_SB_Mode' border='0' cellpadding='0' cellspacing='0' class='SB_Mode'>";
        bC += "     <tr>";
        bC += "     <td class='SB_Mode_Left'></td>";
        
        // edit by mjf 2016-2-1
        
     /*   if (config.SBCode) {
            bC += "     <td class=SB_Mode_BtnOff id=eWebEditor_CODE onclick=\"setMode('CODE')\" unselectable=on><table border=0 cellpadding=0 cellspacing=0><tr><td class=SB_Mode_Btn_Img>" + ef("ModeCode") + "</td><td class=SB_Mode_Btn_Text>" + lang["StatusModeCode"] + "</td></tr></table></td>";
            bC += "     <td class=SB_Mode_Sep></td>";
        }
        if (config.SBEdit) {
            bC += "     <td class=SB_Mode_BtnOff id=eWebEditor_EDIT onclick=\"setMode('EDIT')\" unselectable=on><table border=0 cellpadding=0 cellspacing=0><tr><td class=SB_Mode_Btn_Img>" + ef("ModeEdit") + "</td><td class=SB_Mode_Btn_Text>" + lang["StatusModeEdit"] + "</td></tr></table></td>";
            bC += "     <td class=SB_Mode_Sep></td>";
        }
        if (config.SBText) {
            bC += "     <td class=SB_Mode_BtnOff id=eWebEditor_TEXT onclick=\"setMode('TEXT')\" unselectable=on><table border=0 cellpadding=0 cellspacing=0><tr><td class=SB_Mode_Btn_Img>" + ef("ModeText") + "</td><td class=SB_Mode_Btn_Text>" + lang["StatusModeText"] + "</td></tr></table></td>";
            bC += "     <td class=SB_Mode_Sep></td>";
        }
        if (config.SBView) {
            bC += "     <td class=SB_Mode_BtnOff id=eWebEditor_VIEW onclick=\"setMode('VIEW')\" unselectable=on><table border=0 cellpadding=0 cellspacing=0><tr><td class=SB_Mode_Btn_Img>" + ef("ModeView") + "</td><td class=SB_Mode_Btn_Text>" + lang["StatusModeView"] + "</td></tr></table></td>";
        }*/
        // 编辑器下方的代码、设计不显示 edit by mjf 2016-2-1
        bC += "     </tr>";
        bC += "     </table>";
        bC += " </td>";
        if (aA.FullScreen != "1" && config.SBSize) {
            bC += " <td align=right>";
            bC += "     <table id='eWebEditor_SB_Size' border=0 cellpadding=0 cellspacing=0 class=SB_Size>";
            bC += "     <tr>";
            bC += "     <td class=SB_Size_Btn onclick='ej(300)' title='" + lang["SizePlus"] + "'>" + ef("SizePlus") + "</td>";
            bC += "     <td class=SB_Size_Sep></td>";
            bC += "     <td class=SB_Size_Btn onclick='ej(-300)' title='" + lang["SizeMinus"] + "'>" + ef("SizeMinus") + "</td>";
            bC += "     <td class=SB_Size_Right></td>";
            bC += "     </tr>";
            bC += "     </table>";
            bC += " </td>";
        }
        bC += " </tr>";
        bC += " </Table>";
        bC += "</td></tr>";
    }
    bC += "</table>";
    bC += "<div id='eWebEditor_Temp_HTML' style='visibility:hidden;overflow:hidden;position:absolute;width:1px;height:1px'></div>";
    bC += "<div style='position:absolute;display:none'>";
    bC += "<form id='eWebEditor_UploadForm' action='" + config.ServerExt + "/upload." + config.ServerExt + "?action=remote&type=remote&style=" + aA.StyleName + "&language=" + lang.bF + "&cusdir=" + aA.CusDir + "&skey=" + aA.SKey + "' method='post' target='eWebEditor_UploadTarget'>";
    bC += "<input type='hidden' name='eWebEditor_UploadText'>";
    bC += "</form>";
    bC += '<iframe name="eWebEditor_UploadTarget" width=0 height=0 src="' + R.iO() + '"></iframe>';
    bC += "</div>";
    bC += "<div id=divProcessing style='width:200px;height:30px;position:absolute;left:-10000'>";
    bC += "<table border=0 cellpadding=0 cellspacing=1 bgcolor='#000000' width='100%' height='100%'><tr><td bgcolor=#3A6EA5><marquee id='msgProcessing' align='middle' behavior='alternate' scrollamount='5' style='font-size:9pt;color:#ffffff'></marquee></td></tr></table>";
    bC += "</div>";
    bC += "<div id='div_TableResizeSepV' style='position:absolute;display:none;background-color:transparent;overflow:hidden;' onmousedown='cW.MD2(event)' onmousemove='cW.MM2(event)' onmouseup='cW.MU2(event)'></div>";
    bC += "<div id='div_TableResizeSepH' style='position:absolute;display:none;background-color:transparent;overflow:hidden;' onmousedown='cW.MD2(event)' onmousemove='cW.MM2(event)' onmouseup='cW.MU2(event)'></div>";
    if (!F.EY && !F.qJ && F.Bx) {
        bC += '<div id="div_activex" style="position:absolute">' + FT.FFObjectHTML + '</div>';
    }
    if (F.qJ && F.Bx) {
        bC += '<div style="position:absolute;left:-10000" id="div_LS"></div>';
    }
    document.write(bC);
};
function qy(qH, sB) {
    var Cw = false;
    var aI = "<table border='0' cellpadding='0' cellspacing='0' width='100%' id='eWebEditor_Toolbar_" + sB + "' unselectable='on'>";
   
    for (var i = 0; i < qH.length; i++) {
        aI += "<tr id='eWebEditor_Toolbar_" + sB + "_TR" + i + "' style='display:" + (Cw ? "none": "") + "'><td class='TB_Left'></td><td class='TB_Center'><table border='0' cellpadding='0' cellspacing='0'><tr>";
        var tb = qH[i];
        for (var j = 0; j < tb.length; j++) {
            var aM = tb[j];
            if (aM == "ExpandToolbar") {
                if (!Cw) {
                    ci.CO(i + 1);
                    Cw = true;
                }
            }
            var di = Buttons[aM];
            if (!di) {
                alert("Invalid Button: " + aM);
                break;
            }
            var hL = di[1] ? di[1] : "exec('" + aM + "')";
            if (aM == "TBSep") {
                aI += "<td class='TB_Btn_Padding'><div class='TB_Sep'></div></td>";
            } else if (di[3] == 0) {
                aI += "<td class='TB_Btn_Padding'><div class='TB_Btn' name='TB_Name_" + aM + "' title=\"" + lang[aM] + "\" onclick=\"" + hL + "\">";
                if (typeof(di[0]) == "number") {
                    var cA = "skin/" + config.Skin + "/buttons.gif";
                    var dM = 16 - di[0] * 16;
                    if (F.as && (!F.nb) && (!F.GD)) {
                        aI += "<div class='TB_Btn_Image'><img src='" + cA + "' style='top:" + dM + "px' /></div>";
                    } else {
                        aI += "<img class='TB_Btn_Image' src='sysimage/space.gif' style='background-position: 0px " + dM + "px;background-image: url(" + cA + ");' />";
                    }
                } else {
                    var cA = "skin/" + config.Skin + "/" + di[0];
                    aI += "<img class='TB_Btn_Image' src='" + cA + "'>";
                }
                aI += "</div></td>";
            } else if (di[3] == 1) {
                var aZ = "";
                var bW = "";
                switch (aM) {
                case "FontName":
                    aZ = " style='width:115px'";
                    for (var k = 0; k < lang[aM + "Item"].length; k++) {
                        bW += "<option value='" + lang[aM + "Item"][k] + "'>" + lang[aM + "Item"][k].split(",")[0] + "</option>";
                    }
                    break;
                case "FontSize":
                    aZ = " style='width:55px'";
                    for (var k = 0; k < lang[aM + "Item"].length; k++) {
                        bW += "<option value='" + lang[aM + "Item"][k][0] + "'>" + lang[aM + "Item"][k][1] + "</option>";
                    }
                    break;
                case "FormatBlock":
                    aZ = " style='width:90px'";
                    for (var k = 0; k < lang[aM + "Item"].length; k++) {
                        bW += "<option value='" + lang[aM + "Item"][k][0] + "'>" + lang[aM + "Item"][k][1] + "</option>";
                    }
                    break;
                case "ZoomSelect":
                    aZ = " style='width:55px'";
                    for (var k = 0; k < cY.Options.length; k++) {
                        bW += "<option value='" + cY.Options[k] + "'>" + cY.Options[k] + "%</option>";
                    }
                    break;
                }
                aI += "<td class='TB_Btn_Padding'><select name='TB_Name_" + aM + "' onchange=\"" + hL + "\" size=1 " + aZ + "><option selected>" + lang[aM] + "</option>" + bW + "</select></td>";
            }
        }
        aI += "</tr></table></td><td class='TB_Right'></td></tr>";
    }
    aI += "</table>";
    if (qH.length == 0) {
        aI = "";
    }
    return aI;
};
function vL(an) {
    var a = new Array();
    var b = false;
    a.push("TBHandle");
    if (config.TB2Code == "1") {
        a.push("ModeCode");
        b = true;
    }
    if (config.TB2Edit == "1") {
        a.push("ModeEdit");
        b = true;
    }
    if (config.TB2Text == "1") {
        a.push("ModeText");
        b = true;
    }
    if (config.TB2View == "1") {
        a.push("ModeView");
        b = true;
    }
    if (an == "Text") {
        if (b) {
            a.push("TBSep");
        }
        a.push("FindReplace");
        b = true;
    }
    if (config.TB2Max == "1") {
        if (b) {
            a.push("TBSep");
        }
        a.push("Maximize");
    }
    return [a];
};
function ef(aM, rg) {
    var cp = Buttons[aM];
    var dM = 16 - cp[0] * 16;
    var cA = "skin/" + config.Skin + "/buttons.gif";
    if (F.as) {
        return "<div><img src='" + cA + "' style='top:" + dM + "px'></div>";
    } else {
        return "<img class='SB_Btn_Image' src='sysimage/space.gif' style='background-position: 0px " + dM + "px;background-image: url(" + cA + ");' />";
    }
};
var dp = new Object();
dp.fv = function() {
    if (config.PaginationMode == "0") {
        return false;
    }
    EWEB.Focus();
    var el;
    if (C.ai() == "Control") {
        el = C.ax();
    } else {
        el = C.cI();
    }
    el = this.oS(el);
    if (!el) {
        insertHTML("</P><P id=eWebEditor_Temp_P>");
        var p = EWEB.T.getElementById("eWebEditor_Temp_P");
        p.removeAttribute("id");
        this.ez(p, "beforeBegin");
    } else {
        this.ez(el, "afterEnd");
    }
};
dp.ez = function(el, kH) {
    var oI = false;
    if (kH == "afterEnd" && (!el.nextSibling)) {
        oI = true;
    }
    var aU = EWEB.T.createElement("img");
    aU.className = "ewebeditor__pagination";
    aU.setAttribute("_ewebeditor_fake_tag", "pagination");
    aU.setAttribute("src", EWEB.cd + "/sysimage/space.gif");
    if (F.as) {
        el.insertAdjacentElement(kH, aU);
    } else {
        if (kH == "beforeBegin") {
            el.parentNode.insertBefore(aU, el);
        } else {
            el.parentNode.insertBefore(aU, el.nextSibling);
        }
    }
    if (oI) {
        var p = EWEB.T.createElement("p");
        el.parentElement.appendChild(p);
    }
};
dp.oS = function(el) {
    if (el.tagName == "HTML") {
        return null;
    }
    var te = null;
    if (config.FixWidth) {
        while (! ((el.tagName.toUpperCase() == "DIV") && (el.getAttribute("id") == "eWebEditor_FixWidth_DIV"))) {
            te = el;
            el = el.parentNode;
            if (!el || !el.tagName) {
                break;
            }
        }
    } else {
        while (el.tagName.toUpperCase() != "BODY") {
            te = el;
            el = el.parentNode;
            if (!el || !el.tagName) {
                break;
            }
        }
    }
    return te;
};
dp.Auto = function(qC) {
    if (config.PaginationMode == "0") {
        return false;
    }
    this.Empty();
    var lh = parseInt(qC);
    if (lh < 1) {
        return false;
    }
    if (getCount(2) <= lh) {
        return false;
    }
    if (EWEB.ae != "EDIT") {
        setMode("EDIT");
    }
    var dK;
    if (config.FixWidth) {
        dK = EWEB.T.getElementById("eWebEditor_FixWidth_DIV");
    } else {
        dK = EWEB.T.body;
    }
    var de = dK.childNodes;
    var l = 0;
    for (var i = 0; i < de.length; i++) {
        var bz = de[i];
        if (bz.nodeType == 1) {
            var s = bz.innerText || bz.textContent;
            if (s) {
                l += s.length;
            }
        } else if (bz.nodeType == 3) {
            l += bz.length;
        }
        if (l >= lh) {
            if (bz.nextSibling) {
                if (bz.nodeType == 1) {
                    this.ez(bz, "afterEnd");
                } else {
                    this.ez(bz.nextSibling, "beforeBegin");
                }
                l = 0;
            }
        }
    }
};
dp.Empty = function() {
    if (config.PaginationMode == "0") {
        return;
    }
    var K = EWEB.T.getElementsByTagName("IMG");
    for (var i = K.length - 1; i >= 0; i--) {
        var el = K[i];
        var cb = el.getAttribute("_ewebeditor_fake_tag", 2);
        if (cb) {
            if (cb.toLowerCase() == "pagination") {
                R.cE(el);
            }
        }
    }
};
dp.wj = function() {
    if (config.PaginationMode == "0") {
        return false;
    }
    var K = EWEB.T.getElementsByTagName("IMG");
    for (var i = K.length - 1; i >= 0; i--) {
        var el = K[i];
        var cb = el.getAttribute("_ewebeditor_fake_tag", 2);
        if (cb) {
            if (cb.toLowerCase() == "pagination") {
                var te = this.oS(el);
                if (te) {
                    var b = false;
                    if (te.tagName == "DIV" || te.tagName == "P") {
                        var s = te.innerText || te.textContent;
                        s = s.oz();
                        if (!s) {
                            b = true;
                            this.ez(te, "beforeBegin");
                            R.cE(te);
                        }
                    }
                    if (!b) {
                        this.ez(te, "afterEnd");
                        R.cE(el);
                    }
                }
            }
        }
    }
};
var aE = new Object();
aE.jY = function(V) {
    V = this.rZ(V);
    V = this.ob(V, 'script', /<script[\s\S]*?<\/script>/gi);
    V = this.ob(V, 'noscript', /<noscript[\s\S]*?<\/noscript>/gi);
    V = this.sI(V);
    V = this.uU(V);
    V = this.sX(V);
    V = this.DJ(V, "img", "src");
    V = this.DJ(V, "a", "href");
    V = this.DJ(V, "area", "href");
    V = this.DJ(V, "a", "name");
    V = this.Gk(V);
    return V;
};
aE.wV = function(V) {
    V = this.EH(V);
    V = this.rG(V);
    V = this.sQ(V);
    V = this.ER(V);
    V = this.vb(V);
    V = this.sG(V);
    V = this.Fw(V);
    return V;
};
aE.wv = function() {
    var el = C.ax();
    return el.getAttribute("_ewebeditor_fake_tag", 2);
};
aE.EH = function(V) {
    var aI = V.replace(/<(span|font|strong|b|i|u|strike)(?=[\s>])[^>]*?><\/\1>/gi, "");
    if (aI != V) {
        return this.EH(aI);
    } else {
        return aI;
    }
};
aE.Fw = function(V) {
    var aI = V;
    var sO = new Array();
    var uI = function(s) {
        var fa = '__ewebeditor__sepstr__';
        while (true) {
            fa = fa + 'a';
            var re = new RegExp(fa + '[0-9]+', 'gi');
            if (!re.test(s)) {
                break;
            }
        }
        return fa;
    };
    var El = uI(V);
    var gm = function(m) {
        sO.push(m);
        return El + (sO.length - 1);
    };
    while (true) {
        var kU = aI.replace(/<(ul|ol|dl)(?=[\s>])[^>]*>((?!<\/?(ul|ol|dl)>)[\s\S])*<\/\1>/gi, gm);
        if (kU == aI) {
            break;
        } else {
            aI = kU;
        }
    }
    var gC = function(m, m1) {
        return m.replace(/[ \t\n\r]*$/g, '') + '</' + m1 + '>';
    };
    for (var i = 0; i < sO.length; i++) {
        sO[i] = sO[i].replace(/<(li|dd|dt)(?=[\s>])[^>]*>((?!<\/?(li|dd|dt)[\s>])[\s\S])*(?=<(li|dd|dt|\/ul|\/ol|\/dl)[\s>])/gi, gC)
    }
    for (var i = sO.length - 1; i >= 0; i--) {
        aI = aI.replace(El + i, sO[i]);
    }
    return aI;
};
aE.ob = function(V, aH, um) {
    function _Replace(m) {
        return aE.ct(aH, m);
    };
    return V.replace(um, _Replace);
};
aE.vb = function(V) {
    function _Replace(m, aH) {
        function gm(m, bv) {
            if (['flash', 'flv', 'mediaplayer6', 'mediaplayer7', 'realplayer', 'quicktime', 'vlc', 'unknownobject'].IndexOf(aH) >= 0) {
                var ak = aE.pr(m, 'img');
                if (ak != '') {
                    ak = ' style=' + ak;
                }
                var eh = (aE.mA(m, 'img', 'width') == '') ? aE.co(m, 'img', 'width') : '';
                var ff = (aE.mA(m, 'img', 'height') == '') ? aE.co(m, 'img', 'height') : '';
                var fQ = aE.co(m, 'img', 'align');
                var jB = aE.co(m, 'img', 'vspace');
                var gq = aE.co(m, 'img', 'hspace');
                var eu = decodeURIComponent(bv);
                eu = aE.ov(eu, "object", ak);
                eu = aE.ov(eu, "embed", ak);
                eu = aE.sv(eu, ["object", "embed"], [["width", eh], ["height", ff], ["align", fQ], ["vspace", jB], ["hspace", gq]]);
                console.log(eu);
                return eu;
            } else {
                return decodeURIComponent(bv);
            }
        };
        return m.replace(/<img [^>]*?_ewebeditor_fake_value=\"([^\">]+?)\"[^>]*?>/gi, gm);
    };
    return V.replace(/<img [^>]*?_ewebeditor_fake_tag=\"(\w+?)\"[^>]*?>/gi, _Replace);
};
aE.rZ = function(V) {
    if (config.PaginationMode == "0") {
        return V;
    }
    var aI = '';
    var fg = '';
    var cA = aE.ct('pagination', "");
    if (config.PaginationMode == "1") {
        aI = "";
        var re = /<!--ewebeditor:page title=\"([^\">]*)\"-->((?:[^a]|a)+?)<!--\/ewebeditor:page-->/gi;
        var m;
        var ir = 0;
        while ((m = re.exec(V)) != null) {
            ir++;
            fg += uf(m[1]) + "\r\n";
            if (aI != "") {
                aI += cA;
            }
            aI += m[2];
        }
        if (ir == 0) {
            aI = V;
        }
    } else {
        var re = new RegExp(config.PaginationKey.replace(/([\[\]\{\}\.\(\)\*\+\?])/gi, "\\$1"), 'gi');
        aI = V.replace(re, cA);
    }
    $("D_PaginationTitle").value = fg;
    return aI;
};
aE.rG = function(V) {
    if (config.PaginationMode == "0") {
        return V;
    }
    var aI = V;
    var a = V.split(/<img [^>]*?_ewebeditor_fake_tag=\"pagination\"[^>]*?>/gi);
    if (a.length > 1) {
        if (config.PaginationMode == "1") {
            aI = "";
            var iv = $("D_PaginationTitle").value.split("\r\n");
            for (var i = 0; i < a.length; i++) {
                var fg = "";
                if (iv[i]) {
                    fg = FM(iv[i]);
                }
                aI += "<!--ewebeditor:page title=\"" + fg + "\"-->\r\n";
                aI += a[i] + "\r\n";
                aI += "<!--/ewebeditor:page-->\r\n\r\n";
            }
        } else {
            aI = a[0];
            for (var i = 1; i < a.length; i++) {
                aI += "\r\n" + config.PaginationKey + "\r\n" + a[i];
            }
        }
    }
    return aI;
};
aE.sI = function(V) {
    function _Replace(m) {
        var dG = m.replace(/<object [^>]*?classid\s*=\s*[\'\"]?clsid\s*:\s*([a-z0-9\-]+)[\'\"]?[^>]*?>[\s\S]*/gi, '$1');
        dG = dG.toUpperCase();
        if (dG == 'D27CDB6E-AE6D-11CF-96B8-444553540000') {
            if (/plugin\/flvplayer\.swf/.test(m) && /flashvars[^>]*?\.flv/.test(m)) {
                return aE.ct('flv', m, 'object');
            } else {
                return aE.ct('flash', m, 'object');
            }
        } else if (dG == '22D6F312-B0F6-11D0-94AB-0080C74C7E95') {
            return aE.ct('mediaplayer6', m, 'object');
        } else if (dG == '6BF52A52-394A-11D3-B153-00C04F79FAA6') {
            return aE.ct('mediaplayer7', m, 'object');
        } else if (dG == 'CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA') {
            return aE.ct('realplayer', m, 'object');
        } else if (dG == '02BF25D5-8C17-4B23-BC80-D3488ABDDC6B') {
            return aE.ct('quicktime', m, 'object');
        } else if (dG == '9BE31822-FDAD-461B-AD51-BE1D1C159921') {
            return aE.ct('vlc', m, 'object');
        } else if (dG == '0002E510-0000-0000-C000-000000000046' || dG == '0002E551-0000-0000-C000-000000000046' || dG == '0002E559-0000-0000-C000-000000000046') {
            return m;
        } else {
            return aE.ct('unknownobject', m, 'object');
        }
    };
    return V.replace(/<object[\s\S]*?<\/object>/gi, _Replace);
};
aE.uU = function(V) {
    function _Replace(m) {
        var cT = m.replace(/<embed [^>]*?type\s*=\s*[\'\"]?([^\'\"\s]+)[\'\"]?[^>]*?>[\s\S]*/gi, '$1');
        cT = cT.toLowerCase();
        if (cT == 'application/x-shockwave-flash') {
            return aE.ct('flash', m, 'embed');
        } else if (['application/x-mplayer2', 'video/x-ms-asf', 'video/x-msvideo', 'video/mpeg', 'audio/mid', 'audio/mpeg', 'audio/wav', 'video/x-ms-wm', 'audio/x-ms-wma', 'video/x-ms-wmv', 'video/x-ms-wmp', 'video/x-ms-wmx'].IndexOf(cT) >= 0) {
            return aE.ct('mediaplayer6', m, 'embed');
        } else if (cT == 'video/quicktime') {
            return aE.ct('quicktime', m, 'embed');
        } else if (['audio/x-pn-realaudio', 'audio/x-pn-realaudio-plugin', 'application/vnd.rn-realmedia'].IndexOf(cT) >= 0) {
            return aE.ct('realplayer', m, 'embed');
        } else if (['application/x-vlc-plugin'].IndexOf(cT) >= 0) {
            return aE.ct('vlc', m, 'embed');
        } else {
            return aE.ct('unknownobject', m, 'embed');
        }
    };
    return V.replace(/<embed[\s\S]*?<\/embed>/gi, _Replace);
};
aE.ct = function(aH, bv, eJ) {
    if (eJ) {
        var ak = aE.pr(bv, eJ);
        var eh = aE.co(bv, eJ, 'width');
        var ff = aE.co(bv, eJ, 'height');
        var fQ = aE.co(bv, eJ, 'align');
        var jB = aE.co(bv, eJ, 'vspace');
        var gq = aE.co(bv, eJ, 'hspace');
        if (ak != '') {
            ak = ' style=' + ak;
        }
        var V = '<img src="' + EWEB.cd + '/sysimage/space.gif" class="ewebeditor__' + aH + '" _ewebeditor_fake_tag="' + aH + '" _ewebeditor_fake_value="' + encodeURIComponent(bv) + '"' + ak;
        if (eh != '') {
            V += ' width="' + eh + '"';
        }
        if (ff != '') {
            V += ' height="' + ff + '"';
        }
        if (fQ != '') {
            V += ' align="' + fQ + '"';
        }
        if (jB != '') {
            V += ' vspace="' + jB + '"';
        }
        if (gq != '') {
            V += ' hspace="' + gq + '"';
        }
        V += '>';
        return V;
    } else {
        return '<img src="' + EWEB.cd + '/sysimage/space.gif" class="ewebeditor__' + aH + '" _ewebeditor_fake_tag="' + aH + '" _ewebeditor_fake_value="' + encodeURIComponent(bv) + '">';
    }
};
aE.pr = function(V, aH) {
    var re = new RegExp('^[\\s\\S]*?<' + aH + '(?=[\\s>])[^>]*?\\sstyle\\s*?=\\s*?(\'[^\'>]+?\'|\"[^\">]+?\")[^>]*?>[\\s\\S]*$', 'gi');
    if (re.test(V)) {
        return V.replace(re, '$1');
    } else {
        return '';
    }
};
aE.mA = function(V, aH, bL) {
    var re = new RegExp('^[\\s\\S]*?<' + aH + '(?=[\\s>])[^>]*?\\sstyle\\s*?=\\s*?([\'\"])[^>]*?\\b' + bL + '\\s*?:\\s*?(\\w+)(?=[\\s\;\'\"])[^>]*?\\1[^>]*?>[\\s\\S]*$', 'gi');
    if (re.test(V)) {
        return V.replace(re, '$2');
    } else {
        return '';
    }
};
aE.co = function(V, aH, bL) {
    var re = new RegExp('^[\\s\\S]*?<' + aH + '(?=[\\s>])[^>]*?\\s' + bL + '\\s*?=\\s*?([\'\"]?)(\\w+)\\1[^>]*?>[\\s\\S]*$', 'gi');
    if (re.test(V)) {
        return V.replace(re, '$2');
    } else {
        return '';
    }
};
aE.ov = function(V, aH, ak) {
    function _Replace(m) {
        var r = /\sstyle\s*?=\s*?([\'\"])[^>]*?\1/gi;
        if (r.test(m)) {
            ak = ak.replace('$', '\\$');
            return m.replace(r, ak);
        } else {
            return m.substring(0, m.length - 1) + ak + '>';
        }
    };
    var re = new RegExp('<' + aH + '(?=[\\s>])[^>]*?>', 'gi');
    return V.replace(re, _Replace);
};
aE.sv = function(V, eE, gc) {
    for (var i = 0; i < eE.length; i++) {
        V = this.ti(V, eE[i], gc);
    }
    return V;
};
aE.ti = function(V, aH, gc) {
    function _Replace(m) {
        var bL, fO;
        for (var i = 0; i < gc.length; i++) {
            bL = gc[i][0];
            fO = gc[i][1];
            var s = '';
            if (fO != '') {
                s = ' ' + bL + '="' + fO + '"';
            }
            var r = new RegExp('\\s' + bL + '\\s*?=\\s*?([\'\"]?)\\w+\\1', 'gi');
            if (r.test(m)) {
                m = m.replace(r, s);
            } else {
                if (fO != '') {
                    m = m.substring(0, m.length - 1) + s + '>';
                }
            }
        }
        return m;
    };
    var re = new RegExp('<' + aH + '[^>]*?>', 'gi');
    return V.replace(re, _Replace);
};
aE.sX = function(V) {
    function _Replace(m) {
        function gC(m, bL) {
            return ' _ewebeditor_pe_' + bL + '="' + encodeURIComponent(m) + '"';
        };
        return m.replace(/\s(on\w+)\s*=\s*?(\'|\")([\s\S]*?)\2/gi, gC);
    };
    return V.replace(/<[^\>]+ on\w+\s*=\s*?(\'|\")[\s\S]+?\>/gi, _Replace);
};
aE.sQ = function(V) {
    function _Replace(m, m1) {
        return decodeURIComponent(m1);
    };
    return V.replace(/\s_ewebeditor_pe_\w+=\"([^\"]+)\"/gi, _Replace);
};
aE.DJ = function(V, aH, bL) {
    
    function _Replace(m, m1, m2, m3, m4, m5) {
        var r = new RegExp('_ewebeditor_pa_' + bL, 'gi');
        if (r.test(m) || /_ewebeditor_fake_/.test(m)) {
            return m;
        } else {
            return m1 + m2 + ' _ewebeditor_pa_' + bL + '="' + encodeURIComponent(m4.replace(/\"/gi, "'")) + '"' + m5;
        }
    };
    var re = new RegExp('(<' + aH + '(?=\\s)[^>]*?)(\\s' + bL + '\\s*?=\\s*?([\'\"])([^>]*?)\\3)([\\s\\S]*?>)', 'gi');
    return V.replace(re, _Replace);
};
aE.ER = function(V) {
    function _Replace(m, bL, bv) {
        var r = new RegExp('\\s' + bL + '\\s*?=\\s*?([\'\"])[^>]*?\\1', 'gi');
        var s = m.replace(r, '');
        r = new RegExp('\\s' + bL + '\\s*?=[^\\s\'\">]*', 'gi');
        s = s.replace(r, '');
        r = new RegExp('\\s_ewebeditor_pa_' + bL + '+\\s*?=\\s*?\"[^\"]*?\"', 'gi');
        return s.replace(r, ' ' + bL + '="' + decodeURIComponent(bv) + '"');
    };
    var aI = "";
    while (true) {
        aI = V.replace(/<\w+[^>]*?_ewebeditor_pa_(\w+)\s*?=\s*?\"([^\">]*?)\"[^>]*>/gi, _Replace);
        if (aI != V) {
            V = aI;
        } else {
            break;
        }
    }
    return aI;
};
aE.sG = function(V) {
    V = V.replace(/(<\w+(?=\s)[^>]*?)\sclass\s*?=ewebeditor__\w+([^>]*?>)/gi, '$1$2');
    V = V.replace(/(<\w+(?=\s)[^>]*?\sclass\s*?=[^>]*?)(ewebeditor__\w+)([^>]*?>)/gi, '$1$3');
    V = V.replace(/(<\w+(?=\s)[^>]*?)(\sclass\s*?=\s*?\"\s*\")([^>]*>)/gi, '$1$3');
    V = V.replace(/(<\w+(?=\s)[^>]*?\sclass\s*?=\s*?\")\s*([^\"]+?)\s*(\"[^>]*>)/gi, '$1$2$3');
    return V;
};
aE.Gk = function(V) {
    function DK(DH, rg) {
        var s = DH.replace(/(\sclass=\"[^\"]*?)(\")/gi, '$1 ' + rg + '$2');
        if (s == DH) {
            s = DH.substring(0, DH.length - 1) + ' class="' + rg + '">';
        }
        return s;
    };
    function _Replace(m, m1, m2, m3) {
        if (m2.length > 0) {
            return DK(m1, "ewebeditor__anchorc") + m2 + m3;
        } else {
            return DK(m1, "ewebeditor__anchor") + m2 + m3;
        }
    };
    var re = new RegExp('(<a\\s[^>]*?ewebeditor_pa_name[^>]*?>)([\\s\\S]*?)(</a>)', 'gi');
    return V.replace(re, _Replace);
};
aE.CL = function(el, bL) {
    var yV = "_ewebeditor_pa_" + bL;
    var wU = el.attributes[yV];
    if (wU == null || !wU.specified) {
        return dE(el, bL);
    } else {
        return decodeURIComponent(el.getAttribute(yV, 2));
    }
};
aE.BK = function(el) {
    var cb = el.getAttribute("_ewebeditor_fake_tag", 2);
    return ((cb) ? true: false);
};
var vy = {
    vi: function(V) {
        var ka = this.tm();
        if (ka == '') {
            return V;
        }
        var fa = this.uI(V);
        var kY = new Array();
        var qL = /^\<\/(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL|DL)[ \>]/i;
        var qk = /^\<(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL|DL)[ \/\>]/i;
        var pu = new RegExp('^' + ka);
        var gm = function(m, m1, m2, m3, m4) {
            kY.push(m3);
            return m1 + fa + m4;
        };
        var re = /(<(style|script|pre)(?=[\s>])[^>]*?>)([\s\S]*?)(<\/\2>)/gi;
        V = V.replace(re, gm);
        V = V.replace(/\<(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DL|DT|DD|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/gi, '\n$&');
        V = V.replace(/\<\/(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DL|DT|DD|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/gi, '$&\n');
        V = V.replace(/\<(BR|HR)[^\>]*\>/gi, '$&\n');
        V = V.replace(/\<\/?(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR)[^\>]*\>/gi, '\n$&\n');
        var nA = V.split(/[\r\t\f ]*\n+[\r\t\f ]*/g);
        var hE = '';
        V = '';
        for (var i = 0; i < nA.length; i++) {
            var gY = nA[i];
            if (gY.length == 0) {
                continue;
            }
            if (qL.test(gY)) {
                hE = hE.replace(pu, '');
            }
            V += hE + gY + '\n';
            if (qk.test(gY)) {
                hE += ka;
            }
        }
        var gC = function(m, m1, m2) {
            return m1.toLowerCase() + m2;
        };
        V = V.replace(/(<\/?\w+(?=[\s>]))([^>]*?>)/gi, gC);
        var BB = function(m, m1, m2, m3) {
            var BH = new Array();
            var Ca = function(m, m1) {
                BH.push(m);
                return '"' + fa + '"';
            };
            var vM = m2.replace(/([\'\"])[\s\S]*?\1/gi, Ca);
            var BC = function(m, m1, m2) {
                return ' ' + m1.toLowerCase() + '="' + m2 + '"';
            };
            vM = vM.replace(/\s(\w+)\s*=([^\"\'\s]+)/gi, BC);
            var CA = vM.split('"' + fa + '"');
            vM = CA[0];
            for (var i = 0; i < BH.length; i++) {
                vM += BH[i] + CA[i + 1];
            }
            return m1 + vM + m3;
        };
        V = V.replace(/(<\w+(?=[\s]))([^>]*?)(>)/gi, BB);
        var nI = V.split(fa);
        V = nI[0];
        for (var i = 0; i < kY.length; i++) {
            V += kY[i] + nI[i + 1];
        }
        return V.oz();
    },
    uI: function(V) {
        var fa = '__ewebeditor__sepstr__';
        var i = 0;
        while (true) {
            i = i + 1;
            fa = fa + i;
            if (V.indexOf(fa) < 0) {
                break;
            }
        }
        return fa;
    },
    tm: function() {
        var n = parseInt(config.CodeFormat);
        var oB = '';
        for (var i = 0; i < n; i++) {
            oB += ' ';
        }
        return oB;
    }
};
function ej(lW) {
    if (kQ.hM) {
        return;
    }
    var bQ = window.frameElement;
    var cq = bQ.clientHeight;
    var GL = cq + lW;
    if (GL >= config.UIMinHeight) {
        bQ.style.height = GL + "px";
    } else {
        bQ.style.height = config.UIMinHeight + "px";
    }
};
function qG() {
    var cR = EWEB.T.createElement("div");
    cR.innerHTML = '<span style="margin:0;padding:0;border:0;clear:both;width:1px;height:1px;display:block;">' + (F.xb ? '&nbsp;': '') + '</span>';
    var gi = R.cE(cR.firstChild);
    var dK;
    if (config.FixWidth) {
        dK = EWEB.T.getElementById("eWebEditor_FixWidth_DIV");
    } else {
        dK = F.as ? EWEB.T.body: EWEB.T.documentElement;
    }
    dK.appendChild(gi);
    var wN = R.hg(EWEB.aR, gi).y;
    if (!config.FixWidth) {
        wN += gi.offsetHeight;
    }
    R.cE(gi);
    var vA = R.eF(EWEB.aR).Height;
    var jR = wN - vA;
    if (F.jo) {
        jR += 20;
    }
    if (Math.abs(jR) < 3) {
        return;
    }
    var mg = R.mD(document).frameElement;
    var wK = mg.offsetHeight;
    var vm = Math.max(wK + jR, parseInt(config.UIMinHeight));
    mg.height = vm;
};
function uT() {
    if (!hH()) {
        return;
    }
    try {
        var sy = new ActiveXObject("ieSpell.ieSpellExtension");
        sy.CheckAllLinkedDocuments(EWEB.T);
    } catch(yx) {
        if (confirm(lang["MsgIeSpellDownload"])) {
            window.open("http://www.iespell.com/download.php", "IeSpellDownload");
        }
    }
};
function qu() {
    if (EWEB.ae == "EDIT") {
        aK('findreplace.htm', true);
    } else {
        ec.OpenDialog('findreplacetext.htm', false);
    }
};
function tM() {
    if (!ed()) {
        return;
    }
    EWEB.Focus();
    if (!iY()) {
        alert(lang["MsgNotParagraph"]);
        return;
    }
    aK('paragraph.htm', true);
};
function iY() {
    if (C.ai() == "Control") {
        return false;
    }
    if (C.dh(["P", "DIV"], true)) {
        return true;
    } else {
        return false;
    }
};
function tQ() {
    if (!ed()) {
        return;
    }
    var b = false;
    if (C.ai() == "Control") {
        var bg = C.ax();
        if (bg.tagName.toUpperCase() == "IMG") {
            if (!aE.BK(bg)) {
                b = true;
            }
        }
    }
    if (!b) {
        alert(lang["MsgMapLimit"]);
        return;
    }
    aK("map.htm", true);
};
function uB() {
    if (!ed()) {
        return;
    }
    if (C.ai() == "Control") {
        var bg = C.ax();
        if (bg.tagName.toUpperCase() != "IMG") {
            alert(lang["MsgHylnkLimit"]);
            return;
        }
    }
    aK("hyperlink.htm", true);
};
function dB(aN) {
    if (!ed()) {
        return;
    }
    EWEB.Focus();
    var bE = getSelectedText();
    switch (aN) {
    case "nowdate":
        var d = new Date();
        insertHTML(d.toLocaleDateString());
        break;
    case "nowtime":
        var d = new Date();
        insertHTML(d.toLocaleTimeString());
        break;
    case "br":
        insertHTML("<br>");
        break;
    case "code":
        insertHTML('<table width=95% border="0" align="Center" cellpadding="6" cellspacing="0" style="border: 1px Dotted #CCCCCC; TABLE-LAYOUT: fixed"><tr><td bgcolor=#FDFDDF style="WORD-WRAP: break-word"><font style="color: #990000;font-weight:bold">' + lang["HtmlCode"] + '</font><br>' + FM(bE) + '</td></tr></table>');
        break;
    case "quote":
        insertHTML('<table width=95% border="0" align="Center" cellpadding="6" cellspacing="0" style="border: 1px Dotted #CCCCCC; TABLE-LAYOUT: fixed"><tr><td bgcolor=#F3F3F3 style="WORD-WRAP: break-word"><font style="color: #990000;font-weight:bold">' + lang["HtmlQuote"] + '</font><br>' + FM(bE) + '</td></tr></table>');
        break;
    case "big":
        insertHTML("<big>" + bE + "</big>");
        break;
    case "small":
        insertHTML("<small>" + bE + "</small>");
        break;
    case "printbreak":
        insertHTML("<div style=\"FONT-SIZE: 1px; PAGE-BREAK-BEFORE: always; VERTICAL-ALIGN: middle; HEIGHT: 1px; BACKGROUND-COLOR: #c0c0c0\">&nbsp; </div>");
        break;
    default:
        alert(lang["ErrParam"]);
        break;
    }
};
var cY = {
    Options: [10, 25, 50, 75, 100, 150, 200, 500],
    qr: 100,
    Execute: function(kX) {
        if (F.as) {
            EWEB.T.body.runtimeStyle.zoom = kX + "%";
        } else {
            EWEB.T.body.style.MozTransform = 'scale(' + (kX / 100) + ')';
        }
        this.qr = kX;
    }
};
function uD() {
    if (C.ai() != "Control") {
        return;
    }
    if (F.as) {
        var fA = EWEB.T.selection.createRange();
        for (var i = 0; i < fA.length; i++) {
            var bg = fA.item(i);
            if (bg.style.position != 'relative') {
                bg.style.position = 'relative';
            } else {
                bg.style.position = 'static';
            }
        }
    } else {
        var bg = C.ax();
        if (bg.style.position != 'relative') {
            bg.style.position = 'relative';
        } else {
            bg.style.position = 'static';
        }
    }
};
function pe(an) {
    if (C.ai() != "Control") {
        return;
    }
    if (F.as) {
        var fA = EWEB.T.selection.createRange();
        for (var i = 0; i < fA.length; i++) {
            var bg = fA.item(i);
            if (an == 'forward') {
                bg.style.zIndex += 1;
            } else {
                bg.style.zIndex -= 1;
            }
            bg.style.position = 'relative';
        }
    } else {
        var bg = C.ax();
        if (an == 'forward') {
            bg.style.zIndex += 1;
        } else {
            bg.style.zIndex -= 1;
        }
        bg.style.position = 'relative';
    }
};
function pl(what) {
    C.Restore();
    EWEB.aR.focus();
    if (C.ai() != "Text") {
        return;
    }
    if (F.as) {
        var bk = EWEB.T.selection;
        var aD = bk.createRange();
        var r = EWEB.T.body.createTextRange();
        var ni = 0;
        while (r.compareEndPoints("StartToStart", aD) < 0) {
            r.moveStart("character", 1);
            ni++;
        }
        var eQ = 0;
        while (r.compareEndPoints("EndToEnd", aD) > 0) {
            r.moveEnd("character", -1);
            eQ--;
        }
        var a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var l, u, gr, kK;
        for (var i = 0; i < 26; i++) {
            l = a[i];
            u = a[i].toUpperCase();
            switch (what) {
            case "uppercase":
                gr = l;
                kK = u;
                break;
            case "lowercase":
                gr = u;
                kK = l;
                break;
            }
            r = aD.duplicate();
            while (r.findText(gr, 0, 4)) {
                r.text = kK;
                r = aD.duplicate();
            }
        }
        r = EWEB.T.body.createTextRange();
        r.moveStart("character", ni);
        r.moveEnd("character", eQ);
        r.select();
    } else {
        nL.og(what);
    }
};
function fq(aN, fN) {
    C.Restore();
    EWEB.aR.focus();
    if (C.ai() != "Text") {
        return;
    }
    if (F.as) {
        var r = EWEB.T.selection.createRange();
        if (r.text == "") {
            var Ds = true;
            var Dg = r.parentElement();
            if (Dg.tagName != "BODY" && Dg.getAttribute("id") != "eWebEditor_FixWidth_DIV") {
                if (Dg.innerHTML == "") {
                    Ds = false;
                }
            }
            if (Ds) {
                var DX = R.Gu(EWEB.T);
                insertHTML("<span id='" + DX + "'>&nbsp;</span>");
                Dg = EWEB.T.getElementById(DX);
            }
            C.vR(Dg);
            C.Collapse(false);
            nD(Dg, aN, fN);
            if (Ds) {
                Dg.removeAttribute("id");
            }
            Dg.innerHTML = "";
            ci.eW();
            return;
        }
        var pi = "eWebEditor_Temp_FontName";
        EWEB.T.execCommand("fontname", "", pi);
        var lm = EWEB.T.body.getElementsByTagName("FONT");
        var by = new Array();
        for (var i = 0; i < lm.length; i++) {
            var dI = lm[i];
            if (dI.getAttribute("face") == pi) {
                by[by.length] = lm[i];
            }
        }
        for (var i = 0; i < by.length; i++) {
            var dI = by[i];
            pg(dI, aN);
            kJ(dI);
            nD(dI, aN, fN);
            dI.removeAttribute("face");
            var bd = dI.parentElement;
            if (bd.tagName == "FONT") {
                lG(bd);
            }
            if ((bd.tagName == "FONT") || (bd.tagName == "SPAN")) {
                if (bd.innerText == dI.innerText) {
                    bd.style.cssText = bd.style.cssText + ";" + dI.style.cssText;
                    bd.innerHTML = dI.innerHTML;
                    by[i] = bd;
                    continue;
                }
            }
        }
        var f1, f2;
        for (var i = 0; i < by.length; i++) {
            if (by[i] && by[i].innerText) {
                if (!f1) {
                    f1 = by[i];
                }
                f2 = by[i];
            }
        }
        var r1 = EWEB.T.body.createTextRange();
        r1.moveToElementText(f1);
        var r2 = EWEB.T.body.createTextRange();
        r2.moveToElementText(f2);
        r.setEndPoint("StartToStart", r1);
        r.setEndPoint("EndToEnd", r2);
        r.select();
    } else {
        if (["uppercase", "lowercase", "size"].IndexOf(aN) >= 0) {
            nL.og(aN, fN);
        } else {
            if (aN == "face") {
                aN = "fontName";
            }
            EWEB.T.execCommand(aN, false, fN);
        }
    }
};
function pg(obj, aN) {
    oM(obj, aN, "");
    var aY = obj.children;
    for (var j = 0; j < aY.length; j++) {
        pg(aY[j], aN);
        if (aY[j].tagName == "FONT") {
            lG(aY[j]);
        }
    }
};
function kJ(obj) {
    var aY = obj.children;
    for (var j = 0; j < aY.length; j++) {
        kJ(aY[j]);
        if ((aY[j].tagName == "FONT") || (aY[j].tagName == "SPAN")) {
            if ((aY[j].style.cssText == "" && aY[j].className == "") || (aY[j].innerHTML == "")) {
                aY[j].removeNode(false);
                kJ(obj);
                return;
            }
        }
    }
};
function nD(obj, aN, v) {
    oM(obj, aN, v);
    var aY = obj.children;
    for (var j = 0; j < aY.length; j++) {
        if ((aY[j].tagName == "SPAN") || (aY[j].tagName == "FONT")) {
            nD(aY[j], aN, v);
        }
    }
};
function oM(obj, aN, v) {
    try {
        switch (aN) {
        case "face":
            obj.style.fontFamily = v;
            break;
        case "size":
            obj.style.fontSize = v;
            break;
        case "color":
            obj.style.color = v;
            break;
        default:
            break;
        }
    } catch(e) {}
};
function lG(el) {
    if (el.style.fontFamily == "") {
        var s = el.getAttribute("face");
        if (s) {
            el.style.fontFamily = s;
        }
    }
    el.removeAttribute("face");
    if (el.style.fontSize == "") {
        var s = el.getAttribute("size");
        s = nq(s);
        if (s) {
            el.style.fontSize = s;
        }
    }
    el.removeAttribute("size");
    if (el.style.color == "") {
        var s = el.getAttribute("color");
        if (s) {
            el.style.color = s;
        }
    }
    el.removeAttribute("color");
};
var nL = (function() {
    var kb, kL, hd, je;
    var bi = [];
    var aB, fp, cL, cO, ft, jU;
    var Fk, FS;
    return {
        og: function(aV, fN) {
            if (C.ai() != "Text") {
                return;
            }
            kL = false;
            kb = false;
            bi.length = 0;
            hd = aV;
            je = fN;
            ft = (hd == "uppercase" || hd == "lowercase") ? true: false;
            jU = false;
            Fk = false;
            FS = false;
            var bk = EWEB.aR.getSelection();
            var aD = bk.getRangeAt(0);
            if (aD.collapsed) {
                if (hd == "size") {
                    var aU = this.ic("&nbsp;", true);
                    aD.insertNode(aU);
                    C.vR(aU.firstChild);
                    return;
                } else {
                    return;
                }
            }
            aB = aD.startContainer;
            fp = aD.endContainer;
            cL = aD.startOffset;
            cO = aD.endOffset;
            if (aB.nodeType == 1) {
                aB = this.oZ(aB);
                if (!aB) {
                    return;
                }
                cL = 0;
            }
            if (fp.nodeType == 1) {
                fp = this.me(fp);
                if (!fp) {
                    return;
                }
                cO = fp.nodeValue.length;
            }
            if (aB == fp) {
                jU = true;
                var fm = aB.nodeValue;
                if (ft) {
                    aB.nodeValue = fm.substring(0, cL) + this.jh(fm.substring(cL, cO)) + fm.substring(cO);
                } else {
                    var ao = aB.parentNode;
                    var pm = fm.substring(0, cL);
                    var oi = fm.substring(cL, cO);
                    var qm = fm.substring(cO);
                    if (ao.tagName.toUpperCase() == "SPAN" && ao.innerHTML == oi) {
                        this.hx(ao);
                    } else {
                        var aU = this.ic(oi);
                        aU.setAttribute("id", "eWebEditor_Temp_Span_FontSize", 0);
                        ao.insertBefore(aU, aB);
                        aB.nodeValue = qm;
                        if (pm) {
                            var kO = EWEB.T.createTextNode(pm);
                            ao.insertBefore(kO, aU);
                        }
                    }
                }
            } else {
                this.jG(aD.commonAncestorContainer);
            }
            if (ft) {
                aD.setStart(aB, cL);
                aD.setEnd(fp, cO);
            } else {
                if (jU) {
                    var ib = EWEB.T.getElementById("eWebEditor_Temp_Span_FontSize");
                    if (ib) {
                        ib.removeAttribute("id");
                        aD.selectNodeContents(ib.firstChild);
                    }
                } else {
                    aD.setStart(aB, cL);
                    aD.setEnd(fp, cO);
                }
            }
            bk.removeAllRanges();
            bk.addRange(aD);
            EWEB.Focus();
        },
        jG: function(el) {
            if (el == aB) {
                kL = true;
            }
            if (kL) {
                if (el == aB) {
                    if (ft) {
                        el.nodeValue = el.nodeValue.substring(0, cL) + this.jh(el.nodeValue.substring(cL));
                    } else {
                        bi[bi.length] = el;
                        Fk = true;
                    }
                } else if (el == fp) {
                    if (ft) {
                        el.nodeValue = this.jh(el.nodeValue.substring(0, cO)) + el.nodeValue.substring(cO);
                    } else {
                        bi[bi.length] = el;
                        FS = true;
                        for (var i = 0; i < bi.length; i++) {
                            if (!bi[i].nodeValue || bi[i].nodeValue == "\n") {
                                continue;
                            }
                            if (i == 0) {
                                var ao = bi[i].parentNode;
                                if ((ao.tagName.toUpperCase() == "SPAN") && (bi[i].nodeValue.substring(cL) == ao.innerHTML)) {
                                    this.hx(ao);
                                } else {
                                    var v = bi[i].nodeValue.substring(cL);
                                    if (v) {
                                        var aU = this.ic(v);
                                        ao.insertBefore(aU, bi[i].nextSibling);
                                        bi[i].nodeValue = bi[i].nodeValue.substring(0, cL);
                                        if (Fk) {
                                            aB = aU.childNodes[0];
                                            cL = 0;
                                        }
                                    }
                                }
                            } else if (i == bi.length - 1) {
                                var ao = bi[i].parentNode;
                                if ((ao.tagName.toUpperCase() == "SPAN") && (bi[i].nodeValue.substring(0, cO) == ao.innerHTML)) {
                                    this.hx(ao);
                                } else {
                                    var v = bi[i].nodeValue.substring(0, cO);
                                    if (v) {
                                        var aU = this.ic(v);
                                        ao.insertBefore(aU, bi[i]);
                                        if (FS) {
                                            fp = aU.childNodes[0];
                                        }
                                        bi[i].nodeValue = bi[i].nodeValue.substring(cO);
                                    }
                                }
                            } else {
                                var ao = bi[i].parentNode;
                                if ((ao.tagName.toUpperCase() == "SPAN") && (bi[i].nodeValue == ao.innerHTML)) {
                                    this.hx(ao);
                                } else {
                                    var aU = this.ic(bi[i].nodeValue);
                                    ao.replaceChild(aU, bi[i]);
                                }
                            }
                        }
                    }
                    kb = true;
                } else if (el.nodeType == 3) {
                    if (ft) {
                        el.nodeValue = this.jh(el.nodeValue);
                    } else {
                        bi[bi.length] = el;
                    }
                }
            }
            if (el.hasChildNodes()) {
                for (var i = 0; i < el.childNodes.length; i++) {
                    if (kb) {
                        return;
                    }
                    this.jG(el.childNodes[i]);
                }
            }
        },
        jh: function(bM) {
            switch (hd) {
            case "uppercase":
                return bM.toUpperCase();
                break;
            case "lowercase":
                return bM.toLowerCase();
                break;
            case "size":
                return "<span id=\"eWebEditor_Temp_Span_FontSize\" style=\"font-size:" + je + "\">" + bM + "</span>";
                break;
            }
        },
        ic: function(bE, pB) {
            var kk = EWEB.T.createElement("span");
            if (pB) {
                kk.innerHTML = bE;
            } else {
                var kO = EWEB.T.createTextNode(bE);
                kk.appendChild(kO);
            }
            this.hx(kk);
            return kk;
        },
        hx: function(el) {
            switch (hd) {
            case "size":
                el.style.fontSize = je;
                break;
            case "face":
                el.style.fontName = je;
                break;
            }
        },
        oZ: function(el) {
            if (el.nodeType == 3) {
                return el;
            }
            if (el.hasChildNodes()) {
                for (var i = 0; i < el.childNodes.length; i++) {
                    var bz = this.oZ(el.childNodes[i]);
                    if (bz) {
                        return bz;
                    }
                }
            }
            return null;
        },
        me: function(el) {
            var bz;
            if (el.nodeType == 3) {
                bz = el;
            }
            if (el.hasChildNodes()) {
                for (var i = 0; i < el.childNodes.length; i++) {
                    var mj = this.me(el.childNodes[i]);
                    if (mj) {
                        bz = mj;
                    }
                }
            }
            if (bz) {
                return bz;
            } else {
                return null;
            }
        }
    };
})();
var hZ = {
    Execute: function(aN) {
        if (C.ai() == "Control") {
            if (aN == "justifyleft" || aN == "justifyright" || aN == "justifycenter") {
                var bg = C.ax();
                bg.align = aN.substr(7);
            }
            if (aN != "justifyleft" && aN != "justifyright") {
                EWEB.T.execCommand(aN, false, null);
            }
        } else {
            var a = C.dh(["P", "DIV", "TD", "TH"]);
            if (a.length > 0) {
                for (var i = 0; i < a.length; i++) {
                    p = a[i];
                    if (aN == "justifyfull") {
                        p.style.textAlign = "justify";
                        p.style.textJustify = "inter-ideograph";
                    } else {
                        p.style.textAlign = aN.substr(7);
                        p.style.textJustify = "";
                    }
                    p.removeAttribute("align");
                }
            } else {
                EWEB.T.execCommand(aN, false, null);
            }
        }
        EWEB.Focus();
        ci.eW();
    }
};
var kC = new Object();
kC.Execute = function(aN) {
    var iu = false;
    if (F.as) {
        var np = function() {
            iu = true;
        };
        var pY = 'on' + aN.toLowerCase();
        EWEB.T.body.attachEvent(pY, np);
        EWEB.T.execCommand(aN, false, null);
        EWEB.T.body.detachEvent(pY, np);
    } else {
        try {
            iu = EWEB.T.execCommand(aN, false, null);
        } catch(e) {}
    }
    if (!iu) {
        if (config.AutoDetectPaste == "1") {
            FT.wQ("isinstalled", [true],
            function(hT) {
                if (!hT["Ret"]) {
                    return;
                } else {
                    var V = getSelectedHTML();
                    var bE = getSelectedText();
                    FT.wQ("setclipboard", ["html", V, bE]);
                    if (aN == "Cut") {
                        exec("delete");
                    }
                }
            });
        } else {
            alert(lang['MsgSafe' + aN]);
        }
    }
};
var kQ = new Object();
kQ.Execute = function() {
    var bQ = window.frameElement;
    var kN = parent.document.documentElement;
    var hm = parent.document.body.style;
    var bd;
    if (!this.hM) {
        R.az(parent, 'resize', iR);
        this.oJ = R.gL(parent);
        this.ug = R.oE(bQ);
        bd = bQ;
        while ((bd = bd.parentNode)) {
            if (bd.nodeType == 1) {
                bd._ewebSavedStyles = R.oE(bd);
            }
        }
        if (F.as) {
            this.ss = kN.style.overflow;
            kN.style.overflow = 'hidden';
            hm.overflow = 'hidden';
        } else {
            hm.overflow = 'hidden';
            hm.width = '0px';
            hm.height = '0px';
        }
        var hl = R.eF(parent);
        bQ.style.position = "absolute";
        bQ.offsetLeft;
        bQ.style.zIndex = 9998;
        bQ.style.left = "0px";
        bQ.style.top = "0px";
        bQ.style.width = hl.Width + "px";
        bQ.style.height = hl.Height + "px";
        bQ.style.boxSizing = "content-box";
        if (!F.as) {
            bQ.style.borderRight = bQ.style.borderBottom = "9999px solid white";
            bQ.style.backgroundColor = "white";
        }
        parent.scrollTo(0, 0);
        var gz = R.vU(parent, bQ);
        var Km = BW(R.ce(bQ, "border-left-width"));
        var Kv = BW(R.ce(bQ, "border-top-width"));
        var Is = -1 * gz.x - Km;
        var Ib = -1 * gz.y - Kv;
        if (Is != 0) {
            bQ.style.left = Is + "px";
        }
        if (Ib != 0) {
            bQ.style.top = Ib + "px";
        }
        this.hM = true;
    } else {
        R.hf(parent, 'resize', iR);
        bd = bQ;
        while ((bd = bd.parentNode)) {
            if (bd._ewebSavedStyles) {
                R.lO(bd, bd._ewebSavedStyles);
                bd._ewebSavedStyles = null;
            }
        }
        if (F.as) {
            kN.style.overflow = this.ss;
        }
        R.lO(bQ, this.ug);
        parent.scrollTo(this.oJ.X, this.oJ.Y);
        this.hM = false;
    }
    var HF = $("eWebEditor_SB_Size");
    if (HF) {
        HF.style.display = this.hM ? "none": "";
    }
    this.eD();
    if (EWEB.ae == "EDIT" && !F.as) {
        EWEB.lo();
    }
    EWEB.Focus();
};
kQ.eD = function() {
    ci.nT("other", "Maximize", this.hM);
};
function iR() {
    var hl = R.eF(parent);
    var bQ = window.frameElement;
    bQ.style.width = hl.Width + 'px';
    bQ.style.height = hl.Height + 'px';
};
function Ht() {
    if (!HB()) {
        return;
    }
    if (FT.FD()) {
        return;
    }
    FT.wQ("isinstalled", [true],
    function(hT) {
        if (!hT["Ret"]) {
            FT.jT(false);
            return;
        }
        JM();
    });
};
function JM() {
    var cT = "[mathfloweditor]";
    if (aA.EQType) {
        cT = aA.EQType;
    }
    var bu = "type:" + cT + ";";
    switch (cT) {
    case "simpleeditor":
        bu += "width:536;height:300;";
        break;
    case "styleeditor":
        bu += "width:570;height:300;";
        break;
    case "structureeditor":
        bu += "width:570;height:600;";
        break;
    default:
        alert("Not Installed!");
        FT.jT(false);
        return;
        break;
    }
    var Iz = "dB";
    var bn = "";
    var Hz = "";
    var qA = 9;
    var IE = 11;
    var iZ = "";
    if (C.ai() == "Control") {
        var bg = C.ax();
        if (bg.tagName == "IMG" && bg.getAttribute("_tag", 2) == "math") {
            Iz = "edit";
            Hz = bg.getAttribute("_mathml", 2);
            if (!Hz) {
                Hz = ""
            }
            bn = bg.getAttribute("_pointsize", 2);
            if (!bn) {
                bn = ""
            }
        } else {
            iZ = R.ce(bg.parentNode, "font-size");
            var kU = nq(iZ);
            if (kU) {
                iZ = kU;
            }
        }
    } else {
        var iZ = C.BA();
    }
    if (Iz == "dB") {
        iZ = iZ.toLowerCase();
        var lW = parseFloat(iZ);
        if (isNaN(lW)) {
            bn = IE + "";
        } else {
            if (iZ.indexOf("px") > 0) {
                lW = lW * 3 / 4;
            }
            lW = parseInt(lW + 0.5);
            if (lW < qA) {
                lW = qA;
            }
            bn = lW + "";
        }
    }
    bu += "action:" + Iz + ";pointsize:" + bn + ";";
    FT.wQ("showeq", [Hz, bu],
    function(hT) {
        if (hT["Error"] == "nojre") {
            FT.jT(false);
            aK("installjre.htm", true);
            return;
        }
        if (hT["Error"] == "cancel") {
            FT.jT(false);
            return;
        }
        if (FT.Fi(hT["Error"])) {
            FT.jT(false);
            return;
        }
        var fh = hT["Body"];
        insertHTML(fh);
        FT.jT(false);
        ap.jO();
        ap.Save();
        var wx = fh.replace(/.*<img\s[^>]*?src=\"([^\"]+?)\"[^>]*?>.*/gi, "$1");
        if (wx != fh) {
            addUploadFile("", wx);
        }
    });
};
function ue() {
    if (!HB()) {
        return;
    }
    if (FT.FD()) {
        return;
    }
    FT.wQ("isinstalled", [true],
    function(hT) {
        if (!hT["Ret"]) {
            FT.jT(false);
            return;
        }
        FT.wQ("capture", [""],
        function(hT) {
            if (hT["Error"] == "cancel") {
                FT.jT(false);
                return;
            }
            if (FT.Fi(hT["Error"])) {
                FT.jT(false);
                return;
            }
            var fh = hT["Body"];
            insertHTML(fh);
            FT.jT(false);
            ap.jO();
            ap.Save();
            var wx = fh.replace(/.*<img\s[^>]*?src=\"([^\"]+?)\"[^>]*?>.*/gi, "$1");
            if (wx != fh) {
                addUploadFile("", wx);
            }
        });
    });
};
function oX() {
    if (config.AutoDetectPaste == "2") {
        window.setTimeout("ix()", 10);
        return;
    }
    if (config.AutoDetectPaste == "1") {
        FT.wQ("isinstalled", [true],
        function(hT) {
            if (!hT["Ret"]) {
                return false;
            }
            Hv();
        });
    } else {
        if (F.EY) {
            mB();
        } else {
            aK("pastegecko.htm");
        }
    }
};
function Hv() { //标记
    FT.wQ("getclipboard", ["flag"],
    function(hT) {
        var an = hT["Ret"];
        var fB = an.split("|");
        if (fB[5] == "1") {
            kF();
            return;
        } else if (fB[5] == "2") {
            uH();
            return;
        } else if (fB[5] == "3") {
            if (FT.FD()) {
                return;
            }
            FT.wQ("getclipboard", ["wps"],
            function(hT) {
                var fh = hT["Ret"];
                FT.wQ("localupload", [fh],
                function(hT) {
                    Ec(hT, "dB");
                });
            });
            return;
        } else if (fB[5] == "4") {
            if (FT.FD()) {
                return;
            }
            FT.wQ("getclipboard", ["et"],
            function(hT) {
                var fh = hT["Ret"];
                FT.wQ("localupload", [fh],
                function(hT) {
                    Ec(hT, "dB");
                });
            });
            return;
        } else if (fB[0] == "1" || fB[3] == "1") {
            tG(an);
            return;
        } else if (fB[4] == "1") {
            FT.wQ("getclipboard", ["html"],
            function(hT) {
                var fh = hT["Ret"];
                insertHTML(fh);
            });
            return;
        } else if (fB[1] == "1") {
            FT.wQ("getclipboard", ["text"],
            function(hT) {
                var fh = FM(hT["Ret"]);
                insertHTML(fh);
            });
            return;
        } else {
            return;
        }
    });
};
function mB() {
    var V = sD();
    insertHTML(V);
};
function tG(an) {
    if (config.AutoDonePasteOption) {
        aK("pasteoption.htm?autodone=1&flag=" + an, true, false, true);
    } else {
        aK("pasteoption.htm?flag=" + an, true);
    }
};
function kF() {
    if (config.AutoDonePasteWord) {
        aK("importword.htm?action=paste&autodone=1", true, false, true);
    } else {
        aK("importword.htm?action=paste", true);
    }
};
function uH() {
    if (config.AutoDonePasteExcel) {
        aK("importexcel.htm?action=paste&autodone=1", true, false, true);
    } else {
        aK("importexcel.htm?action=paste", true);
    }
};
function ix() {
    if (F.EY) {
        var fh = FM(clipboardData.getData("Text"));
        insertHTML(fh);
    } else {
        if (config.AutoDetectPaste == "1") {
            FT.wQ("isinstalled", [true],
            function(hT) {
                if (hT["Ret"]) {
                    FT.wQ("getclipboard", ["text"],
                    function(hT) {
                        var fh = FM(hT["Ret"]);
                        insertHTML(fh);
                    });
                } else {
                    return;
                }
            });
        } else {
            if (F.qJ) {
                aK("pastegecko.htm?action=text");
            } else {
                FT.wQ("isinstalled", [false],
                function(hT) {
                    if (hT["Ret"]) {
                        FT.wQ("getclipboard", ["text"],
                        function(hT) {
                            var fh = FM(hT["Ret"]);
                            insertHTML(fh);
                        });
                    } else {
                        aK("pastegecko.htm?action=text");
                    }
                });
            }
        }
    }
};
function sD() {
    var cR = $("eWebEditor_Temp_HTML");
    cR.innerHTML = "";
    var mP = document.body.createTextRange();
    mP.moveToElementText(cR);
    mP.execCommand("Paste");
    var V = cR.innerHTML;
    cR.innerHTML = "";
    return V;
};
var kh = {
    Execute: function() {
        this.gN();
        this.cV = !this.cV;
        this.eD();
    },
    jJ: function() {
        this.gN();
        if (this.cV) {
            this.eD();
        }
    },
    gN: function() {
        if (typeof(this.cV) == "undefined") {
            this.cV = (config.ShowBorder == "0") ? false: true;
        }
    },
    eD: function() {
        var K = EWEB.T.getElementsByTagName("TABLE");
        for (var i = 0; i < K.length; i++) {
            var el = K[i];
            if (this.cV) {
                el.className += ' ewebeditor__showtableborders';
            } else {
                el.className = el.className.replace(/(^| )ewebeditor__showtableborders/gi, '');
            }
        }
        ci.nT("other", "ShowBorders", this.cV);
    }
};
var jK = {
    Execute: function() {
        this.gN();
        this.cV = !this.cV;
        this.eD();
    },
    jJ: function() {
        this.gN();
        if (this.cV) {
            this.eD();
        }
    },
    gN: function() {
        if (typeof(this.cV) == "undefined") {
            this.cV = (config.ShowBlock == "1") ? true: false;
        }
    },
    eD: function() {
        var dK = EWEB.T.body;
        if (this.cV) {
            dK.className += ' ewebeditor__showblocks';
        } else {
            dK.className = dK.className.replace(/(^| )ewebeditor__showblocks/gi, '');
        }
        ci.nT("other", "ShowBlocks", this.cV);
    }
};
var vp = (function() {
    var cV = false;
    var xe;
    var yS;
    var CB;
    var BG;
    var CP;
    var Cj;
    var BD;
    var Bb;
    var nV;
    var qq;
    var BV = function() {
        ci.nT("other", "FormatBrush", cV);
    };
    var fi = function(aV) {
        var v;
        switch (aV) {
        case "fontsize":
            v = C.BA();
            break;
        case "bold":
        case "italic":
        case "underline":
        case "strikethrough":
        case "superscript":
        case "subscript":
            v = EWEB.T.queryCommandState(aV);
            break;
        case "fontname":
            v = EWEB.T.queryCommandValue(aV);
            break;
        case "forecolor":
        case "backcolor":
            if (!F.as && !F.AM && aV == "backcolor") {
                aV = "hiliteColor";
            }
            v = EWEB.T.queryCommandValue(aV);
            if (F.as) {
                v = BZ(v);
            }
            break;
        }
        if (v == null) {
            v = "";
        }
        return v;
    };
    var BZ = function(CG) {
        if (CG == null) {
            return "";
        }
        var aQ = CG.toString(16);
        switch (aQ.length) {
        case 1:
            aQ = "0" + aQ + "0000";
            break;
        case 2:
            aQ = aQ + "0000";
            break;
        case 3:
            aQ = aQ.substring(1, 3) + "0" + aQ.substring(0, 1) + "00";
            break;
        case 4:
            aQ = aQ.substring(2, 4) + aQ.substring(0, 2) + "00";
            break;
        case 5:
            aQ = aQ.substring(3, 5) + aQ.substring(1, 3) + "0" + aQ.substring(0, 1);
            break;
        case 6:
            aQ = aQ.substring(4, 6) + aQ.substring(2, 4) + aQ.substring(0, 2);
            break;
        default:
            aQ = "";
        }
        return '#' + aQ;
    };
    var lK = function(BQ, aV) {
        var CJ = fi(aV);
        if (BQ != CJ) {
            format(aV);
        }
        if (!BQ && !CJ) {
            format(aV);
            format(aV);
        }
    };
    return {
        Es: function() {
            return cV;
        },
        Execute: function() {
            if (!cV) {
                xe = fi("fontname");
                yS = fi("fontsize");
                CB = fi("bold");
                BG = fi("italic");
                CP = fi("underline");
                Cj = fi("strikethrough");
                BD = fi("superscript");
                Bb = fi("subscript");
                nV = fi("forecolor");
                qq = fi("backcolor");
            }
            cV = !cV;
            BV();
        },
        Stop: function() {
            if (!cV) {
                return;
            }
            cV = false;
            BV();
        },
        Di: function() {
            if (!cV) {
                return;
            }
            if (C.ai() != "Text") {
                return;
            }
            var AY;
            if (F.as) {
                AY = C.bG().createRange().text;
            } else {
                AY = C.bG() + "";
            }
            if (!AY) {
                return;
            }
            if (xe && xe != fi("fontname")) {
                fq('face', xe);
            }
            lK(CB, "bold");
            lK(BG, "italic");
            lK(CP, "underline");
            lK(Cj, "strikethrough");
            lK(BD, "superscript");
            lK(Bb, "subscript");
            if (nV && nV != fi("forecolor")) {
                if (F.as) {
                    fq('color', nV);
                } else {
                    fq('forecolor', nV);
                }
            }
            if (qq && qq != fi("backcolor")) {
                if (F.as) {
                    format('backcolor', qq);
                } else {
                    format('hiliteColor', qq);
                }
            }
            if (yS && yS != fi("fontsize")) {
                fq('size', yS);
            }
            ap.jO();
            ap.Save();
        }
    };
})();
function Bw() {
    if (!hH()) {
        return;
    }
    aK('imagedoc.htm', true);
};
function ow(an) {
    if (!HB()) {
        return;
    }
    switch (an) {
    case "word":
        aK('importword.htm', true);
        break;
    case "excel":
        aK('importexcel.htm', true);
        break;
    case "ppt":
        aK('importppt.htm', true);
        break;
    }
};
var eO = {
    fv: function(an) {
        switch (an) {
        case "inputtext":
            insertHTML('<input type="text">');
            break;
        case "textarea":
            insertHTML('<textarea></textarea>');
            break;
        case "radio":
            insertHTML('<input type="radio">');
            break;
        case "checkbox":
            insertHTML('<input type="checkbox">');
            break;
        case "select":
            insertHTML('<select></select>');
            break;
        case "button":
            insertHTML('<input type="button">');
            break;
        }
    }
};
function tp() {
    EWEB.aR.print();
};
var R = new Object();
R.Clone = function(obj) {
    var le;
    if (obj && (obj instanceof Array)) {
        le = [];
        for (var i = 0; i < obj.length; i++) {
            le[i] = this.Clone(obj[i]);
        }
        return le;
    }
    if (obj === null || (typeof(obj) != 'object') || (obj instanceof String) || (obj instanceof Number) || (obj instanceof Boolean) || (obj instanceof Date) || (obj instanceof RegExp)) {
        return obj;
    }
    le = new obj.constructor();
    for (var hO in obj) {
        var property = obj[hO];
        le[hO] = this.Clone(property);
    }
    return le;
};
R.fR = function(J) {
    return ("CSS1Compat" == (J.compatMode || (F.ik ? "CSS1Compat": null)));
};
R.hh = function(kG) {
    kG.style.cssText = "margin:0;" + "padding:0;" + "border:0;" + "background-color:transparent;" + "background-image:none;";
};
R.dV = function(kG) {
    return kG.ownerDocument || kG.document;
};
R.mh = function(kG) {
    return this.mD(this.dV(kG));
};
R.mD = function(J) {
    return J.parentWindow || J.defaultView;
};
R.lJ = function() {
    var jC = window.parent;
    while (jC.parent && jC.parent != jC) {
        try {
            if (jC.parent.document.domain != document.domain) {
                break;
            }
            if (jC.parent.document.getElementsByTagName("frameset").length > 0) {
                break;
            }
        } catch(e) {
            break;
        }
        jC = jC.parent;
    }
    return jC;
};
R.hg = function(w, node) {
    var x = 0;
    var y = 0;
    var bN = node;
    var ku = null;
    var hn = R.mh(bN);
    while (bN && !(hn == w && (bN == w.document.body || bN == w.document.documentElement))) {
        x += bN.offsetLeft - bN.scrollLeft;
        y += bN.offsetTop - bN.scrollTop;
        if (!F.jr) {
            var fr = ku;
            while (fr && fr != bN) {
                x -= fr.scrollLeft;
                y -= fr.scrollTop;
                fr = fr.parentNode;
            }
        }
        ku = bN;
        if (bN.offsetParent) {
            bN = bN.offsetParent;
        } else {
            if (hn != w) {
                bN = hn.frameElement;
                ku = null;
                if (bN) {
                    hn = bN.contentWindow.parent;
                }
            } else {
                bN = null;
            }
        }
    }
    if (R.ce(w.document.body, 'position') != 'static' || (F.as && R.vN(node) == null)) {
        x += w.document.body.offsetLeft;
        y += w.document.body.offsetTop;
    }
    return {
        "x": x,
        "y": y
    };
};
R.vU = function(vY, bz) {
    var Bh = this.hg(vY, bz);
    var Bm = R.gL(vY);
    Bh.x -= Bm.X;
    Bh.y -= Bm.Y;
    return Bh;
};
R.zD = function(kG, Bq) {
    var vY = this.mh(kG);
    var Bz = this.eF(vY).Height;
    var ro = Bz * -1;
    if (Bq === false) {
        ro += kG.offsetHeight || 0;
        ro += parseInt(this.ce(kG, 'marginBottom') || 0, 10) || 0;
    }
    var st = this.hg(vY, kG);
    ro += st.y;
    var rf = this.gL(vY).Y;
    if (ro > 0 && (ro > rf || ro < rf - Bz)) {
        vY.scrollTo(0, ro);
    }
};
R.ns = function(nH) {
    if (!nH || nH.nodeType != 1 || nH.tagName.toLowerCase() != 'form') {
        return [];
    }
    var kz = [];
    var Bl = ['style', 'className'];
    for (var i = 0; i < Bl.length; i++) {
        var ay = Bl[i];
        if (nH.elements.namedItem(ay)) {
            var BS = nH.elements.namedItem(ay);
            kz.push([BS, BS.nextSibling]);
            nH.removeChild(BS);
        }
    }
    return kz;
};
R.lU = function(pU, kz) {
    if (!pU || pU.nodeType != 1 || pU.tagName.toLowerCase() != 'form') {
        return;
    }
    if (kz.length > 0) {
        for (var i = kz.length - 1; i >= 0; i--) {
            var bz = kz[i][0];
            var Cs = kz[i][1];
            if (Cs) {
                pU.insertBefore(bz, Cs);
            } else {
                pU.appendChild(bz);
            }
        }
    }
};
R.vN = function(kG) {
    var oU = kG;
    while (oU != R.dV(oU).documentElement) {
        if (this.ce(oU, 'position') != 'static') {
            return oU;
        }
        oU = oU.parentNode;
    }
    return null;
};
R.oQ = function(qX, Ba, tO, rE, BY) {
    return (BY || window).setTimeout(function() {
        if (rE) {
            qX.apply(tO, [].concat(rE));
        } else {
            qX.apply(tO);
        }
    },
    Ba);
};
R.za = function(qX, tO, rE, BY) {
    if (qX) {
        this.oQ(qX, 0, tO, rE, BY);
    }
};
R.cP = function(kG, Cr) {
    var Cb = kG.style;
    for (var rr in Cr) {
        Cb[rr] = Cr[rr];
    }
};
R.kx = function(kG, Cr) {
    if (kG.hasChildNodes()) {
        for (var i = 0; i < kG.childNodes.length; i++) {
            var bz = kG.childNodes[i];
            if (bz.nodeType == 1) {
                this.cP(bz, Cr);
                this.kx(bz, Cr);
            }
        }
    }
};
R.cE = function(bz, CQ) {
    if (CQ) {
        var mz;
        while ((mz = bz.firstChild)) {
            bz.parentNode.insertBefore(bz.removeChild(mz), bz);
        }
    }
    return bz.parentNode.removeChild(bz);
};
R.tz = function(bz, mL) {
    while (bz && bz.tagName && bz.tagName != "BODY") {
        if (bz.tagName.toUpperCase() == mL) {
            return bz;
        }
        bz = bz.parentNode;
    }
    return null;
};
R.Gu = function(J) {
    if (!this.DU) {
        this.DU = 1;
    }
    var sB = "eWebEditor_tmp_" + this.DU;
    if (J.getElementById(sB)) {
        this.DU++;
        return this.Gu(J);
    }
    this.DU++;
    return sB;
};
R.lE = function(hS) {
    hS.$ = function(Cu) {
        return hS.document.getElementById(Cu);
    };
};
R.iO = function() {
    if (F.as) {
        if (F.xZ) {
            return "javascript: '';";
        } else {
            return "";
        }
    } else {
        if (F.eo) {
            return "";
        } else {
            return "javascript: void(0);";
        }
    }
};
R.aw = function(e) {
    if (F.as) {
        try {
            e.returnValue = false;
            e.cancelBubble = true;
            e.keyCode = 0;
        } catch(er) {}
        return false;
    } else {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
};
R.az = function(jP, pY, Ia) {
    if (F.as) {
        jP.attachEvent("on" + pY, Ia);
    } else {
        jP.addEventListener(pY, Ia, false);
    }
};
R.hf = function(jP, pY, Ia) {
    if (F.as) {
        jP.detachEvent("on" + pY, Ia);
    } else {
        jP.removeEventListener(pY, Ia, false);
    }
};
R.eF = function(vY) {
    if (F.as) {
        var nm;
        var cl = vY.document.documentElement;
        if (cl && cl.clientWidth) {
            nm = cl;
        } else {
            nm = vY.document.body;
        }
        if (nm) {
            return {
                Width: nm.clientWidth,
                Height: nm.clientHeight
            };
        } else {
            return {
                Width: 0,
                Height: 0
            };
        }
    } else {
        return {
            Width: vY.innerWidth,
            Height: vY.innerHeight
        };
    }
};
R.gL = function(BM) {
    if (F.as) {
        var cl = BM.document;
        var fs = {
            X: cl.documentElement.scrollLeft,
            Y: cl.documentElement.scrollTop
        };
        if (fs.X > 0 || fs.Y > 0) {
            return fs;
        }
        return {
            X: cl.body.scrollLeft,
            Y: cl.body.scrollTop
        };
    } else {
        return {
            X: BM.pageXOffset,
            Y: BM.pageYOffset
        };
    }
};
R.rN = function(kG, qs) {
    if (F.as && !F.BX) {
        qs = Math.round(qs * 100);
        kG.style.filter = (qs > 100 ? "": "progid:DXImageTransform.Microsoft.Alpha(opacity=" + qs + ")");
    } else {
        kG.style.opacity = qs;
    }
};
R.ce = function(kG, hO) {
    if (F.as) {
        hO = hO.replace(/\-(\w)/g,
        function(CC, p1) {
            return p1.toUpperCase();
        });
        return kG.currentStyle[hO];
    } else {
        try {
            return kG.ownerDocument.defaultView.getComputedStyle(kG, "").getPropertyValue(hO);
        } catch(e) {}
    }
};
R.ko = function(kG) {
    if (F.EY) {
        kG.unselectable = 'on';
        kG.setAttribute("unselectable", "on");
        var e, i = 0;
        while ((e = kG.children[i++])) {
            if (e.getAttribute('eweb_donotdisableselect', 2) == 'true') {
                continue;
            }
            switch (e.tagName) {
            case 'IFRAME':
            case 'TEXTAREA':
            case 'INPUT':
            case 'SELECT':
                break;
            default:
                this.ko(e);
            }
        }
    } else {
        if (F.jo) {
            kG.style.MozUserSelect = '-moz-none';
        } else if (F.eo) {
            kG.style.msUserSelect = 'none';
        } else if (F.ik) {
            kG.style.KhtmlUserSelect = 'none';
        } else {
            kG.style.userSelect = 'none';
        }
        var K = kG.getElementsByTagName("*");
        for (var i = 0; i < K.length; i++) {
            switch (K[i].tagName) {
            case "INPUT":
            case "TEXTAREA":
                if (F.jo) {
                    K[i].style.MozUserSelect = 'text';
                } else if (F.eo) {
                    K[i].style.msUserSelect = 'text';
                } else if (F.ik) {
                    K[i].style.KhtmlUserSelect = 'text';
                } else {
                    K[i].style.userSelect = 'text';
                }
                break;
            default:
            }
        }
    }
};
R.oE = function(kG) {
    var Cp = R.ns(kG);
    var fE = new Object();
    if (kG.className.length > 0) {
        fE.Class = kG.className;
        kG.className = '';
    }
    if (F.as) {
        var nk = kG.style.cssText;
        if (nk.length > 0) {
            fE.Inline = nk;
            kG.style.cssText = '';
        }
        kG.style.position = 'static';
    } else {
        var nk = kG.getAttribute('style');
        if (nk && nk.length > 0) {
            fE.Inline = nk;
            kG.setAttribute('style', '', 0);
        }
    }
    R.lU(kG, Cp);
    return fE;
};
R.lO = function(kG, fE) {
    var Cp = R.ns(kG);
    if (F.as) {
        kG.className = fE.Class || '';
        kG.style.cssText = fE.Inline || '';
    } else {
        kG.className = fE.Class || '';
        if (fE.Inline) {
            kG.setAttribute('style', fE.Inline, 0);
        } else {
            kG.removeAttribute('style', 0);
        }
    }
    R.lU(kG, Cp);
};
R.FormatDate = function(GP, Hh) {
    var GT = {
        "M+": GP.getMonth() + 1,
        "d+": GP.getDate(),
        "h+": GP.getHours(),
        "m+": GP.getMinutes(),
        "s+": GP.getSeconds(),
        "q+": Math.floor((GP.getMonth() + 3) / 3),
        "S+": GP.getMilliseconds()
    };
    if (/(y+)/i.test(Hh)) {
        Hh = Hh.replace(RegExp.$1, (GP.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in GT) {
        if (new RegExp("(" + k + ")").test(Hh)) {
            var s = "00" + GT[k];
            var n = RegExp.$1.length;
            var v = (n == 1) ? GT[k] : s.substr(s.length - n);
            Hh = Hh.replace(RegExp.$1, v);
        }
    }
    return Hh;
};
var C = new Object();
C.lF = function(eE) {
    var FX = function(a, s) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == s) {
                return i;
            }
        }
        return - 1;
    };
    var el = null;
    if (C.ai() != "Control") {
        el = C.cI();
        if (el.tagName == "HTML") {
            return null;
        }
        while (FX(eE, el.tagName.toUpperCase()) < 0) {
            if (el.tagName.toUpperCase() == "BODY") {
                el = null;
                break;
            }
            el = el.parentNode;
        }
    }
    return el;
};
C.ai = function() {
    if (F.as) {
        try {
            var DZ = C.bG().type;
            if (DZ == 'Control' || DZ == 'Text') {
                return DZ;
            }
            if (this.bG().createRange().parentElement) {
                return 'Text';
            }
        } catch(e) {}
        return 'None';
    } else {
        var cT = 'Text';
        var Dr = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1
        };
        var Bd;
        try {
            Bd = this.bG();
        } catch(e) {}
        if (Bd && Bd.rangeCount == 1) {
            var nr = Bd.getRangeAt(0);
            this.FY(nr);
            if (nr.startContainer == nr.endContainer && (nr.endOffset - nr.startOffset) == 1 && nr.startContainer.nodeType == 1 && Dr[nr.startContainer.childNodes[nr.startOffset].nodeName.toLowerCase()]) {
                cT = 'Control';
            }
        }
        return cT;
    }
};
C.FY = function(nr) {
    if (F.eo && (!nr.collapsed)) {
        var Ek = nr.startContainer;
        var CS;
        if (Ek.nodeType == 3) {
            if (nr.startOffset == Ek.nodeValue.length) {
                CS = Ek.nextSibling;
            }
        } else {
            CS = Ek.childNodes[nr.startOffset];
        }
        var Dk = nr.endContainer;
        var EB;
        if (Dk.nodeType == 3) {
            if (nr.endOffset == 0) {
                EB = Dk.previousSibling;
            }
        } else {
            if (nr.endOffset > 0) {
                EB = Dk.childNodes[nr.endOffset - 1];
            }
        }
        if (CS && CS.nodeType == 1 && CS == EB && CS.tagName == "IMG") {
            nr.selectNode(CS);
        }
    }
};
C.ax = function() {
    if (F.as) {
        if (this.ai() == 'Control') {
            var oRange = this.bG().createRange();
            if (oRange && oRange.item) {
                return this.bG().createRange().item(0);
            }
        }
        return null;
    } else {
        var selection = !!EWEB.aR && this.bG();
        if (!selection || selection.rangeCount < 1) {
            return null;
        }
        var range = selection.getRangeAt(0);
        this.FY(range);
        if (range.startContainer != range.endContainer || range.startContainer.nodeType != 1 || range.startOffset != range.endOffset - 1) {
            return null;
        }
        var node = range.startContainer.childNodes[range.startOffset];
        if (node.nodeType != 1) {
            return null;
        }
        return node;
    }
};
C.cI = function() {
    if (F.as) {
        switch (this.ai()) {
        case 'Control':
            var el = C.ax();
            return el ? el.parentElement: null;
        case 'None':
            return null;
        default:
            return this.bG().createRange().parentElement();
        }
    } else {
        if (this.ai() == 'Control') {
            return C.ax().parentNode;
        } else {
            var af = this.bG();
            if (af && af.rangeCount > 0) {
                var oRange = af.getRangeAt(0);
                if (af.anchorNode && af.anchorNode == af.focusNode) {
                    if (oRange.collapsed || oRange.startContainer.nodeType == 3) {
                        return af.anchorNode.parentNode;
                    } else {
                        return af.anchorNode;
                    }
                }
                return oRange.commonAncestorContainer;
            }
        }
        return null;
    }
};
C.xt = function(AZ) {
    if (F.as) {
        switch (this.ai()) {
        case 'Control':
            var el = C.ax();
            return el ? el.parentElement: null;
        case 'None':
            return null;
        default:
            var J = EWEB.T;
            var fA = J.selection.createRange();
            fA.collapse(AZ !== false);
            var el = fA.parentElement();
            return R.dV(el) == J ? el: null;
        }
    } else {
        if (!EWEB.aR) {
            return null;
        }
        if (this.ai() == 'Control') {
            return C.ax().parentNode;
        } else {
            var af = this.bG();
            if (af && af.rangeCount > 0) {
                var fA = af.getRangeAt(AZ ? 0 : (af.rangeCount - 1));
                var kG = AZ ? fA.startContainer: fA.endContainer;
                return (kG.nodeType == 1 ? kG: kG.parentNode);
            }
        }
        return null;
    }
};
C.vR = function(bz) {
    if (F.as) {
        EWEB.Focus();
        this.bG().empty();
        var oRange;
        try {
            oRange = EWEB.T.body.createControlRange();
            oRange.addElement(bz);
        } catch(e) {
            oRange = EWEB.T.body.createTextRange();
            oRange.moveToElementText(bz);
        }
        oRange.select();
    } else {
        var oRange = EWEB.T.createRange();
        oRange.selectNode(bz);
        var af = this.bG();
        af.removeAllRanges();
        af.addRange(oRange);
    }
};
C.Empty = function() {
    if (F.as) {
        this.bG().empty();
    } else {
        this.bG().removeAllRanges();
    }
};
C.Collapse = function(uK) {
    if (F.as) {
        EWEB.Focus();
        if (this.ai() == 'Text') {
            var oRange = this.bG().createRange();
            oRange.collapse(uK == null || uK === true);
            oRange.select();
        }
    } else {
        var af = this.bG();
        if (uK == null || uK === true) {
            af.collapseToStart();
        } else {
            af.collapseToEnd();
        }
    }
};
C.zp = function(sg) {
    if (F.as) {
        var cr;
        if (this.bG().type == "Control") {
            cr = this.ax();
        } else {
            var oRange = this.bG().createRange();
            cr = oRange.parentElement();
        }
        while (cr) {
            if (cr.nodeName.IEquals(sg)) return true;
            cr = cr.parentNode;
        }
        return false;
    } else {
        var cr = this.ax();
        if (!cr && EWEB.aR) {
            try {
                cr = this.bG().getRangeAt(0).startContainer;
            } catch(e) {}
        }
        while (cr) {
            if (cr.nodeType == 1 && cr.nodeName.IEquals(sg)) return true;
            cr = cr.parentNode;
        }
        return false;
    }
};
C.AG = function(sg) {
    if (F.as) {
        var io, oRange;
        if (!EWEB.T) return null;
        if (this.bG().type == "Control") {
            oRange = this.bG().createRange();
            for (i = 0; i < oRange.length; i++) {
                if (oRange(i).parentNode) {
                    io = oRange(i).parentNode;
                    break;
                }
            }
        } else {
            oRange = this.bG().createRange();
            io = oRange.parentElement();
        }
        while (io && !io.nodeName.Equals(sg)) {
            io = io.parentNode;
        }
        return io;
    } else {
        var io;
        var cr = this.ax();
        if (!cr) {
            cr = this.bG().getRangeAt(0).startContainer;
        }
        while (cr) {
            if (cr.nodeName.IEquals(sg)) {
                return cr;
            }
            cr = cr.parentNode;
        }
        return null;
    }
};
C.Delete = function() {
    var af = this.bG();
    if (F.as) {
        if (af.type.toLowerCase() != "none") {
            af.clear();
        }
    } else {
        for (var i = 0; i < af.rangeCount; i++) {
            af.getRangeAt(i).deleteContents();
        }
    }
    return af;
};
C.bG = function() {
    if (F.as) {
        this.Restore();
        return EWEB.T.selection;
    } else {
        return EWEB.aR.getSelection();
    }
};
C.Save = function(Ed) {
    if (!F.EY) {
        return;
    }
    var vY, J;
    if (EWEB.ae == "EDIT") {
        vY = EWEB.aR;
        J = EWEB.T;
    } else {
        vY = window;
        J = document;
    }
    if (!J) {
        return;
    }
    if (this.yw) {
        return;
    }
    this.yw = !!Ed;
    var Bd;
    var nr;
    if (F.eo) {
        Bd = vY.getSelection();
        if (Bd.rangeCount > 0) {
            nr = Bd.getRangeAt(0);
        }
    } else {
        Bd = J.selection;
        if (Bd) {
            nr = Bd.createRange();
        }
    }
    if (this.zw(nr) != J) {
        nr = null;
    }
    this.sN = nr;
};
C.zw = function(nr) {
    if (!nr) {
        return null;
    } else if (nr.item) {
        return R.dV(nr.item(0));
    } else if (nr.parentElement) {
        return R.dV(nr.parentElement());
    } else if (nr.startContainer) {
        return R.dV(nr.startContainer);
    }
};
C.Restore = function(DR) {
    if (!F.EY) {
        return;
    }
    if (this.sN) {
        EWEB.yB = true;
        try {
            var vY, J, Bd, nr;
            if (EWEB.ae == "EDIT") {
                vY = EWEB.aR;
                J = EWEB.T;
            } else {
                vY = window;
                J = document;
            }
            if (F.eo) {
                Bd = vY.getSelection();
                if (Bd.rangeCount > 0) {
                    nr = Bd.getRangeAt(0);
                }
            } else {
                Bd = J.selection;
                if (Bd) {
                    nr = Bd.createRange();
                }
            }
            if (!DR && this.zw(nr) == J) {
                EWEB.yB = false;
                return;
            }
            if (F.eo) {
                Bd.removeAllRanges();
                Bd.addRange(this.sN);
            } else {
                this.sN.select();
            }
        } catch(e) {}
        EWEB.yB = false;
    }
};
C.Release = function() {
    if (!F.EY) {
        return;
    }
    this.yw = false;
    delete this.sN;
};
C.ww = function(el) {
    if (F.as) {
        var iP, gF;
        iP = EWEB.T.selection.createRange();
        gF = EWEB.T.body.createTextRange();
        gF.moveToElementText(el);
        if (iP.inRange(gF)) {
            return true;
        } else {
            if (((iP.compareEndPoints("StartToEnd", gF) < 0) && (iP.compareEndPoints("StartToStart", gF) > 0)) || ((iP.compareEndPoints("EndToStart", gF) > 0) && (iP.compareEndPoints("EndToEnd", gF) < 0))) {
                return true;
            }
        }
        return false;
    } else {
        var iP, gF;
        iP = C.bG().getRangeAt(0);
        gF = EWEB.T.createRange();
        gF.selectNodeContents(el);
        if ((gF.compareBoundaryPoints(Range.START_TO_END, iP) >= 0) && (gF.compareBoundaryPoints(Range.END_TO_START, iP) <= 0)) {
            return true;
        }
        return false;
    }
};
C.dh = function(eE, nz) {
    var Bs = config.FixWidth ? EWEB.T.getElementById("eWebEditor_FixWidth_DIV") : null;
    var gG = new Array();
    var bd = C.lF(eE);
    if (bd) {
        if (bd != Bs) {
            gG[0] = bd;
        }
    } else {
        for (var i = 0; i < eE.length; i++) {
            var a = EWEB.T.body.getElementsByTagName(eE[i]);
            for (var j = 0; j < a.length; j++) {
                if (C.ww(a[j])) {
                    if (a[j] != Bs) {
                        gG[gG.length] = a[j];
                        if (nz) {
                            return gG;
                        }
                    }
                }
            }
        }
    }
    return gG;
};
C.BA = function() {
    if (C.ai() == "Control") {
        return "";
    }
    var vf = function() {
        if (C.ai() == "Control") {
            return "";
        }
        var r = "";
        if (F.as) {
            var aD = C.bG().createRange();
            if (aD.text.length <= 1) {
                return aD.parentElement().currentStyle.fontSize;
            }
            var html = aD.htmlText;
            html = html.replace(/<[^>]+>/gi, " ");
            html = html.replace(/(&nbsp\;|\s)+/gi, " ");
            html = html.replace(/(^\s*)|(\s*$)/gi, "");
            var kr = html.split(" ");
            var pZ = aD.getBookmark();
            aD.collapse();
            for (var i = 0; i < kr.length; i++) {
                if (!kr[i]) {
                    continue;
                }
                var b = aD.findText(kr[i]);
                if (b) {
                    var v = aD.parentElement().currentStyle.fontSize;
                    if ((r != "") && (r != v)) {
                        r = "";
                        break;
                    }
                    r = v;
                    aD.collapse(false);
                } else {
                    break;
                }
            }
            aD.moveToBookmark(pZ);
        } else {
            var eU = C.cI();
            if (!eU) {
                return "";
            }
            var ad = C.bG().getRangeAt(0);
            var fG = EWEB.T.createRange();
            r = R.ce(eU, "font-size");
            var K = eU.getElementsByTagName("*");
            for (var i = 0; i < K.length; i++) {
                var el = K[i];
                fG.selectNodeContents(el);
                if ((fG.compareBoundaryPoints(Range.START_TO_END, ad) >= 0) && (fG.compareBoundaryPoints(Range.END_TO_START, ad) <= 0)) {
                    var v = R.ce(el, "font-size");
                    if (r != v) {
                        r = "";
                        break;
                    }
                }
            }
            if (r != "") {}
        }
        return r;
    };
    var v;
    if (F.as) {
        v = EWEB.T.queryCommandValue("FontSize");
        if (v) {
            v = nq(v);
        }
    }
    if (!v) {
        v = vf();
    }
    return v;
};
function getSelectedHTML() {
    switch (EWEB.ae) {
    case "EDIT":
        var V = "";
        if (window.getSelection) {
            var r = EWEB.aR.getSelection().getRangeAt(0);
            var c = document.createElement('div');
            c.appendChild(r.cloneContents());
            V = c.innerHTML;
        } else if (document.getSelection) {
            var r = EWEB.T.getSelection().getRangeAt(0);
            var c = document.createElement('div');
            c.appendChild(r.cloneContents());
            V = c.innerHTML;
        } else if (document.selection) {
            V = EWEB.T.selection.createRange().htmlText;
        }
        V = aE.wV(V);
        return V;
        break;
    case "TEXT":
        var fV = EWEB.db;
        var bE = "";
        if (window.getSelection) {
            bE = fV.value.substring(fV.selectionStart, fV.selectionEnd);
        } else {
            fV.focus();
            var Bd = document.selection.createRange();
            bE = Bd.text;
        }
        return FM(bE);
        break;
    default:
        return "";
    }
};
function getSelectedText() {
    switch (EWEB.ae) {
    case "EDIT":
        if (window.getSelection) {
            return EWEB.aR.getSelection().toString();
        } else if (document.getSelection) {
            return EWEB.T.getSelection().toString();
        } else if (document.selection) {
            return EWEB.T.selection.createRange().text;
        }
        break;
    case "TEXT":
        var fV = EWEB.db;
        if (window.getSelection) {
            return fV.value.substring(fV.selectionStart, fV.selectionEnd);
        } else {
            fV.focus();
            var Bd = document.selection.createRange();
            return Bd.text;
        }
        break;
    default:
        return "";
    }
};
function getSelectedElement() {
    var jE;
    if (EWEB.ae == "EDIT") {
        jE = C.cI();
    }
    if (jE) {
        var cb = jE.getAttribute("_ewebeditor_fake_tag", 2);
        if (cb) {
            jE = null;
        }
    }
    return jE;
};
function getAllImageSrc() {
    var V = getHTML();
    var re = /<img(?=[\s])[^>]*?\ssrc\s*=\s*([\'\"])([^\'\">]+?)\1[^>]*?>/gi;
    var m;
    var Ce = new Array();
    while ((m = re.exec(V)) != null) {
        Ce.push(m[2]);
    }
    return Ce;
};
function getMode() {
    return EWEB.ae;
};
function CF() {
    if (EWEB.ae != "EDIT") {
        return;
    }
    if (C.ai() == "Control") {
        var bg = C.ax();
        if (bg.tagName.toUpperCase() == "IMG") {
            if (!aE.BK(bg)) {
                var wx = aE.CL(bg, "src");
                sk({
                    flag: "SetTitleImage",
                    src: wx,
                    obj: bg
                });
            }
        }
    }
};
function update() {
    var V = getHTML();
    if (EWEB.hq == "INPUT") {
        EWEB.bs.value = V;
    } else {
        EWEB.bs.innerHTML = V;
    }
};
function BW(v) {
    var n = parseInt(v);
    if (isNaN(n)) {
        n = 0;
    }
    return n;
};
var IG = (function() {
    var IO = function() {
        try {
            return new window.XMLHttpRequest();
        } catch(e) {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                alert("XHR is not supported!");
            }
        }
    };
    var JF = function(hT) {
        if (!hT) return '';
        var Hj = [];
        for (var ay in hT) {
            var bv = hT[ay].toString();
            ay = ay;
            bv = encodeURIComponent(bv);
            Hj.push(ay + '=' + bv);
        }
        return Hj.join('&');
    };
    return {
        GW: function(cT, aG, Bn, rs, HG) {
            var xhr = IO();
            if (!xhr) {
                return;
            }
            xhr.open(cT, aG, Bn);
            var HL = function() {
                if (xhr.readyState == 4) {
                    if (!HL) {
                        return
                    }
                    HL = null;
                    var jE = {};
                    jE["XhrStatus"] = xhr.status;
                    if (xhr.status == 200) {
                        jE["Data"] = eval("(" + xhr.responseText + ")");
                    } else {
                        jE["Data"] = {};
                    }
                    if (!Bn) {
                        return jE;
                    } else {
                        if (HG) {
                            HG(jE);
                        }
                    }
                }
            };
            if (Bn) {
                xhr.onreadystatechange = HL;
            }
            try {
                if (cT == "post") {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send(JF(rs));
                } else {
                    xhr.send(null);
                }
            } catch(e) {}
            if (!Bn || xhr.readyState == 4) {
                return HL();
            }
        }
    }
})();