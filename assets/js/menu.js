menu = document.getElementById('menu')
hamburgher_menu = document.getElementById('hamburger_menu');

click_menu = document.querySelectorAll('nav li a');

click_menu.forEach(element => {
    element.addEventListener('click', toggleMenu);
});


function toggleMenu() {
    menu.classList.toggle('open');
    hamburgher_menu.classList.toggle('open');
}

