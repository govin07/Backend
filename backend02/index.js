const http = require('http');



// creating a  server
http.createServer((req, resp )=>{
    // console.log(req.url)
    if(req.method === "PUT"){
        console.log("this is not get method")
    }
    // console.log(req.method)
    resp.end("this is first response")
  
}).listen(8000)