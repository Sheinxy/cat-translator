var theme = document.querySelector("#theme");
var button = document.querySelector("#themeButton");
var icon = document.querySelector("#icon");

var current = getCookie('theme') ? getCookie('theme') : 'light';
theme.href = './styles/' + current + '.css';
icon.src = './assets/icon-' + current + '.png';

function changeTheme() {
    if (current === "dark") {
        current = 'light';
        button.innerHTML = 'Dark Theme';
    } else {
        current = 'dark';
        button.innerHTML = 'Light Theme';
    }
    setCookie('theme', current, 365)
    theme.href = './styles/' + current + '.css';
    icon.src = './assets/icon-' + current + '.png';
}