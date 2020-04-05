'use strict'

function priceTime(price) {
  if ((price !== 0 && !price) || isNegative(price)) {
	return 'Unable to calculate price' 
  }
  const ukMinimumWage = 0.14
  const timeInMinutes = Math.round(price / ukMinimumWage)
  const hours = calculateHours(timeInMinutes)
  const minutes = calculateMinutes(timeInMinutes, hours) 
  if (timeInMinutes >= 60) {
  	return minutes === 0 && hours 
		? `${generateHours(hours)} on minimum wage` 
		: `${generateHours(hours)} and ${generateMinutes(minutes)}`
  } 
	return minutes < 1 
  		? 'Less than a minute on minimum wage'
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

  return result.filter(node => node.textContent.includes("£")).map(r => r.parentElement);
}

const prices = treeWalkTextNodes();
for (const priceElement of prices) {
  try {
    const result = [];
    
    priceElement.innerText.split(' ').forEach((text) => {
      if(!text.startsWith("£")) return result.push(text);

      result.push(priceTime(parseInt(text.split("£")[1])));
    });

    priceElement.innerText = result.join(' ');
  }
  catch(err){
    continue
  }
}

function getPriceNumber(price) {
	if (!price || !price.innerText.trim()) {
		return 0
  }
  
	return Number(price.innerText.split('£')[1].split(' ')[0])
}
