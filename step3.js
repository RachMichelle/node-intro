const fs = require('fs')
const axios = require('axios')

const argv = process.argv

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error: ', err);
            process.exit(1)
        }
        console.log(data);
    })
}

function catWrite(pathTo, pathFrom) {
    fs.readFile(pathFrom, 'utf8', (err, data) => {
        if (err) {
            console.log('Could not write: ', err);
            process.exit(2);
        }
        fs.writeFile(pathTo, data, 'utf8', err => {
            if (err) {
                console.log('Could not write: ', err);
                process.exit(2);
            }
            console.log('Wrote successfully');
        })
    })
}

async function webCat(path) {
    try {
        let page = await axios.get(path);
        console.log(page.data);
    }
    catch (e) {
        console.log(e.response.status, e.response.statusText)
        process.exit(1)
    }
}

async function webCatWrite(pathTo, pathFrom) {
    try {
        let content = await axios.get(pathFrom);
        let toWrite = content.data;

        fs.writeFile(pathTo, toWrite, 'utf8', err => {
            if (err) {
                console.log('Could not Write:', err)
                process.exit(2)
            }
            console.log('Wrote successfully')
        })
    }
    catch (e) {
        if (e.response) {
            console.log('Could not write: ', e.response.status, e.response.statusText)
            process.exit(2)
        }
        console.log('Could not write: ', e)
        process.exit(2)
    }
}

function read() {
    if (argv[2].includes('://')) {
        webCat(argv[2]);
    } else {
        cat(argv[2]);
    }
}

function write() {
    if (argv[4].includes('://')) {
        webCatWrite(argv[3], argv[4]);
    } else {
        catWrite(argv[3], argv[4]);
    }
}

if (argv[2] === '--out') {
    write()
} else {
    read()
}