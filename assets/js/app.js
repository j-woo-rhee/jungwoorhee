/* =========================================================================
   CONTENT lives in data/content.js (loaded before this file).
   To add a publication or news item, edit that one file — nothing here.
   ========================================================================= */

const NEWS_PER_PAGE = 5;

/* =========================================================================
   RENDERING — no need to edit below.
   ========================================================================= */

// ---- publications ----
const pubsEl = document.getElementById('pubs');
const noresult = document.getElementById('noresult');
const pubcount = document.getElementById('pubcount');
let pubFilter = 'all';
const FILTER_LABELS = { all:'selected', first:'first-author', paper:'papers', pw:'posters & workshops' };

function pad2(n){ return String(n).padStart(2, '0'); }

function pubActions(p){
  let links = '';
  if (p.pdf) links += '<a href="' + p.pdf + '" target="_blank" rel="noopener noreferrer">[PDF]</a>';
  if (p.doi) links += '<a href="' + p.doi + '" target="_blank" rel="noopener noreferrer">[DOI]</a>';
  return links ? '<div class="pub-act">' + links + '</div>' : '<div class="pub-act"></div>';
}

function matchFilter(p){
  if (pubFilter === 'all') return true;
  if (pubFilter === 'first') return p.firstAuthor;
  if (pubFilter === 'pw') return p.type === 'poster' || p.type === 'workshop';
  return p.type === pubFilter;
}

function renderPubs(){
  const list = PUBLICATIONS.filter(matchFilter);
  pubsEl.innerHTML = list.map(function (p, i) {
    var has = !!p.abstract;
    var pid = 'pp' + i;
    var titleEl = has
      ? '<button class="ptitle-btn" aria-expanded="false" aria-controls="' + pid + '">' +
          '<span>' + p.title + '</span><span class="exp" aria-hidden="true">+</span></button>'
      : '<p class="ptitle">' + p.title + '</p>';
    var thumbSrc = p.imgThumb || p.img;
    var previewSrc = p.imgPreview || p.img;
    var thumbSize = p.imgThumbWidth && p.imgThumbHeight ? ' width="' + p.imgThumbWidth + '" height="' + p.imgThumbHeight + '"' : '';
    var previewSize = p.imgPreviewWidth && p.imgPreviewHeight ? ' width="' + p.imgPreviewWidth + '" height="' + p.imgPreviewHeight + '"' : '';
    var safeTitle = p.title.replace(/"/g, '');
    var panel = has
      ? '<div class="pub-panel" id="' + pid + '" hidden>' +
          (previewSrc ? '<img class="pub-big" src="' + previewSrc + '" alt="Figure from “' + safeTitle + '”"' + previewSize + ' loading="lazy" decoding="async" />' : '') +
          '<p class="pub-abstract">' + p.abstract + '</p>' +
        '</div>'
      : '';
    return '<div class="pub-entry">' +
      '<article class="pub">' +
        '<div class="thumb' + (has ? ' clickable' : '') + '">' + (thumbSrc ? '<img src="' + thumbSrc + '" alt=""' + thumbSize + ' loading="lazy" decoding="async" />' : '') + '</div>' +
        '<div class="pub-main">' +
          '<span class="venue' + (p.oral ? ' oral' : '') + '">' + p.venue + '</span>' +
          (p.award ? '<span class="award">' + p.award + '</span>' : '') +
          titleEl +
          '<p class="authors">' + p.authors + '</p>' +
        '</div>' +
        pubActions(p) +
      '</article>' + panel +
    '</div>';
  }).join('');
  noresult.classList.toggle('show', list.length === 0);
  pubcount.textContent = pad2(list.length) + ' ' + (FILTER_LABELS[pubFilter] || 'selected');
}

document.querySelectorAll('#filters button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#filters button').forEach(x => {
      x.classList.remove('active'); x.setAttribute('aria-pressed', 'false');
    });
    b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
    pubFilter = b.dataset.filter;
    renderPubs();
  });
});

// expand/collapse a publication to reveal its abstract + larger figure
pubsEl.addEventListener('click', function (e) {
  var trigger = e.target.closest('.ptitle-btn') || e.target.closest('.thumb.clickable');
  if (!trigger) return;
  var entry = trigger.closest('.pub-entry');
  var toggle = entry && entry.querySelector('.ptitle-btn');
  var panel = entry && entry.querySelector('.pub-panel');
  if (!toggle || !panel) return;
  var willOpen = panel.hasAttribute('hidden');
  if (willOpen) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
  toggle.setAttribute('aria-expanded', String(willOpen));
  var exp = toggle.querySelector('.exp'); if (exp) exp.textContent = willOpen ? '−' : '+';
});

// ---- news + pagination ----
const newsListEl = document.getElementById('news-list');
const newsCount = document.getElementById('newscount');
const pageInd = document.getElementById('news-pageind');
const prevBtn = document.getElementById('news-prev');
const nextBtn = document.getElementById('news-next');
let totalPages = 1;
let newsPage = 1;

function newsItemHTML(n){
  return '<div class="news-item">' +
    '<time>' + n.date + '</time>' +
    '<p>' + n.html + (n.isNew ? '<span class="new">NEW</span>' : '') + '</p>' +
  '</div>';
}

function renderNews(){
  totalPages = Math.max(1, Math.ceil(NEWS.length / NEWS_PER_PAGE));
  if (newsPage > totalPages) newsPage = totalPages;
  const start = (newsPage - 1) * NEWS_PER_PAGE;
  newsListEl.innerHTML = NEWS.slice(start, start + NEWS_PER_PAGE).map(newsItemHTML).join('');
  pageInd.innerHTML = '<b>' + pad2(newsPage) + '</b> / ' + pad2(totalPages);
  prevBtn.disabled = newsPage === 1;
  nextBtn.disabled = newsPage === totalPages;
  newsCount.textContent = pad2(NEWS.length) + ' entries';
  // hide pager entirely if it all fits on one page
  document.getElementById('news-pager').style.display = totalPages === 1 ? 'none' : '';
}

// Reserve the height of the tallest page so the pager never shifts between pages.
function setNewsMinHeight(){
  const prevLive = newsListEl.getAttribute('aria-live');
  newsListEl.setAttribute('aria-live', 'off');
  newsListEl.style.minHeight = '';
  const pages = Math.max(1, Math.ceil(NEWS.length / NEWS_PER_PAGE));
  let maxH = 0;
  for (let pg = 1; pg <= pages; pg++){
    const start = (pg - 1) * NEWS_PER_PAGE;
    newsListEl.innerHTML = NEWS.slice(start, start + NEWS_PER_PAGE).map(newsItemHTML).join('');
    if (newsListEl.offsetHeight > maxH) maxH = newsListEl.offsetHeight;
  }
  newsListEl.style.minHeight = maxH + 'px';
  renderNews();
  if (prevLive) newsListEl.setAttribute('aria-live', prevLive);
}

let newsResizeT;
window.addEventListener('resize', function(){
  clearTimeout(newsResizeT);
  newsResizeT = setTimeout(setNewsMinHeight, 150);
});

prevBtn.addEventListener('click', () => { if (newsPage > 1){ newsPage--; renderNews(); } });
nextBtn.addEventListener('click', () => { if (newsPage < totalPages){ newsPage++; renderNews(); } });

// ---- live clock (decorative, aria-hidden) ----
function tickClock(){
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  // Travel: show Stockholm during 2026-06-20 .. 2026-06-25, else Daejeon.
  const inStockholm = utc >= Date.UTC(2026, 5, 20, 0, 0) && utc < Date.UTC(2026, 5, 26, 0, 0);
  const loc = inStockholm ? 'Stockholm, SE' : 'Daejeon, KR';
  const offset = inStockholm ? 2 : 9;          // CEST vs KST
  const label = inStockholm ? 'CEST' : 'KST';
  const t = new Date(utc + offset * 3600000);
  document.getElementById('clock').textContent = pad2(t.getHours()) + ':' + pad2(t.getMinutes()) + ' ' + label;
  const locEl = document.getElementById('loc');
  if (locEl) locEl.textContent = loc;
}

// ---- theme toggle ----
const toggle = document.getElementById('theme-toggle');
function syncToggle(){
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggle.setAttribute('aria-checked', String(dark));
}
toggle.addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = dark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncToggle();
});

// ---- init ----
tickClock();
setInterval(tickClock, 1000);
syncToggle();

function scheduleNewsMinHeight(){
  if ('requestIdleCallback' in window) {
    requestIdleCallback(setNewsMinHeight, { timeout: 1000 });
  } else {
    setTimeout(setNewsMinHeight, 500);
  }
}

if (typeof PUBLICATIONS === 'undefined' || typeof NEWS === 'undefined') {
  pubsEl.innerHTML = '';
  noresult.textContent = '// content failed to load (data/content.js missing).';
  noresult.classList.add('show');
} else {
  renderPubs();
  renderNews();
  scheduleNewsMinHeight();
}
