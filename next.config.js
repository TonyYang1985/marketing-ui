/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
    },
    experimental: {
      serverComponentsExternalPackages: ['@tremor/react']
    },
    env: {
      NEXTAUTH_SECRET:"1XHUyXhfiLlMneSfoKjAUTKRVpfqKNP+Ft7cZELoUDc=",
    },
  };
  
  module.exports = nextConfig;
  