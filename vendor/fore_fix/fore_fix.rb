require_relative './city_enum.rb'
def get_monitor(id,time)
	model = get_model_by_id(id)
	return "city not find" if model == nil
	stime = time.beginning_of_hour
	etime = time.end_of_hour
	sql = Array.new
	sql << "data_real_time >= ? and data_real_time <= ? and id = ?"
	sql << stime
	sql << etime
	sql << id
	data_ary = model.where(sql)
	data_ary[0]
end

def get_forecast(stime,etime)
	stime = stime.beginning_of_hour
	etime = etime.end_of_hour
	sql = Array.new
	sql << "data_real_time => ? and data_real_time =< ?"
	sql << stime
	sql << etime
	data_ary = HourlyCityForecastAirQuality.where(sql)
	data_ary[0]
end

def get_model_by_name(city_name)
	model = false
	if CityEnum.baoding.include?(city_name)
		model = TempBdHour
	elsif CityEnum.langfang.include?(city_name)
		model = TempLfHour
	elsif CityEnum.china_city_74.include?(city_name)
		model = TempSfcitiesHour
	end
	model ? model : nil
end

def get_lev(a)
	if (0 .. 50) === a
		lev = 'you'
	elsif (50 .. 100) === a
		lev = 'yellow'
	elsif (100 .. 150) === a
		lev = 'qingdu'
	elsif (150 .. 200) === a
		lev = 'zhong'
	elsif (200 .. 300) === a
		lev = 'zhongdu'
	elsif (300 .. 5000) === a
		lev = 'yanzhong'
	end
end

#获取预报数据的预报时间，AQI
def get_aqi(line)
	sd = line[0,10]
	delta_hour = line[11,3]
	sdate = Time.local(sd[0,4],sd[4,2],sd[6,2],sd[8,2])

	hs = Hash.new
	hs[:forecast_datetime] = sdate+delta_hour.to_i*3600
	hs[:AQI] = line[14,4]
	hs
end

def lev()
	
end

def parse_line(line, c)
	hc = HourlyCityForecastAirQuality.new
	sd = line[0,10]
	delta_hour = line[11,3]
	sdate = Time.local(sd[0,4],sd[4,2],sd[6,2],sd[8,2])
	hc.publish_datetime = sdate
	hc.forecast_datetime = sdate+delta_hour.to_i*3600
	hc.AQI = line[14,4]
	hc.main_pol = line[18,13].strip
	hc.grade = line[31,1]
	hc.pm25 = line[99,6]
	hc.pm10 = line[87,6]
	hc.SO2 = line[39,6]
	hc.CO = line[63,6]
	hc.NO2 = line[51,6]
	hc.O3 = line[75,6]
	hc.VIS = line[32,7]
	hc.city_id = c.id
	hc.save
end

def fixed_write_txt(line,avg)
	aqi = line[14,4].to_i
	#line[14,4] = avg[get_lev(aqi)]*aqi if !avg[get_lev(aqi)].nil? 
	if !avg[get_lev(aqi)].nil? 
		fix_aqi = (aqi/avg[get_lev(aqi)]).round
		fix_aqi = 500 if fix_aqi > 500
		line[14,4] = " %3d" % fix_aqi
	end
	line
end

#设置9km缺省系数，与计算得到的系数求平均值
def default_9km
	cities_default=Hash.new
	# cities_default['changjiangkou'] = changjiangkou
	# cities_default['jinanshi'] = jinanshi
	# cities_default['hebeishi'] = hebeishi
	# cities_default['hangzhoushi'] = hangzhoushi
	# cities_default['zhengzhoushi'] = zhengzhoushi
	# cities_default['hetiandiq'] = hetiandiq
	# cities_default['kashidiqu'] = kashidiqu
	# changjiangkou = {'you'=>0.9,'yellow'=>0.9,'qingdu'=>1.28,'zhong'=>2.08,'zhongdu'=>2.48,'yanzhong'=>1.1}
	# jinanshi = {'you' =>0.8,'yellow' =>1,'qingdu'=>0.9,'zhong'=>1.1,'zhongdu'=>1.35,'yanzhong'=>1.55 }
	# hebeishi = {'you' =>1,'yellow' =>1,'qingdu'=>1.08,'zhong'=>1.19,'zhongdu'=>1.45,'yanzhong'=>1.85 }
	# hangzhoushi = {'you' =>0.9,'yellow' =>0.8,'qingdu'=>1,'zhong'=>1.08,'zhongdu'=>1.88,'yanzhong'=>1.1}
	# zhengzhoushi = {'you' =>0.8,'yellow' =>1,'qingdu'=>1,'zhong'=>1.28,'zhongdu'=>1.35,'yanzhong' => 1.55}
	# hetiandiq = {'you'=>1.1,'yellow' =>2.28,'qingdu'=>1.38,'zhong'=>1.08,'zhongdu'=>1.1,'yanzhong'=>1.1}
	# kashidiqu = hetiandiq 
	cities_default['baodingshi'] = {'you' =>0.70,'yellow' => 0.54,'qingdu'=>0.71,'zhong'=>0.95,'zhongdu'=>1.28,'yanzhong'=>1.41 }
	cities_default['taiyuanshi'] = {'you' =>0.90,'yellow' => 1.04,'qingdu'=>1.11,'zhong'=>1.25,'zhongdu'=>1.48,'yanzhong'=>1.61 }
	cities_default['langfangshi'] = {'you' =>0.70,'yellow' =>0.50,'qingdu'=>0.95,'zhong'=>0.91,'zhongdu'=>1.05,'yanzhong'=>1.05 }
    cities_default['beijingshi'] = {'you' =>0.70,'yellow' =>0.54,'qingdu'=>0.81,'zhong'=>1.14,'zhongdu'=>1.15,'yanzhong'=>1.15 }
	cities_default['shenyangshi'] = {'you' =>0.80,'yellow' => 0.94,'qingdu'=>1.01,'zhong'=>0.85,'zhongdu'=>0.98,'yanzhong'=>1.11 }
	cities_default['changchunshi'] = {'you' =>0.80,'yellow' => 0.94,'qingdu'=>1.81,'zhong'=>0.85,'zhongdu'=>0.98,'yanzhong'=>1.11 }
	cities_default['other'] = {'you' =>0.8,'yellow' =>0.9,'qingdu'=>0.90,'zhong'=>1.01,'zhongdu'=>1.34,'yanzhong'=>1.51}
	return cities_default
end

#25km缺省值写入哈希，此处为方便计算
def default_25km
	cities_default=Hash.new
	city_index = station_ext()
	#begin 长江口
	changjiangkou = {'you'=>0.9,'yellow'=>0.9,'qingdu'=>1.28,'zhong'=>2.08,'zhongdu'=>2.48,'yanzhong'=>2.1}
	#行号减一为i值
	for e in (79..103)
		next if e == 93
		# puts e.to_s+' '+city_index[e]
		cities_default[city_index[e]] = changjiangkou
	end		
	#end 长江口
	#begin 东北
	dongbei = {'you'=>0.5,'yellow'=>0.6,'qingdu'=>0.88,'zhong'=>0.88,'zhongdu'=>0.88,'yanzhong'=>1.01}
	for e in (44..67)
		next if e == 57
		next if e == 66
		cities_default[city_index[e]] = dongbei
		# puts e.to_s+' '+city_index[e]
	end		
	cities_default['shenyangshi'] = {'you' =>0.9,'yellow' =>0.9,'qingdu'=>0.98,'zhong'=>0.88,'zhongdu'=>1.08,'yanzhong'=>1.20}
	cities_default['changchunshi'] = {'you' =>0.9,'yellow' =>0.9,'qingdu'=>0.98,'zhong'=>0.88,'zhongdu'=>1.08,'yanzhong'=>1.20}
	cities_default['haerbinshi'] = {'you' =>0.9,'yellow' =>0.9,'qingdu'=>0.98,'zhong'=>0.88,'zhongdu'=>1.08,'yanzhong'=>1.20}
	#end 东北
	cities_default['jinanshi'] = {'you' =>0.9,'yellow' =>1,'qingdu'=>0.9,'zhong'=>1.1,'zhongdu'=>1.35,'yanzhong'=>1.55 }
	#hebeishen
	hengshuishi = {'you' =>1,'yellow' =>1,'qingdu'=>1.08,'zhong'=>1.19,'zhongdu'=>1.45,'yanzhong'=>1.85 }
	cities_default['hengshuishi'] = hengshuishi
	cities_default['handanshi']=hengshuishi
	cities_default['shijiazhuangshi'] = hengshuishi
	cities_default['xingtaishi'] = hengshuishi
	cities_default['tangshanshi'] = hengshuishi
	cities_default['chengdeshi'] = hengshuishi
	cities_default['cangzhoushi'] = hengshuishi
	cities_default['qinhuangdaoshi'] = hengshuishi
	cities_default['zhangjiakoushi'] = hengshuishi
	cities_default['baodingshi'] = {'you' =>0.58,'yellow' => 0.88,'qingdu'=>1.05,'zhong'=>0.95,'zhongdu'=>1.05,'yanzhong'=>0.85 }
	cities_default['langfangshi'] = {'you' =>0.6,'yellow' =>0.75,'qingdu'=>1,'zhong'=>0.95,'zhongdu'=>0.95,'yanzhong'=>1.05 }
	#end
	cities_default['hangzhoushi'] = {'you' =>0.9,'yellow' =>1.0,'qingdu'=>1.25,'zhong'=>1.38,'zhongdu'=>1.88,'yanzhong'=>1.35}
	cities_default['zhengzhoushi'] = {'you' =>0.8,'yellow' =>1,'qingdu'=>1,'zhong'=>1.28,'zhongdu'=>1.35,'yanzhong' => 1.55}
	cities_default['hetiandiqu'] = {'you' => 1.1,'yellow' =>2.28,'qingdu'=>1.38,'zhong'=>1.08,'zhongdu'=>1.1,'yanzhong'=>1.1}
	cities_default['kashidiqu'] = cities_default['hetiandiqu'] 
	cities_default['other'] = {'you' =>0.8,'yellow' =>1,'qingdu'=>1.78,'zhong'=>2.38,'zhongdu'=>2.58,'yanzhong'=>1.1}
	cities_default
end
#遍历station
def station_ext
	firstline = true
	city = Array.new
	IO.foreach("vendor/station.EXT") do |line|
		if firstline
			city << line
			next
		end
		post_number = line[1,7]
		latitude = line[8,8]
		longitude = line[16,8]
		city_name_pinyin = line[25,18].strip
		city << city_name_pinyin
	end
	return city
end
