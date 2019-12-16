$(function(){
	// 点击点击上传按钮显示上传页面
	$("#uploadPage_show").click(doShow_uploadPage)
	
	// 点击关闭按钮关闭上传页面
	$("#uploadPage_close").click(doClose_uploadPage)
	
	// 点击开始上传按钮上传以后文件
	$("#uploadPage_upload").click(doUpload_uploadPage)
	
	// 点击清空按钮清空上传文件
	$("#uploadPage_clear").click(doClear_uploadPage)
	
	//点击单个文件删除按钮
	$("#uploadPage_tbody").on("click", "#uploadPage_del", doDel_uploadPage)
	
	// 获取drop区域
	var dropbox = document.getElementById("uploadPage_content");
	// 目标进入drop区域监听事件
	dropbox.addEventListener("dragenter", dragenter, false);
	// 目标位于drop区域上方监听事件
	dropbox.addEventListener("dragover", dragover, false);
	// 目标离开drop区域监听事件
	dropbox.addEventListener("dragleave", dragleave, false);
	// 目标在drop区域被释放/放置（松开鼠标）监听事件
	dropbox.addEventListener("drop", drop, false);

})

//用户上传文件
var dragfiles = {};

// 目标进入drop区域
function dragenter(e) {
	e.stopPropagation();
	e.preventDefault();
	// 拖入文件后边框颜色变红
	this.style.borderColor = 'red';
}

//目标位于drop区域上方
function dragover(e) {
	e.stopPropagation();
	e.preventDefault();
	// 拖入文件后边框颜色变红
	this.style.borderColor = 'red';
}

//目标离开drop区域
function dragleave(e) {
	e.stopPropagation();
	e.preventDefault();
	// 恢复边框颜色
	this.style.borderColor = 'gray';
}
// 目标在drop区域被释放/放置（松开鼠标）
function drop(e) {
	// 恢复边框颜色
	 this.style.borderColor = 'gray';
	 // 阻止浏览器默认打开文件的操作
	 e.preventDefault();
	 //获取用户选中对象
	 var files = e.dataTransfer.files;
	 //获取tbody对象
	 var tbody = $("#uploadPage_tbody");
	 //遍历文件，显示待上传文件信息
	 for(var i=0; i<files.length; i++){
		 // 文件信息对象
		 var data = {};
		 // 获取文件名称
		 data.name = files[i].name;
		 // 获取文件大小
		 data.size = getFileSize(files[i].size);
		 // 获取格式化的修改时间
		 data.time = files[i].lastModifiedDate.toLocaleDateString() + ' '+files[i].lastModifiedDate.toTimeString().split(' ')[0];
		 //创建tr
		 var tr = createTr(data);
		 //将tr对象添加到tbody
		 tbody.append(tr);
		 //更新用户上传文件
		 dragfiles[files[i].name] = files[i];
	 }
}

//显示文件拖拽上传页面
function doShow_uploadPage() { // 打开上传框
	var modal = document.getElementById('uploadPage_div');
	var overlay = document.getElementsByClassName('overlay')[0];
	overlay.style.display = 'block';
	modal.style.display = 'block';
}

//关闭文件拖拽上传页面
function doClose_uploadPage() { // 关闭上传框
	var modal = document.getElementById('uploadPage_div');
	var overlay = document.getElementsByClassName('overlay')[0];
	overlay.style.display = 'none';
	modal.style.display = 'none';
}

//开始上传按钮点击事件
function doUpload_uploadPage(){
	//判断用户待上传文件是否为空
	if(isEmptyObject_wmtxg(dragfiles)){
		alert("请选中需要上传的文件后再点击上传按钮！");
		return;
	}
	//新建FormData
	var formData = new FormData();
	//封装上传数据
	for(var key in dragfiles){ 
		formData.append("files", dragfiles[key]); 
	}
	//上传文件
	var result = uploadFiles(formData);
	//如果上传成功，情况待上传文件列表
	if(result.state == 1){
		//清空历史数据
		doClear_uploadPage();
	}
	//弹出上传结果
	alert(result.msg);
	
}

//删除单个文件点击事件
function doDel_uploadPage(){
	// 获取点击删除按钮对应的文件信息
	var data = $(this).parents("tr").data("data");
	// 在用户上传文件数据中删除用户删除数据
	delete dragfiles[data.name];
	// 将该行从tbody中移除
	$(this).parents("tr").remove();
}

// 清空所有上传文件
function doClear_uploadPage(){
	// 清空tbody
	$("#uploadPage_tbody").empty();
	// 清空用户上传文件数据
	dragfiles = {};
}

// 上传文件
function uploadFiles(formData){
	//请求结果
	var result = null;
	//发送ajax请求
	$.ajax({
		url: "http://localhost:2080/file/uploadFiles",
		async: false,
        type: "POST",
        data: formData,
        // 必须false才会自动加上正确的Content-Type
        contentType: false,
        // 必须false才会避开jQuery对 formdata 的默认处理
        // XMLHttpRequest会对 formdata 进行正确的处理
        processData: false,
        success: function (data) {
        	//给请求结果赋值
        	result = data;
        },
        error: function (){
        	alert("系统繁忙，请稍后重试！");
        }
	})
	//返回请求结果
	return result;
}

// 创建tr
function createTr(data){
	//创建tr对象
	var tr = $("<tr></tr>");
	//给tr绑定数据
	tr.data("data", data);
	//创建tds
	var tds = createTds(data);
	//将tds添加到tr
	tr.append(tds);
	//返回tr对象
	return tr;
}

// 创建tds
function createTds(data){
	var tds = "<td>" + data.name + "</td>" +
				"<td>" + data.time + "</td>" +
				"<td>" + data.size + "</td>" +
				"<td>" + "<button type='button' id='uploadPage_del'>删除</button>" + "</td>";
	return tds;
}