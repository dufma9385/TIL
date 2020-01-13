#### 자료형

| 자료형    | 변수의 자료형   | 구분                   | 표현 예/방법                  |
| --------- | --------------- | ---------------------- | ----------------------------- |
| string    | 문자영          | primitive type, object | 문자들                        |
| number    | 정수,실수       | primitive type, object | 356, 3.14                     |
| boolean   | 참,거짓(논리값) | primitive type, object | true, flase                   |
| object    | 호출 불가 객체  | object                 | 객체 상수 또는 객체 변수      |
| function  | 호출가능객체    | object                 | 함수명() 또는 함수형 객체변수 |
| undefined | 정의되지않음    | primitive type         | undefined                     |



```javascript
var age=27;
var weigth=40.9;
var gender='girl';
var isPretty=true;
document.write(age+'<br>');
document.write(weigth+'<br>');
document.write(gender+'<br>');
document.write(isPretty+"<br>");
```

27

40.9

girl

true



#### Java의 동작구조

Test. Java

​	|

test class

```java
int age=29;

double weight=50.5;

char gender="girl";

boolean isPretty=true;
```

​	|

load

​	|

(main제외한) static멤버초기화

​	|

상속관계파악

​	|

main 수행



**reference data => object**

**reference data type => class**



| 형변환메서드 | 기능                             | 예                       |
| ------------ | -------------------------------- | ------------------------ |
| String()     | 수치값을 문자여로 변환           | String(123)->"123"       |
| Number()     | 문자열을 수치로                  | Number("3.14")=>3.14     |
| Boolean()    | 비논리형 값을 논리형으로         | Boolean(0)->false        |
| parseFloat() | 정수또는 숫자의 문자열을 실수로  | parseFloat("3.14")->3.14 |
| parseInt()   | 실수 또는 숫자의 문자열을 정수로 | parseInt("92")->92       |
| toString()   | 수치값을 문자열로 변환           | (123).toString()->"123"  |



#### javascript 형변환 메서드 실습

```javascript
<script>
		
		var num1=3.145, num2=20, num3=100;
		var str1="58", str2="3.678", str3="javascript";
		var flag1=true, flag2=false;
		
		document.write(str1+num2+'<br>');
		document.write(Number(str1)+num2+'<br>');
		document.write(parseInt(str1)+num2+'<br>');
		document.write(parseInt(str2)+num2+'<br>');
		document.write(parseInt(str3)+num2+'<br>');
		document.write(parseFloat(str2)+num2+'<br>');
		document.write(parseInt(num1)+num2+'<br><hr>');
		
		document.write(num2+num3+'<br>');
		document.write(num2+num3.toString()+'<br>');
		document.write(Boolean(num2)+num3.toString()+'<br>');
		document.write(str3+Number(flag1)+'<br>');
		document.write(str3+Number(flag2)+'<br>');
		
	</script>
```



#### 이벤트 속성 사용

- click이벤트
- mouseover 이벤트
- change 이벤트
- load 이벤트
- resize 이벤트

```javascript
<script>
		
		var str1="꽝 다음을 기약하세요!";
		var str2="당첨! 축하";		
	</script>
	<style>
		div{
			width:50px;
			height:50px;
			border-radius:50%;
			display:inline-block;}
		img{
			width:50px;
			height:80px;
			float:left;}
		#b1{background:red;}
		#b2{background:green;}
		#b3{background:blue;}
		#b4{background:orange;}
		#b5{background:skyblue;}
	</style>
	
	<h4>1.MouseOver/MouseLeave이벤트처리</h4>
	<img src="lightoff.png" onmouseover="this.src='lighton.png';" onmouseleave="this.src='lightoff.png';"/><br><br>
	마우스가 전구 위에 있으면 켜지고, 벗어나면 꺼진다.<br><hr>
	<h4>2.MouseClick 이벤트 처리</h4>
	경품추첨! 원하는 공을 클릭하세요<br><br>
	<div id="b1" onclick="document.write(str1);"></div>
	<div id="b2" onclick="document.write(str1);"></div>
	<div id="b3" onclick="document.write(str1);"></div>
	<div id="b4" onclick="document.write(str2);"></div>
	<div id="b5" onclick="document.write(str1);"></div>
```

#### 입력함수

- alert() : 안내메세지, 경고메세지 등을 나타내는 대화상자 출력 확인버튼 누르면 대화상자 종료
- confirm() : 대화상자를 통해 사용자에게 확인(yes,ok)또는 취소(No, Cancel)의 응답요구,반환
- prompt() : 대화상자를 통해 사용자에게 문자열의 입력 요구, 반환

button & prompt

```javascript
	<script>
	function a(){
	var name=prompt("이름은?");
	var kor=prompt("국어 시험 성적은?");
	
	if(kor>=70){
		document.write(naem+" 합격");
	}else{
		document.write(name+" 불합격");
	}	
	}
	</script>
	<button onclick="a()" >button</button>
```



제어문 

- 선택문 
  - if, else if
  - switch
- 반복문
  - for문
  - while
  - do-while
  - 

##### switch case

```javascript
<script>
	var score;
	var day;
	document.write("<h3>달력</h3>");
	score = prompt("input score");
	switch (parseInt(score)) {
	case 1:
	case 3:
	case 5:
	case 7:
	case 8:
	case 10:
	case 12:
		day = "31";
		break;
	case 2:
		day = "28";
		break;
	default:
		day = "30";
	}
	document.write(score + "월은" + day + " 일까지 있다");
</script>
```

```javascript
<script>
var score;
var grade;

document.write("<h3>학점판정</h3>");
score=prompt("input score");
switch(parseInt(score/10)){
case 10:
case 9:
	grade="A";break;
case 8:grade="B";break;
case 7:grade="c";break;
case 6:grade="D";break;
default:grade="F";
}
document.write("<hr>학점결과 : ");
document.write(score+"("+grade+")");
</script>
```

