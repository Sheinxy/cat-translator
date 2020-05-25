exports.translate_text = function (source, destination, text) {
    if (source === destination) return text;

    const translations = require('../translations/translations.json');
    if (!translations.hasOwnProperty(destination) && destination !== 'human') return text;
    if (!translations.hasOwnProperty(source) && source !== 'human') return text;

    if (source === 'human') return from_human(translations[destination], text);
    if (destination === 'human') return to_human(translations[source], text);

    /* In order to convert from a to b, with both a and b not human, 
        we can simply convert a to human then human to b */
    const human_text = to_human(translations[source], text);
    return from_human(translations[destination], human_text);
}

function from_human({ prefixes, charset, words, special }, text) {
    let current_set = 0;
    return text.reduce((translation, char) => {
        if (char === ' ') return translation + ' ';

        const processor = new RegExp(char, 'i');
        const char_idx = charset.search(processor);

        if (char_idx === -1)
            return translation + `${special}${from_human({ prefixes, charset, words }, char.to_hex())}${special}`;

        const sub_set = Math.floor(char_idx / words.length);
        if (sub_set !== current_set) {
            translation += prefixes[sub_set];
            current_set = sub_set;
        }

        const new_word = words[char_idx % words.length];
        return translation + (char.is_upper() ? new_word.toUpperCase() : new_word);
    }, '');
}

function to_human({ prefixes, charset, words, special }, text) {
    /* This will process the text between the special tags, for content not found in the charset
        Text between the special tags is just hexadecimal values that have been translated */
    const special_processor = new RegExp(`${special}(.+?)${special}`, 'g');
    text = text.replace(special_processor, (match, p1) => {
        const hex_code = to_human({ prefixes, charset, words }, p1);
        return String.fromCharCode(parseInt(hex_code, 16));
    });

    /* This will process the content that can be found in the charset 
        Here we do not have tags, but simply prefixes that indicate in which divison of the charset the translation will be found */
    const prefixes_selector = prefixes.join('|')
    const text_processor = new RegExp(`(${prefixes_selector})((?:(?!${prefixes_selector}).)+)`, 'g');
    if (text.slice(0, 2).search(new RegExp(`${prefixes_selector}`)) === -1) text = prefixes[0] + text;
    return text.replace(text_processor, (match, p1, p2) => {
        /* For each word in the language we need to replace it with the appropriate translation */
        words.forEach((word, i) => {
            const set = prefixes.indexOf(p1);
            const translation = charset[set * words.length + i];

            const word_processor = new RegExp(word, 'gi');
            p2 = p2.replace(word_processor, m => m.is_upper() ? translation.toUpperCase() : translation);
        });
        return p2;
    });
}