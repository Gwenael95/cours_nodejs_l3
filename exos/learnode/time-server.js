const args = process.argv.slice(2)
const PORT = args[0] || 8088 
const HOST = "127.0.0.1" // http:/127.0.0.1:8088
const net = require("net")

function filtreDate(date, sepDate="-"){
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours()  
    let minutes = date.getMinutes() 
    return date.getFullYear() + sepDate + date2char(month) + sepDate +  date2char(day) + " " +  date2char(hours) + ":" +  date2char(minutes) ;
}

function date2char(val){
	return (val<10 ? "0" + val : val)
}

const server = net.createServer(function (clientSocket) {  
		clientSocket.on("error", (err)=>{
			console.log(err.message)
		})
		clientSocket.on("close", (hadError)=>{
			clientSocket.write("")		
		})
		clientSocket.on("end", ()=>{
		})	
		const now = filtreDate(new Date(), sepDate="-")
		clientSocket.write(now + "\n")

		clientSocket.close()
     })  
server.listen(PORT) 



// solution
/*

  const net = require('net')
    
    function zeroFill (i) {
      return (i < 10 ? '0' : '') + i
    }
    
    function now () {
      const d = new Date()
      return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
    }
    
    const server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })
    
    server.listen(Number(process.argv[2]))
*/
