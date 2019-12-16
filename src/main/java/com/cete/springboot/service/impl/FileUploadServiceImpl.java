package com.cete.springboot.service.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cete.springboot.common.exception.ServiceException;
import com.cete.springboot.dao.MyFileDao;
import com.cete.springboot.entity.MyFile;
import com.cete.springboot.service.FileUploadService;

@Service
public class FileUploadServiceImpl implements FileUploadService {

	// 文件上传存储路径
	@Value("${image.path}")
	private String filepath;

	// 上传文件最大值
	@Value("${spring.http.multipart.max-file-size}")
	private String max_file_size;

	// 默认文件http路径前缀
	private final String HTTP_HEAD = "http://file.com/";

	@Autowired
	private MyFileDao dao;

	/**
	 * 1.校验文件是否为图片 2.判断是否为恶意程序 3.由于文件个数较多，采用分文件存储的格式 4.为了避免文件重复，采用追加字符串的方式定义
	 * 5.实现文件上传
	 */
	@Override
	public String uploadFile(MultipartFile uploadFile) {
		// 获取上传文件名称
		String fileName = uploadFile.getOriginalFilename();
		// 去除文件名称中所有空格
		fileName = fileName.replaceAll(" ", "");
		// 获取指定格式的当前日期
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String date = format.format(new Date());
		// 判断上传文件路径是否存在，如果不存在则补全
		File file = new File(filepath + date);
		if (!file.exists()) {
			file.mkdirs();
		}
		// 拼接文件保存地址
		String dirpath = filepath + date + "/" + fileName;
		// 创建待保存文件
		File picFile = new File(dirpath);
		try {
			// 传输文件
			uploadFile.transferTo(picFile);
			// 将文件信息存入数据库
			MyFile f = new MyFile();
			f.setFilePath(HTTP_HEAD + date + "/" + fileName);
			f.setName(fileName);
			f.setSize(uploadFile.getSize());
			dao.insert(f);
		} catch (IOException e) {
			throw new ServiceException("系统繁忙，请稍后重试！");
		}
		// 返回虚拟路径
		return HTTP_HEAD + date + "/" + fileName;
	}

	@Override
	public String uploadFiles(MultipartFile[] files) {
		String path = "";
		// 循环上传
		for (int i = 0; i < files.length; i++) {
			path += uploadFile(files[i]) + ";";
		}
		return path.substring(0, path.length() - 1);
	}

	@Override
	public String uploadImg(MultipartFile uploadFile) {
		// 获取上传文件名称
		String fileName = uploadFile.getOriginalFilename();
		// 去除文件名称中所有空格
		fileName = fileName.replaceAll(" ", "");
		// 判断文件是否为图片格式
		if (fileName.matches("^.*(jpg|png|gif|bmp)$")) {
			// 判断是否为恶意程序
			try {
				// 读取图片文件
				BufferedImage bufferedImage = ImageIO.read(uploadFile.getInputStream());
				// 获取宽度和高度
				int height = bufferedImage.getHeight();
				int width = bufferedImage.getWidth();
				if (height > 0 && width > 0) {

				} else {
					throw new ServiceException("该文件可能为恶意程序，请重新上传！");
				}
			} catch (Exception e) {
				throw new ServiceException("系统繁忙，请稍后重试！");
			}
			// 获取指定格式的当前日期
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
			String date = format.format(new Date());
			// 判断上传文件路径是否存在，如果不存在则补全
			File file = new File(filepath + date);
			if (!file.exists()) {
				file.mkdirs();
			}
			// 拼接文件保存地址
			String dirpath = filepath + date + "/" + fileName;
			// 创建待保存文件
			File picFile = new File(dirpath);
			try {
				// 传输文件
				uploadFile.transferTo(picFile);
				// 将文件信息存入数据库
				MyFile f = new MyFile();
				f.setFilePath(HTTP_HEAD + date + "/" + fileName);
				f.setName(fileName);
				f.setSize(uploadFile.getSize());
				dao.insert(f);
			} catch (IOException e) {
				throw new ServiceException("系统繁忙，请稍后重试！");
			}
			return HTTP_HEAD + date + "/" + fileName;
		} else {
			throw new ServiceException("上传文件格式不正确，请重新上传！");
		}
	}

	@Override
	public String uploadImgs(MultipartFile[] uploadFiles) {
		String path = "";
		// 循环上传
		for (int i = 0; i < uploadFiles.length; i++) {
			// 获取上传文件名称
			String fileName = uploadFiles[i].getOriginalFilename();
			if (fileName.matches("^.*(jpg|png|gif|bmp)$")) {
				// 判断是否为恶意程序
				try {
					BufferedImage bufferedImage = ImageIO.read(uploadFiles[i].getInputStream());
					// 获取宽度和高度
					int height = bufferedImage.getHeight();
					int width = bufferedImage.getWidth();
					if (height > 0 && width > 0) {
						path += uploadImg(uploadFiles[i]) + ";";
					}
				} catch (Exception e) {
					throw new ServiceException("系统繁忙，请稍后重试！");
				}
			}
		}
		if (path.length() - 1 > 0) {
			return path.substring(0, path.length() - 1);
		} else {
			return path;
		}
	}

	private Long getMaxFileSize(String max_file_size) {
		return null;
	}

}
