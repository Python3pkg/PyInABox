while [ 1 ]
do
  clear
  read -p 'login: ' iv;su -l "$iv";
  sleep 15
done
