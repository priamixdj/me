let mouse = document.getElementById('mouse');
let mousePosition = { x: 0, y: 0 };

// Controllo se il device ha un mouse
if (window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener('mousemove', (event) => {

        mousePosition.x = event.clientX - 40;
        mousePosition.y = event.clientY - 150;

        mouse.style.transform =
            `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    });

} else {
    mouse.style.display = "none";
}
