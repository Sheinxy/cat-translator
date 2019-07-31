var humanText = document.querySelector("#human");
var catText = document.querySelector("#cat");

//This charset is the set of all characters that can be translated
//This charset is divided in 4 subsets
var charset = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", ".", ",", "!", "?",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

//This indicates the subset the programm is currently in
var setNumber = ["Mi", "Me", "Mo", "Mu"];

//This is the equivalent for each character is a subset
var catEquivalent = ["meow", "miaw", "miou", "miew", "mew", "miow", "miuw", "maou", "mow", "miu"];

function humanChanged() {
    var text = humanText.value;
    var translation = "";
    var currentSubSet = -1;

    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        var normalizedChar = char.toLowerCase();
        var charIndex = charset.indexOf(normalizedChar);
        if (charIndex <= -1)
            translation += char;
        else {
            var isUpper = (normalizedChar == char) ? false : true;
            var subSet = Math.floor(charIndex / 10);
            if (subSet != currentSubSet) {
                translation += setNumber[subSet];
                currentSubSet = subSet;
            }
            var subIndex = charIndex % 10;
            translation += (isUpper) ? catEquivalent[subIndex].toUpperCase() : catEquivalent[subIndex];
        }
    }
    catText.value = translation;
}

function catChanged() {
    var text = catText.value;
    var translation = "";
    var subSet = 0;

    var searchSub = /(Mi|Me|Mo|Mu)/g;
    var splitted = text.split(searchSub);
    for (var i = 0; i < splitted.length; i++) {
        if (i % 2 == 1)
            subSet = setNumber.indexOf(splitted[i]);
        else {
            for (var j = 0; j < catEquivalent.length; j++) {
                var cat = catEquivalent[j];
                var re = new RegExp(cat, 'g');
                var reUp = new RegExp(cat.toUpperCase(), 'g');
                splitted[i] = splitted[i].replace(re, charset[subSet * 10 + j])
                    .replace(reUp, charset[subSet * 10 + j].toUpperCase());
            }
            translation += splitted[i];
        }
    }
    humanText.value = translation;
}