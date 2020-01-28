const express = require('express');
const contactRouter = express.Router();

const members=[
    {name:'lee', email:'lee@hanmail.net', contact:'hi'},
    {name:'jes', email:'dd@email.com', contact:'hello'}
];

contactRouter.post('/',(req, res)=>{
    
    members.push(req.body);
    console.log(members);
    res.json({message:"contact ok"});
});

module.exports = {contactRouter, members};