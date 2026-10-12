// Shared behavior: classic slide-in menu + click-to-enlarge screenshots.
(function () {
  var body = document.body;
  var menu = document.getElementById('menu');
  var toggle = document.querySelector('.menu-toggle');

  function open() { body.classList.add('menu-open'); if (toggle) toggle.setAttribute('aria-expanded', 'true'); }
  function close() { body.classList.remove('menu-open'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); }

  if (toggle) toggle.addEventListener('click', function (e) { e.stopPropagation(); open(); });
  if (menu) {
    menu.querySelector('.close').addEventListener('click', function (e) { e.preventDefault(); close(); });
    menu.addEventListener('click', function (e) { e.stopPropagation(); });
  }
  document.addEventListener('click', function () { if (body.classList.contains('menu-open')) close(); });

  // Lightbox
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Enlarged image');
  lb.innerHTML = '<img alt="" />';
  body.appendChild(lb);
  var big = lb.querySelector('img');
  document.querySelectorAll('[data-zoom] img, .stage img, .modes img, .petra-case-grid img, .petra-examples img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function (e) {
      e.preventDefault();
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      lb.classList.add('on');
    });
  });
  lb.addEventListener('click', function () { lb.classList.remove('on'); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { lb.classList.remove('on'); close(); }
  });
})();
