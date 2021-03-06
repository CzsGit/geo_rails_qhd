#!/usr/bin/ruby

firstline = true
IO.foreach("vendor/station.EXT") do |line| 
  if firstline
    firstline = false
    next
  end
  post_number = line[1,7]
  latitude = line[8,8]
  longitude = line[16,8]
  city_name_pinyin = line[25,18].strip
  city_name  = line[46..-4].strip

  c = City.find_by_post_number(post_number)
  c = City.new if c == nil

  c.city_name = city_name
  c.city_name_pinyin = city_name_pinyin
  c.post_number = post_number
  c.longitude = longitude
  c.latitude = latitude
  c.save 
  puts city_name
end
