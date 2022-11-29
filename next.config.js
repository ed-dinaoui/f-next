/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true ,
  env: {
    ROOT: process.env.NODE_ENV === 'production' ? `https://f-net.netlify.app` : `https://5wluri-3000.preview.csb.app`
  }
}
