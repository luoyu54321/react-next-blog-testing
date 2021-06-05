import Head from 'next/head'
import styled from 'styled-components'
import ErrorBoundary from '../component/errorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <ContentContainer>
        <Text>coming soon...</Text>
      </ContentContainer>
    </ErrorBoundary>
  )
}


const Text = styled.h3`
  text-align: center;
  font-size: 20px;
  color: grey;
  padding-top: 100px;
`

const ContentContainer = styled.div`
  margin-top: 120px;
  height: 1000px;
  @media only screen and (max-width: 600px) {
      margin-top: 80px;
    }
`