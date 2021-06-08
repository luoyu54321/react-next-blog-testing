var fs = require("fs");
var path = require("path");
var marked = require("marked");

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

const getPostContent = () => {
  const clientSidePostConfig = []
  const postsDirectory = path.join(process.cwd(), '/pages/note/postContent')
  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map((fileName, index) => {
    //TODO-2 : 這裡只負責把資料塞進去就好不需要整理
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
}

module.exports.getPostContent = getPostContent();