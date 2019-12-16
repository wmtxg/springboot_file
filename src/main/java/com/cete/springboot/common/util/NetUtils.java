package com.cete.springboot.common.util;

import java.net.URL;
import java.net.URLConnection;

import com.cete.springboot.common.exception.ServiceException;

/**
 * 网络编程相关工具类
 * 
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @time 2019年9月19日 上午9:45:36
 */
public class NetUtils {

	/**
	 * 检测连接url地址是否可用
	 * 
	 * @param urlString url地址
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年9月19日 上午9:50:42
	 */
	public static void testUrl(String urlString) {

		URL url;
		try {
			url = new URL(urlString);
			url.openStream();
		} catch (Exception e1) {
			url = null;
			throw new ServiceException("连接不可用，请检查连接地址是否正确！");

		}
	}

	/**
	 * 判断url地址在知道超时时间内是否可达
	 * 
	 * @param urlString          断url地址
	 * @param timeOutMillSeconds 超时时间
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年9月19日 上午9:51:09
	 */
	public static void testUrlWithTimeOut(String urlString, int timeOutMillSeconds) {
		URL url;
		try {
			url = new URL(urlString);
			URLConnection co = url.openConnection();
			co.setConnectTimeout(timeOutMillSeconds);
			co.connect();
		} catch (Exception e1) {
			url = null;
			throw new ServiceException("连接超时，请检查连接地址是否正确！");
		}
	}
}
