import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {['1', '2', '3', '4', '5'].map((index) => {
        return (
          <h5>
            <Link href={`/post/${index}`}>
              <a>Go to pages/post/{index}.js</a>
            </Link>
          </h5>
        )
      })}
    </div>
  )
}
