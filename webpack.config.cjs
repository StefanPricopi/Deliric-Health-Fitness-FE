import path from 'path';

export default {
  mode: 'development',
  output: {
    chunkFormat: 'array-push', // Ensure proper chunk format
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
