$(function(){
	
	//显示文件列表
	doListFiles();
	
	$("#downList_tbody")
	.on("click", "#downList_down", doDownload_downList)	//下载文件
	.on("click", "#downList_del", doDel_downList)		//删除文件
})

//显示文件列表
function doListFiles(){
	//获取请求结果
	var result = getFileList();
	//根据请求结果显示文件列表
	if(result.state == 1 && result.data.length > 0){
		createTbody(result.data);
	}else{
		initTableBody();
	}
}

//下载文件
function doDownload_downList(){
	//获取鼠标点击行绑定数据
	var data = $(this).parents("tr").data("data");
	//downLoadFile(data.id);
	window.open("http://localhost:2080/file/download/" + data.id);
	//获取当前文件下载数
	var count = $(this).parents("tr").find(".count").html();
	//下载数+1
	count = parseInt(count) + 1 + "次";
	//重新给该文件下载次数赋值
	$(this).parents("tr").find(".count").html(count);
}

//删除文件
function doDel_downList(){
	//获取鼠标点击行绑定数据
	var data = $(this).parents("tr").data("data");
	//弹窗信息
	var msg = "确定删除名称为【" + data.name + "】文件？"; 
	//弹窗确认是否进行删除操作
    if (confirm(msg)==true){  
    	//删除结果
    	var result = delFile(data);
    	//如果上传成功。删除该文件记录
    	if(result.state == 1){
    		//移除该行
    		$(this).parents("tr").remove();
    	}
    	//弹出删除结果
    	alert(result.msg); 
    }
}

//获取文件列表
function getFileList(){
	//请求结果
	var result = null;
	//发送ajax请求
	$.ajax({
		url: "http://localhost:2080/file/listFile",
		async: false,
        type: "post",
        success: function (data) {
        	//给请求结果赋值
        	result = data;
        }
	})
	//返回请求结果
	return result;
}

//删除文件
function delFile(data){
	//请求结果
	var result = null;
	//发送ajax请求
	$.ajax({
		url: "http://localhost:2080/file/delFile",
		async: false,
        type: "get",
        data: {"id": data.id},
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

//创建tr
function createTbody(data){
	//获取tbody对象
	var tbody = $("#downList_tbody");
	//清空tbody
	tbody.empty();
	//给tbody添加tr
	for(var i=0; i<data.length; i++){
		//新建tr对象
		var tr = $("<tr></tr>");
		//更新文件大小
		data[i].size = getFileSize(data[i].size);
		//绑定数据
		tr.data("data", data[i]);
		//创建tds
		var tds = createTds(i, data[i]);
		//给tr添加tds
		tr.append(tds);
		//给tbody添加tr
		tbody.append(tr);
	}

}

// 创建tds
function createTds(i, data){
	var tds = "<td>" + (i+1) + "</td>" +
				"<td>" + data.name + "</td>" +
				"<td>" + data.size + "</td>" +
				"<td>" + data.uploadTime + "</td>" +
				"<td class='count'>" + data.downloadCount + " 次</td>" +
				"<td>" + 
				"<button type='button' id='downList_down'>下载</button>" + 
				"<button type='button' id='downList_del'>删除</button>" +
				"</td>";
	return tds;
}

//初始化tbody信息
function initTableBody(){
	//获取body对象
	var tbody = $("#downList_tbody");
	//清空tbody
	tbody.empty();
	//给tbody添加提示信息
	var tr = $("<tr><td colspan=7>没有找到相关记录</td></tr>");
	tbody.append(tr);
}

function downLoadFile(id){
	var form=$("<form>");    // 定义一个form表单
	form.attr("style","display:none");
	form.attr("target","_blank");
	form.attr("method","post");
	form.attr("action","/file/download");    // 此处填写文件下载提交路径
	var input1=$("<input>");
	input1.attr("type","hidden");
	input1.attr("name","id");    // 后台接收参数名
	input1.attr("value",id);
	$("body").append(form);    // 将表单放置在web中
	form.append(input1);
	form.submit();    // 表单提交
}

