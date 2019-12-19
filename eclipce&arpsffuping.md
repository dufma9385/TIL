로그인 정보가 저장 되어 보내지는 action변수의 이름을 타인이 쉽게 알아채지 못하게 이름을 정해야한다

javax = 확장패키지

java = 그냥 패키지



eclipse 설치, tomcat server8.0, 

indext.html로 로그인 페이지 만들기 



```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> //한글지원
<title>Insert title here</title>
</head>
<body>
 <h1>Duke's Shopping Mall</h1>
 <hr>
 <br>
 <form action="main"> 
  ID<input type="text" name="id"><br> //id를 텍스트 타입으로 받아서 값을 id로 함
  PW<input type="password" name="pw"><br> //password를 텍스트 타입으로 받아서 값을 pw로 함
  <input type="submit" value="로그인"> //값들을 넘긴다
 </form>
 
</body>
</html>
```



servlet 파일 생성

```java
package web.controller;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class MainServlet extends HttpServlet {
   
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setCharacterEncoding("utf-8");
            String id=request.getParameter("id"); //id로 넘어오 값을 스트링으로 받는다
            String pw=request.getParameter("pw");
           
            System.out.println(id+":"+pw);//넘어온 값 로그로 출력
            //DB 연동 Biz(비즈니스)
       
            Class.forName("com.mysql.jdbc.Driver"); //드라이브 연결 mysql connector/j8.0
            Connection con = DriverManager.getConnection("jdbc:mysql://192.168.111.100:3306/shopping_db","winuser","4321"); // 연결할 디비의 주소와 이름, 유저네임, 비밀번호 입력
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery("select * from customer where id='"+id+"'");
            // 디비의 고객테이블에서 넘어온 id와 같은 값의 행을 가져오고
            String name=null; 
            if(rs.next()) {
                name=rs.getString("name"); //스트링으로 테이블의 네임속성을 가져온다
            }
           
            response.setContentType("text/html;charset=utf-8"); //text타입을 html로
            PrintWriter out=response.getWriter();       
            out.println("<h1>"); //web화면에 출력
           
            if(name != null) {
                out.println(name+"님 환영합니다"); //db에 저장되어있는 name출력
            }
           
            out.println("</h1>");
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
   
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
    }
}
```



ARP 스푸핑 공격 

= MAC주소를 속여 로컬에서 통신하고 있는 서버와 클라이언트의 IP주소에 대한 데이터 링크 계층의 MAC주소를 공격자의 MAC주소로 속여, 클라이언트에서 서버로 가는  패킷이나 서버에서 클라이언트로 가는 패킷이 공격자에게 향하게 함으로써 랜의 통신 흐름 왜곡

우선 WinClient서버에서 

나의 리눅스 서버에서 apache2를 실행시켜두고 winclient에서 디비에 연결할 수 있게 한다

WinClient와 MariaDB가 연동이 되면 WinClient서버에서 웹페이지로 localhost:8080/MyWeb으로 접속하면 

로그인 페이지가 나온다!

만약 server머신에서 접속을 원할 때는 192.168.111.128:8080/MyWeb 으로 접속 가능(win의 ip주소이다)

![index](C:\Users\student\TIL\index.PNG)



이때 ARP스푸핑 공격을 위해 kali서버를 열어서 터미널창에 입력

![칼리입력 스푸핑](C:\Users\student\TIL\칼리입력 스푸핑.PNG)

win과 server의 맥과 아이피 주소를 속여서 kali머신으로 한번 거쳐서 갈 수 있게 하면 데이터가 노출된다 

WireShark 프로그램을 열어 eth0 선택 후 실행시켜둔다

다시 서버머신으로 돌아가서 로그인 창에 로그인 정보 입력하고 로그인

![로그인](C:\Users\student\TIL\로그인.PNG)

WireShark에서 캡쳐된 데이터를 볼 수 있다

![와이어샤크비번확인](C:\Users\student\TIL\와이어샤크비번확인.PNG)

