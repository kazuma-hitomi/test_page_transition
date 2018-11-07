module.exports = {
  mode: 'production',
  entry: './src/js/entry.js',
  output: {
    path: __dirname + '/public/assets/js',
    filename: 'app.js'
  },
  devtool: 'cheap-module-eval-source-map'
};
