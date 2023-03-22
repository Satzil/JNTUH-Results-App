const axios = require('axios');


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