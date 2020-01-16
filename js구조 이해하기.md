싱글페이지 어플리케이션은 js파일을 사용하여 한페이지에 다 할 수 있게 함

폼으로 페이지를 넘기고 하지 않는다 == 비동기적방식 효율이 좋아진다



js파일로 로그인 폼 만들고 아이디,비번 받기(동적)

```js
$(document).ready(function(){
	$('#login').click(function(){
		let login_html_content='<h1>로그인</h1>';
		login_html_content+="<hr><form action='' method='get'>";
		login_html_content+="ID<input id='form_id'><br>";
		login_html_content+="PW<input type='password' id='form_pw'><br>";
		login_html_content+="<input type='button' id ='login_b' value='login'></form>";
		$('#content').html(login_html_content);
	});
	
	$(document).on("click","#login_b",function(){
		let id=$('#form_id').val();
		let pw=$('#form_pw').val();
		alert(id+" : "+pw);
        
});
```

html form 에서도 해보기(정적) 

- html의 태그에서 받은 form_id와 form_pw가

  js의 $(document).on("click", "#login_b", function(){})으로 가서 동작

```html
<div id="logincontent">
		<form action="main" method="post">
		ID<input type="text" name="id" id="form_id"><br>
		PW<input type="password" name="pw" id="form_pw"><br><br>
		<button id="login_b">sign in</button>
		</form>
</div>
```

