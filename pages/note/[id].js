
import Link from 'next/link'
import styled from 'styled-components'
import Head from 'next/head'
const blogData = require('./data.json');


export default function Posts({ postData }) {
  const html = postData.content;
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


const getPost = () => {
  return blogData
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
