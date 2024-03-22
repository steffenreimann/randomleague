const showChamp = document.getElementById('champPickElement');
const typeOfChamp = document.getElementById('underlined');

var champs = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Akshan",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "Aurelion Sol",
    "Azir",
    "Bard",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Cho'Gath",
    "Corki",
    "Darius",
    "Diana",
    "Dr.Mundo",
    "Draven",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "Jarvan IV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kai'Sa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Kha'Zix",
    "Kindred",
    "Kled",
    "Kog'Maw",
    "LeBlanc",
    "Lee Sin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "Master Yi",
    "Miss Fortune",
    "Mordekaiser",
    "Morgana",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nocturne",
    "Nunu & Willump",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "Rek'Sai",
    "Rell",
    "Renata Glasc",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "Tahm Kench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "Twisted Fate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Vel'Koz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Wukong",
    "Xayah",
    "Xerath",
    "Xin Zhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra"
];

var champsObj = []


//https://ddragon.leagueoflegends.com/cdn/14.6.1/data/en_US/champion.json

async function getVersion() {
    console.log('getVersion');
    const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const versions = await response.json();

    console.log(versions);
    return versions[0]
}

async function getChamps() {
    console.log('champs');

    var version = await getVersion();
    console.log('version', version);
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
    const champs = await response.json();

    console.log(champs);
    return champs.data
}
/* 
async function getChamps() {
    console.log('champs');
    const response = await fetch("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Sona_6.jpg");
    const champs = await response.json();

    console.log(champs);
    return champs.data
} */

function buildPicURL(champName) {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`
}

var team1txt = ''
var team2txt = ''




function getRandomChamp() {

    champ = null
    i = 0
    while (!champ) {
        i = Math.floor(Math.random() * champs.length)
        champ = champs[i]
    }
    champs.splice(i, 1);
    return champ
}



async function pickrandomchamp() {

    champsObj = await getChamps()

    console.log(champsObj);

    champs = Object.keys(champsObj)

    var champperteam = document.getElementById('gennumber').value;
    document.getElementById('team1').innerHTML = '';
    document.getElementById('team2').innerHTML = '';
    team1txt = '';
    team2txt = '';

    for (let index = 0; index < champperteam; index++) {

        const randomPickGeneral = getRandomChamp()

        var newCard = card.content.cloneNode(true)
        newCard.children[0].children[0].src = buildPicURL(randomPickGeneral)
        newCard.children[0].children[1].innerHTML = randomPickGeneral
        document.getElementById('team1').append(newCard)
        team1txt += ' ' + randomPickGeneral
    }

    for (let index = 0; index < champperteam; index++) {

        const randomPickGeneral = getRandomChamp()

        var newCard = card.content.cloneNode(true)
        newCard.children[0].children[0].src = buildPicURL(randomPickGeneral)
        newCard.children[0].children[1].innerHTML = randomPickGeneral
        document.getElementById('team2').append(newCard)
        team2txt += ' ' + randomPickGeneral
    }
}

function copy(team) {
    // Get the text field
    var copyText = document.getElementById("myInput");


    if (team == 1) {
        copyText.value = 'Team 1: ' + team1txt
    }
    if (team == 2) {
        copyText.value = 'Team 2: ' + team2txt
    }

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
}

pickrandomchamp()