const args = process.argv.slice(2)
const PORT = args[0] || 8088 
const HOST = "127.0.0.1" // http:/127.0.0.1:8088
const http = require("http")
const fs = require("fs")
const url = require("url")

const server = http.createServer((req, res) => {
    const currentUrl  = req.url.split("?")[0] //new URL(req.url)
    const queryObject = url.parse(req.url,true).query;
    const date = queryObject["iso"]
    let result =  {}

    if (req.method == 'GET') {
      const newDate = new Date(date)
      
      if(currentUrl === "/api/parsetime" && date){
        result =  {
         "hour": newDate.getHours(),  
         "minute": newDate.getMinutes(),  
         "second": newDate.getSeconds()  
        } 
      }
      else if(currentUrl === "/api/unixtime" && date){
      result =  {
         "unixtime": newDate.getTime()
        } 
      }

      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(result))
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end("not found")
  }
});


server.listen(PORT) 

//solution
/*
 const http = require('http')
    
function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime: time.getTime() }
}

const server = http.createServer(function (req, res) {
  const parsedUrl = new URL(req.url, 'http://example.com')
  const time = new Date(parsedUrl.searchParams.get('iso'))
  let result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
*/
