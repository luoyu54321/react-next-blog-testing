# [實作紀錄] Github pages custom domain 設定
###### Gh-pages,custom domain,GoDaddy,CNAME

人生第一次買網域，知識量大到我多午睡了一次。
以下紀錄我的設定過程，如果有任何疑惑或是錯誤的地方，也麻煩提醒我 :)

等等要做的事情——
1. 買網域付帳
2. GoDaddy DNS 設定（連接 Github)
3. Github 添加 CNAME 檔案
4. Github Page 設定 custom domain
5. 修改 next.config.js prefix

## 實作的部分

### 買網域付帳
搜尋想要的網域之後，加入購物車，接下來跟一般的網購一樣順暢。我想要呈現的網址是 blog.kkluo.com，所以我買了 kkluo.com，並且等等會設定 subdomain "blog"。
![](https://i.imgur.com/QZFhGDS.png)

### GoDaddy DNS 設定
點選下方按鈕之後，進入 DNS 設定頁面。
![](https://i.imgur.com/dKIeDhq.png)

接下來，
- 增加四組 type A，指向 GitHub Pages 的 IP address。
- 修改 name 為 www 的 type CNAME 欄位，指向你的 Github 個人頁面（**不需要加上 repo 的名稱**）
- 增加一組 type CNAME，name 設定為 blog，也指向 Github 個人頁面。
![](https://i.imgur.com/RdMpXYk.png)


### Github 添加 CNAME 檔案
在你的 repo 根目錄的部分，新增一個名為 CNAME 的檔案，內容是你的預定網址。
![](https://i.imgur.com/fEJN0fJ.png)

### Github Page 設定 custom domain
接下來填入 Github page 的設定。
![](https://i.imgur.com/UOIQHuI.png)


### 修改 next.config.js prefix
發佈網站之後發現大跑版...原來是 repo 裡的 domain 變數還沒抽換掉。如果有相關 domain 的環境設定，也別忘了。



