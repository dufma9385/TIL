코드로 배우는 스프링 웹 프로젝트 - 34,000



## docker swarm 설치

#### 일반적인 클러스터 구성 

- 분산 코디네이터 - 각종 정보를 저장하고 동기화 → 클러스터에 영입할 새로운 서버의 발견, 

- 클러스터의 각종 설정 저장, 데이터 동기화 등에 주로 
- 사용매니저 - 클러스터 내의 서버를 관리하고 제어
- 에이전트 - 각 서버를 제어



#### 도커 스웜과 도커 스웜 모드 

- 여러 대의 도커 서버를 하나의 클러스터로 만들어 컨테이너를 생성하는 기능

- 도커 스웜 → 도커 1.6 버전 이후부터 사용

  - 에이전트 컨테이너가 필요하며 분산 코디네이터가 외부에 존재해야 함
  - 여러 대의 도커 서버를 하나의 지점에서 사용하도록 단일 접근점을 제공

- 도커 스웜 모드 → 도커 1.12 버전 이후부터 사용

  - 에이전트가 도커 자체에 내장 (분산 코디네이터를 외부에 설치할 필요 없음)
  - 클러스터링 기능에 초점

  

  == 도커 스웜과 스웜 모드는 최소 3개 이상의 도커 서버를 필요로 함

- 도커 스웜 모드 → 매니저 노드와 워커 노드로 구성

  - 매니저 노드 : 워커 노드를 관리하기 위한 도커 노드
  - 워커 노드 : 실제 컨테이너가 생성되고 관리되는 도커 노드
  - 매니저 노드에도 컨테이너가 생성될 수 있음 = 매니저 노드는 기본적으로 워커 노드 역할을 포함
  - 매니저 노드는 반드시 1개 이상 존재해야 하며, 운영 환경에서는 다중화하는 것을 권장 
  - 매니저 노드의 절반 이상에 장애가 발생하는 경우 복구를 위해 클러스터 운영을 중지하므로 매니저 노드는 홀수개로 구성하는 것이 효율적



1. 도커가 설치되어 있는 우분투 서버 3개 생성

2. 스윔 지원 여부 확인 = docker --version

   ​								   = docker info | grep Swarm

3. 가상머신 이름 사용에 맞게 변경 = hostnamectl set-hostname NAME

   가상 머신 별 IP 확인



도커 스윔 모드의 클러스트 구축

- 매니저 역할의 서버에서 스윔 클러스터 시작
  - root@**swarm-manager**:~# docker swarm init --advertise-addr 192.168.111.100                          

​    	                                                                                                             ------------------------ ⇒ 매니저 서버의 주소

​	           밑에 나오는 --token 부터 각각 워커노트에 추가

- 도커 서버가 정상적으로 스윔 클러스트에 추가되어쓴ㄴ지 확인 = docker node ls

- 토큰 확인 및 변경 = docker swarm join-token manager

  ​							   = docker swarm join-token worker

  ​						   	= docker swarm join-token --rotate manager

- 노드 삭제 = docker swarm leave

  ​				  = docker swarm leave -f

  ​     			 = docker node rm SWARM_NAME

- 노드 역할 변경 = docker node promote(워커노드 -> 매니저 노드), docker node demote(매니저->워커)



### 서비스 생성

서비스 = 같은 이미지로 생성된 컨테이너의 집합

서비스 제어는 매니저 노드에서만 가능

```sh
root@swarm-manager:~# docker service create \
> ubuntu:14.04 \
> /bin/bash -c "while true; do echo Hello Docker; sleep 1; done"
```

서비스 삭제 = 서비스 상태와 관계없이 삭제가 가능 

```sh
docker service rm SERVICE_NAME
```



### nginx 웹 서버 서비스를 생성

```sh
root@swarm-manager:~# docker service create \
> --name myweb \
> --replicas 2 \
> -p 8080:80 \
> nginx

root@swarm-manager:~# docker service ps myweb

```

각 호스트의 아이피로 웹 브라우저 확인

```sh
root@swarm-manager:~# docker service scale myweb=4
root@swarm-manager:~# docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
05g5mjdi54r9        myweb               replicated          4/4                 nginx:latest        *:8080->80/tcp
root@swarm-manager:~# docker service ps myweb
```



복제 모드 서비스 → 정의한 리플리카의 개수 만큼 컨테이너가 생성 (default)

글로벌 모드 서비스 → 모든 노드에 컨테이너를 생성 (docker service create --mode global 옵션으로 생성)