module.exports = {
   entry: './src/akapen-implement.js',
   output: {
     filename: './build/akapen.js'
   },
   devtool: 'inline-source-map',
   module: {
     loaders: [
   { test: /\.jsx$/, loader: 'jsx-loader' }
     ]
   },
   resolve: {
     extensions: ['', '.js', '.jsx']
   }
};
