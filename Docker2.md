이미지 = Ubuntu를 사용할 수 있도록 파일의 형태로 만들어 놓은 것

```sh
FROM golang:1.9    ⇐ 베이스 이미지를 가져온다.(저장소 이름이 생략 → 도커 허브의 공식 이미지)

RUN mkdir /echo    ⇐ 컨테이너 내부에 /echo 디렉터리 생성하라
 * 대괄호를 사용하지 않으면 bin/sh -c mkdir /echo의 형태로 사용된다
COPY main.go /echo
 * 홈 디렉토리의 docker file에 위치(빌드컨텍스드), 로컬또는 원격지에 있을 수 있다
CMD [ "go", "run", "/echo/main.go" ] = 명령어를 사용 할 수 있게 해줌...?
* 대괄호는 안에있는 내용만 실행
```

```sh
root@server:~/docker# docker image build -t example/echo:latest .
.
.
Step 1/4 : FROM golang:1.9
,
Step 2/4 : RUN mkdir /echo
 ---> Running in d574ae29436d
 ---> f629052dbb9c
Removing intermediate container d574ae29436d = 새로운 컨테이너를 만들면서 그 전에 임시적으로 만												 든 컨테이너들을 삭제
Step 3/4 : COPY main.go /echo
 ---> 365a8e8b706a
Removing intermediate container f9086399c9fe
Step 4/4 : CMD go run /echo/main.go
 ---> Running in 43ef8d52b72f
 ---> be867a4ba9d0
Removing intermediate container 43ef8d52b72f
```

1.

```sh
root@server:~/docker# gedit Dockerfile

FROM ubuntu
RUN mkdir /echo
RUN fallocate -l 100m /echo/dummy
RUN rm /echo/dummy
```

2.

```sh
root@server:~/docker# gedit Dockerfile

FROM ubuntu
RUN mkdir /echo && fallocate -l 100m /echo/dummy && rm /echo/dummy
```

1번에서 2 번으로 변경함으로써 이미지의 용량이 줄어든다

불필요한 용량차지를 예방할 수 있다



Dokcerfile 생성

```sh
FROM ubuntu

RUN apt-get update

RUN apt-get install apache2 -y ##1

ADD hello.html /var/www/html/  ##2

WORKDIR /var/www/html ##3

RUN [ "/bin/bash", "-c", "echo hello2 >> hello2.html" ] ##4

EXPOSE 80 ##5

CMD apachectl -DFOREGROUND ##6
```

##1 도커파일은 build과정에서 사용자의 입력을 필요로 하는 문장을 만나게 되면 오류로 처리하여 사용자 입력이 발생하지 않도록 -y 옵션이 필요하다 

##2 ADD, COPY : 호스트의 파일 또는 디렉터리를 이미지 내부로 복사

- COPY는 호스트의 로컬파일만 복사가 가능
- ADD는 호스트이 로컬 파일 뿐만 아니라 외부 URL 또는 tar파일도 복사가 가능 (tar파일 암축해제해서 복사)
- 일반적으로 COPY 사용 권장 (ADD보안 취약)

##3 WORKDIR : cd 명령어와 동일, 명령어 실행 위치를 지정

##4 [] 형식의 명령어 == JSON 배열 형식 --> 쉘을 실행하지 않음을 의미

​		RUN command 형식은 /bin/sh -c command 형식으로 실행

##5 EXPOSE : 이미지에서 노출할 포트를 설정

##6 CMD : 컨테이너가 실행될 때 마다 실행할 명령어(한번만 사용 가능)



```sh
root@server:~/webserver# echo hello >> hello.html
root@server:~/webserver# ls hello.html
hello.html
root@server:~/webserver# cat hello.html
hello
root@server:~/webserver# docker build -t myimage .

root@server:~/webserver# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
myimage             latest              016ccbba196a        About a minute ago   188MB

root@server:~/webserver# docker run -d -P --name myserver myimage
d0038e464834477d35eeb787802120296ea669d9702b4d6008b9efe1efc8067a
```

* -P : 내부의 포트를 자동으로 바인딩하여 포트포워딩 할 수 있게 해준다
* 아래의 명령어로 포트 확인

```sh
root@server:~/webserver# docker port myserver
80/tcp -> 0.0.0.0:32768
```

브라우저를 통해 localhost:32768 로 확인



컨테이너 중지 == docker dontainer stop CONTAINER_NAME

실행중인 모든 컨테이너를 중지 할 때 == docker container stop $(docker container ls -q)

​											 삭제		   == docker container rm $(docker container ls -aq)



컨테이너는 동일한 이름의 컨테이너가 존재하면 실행 시 오류가 발생한다

동일한이름으로 생성하고 싶으면 이전의 컨테이너를 지우고 새로 만들어야 함



**./../bin/ .a.sh   ==  현재디렉터리/ 상위디렉터리/bin/숨김파일/확장자 구분자**



동일한 이름의 컨테이너를 삭제 후 실행하는 쉘 스크립트를 작성

```sh
#!/bin/bash

#1 명령어 형식 체크
if [ $# == 0 ] 
then 
	echo 명령어 형식이 잘못되었습니다.
	echo [사용법] ./run.sh container_name_or_id
	exit 1
fi 

#2 컨테이너 실행 전 컨테이너 리스트 출력
docker container ps -a

#3 동일 이름의 컨테이너를 조회
cid=$(docker container ps -a --filter="name=^/$1$" -q)

#4 동일 이름의 컨테이너가 존재하는 경우 해당 컨테이너를 삭제 후 메시지를 출력
if [ -n "$cid" ]
then
	docker container rm -f $cid
	echo $1 이름의 컨테이너\($cid\)를 삭제했습니다.
fi

#5 컨테이너를 실행
docker container run --name $1 -d -P myimage

#6 컨테이너 실행 후 컨테이너 리스트 출력
docker container ps -a

#7 쉘 종료
exit 0

```

변경해보기

1. ##### CONTAINER_NAME 일치하는 컨테이너가 존재하는지 확인

2. ##### 존재하는 경우 해당 컨테이너를 삭제

3. ##### IMAGE_NAME 이미지를 이용해서 CONTAINER_NAME 이름의 컨테이너를 생성

root@server:~/webserver# gedit run.sh

```sh
#!/bin/bash

#1 명령어 형식 체크
if [ $# == 0 ]
then
        echo 명령어 형식이 잘못되었습니다.
        echo [사용법] ./run.sh image_name container_name_or_id 
        exit 1
fi

#2 컨테이너 실행 전 컨테이너 리스트 출력
docker container ps -a

#3 동일 이름의 컨테이너를 조회
cid=$(docker container ps -a --filter="name=^/$2$" -q)

#4 동일 이름의 컨테이너가 존재하는 경우 해당 컨테이너 삭제 후 메세지 출력
if [ -n "$cid" ]
then
        docker container rm -f $cid
        echo $2 이름의 컨테이너\($cid\)를 삭제했습니다.
fi

#5 컨테이너 실행
docker container run --name $2 -d -P $1

#6 컨테이너 실행 후 컨테이너 리스트 출력
docker container ps -a

#7 쉘 종료
exit 0
```



```sh
root@server:~/webserver# docker run -itd envimage /bin/bash
db4a3fcacc350d6fa12e6166ac35e16faf371d1619161d7ace85cd558b99c411
root@server:~/webserver# docker attach db4a
root@db4a3fcacc35:/workspace# echo $workspace
/workspace

root@server:~/webserver# docker run -itd -e workspace=/tmp envimage /bin/bash
03dfcabe24bf5f556a2419e3601cc61c3f96158711cbb1562997719a909fa74f
root@server:~/webserver# docker attach 03df
root@03dfcabe24bf:/workspace# echo $workspace
/tmp
```

-e : 해당컨테이너 실행 할 때 해당 컨테이너 환경변수를 잡아두고 중복되면 덮어씌운다



### docker의 index파일 ubuntu로 내려받아 수정 후 다시 올리기

```sh
root@server:~/webserver# docker container cp mywebserver:/var/www/html/index.html .
root@server:~/webserver# ls
Dockerfile  hello.html  hello3  hello3.html  index.html  run.sh
root@server:~/webserver# vi index.html
root@server:~/webserver# docker container cp ./index.html mywebserver:/var/www/html/index.html

```

1. docker container에서 index.html파일을 현재디렉토리(.)로 복사한다
2. ls로 파일이 잘 복사 되었는지 확인
3. vi 로 수정
4. docker container 로 현재디렉토리의 index.html파일을 올린다.



*-e 환경변수*

*-d 백그라운드실행*

*--name 해당 컨테이너 이름*

*--link 컨테이너의 별명으로 접근 할 수 있도록 설정*



실행중인 컨테이너 이용하여 이미지 생성

##### docker commit -m "add hello3.html" mywebserver dufma9385/mywebserverimage:1.0

 dufma9385/mywebserverimage:1.0이미지를 이용하여 컨테이너 생성



#### 해보기

#1 작업디렉터리(lab) 생성 
#2 아래 작업을 수행하는 Dockerfile을 생성ubuntu 최신 버전의 이미지를 베이스 이미지로 사용apache2 설치apache2를 백그라운드에서 실행

#3 docker build를 통해 이미지를 생성이미지 이름 : myapache이미지 태그 : latest
\#4 호스트에서 생성한 index.html 파일을 컨테이너 내부 아파치 웹 루트에 복사  <html><body><h1>Hello, 본인이름</h1></body></html>
\#5 호스트에서 웹 브라우저를 통해서  http://localhost:??????/index.html 로 접속했을 때 Hello, Docker가 출력되는 것을 확인
\#6 현재 상태의 컨테이너의 이미지를 생성이미지 이름 : myapache이미지 태그 : latest단, 기존 이미지의 태그를 1.0으로 변경
\#7 #6에서 생성한 이미지(2개)를 자신의 도커 허브에 반영
\#8 #7에서 반영한 이미지를 다른 사람의 자리에서 가져와서 실행 후 브라우저를 통해서 확인

