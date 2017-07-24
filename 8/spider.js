const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const async = require('async')

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
    const downloadImages = []
    Object.keys(imageList).forEach(function(element) {
        if (imageList[element].attribs !== undefined) {
            let imgUrl = imageList[element].attribs.src
            let filename = Buffer.from(imgUrl).toString('base64') + '.jpg'
            downloadImages.push({imgUrl, filename})
        }
    })
    async.mapLimit(downloadImages, 2, function(one, callback){
        downloadImage(one, callback);
     }, function(err,result){
         if(err){
             console.log(err);
         }else{
             // console.log(result);<=会输出一个有2万多个“successful”字符串的数组
             console.log("全部已下载完毕！");
         }
     });
}

function downloadImage(one, callback) {
    console.log(`开始下载：${one.imgUrl}`)
    axios({
            method: 'get',
            url: one.imgUrl,
            responseType: 'stream'
        })
        .then(function(response) {
            response.data.pipe(fs.createWriteStream('./images/' + one.filename))
            callback(null,"successful !");
        });
}
requestHtml(url)
