package com.cete.springboot.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cete.springboot.service.FileDownloadService;

@RestController
@RequestMapping("/file")
public class FileDownload {

	@Autowired
	private FileDownloadService service;

	/**
	 * 文件下载
	 * 
	 * @param id    文件id
	 * @param count 文件下载次数
	 * @param path  文件http路径
	 * @return 上传结果
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月27日 下午9:17:31
	 */
	@RequestMapping("/download/{id}")
	public void download(@PathVariable Integer id, HttpServletResponse response) {
		service.download(id, response);
	}

}
