const args = process.argv.slice(2)
const PORT = args[0] || 8088 
const HOST = "127.0.0.1" // http:/127.0.0.1:8088
const http = require("http")
const fs = require("fs")


const server = http.createServer((req, res) => {
  	if (req.method == 'POST') {
	    let body = ''
	    req.on('data', function(data) {
	      body += data
	    })
	    req.on('end', function() {
	      res.writeHead(200, {'Content-Type': 'text/html'})
	      res.end(body.toUpperCase())
	    })
	}
});

server.listen(PORT) 



// solution 
/*
 const http = require('http')
    const map = require('through2-map')
    
    const server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }
    
      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))
*/