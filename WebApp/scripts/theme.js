const theme = document.querySelector("#theme");
const button = document.querySelector("#themeButton");

let current = getCookie('theme') ? getCookie('theme') : 'light';
theme.href = `./styles/${current}.css`;

function changeTheme() {
    if(current === "dark"){
        current = 'light';
        button.innerHTML = 'Dark Theme';
    }
    else {
        current = 'dark';
        button.innerHTML = 'Light Theme';
    }
    setCookie('theme', current, 365)
    theme.href = `./styles/${current}.css`;
}