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
        let productArray =  JSON.parse(products);
       let product = productArray.find((item) => 
           {
            return  item.id == path.query.id ;
           }
         )
         if(product!=undefined){
            res.end(JSON.stringify(product))
         }
        else{
            res.end(JSON.stringify({"message":"product not found"}))
        }
        
    }
    else if(req.method == "POST" && path.pathname == "/products"){

        let product = "";
         req.on("data",(chunk)=>{
            product = product+chunk;
            console.log(product)
            
         })
         req.on("end",() => {
            let productArray =  JSON.parse(products);
            const newProduct = JSON.parse(product)
            productArray.push( newProduct);
            fs.writeFile("./products.json", JSON.stringify(productArray), (err)=> {
                if(err == null){
                    res.end(JSON.stringify({"message":"new product added"}))
                }
            })
         })
         res.end("psot method")
    }
   
  
}).listen(8000)