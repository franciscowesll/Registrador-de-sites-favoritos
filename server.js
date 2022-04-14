const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const data = require('./api/urls.json')
const { send } = require('process')





http.createServer((req,res) =>{

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    const extname = path.extname(filePath)

    
    const allowedFileTypes = ['.html', '.css', '.js']
    const allowed = allowedFileTypes.find(item => item == extname)

   if(!allowed) return 
    
    fs.readFile(
        filePath,
        (err, conteudo) => {
            if(err) throw err

            res.end(conteudo)
        }
    )

      
    

      

     
    

}).listen(5000)