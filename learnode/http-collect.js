const args = process.argv.slice(2)
const url = args[0]
const https = require('http');

https.get(url, (resp) => {
  let data = '';
  resp.setEncoding("utf-8")
  // Un morceau de réponse est reçu
  resp.on('data', (chunk) => {
    data += chunk
  });

  // La réponse complète à été reçue. On affiche le résultat.
  resp.on('end', () => {
    console.log(data.split("").length);
    console.log(data)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});



//solution
/**
 const http = require('http')
const bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err)
    }
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})
 * */