const http = require('http');
const fs = require('fs');
const url = require('url');



// creating a  server
http.createServer((req, res )=>{

    let products = fs.readFileSync('./products.json','utf-8')

    const path = url.parse(req.url,true)
     
    // res.end('nothing')
    
    if(path.pathname=='/products' && path.query.id == undefined && req.method=="GET"){
       res.end(products)  
    }
    else if(path.pathname=='/products' && path.query.id !== undefined && req.method=="GET"){
        const pro =  JSON.parse(products)
        console.log(pro)
    }
   
  
}).listen(8000)