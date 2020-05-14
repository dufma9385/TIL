JSP

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>



request(요청)

request.setCharacterEncoding("UTF-8");



response(응답)

response.setContentType("text/html; charset=UTF-8");



##### Query String 형태로 데이터 전달

deletUser.do?userid=gildong

@RequertParam



##### 데이터를 url에 /(슬래쉬)형태로 전달

deletUser.do/gildong

@PathVariable



DispatcherServlet의  url-pattern *.do => **/**

Tomcat이 먼저 호출해주는 DefaultServletd의 url-pattern도 **/** 이다.



UserVO

​	private String userid;

​	setMyUserId()

​	getMyUserId()

------------------------------------------

<input type="text" name="userid"  (X)

<input type="text" name="myUserId"    (o)

@ModelAttribute

@Valid : @Model