module.exports = {
  // Keep direct visits and refreshes working for Vue Router's history URLs.
  devServer: {
    historyApiFallback: true
  },
  pwa: {
    name: 'Little Things',
    themeColor: '#f8f8f3',
    iconPaths: {
      faviconSVG: 'favicon.svg',
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null
    },
    manifestOptions: {
      background_color: '#f8f8f3',
      icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
    }
  }
}
