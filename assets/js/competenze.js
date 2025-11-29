divComp = document.getElementById('container_comp');

competenze = [
    {
        titolo: "Unity 2D",
        img: "icons8-unity.svg"
    }, 
    {
        titolo: "Autocad 2D",
        img: "autodesk-svgrepo-com.svg"
    },
    {
        titolo: "C# X Unity",
        img: "icons8-c-sharp-logo.svg"
    },
    {
        titolo: "Google sheets",
        img: "icons8-google-sheets.svg"
    },
    {
        titolo: "Google Forms",
        img: "icons8-google-forms.svg"
    },
    {
        titolo: "Google Slides",
        img: "icons8-google-slides.svg"
    },
    {
        titolo: "Canva",
        img: "icons8-canva.svg"
    },
]

whriteIn(divComp)
whriteIn(divComp)

function whriteIn(div) {
    competenze.forEach(element => {
        div.innerHTML += `
            <div class="card c-com">
                <h2>` + element.titolo + `</h2>
                <img alt="unity icon" src="assets/img/icon/` + element.img + `">
            </div>
        `;
    });
}


