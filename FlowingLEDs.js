var Gpio = require('onoff').Gpio; 
var LED04 = new Gpio(4, 'out'), 
  LED17 = new Gpio(17, 'out'),
  LED27 = new Gpio(27, 'out'),
  LED22 = new Gpio(22, 'out'),
  LED18 = new Gpio(18, 'out'),
  LED23 = new Gpio(23, 'out'),
  LED24 = new Gpio(24, 'out'),
  LED25 = new Gpio(25, 'out');
var leds = [LED04, LED17, LED27, LED22, LED18, LED23, LED24, LED25];
var indexCount = 0; 
dir = "up"; 
var flowInterval = setInterval(flowingLeds, 100); 
function flowingLeds() { 
  leds.forEach(function(currentValue) { 
    currentValue.writeSync(0); 
  });
  if (indexCount == 0) dir = "up"; 
  if (indexCount >= leds.length) dir = "down"; 
  if (dir == "down") indexCount--; 
  leds[indexCount].writeSync(1); 
  if (dir == "up") indexCount++ 
};

function unexportOnClose() { 
  clearInterval(flowInterval); 
  leds.forEach(function(currentValue) { 
    currentValue.writeSync(0); 
    currentValue.unexport(); 
  });
};

process.on('SIGINT', unexportOnClose);
