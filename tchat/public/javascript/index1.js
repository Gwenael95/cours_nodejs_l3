window.addEventListener("DOMContentLoaded", () => {

    let mybutton = document.querySelector('.btn-primary');

    mybutton.addEventListener('click', event =>{
        let pseudo = document.getElementById('pseudo').value;
        let password = document.getElementById('pwd').value;
        let mail = document.getElementById('mail').value;
        let oldMail = document.getElementById('oldMail').value
        let confirmPwd = document.getElementById('confirmPwd').value
        let role = document.getElementById('role').value
        axios.patch("/admin/user", {pseudo, password, mail, confirmPassword:confirmPwd, oldMail, role}).then(()=>{
            window.location = "/admin"
        })
    })

})
