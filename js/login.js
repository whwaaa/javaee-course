$(function(){
	$(".table-title-email").on("click", function(){
		$(".login-table").find("div").removeClass("active");
		$(this).addClass("active");
		$(".email-con").addClass("active");
	})
	$(".table-title-passwd").on("click", function(){
		$(".login-table").find("div").removeClass("active");
		$(this).addClass("active");
		$(".passwd-con").addClass("active");
	})
	$(".table-title-qrcode").on("click", function(){
		$(".login-table").find("div").removeClass("active");
		$(this).addClass("active");
		$(".qrcode-con").addClass("active");
		requestLogin();
	})
	
	$("input[name='fm-agreement-checkbox']").on("click", function(){
		if($("input[name='fm-agreement-checkbox']").prop("checked")){
			$(".email-btn").css("opacity","1")
		}else{
			$(".email-btn").css("opacity","0.6")
		}
	})
})

// 请求登陆
function requestLogin(){
	$.ajax({
        type: "GET",
        url: origin + "/jee-wxpusher/jee-login",
        data: {forwardUrl:forwardUrl},
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success: function (data) {
            layer.closeAll()
            console.log(data)
            if(data.code === 200){
            	// 解析qrCodeUrl与authCode
            	let qrCodeUrl = data.obj.qrCodeUrl;
            	let authCode = data.obj.authCode;
            	// 加载二维码页面
            	$(".qrcode-img").prop("src", qrCodeUrl);
            	// 再次发送ajax请求进行验证
            	loginVerify(authCode);
            }else{
                layer.msg(data.msg, function(){});
            }
        }
//	            // TODO: 后端拦截ajax请求进行登陆跳转需要前端相互配合, 每一个ajax请求都需要加上以下的代码
//	            ,complete : function(xhr, status) {
//	                myComplete(xhr, status);
//	            }
	});
}

// 验证登陆
function loginVerify(authCode){
	$.ajax({
        type: "GET",
        url: origin + "/jee-wxpusher/jee-verify",
        data: {authCode:authCode,forwardUrl:forwardUrl},
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success: function (data) {
            layer.closeAll()
            console.log(data)
            if(data.code === 200){
            	// 设置cookie
            	$.removeCookie("jwtToken",{path:'/',domain:'wuhanwei.qicp.vip'})
            	$.removeCookie("jwtToken",{path:'/'})
            	$.cookie('jwtToken',data.obj,{expires:7,path:'/'});
            	window.location.href = "index.html?ck=ok";
            }else{
                layer.msg(data.msg, function(){});
            }
        }
	});
}
