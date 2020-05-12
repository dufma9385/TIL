### JDBC

<hr>

#### 1. Vendor에서 제공하는 Driver 클래스를 생성

- class.forName("oracle.jdbc.OracleDriver");

  import oracle.jdbc.OracleDriver;

  Driver driver = new Oracle Driver();

#### 2. **Connection 생성**

- Connection은 DB와 연결을 담당하는 객체

  url="jdbc:oracle:thin:@IP:port:SID"

  user="tiger"	

  pass="tiger"

  Connection con = DriverManager.getConnection(url,user,pass);

#### 3. **Statement 생성**

- Statement는 SQL문을 DB에 전송하는 역할을 담당하는 객체

  Statement stmt = con.createStatement();

#### 4. SQL 실행

- executeQuery(); ResultSet

​		: SELECT 문을 처리하는 method

- executeUpdate(): int

​		: insert, Update, Delete  문

​	ex)  

```java
ResultSet rs = stmt.executeQuery("select * from users");

while(rs.next()){
	String userid = rs.getString("userid(컬럼명)");
	String addr = rs.getString(2); //컬럼의 indexNo
}
```

#### 5. Resource 반납

- Statement, Connection의 close()메서드 호출



String sql = "insert into users values(' "+ userid +" ',' "+ name +" ',' "+ gender +" ',' "+ addr +" '')";

String sql = "insert into users values(?,?,?,?)";



DataSource ds = new SimpleDriverDataSource();

ds.setUrl("jdbc:oracle:thin:@IP:port:SID");

ds. setUsername("scott");



<hr>

커낵션 풀링 = 미리 필요한 connection만큼 풀에 만들어 놓고 사용

​					= 웹에서 접속자가 많을 시 유용하다

