
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import marked from 'marked'
import styled from 'styled-components'
import Head from 'next/head'


export default function Posts({ postData }) {
  const html = marked(postData.content);
  return (
    <div>
      <Head>
        <title>KK Blog | Note </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="KK Blog 紀錄一個前端工程師的學習筆記與專案作品。聯絡我：contact@kkluo.com" key="description" />
        <meta name="keywords" content="前端工程師 coding React Javascript 網頁工程師" key="keywords" />
        <meta name="og:type" content="website" key="og:type" />
        <meta name="og:image" content="/kk-logo.svg" key="og:image" />
        <meta name="og:title" content="KK Blog | Note" key="og:title" />
        <meta name="og:description" content="KK Blog 紀錄一個前端工程師的學習筆記與專案作品。聯絡我：contact@kkluo.com" key="og:description" />
        <meta name="og:url" content="https://blog.kkluo.com/note" key="og:url" />
        <link rel="canonical" href="https://blog.kkluo.com/note" key="og:url"></link>
        <link rel="shortcut icon" href="..//favicon.ico"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="..//favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="96x96" href="..//favicon-96x96.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href=".//favicon-16x16.png"></link>
      </Head>
      <ContentContainer>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <h5>
          <Link href="/">
            <a>HOME PAGE</a>
          </Link>
        </h5>
      </ContentContainer>
    </div>
  )
}


export async function getStaticPaths() {
  const paths = getPostId()
  return {
    paths,
    // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page. 
    fallback: false
  }
}

const ContentContainer = styled.div`
  margin-top: 120px;
  height: 1000px;
  overflow: hidden;
  @media only screen and (max-width: 600px) {
      margin-top: 80px;
    }
`

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

const getFirstElementContent = (string, ele) => {
  const eleStartIndex = string.indexOf(`<${ele}`);
  if (eleStartIndex > -1) {
    const startElementTagLength = `<${ele}`.length;
    const eleEndIndex = string.indexOf(`/${ele}>`);
    const elementString = string.slice(eleStartIndex + startElementTagLength, eleEndIndex);
    const contentStartIndex = elementString.indexOf(">") + 1;
    const contentEndtIndex = elementString.indexOf("<");
    const elementContent = elementString.slice(contentStartIndex, contentEndtIndex);
    return elementContent
  } else {
    return ""
  }
}

const getPost = () => {
  //TODO-1 : 這裡只要讀取 JSON 就好不用做 md 內容的轉換
  const svrPostConfig = []
  const clientSidePostConfig = []
  const postsDirectory = path.join(process.cwd(), '/pages/note/postContent')
  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map((fileName, index) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const htmlResult = marked(fileContents);
    const h1Content = getFirstElementContent(htmlResult, "h1")
    const h6Content = getFirstElementContent(htmlResult, "h6")
    let page
    if (index === 0) {
      page = Math.floor((index) / 5)
    } else {
      page = Math.floor((index - 1) / 5)
    }
    svrPostConfig.push({ [id]: htmlResult })
    clientSidePostConfig.push({
      [id]: {
        "htmlResult": htmlResult,
        "title": h1Content,
        "tag": h6Content,
        "page": page
      }
    })
  })
  fs.writeFile("pages/note/data.json", JSON.stringify(clientSidePostConfig), function (err, result) {
    if (err) console.log('error', err);
  })
  return svrPostConfig
}

const getPostId = () => {
  //Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name)
  //const res = await fetch('https://.../note/s')
  return getPost().map((item) => {
    return {
      params: {
        id: Object.keys(item)[0]
      }
    }
  })
};

const getPostData = (id) => {
  const post = getPost().filter(item => Object.keys(item)[0] === id)
  const content = {
    title: id,
    content: post[0][id]
  }
  return {
    id,
    ...content
  }
}
