const express = require('express');
const app = express();
const path = require('path');
const result = require('./utils/result')

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));

app.get('/results',(req,res)=>{
    if(!req.query.htno){
        return res.send({
            error:"Please provide a hall ticket number"
        })
    } 
    result(req.query.htno,(error,response)=>{
        if(error){
            return res.send(error);
        }
        if(response.statusCode === 500){
            return res.send({
                error:"Please provide a valid hall ticket number"
            })
        }
        res.send(response.body);
    })
})


app.listen(port,()=>{
    console.log('server is up on port ',port)
})