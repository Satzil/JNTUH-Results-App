const axios = require('axios');


// const result = (htno,callback)=>{
//     const url = ""+process.env.APIKey + htno;
//     request({url,json:true},(error,response)=>{
//         if(error){
//             callback("unable to connect to the server",undefined);
//         }else{
//             callback(undefined,response);
//         }
//     })
// }

const result = async (htno,callback)=> {
    const url = process.env.APIKey + htno
    try {
        const response = await axios.get(url);
        callback(undefined,response);
    } catch (error) {
        callback("unable to connect",undefined);
    }
}



module.exports = result;