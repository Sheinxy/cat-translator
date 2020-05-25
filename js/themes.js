const default_theme = 'white'
const buttons = document.querySelectorAll('.theme-button');
const icon = document.querySelector('.theme-icon');

let current_theme = localStorage.getItem('theme') || default_theme;
document.body.classList.toggle(current_theme, true);

function switch_theme() {
    const current_button = document.querySelector(`#${current_theme}-theme`);
    buttons.forEach( (button, i) => {
        if( button === current_button) {
            const next_theme =  buttons[(i + 1) % buttons.length].id.match(/(.+)-theme/)[1];
            change_theme(next_theme);
        }
    });
}

function change_theme(next_theme) {
    document.body.classList.toggle(current_theme, false);
    current_theme = next_theme;
    document.body.classList.toggle(current_theme, true);
    localStorage.setItem('theme', current_theme);
}

buttons.forEach( button => {
    button.addEventListener('click', () => change_theme(button.id.match(/(.+)-theme/)[1]));
    console.log("Done");
});

icon.addEventListener('click', switch_theme);