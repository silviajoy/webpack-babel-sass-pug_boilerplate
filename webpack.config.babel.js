import path from 'path';  
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {  
    dev: true,
    production: false,
};

export default (env = defaultEnv) => ({  
  entry: [
   ...env.dev ? [
      'webpack-dev-server/client?http://localhost:8080',
    ] : [],
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '../../dist/vindielio.it'),
    filename: '[name].bundle.js',
  },
  plugins: [
    ...env.dev ? [
      // Webpack Development Plugins
      new HotModuleReplacementPlugin(),
    ] : [
      new ExtractTextPlugin('[name].css'),
    ],
    new HtmlWebpackPlugin({
        title: 'Vin di Elio',
        filename: 'index.html',
        template: './src/pug/index.pug'
    })
  ],
  module: {
    rules: [
     {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
             presets: ['es2015']
         }
      },
      {
       test: /\.scss$/,
       use: [
         'style-loader',
         'css-loader',
         'sass-loader'
       ]
     },
     {
       test: /\.pug/,
       use: [
        'html-loader', 
        'pug-html-loader'
      ]
     },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
      test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  devServer: {
    hot: env.dev,
    historyApiFallback: env.dev,
  },

});

