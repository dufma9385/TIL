const express=require('express');
const router=express.Router();

const {contactRouter, members} = require('./contact');

router.post('/',(req,res)=>{
    //console.log(req.body);
    let message; //message를 undefined로 두고 시작
    for(let i=0; i<members.length;i++){ //배열의 길이만큼 돌리기
        if(members[i].email==req.body.email){ //members의 email 값이 body.email과 일치하면
            message="login ok"; //messager를 login ok로두고 break
            req.session.email = req.body.email;
            break;
        }
    }
    if(!message){ //for문을 빠져나왔는데도 message값이 그대로면 
        message = "login fali"; //messager를 login ok로
    }
    res.json({message});//json으로 return하는 함수는 독립적이다.
});

module.exports=router;