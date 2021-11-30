// const requests_json = `{{ requests }}`
// const requests_str = JSON.parse(requests_json)

const request_body = document.getElementById("request_body")
var requests=null
$.get('/Blood-Bud/user/history',(data)=>{
   requests= data.requests
})
console.log(requests)
// for(let i=0;i<requests_str.length;i++){
//     var row = request_body.insertRow(-1)

// }