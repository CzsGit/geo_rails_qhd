function initDatePicker(){$("#reservation").daterangepicker({format:"YYYY-MM-DD"},function(t,e){startTime=new Date(t.format("YYYY-MM-DD")),endTime=new Date(e.format("YYYY-MM-DD")),dateDiff=Math.floor((endTime.getTime()-startTime.getTime())/864e5),$(".btndategroup1").removeClass("btnbd-success"),dateDiff>30&&"HOUR"==type?($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(1)").addClass("btnbd-success"),type="DAY"):dateDiff<=2&&("DAY"==type||"MONTH"==type)?($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(0)").addClass("btnbd-success"),type="HOUR"):dateDiff<30&&"MONTH"==type&&($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(1)").addClass("btnbd-success"),type="DAY"),startTime=t.format("YYYY-MM-DD"),endTime=e.format("YYYY-MM-DD"),getData()})}function getTimeSelect(){startTime=new Date,"DAY"==DATE?(startTime.setHours(startTime.getHours()-27),startTime.setMinutes(0),startTime.setSeconds(0)):"WEEK"==DATE?(startTime.setDate(startTime.getDate()-7),startTime.setHours(0),startTime.setMinutes(0),startTime.setSeconds(0)):"MONTH"==DATE?(startTime.setMonth(startTime.getMonth()-1),startTime.setHours(0),startTime.setMinutes(0),startTime.setSeconds(0)):"YEAR"==DATE&&(startTime.setMonth(startTime.getMonth()-12),startTime.setMonth(0),startTime.setDate(1),startTime.setHours(0),startTime.setMinutes(0),startTime.setSeconds(0)),endTime=new Date,startDate=startTime.pattern("yyyy-MM-dd"),endDate=endTime.pattern("yyyy-MM-dd"),startTime=startTime.pattern("yyyy-MM-dd HH:mm:ss"),endTime=endTime.pattern("yyyy-MM-dd HH:mm:ss"),$("#reservation").val(startDate+" - "+endDate),$("#reservation").daterangepicker({startDate:startDate,endDate:endDate}),initDatePicker(),getData()}function getData(){city1=$("#city1").val(),$.cookie("dqx1",city1,{expires:30}),city2=$("#city2").val(),$.cookie("dqx2",city2,{expires:30}),city3=$("#city3").val(),$.cookie("dqx3",city3,{expires:30}),$.ajax({url:"/welcome/bdqx_compare_chart",data:{city1:city1,city2:city2,city3:city3,type:type,startTime:startTime,endTime:endTime},type:"get",dataType:"json",success:function(t){if(t.rows.length>0){for(data1AQI.splice(0,data1AQI.length),data1PM25.splice(0,data1PM25.length),data1PM10.splice(0,data1PM10.length),data1CO.splice(0,data1CO.length),data1NO2.splice(0,data1NO2.length),data1O3.splice(0,data1O3.length),data1SO2.splice(0,data1SO2.length),data1Index.splice(0,data1Index.length),data1Temp.splice(0,data1Temp.length),data1Humi.splice(0,data1Humi.length),data1Wind.splice(0,data1Wind.length),data2AQI.splice(0,data2AQI.length),data2PM25.splice(0,data2PM25.length),data2PM10.splice(0,data2PM10.length),data2CO.splice(0,data2CO.length),data2NO2.splice(0,data2NO2.length),data2O3.splice(0,data2O3.length),data2SO2.splice(0,data2SO2.length),data2Index.splice(0,data2Index.length),data2Temp.splice(0,data2Temp.length),data2Humi.splice(0,data2Humi.length),data2Wind.splice(0,data2Wind.length),data3AQI.splice(0,data3AQI.length),data3PM25.splice(0,data3PM25.length),data3PM10.splice(0,data3PM10.length),data3CO.splice(0,data3CO.length),data3NO2.splice(0,data3NO2.length),data3O3.splice(0,data3O3.length),data3Index.splice(0,data3Index.length),data3SO2.splice(0,data3SO2.length),data3Temp.splice(0,data3Temp.length),data3Humi.splice(0,data3Humi.length),data3Wind.splice(0,data3Wind.length),i=0;i<t.rows.length;i++)citynum=t.rows[i].alldata.city_id,time=t.rows[i].timeformatted,aqi=parseInt(t.rows[i].alldata.AQI),pm2_5=parseInt(t.rows[i].alldata.pm25),pm10=parseInt(t.rows[i].alldata.pm10),co=parseFloat(parseFloat(t.rows[i].alldata.CO).toFixed(3)),no2=parseInt(t.rows[i].alldata.NO2),o3=parseInt(t.rows[i].alldata.O3),so2=parseInt(t.rows[i].alldata.SO2),complexindex=parseFloat(parseFloat(t.rows[i].alldata.zonghezhishu).toFixed(3)),temp=parseInt(t.rows[i].alldata.temp),humi=parseInt(t.rows[i].alldata.humi),wind=parseInt(t.rows[i].alldata.windscale),winddirection=t.rows[i].alldata.winddirection,wdurl=getWindDirectionUrl(winddirection),primary_pollutant=t.rows[i].alldata.main_pol,aqiIndex=getAQILevelIndex(aqi),pm25Index=getPM25LevelIndex(pm2_5),pm10Index=getPM10LevelIndex(pm10),coIndex=getCOLevelIndex(co),no2Index=getNO2LevelIndex(no2),o3Index=getO3LevelIndex(o3),so2Index=getSO2LevelIndex(so2),citynum==t.citynum[0]?(data1AQI.push({x:converTimeFormat(time).getTime(),y:aqi,color:getColorByIndex(aqiIndex),primary_pollutant:primary_pollutant}),data1PM25.push({x:converTimeFormat(time).getTime(),y:pm2_5,color:getColorByIndex(pm25Index)}),data1PM10.push({x:converTimeFormat(time).getTime(),y:pm10,color:getColorByIndex(pm10Index)}),data1CO.push({x:converTimeFormat(time).getTime(),y:co,color:getColorByIndex(coIndex)}),data1NO2.push({x:converTimeFormat(time).getTime(),y:no2,color:getColorByIndex(no2Index)}),data1O3.push({x:converTimeFormat(time).getTime(),y:o3,color:getColorByIndex(o3Index)}),data1SO2.push({x:converTimeFormat(time).getTime(),y:so2,color:getColorByIndex(so2Index)}),data1Index.push({x:converTimeFormat(time).getTime(),y:complexindex}),temp>-100&&temp<200&&data1Temp.push({x:converTimeFormat(time).getTime(),y:temp}),humi>0&&data1Humi.push({x:converTimeFormat(time).getTime(),y:humi}),wind>0&&data1Wind.push({x:converTimeFormat(time).getTime(),y:wind,marker:{symbol:wdurl},winddirection:winddirection,weather:t.rows[i].weather})):citynum==t.citynum[1]?(data2AQI.push({x:converTimeFormat(time).getTime(),y:aqi,color:getColorByIndex(aqiIndex),primary_pollutant:primary_pollutant}),data2PM25.push({x:converTimeFormat(time).getTime(),y:pm2_5,color:getColorByIndex(pm25Index)}),data2PM10.push({x:converTimeFormat(time).getTime(),y:pm10,color:getColorByIndex(pm10Index)}),data2CO.push({x:converTimeFormat(time).getTime(),y:co,color:getColorByIndex(coIndex)}),data2NO2.push({x:converTimeFormat(time).getTime(),y:no2,color:getColorByIndex(no2Index)}),data2O3.push({x:converTimeFormat(time).getTime(),y:o3,color:getColorByIndex(o3Index)}),data2SO2.push({x:converTimeFormat(time).getTime(),y:so2,color:getColorByIndex(so2Index)}),data2Index.push({x:converTimeFormat(time).getTime(),y:complexindex}),temp>-100&&temp<200&&data2Temp.push({x:converTimeFormat(time).getTime(),y:temp}),humi>0&&data2Humi.push({x:converTimeFormat(time).getTime(),y:humi}),wind>0&&data2Wind.push({x:converTimeFormat(time).getTime(),y:wind,marker:{symbol:wdurl},winddirection:winddirection,weather:t.rows[i].weather})):citynum==t.citynum[2]&&(data3AQI.push({x:converTimeFormat(time).getTime(),y:aqi,color:getColorByIndex(aqiIndex),primary_pollutant:primary_pollutant}),data3PM25.push({x:converTimeFormat(time).getTime(),y:pm2_5,color:getColorByIndex(pm25Index)}),data3PM10.push({x:converTimeFormat(time).getTime(),y:pm10,color:getColorByIndex(pm10Index)}),data3CO.push({x:converTimeFormat(time).getTime(),y:co,color:getColorByIndex(coIndex)}),data3NO2.push({x:converTimeFormat(time).getTime(),y:no2,color:getColorByIndex(no2Index)}),data3O3.push({x:converTimeFormat(time).getTime(),y:o3,color:getColorByIndex(o3Index)}),data3SO2.push({x:converTimeFormat(time).getTime(),y:so2,color:getColorByIndex(so2Index)}),data3Index.push({x:converTimeFormat(time).getTime(),y:complexindex}),temp>-100&&temp<200&&data3Temp.push({x:converTimeFormat(time).getTime(),y:temp}),humi>0&&data3Humi.push({x:converTimeFormat(time).getTime(),y:humi}),wind>0&&data3Wind.push({x:converTimeFormat(time).getTime(),y:wind,marker:{symbol:wdurl},winddirection:winddirection,weather:t.rows[i].weather}));showChartByItem()}}})}function showChartByItem(){var t=ITEM;switch(ITEM){case"AQI":data1Array=data1AQI,data2Array=data2AQI,data3Array=data3AQI,unit="";break;case"PM2.5":data1Array=data1PM25,data2Array=data2PM25,data3Array=data3PM25,unit="ug/m<sup>3<sup/>";break;case"PM10":data1Array=data1PM10,data2Array=data2PM10,data3Array=data3PM10,unit="ug/m<sup>3<sup/>";break;case"SO2":data1Array=data1SO2,data2Array=data2SO2,data3Array=data3SO2,unit="ug/m<sup>3<sup/>";break;case"NO2":data1Array=data1NO2,data2Array=data2NO2,data3Array=data3NO2,unit="ug/m<sup>3<sup/>";break;case"CO":data1Array=data1CO,data2Array=data2CO,data3Array=data3CO,unit="mg/m<sup>3<sup/>";break;case"O3":data1Array=data1O3,data2Array=data2O3,data3Array=data3O3,unit="ug/m<sup>3<sup/>";break;case"INDEX":data1Array=data1Index,data2Array=data2Index,data3Array=data3Index,unit="",t="\u7efc\u5408\u6307\u6570";break;case"TEMP":data1Array=data1Temp,data2Array=data2Temp,data3Array=data3Temp,unit="\u2103",t="\u6e29\u5ea6";break;case"HUMI":data1Array=data1Humi,data2Array=data2Humi,data3Array=data3Humi,unit="%",t="\u6e7f\u5ea6";break;case"WIND":data1Array=data1Wind,data2Array=data2Wind,data3Array=data3Wind,unit="\u7ea7",t="\u98ce\u7ea7"}showLineChartCompare("chart",t,city1,city2,city3,data1Array,data2Array,data3Array,unit,type)}var city1="\u767d\u6c9f\u65b0\u57ce",city2="\u6ee1\u57ce\u53bf",city3="\u6e05\u82d1\u53bf",type="HOUR",ITEM="AQI",DATE="DAY",data1AQI=[],data1PM25=[],data1PM10=[],data1CO=[],data1SO2=[],data1NO2=[],data1O3=[],data1Index=[],data1Humi=[],data1Temp=[],data1Wind=[],data2AQI=[],data2PM25=[],data2PM10=[],data2CO=[],data2SO2=[],data2NO2=[],data2O3=[],data2Index=[],data2Humi=[],data2Temp=[],data2Wind=[],data3AQI=[],data3PM25=[],data3PM10=[],data3CO=[],data3SO2=[],data3NO2=[],data3O3=[],data3Index=[],data3Humi=[],data3Temp=[],data3Wind=[];$(function(){Highcharts.setOptions({global:{useUTC:!1}}),null!=$.cookie("dqx1")&&(city1=$.cookie("dqx1")),null!=$.cookie("dqx2")&&(city2=$.cookie("dqx2")),null!=$.cookie("dqx3")&&(city3=$.cookie("dqx3")),$("#city1").attr("value",city1),$("#city2").attr("value",city2),$("#city3").attr("value",city3);new Vcity.CitySelector({input:"city1"}),new Vcity.CitySelector({input:"city2"}),new Vcity.CitySelector({input:"city3"});getTimeSelect(),$("#myTab1 a:first").tab("show"),$("#myTab1 a").click(function(t){t.preventDefault(),$(this).tab("show")}),$(".btndategroup1:eq(0)").addClass("btnbd-success"),$(".btndategroup1").click(function(){DATE=$(this).val(),$(".btndategroup1").removeClass("btnbd-success"),$(this).addClass("btnbd-success"),"DAY"==DATE?($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(0)").addClass("btnbd-success"),type="HOUR"):"WEEK"==DATE&&"MONTH"==type?($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(0)").addClass("btnbd-success"),type="HOUR"):"MONTH"!=DATE||"HOUR"!=type&&"MONTH"!=type?"YEAR"==DATE&&"HOUR"==type&&($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(1)").addClass("btnbd-success"),type="DAY"):($(".btntypegroup1").removeClass("btnbd-success"),$(".btntypegroup1:eq(1)").addClass("btnbd-success"),type="DAY"),getTimeSelect()}),$(".btntypegroup1:eq(0)").addClass("btnbd-success"),$(".btntypegroup1").click(function(){type=$(this).val(),$(".btntypegroup1").removeClass("btnbd-success"),$(this).addClass("btnbd-success"),"HOUR"==type&&"YEAR"==DATE?($(".btndategroup1").removeClass("btnbd-success"),$(".btndategroup1:eq(0)").addClass("btnbd-success"),DATE="DAY"):"DAY"==type&&"DAY"==DATE?($(".btndategroup1").removeClass("btnbd-success"),$(".btndategroup1:eq(1)").addClass("btnbd-success"),DATE="MONTH"):"MONTH"!=type||"DAY"!=DATE&&"WEEK"!=DATE&&"MONTH"!=DATE||($(".btndategroup1").removeClass("btnbd-success"),$(".btndategroup1:eq(3)").addClass("btnbd-success"),DATE="YEAR"),getTimeSelect()}),$(".btnitemgroup1:first").addClass("btnbd-success"),$(".btnitemgroup1").click(function(){ITEM=$(this).val(),$(".btnitemgroup1").removeClass("btnbd-success"),$(this).addClass("btnbd-success"),showChartByItem()})});