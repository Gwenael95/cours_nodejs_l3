window.addEventListener("DOMContentLoaded", () => {

    var mybutton = document.querySelector('.btn-primary');

    mybutton.addEventListener('click', event =>{
        var pseudo = document.getElementById('pseudo').value;
        var password = document.getElementById('pwd').value;    
        var mail = document.getElementById('mail').value;
        var value = event.target.getAttribute('userId')
        axios.patch("/home/admin/"+value+"?pseudo="+pseudo+"&password="+password+"&mail="+mail).then(()=>{
            window.history.back()
        })
    })

})
