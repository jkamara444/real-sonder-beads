const path = require('path');

module.exports = {
  entry: './server/public/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'server/public')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  mode: 'development', // Change to 'production' for production builds
  devServer: {
    contentBase: path.join(__dirname, 'server/public'),
    compress: true,
    port: 5500
  },
};
