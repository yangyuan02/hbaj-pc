/*
浠诲姟寮€濮嬶細鐐瑰嚮浠诲姟鍚庯紝杩涘叆璇句欢鍒朵綔鐨勭晫闈紝鏍规嵁宸茬煡鐨勯」鐩甀D璋冪敤鍑芥暟 setPID(id)锛屾鏃跺皢瑁呰浇椤圭洰鐨勭涓€涓満鏅�
鍦烘櫙鏌ョ湅锛氳浠堕」鐩腑鍖呭惈鍦烘櫙鍒楄〃锛岀偣鍑诲満鏅紝璋冪敤鍑芥暟loadpanoscene(sId,sCode)锛岃杞界洰鏍囧満鏅紝sId涓哄満鏅疘D sCode涓哄満鏅紪鐮�
鐑偣鏌ユ壘锛氱偣鍑诲満鏅悗灏嗗湪宸︿晶鍑虹幇涓€涓儹鐐瑰垪琛紝鐐瑰嚮鐑偣锛岃皟鐢ㄥ嚱鏁癰ackFindHotspot(sCode,hX,hY)锛屽満鏅皢鑷姩鎵惧埌杩欎釜鐑偣锛�
sCode涓哄綋鍓嶅満鏅殑code, hX涓虹儹鐐规í鍚戝潗鏍囷紝hY涓虹儹鐐圭旱鍚戝潗鏍囷紝*/

var a; //鍦烘櫙绫诲瀷
var b; //鍦烘櫙璇︽儏

if (JSON.parse(window.localStorage.getItem("authorization"))) {
    //
    $.ajaxSettings.beforeSend = function(xhr, request) {
        // xhr.setRequestHeader(
        //     "Authorization",
        //     "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
        // );
        $.cookie("authorization", JSON.parse(window.localStorage.getItem("authorization")));
    };
    // $.ajaxSetup({
    //     header: {
    //         Authorization: "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
    //     }
    // });
}

/*璇诲彇鍏ㄨ埞鍦烘櫙淇℃伅*/
function buildpanotour() {
    console.log("buildpanotour");
    var aS = false;
    var bS = false;
    $.ajax({
        type: "GET",
        xhrFields: { withCredentials: true },

        url: "https://api-msa.vr2shipping.com/sceneType?blockId=27",
        beforeSend: function(xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
            );
        },
        success: function(resp) {
            console.log(resp);
            a = resp;
            aS = true;
            if (aS && bS) {
                buldSceneType();
            }
        }
    });

    $.ajax({
        type: "GET",
        xhrFields: { withCredentials: true },
        url: "https://api-msa.vr2shipping.com/scene?size=200&blockId=27",
        beforeSend: function(xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
            );
        },
        success: function(resp) {
            console.log(resp);
            b = resp;
            bS = true;
            if (aS && bS) {
                buldSceneType();
            }
        }
    });
}

/*鍒涘缓鍏ㄨ埞鍦烘櫙绫诲埆鍒楄〃*/
function buldSceneType() {
    var k = document.getElementById("kr");
    var kstr = "";

    for (var i = 0; i < a.data.content.length; i++) {
        var g = "sceneType" + a.data.content[i]["id"];
        kstr = kstr + "addlayer(" + g + "); ";
        kstr = kstr + "set(layer[" + g + "].x," + 45 * (2 * i + 1) + "); ";
        kstr = kstr + "set(layer[" + g + "].html,'" + a.data.content[i]["name"] + "'); ";
        kstr =
            kstr +
            "set(layer[" +
            g +
            "].onclick,'js(showscenelist(" +
            i +
            ");); js(setSceneTypeSelect(" +
            i +
            "););'); ";
        kstr = kstr + "layer[" + g + "].loadstyle(gt); ";
    }
    kstr = kstr + "set(layer[gc].width," + 90 * a.data.content.length + ");";
    k.call(kstr);
    showscenelist(0);
    setPID(247);
}

/*鐐瑰嚮鍦烘櫙鐨勫尯鍩熼鑹查珮浜�*/
function setSceneTypeSelect(index) {
    var k = document.getElementById("kr");
    var kstr = "";

    for (var i = 0; i < a.data.content.length; i++) {
        var g = "sceneType" + a.data.content[i]["id"];
        if (index == i) {
            kstr = kstr + "set(layer[" + g + "].bgcolor,'0xff8d1a'); ";
        } else {
            kstr = kstr + "set(layer[" + g + "].bgcolor,'0x2a82e4'); ";
        }
    }

    k.call(kstr);
}

/*鍒涘缓鎸囧畾绫诲埆鐨勫満鏅缉鐣ュ浘*/
function showscenelist(index) {
    var p = deletescene(preIndex);
    if (p) {
        var k = document.getElementById("kr");
        var kstr = "";
        var j = 0;
        for (var i = 0; i < b.data.content.length; i++) {
            if (a.data.content[index]["id"] == b.data.content[i]["sceneTypeId"]) {
                var s = "scene" + b.data.content[i]["id"];
                var st = "scene" + b.data.content[i]["id"] + "T";
                var sId = b.data.content[i]["id"];
                var sCode = b.data.content[i]["code"];
                var sTitle = b.data.content[i]["name"];

                kstr = kstr + "addlayer(" + s + ");";
                kstr = kstr + "set(layer[" + s + "].x," + 60 * (2 * j + 1) + ");";
                kstr =
                    kstr +
                    "set(layer[" +
                    s +
                    "].url,'%FIRSTXML%/panos/block_id_03/" +
                    sCode +
                    ".tiles/thumb.jpg');";
                kstr =
                    kstr +
                    "set(layer[" +
                    s +
                    "].onclick,'js(loadpanoscene(" +
                    sId +
                    "," +
                    sCode +
                    ");); js(setSceneSelect(" +
                    index +
                    "," +
                    sId +
                    "););');";
                kstr = kstr + "layer[" + s + "].loadstyle(st);";

                kstr = kstr + "addlayer(" + st + ");";
                kstr =
                    kstr +
                    "set(layer[" +
                    st +
                    "].onclick,'js(loadpanoscene(" +
                    sId +
                    "," +
                    sCode +
                    "););');";
                kstr = kstr + "set(layer[" + st + "].parent,'" + s + "');";
                kstr = kstr + "set(layer[" + st + "].html,'" + sTitle + "');";
                kstr = kstr + "layer[" + st + "].loadstyle(stt);";

                j++;
            }
        }
        kstr = kstr + "set(layer[sc].width," + 120 * j + ");";
        k.call(kstr);
        preIndex = index;
    }
}

/*鍦烘櫙琚€変腑鏀惧ぇ*/
function setSceneSelect(stIndex, sId) {
    var k = document.getElementById("kr");
    var kstr = "";
    var j = 0;
    for (var i = 0; i < b.data.content.length; i++) {
        if (a.data.content[stIndex]["id"] == b.data.content[i]["sceneTypeId"]) {
            var s = "scene" + b.data.content[i]["id"];
            if (b.data.content[i]["id"] == sId) {
                kstr = kstr + "set(layer[" + s + "].scale,1.1);";
            } else {
                kstr = kstr + "set(layer[" + s + "].scale,1);";
            }
            j++;
        }
    }
    k.call(kstr);
}

/*鍒犻櫎宸叉湁绫诲埆涓嬬殑鍦烘櫙鍒楄〃*/
var preIndex = 10000;
function deletescene(preIndex) {
    if (preIndex != 10000) {
        var k = document.getElementById("kr");
        var kstr = "";
        var j = 0;
        for (var i = 0; i < b.data.content.length; i++) {
            if (a.data.content[preIndex]["id"] == b.data.content[i]["sceneTypeId"]) {
                var s = "scene" + b.data.content[i]["id"];
                kstr = kstr + "removelayer(" + s + ");";
                j++;
            }
        }
        k.call(kstr);
        return true;
    } else {
        return true;
    }
}

/*鍒濆鍖栭」鐩甀D*/
var pId = 247;
function setPID(id) {
    pId = id;
    editProject(id);
}

/* 鍚姩id涓簆ID椤圭洰鍚姩缂栬緫鏃讹紝灏嗛」鐩殑绗竴涓満鏅杞借繘鍏ュ叏鏅腑*/
function editProject(id) {
    var k = document.getElementById("kr");
    k.call(
        "set(events[voidevents].onloadcomplete,js(sceneRoleStatus(" + id + ")););"
    ); /*鍔犲叆鍦烘櫙鍒ゆ柇锛屼慨鏀逛腑蹇冨浘鏍�*/
    $.ajax({
        type: "GET",
        xhrFields: { withCredentials: true },
        url: "https://api-msa.vr2shipping.com/project/" + id + "/panoInfo",
        beforeSend: function(xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
            );
        },
        success: function(resp) {
            console.log(resp);
            if (resp.data.length == 0) {
                showscenelist(0);
            } else {
                for (var i = 0; i < resp.data.length; i++) {
                    if (resp.data[i]["seq"] == 0) {
                        k.call(
                            "loadscene(scene_" + resp.data[i]["code"] + ",null,MERGE,BLEND(0.3));"
                        );
                        return;
                    }
                }
            }
        }
    });
}

/* 鏍规嵁鍦烘櫙Code锛岃杞藉叏鏅�*/
function loadpanoscene(sId, sCode) {
    var k = document.getElementById("kr");
    var s = "scene" + sId;

    k.call("loadscene(scene_" + sCode + ",null,MERGE,BLEND(0.3));");

    hotspotTip(sId);
}

/* 鑾峰彇褰撳墠鍦烘櫙鐨勫弬鏁皊n鍦烘櫙缂栫爜 f鍦烘櫙瑙嗚 h鍦烘櫙妯悜鍧愭爣 v鍦烘櫙绾靛悜鍧愭爣 */
function getScenePara() {
    var k = document.getElementById("kr");
    var sn = k.get("xml.scene");
    var f = k.get("view.fov");
    var h = k.get("view.hlookat");
    var v = k.get("view.vlookat");
    var arr = [sn, f, h, v];
    return arr;
}

/*姣忔鍏ㄦ櫙瑁呰浇鏃惰Е鍙戯紝褰撳墠鍦烘櫙涓洪」鐩満鏅椂涓棿鎸夐挳鍙樻垚鐩爣鎶婂績锛屾棤瑙﹀彂鍔ㄤ綔锛屽綋鍓嶅満鏅笉鏄」鐩満鏅槸锛屼负娣诲姞鍦烘櫙鍥剧墖 锛岀偣鍑诲悗鎻愮ず娣诲姞鍦烘櫙*/
function sceneRoleStatus(id) {
    var sRS = "false";
    $.ajax({
        type: "GET",
        xhrFields: { withCredentials: true },
        url: "https://api-msa.vr2shipping.com/project/" + id + "/panoInfo",
        beforeSend: function(xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
            );
        },
        success: function(resp) {
            var k = document.getElementById("kr");
            var kstr = "";
            for (var i = 0; i < resp.data.length; i++) {
                var sN = "scene_" + resp.data[i]["code"];
                if (sN == kr.get("xml.scene")) {
                    var sId = resp.data[i]["id"];
                    hotspotTip(id, sId);

                    sRS = true;
                    kstr =
                        kstr + "set(layer[select_quarter].url,'%FIRSTXML%/image/hotspotAim.png');";
                    kstr = kstr + "set(layer[select_quarter].onclick,kaka(););";
                    k.call(kstr);
                    return sRS;
                }
            }
            kstr = kstr + "set(layer[select_quarter].url,'%FIRSTXML%/image/select_quarter.png');";
            kstr = kstr + "set(layer[select_quarter].onclick,soso(););";
            k.call(kstr);
            return sRS;
        }
    });
}

/*鍥炲埌鐑偣鎵€鍦ㄧ殑鍦烘櫙 鍙傛暟鍦烘櫙COde 鐑偣location_x location_y*/
function backFindHotspot(sCode, hX, hY) {
    var k = document.getElementById("kr");
    var sN = "scene_" + sCode;
    if (sN == k.get("xml.scene")) {
        k.call("lookto(" + hX + "," + hY + ");");
    } else {
        k.call(
            "tween(layer[sRS].alpha,1,0.2,DEFAULT,tween(layer[sRS].alpha,0);); loadscene(" +
                sN +
                ",view.hlookat=" +
                hX +
                "&view.hlookat=" +
                hY +
                ",MERGE,BLEND(0.5));"
        );
    }
}

/*鍔犺浇鐑偣鏍囩*/
function hotspotTip(pId, sId) {
    $.ajax({
        type: "GET",
        xhrFields: { withCredentials: true },
        url:
            "https://api-msa.vr2shipping.com/hotspot?sceneId=" +
            sId +
            "&projectId=" +
            pId +
            "&type=DEFAULT",
        beforeSend: function(xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + JSON.parse(window.localStorage.getItem("authorization"))
            );
        },
        success: function(resp) {
            var k = document.getElementById("kr");
            var kstr = "";
            for (var i = 0; i < resp.data.content.length; i++) {
                var hN = resp.data.content[i]["code"];
                var hNT = resp.data.content[i]["code"] + "T";
                var hH = resp.data.content[i]["locationX"];
                var hV = resp.data.content[i]["locationY"];
                kstr = kstr + "addhotspot(" + hN + ");";
                kstr = kstr + "set(hotspot[" + hN + "].ath," + hH + ");";
                kstr = kstr + "set(hotspot[" + hN + "].atv," + hV + ");";
                kstr = kstr + "hotspot[" + hN + "].loadstyle(ht);";

                kstr = kstr + "addhotspot(" + hNT + ");";
                kstr = kstr + "set(hotspot[" + hNT + "].ath," + hH + ");";
                kstr = kstr + "set(hotspot[" + hNT + "].atv," + hV + ");";
                kstr =
                    kstr +
                    "set(hotspot[" +
                    hNT +
                    "].html,'" +
                    resp.data.content[i]["title"] +
                    "');";
                kstr =
                    kstr +
                    "set(hotspot[" +
                    hNT +
                    "].ondown,tween(hotspot[" +
                    hN +
                    "].alpha|hotspot[" +
                    hNT +
                    "].alpha,0|0););";
                kstr =
                    kstr +
                    "set(hotspot[" +
                    hNT +
                    "].onup,tween(hotspot[" +
                    hN +
                    "].alpha|hotspot[" +
                    hNT +
                    "].alpha,1|1););";
                kstr = kstr + "hotspot[" + hNT + "].loadstyle(htt);";
            }
            k.call(kstr);
        }
    });
}
