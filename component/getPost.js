var fs = require("fs");
var path = require("path");
var marked = require("marked");

const getPost = () => {
  console.log('create post json file')
  const postConfig = []
  const postsDirectory = path.join(process.cwd(), '/pages/note/postContent')
  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map((fileName, index) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const htmlResult = marked(fileContents);
    postConfig.push({ [id]: htmlResult })
  })
  fs.writeFile("pages/note/data.json", JSON.stringify(postConfig), function (err, result) {
    if (err) console.log('error', err);
  })
}

module.exports.getPost = getPost();