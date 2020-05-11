## Spring Framework

Java 엔터프라이즈 개발을 편하게 해주는 오픈소스 경량급 어플리케이션 프레임워크이다

애플리케이션 프레임워크 : 특정 계층이나 기술, 업무분야에 국한되지 X 전 영역을 포괄하는 범용적 프레임워크

경량급 : 단순한 웹컨테이너에서도 엔터프라이즈 개발의 고급기술을 대부분 사용가능



Bean : 스프링이 관리를 해주는 객체 

Bean Factory : Bean을 생성, 관리해주는 컨테이너 객체

Application Context : BeanFactory와 동일한 기능

Meta data : Spring Configuration XML 

 : F/W에 개발자가 정의한 클래스 정보를 알려주기 위함



```java
public class Hello {
	private Printer printer;
}
```

다른 구현 클래스 ConsolePrinter로

런타임에 교체하는 것이 불가능

```java
public class Hello{
	private StringPrinter printer;
}
```



setMyfirstName()

<property name ="myFirstName" (O)

​								 "myfirstname" (X)

set뒤에 함수명쓰고 property로 부를땐 첫글자는 무조건 소문자로 바꿔줌



setPrinter

setprinter

{key:value}



<hr><hr>

이클립스 단축키

```
ctrl+/ = 주석처리
```

