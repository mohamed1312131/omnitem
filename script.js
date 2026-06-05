/* ============================================================
   OmniTel — interaction & motion
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MOTION = 6 / 10; // hero motion intensity (0..1)

  /* ---------- NAV ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll("#mobileMenu a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- SERVICE / CLIENT ICONS (thin technical line) ---------- */
  var ICONS = {
    deploy: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="24" r="3"/><circle cx="40" cy="10" r="3"/><circle cx="40" cy="38" r="3"/><circle cx="24" cy="24" r="3.5"/><path d="M11 24h9.5M27 22l10-10M27 26l10 10"/></svg>',
    pull: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c8 0 8 8 16 8s8-8 16-8"/><path d="M4 30c8 0 8 8 16 8s8-8 16-8"/><circle cx="44" cy="14" r="2.2" fill="currentColor" stroke="none"/><circle cx="44" cy="30" r="2.2" fill="currentColor" stroke="none"/></svg>',
    splice: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 24h14M30 24h14"/><rect x="18" y="16" width="12" height="16" rx="2"/><path d="M24 16v-5M24 37v-5"/></svg>',
    riser: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="6" width="24" height="36" rx="2"/><path d="M24 6v36"/><path d="M18 14h0M18 22h0M18 30h0M30 14h0M30 22h0M30 30h0"/><circle cx="18" cy="14" r="1.1" fill="currentColor" stroke="none"/><circle cx="18" cy="22" r="1.1" fill="currentColor" stroke="none"/><circle cx="18" cy="30" r="1.1" fill="currentColor" stroke="none"/><circle cx="30" cy="14" r="1.1" fill="currentColor" stroke="none"/><circle cx="30" cy="22" r="1.1" fill="currentColor" stroke="none"/><circle cx="30" cy="30" r="1.1" fill="currentColor" stroke="none"/></svg>',
    otdr: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="12" width="36" height="24" rx="2"/><path d="M11 30l6-8 5 5 4-9 4 6 3-3"/></svg>',
    maint: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M30 12a7 7 0 00-9.5 8.2L9 31.7a3 3 0 104.3 4.3l11.5-11.5A7 7 0 0036 15l-4 4-4-1-1-4 3-2z"/></svg>',
    operator: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 8v8"/><circle cx="20" cy="20" r="3"/><path d="M13 13a10 10 0 000 14M27 13a10 10 0 010 14M9 9a16 16 0 000 22M31 9a16 16 0 010 22"/></svg>',
    contractor: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 30l8-8 4 4 12-12"/><path d="M26 14h6v6"/><path d="M8 34h24"/></svg>',
    infra: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 34V14l14-8 14 8v20"/><path d="M6 34h28M14 34V22h12v12"/></svg>',
    realestate: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 34V12l12-6 12 6v22"/><path d="M6 34h28"/><path d="M14 18h0M20 18h0M26 18h0M14 25h0M20 25h0M26 25h0"/><circle cx="14" cy="18" r="1" fill="currentColor" stroke="none"/><circle cx="20" cy="18" r="1" fill="currentColor" stroke="none"/><circle cx="26" cy="18" r="1" fill="currentColor" stroke="none"/></svg>',
    public: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16l14-8 14 8"/><path d="M9 16v14M17 16v14M23 16v14M31 16v14"/><path d="M6 34h28"/></svg>',
    industrial: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 34V18l8 5V18l8 5V12l12 6v16z"/><path d="M6 34h28"/></svg>'
  };
  document.querySelectorAll("[data-ic]").forEach(function (el) {
    var k = el.getAttribute("data-ic");
    if (ICONS[k]) el.innerHTML = ICONS[k];
  });

  /* ---------- REVEAL ENGINE (rAF tween — robust across render contexts) ---------- */
  function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }
  function tweenIn(el, fromY, dur, delay) {
    if (reduce) { el.style.opacity = "1"; el.style.transform = "none"; return; }
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var t = ts - t0 - delay;
      if (t < 0) { requestAnimationFrame(step); return; }
      var p = Math.min(1, t / dur), e = easeOutCubic(p);
      el.style.opacity = e;
      el.style.transform = fromY ? "translateY(" + (fromY * (1 - e)) + "px)" : "none";
      if (p < 1) requestAnimationFrame(step);
      else { el.style.opacity = "1"; el.style.transform = "none"; }
    }
    requestAnimationFrame(step);
  }

  /* ---------- SCROLL REVEAL ---------- */
  var sDelay = { s1: 80, s2: 160, s3: 240, s4: 320, s5: 400, s6: 480 };
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target, d = 0;
        for (var k in sDelay) { if (el.classList.contains(k)) d = sDelay[k]; }
        tweenIn(el, 26, 700, d);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".r").forEach(function (el) { io.observe(el); });

  /* ---------- HERO REVEAL (staggered load) ---------- */
  var heroDelay = { d1: 100, d2: 220, d3: 340, d4: 460, d5: 580 };
  function revealHero() {
    document.querySelectorAll(".reveal-hero").forEach(function (el) {
      var d = 0;
      for (var k in heroDelay) { if (el.classList.contains(k)) d = heroDelay[k]; }
      tweenIn(el, 22, 800, d);
    });
    var hv = document.querySelector(".hero-visual");
    if (hv) tweenIn(hv, 0, 1100, 350);
  }
  requestAnimationFrame(revealHero);

  /* ---------- FALLBACK: only if IntersectionObserver is unavailable,
     reveal everything immediately (no scroll-reveal possible). ---------- */
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".r").forEach(function (el) { el.style.opacity = "1"; el.style.transform = "none"; });
  }


  /* ---------- FORM ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        if (!f.value.trim()) { f.style.borderColor = "#DC2626"; ok = false; }
        else f.style.borderColor = "";
      });
      if (!ok) return;
      form.style.display = "none";
      document.getElementById("formSuccess").classList.add("show");
    });
    form.querySelectorAll("input,textarea").forEach(function (f) {
      f.addEventListener("input", function () { f.style.borderColor = ""; });
    });
  }

  /* =========================================================
     HERO BACKGROUND — flowing fiber-light streaks
     ========================================================= */
  function setupCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      var r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return r;
    }
    return { ctx: ctx, resize: resize };
  }

  var heroCanvas = document.getElementById("fiber-bg");
  if (heroCanvas) {
    var hc = setupCanvas(heroCanvas);
    var ctx = hc.ctx, W = 0, H = 0;
    var lines = [];
    function buildLines() {
      var r = hc.resize(); W = r.width; H = r.height;
      lines = [];
      var n = 14;
      for (var i = 0; i < n; i++) {
        var y = (i + 0.5) / n * H;
        lines.push({
          y0: y,
          amp: 16 + Math.random() * 42,
          freq: 0.7 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          speed: (0.10 + Math.random() * 0.20) * MOTION,
          pulse: Math.random(),
          pulseSpeed: (0.0016 + Math.random() * 0.0026) * MOTION,
          opacity: 0.05 + Math.random() * 0.10
        });
      }
    }
    buildLines();

    function drawLine(L, t) {
      // base faint fiber strand
      ctx.beginPath();
      var step = 14;
      for (var x = -20; x <= W + 20; x += step) {
        var yy = L.y0 + Math.sin(x / W * Math.PI * L.freq + L.phase + t * L.speed) * L.amp;
        if (x === -20) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.strokeStyle = "rgba(120,160,230," + L.opacity + ")";
      ctx.lineWidth = 1;
      ctx.stroke();

      // traveling light pulse
      L.pulse += L.pulseSpeed;
      if (L.pulse > 1.25) L.pulse = -0.25;
      var px = L.pulse * (W + 80) - 40;
      var py = L.y0 + Math.sin(px / W * Math.PI * L.freq + L.phase + t * L.speed) * L.amp;
      var grad = ctx.createRadialGradient(px, py, 0, px, py, 70);
      grad.addColorStop(0, "rgba(70,140,255,0.55)");
      grad.addColorStop(0.5, "rgba(0,102,255,0.18)");
      grad.addColorStop(1, "rgba(0,102,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(px, py, 70, 0, Math.PI * 2); ctx.fill();
      // bright core
      ctx.fillStyle = "rgba(180,210,255,0.9)";
      ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2); ctx.fill();
    }

    var t0 = 0;
    function frame(ts) {
      t0 = ts / 1000;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < lines.length; i++) drawLine(lines[i], t0);
      if (!reduce) requestAnimationFrame(frame);
    }
    if (reduce) { frame(0); } else requestAnimationFrame(frame);
    window.addEventListener("resize", debounce(buildLines, 200));
  }

  /* =========================================================
     HERO NODE NETWORK (SVG) — architectural fiber graph
     ========================================================= */
  var net = document.getElementById("hero-net");
  if (net) {
    var SVGNS = "http://www.w3.org/2000/svg";
    // Hand-placed nodes for an architectural, deliberate layout
    var nodes = [
      { x: 60,  y: 120, r: 4, hub: false },
      { x: 60,  y: 360, r: 4, hub: false },
      { x: 200, y: 60,  r: 4, hub: false },
      { x: 230, y: 240, r: 8, hub: true },   // central hub
      { x: 190, y: 420, r: 4, hub: false },
      { x: 380, y: 140, r: 6, hub: true },
      { x: 430, y: 330, r: 4, hub: false },
      { x: 470, y: 200, r: 4, hub: false },
      { x: 350, y: 410, r: 4, hub: false }
    ];
    var edges = [
      [0,3],[1,3],[2,3],[4,3],[3,5],[3,6],[5,7],[5,8],[6,8],[2,5],[6,7]
    ];

    var paths = [];
    edges.forEach(function (e, i) {
      var a = nodes[e[0]], b = nodes[e[1]];
      var p = document.createElementNS(SVGNS, "path");
      // slight curve via control point
      var mx = (a.x + b.x) / 2 + (Math.random() - 0.5) * 30;
      var my = (a.y + b.y) / 2 + (Math.random() - 0.5) * 30;
      var d = "M" + a.x + " " + a.y + " Q" + mx + " " + my + " " + b.x + " " + b.y;
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", "rgba(120,160,230,0.30)");
      p.setAttribute("stroke-width", "1");
      net.appendChild(p);
      paths.push(p);
    });

    // pulses traveling along a subset of edges
    var pulseDefs = [0, 2, 4, 6, 8, 10].map(function (idx) {
      idx = idx % paths.length;
      var dot = document.createElementNS(SVGNS, "circle");
      dot.setAttribute("r", "2.6");
      dot.setAttribute("fill", "#5FA0FF");
      dot.setAttribute("filter", "url(#glow)");
      net.appendChild(dot);
      return { path: paths[idx], dot: dot, t: Math.random(), speed: (0.0018 + Math.random() * 0.0026) * MOTION };
    });

    // glow filter
    var defs = document.createElementNS(SVGNS, "defs");
    defs.innerHTML = '<filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    net.insertBefore(defs, net.firstChild);

    // nodes (drawn on top)
    nodes.forEach(function (nd) {
      if (nd.hub) {
        var ring = document.createElementNS(SVGNS, "circle");
        ring.setAttribute("cx", nd.x); ring.setAttribute("cy", nd.y);
        ring.setAttribute("r", nd.r + 6);
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", "rgba(0,102,255,0.4)");
        ring.setAttribute("stroke-width", "1");
        net.appendChild(ring);
        if (!reduce) {
          var anim = document.createElementNS(SVGNS, "animate");
          anim.setAttribute("attributeName", "r");
          anim.setAttribute("values", (nd.r + 6) + ";" + (nd.r + 14) + ";" + (nd.r + 6));
          anim.setAttribute("dur", "3.2s");
          anim.setAttribute("repeatCount", "indefinite");
          ring.appendChild(anim);
          var anim2 = document.createElementNS(SVGNS, "animate");
          anim2.setAttribute("attributeName", "stroke-opacity");
          anim2.setAttribute("values", "0.5;0;0.5");
          anim2.setAttribute("dur", "3.2s");
          anim2.setAttribute("repeatCount", "indefinite");
          ring.appendChild(anim2);
        }
      }
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("cx", nd.x); c.setAttribute("cy", nd.y);
      c.setAttribute("r", nd.r);
      c.setAttribute("fill", nd.hub ? "#0066FF" : "#0A1E3F");
      c.setAttribute("stroke", nd.hub ? "#5FA0FF" : "rgba(150,180,240,0.6)");
      c.setAttribute("stroke-width", "1.2");
      net.appendChild(c);
    });

    function animNet() {
      pulseDefs.forEach(function (pd) {
        pd.t += pd.speed;
        if (pd.t > 1) pd.t -= 1;
        var len = pd.path.getTotalLength();
        var pt = pd.path.getPointAtLength(pd.t * len);
        pd.dot.setAttribute("cx", pt.x);
        pd.dot.setAttribute("cy", pt.y);
      });
      if (!reduce) requestAnimationFrame(animNet);
    }
    requestAnimationFrame(animNet);
  }

  /* =========================================================
     STATIC MESH BACKGROUNDS (vision / contact / founder photo)
     ========================================================= */
  function drawMesh(canvas, density, withPulse) {
    var s = setupCanvas(canvas);
    var ctx = s.ctx, W = 0, H = 0, pts = [];
    var conns = [];
    function build() {
      var r = s.resize(); W = r.width; H = r.height;
      pts = [];
      var cols = Math.max(4, Math.round(W / density));
      var rows = Math.max(3, Math.round(H / density));
      for (var i = 0; i <= cols; i++) {
        for (var j = 0; j <= rows; j++) {
          pts.push({
            x: i / cols * W + (Math.random() - 0.5) * density * 0.5,
            y: j / rows * H + (Math.random() - 0.5) * density * 0.5,
            on: Math.random() < 0.5
          });
        }
      }
      conns = [];
      for (var a = 0; a < pts.length; a++) {
        for (var b = a + 1; b < pts.length; b++) {
          var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
          if (dx * dx + dy * dy < density * density * 1.6) conns.push([a, b]);
        }
      }
    }
    build();
    function render(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (var k = 0; k < conns.length; k++) {
        var p = pts[conns[k][0]], q = pts[conns[k][1]];
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = "rgba(120,160,230,0.10)"; ctx.stroke();
      }
      for (var i = 0; i < pts.length; i++) {
        var pt = pts[i];
        var glow = pt.on ? (0.35 + 0.25 * Math.sin(t * 0.0015 + i)) : 0.18;
        ctx.fillStyle = pt.on ? "rgba(70,140,255," + glow + ")" : "rgba(150,180,240,0.22)";
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.on ? 2 : 1.3, 0, Math.PI * 2); ctx.fill();
      }
      if (withPulse && !reduce) requestAnimationFrame(render);
    }
    if (withPulse && !reduce) requestAnimationFrame(render); else render(0);
    window.addEventListener("resize", debounce(function () { build(); render(0); }, 200));
  }

  var visionMesh = document.getElementById("vision-mesh");
  if (visionMesh) drawMesh(visionMesh, 72, true);
  var contactMesh = document.getElementById("contact-mesh");
  if (contactMesh) drawMesh(contactMesh, 80, false);
  var phMesh = document.querySelector(".founder-photo .ph-mesh");
  if (phMesh) drawMesh(phMesh, 48, false);

  function debounce(fn, ms) {
    var id; return function () { clearTimeout(id); id = setTimeout(fn, ms); };
  }
})();
