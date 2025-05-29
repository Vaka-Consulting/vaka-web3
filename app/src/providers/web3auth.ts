import { WEB3_AUTH_ENDPOINT } from '@/constants'
import { Web3AuthProvider } from '@vakaconsulting/web3-auth'

export const web3AuthProvider = new Web3AuthProvider(WEB3_AUTH_ENDPOINT)
