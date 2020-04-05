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
		? `This costs ${generateHours(hours)} on minimum wage` 
		: `This costs ${generateHours(hours)} and ${generateMinutes(minutes)}`
  } 
	return minutes < 1 
  		? 'This costs less than a minute on minimum wage'
	    : `This costs ${generateMinutes(minutes)}`
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
}

function generateHours(hours) {
	return `${hours} ${hours > 1 ? 'hours' : 'hour'}`
}

const prices = document.getElementsByClassName('a-color-price'); //amazon class for prices
for (const priceElement of prices) {
  try {
    const price = getPriceNumber(priceElement)
    if (!price) {
      priceElement.innerText = priceTime(price);
    }
  }
  catch(err){
    continue
  }
}

function getPriceNumber(price) {
	if (!price || !price.innerText) {
		return 0
	}
	return Number(price.innerText.split('£')[1].split(' ')[0])
}
