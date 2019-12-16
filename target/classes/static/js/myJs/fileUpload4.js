$(function(){
	
	//上传文件
	$("#upload_btn").click(doUpload)
	//清空文件
	$("#clear_btn").click(doClear)
	//删除文件
	$("#upload_tbody").on("click", "#uploadPage_del", doDel)
	//点击上传按钮上传文件
	$("#fileInput").on("change",function(){
		// 当前所选文件
		fileList(this.files);
	});
    // 拖拽外部文件，进入目标元素触发 dragenter 用户开始拖动元素时触发
    $("#fileSpan").on("dragenter",function(){
      $(this).css("background","#ccc");
      $(".span-p").text('可以释放鼠标了');
    });
    // 拖拽外部文件，进入目标，离开目标，防止连续触发
    // ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    $("#fileSpan").on("dragover",function(){
      return false;
    });
    // 拖拽外部文件，离开目标元素触发
    // ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
    $("#fileSpan").on("dragleave",function(){
      $(this).css("background","none");
      $(".span-p").text("或者将文件拖到此处!");
    });
    // ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
    $("#fileSpan").on("drop",function(e){
      // HTML5的File API提供了一个FileList的接口，它
      // 可以通过拖拽事件的e.dataTransfer.files来传递的文件信息，获取本地文件列表信息。
      var file = e.originalEvent.dataTransfer.files;
      fileList(file);
      $(this).css("background", "none");
        return false;
    });
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
	// 如果没有文件，则结束执行
	if(obj.length < 1){
		return;
	}
	//给用户选择文件赋值
	fileobj = obj;
	//展示文件列表
	createTbody(obj);
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

//清空文件列表
function doClear(){
  //给文件上传input框恢复初始值
	$("#fileInput").val("");
	//给进度表进度赋值
	$("#progress_bar").val(0);
	//清空文件列表
    $("#upload_tbody").empty();
    //清空待上传文件
    fileobj = null;
}

//删除文件
function doDel(){
	//获取鼠标点击的行对象
	var tr = $(this).parents("tr");
	//获取用户点击的文件名称
	var filename = tr.data("data").name;
	//移除该行
	tr.remove();
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
	        /*if(totalPercentComplete >= 100){
	        	//总文件上传进度
	            $("#progress_bar").val(0);
	            $("#upload_tbody").empty();
	            fileobj = null;
	            alert(result.msg);
	        }*/
	    },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
	})
} 
    
// 创建tr
function createTbody(files){
	//获取tbody对象
	var tbody = $("#upload_tbody");
	//清空tbody
	tbody.empty();
	//创建文件列表
	for(var i=0; i<files.length; i++){
		//封装文件信息
		var data = {"name": files[i].name,
				"size": getFileSize(files[i].size),
				"id" : "file" + i};
		//给文件对应文件添加一个对应的进度条id
		progress_bar_id_data[files[i].name]= "file" + i;
		//创建tr对象
		var tr = $("<tr></tr>");
		//绑定文件信息数据
		tr.data("data", data);
		//创建tds
		var tds = createTds(data);
		//将tds添加到tr
		tr.append(tds);
		//将tr添加到tbody
		tbody.append(tr);
	}
}

// 创建tds
function createTds(data){
	var tds = "<td>" + data.name + "</td>" +
				"<td>" + data.size + "</td>" +
				"<td><progress value='0' max='100' id='"+ data.id + "'> </progress></td>" +
				"<td>" + "<button type='button' id='uploadPage_del'>删除</button>" + "</td>";
	return tds;
}


/**
 * 侦查附件上传情况,这个方法大概0.05-0.1秒执行一次
 */
function progressBar(evt) {
    var loaded = evt.loaded; // 已经上传大小情况
    var tot = evt.total; // 附件总大小
    var percentComplete = Math.floor(100 * loaded / tot); // 已经上传的百分比
    //单个文件上传进度
    $("#" + progress_bar_id).val(percentComplete);
    //总文件已经上传的百分比
    totalPercentComplete = Math.floor(100 * ((loaded + upload) / total)); // 已经上传的百分比
    //总文件上传进度
    $("#progress_bar").val(totalPercentComplete);
}