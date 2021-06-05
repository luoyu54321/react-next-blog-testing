import ErrorBoundary from '../component/errorBoundary'
import styled from 'styled-components'

export default function Home() {
  return (
    <ErrorBoundary>
      <ContentContainer>
        Hey this is about page
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