const form = document.querySelector('#search-btn')
const content = document.querySelector(".contentPage")
const table = document.getElementById("blood_bank_table")
form.addEventListener('click',(e)=>{
    const key = document.querySelector('#searchBy').value
    const value = document.querySelector('#searchKey').value
        const url = "https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15?api-key=579b464db66ec23bdd00000129d0b4eb7b284a5e69258ef4eb5b37a5&format=json&offset=0&limit=100&filters["+key+"]="+value
        e.preventDefault()
        
        fetch(url).then((response)=>{
            response.json().then((data)=>{
                // content.textContent = JSON.stringify(data.records[0])
                // console.log(data.records[0]["__state"])
                console.log(data.records.length)
                for(let i=0;i<data.records.length;i++){
                    var row = table.insertRow(-1)
                    var name = data.records[i]["_blood_bank_name"]
                    console.log(name)
                    var pincode = data.records[i]["_pincode"]
                    var addr = data.records[i]["__address"]
                    var contact = data.records[i]["_mobile"]
                    var email = data.records[i]["_email"]
                    var cell1 = row.insertCell(0)
                    var cell2 = row.insertCell(1)
                    var cell3 = row.insertCell(2)
                    var cell4 = row.insertCell(3)
                    var cell5 = row.insertCell(4)
                    cell1.innerHTML = name
                    cell2.innerHTML = pincode
                    cell3.innerHTML = addr
                    cell4.innerHTML = contact
                    cell5.innerHTML = email
                }
            })
        })
    })
    
