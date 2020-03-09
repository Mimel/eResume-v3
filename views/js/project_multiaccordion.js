$(function() {
  var projectHorizNavbarElements = document.querySelectorAll('.proj_header_genre');
  var accordionBody = document.getElementById('proj_header_listings');

  var currentShownElement = -1;
  for(var i = 0; i < projectHorizNavbarElements.length; i++) {
    setTimeout(projectHorizNavbarElements[i].addEventListener('click', function(e) {
      var clickedElement = e.target;

      var elementIndex = -1;
      for(var e = clickedElement; e != null; e = e.previousElementSibling, elementIndex++);

      if(currentShownElement >= 0) {
        $(accordionBody.children[currentShownElement]).slideUp(250);
      }

      // Close accordion if clicked link is the same as the active one.
      if(currentShownElement == elementIndex) {
        currentShownElement = -1;
      } else {
        $(accordionBody.children[elementIndex]).slideDown(250);
        currentShownElement = elementIndex;
      }
    }), 0);
  }

  // Hide listings on window resize.
  var desktopBreakpoint = 850;
  window.addEventListener('resize', function(e) {
    if(window.innerWidth > desktopBreakpoint) {
      if(currentShownElement >= 0) {
        accordionBody.children[currentShownElement].style.display = 'none';
        currentShownElement = -1;
      }
    }
  });
});
