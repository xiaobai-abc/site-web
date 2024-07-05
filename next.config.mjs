/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xiaobai-abc.cn",
        port: "",
        pathname: "/static/**"
      }
    ]
  },
  env: {
    APP_ENV: process.env.APP_ENV
  }
};

export default nextConfig;
