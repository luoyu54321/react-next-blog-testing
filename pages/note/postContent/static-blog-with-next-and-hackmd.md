
#  [實作紀錄] 使用 Github Action (CI/CD), Hackmd 建立即時更新的個人 blog
###### Next,CICD,實作筆記

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

gh-pages 負責 static content，檔案必需要先被 compile，如果我想要使用 Next.js 寫 API，就會發現 Next API 不支援 export。必須要搭配其他方法，例如我拆掉重練直接使用 Vercel deploy，或者使用 AWS Lambda 的服務。（[AWS Lamda + gh-pages](https://medium.com/@raphaelvigee/serverless-hosting-with-github-pages-aws-lambda-3c19e55d2cc4) 的教學文章，pin 起來之後可能會實作看看）

在這個專案的過程中，剛好有機會碰到了一些 severless 的資訊，人家說實際動手作能夠學習更多所言不假。
