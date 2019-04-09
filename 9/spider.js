// a simple example with proxy

const axios = require('axios')
const cheerio = require('cheerio')

const ipUrl = 'http://www.66ip.cn/mo.php?tqsl=100'
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'

function parseIPHtml(str) {
  // parse html to DOM model
  // decodeEntities
  const $ = cheerio.load(str, {decodeEntities: false})
  // use selectors
  const strBody = $('body').html()
  const ipArr = strBody.split('<br>\n\t\t')
  ipArr.forEach(c => {
    const ipPort = c.split(':')
    const pageUrl = 'https://www.toutiao.com/i6677773821191127564/'
    requestHtml(pageUrl, ipPort[0], parseInt(ipPort[1], 10))
  })
  // console.log(strBody.split('<br>\n\t\t'))
}

function requestIPHtml(url) {
  axios.request({
    method:'get',
    url,
  })
  .then(function(response) {
    // print html string data
    parseIPHtml(response.data)
  })
}

function requestHtml(url, host, port) {
  console.log(host + ':' + port)
  axios.request({
    method:'get',
    url,
    proxy: {
      host,
      port
    }
  })
  .then(function(response) {
    // print html string data
    // parseHtml(response.data)
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })
}

requestIPHtml(ipUrl)
