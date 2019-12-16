package com.cete.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cete.springboot.common.vo.JsonResult;
import com.cete.springboot.service.FileListService;

@RestController
@RequestMapping("/file")
public class FileList {

	@Autowired
	private FileListService service;

	/**
	 * 获取文件列表
	 * 
	 * @return 文件列表
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月27日 下午9:19:07
	 */
	@RequestMapping("/listFile")
	private JsonResult uploadFile() {
		return new JsonResult(service.listFiles(), "上传成功！");
	}

	/**
	 * 获取文件列表
	 * 
	 * @return 文件列表
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月27日 下午9:19:07
	 */
	@RequestMapping("/delFile")
	private JsonResult delFile(Integer id) {
		service.delFile(id);
		return new JsonResult(null, "删除成功！");
	}
}
