package com.cete.springboot.service;

import javax.servlet.http.HttpServletResponse;

/**
 * 文件下载业务层接口
 * 
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @time 2019年6月27日 下午9:22:41
 */
public interface FileDownloadService {

	/**
	 * 下载文件
	 * 
	 * @param id       文件id
	 * @param response 响应对象
	 * @return
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年9月18日 下午4:14:32
	 */
	void download(Integer id, HttpServletResponse response);
}
