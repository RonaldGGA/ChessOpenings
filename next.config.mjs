/** @type {import('next').NextConfig} */
const nextConfig = {  
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', 
        port: '',
        pathname: '/**',
      },
      {
        protocol:'https',
        hostname:'images.chesscomfiles.com',
        port:'',
        pathname:'/**'
      },
      {
        protocol: 'https',
        hostname: 'images.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      // Si tienes otro dominio específico que sirva imágenes para tu web
      // { protocol: 'https', hostname: 'tu-dominio-externo.com', port: '', pathname: '/**' },
    ],
  },};

export default nextConfig;
