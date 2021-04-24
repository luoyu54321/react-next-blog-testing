import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Header from '../component/header.js'

export default function Home() {
  return (
    <div>
      <Header />
      <ContentContainer />
    </div>
  )
}

const ContentContainer = styled.div`
  height: 1000px;
`