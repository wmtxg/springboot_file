package com.cete.springboot.common.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cete.springboot.common.exception.ServiceException;
import com.cete.springboot.common.vo.JsonResult;

/** 全局异常处理类 */
@ControllerAdvice
public class ControllerExceptionHandler {
	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseBody
	public JsonResult doHandleArgumentException(IllegalArgumentException e) {
		return new JsonResult(e);
	}

	@ExceptionHandler(ServiceException.class)
	@ResponseBody
	public JsonResult doHandleServiceException(ServiceException e) {
		return new JsonResult(e);
	}

	@ExceptionHandler(Error.class)
	@ResponseBody
	public JsonResult doHandleError(Error e) {
		return new JsonResult(e);
	}
}
