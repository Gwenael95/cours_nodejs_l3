const args = process.argv.slice(2)
const https = require('http');
const results = []
let count = 0


function httpReq (i) {
	https.get(args[i], (resp) => {
	  let data = '';
	  resp.setEncoding("utf-8")
	  // Un morceau de réponse est reçu
	  resp.on('data', (chunk) => {
	    data += chunk
	  });

	  resp.on('end', () => {
	    results[i] = data.toString()
	    count++

	    if (count === args.length) {
	     for (let i = 0; i < args.length; i++) {
		    console.log(results[i])
		  }
	    }
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}

for (let i = 0; i < args.length; i++) {
  httpReq(i)
}


//solution
/**

const http = require('http')
    const bl = require('bl')
    const results = []
    let count = 0
    
    function printResults () {
      for (let i = 0; i < 3; i++) {
        console.log(results[i])
      }
    }
    
    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err)
          }
    
          results[index] = data.toString()
          count++
    
          if (count === 3) {
            printResults()
          }
        }))
      })
    }
    
    for (let i = 0; i < 3; i++) {
      httpGet(i)
    }
 * */