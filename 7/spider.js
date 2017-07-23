const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/SPIDER_TEST')
const Title = mongoose.model('Title', { title: String })
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
    const titleList = $('.content > a')
        // console.log(titleList)
    Object.keys(titleList).forEach(function(element) {
        if (titleList[element].attribs !== undefined) {
            let title = titleList[element].attribs.title
            saveTilte(title)
        }
    })
}

function saveTilte(title) {
    const one = new Title({ title: title })
    one.save(function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('insert title into mongodb success:' + title)
        }
    })
}
requestHtml(url)