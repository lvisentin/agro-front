const path = require('path')
 
module.exports = {
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