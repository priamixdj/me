
let mouse = document.getElementById('mouse');
let mousePosition = { x: 0, y: 0 };

document.addEventListener('mousemove', (event) => {
    
    mousePosition.x = (event.clientX) - 40;
    mousePosition.y = (event.clientY) - 150;

    mouse.style.transform = "translateX(" + mousePosition.x + "px) translateY(" + mousePosition.y + "px)";
});