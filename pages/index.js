import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Header from '../component/header'
import ErrorBoundary from '../component/errorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <ContentContainer />
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