## Sliding Menu

메뉴버튼누르면 슬라이드로 왼쪽에서  메뉴바 나타난다! 

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="container"></div>
</body>
</html>
```

index.jsx

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";

import MenuContainer from './MenuContainer';

ReactDOM.render(
    <MenuContainer/>,
    document.querySelector('#container')
);
```

MenuContainer.jsx

```js
import React, {Component} from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import Home from './Home';
import Stuff from './Stuff';
import Contact from './Contact';
import {Route,NavLink,HashRouter} from 'react-router-dom';

class MenuContainer extends Component{
    
    constructor(props){
        super(props);

        this.state={
            visible:false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseDown(e){
        this.toggleMenu();

        console.log("clicked");
        e.stopPropagation();
    }

    toggleMenu(){
        this.setState({
            visible: !this.state.visible
        });
    }

    render(){
        return(
            <div>
                <MenuButton handleMouseDown={this.handleMouseDown}/>
                <Menu handleMouseDown={this.handleMouseDown}
                        menuVisibility={this.state.visible}/>
                <HashRouter>
                    <div>
                        <h1>simple SPA</h1>
                        <ul className="header">
                            <li><NavLink exact to='/'>Home</NavLink></li>
                            <li><NavLink to='/stuff'>Stuff</NavLink></li>
                            <li><NavLink to='/contact'>Contact</NavLink></li>
                        </ul>
                        <div className="content">
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/stuff" component={Stuff}></Route>
                            <Route path="/contact" component={Contact}></Route>
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default MenuContainer;
```

MenuButton.jsx

```js
import React, {Component} from "react";
import './css/MenuButton.css';

class MenuButton extends Component{
    render(){
        return(
            <button id="roundButton" onMouseDown={this.props.handleMouseDown}></button>
        );
    }
}
export default MenuButton;
```

Menu.jsx

```jsx
import React, {Component} from "react";
import "./css/Menu.css";
import $ from 'jquery';

class Menu extends Component{
    state={
        loginStyle:"inline-block",
        logoutStyle:"none"
    }
    logout=()=>{
        $.get('http://localhost:8080/member/logout',(returnData)=>{
            if(returnData.message){
                this.setState({
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
                this.setState({
                    loginStyle:"none",
                    logoutStyle:"inline-block"
                })
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
            display:this.state.logoutStyle
        }

        var visibility = "hide";

        if(this.props.menuVisibility){
            visibility = "show";
        }

        return(
            <div id="flyoutMenu" onDrag={this.props.handleMouseDown} className={visibility}>
                <div style={loginStyle}>
                    Email<input ref={ref=>this.emailE=ref} /><br/>
                    password<input type="password" ref={ref=>this.pwE=ref}/><br/>
                    <button onClick={this.login}>login</button>
                    <button>join</button>
                </div>
                <div style={logoutStyle}>
                    <button onClick={this.logout}>log out</button>
                </div>
                <h2><a href="/">Home</a></h2>
                <h2><a href="/">About</a></h2>
                <h2><a href="/">Contact</a></h2>
                <h2><a href="/">Search</a></h2>
            </div>
        )
    }
}

export default Menu;
```

Home.jsx

```js
import React, {Component} from "react";

class Home extends Component{
    render(){
        return(
            <div>
                <h2>Home</h2>
                <p>Home.......</p>
            </div>
        );
    }
}

export default Home;
```

Stuff.jsx

```js
import React, {Component} from "react";

class Stuff extends Component{
    render(){
        return(
            <div>
                <h2>Stuff</h2>
                <p>Stuff .......</p>
            </div>
        );
    }
}

export default Stuff;
```

Contact.jsx

```js
import React, {Component} from "react";

class Contact extends Component{
    render(){
        return(
            <div>
                <h2>Contact</h2>
                <p>sign in</p>
                name     <input/><br/>
                email    <input/><br/>
                password<input/><br/>
                comments<input/><br/>
                <button onClick={this.gohome}>sign</button>
            </div>
        );
    }
}

export default Contact;
```



<hr>

#### CSS

index.css

```css
body{
    background-color: lightseagreen;
    font-family: sans-serif;
    font-size: 20px;
    padding: 20px;
    margin: 0;
    overflow: auto;
}

#container li {
    margin-bottom: 10px;
}

h1,h2,p,ul,li{
    font-family: sans-serif;
}

ul.header li{
    display:inline;
    list-style-type: none;
    margin: 0;
}

ul.header{
    background-color: #111;
    padding: 0;
}

ul.header li a{
    color: #FFF;
    font-weight: bold;
    text-decoration: none;
    padding: 20px;
    display: inline-block;
}

.content{
    background-color: #FFF;
    padding: 20px;
}

.content h2{
    padding: 0;
    margin: 0;
}

.content li{
    margin-bottom: 10px;
}

.active{
    background-color: #0099FF;
}
```

Menu.css

```css
#flyoutMenu{
    width:30vw;
    height: 100vh;
    background-color: gray;
    position: fixed;
    top: 0;
    left: 0;
    transition: transform .3s cubic-bezier(0, .52, 0, 1);
    overflow: scroll;
    z-index: 1000;
}
#flyoutMenu.hide{
    transform: translate3d(-100vw, 0, 0);
}

#flyoutMenu.show{
    transform: translate3d(0vw, 0, 0);
    overflow: hidden;
}

#flyoutMenu h2 a{
    color: #333;
    margin-left: 15px;
    text-decoration: none;
}

#flyoutMenu h2 a:hover{
    text-decoration: underline;
}
```

MenuButton.css

```css
#roundButton{
    background-color: #96D9FF;
    margin-bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 10px solid #0065A6;
    outline: none;
    transition: all .2s cubic-bezier(0, 1.26, .8, 1.28);
}
#roundButton:hover{
    background-color: #96D9FF;
    cursor: pointer;
    border-color: #003557;
    transform: scale(1.2, 1.2);
}
#roundButton:active{
    border-color: #003557;
    background-color: #FFF;
}
```

