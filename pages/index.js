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
  height: 1000px;
`