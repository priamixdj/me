document.getElementById('myForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    inviaEmail(luogo); 
});


function inviaEmail(luogo) {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var messaggio = document.getElementById('messaggio').value;;

    var parametri = {
        nome: nome,
        email: email,
        messaggio: messaggio,
    };

    var conferma = confirm("Sei sicuro di voler inviare i dati? " +
        "\nNome: " + nome + 
        ",\nEmail: " + email + 
        ",\nMessaggio: " + messaggio
    );

    if (!conferma) {
        alert("Invio annullato.");
        return;
    }

    emailjs.send("service_k1y60nq","template_oko65oh", parametri)
        .then(function(response) {
            alert("Mail inviata con successo!");
        }, function(error) {
            alert("Errore durante l’invio: " + JSON.stringify(error));
        });
}