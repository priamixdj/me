const form = document.querySelector('#form');
const inputs = form.querySelectorAll('input');

const nomeInput = document.querySelector('#nome');
const mailInput = document.querySelector('#email');

// validation
const validation_nome = document.querySelector('#nome_validation')
const validation_mail = document.querySelector('#mail_validation');


const submit_bottom = document.querySelector('#submit');
console.log('bottone ' +  submit_bottom);

let isNomeValid = false;
let isMailValid = false;
submit_bottom.disabled = true;

nomeInput.addEventListener('input', (evet) => {
    if (nomeInput.value != null && nomeInput.value != "") {
        if (nomeInput.value.length < 3 ) {
            validation_nome.innerHTML = "Nome troppo corto!";
            validation_nome.style = "color: red";
            isNomeValid = false;
        }
        else {
            validation_nome.innerHTML = "Nome valido!";
            validation_nome.style = "color: green";
            isNomeValid = true;
        }
    } else {
        validation_nome.innerHTML = "";
        isNomeValid = false;
    }
    updateSubmitButton();
})

mailInput.addEventListener('input', (evet) => {
    if (mailInput.value != null && mailInput.value != "") {
        if (!mailInput.value.includes('@') ) {
            validation_mail.innerHTML = "incorpora la @";
            validation_mail.style = "color: red";
            isMailValid = false;
        } else if (!mailInput.value.includes('.')) {
            validation_mail.innerHTML = "incorpora il dominio";
            validation_mail.style = "color: red";
            isMailValid = false;
        }
        else {
            validation_mail.innerHTML = "Email valida!";
            validation_mail.style = "color: green";
            isMailValid = true;
        }
    } else {
        validation_mail.innerHTML = "";
        isMailValid = false;
    }
    updateSubmitButton();
})

function updateSubmitButton() {
    if (isNomeValid && isMailValid) {
        submit_bottom.disabled = false;
    } else {
        submit_bottom.disabled = true;
    }
}



// animazione
const alerts = document.getElementsByClassName('alert');

setTimeout(() => {
    Array.from(alerts).forEach(element => {
        element.classList.add('close');
    });
}, 3000);