# Samba

리눅스에서 windows의 폴더와 프린터 사용

window에서 폴더와 프린터를 공유해 놓으면 특별한 절차 없이  공유폴더와 프린트를 사용할 수 있다

samba서버 설치 할 필요 없고 'samba클라이언트'만 존재하면 된다.

==> Windows가 Samba서버 역할을 해서 자신의 공유폴더와 프린터를 제공, 

​		리눅스는 Samba클라이언트 역할을 하여 Windows가 제공한 폴더와 프린터를 사용한다.

Window는 다른 Windows에게 폴더와 프린터를 공유한다는 설정만 해 놓으면 자동은로 Samba서버가 된다.



### WinClient(Samba 서버역할)

- WinClient에 자신의 자원을 사용할 사용자를 추가
- WinClient의 자원을 공유시킨다.

### Server(Samba 클라이언트 역할)

- Samba 클라이언트 ㅠㅐ키지가 설치되어 있는지 확인한다.
- Smbclient 명령으로 Winclient가 제공하는 자원을 확인한다.
- Smbmount 명령으로 WinClient가 제공한 공유 폴더를 마운트한다.



WinClient에 공유할 폴더를 만든다(폴더속성-> 공유 -> Everyone사용자 추가-> 권한 읽기/쓰기로 변경 후 공유)