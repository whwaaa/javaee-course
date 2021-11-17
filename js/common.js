/**
 * Created with JetBrains PhpStorm.
 * User: kk
 * Date: 13-8-28
 * Time: 下午4:44
 */
function U() {
    var url = arguments[0] || [];
    var param = arguments[1] || {};
    var url_arr = url.split('/');

    if (!$.isArray(url_arr) || url_arr.length < 2 || url_arr.length > 3) {
        return '';
    }

    if (url_arr.length == 2)
        url_arr.unshift(_GROUP_);

    var pre_arr = ['g', 'm', 'a'];

    var arr = [];
    for (d in pre_arr)
        arr.push(pre_arr[d] + '=' + url_arr[d]);

    for (d in param)
        arr.push(d + '=' + param[d]);

    return _APP_+'?'+arr.join('&');
}



var forwardUrl = "http://www.jeecourse.com";// "http://jeecourse.jumaojiang.top";//"http://myhost.jumaojiang.top";	//
var origin =  "http://wuhanwei.qicp.vip"; //"http://myhost.jumaojiang.top:8080"// "http://localhost:8080"//"http://localhost"//// //"http://myhost.jumaojiang.top"//

// 获取地址参数
String.prototype.GetValue= function(para) {
    let reg = new RegExp("(^|&)"+ para +"=([^&]*)(&|$)");
    let r = this.substr(this.indexOf("\?")+1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

// ajax配合拦截器跳转登陆界面
function myComplete(xhr, status){
    // 通过xhr取得响应头
    let REDIRECT = xhr.getResponseHeader("REDIRECT");
    let TOKEN_MSG = xhr.getResponseHeader("TOKEN-MSG");
    // 如果响应头中包含 REDIRECT 则说明是拦截器返回的
    if(REDIRECT == "REDIRECT"){
        layer.closeAll()
        if(TOKEN_MSG == "no-token"){
            layer.msg("请先登陆")
        }else if(TOKEN_MSG == "token-invalid"){
            layer.msg("登陆信息过期,请再次登陆")
        }
        // 跳到登陆界面, 传入当前URL作为参数, 登陆成功再跳回来
        setTimeout(function (){
            let callBackUrL = window.location.href;
            window.location.href = xhr.getResponseHeader("CONTENTPATH") + "?callBackUrL=" + callBackUrL;
        }, 1500)
    }
}









































