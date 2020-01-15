Overiding

super의 method의 내용만 바꾸는 것



밑에서부터 수행되어지고 없으면 위로 올라간다....

Super = 자신의 부모만 호출가능



HTML DOM 사용해보기

- script로 html문서내용을 동적으로 변경하기

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
	#f1{width:150px;height:150px;}
</style>

<script>
	function change(){
		var obj1=document.getElementById("f1");
		obj1.src="./image/js.PNG";
		obj1.style.width="70px";
		obj1.style.heigth="70px";
		var obj2=document.getElementById("txt1");
		obj2.innerHTML="자바스크립트";
		obj2.style.background="orange";
	}
</script>
	
</head>
<body>
	<img id="f1" src="./image/html5.PNG"/>
	<span id="txt1">HTML5</span>
	<button onclick="change()">button</button>	
</body>
</html>
```

- 요소 속성의 동적인 변경

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>What Can FavaScript Do?</h3>
	<button id="b1" onclick="changeOn();">전구켜기</button>
	<img id="light" src="./image/lightoff.png" style="width:70px">
	<button id="b2" onclick="changeoff();">전구off</button>
	
	<script>
		function changeoff(){
			var tag1=document.getElementById("light");
			tag1.src="./image/lightoff.png";
		}
		function changeOn(){
			var tag1=document.getElementById("light");
			tag1.src="./image/lighton.png";
		}
	</script>
</body>
</html>
```



##### Event Programming

1. EventSource에 EventListener를 달고
2. EventListener를 구현하는 EventHandler를 작성



document.getElementByid("old").addEventListener("click",eventHandler);

------------------------------------> id받기                                  ----->이벤트 종류   



- 체크박스 입력의 change 이벤트 처리

```html
<!DOCTYPE html>
<html>
<body  >
<h3> 수강신청 과목을 모두 선택하세요 </h3><hr>  
<input type="checkbox" name="s" value="2" onchange="apply(event,this)"/>교양컴퓨터(2학점)
<input type="checkbox" name="s" value="4" onchange="apply(event,this)"/>자료구조실습(4학점) 
<input type="checkbox" name="s" value="3" onchange="apply(event,this)"/>데이터베이스(3학점)
<input type="checkbox" name="s" value="4" onchange="apply(event,this)"/>알고리즘실습(4학점)
<input type="checkbox" name="s" value="3" onchange="apply(event,this)"/>네트워크(3학점)<hr>
총 수강신청 학점 : <input type="text" id="sum" value="" /> 
<br><div id="aaa">...</div>
<script> 
   var total=0; 
   function apply(e,subject) {
	  document.getElementById("aaa").innerHTML=e.type+":"+e.target;
      if (subject.checked==true) { total=total+parseInt(subject.value); }
      else  { total=total- parseInt(subject.value); }
      document.getElementById("sum").value= total ; 
   }  
</script> 
</body>
</html>

```



## jQuery  사용해보기

##### jquery의 이벤트 처리

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('#b1').on({
				"click":function(){$('#t1').html('jQuery 라이브러리');},
				"mouseover":function(){$('#t1').css('color','red')}
			});
		});
	</script>
</head>
<body>
	<h3 id="t1">자바스크림ㅂ트 프로그래밍</h3><hr>
	<button id="b1">내용변경&스타일변경</button>
</body>
</html>
```

