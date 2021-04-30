import ErrorBoundary from '../../component/errorBoundary'
import Link from 'next/link'

export default function Home() {
  const customData = require('./data.json');
  console.log(customData)
  return (
    <ErrorBoundary>
      {customData.map((post, index) => {
        <li key={index}>
          <Link href={`/${encodeURIComponent(Object.keys(post))}`}>
            <a>{Object.keys(post)}</a>
          </Link>
        </li>
      })}
      Hey this is post page
    </ErrorBoundary>
  )
}