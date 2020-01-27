var classElements = document.getElementsByClassName('proj_link');

var retrieveHtml = function(e) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/project_retrieve/' + e.target.id);
  xhr.onload = (e) => {
    var res = JSON.parse(e.srcElement.response);
    console.log(res.title);
    document.getElementById('proj_title').innerHTML = res.title;
    document.getElementById('proj_short_text').innerHTML = res.short_desc;
    document.getElementById('proj_long_text').innerHTML = res.long_desc;
  };
  xhr.send();
};

for(var i = 0; i < classElements.length; i++) {
  classElements[i].addEventListener('click', retrieveHtml);
}
