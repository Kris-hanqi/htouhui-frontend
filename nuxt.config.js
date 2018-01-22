module.exports = {
  /** 页面header */
  head: {
    title: '海投汇-互联网金融平台-小额投资',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'keywords', content: '海投汇，投资理财，互联网理财，小额投资，小额理财，网络投资' },
      { hid: 'description', name: 'description', content: '【海投汇】真实透明，尽职风控的互联网金融理财平台；小额投资理财、短期投资、网上投资等，尽在海投汇金融服务平台。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  // 全局样式
  css: [
    'normalize.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
};
