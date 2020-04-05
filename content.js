function priceTime(p) {
  var minutes = Math.round(p / 0.14); //minimum wage in uk is £8.20 which values one minute at 14p
  var hours = 0;
  var string;
  if (minutes >= 60) {
    while (minutes >= 60) {
      minutes = minutes - 60;
      hours++
    }
    if (minutes == 0) {
      string = "This costs "+hours + " hours on minimum wage";
    } else {
      string = "This costs "+hours + " hours and " + minutes + " minutes on minimum wage";
    }
  } else {
    string = "This costs " + minutes + " minutes on minimum wage";
  }
  return string;
}

var prices = document.getElementsByClassName('a-color-price'); //amazon class for prices
for (var i = 0, l = prices.length; i < l; i++) {
  try {
    var price = prices[i].innerText.split("£")[1];
    if (Number.isNaN(price)) {
      continue
    } else if (typeof price === "undefined") {
      continue
    } else {
      var message = priceTime(price);
      prices[i].innerText = string;
    }
  }
  catch(err){
    continue
  }
}
