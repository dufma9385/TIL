# 리액트 스타일링

셀렉트 문법은 스타일을 적용하거나 건너뛸 엘리먼트를 유연하게 선택할 수 있게 해준다

----------> 선택자 = 태그이름, ID, 클래스명

태그 안에 클래스를 주려면 className="" 의 형태로 사용가능 (대소문자 구분)

## 리액트 방식의 스타일링

### 스타일 객체만들기 사용예

```react
class Label extends React.Component{
    render(){
        const labelStyle={
        	fontFamily:"sans-serif",
        	fontWeight: "bold",
        	padding :13,
        	margin: 0
    	}
    return(
       <p style={labelStyle}>{this.props.l}</p>
    );
  }
}
```

# 복잡한 컴포넌트 제작

색상과 이름이 각각 다르게 (카드컴포넌트)

```react
<body>
    <div id="container"></div>
    <script type="text/babel">

        class Square extends React.Component{
            render(){
                const squareStyle={
                    height:150,
                    backgroundColor:this.props.s
                }
                return(
                    <div style={squareStyle}>

                    </div>
                );
            }
        }

        class Label extends React.Component{
            render(){
                const labelStyle={
                    fontFamily:"sans-serif",
                    fontWeight: "bold",
                    padding :13,
                    margin: 0
                }
                return(
                    <p style={labelStyle}>{this.props.l}</p>
                );
            }
        }

        class Card extends React.Component{
            render(){
                const cardStyle={
                    height:200,
                    width:150,
                    padding:0,
                    backgroundColor: "#FFF",
                    boxShadow: "0px 0px 5px #666"
                }
                return(
                    <div style={cardStyle}>
                        <Square s={this.props.color}/>
                        <Label l={this.props.color}/>
                    </div>
                );
            }
        }
        

        ReactDOM.render(
            <div>
                <Card color="yellow"/>
                <Card color="pink"/>
            </div>,
            document.querySelector("#container")
        );
    </script>
</body>
```

문제점!!

```react
<body>
    <div id="container"></div>
    <script type="text/babel">

        class Display extends React.Component{
            render(){
                return(
                    <div>
                        <p> {this.props.color}</p>
                        <p> {this.props.num}</p>
                        <p> {this.props.size}</p>
                    </div>
                );
            }
        }

        class Label extends React.Component{
            render(){
                return(
                    <Display color={this.props.color} num={this.props.num} size={this.props.size} />
                );
            }
        }

        class Shirt extends React.Component{
            render(){
                return(
                    <div>
                        <Label color={this.props.color} num={this.props.num} size={this.props.size}/>
                    </div>
                );
            }
        }
        

        ReactDOM.render(
            <div>
                <Shirt color="steeblue" num="3.14" size="medium" />
            </div>,
            document.querySelector("#container")
        );
    </script>
</body>
```

but,  값을 표시할 때 r그 값들은 ReactDOM.render에서 정의 된다

​       --> 목적지를 향하는 경로에 있는 모든 컴포넌트 들이 각 속성에 접근하고 재정의 해 전달한다

===>> 스프레드 연산자로 해결 가능

```react
<Display color={this.props.color} num={this.props.num} size={this.props.size} />

==>> <Display {...this.props} />
```



## JSX : 인라인 css사용 불가

이러한 형식으로 사용 가능

```react
const cardStyle={
    height:200,
    width:150,
    padding:0,
    backgroundColor: "#FFF",
    boxShadow: "0px 0px 5px #666"
}
return(
    <div style={cardStyle}>
```

## 상태 다루기

```react
<body>
    <div id="container"></div>
    <script type="text/babel">
        class MyCounter extends React.Component{
            state={  
                counter: 0
            };
            

            timerTick=()=>{ 
                console.log("call timetick");
                this.setState({ 
                    counter: this.state.counter+100
                });
            }

            componentDidMount(){
                console.log("call componentDidM");
                setInterval(this.timerTick,1000);
            }

            render(){
                console.log("call render");
                return(
                    <h1>{this.state.counter}</h1>
                );
            }
        }

        ReactDOM.render(
            <MyCounter />,
            document.querySelector("#container")
        );
    </script>
</body
```

**1.뭔가를 처리하려면 무조건 state**

**2.state안의 값을 변경하려면 setState**

**3.state를 적용하고 싶으면 화살표 함수**

