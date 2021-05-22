
var title;
var time;

var value;
var gph;



var nameLevel = {	
	"Aetherblade": [14, 46, 65, 71, 96],
	"Aquatic Ruins": [7, 26, 61, 76],
	"Captain Mai Trin Boss": [18, 42, 72, 95],
	"Chaos": [13, 30, 38, 63, 88, 97],
	"Cliffside": [6, 21, 47, 69, 94],
	"Deepstone": [11, 33, 67, 84],
	"Molten Boss": [10, 40, 70, 90],
	"Molten Furnace": [9, 22, 39, 58, 83],
	"Nightmare": [23, 48, 73, 98],
	"Shattered Observatory": [24, 49, 74, 99],
	"Siren's Reef": [12, 37, 54, 78],
	"Snowblind": [3, 27, 51, 68, 86, 93],
	"Sunqua Peak": [25, 50, 75, 100],
	"Solid Ocean": [20, 35, 45, 60, 80],
	"Swampland": [5, 17, 32, 56, 77, 89],
	"Thaumanova Reactor": [15, 34, 43, 55, 64, 82],
	"Twilight Oasis": [16, 41, 59, 87],
	"Uncategorized": [2, 36, 44, 62, 79, 91],
	"Underground Facility": [8, 29, 53, 81],
	"Urban Battleground": [4, 31, 57, 66, 85],
	"Volcanic": [1, 19, 28, 52, 92]
}

var nameTokens = {	
	"Aetherblade": 2,
	"Aquatic Ruins": 4,
	"Captain Mai Trin Boss": 2,
	"Chaos": 3,
	"Cliffside": 3,
	"Deepstone": 4,
	"Molten Boss": 3,
	"Molten Furnace": 3,
	"Nightmare": 4,
	"Shattered Observatory": 4,
	"Siren's Reef": 4,
	"Snowblind": 2,
	"Sunqua Peak": 4,
	"Solid Ocean": 2,
	"Swampland": 2,
	"Thaumanova Reactor": 3,
	"Twilight Oasis": 4,
	"Uncategorized": 3,
	"Underground Facility": 3,
	"Urban Battleground": 3,
	"Volcanic": 3
}

var tierLevel = {
	1: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
	2: [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
	3: [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75],
	4: [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
}

var bonusEncFracs = ["Chaos","Deepstone","Nightmare"];

function isIn(val, array){
	for (i = 0; i < array.length; i++){
		if (val = array[i]) return true;
	}
	return false;
}

function encPerLevel(l) {
	isBonus = false;
	bonusEncFracs.forEach(e => {
		isBonus = isBonus || (isIn(l, e));
	})
	encs = Math.ceil(l/20) + 1;
	if (isBonus){
		encs++;
		if (l > 40) encs++;	
	}
	return encs;
}


fractalForm = document.querySelector('#fractal');
tierForm = document.querySelector('#tier');
levelForm = document.querySelector('#level');
titleForm = document.querySelector('#title');

timeForm = document.querySelector('#time');

encForm = document.querySelector('#fractalEnc');
bonusBoxForm = document.querySelector('#bonusBox');

buyEnc = document.querySelector('#buyEnc');
sellEnc = document.querySelector('#sellEnc');
buyBox = document.querySelector('#buyBox');
sellBox = document.querySelector('#sellBox');

submit = document.querySelector('#submit');
results = document.querySelector('#results');

fractalForm.addEventListener('change', updateForms)
tierForm.addEventListener('change', updateForms)

buyEnc.addEventListener('click', () => {
	getEncValue('buys');
});

sellEnc.addEventListener('click', () => {
	getEncValue('sells');
});

buyBox.addEventListener('click', () => {
	getBoxValue('buys');
});

sellBox.addEventListener('click', () => {
	getBoxValue('sells');
});

submit.addEventListener('click', () => {
	results.innerHTML = getResults();
})




/*Object.entries(nameLevel).forEach(entry => {
	var opt = document.createElement('option');
	opt.value = entry[0];
	opt.innerHTML = entry[0];
	fractalForm.appendChild(opt)
})*/

updateForms();

function updateForms(){
	levelForm.textContent = '';
	levelsByTier(fractalForm.value, tierForm.value).forEach(e => {
		var opt = document.createElement('option');
		opt.value = e;
		opt.innerHTML = 'Level ' + e ;
		levelForm.appendChild(opt);
	})
}

function levelsByTier(name, tier) {
	lr = 25*(tier - 1)
	return nameLevel[name].filter(x => x > lr && x <= lr+25);
}

var dropRate = {
	19724: 3.531809,
	19748: 2.712345,
	19702: 2.419532,
	19699: 2.235557,
	19743: 2.208563,
	19700: 2.057772,
	19722: 1.661967,
	19729: 1.475757,
	19731: 0.946011,
	19701: 0.886348,
	19745: 0.824278,
	19725: 0.696011,
	24348: 0.489512,
	24286: 0.47696,
	24344: 0.472146,
	24298: 0.468191,
	24354: 0.454264,
	24274: 0.449106,
	24292: 0.443432,
	24280: 0.421939,
	24288: 0.305536,
	24341: 0.30141,
	24350: 0.290578,
	24287: 0.28456,
	24276: 0.283356,
	24294: 0.282153,
	24282: 0.273212,
	24293: 0.264787,
	24299: 0.263583,
	24275: 0.258597,
	24356: 0.254642,
	24355: 0.252407,
	24281: 0.246045,
	24363: 0.243982,
	24345: 0.24295,
	24349: 0.23848,
	19732: 0.161279,
	42010: 0.029917,
	24351: 0.028542,
	24533: 0.02751,
	24516: 0.025447,
	24277: 0.025103,
	24283: 0.024415,
	24512: 0.024072,
	24532: 0.024072,
	24522: 0.023212,
	24357: 0.023212,
	24358: 0.022868,
	24520: 0.022524,
	24518: 0.022524,
	24515: 0.022524,
	24510: 0.022352,
	24289: 0.020977,
	24300: 0.020977,
	24524: 0.020805,
	24508: 0.020633,
	24295: 0.018913,
	81777: 0.000516,
	48896: 0.000344,
	82055: 0.000344,
}

var example = {
	"id": 19724,
	"whitelisted": true,
	"buys": {
		"quantity": 403045,
		"unit_price": 56
	},
	"sells": {
		"quantity": 3359637,
		"unit_price": 72
	}
	};

//same for enc

var encUrl = "https://api.guildwars2.com/v2/commerce/prices?ids=75919";

var boxPricesUrl = 'https://api.guildwars2.com/v2/commerce/prices?ids=' 
	+ Object.entries(dropRate).reduce((s, obj) => s + obj[0] + ',', '') 
	+ '&wiki=1&lang=en';

function getEncValue(orderType){
	fetch(encUrl)
	.then(response => response.json())
	.then(data => data[0][orderType].unit_price)
	.then(
		e => {
			console.log(e);
			encForm.value = Math.floor(e);
		}
	).catch(
		error => {
			console.log(error);
			encForm.value = 'error';
		}
	)
}

function getBoxValue(orderType){
	fetch(boxPricesUrl)
	.then(response => response.json())
	.then(data => handlePrices(data, orderType))
	.then(
		e => {
			console.log(e);
			bonusBoxForm.value = Math.floor(e);
		}
	).catch(
		error => {
			console.log(error);
			bonusBoxForm.value = 'error';
		}
	)
}

function handlePrices(data, orderType){
	return data.reduce((i, obj) => i + handlePrice(obj, orderType), 0);
}

function handlePrice(priceObj, orderType) {
	var rate = dropRate[priceObj.id]
	if (rate != null){
		return rate*priceObj[orderType].unit_price;
	}
	else return 0;
}

function copper2gold(val) {
	r = '' + val;
	l = r.length;

	c = r.substring(l,l-2);
	s = r.substring(l-2,l-4);
	g = r.substring(l-4,0);

	r = '';

	if (g) r = r + g + 'g';
	if (s) r = r + s + 's';
	if (c) r = r + c + 'c';
	
	return r;
}

function copper2gold2(val) {
	r = '' + val;
	l = r.length;

	c = r.substring(l,l-2);
	s = r.substring(l-2,l-4);
	g = r.substring(l-4,0);

	r = '';

	if (g) r = r + g + '<img src="imgs/gold.png">';
	if (s) r = r + s + '<img src="imgs/silver.png">';
	if (c) r = r + c + '<img src="imgs/copper.png">';

	return r;
}

function  cancelEvent (event) {
	if (event.preventDefault) {
		event.preventDefault();
	}
	else {
		event.returnValue = false;
	}
}

function processTime(str){

	let re = /(\d{0,2}).(\d{0,2})/;
	let r = str.match(re)
	mins = r[1];
	secs = r[2];

	return Number(mins)*60 + Number(secs);
}


function getResults(){
	encValue = Number(encForm.value);
	encs = encPerLevel(Number(levelForm.value));
	title = Number(titleForm.value);
	boxValue = Number(bonusBoxForm.value);
	boxes = nameTokens[fractalForm.value];
	
	runVal = (encValue * (encs + title)) + (boxValue*boxes)

	encA = '<a href="https://wiki.guildwars2.com/wiki/Fractal_Encryption">Fractal Encryptions</a>'
	boxA = '<a href="https://wiki.guildwars2.com/wiki/Bonus_Box_of_Goods">Bonus Boxes of Goods</a>'

	runStr = `${copper2gold2(runVal)}per run, from ${encs} ${encA} and ${boxes} ${boxA}`;

	runStrFull = `${copper2gold2(runVal)}per run = ${copper2gold2(encValue)}×(${encs} + ${title}) + ${copper2gold2(boxValue)}×${boxes}`

	time = processTime(timeForm.value);


	gphVal = Math.floor((runVal*3600)/time)


	console.log(runVal);
	console.log(time);
	console.log(gphVal);

	gphStr = `${copper2gold2(gphVal)}/hour`

	return runStr + '<br/>' + gphStr;
}