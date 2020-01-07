# dHTML5 웹프로그래밍

web Server : httpd

web Container : CGI engine

web Context : My Application scope



버튼누르면 홈페이지로 이동 

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form>
		HTML5
		<a href="https://www.w3schools.com/html/" target="_blank">
			<button type="button">Learm HTML</button>
		</a>
		<a href="https://www.w3schools.com/css/" target="_blank">
			<button type="button">Learn css</button>
		</a>
		<a href="https://www.w3schools.com/js/" target="_blank">
			<button type="button">Learn javascript</button>
		</a>
		<button type="button" onclick="alert('버튼클릭했');">
			click me
		</button><br><br>
		글 남기기 : <input type="text" name="userID size=35"/>
		<button type="submit">저장</button>
		<button type="reset">지우기</button>
		</form>
</body>
</html>
```



계속 이어서 추가

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form method="post" action="main">
	  <input type="hidden" name="sign" value="button" />
		 HTML5
		<a href="https://www.w3schools.com/html/" target="_blank">
			<button type="button">Learm HTML</button>
		</a>
		<a href="https://www.w3schools.com/css/" target="_blank">
			<button type="button">Learn css</button>
		</a>
		<a href="https://www.w3schools.com/js/" target="_blank">
			<button type="button">Learn javascript</button>
		</a>
		<button type="button" onclick="alert('버튼클릭했');">
			click me
		</button><br><br>
		글 남기기 : <textarea name="userID" rows="5">여기에 글을 남겨주세요</textarea>
		 <button type="submit">저장</button>
		 <button type="reset">지우기</button>
		 <br>
		 국적<select name="country">
		 	<option value="France">프랑스</option>
		 	<option value="Korea" selected>Korea</option>
		 	<option value="USA">usa</option>
		 	<option value="germany">germany</option>
		 	<option value="other">기타</option>
		 </select>
		 여행한 도시 <select name="city" size="5" multiple>
		 	<option value="서울" "selected>서울</option>
		 	<option value="파리">파리</option>
		 	<option value="뉴욕" "selected>뉴욕</option>
		 	<option value="런던">런던</option>
		 	<option value="헬싱키">헬싱키</option>
		 	<option value="베를린">베를린</option>
		 	<option value="기타">기타</option>
		 </select><hr>
		 
		 <br><br>
		 Q1.학생의 학년은?<br>
		 학년:<input type="radio" name="year" value="1" id="r1" /><label for="r1">1학년</label>
		    <input type="radio" name="year" value="2" id="r2" /><label for="r2">2학년</label>
		    <input type="radio" name="year" value="3" id="r3" /><label for="r3">3학년</label>
		    <input type="radio" name="year" value="4" id="r4" /><label for="r4">4학년</label><br><hr>
		 Q2.즐겨보는 스포츠 중계<br>
		 <input type="checkbox" name="sport" value="baseball" checked id="b1"/><label for="b1">프로야구중계</label>
		 <input type="checkbox" name="sport" value="s1" id="b2"/><label for="b2">프로축구중계</label>
		 <input type="checkbox" name="sport" value="s2" id="b3"/><label for="b3">프로골프중계</label><br>
		 <input type="checkbox" name="sport" value="s3" id="b4"/><label for="b4">프로농구중계</label>
		 <input type="checkbox" name="sport" value="s4" id="b5"/><label for="b5">프로배구중계</label>
		 <input type="checkbox" name="sport" value="s5" id="b6"/><label for="b6">프로바둑중계</label>
		 
		 <button type="submit">데이터 전송</button>
		</form>
</body>
</html>
```



MainServlet

```java
package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class mainservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void a(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("UTF-8");
		String sign=request.getParameter("sign");
		if(sign.equals("level")){
			String major=request.getParameter("major");
			System.out.println(major);
		}else if(sign.equals("button")){
			String userID=request.getParameter("userID");
			System.out.println(userID);
			String country=request.getParameter("country");
			System.out.println(country);
			String year=request.getParameter("year");
			System.out.println(year);
			
			String[] sports=request.getParameterValues("sport");
			for(int i=0;i<sports.length;i++){
				System.out.print(sports[i]+"\t");
			}
			System.out.println();
			for(String sport:sports){
				System.out.println(sport+"\t");
			}
		}		
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		a(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		a(request, response);

	}

}

```

![html실습](C:\Users\student\Desktop\html실습.PNG)

css연습

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
	.c1 {background: skyblue;}
	.c2 {color:blue;}
	.c3 {color:red;}
	#a1 {background: orange;}
</style>
</head>
<body>
	<h3>HTML5 입문</h3><hr>
	<ol>
		<li class="c1 c3">HTML5</li>
		<ul>				
		<li class="c2"> 하이퍼링크 </li>
		<li class="c2">입력양식</li>
		</ul>
		<li> CSS3</li>
		<ul>
			<li class="c3">선택자</li>
			<li class="c3">css스타일속성</li>
			<li id="a1">레이아웃</li>
		</ul>
		<li class="c1 c2">JAVAscript</li>
	</ol>
</body>
</html>
```

![html실](C:\Users\student\Desktop\html실.PNG)

