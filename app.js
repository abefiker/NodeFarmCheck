const express = require('express');
const fs = require('fs')
const app = express()
app.use(express.json())
// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server side', app: 'natours' })
// })
// app.post('/', (req, res) => {
//     res.send('Post will be perform at this endpoint ')
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours: tours
        }
    })
})
app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params)
    const id = req.params.id*1
    const tour = tours.find(el => el.id === id)
    res.status(200).json({
        status:'success',
        data:{
            tour: tour
        }
    })
})
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
    console.log(req.body);
})
const port = 3000
app.listen(port, () => {
    console.log(`App listening on ${port}...`)
})