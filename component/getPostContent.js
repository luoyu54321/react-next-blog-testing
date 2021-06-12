var fs = require("fs");
var path = require("path");
var marked = require("marked");

const getPostContent = () => {
  const clientSidePostConfig = []
  const postsDirectory = path.join(process.cwd(), '/postContent')
  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map((fileName, index) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const htmlResult = marked(fileContents);
    clientSidePostConfig.push({
      [id]: {
        "htmlResult": htmlResult
      }
    })
  })
  fs.writeFile("pages/note/data.json", JSON.stringify(clientSidePostConfig), function (err, result) {
    if (err) console.log('Post file gernerated failed');
    if (result) console.log('Post file gernerated succeed')
  })
}

module.exports.getPostContent = getPostContent();