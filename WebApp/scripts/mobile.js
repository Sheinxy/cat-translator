const mobile = document.querySelector("#mobile");

function resize() {
    if (window.innerHeight >= window.innerWidth)
        mobile.href = "./styles/mobile.css";
    else 
        mobile.href = "./styles/desktop.css";
}

window.onresize = resize;

resize();