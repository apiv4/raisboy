/* Init highlight.js */
window.addEventListener('DOMContentLoaded', () => {
  if (window.hljs) {
    document.querySelectorAll('pre code').forEach(block => {
      window.hljs.highlightElement(block);
      addCopyButton(block);
    });
  }
  buildTOC();
  initSearch();
  initSidebarToggle();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* Copy-to-clipboard for code blocks */
function addCopyButton(codeEl) {
  const pre = codeEl.closest('pre');
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.type = 'button';
  btn.textContent = 'Copy';
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeEl.innerText);
      btn.textContent = 'Copied';
      setTimeout(() => (btn.textContent = 'Copy'), 1500);
    } catch (e) {
      btn.textContent = 'Press Ctrl/Cmd+C';
      const range = document.createRange();
      range.selectNodeContents(codeEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
  pre.appendChild(btn);
}

/* Build On This Page TOC */
function buildTOC() {
  const toc = document.getElementById('toc-nav');
  if (!toc) return;
  const headings = document.querySelectorAll('.content h2, .content h3');
  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = 0;
  headings.forEach(h => {
    if (!h.id) h.id = h.textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const li = document.createElement('li');
    li.style.marginLeft = h.tagName === 'H3' ? '12px' : '0';
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.appendChild(list);
}

/* Sidebar toggle for mobile */
function initSidebarToggle() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar__toggle');
  if (!sidebar || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = sidebar.getAttribute('data-open') === 'true';
    sidebar.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

/* Search implementation (client-side) */
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const clearBtn = document.getElementById('search-clear');
  if (!input || !results || !clearBtn) return;

  const index = buildIndex();

  function renderResults(items) {
    results.innerHTML = '';
    if (!items.length) {
      results.hidden = true;
      return;
    }
    items.slice(0, 20).forEach(({ id, text, score }) => {
      const div = document.createElement('div');
      div.className = 'result';
      const a = document.createElement('a');
      a.href = `#${id}`;
      const snippet = text.length > 140 ? text.slice(0, 140) + '…' : text;
      a.innerHTML = highlightTerm(snippet, input.value);
      div.appendChild(a);
      results.appendChild(div);
    });
    results.hidden = false;
  }

  function onInput() {
    const q = input.value.trim();
    if (!q) { results.hidden = true; return; }
    const items = searchIndex(index, q);
    renderResults(items);
  }

  input.addEventListener('input', onInput);
  clearBtn.addEventListener('click', () => { input.value = ''; results.hidden = true; input.focus(); });
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
    }
  });
}

function buildIndex() {
  const blocks = [];
  document.querySelectorAll('.content .section').forEach(sec => {
    const id = sec.id || Math.random().toString(36).slice(2);
    const text = sec.innerText.replace(/\s+/g, ' ').trim();
    blocks.push({ id, text });
  });
  return blocks;
}

function searchIndex(index, query) {
  const q = query.toLowerCase();
  return index
    .map(({ id, text }) => ({ id, text, score: scoreText(text, q) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);
}

function scoreText(text, q) {
  const t = text.toLowerCase();
  let score = 0;
  q.split(/\s+/).forEach(term => {
    if (!term) return;
    const count = (t.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    score += count * term.length;
  });
  return score;
}

function highlightTerm(text, term) {
  if (!term) return text;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'ig');
  return text.replace(re, m => `<mark>${m}</mark>`);
}
