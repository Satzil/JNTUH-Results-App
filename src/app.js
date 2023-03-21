const express = require('express');
const app = express();
const path = require('path');
const result = require('./utils/result')

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.json())
app.use(express.static(publicDirectoryPath));

app.get('/results/:id',(req,res)=>{
    if(!req.params.id){
        return res.send({
            error:"Please provide a hall ticket number"
        })
    } 
    result(req.params.id,(error,response)=>{
        if(error){
            return res.send({
                error:"error"
            });
        }
        if(response.statusCode === 500){
            return res.send({
                error:"Please provide a valid hall ticket number"
            })
        }
        res.send(response.data);
    })
})


app.listen(port,()=>{
    console.log('server is up on port ',port)
})