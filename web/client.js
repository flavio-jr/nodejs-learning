const http = require('http')
const queryString = require('querystring')

const postData = queryString.stringify({
    msg: 'Hello world!'
})

const options = {
    hostname: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
}

const req = http.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode)
    console.log('HEADERS: ' + JSON.stringify(res.headers))

    res.setEncoding('utf8')

    res.on('data', chunk => console.log('BODY: ' + chunk))

    res.on('end', () => console.log('No more data in response'))
})

req.on('error', err => console.log('problem with request: ' + e.message))

req.write(postData)
req.end()