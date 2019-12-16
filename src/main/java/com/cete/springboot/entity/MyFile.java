package com.cete.springboot.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

import com.cete.springboot.common.util.DateConverter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@SuppressWarnings("serial")
@Table(name = "file")
public class MyFile implements Serializable {

	@Id
	private Integer id;
	private String name;
	private Date uploadTime;
	private Long size;
	private String filePath;
	private Integer status = 1;
	private Integer downloadCount = 0;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonSerialize(using = DateConverter.class)
	public Date getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getDownloadCount() {
		return downloadCount;
	}

	public void setDownloadCount(Integer downloadCount) {
		this.downloadCount = downloadCount;
	}

	@Override
	public String toString() {
		return "MyFile [id=" + id + ", name=" + name + ", uploadTime=" + uploadTime + ", size=" + size + ", filePath="
				+ filePath + ", status=" + status + ", downloadCount=" + downloadCount + "]";
	}

}
