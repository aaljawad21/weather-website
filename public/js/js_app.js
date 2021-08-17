



const weatherdata = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//message1.textContent = 'From Javascript'

weatherdata.addEventListener('submit', (e)=>{
e.preventDefault()
fetch('/weather?address='+search.value).then((response)=>{

    response.json().then((data) => {
message1.textContent = 'The temperature in ' + data.city + ' is ' +data.temperature +' degrees'
search.value =''

 })
    })

})