var classElements = document.getElementsByClassName('proj_link');

var retrieveHtml = function(e) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/project_retrieve/' + e.target.id);
  xhr.onload = (e) => {
    var res = JSON.parse(e.srcElement.response);
    document.getElementById('proj_title').innerHTML = res.title;
    document.getElementById('proj_short_text').innerHTML = res.short_desc;
    document.getElementById('proj_long_text').innerHTML = res.long_desc;

    // Create links section
    var linksString = '';
    for(var i = 0; i < res.links.length; i++) {
      linksString += '<a href=\'' + res.links[i].site + '\'>' + res.links[i].text + '</a>';
    }
    document.getElementById('proj_links').innerHTML = linksString;

    loadImages(res.image_info);
  };
  xhr.send();
};

function loadImages(images) {
  var pictures = [];
  var picturesHTMLString = '';
  images.forEach(function(image) {
    pictures.push({
      src: image.url,
      w: image.width,
      h: image.height
    });
    picturesHTMLString += '<img class=\'proj_image\' src=\'' + image.thumb_url + '\' />';
  });
  document.getElementById('proj_gallery').innerHTML = picturesHTMLString;

  var imageElements = document.querySelectorAll('.proj_image');
  console.log(imageElements);
  imageElements.forEach(function(element) {
    element.addEventListener('click', function(e) {
      var pswpElement = document.querySelectorAll('.pswp')[0];

      var elementIndex = 0;
      for(var e = element; e != null; e = e.nextElementSibling, elementIndex++);

      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pictures, {
        index: elementIndex
      });
      gallery.init();
    });
  });
}

for(var i = 0; i < classElements.length; i++) {
  setTimeout(classElements[i].addEventListener('click', retrieveHtml), 0);
}
