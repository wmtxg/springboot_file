
$(function(){
	
	//上传用户选择的文件
	$("#fileUpload_btn").click(uploadFile)
	
	//显示用户选择的图片文件
	$("#fileUploads").change(doListUploadImgs_wmtxg)
	
	//上传用户选择的文件
	$("#fileUploads_btn").click(uploadImgs_wmtxg)
	
	//删除单个图片
	$("#imgsLocation").on("click", "#del_img", doDelImg_wmtxg)
})

/************************************************************************************/

/**
 * 使用form下的input框进行单文件上传
 */
function uploadFile_form(){
	//获取用户上传的文件
	var formData = new FormData($("#fileUploadForm")[0]); 
    $.ajax({
        url: "http://localhost:2080/file/uploadFile",
        type: "POST",
        data: formData,
        //必须false才会自动加上正确的Content-Type
        contentType: false,
        //必须false才会避开jQuery对 formdata 的默认处理
        //XMLHttpRequest会对 formdata 进行正确的处理
        processData: false,
        success: function (data) {
        	console.log(data);
        },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
    });
}

/************************************************************************************/
/**
 * 使用form下的input框进行多文件上传
 */
function uploadFiles_form(){
	//获取用户上传的文件
	var formData = new FormData($("#fileUploadsForm")[0]); 
    $.ajax({
        url: "http://localhost:2080/file/uploadFiles",
        type: "POST",
        data: formData,
        //必须false才会自动加上正确的Content-Type
        contentType: false,
        //必须false才会避开jQuery对 formdata 的默认处理
        //XMLHttpRequest会对 formdata 进行正确的处理
        processData: false,
        success: function (data) {
        	console.log(data);
        },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
    });
}

/************************************************************************************/
/**
 * 使用input框进行单文件上传
 */

//上传单个文件
function uploadFile(){
	//创建FormData对象
	var formData = new FormData();
	//获取用户上传文件
	var file = $("#fileInputId").get(0).files[0];
	//封装FormData对象
	formData.append("file",file);
	//发送ajax请求
    $.ajax({
        url: "http://localhost:2080/file/uploadFile",
        type: "POST",
        data: formData,
        //必须false才会自动加上正确的Content-Type
        contentType: false,
        //必须false才会避开jQuery对 formdata 的默认处理
        //XMLHttpRequest会对 formdata 进行正确的处理
        processData: false,
        success: function (data) {
        	console.log(data);
        	$("#fileInputId").val("");
        },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
    });
}

/************************************************************************************/
/**
 * 使用input框进行多文件上传
 */
//需上传文件
var files = [];

//显示用户上传文件
function doListUploadImgs_wmtxg(){
	files = [];
	//获取用户选择文件
	var imgs = $("#fileUploads").get(0).files;
	//获取图片显示div对象
	var div1 = $("#imgsLocation");
	//清空图片显示div
	div1.empty();
	//遍历使用文件，并显示图片
	for(var i=0; i<imgs.length; i++){
		if(isImage_wmtxg(imgs[i].name)){
			var src = window.URL.createObjectURL(imgs[i]);
			var imgDiv = $("<div class='f_imgfile_box'><a class='f_imgfile_close J_imgfile_close' id='del_img'></a><img id='"+ i +"'></div>");
			imgDiv.find("img").attr({'src':src, width:200 + 'px', height:200 + 'px'});
			div1.append(imgDiv);
			files.push(imgs[i])
		}
	}
}

//上传文件
function uploadImgs_wmtxg(){
	//判断待上传文件数，如果上传文件魏康则给出提示，并结束后续操作
	if(files.length < 1){
		alert("请选中需要上传的文件后再点击上传按钮！");
		return;
	}
	//封装待上传文件
	var formData = new FormData();
	for(var i=0; i<files.length; i++){
		formData.append("files", files[i]);
	}
	//上传文件
	$.ajax({
		url: "http://localhost:2080/file/uploadFiles",
        type: "POST",
        data: formData,
        //必须false才会自动加上正确的Content-Type
        contentType: false,
        //必须false才会避开jQuery对 formdata 的默认处理
        //XMLHttpRequest会对 formdata 进行正确的处理
        processData: false,
        success: function (data) {
        	console.log(data);
        	//清空图片显示区域
        	$("#imgsLocation").empty();
        	//清空待上传文件
        	files = [];
        	//清空input框
        	$("#fileUploads").val("");
        },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
	})
}

//删除单张图片
function doDelImg_wmtxg(){
	//获取点击图片id
	var num = $(this).parent().find("img").prop("id");
	//获取图片显示对象
	var div1 = $("#imgsLocation");
	//清空图片显示区域
	div1.empty();
	//遍历使用文件，重新显示图片
	for(var i=0; i<files.length; i++){
		if(i != num){
			var src = window.URL.createObjectURL(files[i]);
			var imgDiv = $("<div class='f_imgfile_box'><a class='f_imgfile_close J_imgfile_close' id='del_img'></a><img id='"+ i +"'></div>");
			imgDiv.find("img").attr({'src':src, width:200 + 'px', height:200 + 'px'});
			div1.append(imgDiv);
		}
	}
	//从待上传文件中删除用户选中文件
	files.splice(num, 1);
}