package com.cete.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cete.springboot.common.vo.JsonResult;
import com.cete.springboot.service.FileUploadService;

@RestController
@RequestMapping("/file")
public class FileUploadController {

	@Autowired
	private FileUploadService fileUploadService;

	/**
	 * 实现单文件上传
	 * 
	 * @param file 待上传文件
	 * @return 上传结果
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月27日 下午9:20:17
	 */
	@RequestMapping("/uploadFile")
	private JsonResult uploadFile(@RequestParam("file") MultipartFile file) {
		return new JsonResult(fileUploadService.uploadFile(file), "上传成功！");
	}

	/**
	 * 多文件上传
	 * 
	 * @param files 待上传文件
	 * @return 上传结果
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月27日 下午9:20:55
	 */
	@RequestMapping("/uploadFiles")
	private JsonResult uploadFiles(@RequestParam("files") MultipartFile[] files) {
		return new JsonResult(fileUploadService.uploadFiles(files), "上传成功！");
	}

	/**
	 * 上传多张图片文件
	 * 
	 * @param files 图片文件
	 * @return 上传结果
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月27日 下午9:21:20
	 */
	@RequestMapping("/uploadImgs")
	private JsonResult uploadImgs(@RequestParam("files") MultipartFile[] files) {
		return new JsonResult(fileUploadService.uploadImgs(files), "上传成功！");
	}
}
