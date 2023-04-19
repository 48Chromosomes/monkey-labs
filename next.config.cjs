/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    APP_URL: (() => {
      if (isDev) return 'http://localhost';
      if (isProd) return 'https://monkey-labs.vercel.app';
    })(),
    EXPRESS_PORT: 8888,
  };

  const nextConfig = {
    reactStrictMode: false,
    env,
  };

  return nextConfig;
};
