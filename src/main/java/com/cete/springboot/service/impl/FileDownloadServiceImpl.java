package com.cete.springboot.service.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cete.springboot.common.exception.ServiceException;
import com.cete.springboot.common.util.NetUtils;
import com.cete.springboot.dao.MyFileDao;
import com.cete.springboot.entity.MyFile;
import com.cete.springboot.service.FileDownloadService;

/**
 * 文件下载业务层实现
 * 
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @time 2019年6月27日 下午9:25:07
 */
@Service
public class FileDownloadServiceImpl implements FileDownloadService {

	@Autowired
	private MyFileDao dao;

	@Override
	public void download(Integer id, HttpServletResponse response) {

		// 参数合法性校验
		if (StringUtils.isEmpty(id) || id < 0)
			throw new IllegalArgumentException("文件id异常，请重新发送请求！");
		// 初始化输入输出流对象
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			// 根据文件id获取文件信息
			MyFile myFile = dao.selectByPrimaryKey(id);
			// 根据id查询数据库，判断文件是否存在及其是否可用
			if (myFile == null)
				throw new ServiceException("您想要下载的文件不存在，可能已被删除！");
			// 如果文件状态码为0，说明不可用，给出想应提示
			if (myFile.getStatus() == 0)
				throw new ServiceException("您想要下载的文件不可用，请重新下载其它文件！");
			// 测试连接是否可用
			NetUtils.testUrl(URLDecoder.decode(myFile.getFilePath(), "UTF-8"));
			// 根据网络文件地址创建URL
			URL url = new URL(URLDecoder.decode(myFile.getFilePath(), "UTF-8"));
			// 获取此路径的连接
			URLConnection conn = url.openConnection();
			// 设置相应类型
			response.setContentType("application/x-download");
			// 设置下载文件名称
			response.setHeader("Content-Disposition",
					"attachment;fileName=" + new String(myFile.getName().getBytes("GBK"), "ISO-8859-1"));
			// 构造读取流
			bis = new BufferedInputStream(conn.getInputStream());
			// 构造输出流
			bos = new BufferedOutputStream(response.getOutputStream());
			// 复制文件
			IOUtils.copy(bis, bos);
			// 输出文件缓存
			bos.flush();
			// 下载次数+1
			myFile.setDownloadCount(myFile.getDownloadCount() + 1);
			// 更新文件下载次数
			dao.updateByPrimaryKey(myFile);
		} catch (Exception e) {
			if (e.getMessage().contains("地址是否正确")) {
				throw new ServiceException(e.getMessage());
			} else {
				throw new ServiceException("系统繁忙，请稍后重试！");
			}

		} finally {
			// 关流
			if (bis != null) {
				try {
					bis.close();
				} catch (IOException e) {
					throw new ServiceException("系统繁忙，请稍后重试！");
				}
			}
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					throw new ServiceException("系统繁忙，请稍后重试！");
				}
			}
		}
	}
}
