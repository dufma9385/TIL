<tag이름 속성이름='값'> content </tag>

/----------   ----------------       ---------

  html()         attr()               text()         = 작업함수



# Node.js

#### node = 자바스크립트 런타임

##### ** 런타임 = 특정 언어로 만든 프로그램들을 실행할 수 있는 환경

- **이벤트 루프** : 이벤트 발생 시 호출 할 콜백 하수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정하는 역할을 담당. 노드가 종료될 때까지 이벤트 처리를 위한 작업을 반복하므로 루프라고 함

- **태스크 큐** : 이벤트 발생 후 호출되어야 할 콜백 함수들이 기다리는 공간, 콜백들이 이벤트 루프가 정한 순서대로 줄을 서있어 콜백 큐라고도 함

- **백그라운드** : 타이머나 I/O작업 콜백 또는 이벤트 리스너들이 대기하는 곳



```javascript
<script>
	function run(){
    	console.log('3초 후 실행');
    }
    console.log('start');
    setTimeout(run, 3000);
    console.log('end');
</script>
```

```javascript
시작
끝
3초 후 실행
```

console.log == 동기 함수

setTimeout == 비동기 함수



java는 싱글쓰레드지만 멀티쓰레드...?

node는 서버에서도 싱글쓰레드 = 어떻게 서버에서 동작을 할 수 있나?

servlet은 자체적으로 멀티 쓰레드이다



동기와 블로킹 유사, 비동기와 논블로키잉 유사



- 프로세스는 운영체제에서 할당하는 작업의 단위, 노드나 인터넷브라우저 같은 프로그램은 개별 프로세스

- 프로세스 간에는 메모리 등의 자원 공유하지 않는다

- 스레드는 프로세스 내에서 실행되는 흐름의 단위

- 하나의 프로세스는 스레드를 여러개 가질 수 있다

- 스레드들은 부모 프로세스의 자원 공유 => 같은 메모리에 접근할 수 있다.

##### 누가 이 일을 하게 할 것인가를 잘 정해야 한다.



var 전역변수

const let 지역변수, 블록스코프

const  :  초기화 시 값을 대입하지 않으면 에러발생 , 값을 대입하지 않으면 에러발생



##### 백틱사용 ` 하면 더하기 기호 없이 문자열사용 가능

```javascript
<script>

const num3=1;
const num4=2;
const result2=3;
const string2=`${num3} 더하기 ${num4}는 '${result2}'`;
console.log(string2);

</script>
```



##### 화살표함수 사용하여 변경가능

= 화살표 함수에서는 return문을 줄일 수 있다

= this를 사용한다

```typescript
<script>

var relationship1={
	name:'zero',
    friends:['nero','hero','xero'],
    logFriends: function(){
    	var that=this;
        this.friends.forEach(function(friend){
        	console.log(that.name, friend);
    	});
    },
};
relationship1.logFriends();

const relationship2={
	name:'zero',
    friends:['nero', 'hero', 'xero'],
    logFriends(){
    	this.friends.forEach(friend=>{
        	console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();

</script>
```

```
zero nero
zero hero
zero xero
zero nero
zero hero
zero xero

```

callback : 어떤 함수의 인자로 다른 함수가 들어가는 것(비동기 함수들)



await를 포함한 건 function이 async여야 한다.



##### callback여러개 사용

```js
console.log("시작");
function a(){
    setTimeout(function (){
        console.log("Hello");
        setTimeout(function (){
            console.log("world");
            console.log("끝");
        },1000);
    },2000);
}
a();
```

```
시작
Hello
world
끝
```

