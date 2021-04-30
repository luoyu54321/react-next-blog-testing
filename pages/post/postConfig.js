import fs from 'fs'
import path from 'path'
import marked from '/usr/local/lib/node_modules/marked/lib/marked.esm.js'

const postConfig = []
const postsDirectory = path.join(process.cwd(), '/pages/post/postContent')
const fileNames = fs.readdirSync(postsDirectory)
fileNames.map((fileName, index) => {
  const id = fileName.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const htmlResult = marked(fileContents);
  postConfig.push({ [id]: htmlResult })
})


export default postConfig