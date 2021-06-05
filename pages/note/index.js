import ErrorBoundary from '../../component/errorBoundary'
import styled from 'styled-components'
import Link from 'next/link'

export default function Home() {
  const customData = require('./data.json');

  return (
    <ErrorBoundary>
      <ContentContainer>
        {customData.map((post, index) => {
          return (
            <li key={index}>
              <Link href={`/note/${encodeURIComponent(Object.keys(post))}`}>
                <a>{Object.keys(post)}</a>
              </Link>
            </li>
          )
        })}
      Hey this is post page
      </ContentContainer>
    </ErrorBoundary>
  )
}

const ContentContainer = styled.div`
  margin-top: 120px;
  height: 1000px;
  @media only screen and (max-width: 600px) {
      margin-top: 80px;
    }
`