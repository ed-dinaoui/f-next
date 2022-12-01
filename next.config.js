/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true ,
  env: {
    ROOT: process.env.NODE_ENV === 'production' ? `https://f-next.vercel.app` : `https://5wluri-3000.preview.csb.app`
  }
}
