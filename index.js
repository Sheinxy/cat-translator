require('dotenv').config();

//#region Module importation
const express = require('express');
const translator = require('./js/translator');
//#endregion

//#region Initializations and other configurations

/* Making some band-aid quality functions */
String.prototype.reduce = function (callback, init) { return this.split('').reduce(callback, init) };
String.prototype.to_hex = function () { return this.reduce((hex, char) => hex + char.charCodeAt(0).toString(16), '') };
String.prototype.is_upper = function () { return this.toString() === this.toUpperCase() };
String.prototype.is_lower = function () { return this.toString() === this.toLowerCase() };

//#endregion


//#region Express Initialization
app = express()

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')

app.use('/css', express.static(`${__dirname}/css`));
app.use('/js', express.static(`${__dirname}/js`));
app.use('/images', express.static(`${__dirname}/images`));
app.use('/translations', express.static(`${__dirname}/translations`));
app.use(express.json());
app.use(express.urlencoded());
//#endregion


//#region Useful functions
function translate(source, destination, text, res) {
    if (!text) {
        res.status(400).send({
            error: 'Missing source text'
        });
        return;
    }

    res.send({
        source: source,
        destination: destination,
        text: text,
        translation: translator.translate_text(source, destination, text)
    });
}
//#endregion


//#region Express Routing
app.get('/', (req, res) => {
    const translations = require('./translations/translations.json');
    let languages = ['human'];
    for (const language in translations) languages.push(language);
    res.render('index', { languages });
});

app.get('/:source/:destination', (req, res) => {
    translate(req.params.source, req.params.destination, req.query.text, res);
});

app.post('/:source/:destination', (req, res) => {
    translate(req.params.source, req.params.destination, req.body.text, res);
});
//#endregion


app.listen(process.env.PORT || 3000)