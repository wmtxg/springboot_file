package com.cete.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UIController {

	@RequestMapping("fileUpload1.html")
	public String fileUploadPage1() {
		return "FileUpload1";
	}

	@RequestMapping("fileUpload2.html")
	public String fileUploadPage2() {
		return "FileUpload2";
	}

	@RequestMapping("fileUpload3.html")
	public String fileUploadPage3() {
		return "FileUpload3";
	}

	@RequestMapping("fileUpload4.html")
	public String fileUploadPage4() {
		return "FileUpload4";
	}

	@RequestMapping("fileUpload5.html")
	public String fileUploadPage5() {
		return "FileUpload5";
	}

	@RequestMapping("fileUpload6.html")
	public String fileUploadPage6() {
		return "FileUpload6";
	}

	@RequestMapping("fileUpload7.html")
	public String fileUploadPage7() {
		return "FileUpload7";
	}

	@RequestMapping("fileList.html")
	public String fileList() {
		return "file_list";
	}
}
