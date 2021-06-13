import ErrorBoundary from '../../component/errorBoundary'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import { GetAllTag } from '../../component/getAllTag'
import { GetArticleList } from '../../component/getArticleList'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const postPerPage = 2;
  const allTag = GetAllTag();
  const [tag, setTag] = useState(null);
  const [page, setPage] = useState(1);
  let articlesData = GetArticleList(tag, page, postPerPage);
  let { pageCount } = articlesData;
  let pages = []
  for (let i = 0; i < pageCount; i++) { pages.push(i + 1) };

  useEffect(
    () => {
      setPage(1);
      articlesData = GetArticleList(tag, page, postPerPage);
    },
    [tag]
  );

  useEffect(
    () => {
      articlesData = GetArticleList(tag, page, postPerPage);
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
        <PageContainer>
          {pages.map((pageChoice) => {
            return (
              <PageButton onClick={() => { setPage(pageChoice) }} checked={page === pageChoice}>{pageChoice}</PageButton>
            )
          })}
        </PageContainer>
        <Content articlesData={articlesData} />
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
  padding: 20px 20px;
  justify-content: flex-end;
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
  margin-bottom: 160px;
  @media only screen and (max-width: 600px) {
      margin-top: 80px;
    }
`

const CreateRandomNumber = (min, max) => {
  const randomCount = Math.floor(Math.random() * max) + 1
  const randomNumber = randomCount + min
  return randomNumber
}

const Content = (props) => {
  const { articlesData } = props;
  const { article } = articlesData;
  console.log(articlesData);
  return (
    <div>
      {
        article && article.map((post, index) => {
          return (
            <CardContainer>
              <div key={index}>
                <Link href={`/note/${encodeURIComponent(Object.keys(post))}`}>
                  <a>
                    <CardColor randomGreen={CreateRandomNumber(100, 150)} randomBlue={CreateRandomNumber(100, 150)}></CardColor>
                    <CardTag>{Object.values(post)[0].tag}</CardTag>
                    <CardTitle>{Object.values(post)[0].title}</CardTitle>
                  </a>
                </Link>
              </div>
            </CardContainer>
          )
        })
      }
    </div>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin: 25px auto;
  max-width: 650px;
  width: 85%;
  border-radius: 15px;
  border: solid 1px #edf0f5;
  background-color: white;
  overflow: hidden;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover{
    opacity: 0.6;
  }
`
const CardColor = styled.div`
  background-image: ${props => `linear-gradient(300deg, rgb(255, 99, ${props.randomBlue}), rgb(255, ${props.randomGreen}, 0))`};
  height: 200px;
`
const CardTag = styled.div`
  margin: 10px 0px;
  font-size: 14px;
  color: grey;
  padding: 0px 20px;
`
const CardTitle = styled.div`
  margin: 0px 0px 20px;
  font-size: 20px;
  padding: 0px 20px;
`
