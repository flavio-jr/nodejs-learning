const http = require('http')
const queryString = require('querystring')

const server = http.createServer().listen(8124)

server.on('request', (req, res) => {
    
    if (req.method == 'POST') {
        let body = '';

        req.on('data', data => body += data)

        req.on('end', () => {
            let post = queryString.parse(body)
            console.log(post)

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            
            res.end('Hello world\n')
        })

        return
    }

    res.end('Hello world\n')
})

console.log('Server running on 8124')