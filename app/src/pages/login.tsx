import React from 'react'
import { Layout, NextLinkComposed } from '@/components'
import { AuthLogin } from '@vakaconsulting/react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Login() {
  return (
    <Layout>
      <Container maxWidth={'sm'}>
        <Card>
          <CardContent>
            <AuthLogin />
          </CardContent>
        </Card>
        <Typography component={'p'} variant={'body2'} mt={4} textAlign={'right'}>
          Don&apos;t have an account yet? Register{' '}
          <Link component={NextLinkComposed} to={'/register'}>
            here
          </Link>
        </Typography>
      </Container>
    </Layout>
  )
}
