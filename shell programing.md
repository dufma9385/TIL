## 7. 셸 스크립트 프로그래밍 

#### 커널 = 명령어 세트

#### 셸 = 명령어 전달 :  (프롬프트) 명령 [옵션...] [인자...]

셸 프로그램을 만들 때 꼭 확장명이 필요한 것은 아님(셸이라는 것을 밝히고자 할때만 사용)

##### **#!** = bash를 사용하겠다는 주석

**chmod +x 파일이름** : 실행권한을 부여

셸 스크립트에서는 변수를 사용하기 전에 미리 선언하지 않는다 => 할당을 하면 자동으로 선언된다



" ", ' '를 사용한 값을 가질 수 있지만 보안에 어긋난다...?

숫자계산 :  백틱 ` 필요 처음과 끝에 붙여야한다

파라미터의 변수  $n 의 형태를 갖는다 = 실행하는 명령의 부분 하나하나를 변수로 지정



### if [  조건  ]

#### then

#### 	참일 때 실행

#### fi 

​	: 조건 사이의 각 단어에는 모두 공백이 있어야 한다

##### if4.sh (파일과 관련된 조건)

```sh
#!/bin/sh
fname=/lib/systemd/system/cron.servie
if [ -f $fname ]
then
	head -5 $fname
else
	echo "cron서버가 설치되지 않았다"
fi
exit 0
```

#### case 조건 in

#### 	case 1)

#### 		실행

#### 	case 2)

#### 		실행

#### esac

#### exit

##### case.sh(파라미터와 함께 입력 하면 무엇인지 판별)

```shell
#!/bin/sh
case "$1" in
	start)
		echo "start"
	stop)
		echo "stop"
	restart)
		echo "restart"
	*)
		echo "?"
esac
exit 0
```

##### while3.sh(비밀번호 맞을때까지 입력)

```shell
#!/bin/sh
echo "ㅂㅣ번입력"
read mypass
while [ $mypass != "1234" ]
do
	echo "x, again"
	read mypass
done
echo "success"
exit 0

```

##### bce.sh(입려값에 따른 수행)

```shell
#!/bin/sh
echo "무한반복 입력시작 (b:break, c: continue e: exit)"
while [ 1 ] ; do
	read input
	case $input in
		b | B)
			break;;
		c | C)
			echo "continue를 누르면 while의 조건으로 돌아감"
			continue ;;
		e | E)
			echo "exit를 누르면 프로그램종료"
			exit 1;;
	esac;
done
echo "break를 누르면 while을 빠져나와 지금 이 문장이 출력됨."
exit 0
```

printf.sh   (보안에 굉장히 취약, 사용하지 않는다)

```shell
#!/bin/sh
var1=100.5
var2="enjoy Linux"
printf "%5.2f \n\n \t %s \n" $var1 "$var2"
exit
```

shift.sh(전체 파라미터 왼쪽으로 쉬프트 시킴)

```shell
#!/bin/sh
myfunc () {
	str=""
	while [ "$1" != " " ] ; do
		str="#str $1"
		shift
	done
	echo $str
}
myfunc AAA BBB CCC DDD EEE FFF GGG
exit 0
```

# 8. 원격지 시스템 관리하기

### 텔넷

 (= 원격 접속 방법) : 원격지에서 리눅스 서버에 접속하면 서버앞에 앉아서 직접 텍스트 모드로 작업하는 것과 동일하다

서버와 클라이언트 사이에 데이터를 전송할 때 암호화 하지않아 보안에 취약하다

텔넷 서버 패키지가 설치되지 않았다면 -> apt-get -y install xinetd telnetd 입력해 패키지 설치

touch telnet --> 빈 파일 생성

에디터로 telnet 파일 열고 입력

```shell
service telnet
{
	disable = no
	flags = REUSE
	socket_type = stream
	wait = no
	user = root
	server = /usr/sbinin.telnetd
	log_on+failure += USERID
}
```

adduser teluser (비밀번호도 teluser)

systemctl restart xinetd ==> 텔넷 서비스 가동

systemctl enable xinetd ==> 컴퓨터 재부팅 해도 서비스 가동되게 설정

systemctl status xinetd ==> 가동여부 확인

ufw allow 23/tcp ==> 방화벽에서 텔넷의 23번 포트 허용



해당 컴퓨터로 접속 확인 

telnet 192.168.111.100



windows에서 접속 확인

ping 192.168.111.100 ==> 연결확인

telnet 192.168.111.100

teluser (id)

teluser (password)



#### OpenSSH 서버

텔넷과 용도 동일 but 보안 강화되었다!!

데이터 전송 시 암호화한다

apt-get -y install openssh-server ==> SSH서버 설치

systemctl restart ssh ==>서비스 재가동

systemctl enable ssh ==> 서비스 상시가동

systemctl status ssh ==> 서비스 가동여부 확인

ugw allow 22/tcp 방화벽에서 SSH의 포트인 22번 허용



##### client 에서 SSH서버 접속

ssh teluser@192.168.111.100



#### vnc 서버

X윈도우에서 원격을 사용하기 위한 원격지에서 x윈도 환경자체를 사용할 수 있게하는 서버 프로그램

apt-get -y install gnome-panel gnome-settings-daemon metacity vnc4server ==> vnc관련패키지 설치

vncserver ==>서비스가동, 비밀번호 123456

vncserver -kill :1 ==> 서비스 중지  (처음 1회 가동해야 ~/.vnc/xstartup파일이 생성되기 때문)

편집기로 ~/.vnc/xstartup파일 열어 제일 아래에 추가

gnome-panel &

gnome-settings-daemon &

metacity &

nautilus & 저장 

vncserver :1  명령으로 vnc서버 가동 후 

ufw allow 5901/tcp ==> 1번 디스플레이에 해당하는 포트5901를 방화벽에서 허용

client 서버에서 확인



## 9. 네임 서버 설치와 운영

네임서버 = DNS서버 url을 컴퓨터의 IP주소로 변환시키는 일을 담당

nslookup > server : 현재 설정되어있는 네임서버 확인

cat /etc/resolv.conf ==> 네임서버가 설정된 파일 확인

nameserver 부분을 주석처리하면 열리지 않는다 but 아이피로 직접 접속하면 열린다

(URL주소를 IP로 변경해주는 역할)

