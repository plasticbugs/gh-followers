const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./app/components/Init.jsx",
  output: {
    filename: "public/bundle.js"
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }

    ]
  }
};