/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@mui/material',
    '@mui/material-nextjs',
    '@mui/system',
    '@vakaconsulting/react',
    '@vakaconsulting/web3-auth',
    '@vakaconsulting/common',
    'mui-one-time-password-input',
  ],
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }
    return config
  },
}

export default nextConfig
