const path = require('path')
 
module.exports = {
  env: {
    VERCEL_API_URL: process.env.VERCEL_API_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/internal/dashboard,',
      },
    },
  },
}