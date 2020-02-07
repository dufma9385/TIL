div필드 안에 입력한 수만큼 볼이 생기고

그 볼을 클릭하면 그 자리에 멈추고 색상 변경한다

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
        class MyBall extends React.Component{

            aaa;

            state={
                ball_top:Math.random()*500,
                ball_left:Math.random()*500,
                ball_bgColor:"yellow"
                
            }
            
            catchMe=()=>{
                this.setState({ //state의 상태바꿔주기
                    ball_bgColor:"red"
                });
                clearInterval(this.aaa);
            }

            componentDidMount(){
                this.aaa=setInterval(this.changeBallPosition, 1000);
            }

            changeBallPosition=()=>{
                this.setState({
                    ball_top:Math.random()*500,
                    ball_left:Math.random()*500
                });
            }
            render(){
                const h3Style={
                    backgroundColor:this.state.ball_bgColor,
                    width:100,
                    height:100,
                    borderRadius:50,
                    textAlign:"center",
                    position:"fixed",
                    top:this.state.ball_top,
                    left:this.state.ball_left
                    //공의 생성위치 랜덤으로 받는다
                }
                return(
                    <h3 onClick={this.catchMe} style={h3Style}>잡아봐</h3>
                );
            }
        }
        class MyGamePanel extends React.Component{
                        
            state={
                ball_arr:[],
                //score:0
            }
            setBallNum=(e)=>{
                let arr=[];
                const no = this.input_num.value
                for(let i=0;i<no; i++){
                    let a=<div key={i}><MyBall /></div>;
                    arr.push(a);
                }

                this.setState({
                    ball_arr:arr
                });
                //숫자를 입력하고 go를 눌러도 색이 변했다 다시 돌아온다
                //=> form의 속성 변경후 리프레시 시키기 때문
                this.input_num.focus();
                this.input_num.value=""; 
                //입력창 비우기
                e.preventDefault();
            }
            render(){
                const divStyle={
                    backgroundColor:"gray",
                    width:600,
                    height:600,
                }
               
                return(
                    <div>
                        <div>
                            <form onSubmit={this.setBallNum}>
                            <input ref={ref=>this.input_num=ref}/>
                                <!--a = ref=>this.kmk=ref;
                                  값과 내용이 한줄이면 소괄호와 블럭 생략가능
            					  react에서는 id가 ref이다 -->
                            <button type="submit">go</button> 
                            </form>
                        </div>
                        <div style={divStyle}>
                            {this.state.ball_arr}
                        </div>
                        
                    </div>
                );
            }
        }

        ReactDOM.render(
            <MyGamePanel />,
            document.querySelector('#container')
        )
    </script>
</body>
</html>
```

다음엔 공을 잡을때마다 점수도 증가하게 해보자