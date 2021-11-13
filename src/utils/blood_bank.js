const request = require('request')

const blood_banks = ({key,value},callback)=>{
    const url = "https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15?api-key=579b464db66ec23bdd00000129d0b4eb7b284a5e69258ef4eb5b37a5&format=json&offset=0&limit=100&filters["+key+"]="+value

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect with the server!!',undefined)
        }else if(body.records.length==0){
            callback('No blood bank available at given location',undefined)
        }else{
            callback(undefined,body.records)
        }
    })
}

module.exports = blood_banks