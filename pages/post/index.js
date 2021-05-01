import ErrorBoundary from '../../component/errorBoundary'
import Link from 'next/link'

export default function Home() {
  const customData = require('./data.json');

  return (
    <ErrorBoundary>
      {customData.map((post, index) => {
        return (
          <li key={index}>
            <Link href={`/post/${encodeURIComponent(Object.keys(post))}`}>
              <a>{Object.keys(post)}</a>
            </Link>
          </li>
        )
      })}
      Hey this is post page
    </ErrorBoundary>
  )
}