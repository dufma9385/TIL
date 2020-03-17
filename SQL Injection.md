

### SQL Injection 

#### ==> 입력되는 데이터가 SQL의 구조를 바꾸는 취약점

1. Form based => 정상수행을 목표로 한다 ex)회원가입 폼, 로그인폼, 검색폼...
2. Error based => 에러 메세지로 정보 취득
3. Union  based => select 결과 합산해서 db정보 추출, 공격자가 원하는 테이블 정보를 추출할 수 있다
4. Stored Procedure => 내장함수 사용하여 파일의 내용 추출 가능, 서버 마비시키기
5. blind => true/false의 답을 통해 정보 취득

### 방어기법

#### ==> SQL을 고정시킨다 !

보통우리가 날리는 데이터는 클->서버 그럼 서버에서 SQL만들어서 db 로 보냄

--> db에 SQL을 미리 작성해두고 서버에서는 데이터만 보낸다



##### statement

statement (일반택배)

​		       |	excute();

PreparedStatement(전문택배) : SQL

​				|	excute();

callableStatement(호출택배) : 내장함수

​					  excute();



#### ==> PreparedStatement 를 이용 (statement와 비교하여 사용 성능이 매우 좋다)

 : 셀렉트 구문을 먼저 디비로 보내면 디비에서 컴파일해서 내장	함수로 변환 후 저장 해 둔다.

수행시 서버는 데이터만 전달을 한다 prepareStatement로 아규먼트만 전달한다.



#### ==> 입력값에 대해 SQL 인젝션 필터 적용

==> Hibernate사용시 외부 입력값을 자료형에 따라 바인딩 해서 사용

==> MyBatis 사용시 #{} 매개변수 치환방식 사용

==> Java Persistence API에서 정적쿼리 구조 사용

