const articles = require('../pages/note/data.json');

export const GetArticleList = (tag, page, perPage) => {
  const articleWithTag = GetArticleWithTag(tag)
  const pageCount = Math.ceil(articleWithTag.length / perPage)
  const startArticle = (page - 1) * perPage
  const endArticle = (page) * perPage
  const artileInPage = []
  for (let i = startArticle; i < endArticle; i++) {
    articleWithTag[i] && artileInPage.push(articleWithTag[i])
  }
  return { pageCount: pageCount, article: artileInPage }
}

const GetArticleWithTag = (tag) => {
  let articleWithTag = []
  if (tag) {
    articles.map((articleObj) => {
      const tagStr = Object.values(articleObj)[0].tag
      if (tagStr.includes(tag)) {
        articleWithTag.push(articleObj)
      }
    })
  } else {
    articleWithTag = articles
  }
  return articleWithTag
}