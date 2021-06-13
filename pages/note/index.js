import ErrorBoundary from '../../component/errorBoundary'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import { GetAllTag } from '../../component/getAllTag'
import { GetArticleList } from '../../component/getArticleList'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const allTag = GetAllTag();
  const [tag, setTag] = useState(null);
  const [page, setPage] = useState(1);
  let articlesData = GetArticleList(tag, page, 1);
  let { pageCount } = articlesData;
  let pages = []
  for (let i = 0; i < pageCount; i++) { pages.push(i + 1) };

  useEffect(
    () => {
      setPage(1);
      articlesData = GetArticleList(tag, page, 1);
    },
    [tag]
  );

  useEffect(
    () => {
      articlesData = GetArticleList(tag, page, 1);
    },
    [page]
  );

  return (
    <ErrorBoundary>
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
        <link rel="apple-touch-icon" href="..//favicon-96x96.png"></link>
        <link rel="shortcut icon" href="..//favicon-96x96.png" />
        <link rel="apple-touch-icon-precomposed" href="..//favicon-96x96.png" />
      </Head>
      <ContentContainer>
        <TagContainer>
          <TagButton onClick={() => { setTag(null) }} checked={tag === null}>All</TagButton>
          {allTag.map((tagChoice) => {
            console.log(tagChoice === tag)
            return (
              <TagButton onClick={() => { setTag(tagChoice) }} checked={tagChoice === tag}>{tagChoice}</TagButton>
            )
          })}
        </TagContainer>
        <Content articlesData={articlesData} />
        <PageContainer>
          {pages.map((pageChoice) => {
            return (
              <PageButton onClick={() => { setPage(pageChoice) }} checked={page === pageChoice}>{pageChoice}</PageButton>
            )
          })}
        </PageContainer>
      </ContentContainer>
    </ErrorBoundary>
  )
}

const TagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0px 20px;
  `

const TagButton = styled.div`
  background-color: ${props => props.checked ? "#ff6a00" : "white"};
  color: ${props => props.checked ? "white" : "grey"};
  padding: 5px 15px;
  border-radius: 50px;
  margin: 5px;
  letter-spacing: 1px;
  font-size: 14px;
  border: solid 1px #edf0f5;
  cursor: pointer;
  &:hover{
    opacity: 0.6;
  }
`
const PageContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0px 20px;
`
const PageButton = styled.div`
  background-color: ${props => props.checked ? "#ff6a00" : "white"};
  color: ${props => props.checked ? "white" : "grey"};
  padding: 10px 10px;
  border-radius: 5px;
  margin: 5px;
  border: solid 1px #edf0f5;
  cursor: pointer;
  &:hover{
    opacity: 0.6;
  }
`

const ContentContainer = styled.div`
  margin-top: 120px;
  height: 1000px;
  @media only screen and (max-width: 600px) {
      margin-top: 80px;
    }
`

const Content = (props) => {
  const { articlesData } = props;
  const { article } = articlesData;
  console.log(articlesData);
  return (
    <div>
      {
        article && article.map((post, index) => {
          return (
            <li key={index}>
              <Link href={`/note/${encodeURIComponent(Object.keys(post))}`}>
                <a>{Object.keys(post)}</a>
              </Link>
            </li>
          )
        })
      }
    </div>
  )
}

