CA : 인증서 발급 

개인키와 공개키를 발급해줌

- 개인키로 암호화 한다.
- 공개키는 신원 증명 => 개인키로 암호화된 데이터를 보낸이의 공개키로 복호화
- 중요정보는 공개키로 암호화... => 받은사람의 개인키로만 열 수 있음



검증 

앤돌서 피어가 검증을 한다, 체인코드 무조건 필요

커밋터들은 체인코드가 없어도 된다



## HLF

IBM 클라우등에 Putty로 접속하기

```sh
apt update
apt upgrade
apt -y install docker.io
docker -v //버전확인
apt -y install docker-compose(도커 컴포즈 설치)
apt -y install golang-go
(// nvm 설치 필요시
apt install npm 
npm install n -g
n 8.9.0
)

node -v
npm -v
go env //경로확인
sudo apt install -y vim
vi ~/.vimrc  //vi편집툴세팅

   (set number    " line 표시
	set ai    " auto indent
	set si " smart indent
	set cindent    " c style indent
	set shiftwidth=4    " 자동 공백 채움 시 4칸
	set tabstop=4    " tab을 4칸 공백으로
	set ignorecase    " 검색 시 대소문자 무시
	set hlsearch    " 검색 시 하이라이트
	set nocompatible    " 방향키로 이동 가능
	set fileencodings=utf-8,euc-kr    " 파일 저장 인코딩 : utf-8, euc-kr
	set fencs=ucs-bom,utf-8,euc-kr    " 한글 파일은 euc-kr, 유니코드는 유니코드
	set bs=indent,eol,start    " backspace 사용가능
	set ruler    " 상태 표시줄에 커서 위치 표시
	set title    " 제목 표시
	set showmatch    " 다른 코딩 프로그램처럼 매칭되는 괄호 보여줌
	set wmnu    " tab 을 눌렀을 때 자동완성 가능한 목록
	syntax on    " 문법 하이라이트 on
	filetype indent on    " 파일 종류에 따른 구문 강조
	set mouse=a    " 커서 이동을 마우스로 가능하도록
	)

vi .bashrc (환경변수 설정) //경로확인
	export GOPATH="/root/go"
	export GOROOT="/usr/lib/go-1.10"
	
source .bashrc(환경변수 적용)
echo $GOROOT && echo $GOPATH

mkdir HLF
cd HLF
curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3 (🡺하이퍼레저 패브릭을 설치, 2019/8/21 1.4.2 버전 설치됨,🡺2019/8/31에 1.4.3버전 설치됨)

docker images (최신 이미지 확인)

cd fabric-samples/basic-network
./start.sh
docker ps

vi start.sh
	(docker-compose -f docker-compose.yml up -d ca.example.com orderer.example.com 			peer0.org1.example.com couchdb 마지막 부분에 cli 추가)
./stop.sh
./start.sh
docker ps (다섯개의 컨테이너 확인)

docker exec -it cli bash
cli>peer chaincode install -n jes -v 1.0 -p github.com/sacc
cli>peer chaincode instantiate -n jes -v 1.0 -c '{"Args":["a","10"]}' -C mychannel
```

다른 터미널에서 확인하기(peer0)

```shell
 docker exec -it peer0.org1.example.com bash 로 입장
 peer0>cd /var/hyperledger/production/chaincodes/
 
 jes.1.0확인
 
 peer0>  cd /var/hyperledger/production/ledgerData/chains/chains/mychannel/
 에서 블록파일 확인
```



cli 터미널로 돌아와서

```shell
cli>peer chaincode query -n jes -c '{"Args":["get","a"]}' -C mychannel
cli>peer chaincode invoke -n jes -c '{"Args":["set","a","20"]}' -C mychannel
cli>peer chaincode query -n jes -c '{"Args":["get","a"]}' -C mychannel
```

peer0 에서 확인



## 2. chaincode_example_node

cli 터미널

```shell
docker exec -it cli bash 도커입장

peer0에다 체인코드를 인스톨하는 명령을 다음과 같이 내리기
cli>peer chaincode install -n jes_cc_node -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode_example02/node/
(🡺여기서 -p는 path인데 상대 경로로 써주면 안됨!!!)
```

peer0 터미널

```shell
docker exec -it peer0.org1.example.com bash
peer0>cd /var/hyperledger/production/chaincodes 
로 들어가보면 다음과 같이 노드 체인코드가 설치된 것을 볼 수 있다
```

cli 터미널

```shell
//peer0에 설치된 체인 코드가 mychannel에 연결되도록 다음과 같이 명령
cli>peer chaincode instantiate -C mychannel -n jes_cc_node -l node -v 1.0 -c '{"Args":["init","a","100","b","200"]}'

cli> peer chaincode query -C mychannel -n jes_cc_node -c '{"Args":["query","a"]}'(🡺100이라고 나온다)
cli> peer chaincode invoke -C mychannel -n jes_cc_node -c '{"Args":["invoke","a","b","10"]}'
cli> peer chaincode query -C mychannel -n jes_cc_node -c '{"Args":["query","a"]}'
(🡺90이라고 나온다)
```

