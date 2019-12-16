$(function(){
	
	//上传文件
	$("#upload_btn").click(doUpload)
	
	//清空文件
	$("#clear_btn").click(doClear)
	
	//显示用户选择文件
	$("#fileInput").on("change",function(){
		// 展示当前所选文件
		fileList(this.files);
	});
	
	//删除文件
	$("#files_div").on("click", "#uploadPage_del", doDel)
   
})

//用户选择文件
var fileobj = null; 
//进度条id
var progress_bar_id = null;
//文件名称与进度条json数据
var progress_bar_id_data = {};
//已上传文件下标
var file_count = 0;
//用户选择文件总大小
var total = 0;
//已上传文件大小
var upload = 0;
//文件上传总进度
var totalPercentComplete = 0;

//显示用户选择文件
function fileList(obj){
	// 如果没有文件
	if(obj.length < 1){
		return false;
	}
	fileobj = obj;
	createFileDivs(fileobj);
	//更新用户选择文件总大小
	getTotal();
}

//更新用户选择文件总大小
function getTotal(){
	//将用户选择文件总大小清空
	total = 0;
	//将已上传文件清空
	upload = 0;
	//给用户选择文件总大小赋值
	for(var i=0; i<fileobj.length; i++){
		total += fileobj[i].size;
	}
}

//清空文件
function doClear(){
	//给文件上传input框恢复初始值
	$("#fileInput").val("");
	////清空文件列表
	$("#files_div").empty();
	//将文件上传总进度值置为空
	$("#progress_bar").html("");
	//清空文件上传总进度条
    $("#progress_bar").width("0%");
    //清空待上传文件
    fileobj = null;
}

//删除文件
function doDel(){
	//获取用户点击文件的父级div对象
	var parentDiv = $(this).parents("div .fileItem");
	//获取用户点击文件名称
	var filename = parentDiv.data("data").name;
	//删除该文件
	parentDiv.remove();
	//创建缓存
	var temp = [];
	//获取所有未被删除的文件
	for(var i=0; i<fileobj.length; i++){
		//如果该文件的名称不是用户删除文件则将其添加到缓存中
		if(fileobj[i].name != filename){
			//将文件添加到缓存中
			temp.push(fileobj[i]);
		}
	}
	//给待上传文件重新赋值
	fileobj = temp;
	//更新用户选择文件总大小
	getTotal();
}

// 点击文件上传的方法
function doUpload(){
	//判断待上传文件是否为空，如果为空给出提示，并结束后续操作
	if(fileobj == null || fileobj.length < 1){
		//弹出提示信息
		alert("请先选择文件后再上传!");
		//结束后续操作
		return;
	}
	//如果文件全部上传完毕，则重置已上传文件数量
	if(file_count >= fileobj.length){
		//重置已上传文件数量
		file_count = 0;
		//结束后续操作
		return;
	}
	//获取正在上传文件进度条id
	progress_bar_id = progress_bar_id_data[fileobj[file_count].name];
	//创建FormData对象
	var formData = new FormData();
	//封装FormData对象
    formData.append("file", fileobj[file_count]);
    //发送ajax请求
	$.ajax({
		url: "http://localhost:2080/file/uploadFile",
		async: true,
		type: "POST",
		data: formData,
		// 必须false才会自动加上正确的Content-Type
		contentType: false,
		// 必须false才会避开jQuery对 formdata 的默认处理
		// XMLHttpRequest会对 formdata 进行正确的处理
		processData: false,
		xhr: function() { // ajax进度条
			var xhr = $.ajaxSettings.xhr();
			if (xhr.upload) {
				isUpload_flag = false;
				xhr.upload.addEventListener("progress", progressBar, false);
		        return xhr;
		    }
		},
	    success: function (data) {
	    	//获取上传结果
	      	result = data;
	      	//如果上传文件存在，将其文件大小添加到已上传文件大小中去
	      	if(fileobj != null){
	      		//将文件大小添加到已上传文件大小中去
	      		upload += fileobj[file_count].size;
	      	}
	      	//新增已上传文件索引
	      	file_count++;
	      	//上传文件
	      	doUpload();
	      	//如果文件全部上传完毕，则清空总文件上传进度、文件列表及待上传文件
	      	if(totalPercentComplete >= 100){
	      		alert(result.msg);
	      	}
	        /*if(totalPercentComplete >= 100){
	        	//给文件上传input框恢复初始值
				$("#fileInput").val("");
				////清空文件列表
				$("#files_div").empty();
				//将文件上传总进度值置为空
				$("#progress_bar").html("");
				//清空文件上传总进度条
			    $("#progress_bar").width("0%");
			    //清空待上传文件
			    fileobj = null;
	            //alert(result.msg);
	        }*/
	    },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
	})
} 
    
// 创建非图片文件div
function createFileDivs(files){
	//获取文件展示div对象
	var divs = $("#files_div");
	//清空div
	divs.empty();
	//将用户上传文件信息div添加到展示div中
	for(var i=0; i<files.length; i++){
		//封装文件信息
		var data = {"name": files[i].name,
				"size": getFileSize(files[i].size),
				"type": getFileType(files[i].name),
				"id" : "file" + i}
		//给文件对应文件添加一个对应的进度条id
		progress_bar_id_data[files[i].name]= "file" + i;
		//创建文件信息div
		var div = $("<div class='fileItem'></div>");
		//绑定数据
		div.data("data", data);
		//根据文件类型展示文件信息
		if(isImage_wmtxg(files[i].name)){
			//添加文件src值
			data.src = window.URL.createObjectURL(files[i]);
			//创建图片文件div信息
			div.append(createImgDiv(data));
		}else{
			//创建其他文件div信息
			div.append(createFileDiv(data));
		}
		//将文件信息div添加到展示div中
		divs.append(div);
	}
}

// 创建文件div
function createFileDiv(data){
	var div = "<div class='fileShow'>" + 
					"<div class='fileType'>" + data.type + "</div>" + 
					"<i class='fileicon'></i>" + 
				"</div>" + 
					"<div class='status'>" + 
					"<span class='file-size'>" + data.size + "</span>" + 
					"<i class='filedel' id='uploadPage_del'></i>" + 
				"</div>" + 
				"<div class='progress'>" + 
					"<div width='' class='progress-div' id='"+ data.id + "'></div>" + 
				"</div>"+ 
				"<div class='fileName'>" + data.name + "</div>";
	return div;
}

// 创建图片div
function createImgDiv(data){
	var div = "<div class='imgShow'>" + 
				"<img src='" + data.src + "' height='140' width='140'>" +
			"</div>" + 
			"<div class='status'>" + 
				"<span class='file-size'>" + data.size + "</span>" + 
				"<i class='filedel' id='uploadPage_del'></i>" + 
			"</div>" + 
			"<div class='progress'>" + 
				"<div width='' class='progress-div' id='"+ data.id + "'></div>" + 
			"</div>"+ 
			"<div class='fileName'>" + data.name + "</div>";
	return div;
}

//获取文件类型
function getFileType(filename){
	//获取最后一个.的下标
	var index = filename.lastIndexOf(".");
	//获取大写文件拓展名
	return filename.substring(index + 1).toUpperCase();
}

/**
 * 侦查附件上传情况,这个方法大概0.05-0.1秒执行一次
 */
function progressBar(evt) {
    var loaded = evt.loaded; // 已经上传大小情况
    var tot = evt.total; // 附件总大小
    var percentComplete = Math.floor(100*(loaded / tot)); // 已经上传的百分比
    //单个文件上传进度
    $("#" + progress_bar_id).width(percentComplete + "%");
    //总文件已经上传的百分比
    totalPercentComplete = Math.floor(100*((loaded + upload) / total)); // 已经上传的百分比
    //总文件上传进度
    $("#progress_bar").width(totalPercentComplete + "%");
    //给总文件上传进度条数字赋值
    $("#progress_bar").html(totalPercentComplete + "%");

}