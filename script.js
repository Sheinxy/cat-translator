const humanText = document.getElementById("humanText");
const catText = document.getElementById("catText");

//This charset is the set of all characters that can be translated
//This charset is divided in 4 subsets
const charset = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", ".", ",", "!", "?",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//This indicates the subset the programm is currently in
const setNumber = ["Mi", "Me", "Mo", "Mu"];

//This is the equivalent for each character is a subset
const catEquivalent = ["meow", "miaw", "miou", "miew", "mew", "miow", "miuw", "maou", "mow", "miu"];

function humanChanged() {
    const text = humanText.value;
    let translation = "";
    let currentSubSet = -1;

    for (let char of text) {
        const normalizedChar = char.toLowerCase();
        const charIndex = charset.indexOf(normalizedChar);
        if (charIndex <= -1) 
            translation += char;
        else {
            const isUpper = (normalizedChar == char) ? false : true;
            const subSet = Math.floor(charIndex / 10);
            if (subSet != currentSubSet) {
                translation += setNumber[subSet];
                currentSubSet = subSet;
            }
            const subIndex = charIndex % 10;
            translation += (isUpper) ? catEquivalent[subIndex].toUpperCase() : catEquivalent[subIndex];
        }
    }
    catText.value = translation;
}

function catChanged() {
    const text = catText.value;
    let translation = "";
    let subSet = 0;

    const searchSub = /(Mi|Me|Mo|Mu)/g;
    let splitted = text.split(searchSub);
    for (let i = 0; i < splitted.length; i++) {
        if (i % 2 == 1)
            subSet = setNumber.indexOf(splitted[i]);
        else {
            for (let j = 0; j < catEquivalent.length; j++) {
                const cat = catEquivalent[j];
                const re = new RegExp(cat, 'g');
                const reUp = new RegExp(cat.toUpperCase(), 'g');
                splitted[i] = splitted[i].replace(re, charset[subSet * 10 + j])
                    .replace(reUp, charset[subSet * 10 + j].toUpperCase());
            }
            translation += splitted[i];
        }
    }
    humanText.value = translation;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function darkMode() {
    const body = document.body;
    const header = document.body.getElementsByTagName("header")[0];
    const button = document.getElementById("darkMode");

    dark = !dark;

    const prefix = dark ? 'dark' : 'light';

    body.className = `${prefix}body`;
    header.className = `${prefix}header`;
    catText.className = `${prefix}textarea`;
    humanText.className = `${prefix}textarea`;

    const next = dark ? 'Light' : 'Dark';
    button.textContent = `${next} Mode`

    document.cookie = `dark=${dark};`;
}

let dark = (getCookie("dark") == 'true') ? false : true;
darkMode();