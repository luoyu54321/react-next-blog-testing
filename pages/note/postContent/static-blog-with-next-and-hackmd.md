
#  [實作紀錄] 使用 Github Action (CI/CD), Hackmd 建立即時更新的個人 blog
###### Next,Dynamic Route,Github Action,Hackmd,實作筆記

**HackMD 是我習慣的筆記工具，在 code 個人部落格的時候，為了實現做完筆記，一按下 publish，個人部落格立刻產生一篇文章，也不用去搬遷文章或適應新的 CMS 後台...的懶人魔法 (ゝ∀･)，我選擇用 HackMD 的 Github 推拉功能，實現內容的即時更新，而且推拉功能還有像 PR 一樣的 change highlight ，十分親切**。

略過 Create Next App、Next Dynamic Route 等等有詳細官方教學的部分，這份筆記會紀錄——

1. Github Action (CI/CD) with gh-pages([參考影片](https://www.youtube.com/watch?v=yRz8D_oJMWQ))
2. Connect to Hackmd
3. 將 .md 整理成理想的資料格式
4. 侷限性

---

## 實作的部分

大致介紹一下，這些工具是如何合作的：
1. Hackmd push md 檔案到 Github (main branch)
2. main 收到內容修改之後，啟動 Github Action 流程
3. CICD 流程觸發 generate md to JSON file 的功能
4. Next SSR 階段，getStaticProps 會去存取 JSON files，變成 note 頁面底下的 dynamic route 以及相應的頁面內容 e.g. /note/how-to-use-git

步驟 4 的部分，本來我打算寫一支處理 note 總覽頁面頁數、標籤分類的 API，把處理內容、頁數、整理格式...的部分獨立出去，結果 Next API居然不支援 Next export uwu

### Hackmd push md 檔案到 Github

只要選擇右上角的三個點點，就可以看到「版本與 GitHub 同步」的選項，跟 GitHub 版控一樣會有推送訊息的欄位可以填寫。

### 啟動 Github Action 流程

新增一份 CI 設定檔案在 repo workflows 資料夾內

![](https://i.imgur.com/oukSBTX.png)


檔案內容我是這樣寫的，大部分都是既有模板：

*  push: branches[ main ] ——推送到 main 的時候，就要執行這份 CI
*  jobs: build: steps: run: npm run build:blogfile ——我在既有模板裡，新增了 generate md to JSON file 的流程，確保檔案處理好之後，才會執行 npm run build 的部分。
*  with: branch: gh-pages ——跑完之後，我的頁面 deploy 到 gh-pages
```yml=
name: Node.js CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 15.x]
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm i
    - run: npm run build:blogfile
    - run: npm run build
    - run: npm run export
    - run: touch ./out/.nojekyll
    - name: Deploy 🚀
      uses: JamesIves/github-pages-deploy-action@4.1.1
      with:
          branch: gh-pages # The branch the action should deploy to.
          folder: out # The folder the action should deploy.
```


推送到 main 之後，會看到 Github 的這個位置有的黃色點點（代表 CI 正在運行中）如果是綠色勾勾，就代表運行成功。點擊顏色點點，可以近一步查看 detail。

![](https://i.imgur.com/xp6WXEi.png)


### generate md to JSON file

為了把 .md 變成可以運用的檔案，我使用的套件是 [Marked](https://marked.js.org/)。他可以把 markdown 變成 html object，然後再使用 React 的 dangerouslySetInnerHTML 把內容送進 DOM tree 就可以顯示在畫面上摟。

```javascript=
const getPost = () => {
  const PostConfig = []
  //先選定 md 文章的資料夾
  const postsDirectory = path.join(process.cwd(), '/pages/note/postContent')
  //再進入資料夾，取得文章的檔案名稱，當成 id
  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map((fileName, index) => {
    const id = fileName.replace(/\.md$/, '')
    //組成下載檔案的完整路徑
    const fullPath = path.join(postsDirectory, fileName)
    //下載檔案
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    //使用套件修改檔案格式
    const htmlResult = marked(fileContents);
    PostConfig.push({
      [id]: {
        htmlResult,
      }
    })
  })
  //寫入 JSON 檔案，除此之外，我還直接把檔案回傳給 Next 的 getStaticProps
  fs.writeFile("pages/note/data.json", JSON.stringify(clientSidePostConfig), function (err, result) {
    if (err) console.log('error', err);
  })
}
```

### 侷限性

Hackmd 渲染到畫面上後，有些東西出不來，例如 YouTube 影片的鑲嵌。還好這個部分影響不大，此外，為了讓部落格 review 頁面就可以先拿到中文標題，放進 meta data 裡，針對 .md 檔案還要做一些繁複的整理，抽取出我們要使用的部分。


