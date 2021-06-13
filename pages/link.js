import ErrorBoundary from '../component/errorBoundary'
import Head from 'next/head'
import styled from 'styled-components'

export default function Home() {
  return (
    <ErrorBoundary>
      <Head>
        <title>KK Blog | Link </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="KK Blog 紀錄一個前端工程師的學習筆記與專案作品。聯絡我：contact@kkluo.com" key="description" />
        <meta name="keywords" content="前端工程師 coding React Javascript 網頁工程師" key="keywords" />
        <meta name="og:type" content="website" key="og:type" />
        <meta name="og:image" content="/kk-logo.svg" key="og:image" />
        <meta name="og:title" content="KK Blog | Link" key="og:title" />
        <meta name="og:description" content="KK Blog 紀錄一個前端工程師的學習筆記與專案作品。聯絡我：contact@kkluo.com" key="og:description" />
        <meta name="og:url" content="https://blog.kkluo.com/link" key="og:url" />
        <link rel="canonical" href="https://blog.kkluo.com/link" key="og:url"></link>
        <link rel="shortcut icon" href="..//favicon.ico"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="..//favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="96x96" href="..//favicon-96x96.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href=".//favicon-16x16.png"></link>
        <link rel="apple-touch-icon" href="..//favicon-96x96.png"></link>
        <link rel="shortcut icon" href="..//favicon-96x96.png" />
        <link rel="apple-touch-icon-precomposed" href="..//favicon-96x96.png" />
      </Head>
      <ContentContainer>
        <Text>coming soon...</Text>
      </ContentContainer>
    </ErrorBoundary>
  )
}

const Text = styled.h3`
  text-align: center;
  font-size: 20px;
  color: grey;
  padding-top: 100px;
`

const ContentContainer = styled.div`
  margin-top: 120px;
  height: 1000px;
  @media only screen and (max-width: 600px) {
      margin-top: 80px;
    }
`