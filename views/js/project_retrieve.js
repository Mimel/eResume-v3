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

    // Initialize gallery.
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var pictures = [];
    var picturesHTMLString = '';
    res.image_info.forEach(function(image) {
      pictures.push({
        src: image.url,
        w: image.width,
        h: image.height
      });
      picturesHTMLString += '<div class=\'proj_image\'><img src=\'' + image.thumb_url + '\' /></div>';
    });
    document.getElementById('proj_gallery').innerHTML = picturesHTMLString
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pictures, {
      index: 0
    });
  };
  xhr.send();
};

for(var i = 0; i < classElements.length; i++) {
  setTimeout(classElements[i].addEventListener('click', retrieveHtml), 0);
}
