const args = process.argv.slice(2)
const PORT = args[0] || 8088 
const HOST = "127.0.0.1" // http:/127.0.0.1:8088
const FILE = args[1]
const http = require("http")
const fs = require("fs")



const server = http.createServer((req, res) => {
	const readStream = fs.createReadStream(FILE);
	readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
	// This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.end(err);
  });
  
});

server.listen(PORT) 



// solution
/*

*/
