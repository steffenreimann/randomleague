
import fetch from 'node-fetch';
import express from 'express';
import fs from 'node:fs';
import https from 'https';
import http from 'http';



// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('C://localhost-key.pem'),
    cert: fs.readFileSync('C://localhost.pem'),
};




var champs = {}

const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.get('/champs', (req, res) => {
    res.send(JSON.stringify(champs));
});


async function getVersion() {
    console.log('getVersion');
    const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const versions = await response.json();

    // console.log(versions);
    return versions[0]
}


async function getChamps() {
    console.log('getChamps');

    var version = await getVersion();
    console.log('version', version);
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
    champs = await response.json();

    //console.log(champs);
    return champs
}


async function getMoreChampInfos(champid) {
    //https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/133.json

    console.log('getChamp');
    const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${champid}.json`);
    const champs = await response.json();
    return champs

}





async function initCache() {

    var exists = fs.existsSync('./public/cache/champs.json');
    var data = null

    if (exists) {
        try {
            data = JSON.parse(fs.readFileSync('./public/cache/champs.json'));
            console.log('Champs Load from Disk');
        } catch (error) {

        }

    }


    if (exists && data && data.version == version.version) {
        champs = data
    } else {
        await getChamps()
        for (let [key, value] of Object.entries(champs.data)) {
            var id = value.id
            var moreInfo = await getMoreChampInfos(value.key)
            var currentChamp = champs.data[moreInfo.name]

            if (currentChamp) {
                currentChamp.moreInfo = moreInfo
            }
            var index = 0
            for (let [key, value] of Object.entries(moreInfo.skins)) {

                downloadImg(id, index)
                index++
            }

        }

        try {
            fs.writeFileSync('./public/cache/champs.json', JSON.stringify(champs));
            console.log('Camps write to Disk');
        } catch (err) {
            console.error(err);
        }
    }
}





function downloadImg(name, index) {
    return new Promise((resolve, reject) => {
        console.log(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${index}.jpg`);
        console.log(`./public/cache/img/${name}_${index}.jpg`);
        fetch(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${index}.jpg`)
            .then(res => {
                res.body.pipe(fs.createWriteStream(`./public/cache/img/${name}_${index}.jpg`))
                resolve()
            }
            )
    })
}


var version = { version: 0 };

//Cache
async function initServer() {

    version.version = await getVersion()
    await initCache()

    ///app.listen(8564, () => console.log('Example app is listening on port 8564.'));

    // Create an HTTP service.
    http.createServer(app).listen(8564);
    // Create an HTTPS service identical to the HTTP service.
    https.createServer(options, app).listen(443);

}


initServer()