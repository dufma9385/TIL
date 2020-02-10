클라이언트단에서 jsx가 전부 javascript로 변경한다

onClick 에서 실행 못해..?



## 입력하고 버튼눌러서 리스트로 저장 --> 출력 --> 클릭하면 삭제

cmd 창에서 원하는 위치에 폴더 생성 

> create-react-app todolist



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

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

ReactDOM.render(
    <TodoList />,
    document.querySelector("#container")
)
```

TodoList.jsx

```jsx
import React,{ Component } from "react";
import TodoItems from './TodoItems';

class TodoList extends Component{
    state={
        items:[]
    }

    deleteItem=(key)=>{
        const filteredItems=this.state.items.filter((item)=>{
            return item.key !==key
        });
        this.setState({items:filteredItems});
    }
    addItem=()=>{
        this.state.items.unshift({
            text:this._inputE.value,
            key:Date.now()
        });
        this.setState({
            items:this.state.items
        });
        this._inputE.value="";
        this._inputE.focus();
    }
    render(){
        return(
            <div>
                <div>
                    <input ref={ref=>this._inputE=ref}></input>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItems items={this.state.items}
                            superDelete={this.deleteItem}/>
            </div>
        );
    }
}

export default TodoList;
```

TodoItems.jsx

```jsx
import React, { Component } from 'react';

class TodoItems extends Component{

    subDelete=(key)=>{
        this.props.superDelete(key);
    }
    render(){
        const li_item=this.props.items.map((item)=>{
            return <li key={item.key}
                    onClick={()=>this.subDelete(item.key)}>
                        {item.text}
                    </li>
        })
        return(
            <ul>
                {li_item}
            </ul>
        );
    }
}

export default TodoItems;
```

