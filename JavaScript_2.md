자바스크립트에서 배열을 사용하면 서버단의 메모리 효율이 매우 좋지 않다(간단한 웹페이지를 만드는데 사용되는 스크립트이기 때문)

===> Node.js를 사용하여 변환...?

### 자바스크립트의 배열

정수와 문자열 인덱스들을 사용하는 배열의 모든 원소들을 처리할 때는 for-in 문을 사용해야한다

#### for-in 문

배열이나 객체의 모든 자료값들을 빠짐없이 참조할 수 있는 방법으로 for-in문을 사용

== 모든 배열원소들이나 객체의 모든 속성들에 대해 반복적으로 동일한 처리를 할 때 사용하는 반복문!

== 배열의 원소 개수, 객체의 모든 속성명들을 알지 못하더라도 빠짐없이 접근해서 처리할 수 있다.



for와 if의 소속은 window가 된다

function은 독립된 것처럼 행동을 한다(global변수로 선언됨) ==> 자바스크립트는 functional language가 된다

function에서는 var라는 키워드 없이 선언하면 window의 변수로 선언하게 된다==> function의 기능을 없앤다

function내에서	val v1 = global 변수

​							  let v1 = 블록변수

​										|

변수 생성 위치는 다르지만 변수명이 같으면 생성이 되지 않는다



블럭변수들로 선언하는게 좋다 window의 let , function 안에서의 let변수를 부르고 싶으면 이름이 절대 같으면 안된다

function안에서 처리할 데이터는 그 안에서 처리 하는게 좋다 밖에서 부르고 이런거 별로다



어싱ㅋ로웨이트 클로져



자바스크립트의 호이스팅

실행될 때 초기화된 변수 정의들을 제외한 모든 전역변수들과 함수들의 정의를 HTML문서의 앞부분으로 자동 이동시킨 후 실행을 시작하는 것

초기화 값이 없는 경우라고 호이스팅을 다 하진 않는다



JavaScript 생성자

- 시스템 생성객체
  - 자바스크립트를 사용할 때 이미 존재하는 객체들
- 사용자 생성객체
  - 자바스크립트 코드로 생성하는 객체들



객체생성

1. 객체리터럴 타입
2. 객체 Object 방식
3. 사용자 정의 객체생성



```javascript
<script>
	var dn1 = new doughnut("초코맛",1900,"choco");
		var dn2 = new doughnut("오리지널",1600,"charamel");
		var dn3 = new doughnut("크림", 1700,"cream"); 
			
		
		document.write("도넛이름 : "+dn1.name+"가격 : "+dn1.price+"맛 : "+dn1.flavor+"<br>");
		document.write("도넛이름 : "+dn2.name+"가격 : "+dn2.price+"맛 : "+dn2.flavor+"<br>");
		document.write("도넛이름 : "+dn3.name+"가격 : "+dn3.price+"맛 : "+dn3.flavor+"<br>");
</script>
```



 배열사용하여 출력

```javascript
<script>
		function Doughnut(name, price, flavor){
			this.name=name;
			this.price=price;
			this.flavor=flavor;
		}
		
		var arr = [];
		
		arr[0]= new Doughnut("초코맛",1900,"choco");
		arr[1]= new Doughnut("오리지널",1600,"charamel");
		arr[2]= new Doughnut("크림", 1700,"cream");
		arr[3]= new Doughnut("달콤딸기",2300,"strawberrey");
		
		for(i=0; i<=arr.length;i++){
			document.write("도넛이름 : "+arr[i].name+", 가격 : "+arr[i].price+", 맛 : "+arr[i].flavor+"<br>");
		}

</script>
```

실행 결과는 같음

도넛이름 : 초코맛, 가격 : 1900, 맛 : choco
도넛이름 : 오리지널, 가격 : 1600, 맛 : charamel
도넛이름 : 크림, 가격 : 1700, 맛 : cream
도넛이름 : 달콤딸기, 가격 : 2300, 맛 : strawberrey