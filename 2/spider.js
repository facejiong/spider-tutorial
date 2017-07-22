// login
// 1、login request with username and password
// 2、get set-cookie from login response
// 3、request page which need login with cookie

const axios = require('axios')
const cheerio = require('cheerio')
const querystring = require('querystring');

const indexUrl = "http://www.apic.in/"
const loginUrl = "http://www.apic.in/wp-admin/admin-ajax.php"
const loginParams = {
    action: 'ajax_login',
    username: 'wangjiong',
    password: 'wangjiong',
    email: '',
    remember: 'forever',
    security: 'b96c71c39c',
    um_captcha: ''
}

function parseHtml(str) {
    const $ = cheerio.load(str, { decodeEntities: false })
        // content show when you login success
    console.log($('.fa-book'))
}

async function login(url, params) {
    const res = await axios.post(url, querystring.stringify(params))
    const Cookie = res.headers['set-cookie'].join(';')
        // set global cookie, next request will carry cookie for verification
    console.log(Cookie)
    axios.defaults.headers.common['Cookie'] = Cookie
    requestIndex(indexUrl)
}

async function requestIndex(url) {
    const res = await axios.get(url)
    parseHtml(res.data)
}

login(loginUrl, loginParams)