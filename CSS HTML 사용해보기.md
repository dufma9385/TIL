## CSS HTML 사용해보기

http://localhost:8282/MyShop/NAME.HTML 로 들어가서 확인 할 수 있다

##### dropDownImage.html

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<style>
.dropdown{
	position:relative;
	display:inline-block;}
.dropdown-content{
	display:none;
	position:absolute;
	background-color:ghostwhite;}
#dropdown1:hover .dropdown-content{display:block;}
#dropdown2:hover .dropdown-content{display:block;}
.desc{padding:15px;text-align:center;}
</style>

</head>
<body>
	<h2>dorpdown Image</h2>
	<div class="dropdown" id="dropdown1">
		<img src="./image/image1.png" class="image1" alt="인왕산"width="100"height="60">
		<div class="dropdown-content">
			<img src="./image/image1.jpg" alt="인왕산길"width="300"height="200">
			<div class="desc">아름다운 인왕산 길</div>
		</div>
	</div>
	
	<div class="dropdown" id="dropdown2">
		<img src="./image/image2.png" class="image1" alt="남한산성" width="100" height="60">
		<div class="dropdown-content">
			<img src="./image/image2.jpg" alt="아! 남한산성"width="300"height="200">
			<div class="desc">아! 남한산성</div>
		</div>
	</div>
	
</body>
</html>
```

##### floatTest.html

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
#b1{background: gray;}
#box{
	background: skyblue;
	border:2px solid black;
	width:100px;
	height:60px;
	margin:10px;}
#b2{
	background: orange;
	border:1px dashed black;}
.float-left {float:left;}
</style>
</head>
<body>
	<div id="b1">first box</div>
	<div id="box" class="float-left">box</div>
	<div id="b2">last box</div>
</body>
</html>
```

##### floatImageTest.html

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
img{
margin:10px 10px;
float:right;}
</style>
</head>
<body>
	in this example, the image will float to the right in the paragraph, and the tsxt in the paragraph will wrap around the image.
	
	<p><img src="./image/image1.jpg"width="150" height="150">남한산성(南漢山城)은 대한민국 경기도 광주시, 성남시, 하남시에 걸쳐 있는 남한산을 중심으로 하는 산성이다. 병자호란 때 조선의 16대 왕 인조가 청나라에 대항한 곳으로 잘 알려져 있으며, 1950년대에 이승만 대통령에 의해 공원화된 후 현재 도립공원으로 지정되어 많은 시민들이 찾는 장소가 되었다. 병자호란 당시 인조는 이곳에서 40여일간 항전하였으나 결국 성문을 열고 항복한 곳으로 유명하다.

남한산성의 역사는 삼국 시대까지 거슬러 올라간다. 한때 백제의 수도 하남위례성으로 추정되기도 했던 남한산성은 백제의 시조 온조왕이 세운 성으로 알려졌으나, 신라 시대에 쌓은 주장성이라는 설도 있다. 조선 시대에 인조와 숙종 때에 각종 시설물을 세우고 성을 증축하여 오늘날의 형태를 갖추게 되었다. 그러나 일제 강점기 직전인 1907년에 일본군에 의해 다수의 건물이 훼손되기도 하였다.

1963년 1월 21일 남한산성의 성벽이 국가 사적 제57호로 지정되었고, 1971년 3월 17일 남한산성은 경기도립공원으로 지정되어(제158호), 5년 후인 1976년 7월 1일 관리사무소가 개소되었다. 1999년에는 남한산성 역사관이 개장하고, 2014년에는 세계문화유산에 등재되면서[1] 현재에 이른다. 오늘날 남한산성은 주변 시민들에게 훌륭한 휴식처이자, 건강을 위한 등산 산책 코스로도 인기를 얻고 있다.[2]

2016년 11월 9일 남한산성의 문화재 관리기관이 종전 (재)경기문화재단에서 경기도지사로 변경되었다.</p>
</body>
</html>
```

##### floatLayout.html

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<style>
.box{
	background:gray;
	color:white;}
.floating{
	background:lightgray;
	margin:2px;
	float:left;}
body{height:400px;}
#b1{height:20%}
#b2{height:65%}
#f1{width:15%;height:100%;}
#f2{width:50%;height:100%;}
#f3{width:33%;height:100%;}
#b3{height:10%; clear:left;}
</style>

</head>
<body>

<div class="box" id="b1">header box</div>
<div id="b2">
	<div class="floating" id="f1">menu box</div>
	<div class="floating" id="f2">content box</div>
	<div class="floating" id="f3">banner box</div>
</div>
<div class="box" id="b3">footer box</div>

</body>
</html>
```



* border-radius:50%; => 모서리를 동그랗게