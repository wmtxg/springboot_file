package com.cete.springboot.common.vo;

import java.io.Serializable;

public class JsonResult implements Serializable {

	private static final long serialVersionUID = -856924038217431339L;

	private Integer state = 1; // 状态码
	private String msg = "OK"; // 状态消息
	private Object data; // 正确数据

	public JsonResult() {
		super();
		// TODO Auto-generated constructor stub
	}

	public JsonResult(Object data, String msg) {
		super();
		this.msg = msg;
		this.data = data;
	}

	public JsonResult(Object data) {
		super();
		this.data = data;
	}

	public JsonResult(Throwable t) {
		this.state = 0;
		this.msg = t.getMessage();
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "JsonResult [state=" + state + ", msg=" + msg + ", data=" + data + "]";
	}

}
