const express = require('express'); 
const path = require('path');
const app = express();
const session=require('express-session');


const loginRouter = require('./routes/login'); //router 사용 따로 불러오기
const logoutRouter = require('./routes/logout');
const {contactRouter, members} = require('./routes/contact');


app.use(express.static(path.join(__dirname,'public'))); //public폴더에서 찾아오기
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({ //session 설정
    resave:false,
    saveUninitialized:true,
    secret: '민경',
    cookie : {
        httpOnly:true,
        secure:false
    }
}));

app.post('/basket',(req,res)=>{
    console.log("basket처리:",req.body);
    const product=req.body.product;
    console.log("=========>",product);
    if(!req.session.basket){
        req.session.basket=[];
    }
    req.session.basket.push(product);
    res.json({message:`장바구니에 ${product}가 담겼습니다.`});
});
app.post('/basket_view',(req,res)=>{
    console.log("basket_view 처리:"+req.headers.cookie);
    //console.log(req.session);    
    let basket;
    if(req.session.basket){
        basket=req.session.basket.join(',');
        res.json({message:basket});
    }else{
        res.json({message:`장바구니가 비었습니다`});
    }   
});

app.use('/logout',logoutRouter);
app.use('/login', loginRouter);
app.use('/contact',contactRouter);



app.listen(3000,()=>{
    console.log("server ready");
});