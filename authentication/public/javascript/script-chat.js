// On se connecte au serveur socket
const socket = io();
const MAIN_SALON = "Lacoding"
// On gère l'arrivée d'un nouvel utilisateur
socket.on("connect", () => {
    socket.emit("new_user", {
        pseudo: document.getElementById("name").value,
        mail: document.getElementById("mail").value,
        room: MAIN_SALON,
        connectionDate: new Date()
    });

    // On émet un message d'entrée dans une salle
    socket.emit("enter_room", MAIN_SALON);
});


window.onload = () => {
    // On écoute l'évènement submit
    document.querySelector("form").addEventListener("submit", (e) => {
        // On empêche l'envoi du formulaire
        e.preventDefault();
        const name = document.querySelector("#name")
        const message = document.querySelector("#message");
        // On récupère le nom de la salle
        const room = document.querySelector("#tabs li.active").dataset.room;
        const createdAt = new Date();

        // On envoie le message
        socket.emit("chat_message", {
            name: name.value,
            message: message.value,
            room: room,
            createdAt: createdAt
        });

        // On efface le message
        document.querySelector("#message").value = "";
    });

    // On écoute l'évènement "received_message"
    socket.on("received_message", (msg) => {
        publishMessages(msg);
    })

    socket.on("new_user_saved", (user) => {
        publishUser(user);
    })

    // On écoute le clic sur les onglets
    document.querySelectorAll("#tabs li").forEach((tab) => {
        tab.addEventListener("click", function(){
            // On vérifie si l'onglet n'est pas actif
            if(!this.classList.contains("active")){
                // On récupère l'élément actuellement actif
                const actif = document.querySelector("#tabs li.active");
                actif.classList.remove("active");
                this.classList.add("active");
                document.querySelector("#messages").innerHTML = "";
                // On quitte l'ancienne salle
                socket.emit("leave_room", actif.dataset.room);
                // On entre dans la nouvelle salle
                socket.emit("enter_room", this.dataset.room);
            }
        })
    });

    // On écoute l'évènement "init_messages"
    socket.on("init_messages", msg => {
        let data = JSON.parse(msg.messages);
        if(data != []){
            data.forEach(donnees => {
                publishMessages(donnees);
            })
        }
    });

    socket.on("init_users", data => {
        let users = JSON.parse( data.users);
        if(users && users.length){
            users.forEach(user => {
                publishUser(user);
            })
        }
    });

    // On écoute la frappe au clavier "User est en train d'écrire"
    document.querySelector("#message").addEventListener("input", () => {
        // On récupère le nom
        const name = document.querySelector("#name").value;
        // On récupère le salon
        const room = document.querySelector("#tabs li.active").dataset.room;

        socket.emit("typing", {
            name: name,
            room: room
        });
    });

    // On écoute les messages indiquant que quelqu'un tape au clavier
    socket.on("usertyping", msg => {
        const writing = document.querySelector("#writing");

        writing.innerHTML = `${msg.name} est en train d'écrire...`;

        setTimeout(function(){
            writing.innerHTML = "";
        }, 5000);
    });
}


function date2char(val){
    return (val<10 ? "0" + val : val)
}

function publishMessages(msg){
    let created = new Date(msg.createdAt);
    let texte = `<div><p>${msg.name} <small>${created.toLocaleDateString() + " à " + date2char(created.getHours()) + ":" + date2char(created.getMinutes()) + ":" + date2char(created.getSeconds())}</small></p><p>${msg.message}</p></div>`

    document.querySelector("#messages").innerHTML += texte;
}

function publishUser(user){
    console.log(user)
    let texte = `<div id="user-${user.pseudo}" style="cursor:pointer;">${user.pseudo}</div>`
    document.querySelector("#userList").innerHTML += texte;
}