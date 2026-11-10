/* Project page: renders the PUBLICATIONS entry whose slug matches <body data-slug>.
   Content lives in data/content.js — same as the home page. */

(function () {
  var main = document.getElementById('main');
  var p = (typeof PUBLICATIONS !== 'undefined') &&
    PUBLICATIONS.find(function (x) { return x.slug === document.body.dataset.slug; });
  if (!p) { main.innerHTML = '<p class="empty">Project not found.</p>'; return; }

  // content.js paths are relative to the site root
  function src(path){ return /^https?:/.test(path) ? path : '/' + path; }
  var safeTitle = p.title.replace(/"/g, '');
  function out(href, label, event){
    return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" data-umami-event="' + event + '" data-umami-event-title="' + safeTitle + '">' + label + ' <span aria-hidden="true">↗</span></a>';
  }
  var links = (p.pdf ? out(p.pdf, 'PDF', 'pdf') : '') + (p.doi ? out(p.doi, 'DOI', 'doi') : '') +
    (p.video ? out('https://www.youtube.com/watch?v=' + p.video, 'Video', 'youtube') : '');
  var fig = p.img || p.imgPreview; // full-size: the page is wider than the 640px preview

  main.innerHTML =
    '<p class="venue mono"><span>' + p.venue + '</span>' + (p.award ? '<span class="tag">' + p.award + '</span>' : '') + '</p>' +
    '<h1>' + p.title + '</h1>' +
    '<p class="authors">' + p.authors + '</p>' +
    (links ? '<div class="pub-actions">' + links + '</div>' : '') +
    (p.video
      ? '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + p.video + '" title="Video: ' + safeTitle + '" loading="lazy" ' +
        'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'
      : '') +
    '<section aria-labelledby="abs-h">' +
      '<h2 id="abs-h">Abstract</h2>' +
      (fig ? '<figure class="figure"><a href="' + src(fig) + '" target="_blank" rel="noopener" aria-label="Open the figure in a new tab"><img src="' + src(fig) + '" alt="Figure from “' + safeTitle + '”" loading="lazy" decoding="async" /></a></figure>' : '') +
      (p.abstract ? '<p class="abstract">' + (p.note ? p.note + ' ' : '') + p.abstract + '</p>' : '') +
    '</section>';

  // theme toggle (same behaviour as the home page)
  var toggle = document.getElementById('theme-toggle');
  function isDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function sync(){ toggle.setAttribute('aria-pressed', String(isDark())); toggle.textContent = isDark() ? 'Light' : 'Dark'; }
  toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  sync();
})();
