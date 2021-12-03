window.addEventListener("DOMContentLoaded", () => {
console.log('ok')
bindingInput()
})

function bindingInput(){
    let deleteButtons = document.querySelectorAll('.btn-danger');
    let balise = document.getElementById('userList')
    console.log(deleteButtons)
    deleteButtons.forEach( button =>{
        button.addEventListener('click', event =>{
            let value = event.target.getAttribute('UserId')
            console.log(value)
            axios.delete("/user", {data:{userId:value}}).then( function(template){
            console.log(template.data)
            balise.innerHTML = template.data
            bindingInput()
            })
        })
    })
}