// a simple example with proxy

const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://www.apic.in/'

function parseHtml(str) {
  // parse html to DOM model
  // decodeEntities
  const $ = cheerio.load(str, {decodeEntities: false})
  // use selectors
  const title = $('#logo > a').html()
  console.log(title)
}

function requestHtml(url) {
  axios.request({
    method:'get',
    url,
    proxy: {
      host: "220.162.73.228",
      port: 808
    }
  })
  .then(function(response) {
    // print html string data
    console.log(response)
    parseHtml(response.data)
  })
}

requestHtml(url)
