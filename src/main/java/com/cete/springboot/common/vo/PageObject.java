package com.cete.springboot.common.vo;

import java.io.Serializable;
import java.util.List;

/*
 * 泛型：
 * 1.是什么？JDK1.5以后推出的一种编译时类型。(运行时无效)
 * 2.作用是？用于更好约束类中属性类型，方法参数类型以及返回值类型
 * 值对象：
 * 1.是什么？（Value Object）
 * 2.作用是？封装值、值传递
 * 与实体对象本质不同？不存在与数据库中表的对应关系。
 */
public class PageObject<T> implements Serializable {

	private static final long serialVersionUID = 5251083197918929785L;

	private Integer pageNum = 1; // 当前页码值
	private Integer pageSize = 3; // 页面大小
	private Integer rowCount; // 总记录数（查询数据库所得）
	private Integer pageCount; // 总页数（总记录数/页面大小）
	private List<T> recodes; // 当前页记录

	public Integer getPageCurrent() {
		return pageNum;
	}

	public void setPageCurrent(Integer pageCurrent) {
		this.pageNum = pageCurrent;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getRowCount() {
		return rowCount;
	}

	public void setRowCount(Integer rowCount) {
		this.rowCount = rowCount;
	}

	public Integer getPageCount() {
		// 将对象转换为json串时底层调用的是对象的get方法
		pageCount = rowCount / pageSize;
		if (rowCount % pageSize != 0) {
			pageCount++;
		}
		return pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	public List<T> getRecodes() {
		return recodes;
	}

	public void setRecodes(List<T> recodes) {
		this.recodes = recodes;
	}

	@Override
	public String toString() {
		return "PageObject [pageCurrent=" + pageNum + ", pageSize=" + pageSize + ", rowCount=" + rowCount
				+ ", pageCount=" + pageCount + ", recodes=" + recodes + "]";
	}

}
