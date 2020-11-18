const form = document.querySelector('form');
const weatherLocationJS = document.querySelector('input')
const errorMessageJS = document.querySelector('#errorMessage')
const successMessageJS = document.querySelector('#successMessage')

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    successMessageJS.textContent = 'getting your forcast for ' + weatherLocationJS.value + ' ...'


    fetch('/weather?address='+weatherLocationJS.value).then(
        (response) =>{
            response.json().then((data)=>{
                if (data.error){
                    errorMessageJS.textContent = weatherLocationJS.value + ' not found, enter different location.'
                }else {
                    successMessageJS.textContent = data.forecast
                }                                    
            })
        }
    )    
})