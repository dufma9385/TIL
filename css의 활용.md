# css의 활용

index.html

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<jsp:include page="title.jsp"></jsp:include>
<jsp:include page="menu.jsp"></jsp:include>
<jsp:include page="content.jsp"></jsp:include>
<jsp:include page="banner.jsp"></jsp:include>
<jsp:include page="copyright.jsp"></jsp:include>
```

title.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
	@import"css/table.css"
</style>
</head>
<body>
 <table border="1">
 	<tr id="title"><td colspan="3"><h1>My Shop</h1></td></tr>
 	<tr>
 		<td colspan="3">
 			<ul id="style2">
 				<li class="li_style"><a class="a_style" href="">HOME</a></li>
 				<li class="li_style"><a class="a_style" href="">HTML5</a></li>
 				<li class="li_style"><a class="a_style" href="">CSS3</a></li>
 				<li class="li_style"><a class="a_style" href="">Javascript</a></li>
 			</ul>
 		</td>
 	</tr>
```

menu.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<tr>
 	 <td class="c1">
 	 	<a href="memberInsert.html">sign in</a>
 	 </td>
```

content.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<td>
	<ol>
		<li>웹서버 설치</li>
		<li>HTML문서 작성</li>
			<ul>
				<li>하이퍼링크</li>
				<li>테이블</li>
				<li>입력양식</li>
			</ul>
		<li>CSS3스타일 시트 작성하기</li>
			<ul>
				<li>선택자</li>
				<li>기본속성</li>
				<li>고급속성</li>
					<ul>
						<li><a href="box.jsp">박스테스트</a></li>
						<li><a href="box2.html"">박스테스트</a></li>
					</ul>
				<li>레이아웃</li>
			</ul>
		<li>자바스크립트 프로그래밍</li>
		<li>HTML DOM프로그래밍</li>
	</ol>
</td>
```

banner.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<td class="c1">banner</td>
</tr>
```

copyright.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<tr id="copyright"><td colspan="3"><p>copyright</p></td></tr>
 </table>
</body>
</html>
```

template.html

```jsp
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
@import
"css/table.css"
</style>
</head>
<body>
	<table border="1">
		<tr id="title">
			<td colspan="3">title</td>
		</tr>
		<tr>
			<td class="c1"><a href="memberInsert.html">sign in</a></td>
			<td>content</td>
			<td class="c1">banner</td>
		</tr>
		<tr id="copyright">
			<td colspan="3">copyright</td>
		</tr>
	</table>
</body>
</html>
```

memberInsert.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="title.jsp"></jsp:include>
<jsp:include page="menu.jsp"></jsp:include>
<td>
	<h3>sign in</h3>
	<form method="post" action="main">
		<input type="hidden" name="sign" value="memberInsert"> 
		ID : <input type="text" required="required" name="id"><br> 
		P/W : <input type="password" name="pw"><br>
		Name : <input type="text" name="name"><br>
		Class : <input type="text" name="class"	value="블록체인C반" disabled="disabled"><br>
		<input type="submit" value="회원가입">
	</form>
</td>
<jsp:include page="banner.jsp"></jsp:include>
<jsp:include page="copyright.jsp"></jsp:include>
```

memberInsert_result.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<jsp:include page="title.jsp"></jsp:include>
<jsp:include page="menu.jsp"></jsp:include>
			<td>
				${name}님 회원가입 되셨습니다.
			</td>
<jsp:include page="banner.jsp"></jsp:include>
<jsp:include page="copyright.jsp"></jsp:include>
```

MainServlet.java

```java
package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MainServlet extends HttpServlet {
	
	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//요청 분석(라우팅)
		request.setCharacterEncoding("UTF-8");
		String sign = request.getParameter("sign");
		if("memberInsert".equals(sign)){//회원가입 처리
			String id = request.getParameter("id");
			String pw = request.getParameter("pw");
			String name = request.getParameter("name");

			
			request.setAttribute("name", name);
			
			RequestDispatcher disp= request.getRequestDispatcher("memberInsert_result.jsp");
			disp.forward(request, response);
		}
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}

```

