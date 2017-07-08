const path = require("path")
const fs = require("fs")

// -- Webpack configuration --

const config = {}

// Application entry point
config.entry = "./src/index.js"

// We build for node
config.target = "node"

// Node module dependencies should not be bundled
config.externals = fs.readdirSync("node_modules").reduce(function(acc, mod) {
  if (mod === ".bin") {
    return acc
  }

  acc[mod] = "commonjs " + mod
  return acc
}, {})

// We are outputting a real node app!
config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false,
}

// Output files in the dist/ folder
config.output = {
  path: path.join(__dirname, "dist"),
  filename: "[name].js",
}

config.module = {}

config.module.loaders = [
  {
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },

  // Use babel and eslint to build and validate JavaScript
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },

  // Allow loading of JSON files
  {
    test: /\.json$/,
    loader: "json",
  },
]

module.exports = config
