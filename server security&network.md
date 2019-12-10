user00 계정의 쉘 부분을 /bin/false 변경 후 접속

root@kali:~# gedit /etc/passwd

user00​ : x : ​1000 : 1000:,,,:/home/user00:**<u>/bin/false</u>** ⇒ su user00 → 메시지 없이 빠져 나옴또는 

user00 : x : 1000 : 1000:,,,:/home/user00:/**<u>usr/sbin/nologin</u>**⇒ su user00 → 메시지 출력 후 빠져 나옴

root@kali:~# **find / -user root -perm /4000** ==> 파일의 소유가 root면서 setuid 비트를 가진 파일검색 ==>불필요한 파일 삭제



### 리눅스 서버 보안

#### 패스워드 복잡도

크래킹 되기 쉬운 패스워드

- 길이가 너무 짧거나 널인 패스워드
- 사전에 나오는 단어나 이들의 조합
- 키보드 자판 일렬 나열
- 사용자 계정 정보에서 유추가능한 단어들로 된

=> 영문 + 숫자 + 특수문자의 조합이 좋다

### 윈도우 서버보안

1. ##### 파일 시스템 체크

   - NTFS파일 시스템은 FAT파일 스스템에는 없는 데이터 접근에 대한 감사 기록, 파일 및 디렉터리에 대한 소유권 및 사용권한을 부여하는 등의 보안기능 제공

   - FAT 파일 시스템 사용할경우 비인가자에게 중요한 데이터 및 시스템 파일이 쉽게 노출될 수 있으므로 NTFS을 사용하자

2. ##### 불필요한 공유 제거

   - c$, D$, ADMIN$와 같은 기본공유는 관리자가 네트워크 상에서 시스템을 관리하기 위해 기본적으로 마련된 것, 관리목적으로 사용하지 않을 시 제거

   - 불필요한 공유 디렉터리 없애고 필요하면 접근권한에서 everyone사용자 그룹을 삭제
   - c$, D$, ADMIN$ 제거 방법 : cmd> net share 공유이름 delete

3. ##### sam파일 접근 통제

4. ##### 마지막 사용자 이름 표시 안 함 설정

5. ##### 로그인 하지 않고 시스템 종료 방지

   - 시스템 종료 권한이 있는 경우에만 종료 가능

6. ##### 예약 작업관리

7. ##### 이동식 디스크 보안관리

   - 이동식 디스크 자동실행 옵션이 허용되어 있을 경우. Autorun.inf 파일에 기록된 내용이 자동으로 실행될때 악성코드에 감염될 수 있다

8. ##### 불필요한 서비스 제거

9. ##### 원격데스크탑 서비스 설정



### 네트워크

**이더넷 어댑터** = LAN카드 = NIC(Network Interface Controller)

*이더넷 = LAN영역에서 사용하는 통신 기술 중 하나, 사실상 표준(De Facto Standard)

**IPv4 주소** = 총 32비트로 구성된 주소체계 (0.0.0.0 ~ 255.255.255.255)

**IPv6 주소** = 총 128비트로 구성

**IP(Internet Protocol)** = 인터넷 공간에서 자기 PC가 사용하는 고유한 식별자

**IP 주소의 클래스( IP주소의 첫번째 자리의 범위)**

​	= A 클래스 : 1~126 = 0000 0001 ~ 0111 1110

​	= B 클래스 : 128 ~191 =1000 0000 ~ 1011 1111

​	= C 클래스 : 192 ~ 223 = 1100 0000 ~ 1101 1111

구글에서 제공하는 DNS 서버의 IP 주소 = 8.8.8.8 -> A클래스

KT 에서 제공하는 DNS서버의 IP 주소 = 168.126.63.1 -> B클래스

**127.0.0.1 -> 어떤 클래스에도 속하지 않음 ==> 자기가 사용하는 LAN카드 자신을 의미 == loopback address**

**서브넷 마스크(subnet mask)**

 = IP주소를 서브넷 마스크를 이용하여 표기하는 방식

 = IP주소를 네트워크 ID와 호스트 ID로 구분

   IP						Subnet mask		Network ID(국번)	Host ID(전화번호)

10.10.10.10			255.0.0.0			10								10.10.10

**<u>게이트웨이(gateway)</u> = <u>라우터(router</u>)**    ===> 각기 다른 네트워크 ID를 사용하는 LAN영역을 연결

sw측면 강조					HW측면 강조

**LAN 영역** : 동일한 네트워크 ID를 공유하는 장치들의 집합

​				 : 동일한 게이트웨이 주소를 사용하는 장치들의 집합

**라우팅(routing)** = 다른 네트워크 ID를 사용하는 LAN 영역을 연결(게이트웨이에서 처리)

**스위칭(switching)** = LAN영역에서 **MAC주소**(물리적 주소)에 기반한 내부 통신

**물리적 주소 = MAC주소** : LAN카드에 부여된 주소, LAN영역에서 내부 통신을 수행하기 위해 필요한 주소 (48비트로 구성=OUI+일련번호)

**DHCP(Dynamic Host Configuration Protocol) = 유동IP환경**

  : 사용할 IP 주소 범위를 서버에 미리 등록하면, PC사용자에게 IP 주소, 서브넷 마스크, 게이트웨이 주소, DNS주소            등을 자동으로 할당해 주는 서비스

**DNS(Domain Name System)서버** : 도메인 이름과 IP주소의 대응 관계를 데이터베이스 형태로 저장, 사용하는  서버

**IP** = 32비트 = 네트워크 ID + 호스트 ID ==> IP 주소 기반에 라이팅

**MAC** = 48비트 = OUI + 일련번호 ==> MAC 주소 기반에 스위칭

**ping** : 출발지 호스트와 목적지 호스트 사이에서 회선의 연결 상태나 목적지 운연체제의 동작 여부를 점검하기 위한 도구

![img](https://lh5.googleusercontent.com/6OFTBT1j_3urm7TeoqjUdVC_TwU8uZTgihItTvV4l0eGlNa6G5myfQiO-cTjF2gVJFhqB7IHHtseFVww87Enyp9Xv2xg6-4qDCyMXgyocNec07xY9zlZiRpk_7jXOozX29VD-TVY)



![img](https://lh5.googleusercontent.com/CKMbtg1IX1bKFiH-NcBiuG7nL8YhIP_3Jl5WuE-6kILWqfz1lwTTpkZ6mHNU-o9pvlqNZLk8PqhcQIXR10R7FOX5SSrzZlM4FIXhjqUHt-g7zGVKUEc8RXdrul6ev8LHB8_Y6jwl)

​																															MIM(man in the middle)

**ettercap**

: LAN 환경에서 중간자(MIM) 공격을 수행할 수 있도록 구현한 프로그램

 : GUI 제공

 : 다양한 플러그인 제공



#### **<u>nmap</u>을 이용한 포트 스캐닝** : 타켓 서버에 포트의 상태를 확인

 nmap : 네트워크에 연결되어 있는 호스트의 정보를 파악하는 도구

​			: 네트워크에 연결되어 있는 호스트의 IP,  OS

​			: 서버의 열린 포트

​			: 서비스하는 소프트웨어 버전

- TCP Open Scan

  정상적인 TCP  3-way Handshaking 과정을 통해서 사용중인 포트를 확인

  - 포트가 열려있으면			 : SYN --> SYN / ACK --> ACK
  - 포트가 열려있지 않으면     : SYN --> RST / ACK
  - 연결에 대한 로그가 남아 안전하지 않은 방법이다

  ​	nmap -sT  HOST_IP 

**Stealth Scan**

- 3-way Handshaking 과정을 거치지 않기 떄문에 로그가 남지 않는다.

  - TCP half open scan(= TCP SYN open scan)   ==> -sS

  - FIN  scan, XMAS scan, NULL scan

    - FIN : FIN    ==> - sF
    - XMAS : FIN, PSH, URG 등 설정될 수 없는 여러개의 플래그가 동시설정 되어서 온다  ==> -sX
    - NULL : 아무것도 없는 상태로 옴   ==> -sN

    ==> 포트가 열려있으면 **무응답**,  포트가 닫혀있으면 RST/ACK