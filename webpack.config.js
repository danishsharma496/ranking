const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for transpiling JSX
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
      // Add more rules for handling other file types like images, stylesheets, etc.
    ],
  },
};
