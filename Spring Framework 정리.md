## Spring Framework 정리

### 1. Framework 란?

​	: 비기능적인 요소((로깅, 인증, Tx처리, 성능...) 구현해 놓은 라이브러리(구현체)

​	  (Semi Completed)

​	: 개발의 생산성을 높여보자

### 2. Library 와 Framework 의 차이점

​	: 제어 흐름의 주도권을 누가 가지고 있느냐?

​		 Library : 개발자가 제어흐름의 주도권을 가지고 있다.

​		Framework: 프레임 워크(Container)가 제어흐름의 주도권을 가진다.

### 3. 프레임워크의 구성요소

​	: Library + Design Pattern + Container

### 4. IoC(Inversion of Control)

​	: 제어의 역전

​	: 개발자가 가지고 있던 주도권을 가져와서 개발자가 작성한 클래스에 객체를 생성하고, 메서드를 호출해 준다.

​	: Spring Bean Container를 제공한다.

​	: IoC 구현 방법

		- DL (Dependency Lookup) - 의존하는 객체를 Look up,  JNDI(java naming directory interface) 를 사용
		- DI (Dependency Injection) - 의존하는 객체를 주입(injection)을 받겠다.

### 5. DI

​	: Setter Injection

​		setter method의 아규먼트로 의존하는 객체의 레퍼런스를 주입받는다.

​	: Constructor Injection

​		객체가 생성될때 생성자의 아규먼트로 의존하는 객체의 레퍼런스를 한번에 여러개를 주입받는 방식

- 전략 1

  : Bean에 설정을 모두 XML에 하겠다

  ​	<bean> <property> <constructio-arg>

- 전략 2

  : Bean 설정을 어노테이션과 XML을 혼용하겠다.

  ​	@Component, @Repository, @Service, @Controller, @Autowired, @Qualifier, @Value

- 전략 3

  : Bean 설정을 어노테이션과 Java설정 클래스를 사용하겠다.(No XML)

  ​	@Configuration

  ​	@Bean

  ​	@ComponentScan



Spring MVC 관련 어노테이션

@Controller

@RestController

​	: @Controller + @ResponseBody

@RequestMapping

@RequestParam

?key=value

@PathVarialble

users/gildong

@ModelAttribute



public String method(){

​	return "userList";

}
