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
    let subSet = -1;

    const searchSub = /(Mi|Me|Mo|Mu)/g;
    let splitted = text.split(searchSub);
    splitted.shift();
    for (let i = 0; i < splitted.length; i++) {
        if (i % 2 == 0)
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