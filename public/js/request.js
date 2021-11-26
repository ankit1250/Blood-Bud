
var blood_banks = document.querySelector('#blood_banks')
function myFunc(){
    var value = document.getElementById('location').value;
        var key= document.querySelector("#searchBy").value
        var url = "https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15?api-key=579b464db66ec23bdd00000129d0b4eb7b284a5e69258ef4eb5b37a5&format=json&offset=0&limit=100&filters["+key+"]="+value
        fetch(url).then((res)=>{
           res.json().then((data)=>{
               blood_banks.innerHTML = `<option value="" disabled selected>Choose Blood Bank</option>`
               for(let i=0;i<data.records.length;i++){
                   var option = document.createElement('option')
                   option.value = data.records[i]['_blood_bank_name']
                   option.textContent = data.records[i]['_blood_bank_name']
                   blood_banks.appendChild(option)
               }
           })
        })
}
