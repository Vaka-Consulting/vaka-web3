import React from 'react'
import { Layout } from '@/components'
import { useAuth } from '@vakaconsulting/react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function NotAuthenticated() {
  return (
    <>
      <Typography component="h1" variant={'h4'} mb={0}>
        Home
      </Typography>
      <Typography>Please login to access the content</Typography>
    </>
  )
}

function Authenticated() {
  return (
    <>
      <Typography component="h1" variant={'h4'} mb={0}>
        Home
      </Typography>
      <Typography mb={2}>You are logged in</Typography>
    </>
  )
}

export default function Home() {
  const { authenticated } = useAuth()

  return (
    <>
      <Head>
        <title>Web3 Auth on Cardano Demo</title>
        <meta name="description" content="A Cardano dApp powered by VakaJs" />
      </Head>
      <Layout>
        <Container>{authenticated ? <Authenticated /> : <NotAuthenticated />}</Container>
      </Layout>
    </>
  )
}
