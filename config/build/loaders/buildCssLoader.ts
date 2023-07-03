export function buildCssLoader() {
    return {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
}
