### API 연습



```js
npm init

npm i express

npm i fomidable
```

**server.js**

```js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use('/upload',require('./routes/uploadRouter'));

const server = app.listen('8080',()=>{
    console.log("8080 server ready");
});

const a = require('./socket');
a(server);

const b = require('./sse');
b(server);
```

**socket.js**

```js
const WebSocket = require('ws');

a=(server)=>{
    //server socket....
    const wss=new WebSocket.Server({server});
    wss.on('connection',(ws,req)=>{
        const ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속 :'+ip);
        ws.on('message',(message)=>{
            wss.clients.forEach((client)=>{
                if(client.readyState===WebSocket.OPEN){
                    client.send(message);
                }//end if
            });//forEach
        });//end on
        ws.on('close',()=>{
            console.log('클라이언트 접속 해제 : '+ip);
        });
        ws.on('error',(error)=>{
            console.log(error);
        });
    });
}

module.exports=a;
```

**sse.js**

```js
const SSE= require('sse');

let price=100;

b=(server)=>{
    const sseObj = new SSE(server);
    sseObj.on('connection',(client)=>{
        setInterval(()=>{
            client.send('현재 입찰가 : '+ (price *= 2));
        },5000);
    });
}

module.exports=b;
```

**public**/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script>
        let w;
        function startWorker(){
            if(typeof(Worker)!== 'undefined'){
                if(typeof(w)=='undefined'){
                    w = new Worker('workertask.js');
                }
                w.onmessage=function(event){
                    document.getElementById('result').innerHTML=event.data;
                }
            }else{
                document.getElementById('result').innerHTML='이 브라우저가 Worker를 지원하지 않습니다';
            }
        }

        function stopWorker(){
            w.terminate();
        }

        let webSocket;
        function startchat(){
            webSocket= new WebSocket('ws://localhost:8080');
            webSocket.onopen=function(){
                chatId = '['+document.getElementById('chatId').value+']';
                if(chatId){
                    alert('start chatting');
                }else{
                    alert('input chatId');
                }
            }
            webSocket.onmessage=function(event){
                //console.log(event.data);
                document.getElementById('ta').value += event.data;
                document.getElementById('a').value="";
            }
        }
        function sendMsg(){
            //console.log(event);
            if(event.key==='Enter'){
                console.log("send to server");
                webSocket.send(chatId+document.getElementById('a').value+'\n');
            }
        }
        
        let source;
        function sse(){
            source = new EventSource("/sse");
            source.onmessage = function(event) {
                console.log(event.data);
            };
        }
        function sse_stop(){
            source.close();
        }
    </script>
</head>
<body>
    <form enctype="multipart/form-data" method="post" action="upload/img">
        <input type='file' name='filetoupload'>
        <input type='submit' value='file upload'>
    </form>
    <hr>
    <button onclick="startWorker()">500보다 큰 소수 찾기</button>
    <button onclick="stopWorker()">종료</button><br>
    <p>결과 : <span id="result"></span></p>
    <hr>
    <input placeholder="채팅 아이디 입력" id="chatId">
    <button onclick="startchat()">채팅 접속</button>
    <br><br>
    <textarea rows="10" cols="50" id='ta'></textarea><br>
    <input onkeypress="sendMsg()" id="a">
    <hr>
    <button onclick="sse()">경매 진행 보기</button>
    <button onclick="sse_stop()">경매 진행 그만 보기</button>
    <br><br>
</body>
</html>
```

**public**/**workertask.js**

```js
let i=1;
while(true){
    i++;
    for(let j=2;j<Math.sqrt(i);j++){
        if(i%j==0) continue;
    }
    if(i>500) postMessage(i);
}
```

**routes**/**uploadRouter.js**

```js
const express=require('express');
const router = express.Router();
const formidable= require('formidable');
const fs= require('fs');

fs.readdir('uploads',(error)=>{
    if(error){
        console.log('uploads 폴더가 없으니 생성');
        fs.mkdirSync('uploads');
    }
});

router.post('/img', (req,res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const oldpath = files.filetoupload.path;
      console.log(oldpath);
      const newpath = 'uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
});

module.exports=router;
```

