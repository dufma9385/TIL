### 블록체인 분류

##### public (비트코인)

- 모든 거래 참여자가 관리자가 된다

	- 불특정 사용자 참여, 악의를 가진 사용자도 참여할 수 있음 
	- 한번 정해진 법칙을 바꾸기 매우 어렵
	- 거래 증명자가 누구인지 사전에 알 수 없음
	- 네트워크 확장 어려움, 익명성
	- 트랜잭션 처리시간 길다(10분정도)
	- 디지털 화폐
	- 전력소비 많고 최종성이 없으며 51% 공격문제
	- BitCoin, Ethereum
	- 돈세탁, 밀수품 거래 등에 악용될 수 있음, 유지를 위해 경제적인 인센티브가 필요, 프로토콜 변경이 어려움

##### private (비즈니스)

- 한 중앙기관이 모든 권한을 보유

	- 참여자의 신원 확인, 신뢰가능
	- 중앙기관의 의사결정에 따라 법칙변경가능
	- 네트워크 확장이 쉽고, 식별이 가능
	- 빠른 트랜잭션 처리
	- 은행 송금, 증권거래 등 비즈니스 네트워크에서 사용
	- 전력소비 최소화, 최종성있음, 경량화되어 빠르게 처리
	- Ripple, hyperiedger



### 블록체인 핵심 기술

#### 블록

- 유효한 트랜잭션 정보의 묶음

- 비트코인 블록 하나에 포함된 트랜잭션 개수 : 평균 1400개 , 크기 : 평균1.14MB

- 블록 높이 : 제네시스 블록[0] 이후 블록이 추가될 때마다 1씩 증가

- 블록 깊이[=confirm] : 블록[1]이 만들어진 후 새로운 블록이 추가될 때마다 1씩 증가

![](C:\Users\student\TIL\캡처.PNG)

블록의 난이도 목표를 이룬 보상.....= 코인베이스 트랜잭션

코인베이스(채굴자의 계정) 트랜잭션 = 보내는 사람은 모르고 받는쪽만 알 수 있다.

이전 블록 헤더(식별자)의 해쉬 = 중간에 바뀌는 것을 막기위해 알아야한다 꼭, 블록간의 구별을 위해 필요

#### 블록해쉬

 = 블록의 식별자

 = 블록 헤더 정보를 SHA258 해쉬함수로  계산한 32바이트 길이의 숫자

#### 트랜잭션

- 비트코인의 거래내역 (=코인)

- 코인베이스 트랜잭션

  - 블록을 채굴한 사람에게 보상금을 지금해주는 트랜잭션
  - 이전 출력이 존재하지 않음(누가? 라는것이 존재X )
  - 100 확인 이전에는 사용할 수 없도록 제한

- 일반 트랜잭션 : 코인베이스 트랜잭션을 제외한 모든 트랜잭션

#### UTXO[Unspent Transaction Output : 미사용 출력]

- 암호화폐를 저장하는 자료구조
- 출력(지급)은 됐으나 아직 당사자가 사용하지 않은 상태로 블록에 흩어져 있는 기록
- 당사자만 쓸 수 있도록 잠금장치 = P2PKH[Pay-To-Public-Key-Hash]
  - 당사자만이 풀 수 있다 >> 당사자의 공개키로 암호화 되어있기 때문
- 특징
  - 다른 사람에게 일정량의 암호화폐를 받을 때 생성
  - 받은 금액 그대로를 UTXO로 저장
  - UTXO 안 일부 금액을 송금할 때는 새 UTXO를 생성하고 기존 UTXO는 파기

#### 전자서명

- 공개키 시스템에서 송신자의 신원을 증명하는 방법
- 송신자가 자신의 개인키로 암호화한 메시지를 수신자가 송신자의 공개키로 해독
- 신뢰성, 무결성, 부인방지

#### 해쉬함수

- 임의 길이의 데이터를 고정 길이의 데이터로 매핑하는 함수
- 일방향성 : H[x] = h 를 만족하는 임의의 x를 찾는 것이 불가능
- 충돌회피성 : H[x] = H[y]를 만족하는 임의의 x,y를 찾는 것이 불가능 == 유일성
  - 입력이 다르면 출력도 달라야한다 하지만 입력이 달라도 출력이 같을때 있음 그걸 피하는게 충돌회피, input이 다르면 해쉬도 다르다
- 해쉬의 종류 = SHA-256 : 256비트[32바이트] 길이의 해시값을 생성

​                            = RIPEMD-160 : 해시값이 128비트였던것을 160비트로 확장 개량

​							= HASH 160 :  SHA-256으로 생성한 해시값을 한 번 더 RIPEMD-160으로 해싱 한 것

#### nonce

- 작업증명(난이도를 만족하는 블럭 해쉬값을 찾음)이 완료될 떄까지 1씩 증가
- 오버플로우가 발생하면 새로운 트랜잭션을 추가해서 재시도
- 블록 헤더 중 유일하게 변경할 수 있는 정보

#### difficulty

- 출력된 해쉬값이 가지는 0 배열의 개수
- 블록 생성시마다 생성시간 측정 난이도 조절 ===> 생성시간을 일정하게 유지시킴



#### 머클트리[Merkle Tree]

- 이진 해쉬 트리 구조
- 말단 노드를 두개씩 묶는 행동 반복하여 해시값을 생성
- 규모가 큰 데이터 집합의 완전성을 효율적으로 요약, 검증하는데 사용

​      **머클루트만으로 트랜잭션의 유효성 보장!**

#### 합의

- 모든 참여자의 원장이 일치하는지 확인
- 중앙집중형에서의 합의 => 서비스 제공자가 원장을 관리
  - 빠른 서비스 제공가능
  - 중앙기관의 의도 또는 악의적인 사용자의 공격을 통해 기록조작 가능
- 분산 환경에서의 합의 ==> 증명 기반
  - 비잔틴 장군 문제 해경를 통해 신뢰도 있는 서비스 제공
  - 거래 및 거래 실행순서에 대한 동의, 악의적인 참여자 노드들은 격리
  - 동일한 원장을 유지하기 위하여 검증 참여자들의 상태 동기화
- 합의 알고리즘
  - 작업증명[PoW]
    - 서비스 거부 공격이나 스팸등으로 서비스가 남용되는 것을 방지하기 위해 만들어짐
    - 서비스를 신청하는 자에게 작지 않으면서도 처리 가능한 수준의 과제를 요구
    - 작업[계산] 능력에 의해 채굴 능력[확률]이 결정된다
    - 느린 속도와 낭비되는 에너지 문제 심각
  - 지분증명[PoS]
    - 가상화폐 PeerCoin에서 처음으로 발표한 합의 알고리즘
    - 지분과 지분이 생성된 날짜에 의해 채굴 능력[확률]이 결정
    - 작업증명 알고리즘의 에너지 낭비 문제 해결, 다양한 알고리즘 존재