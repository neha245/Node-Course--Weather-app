console.log('Client side js file loaded and working correctly!!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const successMessage = document.querySelector('#success')
const errorMessage = document.querySelector('#error')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    successMessage.textContent = 'Loading.....'
    errorMessage.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then(response=> {
        response.json().then(data => {
            if(data.error)
            {
                
                errorMessage.textContent = data.error
                successMessage.textContent = ''
                return console.log(data.error)
            }
            
            else
            {
                successMessage.textContent = data.location
                errorMessage.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }

        }) 
    })
})
