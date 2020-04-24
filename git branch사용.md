## < bash >

cd practice

mkdir homepage

cd homepage

code .

​	code에서 README.md, index.html 만든 후

git init

git add . 

git commit -m "memo"

git remote add origin "레포지토리 주소"

git push origin master



레포지토리 별 git url만들기

해당 레포지토리에서 settings

쭉 내려서 github pages 에서

source = master branch => 새로고침 되며 url 생성됨



브랜치 협업

mkdir collabo

git init

code . 에서 작업

git status

git add .

git commit -m "first commit"

git remote add origin 클론주소

git push origin master

git status

git checkout -b 브랜치선택 (해당브랜치로 이동)

git status

git add 수정된 파일 이름

git commit -m "memo"

git push origin 브랜치 이름

git pull origin master  ====> 틀림 안됌 현재 status가 나의 브랜치에 들어와 있는 상태다

​													상태확인을 항상 해야하고 master 상태에서 명령어를 입력해야한다

git log --oneline

git  branch -d mimkyeong 브랜치 날리기

git 



### Platform as a Service = HEROKU