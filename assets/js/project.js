/* Project page: renders the PUBLICATIONS entry whose slug matches <body data-slug>.
   Content lives in data/content.js — same as the home page. */

(function () {
  var main = document.getElementById('main');
  var p = (typeof PUBLICATIONS !== 'undefined') &&
    PUBLICATIONS.find(function (x) { return x.slug === document.body.dataset.slug; });
  if (!p) { main.innerHTML = '<p class="noresult show">// project not found.</p>'; return; }

  // content.js paths are relative to the site root
  function src(path){ return /^https?:/.test(path) ? path : '/' + path; }
  var safeTitle = p.title.replace(/"/g, '');
  var ev = ' data-umami-event-title="' + safeTitle + '"';
  var links = '';
  if (p.pdf) links += '<a href="' + p.pdf + '" target="_blank" rel="noopener noreferrer" data-umami-event="pdf"' + ev + '>[PDF]</a>';
  if (p.doi) links += '<a href="' + p.doi + '" target="_blank" rel="noopener noreferrer" data-umami-event="doi"' + ev + '>[DOI]</a>';
  if (p.video) links += '<a href="https://www.youtube.com/watch?v=' + p.video + '" target="_blank" rel="noopener noreferrer" data-umami-event="youtube"' + ev + '>[VIDEO]</a>';
  var fig = p.img || p.imgPreview; // full-size: the page is wider than the 640px preview

  main.innerHTML =
    '<span class="venue' + (p.reviewed ? ' reviewed' : '') + '">' + p.venue + '</span>' +
    (p.award ? '<span class="award">' + p.award + '</span>' : '') +
    '<h1 class="proj-title">' + p.title + '</h1>' +
    '<p class="authors">' + p.authors + '</p>' +
    (links ? '<div class="pub-act">' + links + '</div>' : '') +
    (p.video
      ? '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + p.video + '" title="Video: ' + safeTitle + '" loading="lazy" ' +
        'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'
      : '') +
    '<section aria-labelledby="abs-h">' +
      '<div class="sec-head"><h2 id="abs-h">Abstract</h2><span class="rule" aria-hidden="true"></span></div>' +
      (fig ? '<img class="pub-big" src="' + src(fig) + '" alt="Figure from “' + safeTitle + '”" loading="lazy" decoding="async"' +
        ' />' : '') +
      (p.abstract ? '<p class="pub-abstract">' + p.abstract + '</p>' : '') +
    '</section>';

  // theme toggle (same behaviour as the home page)
  var toggle = document.getElementById('theme-toggle');
  function sync(){ toggle.setAttribute('aria-checked', String(document.documentElement.getAttribute('data-theme') === 'dark')); }
  toggle.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  sync();
})();
