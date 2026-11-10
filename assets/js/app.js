/* =========================================================================
   CONTENT lives in data/content.js (loaded before this file).
   To add a publication or news item, edit that one file — nothing here.
   ========================================================================= */

const NEWS_PER_PAGE = 5;

/* =========================================================================
   RENDERING — no need to edit below.
   ========================================================================= */

const $ = (id) => document.getElementById(id);
const EXT = ' target="_blank" rel="noopener noreferrer"';
function pad2(n){ return String(n).padStart(2, '0'); }

// Umami custom events (no-op if the script is blocked)
function track(name, data){ if (window.umami) umami.track(name, data); }

// two-column row: mono key | text
function row(key, text){ return '<li class="row"><p class="mono">' + key + '</p><div class="wide">' + text + '</div></li>'; }

// ---- publications ----
const pubsEl = $('pubs');
let pubFilter = 'selected';

function matchFilter(p, f){
  if (f === 'all') return true;
  if (f === 'selected') return p.selected;
  if (f === 'first') return p.firstAuthor;
  if (f === 'pw') return p.type === 'poster' || p.type === 'workshop';
  return p.type === f;
}

function outLink(href, label, event, title){
  // data-umami-event: Umami counts clicks per paper as custom events
  return '<a href="' + href + '"' + EXT + ' data-umami-event="' + event + '" data-umami-event-title="' + title + '">' + label + ' <span aria-hidden="true">↗</span></a>';
}

function renderPubs(){
  pubsEl.innerHTML = PUBLICATIONS.filter(function (p) { return matchFilter(p, pubFilter); }).map(function (p) {
    var i = PUBLICATIONS.indexOf(p), t = p.title.replace(/"/g, '');
    var page = p.slug ? '/' + p.slug + '/' : '';
    var img = p.imgPreview || p.imgThumb || p.img;
    var size = p.imgPreviewWidth ? ' width="' + p.imgPreviewWidth + '" height="' + p.imgPreviewHeight + '"' : '';
    return '<li class="pub">' +
      '<div>' +
        '<p class="venue mono"><span>' + p.venue + '</span>' + (p.award ? '<span class="tag">' + p.award + '</span>' : '') + '</p>' +
        '<h3 class="title">' + (page ? '<a href="' + page + '" data-umami-event="project" data-umami-event-title="' + t + '">' + p.title + '</a>' : p.title) + '</h3>' +
        '<p class="authors">' + p.authors + '</p>' +
        '<div class="pub-actions">' +
          (p.pdf ? outLink(p.pdf, 'PDF', 'pdf', t) : '') +
          (p.doi ? outLink(p.doi, 'DOI', 'doi', t) : '') +
          (page ? '<a href="' + page + '" data-umami-event="project" data-umami-event-title="' + t + '">Project page <span aria-hidden="true">→</span></a>' : '') +
          (p.abstract ? '<button type="button" aria-expanded="false" aria-controls="abs' + i + '">Abstract <span aria-hidden="true">+</span></button>' : '') +
        '</div>' +
        (p.abstract ? '<p class="abstract" id="abs' + i + '" hidden>' + (p.note ? p.note + ' ' : '') + p.abstract + '</p>' : '') +
      '</div>' +
      '<div class="thumb">' + (img ? '<button type="button" data-i="' + i + '" data-full="' + (p.img || img) + '" aria-label="View figure full size: ' + t + '"><img src="' + img + '" alt=""' + size + ' loading="lazy" decoding="async" /></button>' : '') + '</div>' +
    '</li>';
  }).join('') || '<li class="empty">No publications match this filter.</li>';
}

function initFilters(){
  var btns = document.querySelectorAll('#filters button');
  btns.forEach(function (b) {
    var n = PUBLICATIONS.filter(function (p) { return matchFilter(p, b.dataset.filter); }).length;
    b.insertAdjacentHTML('beforeend', '<span class="mono" aria-hidden="true">' + n + '</span>');
    b.addEventListener('click', function () {
      pubFilter = b.dataset.filter;
      btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      track('filter', { filter: pubFilter });
      renderPubs();
    });
  });
}

// ---- figure viewer (native <dialog>): paper info under the figure, prev / next through the figures listed ----
const lightbox = $('lightbox');
let figs = [], figAt = 0;

function showFigure(k){
  figAt = (k + figs.length) % figs.length;
  var b = figs[figAt], p = PUBLICATIONS[b.dataset.i];
  var img = lightbox.querySelector('img');
  img.src = b.dataset.full;
  img.alt = 'Figure from ' + p.title;
  lightbox.querySelector('figure > a').href = b.dataset.full; // tap the figure to open the original, e.g. to pinch-zoom on a phone
  lightbox.querySelector('.lb-venue').textContent = p.venue + (p.award ? ' · ' + p.award : '');
  lightbox.querySelector('.lb-title').textContent = p.title;
  lightbox.querySelector('.lb-authors').innerHTML = p.authors;
  lightbox.querySelector('.lb-count').textContent = (figAt + 1) + ' / ' + figs.length;
  track('figure', { title: p.title });
}

function openFigure(btn){
  figs = Array.prototype.slice.call(pubsEl.querySelectorAll('button[data-full]'));
  if (!lightbox.firstChild) lightbox.innerHTML =
    '<figure><a href="' + btn.dataset.full + '" target="_blank" rel="noopener" aria-label="Open the original image in a new tab"><img src="' + btn.dataset.full + '" alt="" /></a>' +
      '<figcaption><p class="mono lb-venue"></p><p class="lb-title"></p><p class="lb-authors"></p></figcaption></figure>' +
    '<div class="lb-bar"><button type="button" data-go="-1" aria-label="Previous figure">← Prev</button><span class="mono lb-count" aria-live="polite"></span>' +
      '<button type="button" data-go="1" aria-label="Next figure">Next →</button><button type="button" class="lb-close">Close ✕</button></div>';
  showFigure(figs.indexOf(btn));
  lightbox.showModal();
  lightbox.focus(); // not the Prev button: no stray focus ring on open, arrow keys still work
}

pubsEl.addEventListener('click', function (e) {
  var f = e.target.closest('button[data-full]');
  if (f) { openFigure(f); return; }
  var b = e.target.closest('button[aria-controls]'); if (!b) return;
  var panel = $(b.getAttribute('aria-controls')), open = panel.hidden;
  panel.hidden = !open;
  b.setAttribute('aria-expanded', String(open));
  b.querySelector('span').textContent = open ? '−' : '+';
  if (open) track('expand', { title: PUBLICATIONS[b.getAttribute('aria-controls').slice(3)].title });
});
lightbox.addEventListener('click', function (e) {
  var go = e.target.closest('[data-go]');
  if (go) showFigure(figAt + Number(go.dataset.go));
  else if (e.target === lightbox || e.target.closest('.lb-close')) lightbox.close(); // backdrop or Close; Esc is native
});
lightbox.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') showFigure(figAt - 1);
  if (e.key === 'ArrowRight') showFigure(figAt + 1);
});

// ---- news: pages of NEWS_PER_PAGE that replace each other ----
const newsListEl = $('news-list');
const prevBtn = $('news-prev');
const nextBtn = $('news-next');
let newsPage = 1, totalPages = 1;

newsListEl.addEventListener('click', function (e) {
  var a = e.target.closest('a'); if (a) track('news-link', { url: a.href });
});

function renderNews(){
  totalPages = Math.max(1, Math.ceil(NEWS.length / NEWS_PER_PAGE));
  var start = (newsPage - 1) * NEWS_PER_PAGE;
  newsListEl.innerHTML = NEWS.slice(start, start + NEWS_PER_PAGE).map(function (n) {
    return row('<time>' + n.date + '</time>', n.html + (n.isNew ? '<span class="new">New</span>' : ''));
  }).join('');
  $('news-pageind').textContent = newsPage + ' / ' + totalPages;
  prevBtn.disabled = newsPage === 1;
  nextBtn.disabled = newsPage === totalPages;
  $('news-pager').hidden = totalPages === 1; // hide the pager if it all fits on one page
}
prevBtn.addEventListener('click', function () { if (newsPage > 1) { newsPage--; renderNews(); } });
nextBtn.addEventListener('click', function () { if (newsPage < totalPages) { newsPage++; renderNews(); } });

// ---- under review, patents, academic service ----
function renderLists(){
  if (typeof UNDER_REVIEW !== 'undefined') $('review-list').innerHTML = UNDER_REVIEW.map(function (r) { return row(r.role, r.topic); }).join('');
  if (typeof PATENTS !== 'undefined') $('patent-list').innerHTML = PATENTS.map(function (p) {
    return row(p.country + ' ' + p.number, '<b>' + p.title + '</b><br>' + p.inventors);
  }).join('');
  if (typeof SERVICE !== 'undefined') $('service-list').innerHTML = SERVICE.map(function (s) { return row(s.role, s.venue); }).join('');
}

// ---- live clock (decorative, aria-hidden) ----
function tickClock(){
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  // Travel: show Italy during 2026-11-21 .. 2026-11-27 (ISS 2026), else Daejeon.
  const inItaly = utc >= Date.UTC(2026, 10, 21, 0, 0) && utc < Date.UTC(2026, 10, 28, 0, 0);
  const t = new Date(utc + (inItaly ? 1 : 9) * 3600000); // CET vs KST
  $('clock').textContent = pad2(t.getHours()) + ':' + pad2(t.getMinutes()) + (inItaly ? ' CET' : ' KST');
  $('loc').textContent = inItaly ? 'Torino & Milano, IT' : 'Daejeon, KR';
}

// ---- theme toggle (the inline script in <head> sets data-theme before paint) ----
const toggle = $('theme-toggle');
function isDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
function syncToggle(){ toggle.setAttribute('aria-pressed', String(isDark())); toggle.textContent = isDark() ? 'Light' : 'Dark'; }
toggle.addEventListener('click', function () {
  const next = isDark() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncToggle();
});

// ---- init ----
tickClock();
setInterval(tickClock, 30000);
syncToggle();

if (typeof PUBLICATIONS === 'undefined' || typeof NEWS === 'undefined') {
  pubsEl.innerHTML = '<li class="empty">Content failed to load (data/content.js missing).</li>';
} else {
  initFilters();
  renderPubs();
  renderNews();
  renderLists();
}
