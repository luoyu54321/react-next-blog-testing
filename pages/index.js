import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h5>
        <Link href="/post/1">
          <a>Go to pages/post/1.js</a>
        </Link>
      </h5>
    </div>
  )
}
