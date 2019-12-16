package com.cete.springboot.dao;

import org.apache.ibatis.annotations.Mapper;

import com.cete.springboot.common.mapper.TkMapper;
import com.cete.springboot.entity.MyFile;

@Mapper
public interface MyFileDao extends TkMapper<MyFile> {

}
