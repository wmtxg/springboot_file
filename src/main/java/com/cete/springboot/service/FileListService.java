package com.cete.springboot.service;

import java.util.List;

import com.cete.springboot.entity.MyFile;

/**
 * 文件列表获取业务层接口
 * 
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @time 2019年6月27日 下午9:24:00
 */
public interface FileListService {

	/**
	 * 获取所有文件列表
	 * 
	 * @return 文件列表
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月26日 下午5:34:12
	 */
	List<MyFile> listFiles();

	/**
	 * 根据id删除文件
	 * 
	 * @param id 文件id
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年6月28日 下午2:42:01
	 */
	void delFile(Integer id);
}
