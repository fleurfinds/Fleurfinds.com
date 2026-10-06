/* ============================================================
   FleurFinds — shared site JS (no dependencies)
   ------------------------------------------------------------
   ⚙️  EDIT THIS ONE NUMBER to change where WhatsApp orders go:
   ============================================================ */
var WA_NUMBER = '919895585627';   // country code + number, digits only
var WA_GREETING = 'Hi FleurFinds! 🌸';

(function () {
  'use strict';

  /* ---------- WhatsApp deep links (.wa-link with data-msg) ---------- */
  function waUrl(msg) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }
  document.querySelectorAll('.wa-link').forEach(function (a) {
    var msg = a.getAttribute('data-msg') || WA_GREETING;
    a.href = waUrl(msg);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a[href*="wa.me"]')) {
      showToast('opening whatsapp… 💬');
    }
  });

  /* ---------- newsletter (front-end demo — hook up your provider in README) ---------- */
  var newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('newsBtn');
      if (btn) btn.textContent = "you're in, bestie! 🌷";
      newsForm.querySelector('input').value = '';
      showToast('welcome to the sisterhood 🌷');
    });
  }

  /* ============================================================
     PRODUCT PAGE — gallery, size pills, qty, WhatsApp order
     ============================================================ */
  var pdp = document.querySelector('[data-cup-pdp]');
  if (pdp) {
    var PRICE = 299.99;
    var PRICE_FMT = '₹299.99';

    /* gallery thumbs */
    var mainImg = document.getElementById('MainImg');
    document.querySelectorAll('.thumb').forEach(function (t) {
      t.addEventListener('click', function () {
        if (mainImg && t.getAttribute('data-src')) {
          mainImg.src = t.getAttribute('data-src');
          mainImg.alt = t.getAttribute('data-alt') || 'Fleur Cup';
          document.querySelectorAll('.thumb').forEach(function (x) { x.classList.remove('active'); });
          t.classList.add('active');
        }
      });
    });

    /* size hints */
    var SIZE_HINTS = {
      'S': '🌱 Size S — for teens & smaller anatomy, or light flow days.',
      'M': '🌸 Size M — for women under 30 / no vaginal birth. most loved!',
      'L': '🌷 Size L — for women 30+, after vaginal birth, or heavy flow.'
    };
    var hint = document.getElementById('sizeHint');
    var qtyInput = document.getElementById('qty');
    var orderBtn = document.getElementById('waOrderBtn');
    var totalEl = document.getElementById('waTotal');

    function currentSize() {
      var c = pdp.querySelector('input[name="cup-size"]:checked');
      return c ? c.value : 'M';
    }
    function currentQty() {
      var q = parseInt(qtyInput && qtyInput.value, 10);
      return isNaN(q) || q < 1 ? 1 : (q > 9 ? 9 : q);
    }
    function updateOrder() {
      var size = currentSize();
      var qty = currentQty();
      if (hint) hint.textContent = SIZE_HINTS[size] || '';
      if (totalEl) totalEl.textContent = 'total: ₹' + (PRICE * qty).toFixed(2);
      var msg = WA_GREETING + " I'd like to order: Fleur Reusable Menstrual Cup — Size " + size +
                ' (' + PRICE_FMT + ') × ' + qty +
                ' = ₹' + (PRICE * qty).toFixed(2) +
                '. Please share payment & delivery details!';
      if (orderBtn) orderBtn.href = waUrl(msg);
    }

    pdp.querySelectorAll('input[name="cup-size"]').forEach(function (r) {
      r.addEventListener('change', updateOrder);
    });

    /* qty stepper */
    document.querySelectorAll('.qty-stepper button').forEach(function (b) {
      b.addEventListener('click', function () {
        var q = currentQty();
        if (b.getAttribute('data-step') === 'up') q++;
        if (b.getAttribute('data-step') === 'down') q--;
        qtyInput.value = Math.max(1, Math.min(9, q));
        updateOrder();
      });
    });
    if (qtyInput) qtyInput.addEventListener('input', updateOrder);

    updateOrder();
  }
})();
