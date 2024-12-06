const fs = require('fs')
const axios = require('axios')

const argv = process.argv

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error: ', err);
        }
        console.log(data);
    })
}

async function webCat(path) {
    try {
        page = await axios.get(path);
        console.log(page.data);
    }
    catch (e) {
        console.log(e.response.status, e.response.statusText)
    }
}

if (argv[2].includes('://')) {
    webCat(argv[2]);
} else {
    cat(argv[2]);
}