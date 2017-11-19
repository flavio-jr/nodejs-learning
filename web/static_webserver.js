const http = require('http')
const fs = require('fs')
const mime = require('mime')
const base = 'examples/public_html'

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')

    let pathname = base + req.url
    let type = mime.lookup(pathname)

    fs.stat(pathname, (err, stats) => {
        if (err) {
            console.log(err)
            res.writeHead(404)
            res.write('Resource missing 404\n')
            
            return
        }

        res.setHeader('Content-Type', type)
        
        let file = fs.createReadStream(pathname)
        
        file.on('open', () => {
            res.statusCode = 200
            file.pipe(res)
        })
    
        file.on('error', err => {
            res.writeHead(403)
            res.write('file missing or permission deniend')
            console.log(err)
        } )
    })

}).listen(8124)

console.log('Server running at 8124')