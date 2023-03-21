const request = require('request');

const result = (htno,callback)=>{
    const url = process.env.APIKey + htno;
    request({url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to the server",undefined);
        }else{
            callback(undefined,response);
        }
    })
}
module.exports = result;