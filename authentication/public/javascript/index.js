window.addEventListener("DOMContentLoaded", () => {
    console.log('ok')
    bindingInput()
    })

    function bindingInput(){
        var deleteButtons = document.querySelectorAll('.btn-danger');
        var balise = document.getElementById('userList')
        console.log(deleteButtons)
        deleteButtons.forEach( button =>{
            button.addEventListener('click', event =>{
                var value = event.target.getAttribute('UserId')
                console.log(value)
                axios.delete("/user/"+value).then( function(template){
                console.log(template.data)
                balise.innerHTML = template.data
                bindingInput()
                })
            })
        })
    }