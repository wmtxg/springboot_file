package com.cete.springboot.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cete.springboot.common.exception.ServiceException;
import com.cete.springboot.dao.MyFileDao;
import com.cete.springboot.entity.MyFile;
import com.cete.springboot.service.FileListService;

import tk.mybatis.mapper.entity.Example;

@Service
public class FileListServiceImpl implements FileListService {

	@Autowired
	private MyFileDao dao;

	@Override
	public List<MyFile> listFiles() {
		MyFile f = new MyFile();
		f.setStatus(1);
		List<MyFile> list = null;
		try {
			// 通用Example查询  
			Example example = new Example(MyFile.class);
			// 查询状态码为1的数据
			example.createCriteria().andGreaterThanOrEqualTo("status", 1);
			// 按下载量降序排列
			example.setOrderByClause("download_count DESC");
			list = dao.selectByExample(example);
		} catch (Exception e) {
			throw new ServiceException("系统繁忙，请稍后重试");
		}
		return list;
	}

	@Override
	public void delFile(Integer id) {
		// 参数合法性校验
		if (StringUtils.isEmpty(id) || id <= 0)
			throw new ServiceException("id异常");
		try {
			dao.deleteByPrimaryKey(id);
		} catch (Exception e) {
			throw new ServiceException("系统繁忙，请稍后重试");
		}

	}

}
