const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')


const data = require('./urls.json')

function writeFile(cb){
     fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
        if(err) throw err
    
        cb(JSON.stringify({message: "ok"}))
     }    
    )
}


http.createServer((req,res) =>{



    const { name, url, del } = URL.parse(req.url, true).query
     
    
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    if(!name || !url)
        return res.end(JSON.stringify(data))
        
    if(del){
        //todo item que não for igual ao que está na url será preservado e aquele que for igual será esquecido.
        data.urls = data.urls.filter(item => String(item.url) !== String(url)) //--> exclusão
             
        return writeFile((messagem) =>  res.end(messagem))
       
    }    
    
    data.urls.push({name, url})
    return writeFile((messagem) => res.end(messagem))   
}).listen(4000)


