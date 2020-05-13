module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'me-view',
        styleLibraryDirectory: 'theme'
      }
    ]
  ]
}
