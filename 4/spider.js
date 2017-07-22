// change User-Agent
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://www.apic.in/'

axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'

function requestHtml(url) {
    axios({
            method: 'get',
            url,
        })
        .then(function(response) {
            // print headers
            console.log(response)
        })
}

requestHtml(url)