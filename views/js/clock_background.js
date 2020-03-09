const canvas = document.getElementById('clock_bkgd');
const ctxt = canvas.getContext('2d');

var retrieveWeather = function(lat, long) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/clock/weather_request/' + lat + '/' + long);
  xhr.onload = (e) => {
    var weatherData = JSON.parse(e.srcElement.response);
    initializeElements(weatherData);
    initializeCanvas(weatherData);
  };
  xhr.send();
};

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    retrieveWeather(pos.coords.latitude, pos.coords.longitude);
  }, () => {
    console.log('Unable to get location data.');
  })
}

var initializeElements = function(weatherData) {
  var fahrenheit = Math.round(weatherData.main.temp - 273.15);
  document.getElementById('clock_temp').textContent = fahrenheit + '\u2103'
  document.getElementById('clock_weather').textContent = weatherData.weather[0].main;
}

var initializeCanvas = function(weatherData) {
  var images = [];
  var start = new Promise((resolve, reject) => {
    var imageSources = [
      '../images/home_bkgd/rain_sprite.png'
    ];

    var loadImage = function() {
      new Promise((resolve_load, reject_load) => {
        if(imageSources.length == 0) {
          resolve(images);
        } else {
          var image = new Image();
          image.onload = function() {
            images.push(image);
            resolve_load();
          };
          image.src = imageSources.shift();
        }
      }).then(() => {
        loadImage();
      });
    };

    loadImage();
  }).then(() => {
    var frame = 0;
    var requestFrameId;

    // Initialize timing.
    var timeElement = document.getElementById('clock_time');
    var currentTime = new Date();
    timeElement.textContent = currentTime.getHours() + ':' + currentTime.getMinutes();

    var halfHeight;

    var resize = function() {
      if(requestFrameId) {
        window.cancelAnimationFrame(requestFrameId);
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      halfHeight = window.innerHeight / 2;
      drawLoop();
    };

    var drawLoop = function() {
      // Check to reset time.
      if(frame % 60 == 0 && currentTime.getMinutes() != (new Date()).getMinutes()) {
        currentTime = new Date();
        timeElement.textContent = currentTime.getHours() + ':' + currentTime.getMinutes();
      }
      // Clear each cycle.
      ctxt.clearRect(0, 0, canvas.width, canvas.height);

      ctxt.fillStyle = '#6666EE';
      ctxt.fillRect(0, 0, canvas.width, canvas.height);

      for(var x = 0; x < canvas.width; x += 128) {
        for(var y = -7; y < canvas.height; y += 128) {
          ctxt.drawImage(images[0],
            ((frame - frame % 2) % 32) * 32,
            0, 32, 32,
            x, y, 128, 128
          );
        }
      }

      for(var x = -16; x < canvas.width; x += 64) {
        for(var y = -2; y < canvas.height; y += 64) {
          ctxt.drawImage(images[0],
            (frame % 32) * 32,
            0, 32, 32,
            x, y, 64, 64
          );
        }
      }


      for(var x = -4; x < canvas.width; x += 32) {
        for(var y = -22; y < canvas.height; y += 32) {
          ctxt.drawImage(images[0],
            (frame % 32) * 32,
            0, 32, 32,
            x, y, 32, 32
          );
        }
      }

      // Foreground.
      ctxt.fillStyle = '#000000';
      ctxt.fillRect(0, halfHeight, canvas.width, halfHeight);
      frame += 1;
      requestFrameId = window.requestAnimationFrame(drawLoop);
    };

    resize();
    window.addEventListener('resize', resize);
  });
};
