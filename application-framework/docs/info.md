
### Initialise project
`npm init -y`

### Install webpack and webpack-cli
`npm install --save-dev webpack webpack-cli`

### Add scripts in `package.json`
```javascript
  "scripts": {
    "start": "webpack --mode=development",
    "build": "webpack --mode=production"
  },
```


This --mode=development can also be added in `webpack.config.js` as following
```javascript
  module.exports = {
    mode: 'development',
  };
```

### Configuring Webpack for React
`npm install react react-dom`
`npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react`

### Configure CSS and CSS modules
`npm install --save-dev style-loader css-loader`


### Configuring webpack and babel

Create `babel.config.json` in the root folder and put
```json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "esmodules": true
          }
        }
      ],
      [
        "@babel/preset-react",
        {
          "runtime": "automatic"
        }
      ]
    ]
  }
```

Create webpack.config.js and put

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};

```

### Extract the CSS to its own styles.css

`npm install --save-dev mini-css-extract-plugin`

Put the plugins in the `webpack.config.js`

```javascript

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

plugins: [
  new MiniCssExtractPlugin(),
]
```

### Configure the .css and module.css to be used together in webpack

Put the following in the `webpack.config.js`, the file will look like

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // For enabling .module.css files
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // modules: true,
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      // for enabling .css file only
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of "style-loader",
          "css-loader",
        ],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
```

### Specifying the entrypoint to the application
```javascript
module.exports = {
  // Entry point to the application
  entry: ["./src/index.js"],
}
```

### Cleaning up the dist folder after every build

```javascript

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
}

```

### Add Support for SVG Icons
`npm install --save-dev @svgr/webpack`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
    ],
  },
}
```

To enable using Svg as both image and React component
`npm install url-loader --save-dev`

```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            { loader: "@svgr/webpack", options: { icon: true } },
            "url-loader",
          ], // use url-loader to import svg as image
        },
      ]
    }
  }

  // Implementation will be
  import Download, { ReactComponent as DownloadIcon } from "./assets/icons/download.svg";

  // Use svg as react component:
  <DownloadIcon style={{ height: 40, width: 40, color: "green" }} />

  // Use svg as image
  <img
    src={Download}
    alt="download"
    style={{ height: 40, width: 40, color: "green" }}
  />
```


Note - The above method is deprecated and use the following method
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      },
    ],
  },
}

```

### Add assets
```javascript
  module.exports = {
    module: {
      rules: [
        // images (png/jpg/gif) loader, it will be stored into the path specified under output for assetModuleFilename
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
        // webp loader
        {
          test: /\.webp$/i,
          type: "asset/resource",
          generator: {
            filename: "static/[hash][ext][query]", // for storing the webp in static folder inside dist
          },
        },
      ]
    },
    output: {
      assetModuleFilename: "images/[hash][ext][query]", // for storing the assets in images folder inside dist
    },
  }

```

### (Optional) - Add devServer into webpack.config.js

```javascript
module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  }
}
```

### Install tailwind with webpack
Install loaders `npm i --save-dev postcss postcss-loader postcss-preset-env`
Install tailwindcss as peer dependency using `npm install --save-peer tailwindcss`

Add the `postcss-loader` in the `/\.css$/` rule.
```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of "style-loader",
          "css-loader",
          "postcss-loader",
        ],
        exclude: /\.module\.css$/,
      },
    ],
  },

```

Create a `tailwind.config.js` file in the root of the project and put the following configuration

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

```

Now create `postcss.config.js` file in the root of the project and put the following configuration
```javascript
const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: ["postcss-preset-env", tailwindcss],
};
```
Create a css file in `src/global.css` and put
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import this file in the root entry `src/index.js` of the project
```javascript
import './global.css';
```
Run npm run build or npm start to start the project and see the changes.


### Configure Environment variables with the webpack
Install `dotenv-webpack` package using `npm install --save-dev dotenv-webpack`
Create two files in the root of the project and put the `env_variables`

`.env`
FOO=bar-prod
API_URL=https://www.xyz-prod.com/

`.env.development`
FOO=bar-dev
API_URL=https://www.xyz-dev.com/

Update the `webpack.config.js` file, by adding the `Dotenv` plugin and use function syntax. You can also use the implicit return instead of using `return` explicitly.

```javascript
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  return {
    // ...
    // ...
    plugins: [
      new Dotenv({
        path: `./environments/.env${env.file ? `.${env.file}` : ''}`
      }),
      ...
      ...
    ]
  }
}

```

Update the package.json script
```json
  "scripts": {
    "start": "webpack serve --mode=development --env file=development",
    "build": "webpack --mode=production"
  }
```
