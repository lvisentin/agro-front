const path = require('path');

module.exports = {
  env: {
    LOGIN_URL: process.env.LOGIN_URL,
    PAYMENT_ERROR_URL: process.env.PAYMENT_ERROR_URL,
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    VERCEL_API_URL: process.env.VERCEL_API_URL
  },
  images: {
    domains: [
      'placehold.it',
      'agro-dev-br.s3.amazonaws.com',
      'agro-main-br.s3.amazonaws.com',
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/internal/login',
      },
    },
  },
};
