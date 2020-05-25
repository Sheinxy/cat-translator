function translate() {
    const source = document.querySelector('input[name="source"]:checked').className.match(/source-(\S+)/)[1];
    const destination = document.querySelector('input[name="destination"]:checked').className.match(/destination-(\S+)/)[1];
    
    if (!source || !destination) return;
    
    const text = source_input.value;

    if (!text) return destination_output.value = '';
    if (!destination_output.value) destination_output.value = 'Translating...';
    fetch(`${window.location.origin}/${source}/${destination}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
        .then( res => res.json())
        .then( data => destination_output.value = data.translation);
}

const source_input = document.querySelector('.source-input');
const destination_output = document.querySelector('.destination-output');

source_input.addEventListener('input', translate);

document.querySelectorAll('input[name="source"], input[name="destination"]').forEach( language => language.addEventListener('change', translate));

function swap() {
    source_input.value = destination_output.value;
    const source = document.querySelector('input[name="source"]:checked').className.match(/source-(\S+)/)[1];
    const destination = document.querySelector('input[name="destination"]:checked').className.match(/destination-(\S+)/)[1];

    document.querySelector(`.source-${destination}[name="source"]`).click();
    document.querySelector(`.destination-${source}[name="destination"]`).click();
}

document.querySelector('.swap').addEventListener('click', swap);