---
title: "Boss Of The SOC v1"
description: "cyberdefenders、Splunk测试数据集Boss Of The SOC v1"
image: "@assets/blog/blog_post.jpg"
publishDate: "2026-04-23"
tags: ["cyberdefenders", "Boss Of The SOC v1", "splunk"]
---


### 一、题目介绍&环境
 SHA1SUM	89719952101ffdf7ee577aaed9a5f6c98934b812

 Published	Aug. 3, 2020

 Author		Splunk Team

 Size			1.9 GiB



 Instructions	

Virtualbox: unzip the VM (pass: cyberdefenders.org), start VM, and access Splunk from host machine via [http://127.0.0.1:8000](http://127.0.0.1:8000)

VMware: login to the VM using vagrant/vagrant and grab the IP address of the VM using "IP address" command. Access Splunk from the host machine using the IP address assigned to the VM via [http://x.x.x.x:8000](http://x.x.x.x:8000) 

Challenge Files:

bots1.ova (Memory: 4 GB, CPU: 2 Cores, Disk: 5.5 GB)



直接下载ova后导入vmware，账号密码vagrant/vagrant，然后查看虚拟机IP，然后访问http://ip:8000



### 二、解题(网络部分解题步骤，勒索部分待更新)
首先看一下有哪些index，`<font style="color:rgb(77, 77, 76);">* | stats count by index</font>`<font style="color:rgb(77, 77, 76);">，发现只有botsv1一个index</font>

<!-- 这是一张图片，ocr 内容为：所有时间 STATS COUNT BY INDEX 智能模式 SAMPLING 100 任务 9,690 个事件(16/08/10 3:28:51.000至23/02/06 1:56:52.000) 统计信息(1) 事件 模式 可视化 预览 每页20个 /格式 INDEX COUNT 9690 BOTSV1 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675649098676-2a574fc1-5f66-49b1-a7b1-2e6b3c27a799.png)



筛选source，

```sql
* index=botsv1
| stats count by source 
| sort -count 
| head 10
```

<!-- 这是一张图片，ocr 内容为：另存为 关闭 新搜索 所有时间 INDEXBOTSV1 21 STATS COUNT BY SOURCE 3 L SORT-COUNT 4 HEAD 10 /9.525 个事件(16/08/10 3:28:51.000至23/02/06 22:39.000) 智能模式 SAMPLING 1:100 任务 统计信息(10) 事件模式 可视化 每项20个 /格式 预览 SOURCE COUNT 2670 WINEVENTLOG:MICROSOFT-WINDOWS-SYSMON/OPERATIONAL 1562 STREAM:SMB 1265 /VAR/LOG/SURICATA/EVE.JSON WINEVENTLOG:SECURITY 867 842 UDP:514 WINREGISTRY 769 580 STREAM:IP 254 STREAM:TCP 241 STREAM:HTTP C:\INETPUB\LOGS\LOGFILES\W3SVC1\U_EX160810.10G 220 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675650191065-9bee817a-109a-4c5c-8c33-6b5542e02cd5.png)







#### 1、This is a simple question to get you familiar with submitting answers. What is the name of the company that makes the software that you are using for this competition? Just a six-letter word with no punctuation.
答：splunk





#### 2、What is the likely IP address of someone from the Po1s0n1vy group scanning imreallynotbatman.com for web application vulnerabilities?
来自 Po1s0n1vy 组的某个人扫描 imreallynotbatman.com 以查找 Web 应用程序漏洞的可能 IP 地址是什么？



答：这里既然是扫描，肯定会存在多条相同源目主机的日志，可以使用查询条件：

`index="botsv1" sourcetype=stream:http | stats count by src_ip, dest_ip | sort -count`查看IP排序，如下图所示：

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 INDEX-BOTSVI- SOURCETYPE-STREAM:HTTP I STATS COUNT BY SRC_IP, DEST-IP / SORT -COUNT 所有时间 264个事件(23/02/05 13:59:16.000之前) 智能模式 任务 之前)SAMPLING 1:100 事件 可视化 横式 统计信息(7) 每页20个 格式 预览 SRC_IP DEST IP COUNT 192.168.250.70 40.80.148.42 236 12 192.168.250.70 23.22.63.114 192.168.250.41 192.168.2.50 192.168.250.20 192.168.2.50 192.168.250.40 192.168.2.50 192.168.2.50 192.168.250.70 192.168.250.100 199.117.103.170 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675606351850-2c0b010b-bc64-440d-a7b2-54b59c3772ed.png)

可以看到源IP为40.80.148.42的日志较多，再查询该IP的日志，发现确实是AWVS扫描器：

<!-- 这是一张图片，ocr 内容为：时间 事件 [[-] 16/08/10 22:21:47.749 ACK_PACKETS_IN:0 ACK PACKETS_OUT:1 BYTES:1391 BYTES_IN:811 BYTES_OUT:580 C_IP:40.80.148.42 CACHED: 0 CAPTURE_HOSTNAME:DEMO-01 CLIENT_RTT:0 CLIENT_RTT_PACKETS:0 CLIENT_RTT_SUM:0 COOKIE: AE72C62A4936B238523950A4F26F67D0-V7IKB3M59ROMOKQMBIET3VPHV3 CS_CONTENT_LENGTH:263 CS_CONTENT_TYPE: TEXT/HTML; CHARSET-UTF-8 CS DATE: WED, 10 AUG 2016 22:21:47 GMT CS_VERSION:[+] DATA_CENTER_TIME:0 DATA_PACKETS_IN:1 DATA_PACKETS_OUT:1 DEST HEADERS: POST /JOOMLA/INDEX.PHP/COMPONENT/SEARCH/ HTTP/1.1 CONTENT-LENGTH:119 CONTENT-TYPE: APPLICATION/X-WWW-FORM-URLENCODED X-REQUESTED-WITH:XMLHTTPREQUEST REFERER:HTTP://IMREALLYNOTBATMAN.COM:80/ COOKIE: AE72C62A4936B238523950A4F26F67DO-V7IKB3M59ROMOKQMBIET3VPHV3 HOST:IMREALLYNOTBATMAN.COM CONNECTION:KEEP-ALIVE ACCEPT-ENCODING:GZIP.DEFLATE USER-AEENT: NOZILLA/5.8 (WINDONS NT 6.1; WOM64) AOULERETXIT/53),21 (XHINDO)  CHRONE/A1.8,228, SAFARI ACUNETIX-PRODUCT: WVS/10.0 (ACUNETIX WEB VULNERABILITY SCANNER - FREE EDITION) ACUNETIX-SCANNING-AGREEMENT: THIRD PARTY SCANNING PROHIBITED ACUNETIX-USER-AGREEMENT:HTTP://WWW.ACUNETIX.COM/WVS/DISC.HTM ACCEPT:*/* -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675606471204-695867a9-ef79-4209-8750-5a57b74c09d8.png)

或者直接按源IP次数排序：

```plain
index=botsv1 sourcetype=stream:http 
| stats count by src_ip 
| sort -count
```

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX BOTSV1 SOURCETYPE STREAM:HTTP 2 L STATS COUNT BY SRC_IP 3 SORTCOUNT 智能模式 249个事件(16/08/10 31.000至23/000至23/06 2:25:57.000) 任务 止 SAMPLING 100 统计信息(4) 模式 事件 可视化 每页20个 预览 /格式 SRC_IP COUNT 227 40.80.148.42 10 23.22.63.114 192.168.2.50 192.168.250.100 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675650381522-69668858-38d8-4e4b-ac55-d8aab4de379f.png)

再看一下目的IP的次数排序，确定服务器IP为：192.168.250.70

```sql
index=botsv1 sourcetype=stream:http src_ip="40.80.148.42" 
| stats count by dest_ip 
| sort -count
```

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX-BOTSV1 SOURCETYPESTREAM:HTTP SRC_IP"40.80.80.148.42" 2 2 I STATS COUNT BY DEST_IP 3 SORT COUNT 智能模式 任务 / 202 个事件(16/08/10 3:28:51.000至23/02/06 2.27:52.000)  SAMPLING1:100 统计信息(1) 模式 可视化 事件 每页20个 预览 格式 DEST_IP COUNT 202 192.168.250.70 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675650487158-35331f95-8478-49e5-bf65-4bd1d8e3553e.png)



#### 3、What company created the web vulnerability scanner used by Po1s0n1vy? Type the company name. (For example, "Microsoft" or "Oracle")
答：acunetix



#### 4、What content management system is imreallynotbatman.com likely using? (Please do not include punctuation such as . , ! ? in your answer. We are looking for alpha characters only.)
查看服务器使用的CMS，这里可以根据URL结构进行确定：

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http src_ip="40.80.148.42"
| stats count by uri 
| sort -count 
| head 10
```

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX-BOTSYL IMREALLYNOTBATMAN.COM SOURCETYPE-STREAM:HTTP SRC-IP:"40.80.148.42" 2 COUNT BY URI STATS 34 SORT COUNT 10 HEAD 智能模式 239个事件(16/08/103:28:51.000至23/02/06 2:31:48.000) 任务 SAMPLING 100 不 统计信息(10) 可视化 事件 模式 每页20个 预览 格式 URI COUNT INDEX.PHP/COMPONENT/SEARCH/ (JOOMLA 163 /JOOMLA/.NDEX.PHP /.HTACCESS~ /?-D ALLOW_URL_INCLUDE%3D1 -D AUTO_PREPEND_FILE%3DPHP://INPUT /READ_ME.TXT /ZAK5LBGAGF.STM /AUTH /BUILD /CS-WHOIS -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675650731036-579a70d9-d851-42fb-b0ba-252201156fb6.png)

答：joomla





#### 9、What IP address is likely attempting a brute force password attack against imreallynotbatman.com?
什么 IP 地址可能试图对 imreallynotbatman.com 进行暴力密码攻击？

爆破的话，如果攻击者未对源IP进行代理池设置，则会存在同一个源IP出现较多http请求，所以直接查询目的IP为网站服务器，源IP的排序

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX"BOTSV1" SOURCETYPE"STREAM:HTTP" S COUNT BY SRC_IP 2 STATS 3 COUNT SORT 任务. 智能模式 23,936个事件(16/08/103:28:51.000至23/02/062:48:000)无事件采样~ 统计信息(5) 模式 可视化 事件 每页20个? 预览 格式 SRC_IP COUNT 20997 40.80.148.42 23.22.63.114 1430 818 192.168.2.50 265 192.168.250.100 192.168.250.70 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675651722322-00c80724-4acf-4786-955e-1b63fe321a66.png)

确定了两个请求较多的外网IP，一个是之前的扫描器IP 40.80.148.42，一个是23.22.63.114。首先查看扫描器IP的http请求的类型排序：

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http src_ip="40.80.148.42" 
| stats count by http_method 
| sort -count
```

<!-- 这是一张图片，ocr 内容为：新搜索 关闭 另存为 所有时间 INDEX-BOTSYL IMREALLYNOTBATMAN.COM SOURCETYPE-STREAM:HTTP SRC-IP二"40.80.148.42" 2 L STATS COUNT BY HTTP_METHOD 3 SORT-COUNT 智能模式 无事件采样 任务 /20,932个事件(16/08/10 3:28:51.000至23/02/06 2:50:32.000) 模式 事件 统计信息(6) 可视化 每页20个 格式 预览 HTTP_METHOD COUNT POST 15146 GET 5766 OPTIONS CONNECT PROPFIND TRACE -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675651854909-427a673c-7e62-476b-ac3e-a3e2bb60033d.png)

然后筛选出登录相关请求格式，这里就是dest_content，在其中查找username字段，显示查询出的前十条，这里就找到了登陆表单，在其中找到了登陆表单里的username和passwd字段：

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http src_ip="40.80.148.42" http_method="POST" username
| table dest_content 
| head 10


或者：
index=botsv1 imreallynotbatman.com sourcetype="stream:http" src_ip="23.22.63.114" dest_ip="192.168.250.70" http_method="POST" username passwd 
| top limit=20 form_data
```

<!-- 这是一张图片，ocr 内容为：<FIELDSET CLASS-"LOGINFORM"> <DIV CLASS "CONTROL-GROUP"> <DIV CLASS"CONTROLS"> <DIV CLASS-"INPUT-PREPEND INPUT-APPEND"> <SPAN CLASS"ADD-ON"> <SPAN CLASS-"ICON-USER HASTOOLTIP" TITLE-"USERNAME"></SPAN> <LABEL FOR-"MOD-LOGIN-USERNAME" CLASS-"ELEMENT-INVISIBLE"> </1ABEL> USERNAME </SPAN> ZINPUT NAME-"USERNAME" TABINDEX-"1" ID-"MOD-LOGIN-USERNAME" TYPE-"TEXT" CLASS"INPUT-MEDIUM" ME" SIZE-"15" AUTOFOCUS-"TRUE" /> PLACEHOLDER"USERNAME" CLASS"BTN WI HREF三"HTTP://IMREALLYNOTBATMAN.COM/ 10OMLA/INDEX.PHP7OPTION-COM-USERS&VIEWERS&VIEWIND" <A HR HASTOOLTIP" TITLE-"FORGOT YOUR USERNAME?"> <SPAN CLASS"ICON-HELP"></SPAN> </A> </DIV> </DIV> </DIV> <DIV CLASS-"CONTROL-GROUP">  <DIV CLASS-"CONTROLS"> <DIV CLASS-"INPUT-PREPEND INPUT-APPEND"> <SPAN CLASS"ADD-ON"> <SPAN CLASS-"ICON-LOCK HASTOOLTIP" TITLE-"PASSWORD"></SPAN> <LABEL FOR:"MOD-LOGIN-PASSWORD" CLASS-"ELEMENT-INVISIBLE"> </1ABEL> PASSWORD /SPAN> <INPUT NAME-"PASSWD" TABINDEX-"2" ID-"MOD-LOGIN-PASSWORD" -"PASSWORD" CLASS"INPUT-MEDIUM" YPE"PAS PLACEHOLDER:"PASSWORD" SIZE:"15"/> I HREFS"HTTP://IMREALLYNOTBATMAN.COM//FOOMLA/INDEX.PHP7OPTIONECON-USERSBVIEWERESET" CLASS"BTO WID HASTOOLTIP" TITLE-"FORGOT YOUR PASSWORD?"> -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675652365194-c3879e9f-0d59-445e-965a-d745eace2141.png)

既然找到了登陆表单和登陆字段，如果是爆破，则会多次访问这个登陆表单，所以直接查询访问该登录表单的源IP次数，发现爆破IP 23.22.63.114：

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http http_method="POST" form_data=*username*passwd* 
| stats count by src_ip
```

<!-- 这是一张图片，ocr 内容为：另存为 关闭 新搜索 所有时间 INDEX-BOTSYT IOREALLYNOTBATMAN.COM SOURCETYPERPASSTREAMINTTP HTTP-NETHODETHODE DATA-RUSERNANERPASSUD* 2 I STATS COUNT BY SRC_IP 智能模式 无事件采样 413个事件(16/08/10 31.000至23/000至23/063:01:31.000) 任务 统计信息(2) 可视化 事件 模式 每页20个 预览 /格式 SRC IP COUNT 412 23.22.63.114 40.80.148.42 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675652512385-59c7a7d6-d5cf-43bc-9141-1692c01bb1c2.png)



#### 15、What was the first brute force password used?
使用的第一个暴力破解密码是什么？

答：12345678

1）第一种思路，攻击中尝试输入的第一个密码是什么，那就是正则提取出用户名密码，根据时间排序：

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http http_method="POST" form_data=*username*passwd* 
| rex field=form_data "username=(?<u>\w+)" 
| rex field=form_data "passwd=(?<p>\w+)" 
| table _time, u, p 
| sort by _time
| head 5
```

<!-- 这是一张图片，ocr 内容为：新搜索 关闭 另存为 所有时间 INDEX-BOTSY1 INREALLYNOTBATMAN.COM SOURCETYPERSTREAMININTS REX FIELD-FORM_DATA "USERNAME(?<U>\W+)" L REX FI FIELD-FORM_DATA "PASSWD-(?<P>\W+)" REX TABLE TIME, U,P 5 TIME SOR YG 6 5 HEAD 无事件采样 智能模式 任务 413个事件(16/08/103:28:51.000至23/02/06 3:03:49.000) 事件 统计信息(5) 可视化 模式 每页20个 格式 预览 U TIME 12345678 2016/08/10 21:45:21.226 ADMIN LETMEIN 2016/08/10 21:45:21.241 ADMIN 2016/08/10 21:45:21.247 ADMIN QWERTY 1234 2016/08/10 21:45:21.250 ADMIN 123456 2016/08/10 21:45:21.260 ADMIN -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675652653511-ea292566-9aca-402d-b654-90b8fd98b5ca.png)

2）第二种，使用tail命令（函数）：

```sql
index=botsv1 imreallynotbatman.com sourcetype="stream:http" src_ip="23.22.63.114" dest_ip="192.168.250.70" http_method="POST" username passwd 
| tail 1
```

#### 17、What was the correct password for admin access to the content management system running imreallynotbatman.com?
<font style="color:rgb(33, 33, 33);">管理员访问运行imreallynotbatman.com的CMS的正确密码是什么？</font>

<font style="color:rgb(33, 33, 33);">一般错误密码都只输入尝试一次，所以直接筛选在登录请求中出现多次的密码即可(一般为2次)。</font>

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http http_method="POST" form_data=*username*passwd* 
| rex field=form_data "passwd=(?<p>\w+)" 
| stats count by p 
| sort -count
| table p,count
| head 10
```

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 ANDEXABOTSY1 INREALLYNOTBATMAN,CON SOURCETYPERSTREANIHTTP HTTP HTEP-NETHODE'RORM,DATARTUSERNANEAPASSU 2  | REX FIELD-FORM_DATA "PASSWD-(?<P>\W+)" 3 L STATS COUNT BY P 4 L SORT-COUNT 5 L TABLE P,COUNT 6 I HEAD 10 413个事件(16/08/103:28:51.000至23/02/063:09:00.000) 无事件采样 智能模式 任务 可视化 事件 统计信息(10) 模式 每页20个 格式 预览 P COUNT BATMAN 000000 1111 111111 11111111 1 112233 1212 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675652961336-d89fe331-d392-4064-b594-d494c57238ee.png)



或者直接用where：

```sql
index=botsv1 imreallynotbatman.com sourcetype="stream:http" dest_ip="192.168.250.70" http_method="POST" username passwd 
| rex field=form_data "passwd=(?<passwd>\w+)" 
| stats count by passwd
| where count>1
```

#### 18、What was the average password length used in the password brute forcing attempt rounded to closest whole integer?
<font style="color:rgb(33, 33, 33);">密码暴力破解尝试中使用的平均密码长度是多少？四舍五入到最接近的整数.</font>

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http http_method="POST" form_data=*username*passwd* 
| rex field=form_data "passwd=(?<p>\w+)" 
| eval pl=len(p) 
| stats avg(pl) as av
| eval avg_count=round(av,0) 
| table avg_count
```



#### 19、How many seconds elapsed between the time the brute force password scan identified the correct password and the compromised login rounded to 2 decimal places?
从爆破出正确密码到开始扫描(扫描器配置正确密码)中间间隔多少秒，两位小数。

答：92.17

```sql
index=botsv1 sourcetype=stream:http form_data=*username*passwd* | rex field=form_data "passwd=(?<p>\w+)" 
| search p="batman" 
| transaction p
| eval dur=round(duration,2)
| table dur
```

<!-- 这是一张图片，ocr 内容为：新搜索 INDEXFBOTSYL SOURCETYPERSTREAMINTTP FORM(DATAFAFAFAUSERNANERPASSWD# | REX FIELDFFORM-DASSUD~￥￥P>\WT)" SEARCHP"BATMAN" 2 TRANSACTION P 3 EVAL DURROUND(DURATION,2) 4 5 TABLE DUR 1个事件(16/08/103:28:51.000至23/063:16:10.000)无事件采样 事件 统计信息(1) 模式 可视化 每页20个 预览 格式 DUR 92.17 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675653394655-1e28e1dc-5273-4791-a8b9-2aeb9bd1965c.png)



注：

Transaction是一个事件组，其中内容是在一定时间范围内一组概念关联的事件





#### 20、How many unique passwords were attempted in the brute force attempt?
<font style="color:rgb(33, 33, 33);">暴力破解中尝试了多少个不同的密码？</font>

<font style="color:rgb(33, 33, 33);">答：412</font>

```sql
index=botsv1 imreallynotbatman.com sourcetype=stream:http http_method="POST" form_data=*username*passwd* 
| rex field=form_data "passwd=(?<p>\w+)" 
| dedup p 
| stats count
```



注：dedup  删除指定字段中的相同值



#### 21、What was the most likely IP address of we8105desk in 24AUG2016?
首先查看sourcetype:

```sql
index=botsv1 we8105desk
| stats count by sourcetype
| sort -count
```

<!-- 这是一张图片，ocr 内容为：关闭 新搜索 另存为 所有时间 INDEX BOTSV1 WE8105DESK 2 STATS COUNT BY SOURCETYPE 3 SORT-COUNT 无事件采样 智能模式 任务 181,012个事件(16/08/10 3:28:51.000至23/02/06 5:45:01.000) 下 模式 事件 统计信息(8) 可视化 每页20个 格式 预览 COUNT/ SOURCETYPE # XMLWINEVENTLOG:MICROSOFT-WINDOUS-SYSMON/OPERATIONAL 130354 49006 WINEVENTLOG 1529 STREAM:SMB 74 STREAM:LDAP 24 NESSUS:SCAN 20 STREAM:DNS SURICATA -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675662341455-686be092-26da-44ca-a04f-4f731188d350.png)

然后统计IP：

```sql
index=botsv1 we8105desk sourcetype="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational"
| stats count by src_ip
| sort -count
```

<!-- 这是一张图片，ocr 内容为：关闭 新搜索 另存为? INDEX-BOTSVL WE8105DESK SOURCETYPES"XMLVINEVENTLOG:HICROSOFT-WINDONS-SYSMON/OPERATIONATIONAL" 所有时间 STATS COUNT BY SRC.IP 智能模式 无事件采样 任务111 130,354 个事件(16/08/10 31.000至23/02/02/06 5:46:44.000) 下 事件 可视化 模式 统计信息(9) 每页20个" /格式 预览 SRC_IP COUNT 192.168.250.100 53106 104 127.0.0.1 70 192.168.250.255 0.0.0.0 224.0.0.252 C0A8:FA64:0:0:9820:26FC:1E0:FFFF -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675662426752-d8c9fc13-2fac-4942-9016-b5f89ef9511c.png)



答：192.168.250.100



#### 10、What is the name of the executable uploaded by Po1s0n1vy? Please include the file extension. (For example, "notepad.exe" or "favicon.ico")


```sql
index=botsv1 sourcetype="stream:http" dest_ip="192.168.250.70" "multipart/form-data" 
| head 1
```

<!-- 这是一张图片，ocr 内容为：关闭 新搜索 另存为 所有时间 INDEX-BOTSY1 SOURCETYPE三"STREAM:HTTP" DEST-IP二"192.168.250.70" "MULTIPART/FORM-DATA" HEAD 1 无事件采样 智能模式 任务 1个事件(16/08/103:28:51.000至23/02/067:03:49.000) 可视化 模式 事件(1) 统计信息 每列1个月 一缩小 设定时间线的格式 +缩放到所选区域 X取消选择 列表?格式 每页20个 事件 时间 <隐咸字段 活所有字段 16/08/10 选定字段 21:52:47.035 A HOST 1 1","CLIENT RTT' & SOURCE 1 ;                                                                                                     I'3791.EXE\ AME & SOURCETYPE 1 感兴趣的字段 A ACCEPT 1 INNAS-------------7E0E42C20990","CS-VERSION":["1.1',1'],1'],"DATA_CENTER- -CONTENT.LENGTH":77045,"CS-CONTENTENT.TYPE";"MULTIPART/FORM-DATA; BOUNDARY---- & ACCEPT LANGUAGE 1 # ACK_PACKETS_IN 1 # ACK_PACKETS_OUT 1 A APP 1 # BYTES 1 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675667436233-1700f6cc-9887-4517-9607-5979dc3c0590.png)

<!-- 这是一张图片，ocr 内容为：无事件采样 1个事件(16/08/103:28:51.000至23/02/067:13:20.000) 统计信息 模式 事件(1) 可视化 设定时间线的格式 一缩小 +缩放到所选区域 X取消选择 每页20个 列表 格式 事件 时间 隐藏字段 活所有字段 16/08/10 ("ENDTIME":"2016-08-10T21:52:47.035555552","TIMESTAMP:: "2016-98-10T21:52:45.4374452","ACCEPT";"' 选定字段 21:52:47.035 -US","ACK,PACKETS-IN";I,"ACK-PACKETS-OUT":55,"BYTES":77895,"BYTES_IN":77648,"BYTES-OUT":248." A HOST 1 ECTION_TYPE":"KEEP-ALIVE","COR X PART_FILENAMED A PART FILENAMED ENT.PHP\"","FORM-DATA; NAME:\" A SOURCE 1 \"\"","FORM-DATA; NAME\"USERT 选定的 2值,100%的事件 否 A SOURCETYPE 1 是 NAME:\"OPTION\""","FORM-DATA; 465C906161E060AC551A9E0276-9GT 报表 感兴趣的字段 UNDARY三--------------- 上限值 时段上限值 A ACCEPT 1 牢见值 TENT":"{ACTION':'UPLOAD','MES A ACCEPT_LANGUAGE 1 具有此字段的事件 EXT/HTML\R\NSERVER: MICROSOFT #ACK PACKETS IN 1 8.250.70","DEST_MAC":"00:0C:29 # ACK_PACKETS_OUT 1 值 计数 T_LENGTH":94,"HTTP_CONTENT_TY A APP 1 OM_EXTPLORER&TMPLCOMPONENT", 1 3791.EXE 100% # BYTES 1 KETS_OUT":0,"NETWORK_INTERFACE # BYTES_IN 1 100% AGENT.PHP OMLA/ADMINISTRATOR/INDEX.PHP # BYTES_OUT 1 6 21:52:47 GMT","SERVER";"MICN ACJP1 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675667672172-8c222e38-375d-48fd-ba85-089fd94dc162.png)



```sql
index=botsv1 sourcetype="stream:http" dest_ip="192.168.250.70" "multipart/form-data" 
| stats count by part_filename{}
```

<!-- 这是一张图片，ocr 内容为：关闭 新搜索 另存为 所有时间 INDEX-BOTSYL SOURCETYPES"STREAM:HTTP" DEST-IP:"192.168.250.78""MULTIPART/FORM-DATA" L STATS COUNT BY PART_FILENAME@ 智能模式 无事件采样 任务 5个事件(16/08/10 31.000至23/000至23/06 7:15:23.000) 统计信息(2) 可视化 事件模式 预览 格式 每页20个? PART_FILENAMED ` COUNT 3791.EXE AGENT.PHP -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675667744114-faf07040-522c-4ae3-9bc9-dfa3626c031d.png)

答：3791.exe

#### 5、What is the name of the file that defaced the imreallynotbatman.com website? Please submit only the name of the file with the extension (For example, "notepad.exe" or "favicon.ico").
破坏 imreallynotbatman.com 网站的文件的名称是什么？请仅提交带有扩展名的文件名（例如，“notepad.exe”或“favicon.ico”）。

这里恶意文件只有两种方式可以出现在目的网站所在的服务器上，一种是攻击者上传，源ip是攻击者IP；一种是攻击者已获取网站服务器的webs hell，从自己的服务器（C2）上下载到网站服务器上，目的IP是攻击者IP。

```sql
index=botsv1 sourcetype="suricata" src_ip="23.22.63.114" dest_ip="192.168.250.70"
| stats count by http_method,http.hostname,http.url
| sort -count


index=botsv1 sourcetype="suricata" src_ip="192.168.250.70" dest_ip="23.22.63.114"
| stats count by http_method,http.hostname,http.url
| sort -count
```

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX-BOTSYL SOURCETYPE三"SURICATA" SRC_IP-23.22.63.114" DEST-IP二"192.168.250.70" STATS COUNT BY HTTP_METHOD,HTTP.HOSTNAME,HTTP.URL SORT-COUNT 智能模式 无事件采样 3.273个事件(16/08/10 3:28:51.000至23/02/06 12:21:38.000) 任务 下 事件 模式 可视化 统计信息(4) 每页20个 预览 /格式 HTTP METHOD E HTTP.URL HTTP.HOSTNAME COUNT /JOOMLA/ADMINISTRATOR/INDEX.PHP GET 824 1MREALLYNOTBATMAN.COM POST 824 IMREALLYNOTBATMAN.COM /JOOMLA/ADMINISTRATOR/INDEX.PHP GET /JOOMLA/AGENT.PHP 194 71.39.18.126 GET /POISONIVY-IS-COMING-FOR-YOU-BATMAN.JPEG PRANKGLASSINEBRACKET.JUMPINGCRAB.COM -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675686123585-7a202c19-1872-46ce-b23b-bf719afb48a8.png)

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX-BOTSY1 SOURCETYPE-'SURICATA" SRC-IP-'192.168.250.70' DEST-IP-"23.22.63.114" I STATS COUNT BY HTTP-METHOD,HTTP.HOSTNAME,HTTP.URL SORT-COUNT 无事件采样 智能模式 /1.294个事件(16/08/10 3:28:51.000至23/06 12:20:21.000) 任务 三 统计信息(4) 事件模式 可视化 每页20个 格式 预览 HTTP_METHOD * HTTP.URL E HTTP.HOSTNAME * COUNT E /JOOMLA/ADMINISTRATOR/INDEX.PHP 824 IMREALLYNOTBATMAN.COM 411 POST /JOOMLA/ADMINISTRATOR/INDEX.PHP IMREALLYNOTBATMAN.COM 52 GET 71.39.18.126 JOOMLA/AGENT.PHP 3 GET /POISONIVY-IS-COMING-FOR-YOU-BATMAN.JPEG PRANKGLASSINEBRACKET.JUMPINGCRAB.COM -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675686073415-8e2cac71-0cdd-4420-926e-90ccc4fb1eb2.png)

答：poisonivy-is-coming-for-you-batman.jpeg



#### 6、This attack used dynamic DNS to resolve to the malicious IP. What is the fully qualified domain name (FQDN) associated with this attack?
该攻击使用动态DNS解析为恶意IP。 与此攻击相关的是什么完全限定域名（FQDN）？

```sql
index=botsv1 sourcetype="suricata" src_ip="192.168.250.70" dest_ip="23.22.63.114"
| stats count by http_method,http.hostname,http.url
| sort -count
```

<!-- 这是一张图片，ocr 内容为：关闭 另存为 新搜索 所有时间 INDEX-BOTSY1 SOURCETYPE-'SURICATA" SRC-IP-'192.168.250.70' DEST-IP-"23.22.63.114" I STATS COUNT BY HTTP-METHOD,HTTP.HOSTNAME,HTTP.URL SORT-COUNT 无事件采样 智能模式 /1.294个事件(16/08/10 3:28:51.000至23/06 12:20:21.000) 任务 三 统计信息(4) 事件模式 可视化 每页20个 格式 预览 HTTP_METHOD * HTTP.URL E HTTP.HOSTNAME * COUNT E /JOOMLA/ADMINISTRATOR/INDEX.PHP 824 IMREALLYNOTBATMAN.COM 411 POST /JOOMLA/ADMINISTRATOR/INDEX.PHP IMREALLYNOTBATMAN.COM 52 GET 71.39.18.126 JOOMLA/AGENT.PHP 3 GET /POISONIVY-IS-COMING-FOR-YOU-BATMAN.JPEG PRANKGLASSINEBRACKET.JUMPINGCRAB.COM -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675686073415-8e2cac71-0cdd-4420-926e-90ccc4fb1eb2.png)

答：prankglassinebracket.jumpingcrab.com



#### 7、What IP address has Po1s0n1vy tied to domains that are pre-staged to attack Wayne Enterprises?


答：23.22.63.114





#### 8、Based on the data gathered from this attack and common open-source intelligence sources for domain names, what is the email address most likely associated with the Po1s0n1vy APT group?
查询该IP对应的历史DNS解析记录，找到历史域名，查找注册邮箱

答：lillian.rose@po1s0n1vy.com



<!-- 这是一张图片，ocr 内容为：23.22.63.114 结果导出 服务列表 批量导出 搜索构造器 全部类型 HOST # VALUE TYPE 23.22.*. WAYN***RPNC.COM 2 23.22.* WAYN**RINC.COM 3 23.22.*.* WANE***PINC.COM 4 WYNE***PINC.COM 23.22.* 5 A 23.22.*. PO1**1VY.COM 9 23.22.*. WAYN**PINC.COM EC2-23**-63-114.COMPUTE-1.AMA***AWS.COM 23.22.* 8 23.22.* A WAYN**PINC.COM 6 23.22.* WAYN*PINC.COM -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675689335505-4744c39b-c3f1-41c9-9e5e-3d43e5ba2e43.png)

<!-- 这是一张图片，ocr 内容为：X WHOIS信息 2016-12-24更新 LILLIAN ROSE 注册者 TOXICODENDRON INC. 注册机构 LILLIAN.ROSE@PO1SON1VY.COM 邮箱 1 EDGE FORREST LANE,SPRINGFIELD,MO,US 地址 +1.7357647667 电话 注册时间 2016-07-21 18:07:13 2017-07-21 18:07:13 过期时间 2016-09-0623:19:07 更新时间 TUCOWS,INC 域名服务商 域名服务器 NS2.ABAC.COMINS1.ABAC.COM -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675688589027-ef616bd6-a97f-4479-a271-55df841eeaee.png)



#### 11、What is the MD5 hash of the executable uploaded?




首先查看上传文件3791.exe的数据来源类型：

```sql
index=botsv1 3791.exe md5 | stats count by sourcetype
```

<!-- 这是一张图片，ocr 内容为：关闭 新搜索 另存为 所有时间 INDEX-BOTSV1 3791.EXE MD5 I STATS COUNT BY SOURCETYPE 智能模式 67个事件(16/08/103:28:51.000至23/0613:48:48.000)无事件采样 任务"11名业 模式统计信息(1)可视化 事件 每页20个?格式预览 SOURCETYPE * COUNT 67 XMLWINEVENTLOG:MICROSOFT-WINDOWS-SYSMON/OPERATIONAL -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675689648329-40e2605b-5c1c-4a2a-907d-a10508970bf6.png)

然后查找其中的MD5值：

```sql
index=botsv1 3791.exe sourcetype="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" CommandLine="3791.exe"
| rex field=_raw MD5="(?<md5sum>\w+)" 
| table md5sum
```

<!-- 这是一张图片，ocr 内容为：新搜索 ANDEX-BATSYT 3791  EX& SOURCETYPER" COMMANDLLORIMICROSINICROSOFT-NINDON/OPERATIONAL" COMMANDLLINEA' 2 REX FIELD_RAW MD5-"(?<MD5SUM>\W+)" 3 TABLE MD5SUM 无事件采样 1个事件(16/08/103:28:51.000至23/02/06 13:20:57.000) 统计信息(1) 可视化 模式 事件 /格式 预览 每页20个 MD5SUM AAE3F5A29935E6ABCC2C2754D12A9AF0 -->
![](https://cdn.nlark.com/yuque/0/2023/png/2401138/1675689673701-8f3d3806-a85e-4f0a-84df-d3081d650a44.png)

答：AAE3F5A29935E6ABCC2C2754D12A9AF0

### 三、参考
[https://samsclass.info/50/proj/botsv1.htm](https://samsclass.info/50/proj/botsv1.htm)

[https://andickinson.github.io/blog/splunk-boss-of-the-soc-v1/](https://andickinson.github.io/blog/splunk-boss-of-the-soc-v1/)

[https://darkwing.moe/2020/07/30/BP-Splunk-TryHackMe/#](https://darkwing.moe/2020/07/30/BP-Splunk-TryHackMe/#)

