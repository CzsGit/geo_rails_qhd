#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/vagrant/MeteoInfo/:/home/vagrant/.rbenv/shims/
# echo 'download data and figure'
 # cd /vagrant/script/
 # /vagrant/MeteoInfo/meteoinfo.sh post_download_orig.py > ../log_9km_orig.txt

# echo 'fix 9km txt'
# cd /vagrant/geo_rails_test/
rails r vendor/rd_hourly_aqi_9km_LF.rb -e production
#rails  r vendor/fore_fix/fore_74_rank.rb

