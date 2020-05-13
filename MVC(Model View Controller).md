쿼리문 사용시 인자가 두개이상일땐 VO에 담아서 넘겨야함

마이바티스가 쿼리뭐시기 접근할때 변수가 직접 접근하는 것이 아니고 set메소드를 사용, VO로 묶어서 접근



## MVC(Model View Controller)

 : "Seperation of Concerns(Responsibility)"

 :  관심사의 분리, 책임의 분리

#### Model1 Achitecture

​	Model  :  Java(DAO, Service, VO)

​	View  :  JSP(html,css,js)

​	Controller  :  JSP

#### Model2 Achitecture

​	Model  :  Java(DAO, Service, VO)

​	VIew  :  JSP(html,css,js)

​	Controller  :  Servlet

	- Spring MVC, Struts



#### Servlet과 JSP 차이점

 :  Servlet은 Java 클래스 내부에 html를 삽입 할 수 있다

 :  JSP는 html에 java code를 삽입할 수 있다.



#### JSTL (Java Standard Rag Library()

​	: JSP에서 java comde를 없애자 <% %>, <%= %>

​	: 개발자들이 자주 사용하는 java구문을 jsp 표준 태그로 만들어 놓은 라이브러리



##### Servlet

​	session.setAttribute("userList", users);

##### JSP

​	${PsessionScope.userList}

<hr>

##### Servlet

​	request.setAttribute("userList", users);

##### JSP

​	${userList}