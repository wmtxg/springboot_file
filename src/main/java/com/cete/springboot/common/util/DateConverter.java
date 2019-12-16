package com.cete.springboot.common.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 日期格式转换器
 * 
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @time 2019年5月21日 下午2:33:27
 * @JsonSerialize(using=DateConverter.class) public Date getCreatedTime() {
 *                                           return createdTime; }
 */
public class DateConverter extends JsonSerializer<Date> {

	@Override
	public void serialize(Date value, JsonGenerator gen, SerializerProvider serializers)
			throws IOException, JsonProcessingException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String string = sdf.format(value);
		gen.writeString(string);
	}

}
