﻿﻿/*
     * ###################################### eWebEditor V10.3 - Advanced online web based WYSIWYG HTML editor. Copyright (c) 2003-2015 eWebSoft.com
     * 
     * For further information go to http://www.ewebeditor.net/ This copyright notice MUST stay intact for use. ######################################
     */

var cc = new Object();
var xm = document.location.search.substr(1).split('&');
for (i = 0; i < xm.length; i++) {
    var xF = xm[i].split('=');
    cc[xF[0]] = xF[1];
}
var EWIN = parent.EWIN;
var EWEB = EWIN.EWEB;
var ec = EWIN.ec;
var R = EWIN.R;
var F = EWIN.F;
var aA = EWIN.aA;
var lang = EWIN.lang;
var config = EWIN.config;
var C = EWIN.C;
var FT = EWIN.FT;
var dP = parent.dP();
if (dP) {
    dP = dP.contentWindow.yu;
}
R.lE(window);
function lC(ay, bv) {
    return (cc[ay]) ? cc[ay] : bv;
};
function ng(url) {
    document.write('<scr' + 'ipt type="text/javascript" src="' + url + '"><\/scr' + 'ipt>');
};
function fk(bM) {
    qS = 0;
    qw = bM.length;
    if (fk.arguments.length == 2) {
        pF = fk.arguments[1].toLowerCase();
    } else {
        pF = "all";
    }
    for (var i = 0; i < bM.length; i++) {
        xY = bM.substring(qS, qS + 1);
        xH = bM.substring(qw, qw - 1);
        if ((pF == "all" || pF == "left") && xY == " ") {
            qS++;
        }
        if ((pF == "all" || pF == "right") && xH == " ") {
            qw--;
        }
    }
    bM = bM.slice(qS, qw);
    return bM;
};
function bX(wz, zj) {
    alert(zj);
    wz.focus();
    wz.select();
    return false;
};
function oV(color) {
    var temp = color;
    if (temp == "") return true;
    if (temp.length != 7) return false;
    return (temp.search(/\#[a-fA-F0-9]{6}/) != -1);
};
function AN(bM) {
    return (bM.search(/[^0-9]+/) == -1);
};
function Ck(bM) {
    return (AN(bM) && parseInt(bM) > 0);
};
function eR(e) {
    if (!e) {
        e = window.event;
    }
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode == 46 || e.keyCode == 8) {
        return true;
    }
    return R.aw(e);
};
function hu(tj) {
    var aG = "selcolor.htm?returnfieldflag=" + tj;
    ec.OpenDialog(aG);
};
function submuduleinfo(){
    ec.OpenDialog("set_sub_module_info.htm");
};
function vo() {
    ec.OpenDialog("backimage.htm?action=other");
};
function nf(type, tj) {
    ec.OpenDialog('browse.htm?returnfieldflag=' + tj + '&type=' + type);
};
function aC(xd, bv) {
    for (var i = 0; i < xd.length; i++) {
        if (xd.options[i].value == bv) {
            xd.selectedIndex = i;
            return true;
        }
    }
    return false;
};
function fe(bM) {
    bM = fk(bM);
    if (bM != "") {
        var ho = parseFloat(bM);
        if (isNaN(ho)) {
            bM = "";
        } else {
            bM = ho;
        }
    }
    return bM;
};
function zC(url) {
    var ho;
    var b = true;
    ho = url.substring(0, 7);
    ho = ho.toUpperCase();
    if ((ho != "HTTP://") || (url.length < 10)) {
        b = false;
    }
    return b;
};
function iV(url, mb) {
    var ho;
    var b = false;
    var s = mb.toUpperCase().split("|");
    for (var i = 0; i < s.length; i++) {
        ho = url.substr(url.length - s[i].length - 1);
        ho = ho.toUpperCase();
        s[i] = "." + s[i];
        if (s[i] == ho) {
            b = true;
            break;
        }
    }
    return b;
};
function tX(aG) {
    if (aG.substring(0, 1) == "/") {
        return aG;
    }
    if (aG.indexOf("://") >= 0) {
        return aG;
    }
    var qc = EWEB.cd;
    while (aG.substr(0, 3) == "../") {
        aG = aG.substr(3);
        qc = qc.substring(0, qc.lastIndexOf("/"));
    }
    return qc + "/" + aG;
};
function qf(aG) {
    if (config.BaseHref == "") {
        return aG;
    }
    if (aG.substring(0, 1) == "/") {
        return aG;
    }
    if (aG.indexOf("://") >= 0) {
        return aG;
    }
    var hN = config.BaseHref;
    hN = hN.substring(0, hN.length - 1);
    while (aG.substring(0, 3) == "../") {
        aG = aG.substr(3);
        hN = hN.substring(0, hN.lastIndexOf("/"));
    }
    return hN + "/" + aG
};
function AI(aG) {
    var oT = EWEB.cd + "/plugin/";
    while (true) {
        var n1 = aG.indexOf("/");
        var n2 = oT.indexOf("/");
        if (n1 >= 0 && n1 == n2) {
            if (aG.substring(0, n1 + 1) == oT.substring(0, n2 + 1)) {
                aG = aG.substr(n1 + 1);
                oT = oT.substr(n2 + 1);
            } else {
                break;
            }
        } else {
            break;
        }
    }
    var s = oT.replace(/[^\/]+/gi, '');
    var n = s.length;
    for (var i = 0; i < n; i++) {
        aG = "../" + aG;
    }
    return aG;
};
function gh(url) {
    switch (config.BaseUrl) {
    case "0":
        url = tX(url);
        return Af(url);
        break;
    case "1":
        return tX(url);
        break;
    case "2":
    case "3":
        return EWEB.hW + tX(url);
        break;
    }
};
function Af(url) {
    var baseHref = config.BaseHref;
    var b = true;
    while (b) {
        var n1 = url.indexOf("/");
        var n2 = baseHref.indexOf("/");
        if ((n1 >= 0) && (n2 >= 0)) {
            var u1 = url.substring(0, n1 + 1);
            var u2 = baseHref.substring(0, n2 + 1);
            if (u1 == u2) {
                url = url.substr(n1 + 1);
                baseHref = baseHref.substr(n2 + 1);
            } else {
                b = false;
            }
        } else {
            b = false;
        }
    }
    if (baseHref != "") {
        var a = baseHref.split("/");
        for (var i = 1; i < a.length; i++) {
            url = "../" + url;
        }
    }
    return url;
};
function Ao(el) {
    if (!el["imageinitliazed"]) {
        el["oncontextmenu"] = new Function("event.returnValue=false");
        el["onmouseout"] = new Function("wn(this)");
        el["onmousedown"] = new Function("wA(this)");
        el["unselectable"] = "on";
        el["imageinitliazed"] = true;
    }
    el.className = "Ao";
};
function wn(el) {
    el.className = "wn";
};
function wA(el) {
    el.className = "wA";
};
function lN(cT) {
    var qd;
    switch (cT) {
    case "image":
        qd = config.AllowImageSize;
        break;
    case "flash":
        qd = config.AllowFlashSize;
        break;
    case "media":
        qd = config.AllowMediaSize;
        break;
    case "file":
        qd = config.AllowFileSize;
        break;
    default:
        return "";
    }
    var Ad = parseFloat(qd) * 1024;
    var html = "<iframe name='myuploadformtarget' style='display:none;position:absolute;width:0px;height:0px' src='blank.htm'></iframe>" + "<form action='../" + config.ServerExt + "/upload." + config.ServerExt + "?action=save&type=" + cT + "&style=" + aA.StyleName + "&cusdir=" + aA.CusDir + "&skey=" + aA.SKey + "' method=post name=myuploadform enctype='multipart/form-data' style='margin:0px;padding:0px;width:100%;border:0px;' target='myuploadformtarget'>" + "<input type=hidden name='MAX_FILE_SIZE' value='" + Ad + "'>" + "<input type=file name='uploadfile' id='uploadfile' size=28 style='width:100%'  onchange=\"this.form.originalfile.value=this.value;try{eT();} catch(e){}\">" + "<input type=hidden name='originalfile' value=''>" + "</form>";
    return html;
};
function md(an, cs, Ay) {
    var ii = "";
    switch (an) {
    case "ext":
        ii = lang["ErrUploadInvalidExt"] + ":" + cs;
        break;
    case "size":
        ii = lang["ErrUploadSizeLimit"] + ":" + Ay + "KB";
        break;
    case "file":
        ii = lang["ErrUploadInvalidFile"];
        break;
    case "style":
        ii = lang["ErrInvalidStyle"];
        break;
    case "space":
        ii = lang["ErrUploadSpaceLimit"] + ":" + config.SpaceSize + "MB";
        break;
    default:
        ii = an;
        break;
    }
    return ii;
};
function pR(ay) {
    var yW = "";
    var gr = ay + "=";
    if (document.cookie.length > 0) {
        ro = document.cookie.indexOf(gr);
        if (ro != -1) {
            ro += gr.length;
            var eQ = document.cookie.indexOf(";", ro);
            if (eQ == -1) {
                eQ = document.cookie.length;
            }
            yW = unescape(document.cookie.substring(ro, eQ));
        }
    }
    return yW;
};
function qz(ay, bv) {
    var pS = "";
    pS = new Date((new Date()).getTime() + 24 * 365 * 3600000);
    pS = ";expires=" + pS.toGMTString();
    document.cookie = ay + "=" + escape(bv) + pS;
};
function bq(kG, dg, iG) {
    if (iG == null || iG.length == 0) {
        kG.removeAttribute(dg, 0);
    } else {
        kG.setAttribute(dg, iG, 0);
    }
};
function nP(kG, bL, fO) {
    bq(kG, "_ewebeditor_pa_" + bL, encodeURIComponent(fO));
};
function dE(kG, dg) {
    var fu = kG.attributes[dg];
    if (fu == null || !fu.specified) {
        return "";
    }
    var bv = kG.getAttribute(dg, 2);
    if (bv == null) {
        bv = fu.nodeValue;
    }
    return (bv == null ? "": bv);
};
function eZ(el, dg) {
    dg = dg.replace(/\-(\w)/g,
    function(Cz, p1) {
        return p1.toUpperCase();
    });
    var bv = el.style[dg];
    if (bv && (!F.as) && dg.indexOf("Color") >= 0) {
        bv = zr(bv);
    }
    if (!bv) {
        switch (dg) {
        case "backgroundColor":
            dg = "bgColor";
            break;
        case "textAlign":
            dg = "align";
            break;
        case "verticalAlign":
            dg = "valign";
            break;
        default:
        }
        bv = dE(el, dg);
    }
    return bv;
};
function lZ(bv) {
    var n = parseInt(bv);
    if (isNaN(n)) {
        return '';
    }
    if (bv.substr(bv.length - 1) != "%") {
        bv = n + "";
    }
    return bv;
};
function vH(el, bL) {
    var yV = "_ewebeditor_pa_" + bL;
    var wU = el.attributes[yV];
    if (wU == null || !wU.specified) {
        return dE(el, bL);
    } else {
        return decodeURIComponent(el.getAttribute(yV, 2));
    }
};
function xV(el) {
    return dE(el, "_ewebeditor_fake_tag");
};
function wi(el) {
    return decodeURIComponent(dE(el, "_ewebeditor_fake_value"));
};
function zG(el, V) {
    bq(el, '_ewebeditor_fake_value', encodeURIComponent(V));
};
function ty(N) {
    if (N == null) return "00";
    N = parseInt(N);
    if (N == 0 || isNaN(N)) return "00";
    N = Math.max(0, N);
    N = Math.min(N, 255);
    N = Math.round(N);
    return "0123456789ABCDEF".charAt((N - N % 16) / 16) + "0123456789ABCDEF".charAt(N % 16);
};
function zr(bM) {
    if (bM.substring(0, 3) == 'rgb') {
        var by = bM.split(",");
        var r = by[0].replace('rgb(', '').trim();
        var g = by[1].trim();
        var b = by[2].replace(')', '').trim();
        var hex = [ty(r), ty(g), ty(b)];
        return "#" + hex.join('');
    } else {
        return bM;
    }
};
var aj = {
    Init: function(V) {
        this.pL = new Object();
        this.Html = V;
        var re = new RegExp("<object(?=[\\s>])", "gi");
        if (re.test(V)) {
            this.oA = "object";
            re = /<param\s+name\s*?=\s*?([\'\"]?)(\w+)\1[\s]+value\s*?=\s*?(\w+|\'[^\'>]+\'|\"[^\">]+\")[^>]*?>/gi;
            while ((by = re.exec(V)) != null) {
                var fz = RegExp.$3;
                if (fz.substring(0, 1) == '\'' || fz.substring(0, 1) == '"') {
                    fz = fz.substring(1, fz.length - 1);
                }
                this.pL[RegExp.$2.toLowerCase()] = fz;
            }
        } else {
            this.oA = "common";
            re = /\s(\w+)\s*?=\s*?(\w+|\'[^\'>]+\'|\"[^\">]+\")/gi;
            while ((by = re.exec(V)) != null) {
                var fz = RegExp.$2;
                if (fz.substring(0, 1) == '\'' || fz.substring(0, 1) == '"') {
                    fz = fz.substring(1, fz.length - 1);
                }
                this.pL[RegExp.$1.toLowerCase()] = fz;
            }
        }
    },
    GetValue: function(bA) {
        return (this.pL[bA]) ? this.pL[bA] : "";
    },
    GetHtml: function() {
        return this.Html;
    },
    jk: function(bA, bv) {
        var V = this.Html;
        function gm(m, m1) {
            if (bv == '') {
                return '';
            } else {
                return '<param name="' + bA + '" value="' + bv + '">';
            }
        };
        function gC(m) {
            return m + '<param name="' + bA + '" value="' + bv + '">';
        };
        if (this.oA == 'object') {
            var re = new RegExp('<param(?=\\s)[^>]*?\\sname\\s*?=\\s*?(\w+|\'[^\'>]+\'|\"[^\">]+\")[^>]*?>', 'gi');
            if (re.test(V)) {
                V = V.replace(re, gm);
            } else {
                if (bv != '') {
                    V = V.replace(/<object[^>]*?>/, gC);
                }
            }
            V = this.wD(V, 'embed', bA, bv);
        } else {
            V = this.wD(V, '\\w+', bA, bv);
        }
        this.Html = V;
    },
    wD: function(V, aH, bA, bv) {
        function gm(m, m1, m2, m3) {
            if (bv == '') {
                return m1 + m3;
            } else {
                return m1 + ' ' + bA + '="' + bv + '"' + m3;
            }
        };
        function gC(m) {
            return m.substring(0, m.length - 1) + ' ' + bA + '="' + bv + '">';
        };
        var re = new RegExp('(<' + aH + '(?=[\\s>])[^>]*?)\\s' + bA + '\\s*?=\\s*?(\w+|\'[^\'>]+\'|\"[^\">]+\")([^>]*>)', 'gi');
        if (re.test(V)) {
            V = V.replace(re, gm);
        } else {
            if (bv != '') {
                re = new RegExp('<' + aH + '(?=[\\s>])[^>]*>', 'gi');
                V = V.replace(re, gC);
            }
        }
        return V;
    }
};
var ck = {
    Click: function(dO, iq) {
        if ($("tab_nav_" + dO).className == "tab_on") {
            return;
        }
        var pV, bZ, pE;
        for (var i = 1; i <= iq; i++) {
            pV = "tab_nav_" + i;
            bZ = $(pV).getAttribute("_content_id", 2);
            if ($(pV).className == "tab_on") {
                if (!ck.iy) {
                    ck.iy = new Array();
                }
                if (!ck.iy[i]) {
                    ck.iy[i] = {
                        Width: $("tabDialogSize").offsetWidth,
                        Height: $("tabDialogSize").offsetHeight
                    };
                }
                if (!ck.jp) {
                    ck.jp = new Array();
                }
                if (!ck.jp[i]) {
                    ck.jp[i] = {
                        Width: $(bZ).offsetWidth,
                        Height: $(bZ).offsetHeight
                    };
                }
                $(pV).className = "tab_off";
                $(bZ).style.display = "none";
            }
            if (dO == i) {
                pE = bZ;
            }
        }
        $("tab_nav_" + dO).className = "tab_on";
        $(pE).style.display = "";
        try {
            jS(dO, iq, pE);
        } catch(e) {}
    },
    lQ: function(qF) {
        var V = '<table class=tab_layout1 border=0 cellpadding=0 cellspacing=0 width="100%"><tr><td>' + '<table class=tab_layout2 border=0 cellpadding=0 cellspacing=0><tr>' + '<td class=tab_begin></td>';
        for (var i = 1; i <= qF.length; i++) {
            var rg = 'tab_on';
            if (i > 1) {
                V += '<td class=tab_sep></td>';
                rg = 'tab_off';
            }
            V += '<td><table id="tab_nav_' + i + '" class="' + rg + '" _content_id="' + qF[i - 1][1] + '" border=0 cellpadding=0 cellspacing=0><tr>' + '<td class=tab_left></td>' + '<td class=tab_center onclick="ck.Click(' + i + ',' + qF.length + ')">' + qF[i - 1][0] + '</td>' + '<td class=tab_right></td>' + '</tr></table></td>';
        }
        V += '</tr></table></td></tr></table>';
        document.write(V);
    }
};
var iU = {
    Load: function(cT, zI, eh, ff, rh) {
        if (this.AB) {
            return;
        }
        this.yz = cT;
        this.nU = zI;
        this.yQ = rh || '1';
        this.nU.style.width = eh;
        this.nU.style.height = ff;
        FT.wQ("isinstalled", [true],
        function(hT) {
            if (!hT["Ret"]) {
                iU.rS(lang["DlgComNotice"] + "<br>" + lang["DlgComMFUMsgNotInstall"]);
                iU.xO();
            } else {
                iU.we();
            }
        });
    },
    xO: function() {
        FT.wQ("isinstalled", [false],
        function(hT) {
            if (!hT["Ret"]) {
                if (!F.qJ) {
                    window.setTimeout("iU.xO()", 1000);
                } else {
                    var V = "<input type=button class='DlgBtn' value='" + Lang["DlgActivexChkInsBtn"] + "' onclick='iU.xO()'>";
                    iU.rS(V);
                }
            } else {
                var V = "<span class=red><b>" + lang["DlgComMFUMsgInstallOk"] + "</b></span><br><br><input type=button class='dlgBtn' value='" + lang["DlgComMFUMsgBtnOk"] + "' onclick='iU.we()'>";
                iU.rS(V);
            }
        });
    },
    rS: function(V) {
        this.nU.innerHTML = '<table border=0 cellpadding=0 cellspacing=5 width="100%" height="100%"><tr><td align=center valign=middle>' + '<table border=0 cellpadding=0 cellspacing=5>' + '<tr valign=top>' + '<td><img border=0 src="images/info.gif" align=absmiddle></td>' + '<td>' + V + '</td>' + '</tr>' + '</table>' + '</td></tr></table>';
    },
    we: function() {
        switch (this.yz) {
        case 'image':
            this.Dq = config.AllowImageSize;
            this.wf = config.AllowImageExt;
            this.DQ = lang['DlgMFUFYDImage'];
            break;
        case 'media':
            this.Dq = config.AllowMediaSize;
            this.wf = config.AllowMediaExt;
            this.DQ = lang['DlgMFUFYDMedia'];
            break;
        case 'flash':
            this.Dq = config.AllowFlashSize;
            this.wf = config.AllowFlashExt;
            this.DQ = lang['DlgMFUFYDFlash'];
            break;
        case 'file':
            this.Dq = config.AllowFileSize;
            this.wf = config.AllowFileExt;
            this.DQ = lang['DlgMFUFYDFile'];
            break;
        }
        var V = '<table id="mfu_maintable" border=0 cellpadding=0 cellspacing=5 width="100%" height="100%">' + '<tr>' + '<td id="mfu_msgtd">' + lang['DlgComMFUMsgAllow'].replace('<ext>', this.wf).replace('<size>', wR(this.Dq)) + '</td>' + '</tr>' + '<tr>' + '<td>' + '<table width="100%" cellspacing=0 cellpadding=0><tr>' + '<td><input id="mfu_btn_browse" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUBrowse'] + '" onclick="iU.Browse()">&nbsp;' + '<input id="mfu_btn_del" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUDel'] + '" onclick="iU.Del()">&nbsp;' + '<input id="mfu_btn_empty" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUEmpty'] + '" onclick="iU.Empty()"></td>' + '<td align=right><input id="mfu_btn_up" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUUp'] + '" onclick="iU.Up()">&nbsp;' + '<input id="mfu_btn_down" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUDown'] + '" onclick="iU.Down()"></td>' + '</tr></table>' + '</td>' + '</tr>' + '<tr>' + '<td id="mfu_list_ptd" height="100%">' + '<div id="mfu_list_div" style="width:100%;height:100%;overflow:auto">' + '<table id="mfu_list_table" class="mfu_list_table" width="100%" cellspacing=1 cellpadding=2 border=0>' + '<tr class="mfu_list_headtr">' + '<td width="8%">' + lang["DlgMFUSeq"] + '</td>' + '<td width="50%">' + lang["DlgMFUFileName"] + '</td>' + '<td width="14%">' + lang["DlgMFUFileSize"] + '</td>' + '<td width="14%">' + lang["DlgMFUProgress"] + '</td>' + '<td width="14%">' + lang["DlgMFUStatus"] + '</td>' + '</tr>' + '</table>' + '</div>' + '</td>' + '</tr>' + '<tr>' + '<td>' + '<table width="100%" cellspacing=0 cellpadding=0><tr>' + '<td id="mfu_tpb_td">' + '<table border=0 cellpadding=0 cellspacing=0>' + '<tr>' + '<td>' + this.Fg(0, 0) + '</td>' + '<td width="10px"></td>' + '<td width="100px">' + this.Dh('t', '0%') + '</td>' + '</tr>' + '</table>' + '</td>' + '<td align=right><input id="mfu_btn_upload" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUUpload'] + '" onclick="iU.Upload()">&nbsp;' + '<input id="mfu_btn_cancel" type=button class="dlgBtnCommon dlgBtn" value="' + lang['DlgMFUCancel'] + '" onclick="iU.Cancel()"></td>' + '</tr></table>' + '</td>' + '</tr>' + '</table>';
        this.nU.innerHTML = V;
        if (F.qJ) {
            var HZ = config.MFUBlockSize + "\r" + this.yz + "\r" + this.Dq + "\r" + this.wf + "\r" + this.yQ;
            FT.wQ("mfu_init", [HZ]);
        } else {
            FT.kI.MFUEmpty();
            FT.kI.BlockSize = config.MFUBlockSize;
            FT.kI.FileType = this.yz;
            FT.kI.AllowSize = this.Dq;
            FT.kI.AllowExt = this.wf;
            if (this.yQ == '0') {
                FT.kI.MultiFile = this.yQ;
            }
        }
        $('mfu_list_div').style.height = $('mfu_list_div').offsetHeight + 'px';
        this.jW = $("mfu_list_table");
        this.lH = 0;
        this.BV();
        this.AB = true;
        R.az(this.jW, 'click', this.FC);
        R.az(this.jW, 'mouseover', this.GB);
        R.az(this.jW, 'mouseout', this.Gf);
    },
    Browse: function() {
        var CZ = (this.yQ == '0') ? 0 : 1;
        var iX = this.DQ + "(*." + this.wf.replace(/\|/gi, ",*.") + ")|*." + this.wf.replace(/\|/gi, ";*.");
        FT.wQ("dialogopen", [1, CZ, iX, 1],
        function(hT) {
            var fS = hT["Ret"];
            if (fS == "") {
                return;
            }
            var GC = fS.split("|");
            if (F.qJ) {
                FT.wQ("mfu_getinfos", [fS],
                function(hT) {
                    var HT = hT["Ret"].split("\r");
                    iU.Hu(GC, HT, CZ);
                });
            } else {
                var HT = [];
                for (var i = 0; i < GC.length; i++) {
                    HT[i] = FT.kI.MFUAdd(GC[i]);
                }
                iU.Hu(GC, HT, CZ);
            }
        });
    },
    Hu: function(GC, HT, CZ) {
        var Eo = 0;
        for (var i = 0; i < GC.length; i++) {
            var Ig = HT[i];
            if (Ig) {
                if (!CZ) {
                    this.Empty(true);
                }
                this.Gl(Ig);
            } else {
                Eo++;
            }
        }
        if (Eo > 0) {
            alert(lang["DlgMFUMsgFilter"].replace("{count}", Eo));
        }
        if (this.lH <= 0) {
            this.xn(1);
        }
        this.BV();
    },
    Empty: function(Fq) {
        var iq = this.jW.rows.length - 1;
        for (var i = iq; i > 0; i--) {
            this.jW.deleteRow( - 1);
        }
        this.lH = 0;
        this.BV();
        if (!Fq) {
            if (F.qJ) {
                FT.wQ("mfuempty", []);
            } else {
                FT.kI.MFUEmpty();
            }
        }
    },
    Del: function() {
        var dO = this.lH;
        if (dO <= 0) {
            return;
        }
        var EK = this.jW;
        EK.deleteRow(dO);
        var iq = EK.rows.length - 1;
        if (iq <= 0) {
            this.lH = 0;
        } else if (iq < dO) {
            this.lH = 0;
            this.xn(iq);
        } else {
            this.lH = 0;
            this.xn(dO);
            for (var i = dO; i <= iq; i++) {
                EK.rows[i].cells[0].innerHTML = i + "";
            }
        }
        iU.BV();
        if (F.qJ) {
            FT.wQ("mfudel", [dO]);
        } else {
            FT.kI.MFUDel(dO);
        }
    },
    Up: function() {
        var dO = this.lH;
        var iq = this.jW.rows.length - 1;
        if (dO <= 1 || dO > iq) {
            return;
        }
        if (F.qJ) {
            FT.wQ("mfu_up", [dO],
            function(hT) {
                var IF = hT["Ret"].split("\r");
                iU.DW(dO, IF[0]);
                iU.DW(dO - 1, IF[1]);
                iU.xn(dO - 1);
                iU.BV();
            });
        } else {
            FT.kI.MFUUp(dO);
            iU.DW(dO, FT.kI.MFUFileInfo(dO));
            iU.DW(dO - 1, FT.kI.MFUFileInfo(dO - 1));
            iU.xn(dO - 1);
            iU.BV();
        }
    },
    Down: function() {
        var dO = this.lH;
        var iq = this.jW.rows.length - 1;
        if (dO <= 0 || dO >= iq) {
            return;
        }
        if (F.qJ) {
            FT.wQ("mfu_down", [dO],
            function(hT) {
                var IF = hT["Ret"].split("\r");
                iU.DW(dO, IF[0]);
                iU.DW(dO + 1, IF[1]);
                iU.xn(dO + 1);
                iU.BV();
            });
        } else {
            FT.kI.MFUDown(dO);
            iU.DW(dO, FT.kI.MFUFileInfo(dO));
            iU.DW(dO + 1, FT.kI.MFUFileInfo(dO + 1));
            iU.xn(dO + 1);
            iU.BV();
        }
    },
    Upload: function() {
        if (this.jW.rows.length < 2) {
            return;
        }
        if (FT.FD()) {
            return;
        }
        this.Dw = 1;
        this.Eg(true);
        this.Fs = true;
        if (F.qJ) {
            FT.wQ("mfuupload", [],
            function(hT) {
                iU.FW();
            });
        } else {
            FT.kI.MFUUpload();
            window.setTimeout(iU.FW, 300);
        }
    },
    Cancel: function() {
        if (this.Fs) {
            if (F.qJ) {
                FT.wQ("mfucancel", []);
            } else {
                FT.kI.MFUCancel();
            }
            FT.jT(false);
        } else {
            parent.Cancel();
        }
    },
    FW: function() {
        var Eq;
        if (F.qJ) {
            FT.wQ("mfustate", [],
            function(hT) {
                Eq = hT["Ret"];
                iU.Ie(Eq);
            });
        } else {
            Eq = FT.kI.MFUState();
            iU.Ie(Eq);
        }
    },
    Ie: function(Eq) {
        if (!Eq) {
            FT.jT(false);
            return;
        }
        var Er = false;
        var gG = Eq.split('|');
        var EW = gG[0];
        var dO = parseInt(gG[1]);
        var iq = parseInt(gG[2]);
        var DC = parseInt(gG[3]);
        var Gb = gG[4];
        var n1 = iU.Dw;
        FT.wQ("mfu_fileinfo_fromto", [n1, dO],
        function(hT) {
            var HT = hT["Ret"].split("\r");
            for (var n = n1; n <= dO; n++) {
                var eY = HT[n - n1];
                var lL = eY.split("|");
                var EU = lL[3];
                var CT = lL[4];
                iU.Dm(n, EU);
                iU.jW.rows[n].cells[4].innerHTML = iU.Dz(CT);
                if (CT == "ok" || CT == "errorupload") {
                    iU.Dw = n + 1;
                }
            }
            iU.FR(dO, iq, DC);
            switch (EW) {
            case 'cancel':
                Er = true;
                FT.jT(false);
                iU.Eg(false);
                iU.Fs = false;
                break;
            case 'endall':
                Er = true;
                FT.jT(false);
                iU.Eg(false);
                iU.Dx();
                break;
            case 'endapart':
                Er = true;
                FT.jT(false);
                if (confirm(lang["DlgMFUErrRetry"].replace("{count}", Gb))) {
                    iU.Upload();
                } else {
                    iU.Eg(false);
                    iU.Dx();
                }
                break;
            case 'uploading':
                break;
            }
            if (!Er) {
                window.setTimeout(iU.FW, 300);
            }
        });
    },
    Dx: function() {
        try {
            if (F.qJ) {
                FT.wQ("mfuokurl", [],
                function(hT) {
                    MFUReturn(hT["Ret"]);
                });
            } else {
                MFUReturn(FT.kI.MFUOkUrl());
            }
        } catch(e) {}
    },
    FC: function(ev) {
        if (!ev) {
            ev = window.event;
        }
        var dZ = ev.srcElement || ev.target;
        var pa = R.tz(dZ, "TR");
        if (!iU.DS(pa)) {
            return;
        }
        if (pa.rowIndex > 0) {
            iU.xn(pa.rowIndex);
            iU.BV();
        }
    },
    GB: function(ev) {
        iU.Fl(ev, true);
    },
    Gf: function(ev) {
        iU.Fl(ev, false);
    },
    Fl: function(ev, Fp) {
        if (!ev) {
            ev = window.event;
        }
        var dZ = ev.srcElement || ev.target;
        var pa = R.tz(dZ, "TR");
        if (!iU.DS(pa)) {
            return;
        }
        if (pa.rowIndex > 0 && pa.rowIndex != iU.lH) {
            var Da = Fp ? "mfu_list_tr_hover": "";
            iU.jW.rows[pa.rowIndex].className = Da;
        }
    },
    DS: function(pa) {
        if (pa) {
            var EK = R.tz(pa, "TABLE");
            if (EK == this.jW) {
                return true;
            }
        }
        return false;
    },
    xn: function(dO) {
        if (this.lH == dO || dO < 1 || this.jW.rows.length <= dO) {
            return;
        }
        if (this.lH > 0) {
            this.jW.rows[this.lH].className = "";
        }
        this.jW.rows[dO].className = "mfu_list_tr_selected";
        this.lH = dO;
    },
    Dh: function(bA, zv) {
        var V = '<div id="mfu_pb_c_' + bA + '" class="mfu_pb_c">' + '<div id="mfu_pb_p_' + bA + '" class="mfu_pb_p" style="width:' + zv + '"></div>' + '<div id="mfu_pb_t_' + bA + '" class="mfu_pb_t">' + zv + '</div>' + '</div>';
        return V;
    },
    Dm: function(bA, zv) {
        $('mfu_pb_p_' + bA).style.width = zv;
        $('mfu_pb_t_' + bA).innerHTML = zv;
    },
    Gl: function(eY) {
        var lL = eY.split("|");
        var nK = this.jW.insertRow( - 1);
        var be = nK.insertCell( - 1);
        be.innerHTML = lL[0];
        be = nK.insertCell( - 1);
        be.style.textAlign = "left";
        be.innerHTML = this.Fo(lL[1]);
        be = nK.insertCell( - 1);
        be.innerHTML = lL[2];
        be = nK.insertCell( - 1);
        be.innerHTML = this.Dh(lL[0], lL[3]);
        be = nK.insertCell( - 1);
        be.innerHTML = this.Dz(lL[4]);
    },
    DW: function(dO, eY) {
        var lL = eY.split("|");
        var nK = this.jW.rows[dO];
        nK.cells[0].innerHTML = lL[0];
        nK.cells[1].innerHTML = this.Fo(lL[1]);
        nK.cells[2].innerHTML = lL[2];
        nK.cells[3].innerHTML = this.Dh(lL[0], lL[3]);
        nK.cells[4].innerHTML = this.Dz(lL[4]);
    },
    Fo: function(ay) {
        var aI = ay;
        aI = aI.replace(/&/gi, "&amp;");
        aI = aI.replace(/\"/gi, "&quot;");
        aI = aI.replace(/</gi, "&lt;");
        aI = aI.replace(/>/gi, "&gt;");
        return aI;
    },
    Dz: function(an) {
        var ca;
        switch (an) {
        case 'ok':
            ca = lang["DlgMFUStateOk"];
            break;
        case 'uploading':
            ca = lang["DlgMFUStateUploading"];
            break;
        case 'errorupload':
            ca = lang["DlgMFUStateErrUpload"];
            break;
        case 'cancel':
            ca = lang["DlgMFUStateCancel"];
            break;
        case 'wait':
            ca = lang["DlgMFUStateWait"];
            break;
        }
        return ca;
    },
    BV: function() {
        var iq = this.jW.rows.length - 1;
        var dO = this.lH;
        var b = (iq <= 0) ? true: false;
        this.od("mfu_btn_upload", b);
        this.od("mfu_btn_del", b);
        this.od("mfu_btn_empty", b);
        b = (dO <= 1) ? true: false;
        this.od("mfu_btn_up", b);
        b = (dO >= iq) ? true: false;
        this.od("mfu_btn_down", b);
    },
    Eg: function(b) {
        this.od("mfu_btn_browse", b);
        this.od("mfu_btn_del", b);
        this.od("mfu_btn_empty", b);
        this.od("mfu_btn_up", b);
        this.od("mfu_btn_down", b);
        this.od("mfu_btn_upload", b);
    },
    od: function(ay, b) {
        var Da = b ? "dlgBtnCommon dlgBtn dlgBtnDisabled": "dlgBtnCommon dlgBtn";
        $(ay).disabled = b;
        $(ay).className = Da;
    },
    Fg: function(dO, iq, DC) {
        var V = lang['DlgMFUTotalProgress'].replace('{index}', '<span id="mfu_tpb_index">' + dO + '</span>').replace('{count}', '<span id="mfu_tpb_count">' + iq + '</span>');
        return V;
    },
    FR: function(dO, iq, DC) {
        $('mfu_tpb_index').innerHTML = dO + '';
        $('mfu_tpb_count').innerHTML = iq + '';
        this.Dm('t', DC + '%');
    }
};
function wR(yf) {
    var n = parseFloat(yf);
    var s = "";
    if (n >= 1048576) {
        n = n / 1048576;
        s = Math.round(n * 100) / 100 + "GB";
    } else if (n >= 1024) {
        n = n / 1024;
        s = Math.round(n * 100) / 100 + "MB";
    } else {
        s = yf + "KB";
    }
    return s;
};
function DB(bv) {
    if (!bv) {
        return "";
    }
    if (bv.search(/[^0-9]+/) != -1) {
        return bv;
    } else {
        return bv + "px";
    }
};
var DLGRunOne = (function() {
    var Gc = new Object();
    return {
        FH: function(an) {
            return (Gc[an] ? true: false);
        },
        BP: function(GA, gK) {
            var Gh = $(GA);
            var Da = Gh.className;
            Gh.disabled = gK;
            if (Da.indexOf("dlgBtnDisabled") >= 0) {
                if (!gK) {
                    Gh.className = Da.replace(/ *dlgBtnDisabled/gi, "");
                }
            } else {
                if (gK) {
                    Gh.className = Da + " dlgBtnDisabled";
                }
            }
            Gc[GA] = gK;
        }
    };
})();
var bB = {
    OutHtml: function(sd) {
        document.write('<div id=divProcessing style="width:200px;height:30px;position:absolute;left:-10000px;top:-10000px;">' + '<table border=0 cellpadding=0 cellspacing=1 bgcolor="#000000" width="100%" height="100%"><tr><td bgcolor=#3A6EA5><marquee align="middle" behavior="alternate" scrollamount="5"><font color=#FFFFFF>' + sd + '</font></marquee></td></tr></table>' + '</div>');
    },
    Show: function() {
        var FQ = parseInt(($("tabDialogSize").offsetWidth - 200) / 2) + "px";
        var mq = parseInt(($("tabDialogSize").offsetHeight - 20 - 30) / 2) + "px";
        $("divProcessing").style.left = FQ;
        $("divProcessing").style.top = mq;
    },
    Hide: function() {
        $("divProcessing").style.left = "-10000px";
        $("divProcessing").style.top = "-10000px";
    }
};