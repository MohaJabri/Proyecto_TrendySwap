docker pull mohajabri/trendyswap_front:master
docker rm $(docker stop $(docker ps -a -q --filter ancestor=mohajabri/trendyswap_front:master --format="{{.ID}}"))
docker run -d -p 80:80 mohajabri/trendyswap_front:master