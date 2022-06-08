var navBarTabs = document.querySelector('.nav_bar_tabs');
var closeMenu = document.querySelector('.close-menu');
var openMenu = document.querySelector('.open-menu');

openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

function show() {
    navBarTabs.style.display = 'flex';
    navBarTabs.style.top = '0';
}

function close() {
    navBarTabs.style.top = '-100%'
}