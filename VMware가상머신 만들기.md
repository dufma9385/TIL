블록체인 = 원본의 데이터는 변하지 않는다

​					변경된 데이터를 추가해서 계속 블럭이 생성되고 쌓이고 이어진다

​					고쳐진게 없고 붙여진것만 있다 (위조를 하려고 시도해도 위조를 시도한 행위마저 기록하여 생성)

​					분산원장 (같은 블록체인이 여러 곳에 분산되어 똑같이 존재한다)

​					51% 이상 해킹이 가능하면 뚫린다



VMware Workstation Pro 와 player 15 설치!

VMware위에 네개의 가상머신 설치하기

server, serverB, Client, WinClient

[이것이 우분투 리눅스다] 책 참고 



| host   | server          | server-B        | Client          | WinClient       |
| ------ | --------------- | --------------- | --------------- | --------------- |
|        | Linux기반       | Linux기반       | Linux기반       | Windows         |
|        | Ubuntu16.04     | Ubuntu16.04     | Ubuntu16.04     | Windows10       |
|        | 메모리 4GB      | 메모리 2GB      | 메모리 2GB      | 메모리 2GB      |
|        | Desktop(UI)     | Server(Text)    | Server(Text)    | UI              |
|        | 192.168.111.100 | 192.168.111.200 | 192.168.111.129 | 192.168.111.128 |
|        | VMware          | VMware          | VMware          | VMware          |
| Window | Window O/S위에  | 설치            |                 |                 |
|        | 하드웨어        |                 |                 |                 |

