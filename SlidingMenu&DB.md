### SlidingMenu

### DB연결하여 회원가입과 로그인 처리

### session 부여해서 새로고침시에도 로그인 유지(로그아웃이나 창닫을때

### session파괴)

Menu.jsx

```jsx
import React, {Component} from "react";
import "./css/Menu.css";
import $ from 'jquery';
import { HashRouter, NavLink }from "react-router-dom";
import {} from "jquery.cookie";

class Menu extends Component{
    state={
        login_email:"",
        loginStyle:"inline-block",
        logoutStyle:"none"
    }
    logout=()=>{
        $.get('http://localhost:8080/member/logout',(returnData)=>{
            if(returnData.message){
                $.removeCookie("login_name");
                this.setState({
                    login_email:"",
                    loginStyle:"inline-block",
                    logoutStyle:"none"
                })
            }
        });
    }
    login=()=>{
        const send_param={
            email:this.emailE.value,
            pw:this.pwE.value
        }
        $.post('http://localhost:8080/member/login',send_param, (returnData)=>{
            if(returnData.message){
                $.cookie("login_name",returnData.message);
                this.setState({
                    login_email:returnData.message,
                    loginStyle:"none",
                    logoutStyle:"inline-block"
                })
            }else{
                alert("login fail");
            }
            this.emailE.value="";
            this.pwE.value="";
            this.emailE.focus();
        });
    }

    render(){
        const loginStyle={
            display:this.state.loginStyle
        }
        const logoutStyle={
            display:this.state.logoutStyle,
            paddingLeft:50
        }

        let login_name;
        if($.cookie("login_name")){
            login_name=$.cookie("login_name");
            loginStyle.display="none";
            logoutStyle.display="inline-block";
        }


        let visibility = "hide";

        if(this.props.menuVisibility){
            visibility = "show";
        }

        return(
            <div id="flyoutMenu" onDrag={this.props.handleMouseDown} className={visibility}>
                <HashRouter>
                    <div style={loginStyle}>
                        Email<input ref={ref=>this.emailE=ref} /><br/>
                        password<input type="password" ref={ref=>this.pwE=ref}/><br/>
                        <button onClick={this.login}>login</button>
                        <NavLink to='/contact'><button onClick={this.props.handleMouseDown}>sign in</button></NavLink>
                    </div>
                    <div style={logoutStyle}>
                        {login_name}님 환영
                        <button onClick={this.logout}>log out</button>
                    </div>
                    <h2><NavLink exact to="/" onClick={this.props.handleMouseDown}>Home</NavLink></h2>
                    <h2><a href="/">About</a></h2>
                    <h2><a href="/">Contact</a></h2>
                    <h2><a href="/">Search</a></h2>
                </HashRouter>
            </div>
        )
    }
}

export default Menu;
```

contact.jsx (회원가입)

```jsx
import React, {Component} from "react";
import axios from 'axios';

class Contact extends Component{
    state={
        name:''
    }
    memberInsert=()=>{
        const send_param={
            name:this.nameE.value,
            email:this.emailE_con.value,
            pw:this.pwE_con.value,
            comments:this.commentsE.value
        }
        axios.post('http://localhost:8080/member/insert',send_param)
        .then((returnData)=>{
            if(returnData.data.message){
                this.setState({
                    name:returnData.data.message
                })
            }else{
                alert("회원가입 실패");
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render(){
        if(this.state.name){
            return(
                <div>
                    <h2>{this.state.name}님 회원가입 되셨습니다</h2>
                </div>
            );
        }else{
            return(
                <div>
                    <h2>Contact</h2>
                    <p>sign in</p>
                    name     <input ref={ref=>this.nameE=ref}/><br/>
                    email    <input ref={ref=>this.emailE_con=ref}/><br/>
                    password<input ref={ref=>this.pwE_con=ref}/><br/>
                    comments<input ref={ref=>this.commentsE=ref}/><br/>
                    <button onClick={this.memberInsert}>sign</button>
                </div>
            );
        }
    }
}

export default Contact;
```

