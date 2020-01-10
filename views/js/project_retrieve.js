var classElements = document.getElementsByClassName('proj_link');

var retrieveHtml = function(e) {
  console.log(e.target.id);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/project_retrieve/' + e.target.id);
  xhr.onload = (e) => {
    var body = e.srcElement.response;
    document.getElementById('proj_details').innerHTML = body;
  };
  xhr.send();
};

for(var i = 0; i < classElements.length; i++) {
  classElements[i].addEventListener('click', retrieveHtml);
}
