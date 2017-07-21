// a simple example
// 1、get html data
// 2、parse html string to DOM model
// 3、use DOM model to obtain target data
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
  axios({
    method:'get',
    url,
  })
  .then(function(response) {
    // print html string data
    console.log(response.data)
    parseHtml(response.data)
  })
}

requestHtml(url)
