// @flow
/* eslint-disable no-console */
require("babel-polyfill")
const another: () => void = require("./another-file")

console.log("Hello")
another()
