
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import marked from '/usr/local/lib/node_modules/marked/lib/marked.esm.js'


export default function Posts({ postData }) {
  return (
    <div>
      this is blog : {postData.title}
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
  const postsDirectory = path.join(process.cwd(), '/pages/post/postContent')
  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const htmlResult = marked(fileContents);
    console.log(htmlResult)
  })
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

const getPostId = () => {
  //Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name)
  //const res = await fetch('https://.../posts')
  return ['1', '2', '3', '4', '5'].map((id) => {
    return {
      params: {
        id: id
      }
    }
  })
};

const getPostData = (id) => {
  const content = {
    title: id,
    content: 'this is a sentence'
  }
  return {
    id,
    ...content
  }
}
