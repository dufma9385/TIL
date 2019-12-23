# Docker?

= 오픈소스 컨테이너 프로젝트

= AWS(아마존), Google cloud Platform, Microsoft Azure등의 클라우드 서비스 공식지원

= 복잡한 리눅스 애플리케이션을 컨테이너로 묶어서 실행 가능

==> 개발, 테스트, 서비스 환경을 하나로 통일, 효율적으로 관리 가능, 컨테이너(이미지) 공유

= 리눅스 커널에서 제공하는 컨테이너 이용

= github와 비슷한 docker Hub제공

= 컨테이너는 가상화보다 가벼운 기술



서버의 성능이 좋아져 놀고있는 서버에 가상머신을 띄워 일을 더 시키자

가상머신에 각종 서버프로그램, DB등을 설치하여 애플리케이션이나 웹사이트를 실행하자

미리 구축한 가상머신 이미지를 여러서버에 복사하여 실행 --> 이밎 하나로 서버를 계속 만들어낼 수 있음



### 가상머신의 문제점 

- 각종 성능 손실 발생
- 느려짐 => 호스트와 커널을 공유하는 반가상화 기술의 등장
- 이미지안에 운영체제가 포함되어 이미지 용량이 커짐(네트워크로 가상화 이미지 주고받기는 부담)
- 오픈소스 가상화 소프트웨어는 OS가상화에만 주력 -> 배포와 관리 기능 부족



### 리눅스 컨테이너

- 컨테이너 안에 가상공간을 만들지만 실행파일을 호스트에서 직접 실행 ==> 독립된 공간이지만 자원을 공유하겠다
- 가상화가 아닌 **격리** (공간만 제공받는다)
- 도커는 리눅스 컨테이너 사용



### 도커의 특징

- 도커는 게스트 OS를 설치하지 않음
  - 이미지에 서버 운연을 위한 프로그램과 라이브러리만 격리해서 설치
  - 이미지 용량이 크게 줄어듦
  - 호스트와 os자원을 공유
- 도커는 하드웨어 가상화 계층이 없음
  - 메모리 접근, 파일시스템, 네트워크 전송속도가 가상머신에 비해 월등히 빠름
  - 호스트와 도커 컨테이너 사이의 성능 차이가 크지 않다
  - 게스트의 os가 호스트 os에 파일형태로 저장되어있다
- 이미지 **생성**과 **배포**에 특화
- 이미지 버전관리 제공, 중앙 저장소에 이미지를 올리고 받을 수 있음
- 도커이미지를 공유하느 docker hub제공(=github)
- 다양한 API를 제공하여 원하는 만큼 자동화 가능, 개발과 서버운영에 매우 유용!
- 



*CI/CD = 지속적인 통합 지속적인 배포

### 도커 이미지

​	= 서비스 운영에 필요한 서버 프로그램 소스코드, 컴파일된 실행파일을 묶은 형태

저장소에 올리고 받는건 이미지(push/pull)

운영체제로 치면 이미지는 **실행파일**

바뀐 부분관리 = 유니온 파일 시스템형식으로 처리

​						= 잘게 쪼개 바뀐 부분만 이미지로 생성

​						= 컨테이너로 실행할 때는 베이스 이미지와 바뀐부분을 합쳐서 실행

​						= 이미지를 공유할 때 바뀐부분만 주고받음

​						= 각 이미지는 **의존관계** 형성

### 도커 컨테이너 

​	= 컨테이너는 이미지를 실행한 형태

이미지로 여러 개의 컨테이너를 만들 수 있음

운영체제로 치면 컨테이너는 **프로세스**



 ### 서비스 운영환경과 도커

 지금까지는 호스팅 또는 IDC코로케이션 서비스 사용 = 서버구입과 설치에 돈이 많이 들고 시간이 오래걸림

**클라우드 환경의 변화** = 가상서버를 임대하여 사용한 만큼만 요금지불

​									 = 자동으로 서버 추가&삭제

#### Immutable Ingrastructure(변경불가)

서비스와 호스트 운연환경을 분리한다

한번 설정한 운영 환경은 변경하지 않는다

서버 운영 환경을 이미지로 생성, 서버에 배포하여 실행 (=모듈화 한다)

서비스가 업데이트 되면 운영환경 자체를 변경하지 않고 , 이미지를 새로 생성하여 배포

서비스 운영환경 이미지를 한 번 쓰고 버리는 개념

장점

	- 편리한관리, 확장, 테스트, 가볍다



#### 독커 = 서비스 운영 환경을 묶어서 손쉽게 배포하고 실행하는 경량 컨테이너 기술



게스트 OS의 IP에 포트번호를 주고 호스트 pc에서 호스트IP:설정포트번호를 입력하여 접속하면 게스트os의 

페이지를 볼 수 있다 == 포트포워딩

IP를 나눠쓴다 외부IP는 하나 내부에서 나눠쓰는데 내부에서 외부로 연결되게 해주는 대표아이피하나만 있음



## 도커설치

##### #1 도커 저장소 추가 (아래 내용 추가 후 저장)          

```shell
root@server:~# gedit /etc/apt/sources.list
deb https://apt.dockerproject.org/repo ubuntu-xenial main(마지막줄에 추가)
```

##### #2 apt-get udpate 

##### #3 HTTPS 통신을 위한 패키지와 공개키를 설치

```shell
root@server:~# apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
root@server:~# apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

##### \#4 linux-image extra 및 docker-engine 패키지 설치

```shell
root@server:~# apt-get install linux-image-extra-$(uname -r)root@server:~# apt-get install docker-engine ⇐ 설치 여부 질문에 Yes 입력
```

##### \#5 도커 설치 확인

```shell
root@server:~# docker versions
Client: Version:   17.05.0-ce 
 API version: 1.29 
 Go version:  go1.7.5 
 Git commit:  89658be 
 Built:    Thu May  4 22:10:54 2017 
 OS/Arch:   linux/amd64
Server: 
 Version:   17.05.0-ce API 
 version: 1.29 (minimum version 1.12) 
 Go version:  go1.7.5 
 Git commit:  89658be 
 Built:    Thu May  4 22:10:54 2017 
 OS/Arch:   linux/amd64 
 Experimental: false
```

## 도커 이미지 생성

##### #1 작업 dir와 main.go 파일생성

```shell
root@server:~# cd ~
root@server:~# mkdir docker
root@server:~# cd docker
root@server:~/docker# gedit main.go
```

//main.go = 8080포트로 요청이 들어오면 응답메세지 반환

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("received request")
		fmt.Fprintf(w, "Hello Docker!!")
	})

	log.Println("start server")
	server := &http.Server{Addr: ":8080"}
	if err := server.ListenAndServe(); err != nil {
		log.Println(err)
	}
}
```

#2 main.go 실행 (브라우저에서도 확인 가능 http://localhost:8080)

```shell
root@server:~/docker# apt-get install golang-go

root@server:~/docker# go run main.go
2019/12/23 15:00:03 start server

(새 터미널에서)
root@server:~# curl http://localhost:8080/
Hello Docker!!root@server:~#
```

#3 Dockerfile작성

```shell
root@server:~/docker# vi Dockerfile

FROM golang:1.9    ⇐ 베이스 이미지를 가져온다.(저장소 이름이 생략 → 도커 허브의 공식 이미지)

RUN mkdir /echo    ⇐ 컨테이너 내부에 /echo 디렉터리 생성하라
 
COPY main.go /echo

CMD [ "go", "run", "/echo/main.go" ]

```

#4 도커이미지 빌드& 이미지 확인

```shell
root@server:~/docker# docker image build -t example/echo:latest .
~
~
Step 1/4
Step 2/4
Step 3/4
Step 4/4
~
~
Successfully ~~~

root@server:~/docker# docker image ls
root@server:~/docker# docker images
```

#5 도케 컨테이너 실행 & 백그라운드에 실행되는 컨테이너에 접속

```shell
root@server:~/docker# docker container run -p 9000:8080 -itd example/echo:latest
root@server:~/docker# docker container run -p 9000:8080 -itd example/echo:latest /bin/bash
root@server:~/docker# docker container run -p 9003:8080 -itd --name CONTAINER_NAME example/echo:latest /bin/bash


root@server:~/docker# docker attach CONTAINER_ID_or_NAME 
==> 명령어를 입력하여 실행파일을 만들 수 있다
```

#6 도커 컨테이터에서 빠져나오는 방법

- 입력을 받을 수 없는 경우 ⇒ (다른 터미널에서) docker container stop *CONTAINER_ID_or_NAME*
- 입력을 받을 수 있는 경우 ⇒ Ctrl+C or Ctrl+PQ
- 쉘이 제공되는 경우 ⇒ exit or Ctrl+PQ

#7 도커 컨테이너 실행/중지

```shell
root@server:~/docker# docker container stop CONTAINER_ID_or_NAME
root@server:~/docker# docker container start CONTAINER_ID_or_NAME
```

#8 도커 컨테이너 상태확인

```shell
root@server:~/docker# docker container ps
root@server:~/docker# docker container ls
root@server:~/docker# docker container ps -a
root@server:~/docker# docker container ls -a
```

#9 실행중인 컨테이너 모두 중지

```shell
root@server:~/docker# docker container stop $(docker container ls -q)
```



### 도커 이미지를 도커허브에 등록

```shell
root@server:~/docker# docker images //이미지 확인
root@server:~/docker# docker image tag example/echo:latest DOCKERHUB_ID/echo:latest
root@server:~/docker# docker images
root@server:~/docker# docker login -u DOCKERHUB_ID
Password: 비번
root@server:~/docker# docker image push DOCKERHUB_ID/echo:latest(or 1.0)

```

