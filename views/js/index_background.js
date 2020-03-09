const canvas = document.getElementById('index_bkgd');
const ctxt = canvas.getContext('2d');

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

  var resize = function() {
    if(requestFrameId) {
      window.cancelAnimationFrame(requestFrameId);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawLoop();
  };

  var drawLoop = function() {
    // Clear each cycle.
    ctxt.clearRect(0, 0, canvas.width, canvas.height);

    ctxt.fillStyle = '#FFFFFF';
    ctxt.fillRect(0, 0, canvas.width, canvas.height);

    frame += 1;
    requestFrameId = window.requestAnimationFrame(drawLoop);
  };

  resize();
  window.addEventListener('resize', resize);
});
