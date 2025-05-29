import { Layout } from '@/components'
import { web3AuthProvider } from '@/providers/web3auth'
import { AuthRegisterContextProvider, AuthRegister } from '@vakaconsulting/react'
import Container from '@mui/material/Container'

export default function Register() {
  return (
    <Layout>
      <AuthRegisterContextProvider provider={web3AuthProvider}>
        <Container maxWidth={'lg'}>
          <AuthRegister />
        </Container>
      </AuthRegisterContextProvider>
    </Layout>
  )
}
