
import Link from 'next/link'

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
