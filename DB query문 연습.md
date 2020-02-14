## DB query문 연습

```mysql
create database hotel;

show databases;

use hotel;

create table test1
(
	ID int,
    Name varchar(30),
    ReserveDate DATE,
    RoomNum int
);    

alter database hotel character set=utf8 collate=utf8_general_ci;

alter table test1 add phone INT;

alter table test1 drop phone;

alter table test1 modify column reserveDate varchar(20); 

desc test1;

use nodejs;

truncate table members;

use hotel;

drop table if exists reservation;

desc test1;

alter table test1 add name varchar(20);

desc test1;


INSERT INTO test1(id, Name, ReserveDate, RoomNum)VALUES(1, '홍길동', '2016-01-05', 2014);

insert into test1(id,name)value(6, '김유신');

use hotel;

update test1 set roomnum=2002 where name='홍길동';

use hotel;alter table test1 modify column reservedate datetime;

insert into test1 (reservedate) values ('2020-02-13 14:20:21');

alter table test1 add column checkin time;

insert into test1 (checkin) value ('01:23:45');

select * from test1;

alter table test1 add column thisyear YEAR;

insert INTO test1 (thisyear) values (2016);

select 504.7+13, 504.7*0.9, 504.7/2, 504.7 div 2, 504.7%2;

select 5 in (2,3,4,5);

select case 0 when 0 then 'zero' when 1 then 'one' else 'more' end;

select if(0<1, 'yes', 'no');

select ifnull(null, 'dddnull');

select * from test1 where name like '장_';

select * from test1 where name regexp '^홍|산$';
```



```mysql
alter table test1 add column nickname varchar(50) not null;
insert into test1 (name, nickname) value ('홍길동','번쩍');
alter table test1 add column age int not null;
insert into test1 (name, nickname, age) values ('전지현','존예',35);
alter table test1 modify column age int not null default 0;
insert into test1 (name, nickname) values ('전지현','존예');
alter table test1 add column email varchar(20) unique;
insert into test1 (name,nickname) values('김민경', '졸려');

alter table test1 add constraint aaa primary key(id);
alter table test1 add column c_id int not null auto_increment;
alter table test1 add constraint abc primary key(c_id);

alter table test1 drop c_id;
alter table test1 add c_id int not null;
```







SNS 데이터베이스 생성

userDB table 구성

```mysql
CREATE TABLE `sns`.`user` (
  `email` VARCHAR(50) NOT NULL,
  `nick` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `nick_UNIQUE` (`nick` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```

postDB table 구성

```mysql
CREATE TABLE `sns`.`post` (
  `post_no` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `content` VARCHAR(140) NULL,
  `img` VARCHAR(45) NULL,
  PRIMARY KEY (`post_no`));
```

user의 email을 post의 foeign key로 사용

```mysql
ALTER TABLE `sns`.`post` 
ADD INDEX `f1_idx` (`email` ASC);
;
ALTER TABLE `sns`.`post` 
ADD CONSTRAINT `f1`
  FOREIGN KEY (`email`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
```

hashtag DB table 구성



folloew Db table 구성

```mysql
CREATE TABLE `sns`.`follow` (
  `follower_id` VARCHAR(45) NOT NULL,
  `following_id` VARCHAR(45) NOT NULL);
```

 user의 email을 follower_id와 following_id의 email의  foreign로 사용

```mysql
ALTER TABLE `sns`.`follow` 
ADD INDEX `f2_idx` (`follower_id` ASC);
;
ALTER TABLE `sns`.`follow` 
ADD CONSTRAINT `f2`
  FOREIGN KEY (`follower_id`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

```

```mysql
ALTER TABLE `sns`.`follow` 
ADD INDEX `ff3_idx` (`following_id` ASC);
;
ALTER TABLE `sns`.`follow` 
ADD CONSTRAINT `ff3`
  FOREIGN KEY (`following_id`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
```

```mysql
ALTER TABLE `sns`.`posthashtag` 
ADD INDEX `f4_idx` (`post_no` ASC);
;
ALTER TABLE `sns`.`posthashtag` 
ADD CONSTRAINT `f4`
  FOREIGN KEY (`post_no`)
  REFERENCES `sns`.`post` (`post_no`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

```

