const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
//blocking-synchronous way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)

// const textOut = `This what we know about avocado : ${textIn}\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textOut)
// console.log('File Written!')

//non-blocking -> asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) {
//         return console.log(err);
//     }
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if (err) {
//             return console.log(err);
//         }
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             if (err) {
//                 return console.log(err);
//             }
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log('Your file has been written');
//             });
//         });
//     });
// });

// console.log('Reading File ...');

//////////////////////////
///////////SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)
const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true)
    //Overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'content-type':'text/html'})
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output) 
    //Product page    
    }else if(pathname === '/product'){
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct,product)
        res.end(output)
    //Api page    
    }else if(pathname === '/api'){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(data)

    }else{
        res.writeHead(404,{
            'Content-Type':'text/html',
            'myown-header':'hello world'
        })
        res.end('<h1>Page not Found!</h1>')
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on port 8000')
})