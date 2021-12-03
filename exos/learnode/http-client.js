const args = process.argv.slice(2)
const url = args[0]
const https = require('http');

https.get(url, (resp) => {
  let data = '';
  resp.setEncoding("utf-8")
  // Un morceau de réponse est reçu
  resp.on('data', (chunk) => {
    console.log(chunk)
  });

  // La réponse complète à été reçue. On affiche le résultat.
  resp.on('end', () => {
    //console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});



//solution
/**
const http = require('http')
    
http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error)
 * */