package com.cete.springboot.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传业务层接口
 * 
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @time 2019年6月27日 下午9:24:54
 */
public interface FileUploadService {

	/**
	 * 上传单个文件
	 * 
	 * @param file 待上传文件
	 * @return 文件保存路径
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月26日 下午2:42:44
	 */
	String uploadFile(MultipartFile file);

	/**
	 * 上传多个文件
	 * 
	 * @param files 待上传文件
	 * @return 文件保存路径
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月26日 下午2:43:47
	 */
	String uploadFiles(MultipartFile[] files);

	/**
	 * 上传单张图片文件
	 * 
	 * @param file 待上传图片
	 * @return 文件保存路径
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月26日 下午2:44:10
	 */
	String uploadImg(MultipartFile file);

	/**
	 * 上传多张图片文件
	 * 
	 * @param files 待上传图片
	 * @return 文件保存路径
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月26日 下午2:44:33
	 */
	String uploadImgs(MultipartFile[] files);
}
