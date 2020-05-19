1. JPA
2. Rest Service
3. Thymeleaf
4. React와 Spring Boot 연동



findById(ID)

select *from account where id=1;



save(T)

insert into account values()

update account

 

작성규칙

Account

String myFirstUserName;

findByMyFirstUserNave(String username)



findByUsername(username)

slelect * from account where username='gildong'



람다식

function sayHello(msg){

​	return "Hello"+msg;

}

//arrow funtion(ES6)

sayHello = msg => "Hello"+msg;



Funtional Interrface (함수형 인터페이스)

: **추상메서드 (abstract)가 딱 한개만 있는 인터페이스**

**함수형 인터페이스는 람다식으로 표현할 수 있다.**

orElseThrow( () -> new RuntimeException() );



Supplier 추상메서드

get() : T



---------------------------------------------------------------------------------------------------------------------------------------

1. Store

   : 저장소

2. Action

   : 요청(예를들어 증가, 감소)

3.  Dispatcher

   : Action을 store에 전달

4.  Reducer

   : Store에 저장된 상태변수를 변경

5. 

