const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const url = 'http://www.apic.in/'

function requestHtml(url) {
    axios({
            method: 'get',
            url,
        })
        .then(function(response) {
            // print html string data
            parseHtml(response.data)
        })
}

function parseHtml(str) {
    // parse html to DOM model
    // decodeEntities
    const $ = cheerio.load(str, { decodeEntities: false });
    // use selectors
    const imageList = $('.content > a > img')
        // console.log(imageList)
    Object.keys(imageList).forEach(function(element) {
        if (imageList[element].attribs !== undefined) {
            let imgUrl = imageList[element].attribs.src
            let filename = Buffer.from(imgUrl).toString('base64') + '.jpg'
            downloadImage(imgUrl, filename)
        }
    })
}

function downloadImage(url, filename) {
    axios({
            method: 'get',
            url,
            responseType: 'stream'
        })
        .then(function(response) {
            response.data.pipe(fs.createWriteStream('./images/' + filename))
        });
}
requestHtml(url)