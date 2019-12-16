
/**
 * 判断一个值是否为undefined、null或""
 * @param obj	待校验对象
 * @returns		校验结果
 */
function isEmpty_wmtxg(obj){
	if(obj == undefined || obj == null || obj == ""){
		return true;
	}
	return false;
}

/**
 * 判断对象是否为数组
 * @param obj	待校验对象
 * @returns		校验结果
 */
function isArray_wmtxg(obj){
	if($.isArray(obj)){
		return true;
	}
	return false;
}

/**
 * 判断对象是否为空对象
 * @param obj	待校验对象
 * @returns		校验结果
 */
function isEmptyObject_wmtxg(obj){
	if($.isEmptyObject(obj)){
		return true;
	}
	return false;
}

/**
 * 判断文件是否为图片文件
 * @param obj	文件名称
 * @returns		校验结果
 */
function isImage_wmtxg(obj){
	var reg = /.(gif|jpg|jpeg|png|gif|jpg|png)$/;
	if(reg.test(obj.toLowerCase())){
		return true;
	}
	return false;
}

/**
 * 获取带单位的文件大小
 * @param size	文件大小
 * @returns		返回带文件大小（带单位）
 */
function getFileSize(size){
	if(size >= 1024){
		size = size / 1024;
		if(size >= 1024){
			size = size / 1024;
			if(size >= 1024){
				size = size / 1024;
				return size.toFixed(2) + "GB";
			}else{
				return size.toFixed(2) + "MB";
			}
		}else{
			return size.toFixed(2) + "KB";
		}
	}
	return size + "B"
}


