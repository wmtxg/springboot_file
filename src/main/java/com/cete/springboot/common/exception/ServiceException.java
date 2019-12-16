package com.cete.springboot.common.exception;

/**
 * 自定义异常？ 1）为什么要写自定义异常？更加明确的定位错误 2）如何编写自定义异常？（继承RuntimeException或Exception）
 */

public class ServiceException extends RuntimeException {

	private static final long serialVersionUID = -1169100027771948958L;

	public ServiceException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ServiceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public ServiceException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public ServiceException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
