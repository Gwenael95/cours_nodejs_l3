window.addEventListener("DOMContentLoaded", () => {

    var mybutton = document.querySelector('.btn-primary');

    mybutton.addEventListener('click', event =>{

        var pseudo = document.getElementById('pseudo').value;
        var password = document.getElementById('pwd').value;    
        var mail = document.getElementById('mail').value;
        var userId = event.target.getAttribute('userId')
        updateUser(userId,pseudo,password,mail)
    })

})


async function updateUser(id,ps,pwd,email){


    const reponse = await axios.patch("/home/admin/"+id+"?pseudo="+ps+"&password="+pwd+"&mail="+email)
    document.getElementById('response').innerHTML = reponse.data.res
    
}