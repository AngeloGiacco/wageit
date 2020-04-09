'use strict'

const currencies = [
  {
    symbol: "£",
    wage: 0.14,
    UKformat: true
  } ,
  {
    symbol: "$",
    wage: 0.12,
    UKformat: true
  } ,
  {
    symbol: "￥",
    wage: 14.57,
    UKformat: true
  } ,
  {
    symbol: "₽",
    wage: 202.17,
    UKformat: false
  } ,
  {
    symbol: "Rp",
    wage: 444.52,
    UKformat: false
  }
];

const symbols = currencies.map(c => c.symbol);

function priceTime(price, currency) {
  if (price == null || isNegative(price)) {
	  return 'Unable to calculate price'
  }

  const timeInMinutes = Math.round(price / currency.wage)
  const hours = calculateHours(timeInMinutes)
  const minutes = calculateMinutes(timeInMinutes, hours)
  if (timeInMinutes >= 60) {
    return minutes === 0 && hours
    ? `${generateHours(hours)} on minimum wage`
    : `${generateHours(hours)} and ${generateMinutes(minutes)}`
  }
  return minutes < 1
      ? 'less than a minute on minimum wage'
      : `${generateMinutes(minutes)}`
}

function isNegative(num) {
	return Math.sign(num) === -1
}

function calculateMinutes(minutes, hours) {
	return hours < 0 ? minutes : minutes - (60 * hours)
}

function calculateHours(minutes) {
	return Math.floor(minutes / 60)
}

function generateMinutes(minutes) {
	return minutes < 1 ? `less than a minute on minimum wage`
		: `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} on minimum wage`
}``

function generateHours(hours) {
	return `${hours} ${hours > 1 ? 'hours' : 'hour'}`
}

function treeWalkTextNodes() {
  var n, result = [],
  walk = document.createTreeWalker(document.getElementsByTagName("body")[0], NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) result.push(n);

  return result.filter(node => {
    return symbols.some(s => node.textContent.includes(s));
  }).map(r => r.parentElement);
}

function getPriceNumber(pE,c) {
  try {
    if (c.UKformat) {
      var num = parseFloat(pE.innerText.split(c.symbol)[1].replace(",", ""));
    } else {
      var num = parseFloat(pE.innerText.split(c.symbol)[1].replace(".", "").replace(",","."));
    }
      return num;
  }
  catch(err) {
    return 0;
  }
}

const prices = treeWalkTextNodes();
for (const priceElement of prices) {
  if(priceElement.innerText.length == 1) continue;

  const result = [];

  priceElement.innerText.split(' ').forEach((text) => {
    if(!symbols.some(s => text.startsWith(s))) return result.push(text);

    for(let currency of currencies) {
      if(text.startsWith(currency.symbol)) {
        return result.push(priceTime(getPriceNumber(priceElement,currency), currency));
      }
    }
  });

  priceElement.innerText = result.join(' ');
}
