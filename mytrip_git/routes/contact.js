const con = require('./mysql_con');

const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    if(req.session.email){
    const sql = `INSERT INTO board (title, content) VALUES ('${req.body.board_title}', '${req.body.board_content}')`;
        con.query(sql,(err, result)=>{
            if(err){
                console.log(err);
                res.json({message:"등록 실패"});
            }else{
                console.log('board insert ok');
                res.json({message:"등록 성공"});
            }
        });
    }else{
        console.log("로그인 필요");
        res.json({message:"로그인하세요"});
    }
});
module.exports = router;
