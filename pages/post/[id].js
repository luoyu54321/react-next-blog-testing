
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import marked from 'marked'


export default function Posts({ postData }) {
  const html = marked(postData.content);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <h5>
        <Link href="/">
          <a>HOME PAGE</a>
        </Link>
      </h5>
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

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

const getPost = () => {
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
  fs.writeFile("pages/post/data.json", JSON.stringify(postConfig), function (err, result) {
    if (err) console.log('error', err);
  })
  return postConfig
}

const getPostId = () => {
  //Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name)
  //const res = await fetch('https://.../posts')
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
