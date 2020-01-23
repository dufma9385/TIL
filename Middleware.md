json은 값이 1이 들어오면 자동으로 true로 변환한다

```
$('#id').val(""); //안쪽에 비는 값을 준다
```

### 미들웨어

#### express-session

세션관리용 미들웨어이다, 로그인 등의 이유로 세션을 구현할 때 유용

express는 generator로는 설치되지 않음 -> 직접설치

***로그인id와 pw를 가지고 있다가 해당 id&pw로 로그인하면 로그아웃 창 뜨게하고***

***로그인 실패하면 다시 로그인 하게 한다*.** 

##### - index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

        <link rel="stylesheet" href="css/client.css">
        <script src="js/client.js"></script>
    </head>
    <body>
        <div id="hello_div" class="btn btn-success my_width">로그인 해볼까요?</div><br><br>
        <div id="login_div"><img src="img/a.jpg" class="my_width"></div>
    </body>
</html>
```

##### - client.css

```css
.my_width{
    width: 300px;
}c
```



##### - app.js 수정

```js
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const user_data = {id:"a", pw:"b"};

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '김민경',
    cookie: {
        httpOnly: true,
        secrue: false,
    },
}));

app.post('/login', (req,res)=>{
    console.log(req.headers.cookie);

    const id = req.body.id;
    const pw = req.body.pw;
    if((id==user_data.id) && (pw==user_data.pw)){
        res.json({resultCode:1, message:`${id}님 로그인 되셨습니다.`});
    }else{
        res.json({resultCode:0, message:`다시 로그인하세요`});
    }    
});

app.listen(3000, (()=>{
    console.log("server ready");
}));
```

##### - client.js 수정

```js
$(document).ready(function(){
    $('#hello_div').click(function(){
        //alert();
        let login_form = `ID<input id="id"><br>`;
        login_form += `PW<input id="pw" type="password"><br>`;
        login_form += `<input type="button" id="login_btn" value="login">`;
        $('#login_div').html(login_form);
    });

    $(document).on('click', '#login_btn', function(){
        // alert();
        const id = $('#id').val();
        const pw = $('#pw').val();

        const send_param = {id, pw};
        $.post('login', send_param, (returnData)=>{
            alert(returnData.message);
            if(returnData.resultCode){
                let logout_form = `<div class="btn btn-danger">logout</div>`;
                $('#login_div').html(logout_form);
            }else{
                $('#id').val("");
                $('#pw').val("");
            }
            
        });
    });
});
```

Tomcat Server 의 세션 기본 유지 시간 30분!(Time out)

Time out은 메모리에 대비하여 시간을 정한다 => 회사마다 다름(정책적으로)

장바구니에 물건을 넣어두고 브라우저 창을 로그인 상태에서 닫고 다시 새 창을 열어도

장바구니 정보는 남아있지 않는다 = 세션 ID가 없기때문 => 다시 로그인 요청

쿠키는 같은 이름이 들어오면 덮어씌운다

