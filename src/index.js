// @flow
/* eslint-disable no-console */
require("babel-polyfill")
const fs = require("fs")
const fetch = require("node-fetch")
const glob = require("glob")
const FormData = require("form-data")

const result = fs.readFileSync(`${process.env.PWD}/styleway.json`, "utf8")
const config = JSON.parse(result)
const { url, css, js, source, assets, ...rest } = config
glob(`${process.env.PWD}/${css}`, (err, filesCSS) => {
  glob(`${process.env.PWD}/${js}`, (err2, filesJS) => {
    glob(`${process.env.PWD}/${source}`, (err3, filesSource) => {
      glob(`${process.env.PWD}/${assets}`, (err4, filesAssets) => {
        const form = new FormData()
        filesCSS.forEach(file => {
          form.append("css", fs.createReadStream(file))
        })
        filesJS.forEach(file => {
          form.append("js", fs.createReadStream(file))
        })
        filesSource.forEach(file => {
          form.append("source", fs.createReadStream(file))
        })
        filesAssets.forEach(file => {
          form.append("assets", fs.createReadStream(file))
        })
        const keys = Object.keys(rest)
        keys.forEach(key => form.append(key, rest[key]))

        fetch(`${config.url}codePlugin/uploadFiles`, {
          headers: form.getHeaders(),
          method: "POST",
          body: form,
        })
          .then(res => {
            if (res.status === 200) {
              console.log("Successfully uploaded files")
            } else {
              console.log("There was an error")
              console.log(res)
            }
          })
          .catch(err5 => console.log(err5))
      })
    })
  })
})
