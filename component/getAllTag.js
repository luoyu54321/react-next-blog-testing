const articles = require('../pages/note/data.json');

export const GetAllTag = () => {
  let matchedTags = []
  articles.map((articleObj) => {
    const articleTagStr = Object.values(articleObj)[0].tag
    const articleTagArr = articleTagStr.split(',')
    articleTagArr.map((articleTag) => {
      matchTag:
      if (matchedTags.length < 1) {
        matchedTags.push(articleTag)
      } else {
        for (let i = 0; i < matchedTags.length; i++) {
          if (articleTag === matchedTags[i]) {
            break matchTag
          }
        }
        matchedTags.push(articleTag)
      }
    })
  })
  return matchedTags
}