const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const config = {
  mode: isEnvProduction ? 'production' : 'development', // 'development',
  entry: {
    main: './index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // library: ['RemoteComponent'],
    libraryTarget: 'umd',
  },
  optimization: {
    usedExports: true,
		minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/env",
                  {
                    "targets": {
                      // we use uglify in webpack
                      "uglify": true,
                      "browsers": [
                        "Chrome >= 43",
                        "Explorer 11"
                      ]
                    },
                    "modules": false,
                    "loose": true
                  }
                ],
                "@babel/react",
              ],
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    "legacy": true
                  }
                ],
                ["@babel/plugin-proposal-class-properties"]
              ]
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: "css-loader" },
          { loader: 'postcss-loader' },
          {
            loader:'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.module.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: false,
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: "css-loader" },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.woff|.woff2$/,
        exclude: [/node_modules/, /src\/modules\/select/],
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
            options: {
              removingTagAttrs: ["fill", "fill-rule", "style"]
            },
          }
        ]
      },
    ]
  },
  plugins: [
    // new UglifyJSPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
	externals: {
		react: 'react',
		'react-dom' : 'react-dom'
	},
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  watch: false
};


module.exports = config;
