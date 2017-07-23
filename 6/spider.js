// change User-Agent
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://itunes.apple.com/cn/app/%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80/id989673964'

function requestHtmlFirst(url) {
    axios({
            method: 'get',
            url,
        })
        .then(function(response) {
            // print headers
            console.log(response.headers['last-modified'])
            requestHtmlSecond(url, response.headers['last-modified'])
        })
}

function requestHtmlSecond(url, lastModified) {
    axios({
            method: 'get',
            url,
            headers: { 'If-Modified-Since': lastModified },
        })
        .then(function(response) {
            // print headers
            console.log(response)
        }).catch(function(error) {
            // 304 , 网页未更新
            console.log(error);
        });
}

requestHtmlFirst(url)