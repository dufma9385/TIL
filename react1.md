# react

기존의 싱글페이지 앱은 페이지를 새로고침하거나 다른 페이지로  이동하지 않고도 동적으로 콘텐츠를 보여준다

## react의 특징

- UI상태의 자동 관리
  - 중요한건 UI의 마지막 상태!
- 번개같이 빠른 DOM 조작
  - 메모리에 가상 DOM을 만들어 적절한 시점에만 조작한다
- 조립하기 쉬운 UI를 지원하는 API
  - 비주얼요소를 하나의 큰 덩어리가 아니라 작은 여러 컴포넌트로 작게 분해해 다루기 권장
- 자바스크립트만으로 정의하는 비주얼
  - JSX라는 문법 활용
- MVC아키텍처에서의  'V'
  - 비주얼 요소와 그 상태를 최신으로 유지하는 데 중점을 두는 뷰 레이어에서 작동한다

## 첫 번째 리액트 앱

**최종 결과는 반드시 HTML, CSS, Javascript의 조합이어야 한다

또는 아래와 같은 방법으로 적용

1. 노드와 그 외 빌드 툴 등으로 구성된 개발 환경 구축
2. 런타임 시에 브라우저가 JSX를 직접 지정, 나머지는 브라우저가 처리





```react
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

    <style>
        #container{
            padding:50px;
            background-color: #EEE;
        }
        #container h3{
            font-size: 50px;
            font-family: sans-serif;
            color:#0080A8;
        }
    </style>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">

        function formatDistance(distance){
            return distance +" km";
        }
        function getDistance(speed, time){
            const result=speed*time;
            alert(formatDistance(result));
        }

        getDistance(10,5);
        getDistance(85,1.5);
        getDistance(12,9);
        getDistance(42,21);

        class HelloWorld extends React.Component{
            render(){//overriding
                return(
                    <p><i>{this.props.greeting} {this.props.b}</i></p>
                );

            }
        }
       
        const destination = document.querySelector("#container");
        ReactDOM.render(
            <div>
                <HelloWorld greeting="hello" b="min"/>
                <HelloWorld greeting="how" b="are you"/>
                <HelloWorld b="good"/>
                <HelloWorld b="thank you"/>
            </div>
            ,
            destination
        );
    </script>
</body>
</html>
```

리액트를 사용하기 위해서는 세줄의 cdn이 필요하다

```javascript
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



```react
class HelloWorld extends React.Component{
            render(){//overriding
                return(
                    <p><i>{this.props.a} {this.props.b}</i></p>
                );
            } //this.props로 부모 클래스에서 사용하는 변수..? 가져온다
        }
```

helloWorld 라는 클래스를 생성하고 ReactDOM.render내에서 커스텀태그로 사용할 수 있다.

```react
<HelloWorld a="hello" />
<HelloWorld b="world"/>	
```

ReactDOM.render에는 순서대로 태그,위치 값이 들어가고 컴마가 꼭 필요 또한 안에서 <div>로 묶여야 한다

```react
<div>
   <HelloWorld a="hello" />
   <HelloWorld b="world"/>
</div>
,
destination
```

