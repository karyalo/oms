(function () {
  "use strict";

  const PRODUCT_PORTS = { store: 3101, cms: 3102, oms: 3103, pos: 3104, finance: 3105 };
  const LOCAL_PORTS = { store: 4101, cms: 4102, oms: 4103, pos: 4104, finance: 4105 };
  const PRODUCT_META = {
    store: { label: "Store", short: "ST", description: "Toko Online" },
    cms: { label: "Manage", short: "MG", description: "CMS / Kelola Toko" },
    oms: { label: "Stock", short: "OS", description: "OMS / Pesanan & Stok" },
    pos: { label: "POS", short: "PO", description: "Kasir Retail" },
    finance: { label: "Finance", short: "FI", description: "Keuangan" },
  };

  const icons = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/>',
    chart: '<path d="M4 19V9m6 10V5m6 14v-7m5 7H2"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    box: '<path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
    orders: '<path d="M7 3h10v4H7zM5 5H3v16h18V5h-2"/><path d="M8 12h8M8 16h6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    tag: '<path d="M20 13 13 20l-9-9V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1.2"/>',
    wallet: '<path d="M3 6h16v14H3z"/><path d="M3 9h18v7h-5a3 3 0 0 1 0-6h5M6 6l8-3 2 3"/>',
    receipt: '<path d="M6 3h12v19l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.37.37.7.6 1 .3.3.7.46 1.1.46h.1v4h-.1A1.7 1.7 0 0 0 19.4 15Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    truck: '<path d="M3 5h11v12H3zM14 9h4l3 3v5h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    scan: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M7 12h10M8 9v6M12 9v6M16 9v6"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H5v2M17 15h2v-2"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>',
    download: '<path d="M12 4v12m-5-5 5 5 5-5M4 20h16"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.2-1.2"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  };

  const seed = {
    products: [
      { id: "AL-001", name: "Serene Linen Shirt", category: "Atasan", price: 329000, stock: 34, status: "Aktif", color: "#c7d5cf" },
      { id: "AL-002", name: "Luma Pleated Dress", category: "Dress", price: 489000, stock: 18, status: "Aktif", color: "#b77b68" },
      { id: "AL-003", name: "Aruna Knit Cardigan", category: "Outer", price: 379000, stock: 9, status: "Stok rendah", color: "#d8c7a5" },
      { id: "AL-004", name: "Tala Wide Pants", category: "Bawahan", price: 349000, stock: 26, status: "Aktif", color: "#6d786f" },
      { id: "AL-005", name: "Sora Everyday Blouse", category: "Atasan", price: 289000, stock: 42, status: "Aktif", color: "#e1d5c9" },
      { id: "AL-006", name: "Mira Wrap Skirt", category: "Bawahan", price: 319000, stock: 13, status: "Aktif", color: "#8b5a4c" },
      { id: "AL-007", name: "Raya Utility Jacket", category: "Outer", price: 559000, stock: 5, status: "Stok rendah", color: "#667c71" },
      { id: "AL-008", name: "Nara Midi Dress", category: "Dress", price: 469000, stock: 0, status: "Habis", color: "#434943" },
    ],
    orders: [
      { id: "ORD-240812-1042", customer: "Nadia Putri", channel: "Store", total: 818000, items: 2, status: "Perlu diproses", date: "12 Agu, 09:42", courier: "JNE Reguler" },
      { id: "ORD-240812-1038", customer: "Raka Pratama", channel: "Store", total: 349000, items: 1, status: "Picking", date: "12 Agu, 09:18", courier: "SiCepat" },
      { id: "POS-240812-019", customer: "Guest", channel: "POS", total: 667000, items: 2, status: "Selesai", date: "12 Agu, 08:55", courier: "Ambil di toko" },
      { id: "ORD-240811-1015", customer: "Sinta Maharani", channel: "Marketplace", total: 958000, items: 3, status: "Packing", date: "11 Agu, 17:24", courier: "J&T Express" },
      { id: "ORD-240811-1009", customer: "Dewi Lestari", channel: "Store", total: 489000, items: 1, status: "Dikirim", date: "11 Agu, 14:10", courier: "AnterAja" },
      { id: "POS-240811-018", customer: "Rian", channel: "POS", total: 319000, items: 1, status: "Selesai", date: "11 Agu, 13:42", courier: "Ambil di toko" },
    ],
    transactions: [
      { id: "TRX-1208-01", type: "Pemasukan", category: "Penjualan Store", amount: 818000, date: "12 Agu 2026", status: "Tercatat" },
      { id: "TRX-1208-02", type: "Pemasukan", category: "Penjualan POS", amount: 667000, date: "12 Agu 2026", status: "Tercatat" },
      { id: "TRX-1208-03", type: "Pengeluaran", category: "Iklan", amount: 350000, date: "12 Agu 2026", status: "Tercatat" },
      { id: "TRX-1108-01", type: "Pemasukan", category: "Penjualan Marketplace", amount: 958000, date: "11 Agu 2026", status: "Tercatat" },
      { id: "TRX-1108-02", type: "Pengeluaran", category: "Pengiriman", amount: 126000, date: "11 Agu 2026", status: "Tercatat" },
      { id: "TRX-1008-01", type: "Pengeluaran", category: "Restock Produk", amount: 2850000, date: "10 Agu 2026", status: "Menunggu bukti" },
    ],
    customers: [
      { name: "Nadia Putri", email: "nadia@example.com", orders: 5, spent: 2839000, segment: "Loyal" },
      { name: "Sinta Maharani", email: "sinta@example.com", orders: 3, spent: 1756000, segment: "Returning" },
      { name: "Dewi Lestari", email: "dewi@example.com", orders: 2, spent: 838000, segment: "Returning" },
      { name: "Raka Pratama", email: "raka@example.com", orders: 1, spent: 349000, segment: "Baru" },
    ],
    cart: [],
    audit: [
      { action: "Stok AL-003 disesuaikan", actor: "Ayu", time: "8 menit lalu" },
      { action: "Promo MIDMONTH diterbitkan", actor: "Dimas", time: "31 menit lalu" },
      { action: "Order ORD-240812-1038 masuk picking", actor: "Sistem", time: "47 menit lalu" },
    ],
  };

  function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.box}</svg>`;
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function stateKey() { return "karyalo-demo-state-v3"; }
  function getState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(stateKey()));
      return parsed && parsed.products ? parsed : clone(seed);
    } catch { return clone(seed); }
  }
  function saveState(state) { localStorage.setItem(stateKey(), JSON.stringify(state)); return state; }
  function updateState(callback) { const state = getState(); callback(state); return saveState(state); }
  function resetState() { localStorage.removeItem(stateKey()); toast("Data demo dikembalikan ke kondisi awal."); return getState(); }
  const money = value => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
  const number = value => new Intl.NumberFormat("id-ID").format(value);
  const escape = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char]));

  function appHref(product) {
    const meta = PRODUCT_META[product];
    const host = location.hostname || "127.0.0.1";
    if (host.endsWith("karyalo.com") && !/^\d/.test(host)) return `https://${product === "cms" ? "cms" : product === "oms" ? "oms" : product}.karyalo.com/`;
    const current = Number(location.port);
    const ports = current >= 4101 && current <= 4105 ? LOCAL_PORTS : PRODUCT_PORTS;
    return `${location.protocol}//${host}:${ports[product]}/`;
  }

  function renderSwitcher(current) {
    return Object.entries(PRODUCT_META).map(([key, meta]) => `<a class="switch-app ${key === current ? "current" : ""}" href="${appHref(key)}" title="${meta.label} — ${meta.description}">${meta.short}</a>`).join("");
  }

  function mount(options) {
    document.title = `${options.title} — Karyalo Demo`;
    const groupedNav = options.nav.map(item => item.labelOnly
      ? `<div class="nav-label">${escape(item.labelOnly)}</div>`
      : `<button class="nav-item ${item.id === options.active ? "active" : ""}" data-view="${item.id}">${icon(item.icon || "home")}<span>${escape(item.label)}</span>${item.badge ? `<span class="nav-badge">${escape(item.badge)}</span>` : ""}</button>`
    ).join("");
    document.getElementById("app").innerHTML = `
      <div class="app-shell">
        <aside class="sidebar" id="sidebar">
          <a class="brand" href="#" data-view="${options.active || "dashboard"}">
            <span class="brand-mark">K</span>
            <span class="brand-copy"><strong>Karyalo ${PRODUCT_META[options.app].label}</strong><span>${PRODUCT_META[options.app].description}</span></span>
          </a>
          <div class="demo-pill"><span class="demo-dot"></span> Mode demo interaktif</div>
          <nav class="side-nav" aria-label="Navigasi aplikasi">${groupedNav}</nav>
          <div class="sidebar-spacer"></div>
          <details class="app-switcher" open>
            <summary><span>Pindah aplikasi</span><span>↗</span></summary>
            <div class="switch-grid">${renderSwitcher(options.app)}</div>
          </details>
        </aside>
        <div class="main-wrap">
          <header class="topbar">
            <button class="mobile-menu" id="mobile-menu" aria-label="Buka menu">${icon("menu")}</button>
            <div class="top-title"><strong>${escape(options.title)}</strong><span>${escape(options.subtitle || "Alina Demo Company")}</span></div>
            <div class="top-actions">
              <button class="btn btn-secondary btn-sm" id="start-tour">${icon("play")} Tur singkat</button>
              <button class="icon-btn" id="notifications" aria-label="Notifikasi">${icon("bell")}<span class="notification-dot"></span></button>
              <div class="profile"><span class="avatar">AS</span><span class="profile-copy"><strong>Ayu Sari</strong><span>Demo Owner</span></span></div>
            </div>
          </header>
          <main class="page" id="page" tabindex="-1"></main>
        </div>
      </div>`;
    document.getElementById("mobile-menu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
    document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", event => {
      event.preventDefault();
      const view = button.dataset.view;
      options.onNavigate(view);
      document.getElementById("sidebar").classList.remove("open");
    }));
    document.getElementById("notifications").addEventListener("click", showNotifications);
    document.getElementById("start-tour").addEventListener("click", () => startTour(options.tour || []));
  }

  function setActiveNav(view) {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  }
  function page(html) { const target = document.getElementById("page"); target.innerHTML = html; target.focus({ preventScroll: true }); }
  function heading(eyebrow, title, description, actions = "") {
    return `<div class="page-heading"><div><p class="eyebrow">${escape(eyebrow)}</p><h1>${escape(title)}</h1><p class="lede">${escape(description)}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
  }
  function metric(label, value, detail, iconName = "chart", tone = "") {
    return `<article class="card metric-card"><div class="metric-top"><span>${escape(label)}</span><span class="metric-icon ${tone}">${icon(iconName)}</span></div><div class="metric-value">${value}</div><span class="delta">${icon("arrow")} ${escape(detail)}</span></article>`;
  }
  function status(value) {
    const danger = /Habis|Ditolak|Jatuh tempo/i.test(value);
    const warning = /rendah|menunggu|Packing|Picking|Perlu/i.test(value);
    return `<span class="status ${danger ? "danger" : warning ? "warning" : ""}">${escape(value)}</span>`;
  }
  function toast(message) {
    const node = document.createElement("div");
    node.className = "toast";
    node.innerHTML = `${icon("check")}<span>${escape(message)}</span>`;
    document.getElementById("toast-region").appendChild(node);
    setTimeout(() => node.remove(), 3200);
  }
  function modal(title, body, actions = "") {
    const root = document.getElementById("modal-root");
    root.innerHTML = `<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-head"><h2 id="modal-title">${escape(title)}</h2><button class="close-btn" data-close-modal aria-label="Tutup">${icon("close")}</button></header><div class="modal-body">${body}</div>${actions ? `<footer class="modal-actions">${actions}</footer>` : ""}</section></div>`;
    root.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
    root.querySelector(".modal-backdrop").addEventListener("click", event => { if (event.target.classList.contains("modal-backdrop")) closeModal(); });
    root.querySelector("button, input, select")?.focus();
  }
  function closeModal() { document.getElementById("modal-root").innerHTML = ""; }
  function showNotifications() {
    const data = getState().audit;
    modal("Aktivitas terbaru", `<div class="list">${data.map(item => `<div class="list-item"><span class="list-icon">${icon("check")}</span><div class="list-copy"><strong>${escape(item.action)}</strong><span>${escape(item.actor)} · ${escape(item.time)}</span></div></div>`).join("")}</div>`, `<button class="btn btn-secondary" data-close-modal>Tutup</button>`);
  }

  let activeTour = null;
  function clearHighlight() { document.querySelector(".tour-highlight")?.classList.remove("tour-highlight"); }
  function startTour(steps) {
    if (!steps.length) return toast("Tur untuk layar ini segera tersedia.");
    activeTour = { steps, index: 0 };
    renderTour();
  }
  function renderTour() {
    clearHighlight();
    document.querySelector(".tour-card")?.remove();
    if (!activeTour) return;
    const step = activeTour.steps[activeTour.index];
    const target = step.selector ? document.querySelector(step.selector) : null;
    if (target) { target.classList.add("tour-highlight"); target.scrollIntoView({ behavior: "smooth", block: "center" }); }
    const node = document.createElement("section");
    node.className = "tour-card";
    node.innerHTML = `<p class="eyebrow">Tur produk · ${activeTour.index + 1}/${activeTour.steps.length}</p><div class="tour-progress">${activeTour.steps.map((_, i) => `<i class="${i <= activeTour.index ? "done" : ""}"></i>`).join("")}</div><h3>${escape(step.title)}</h3><p>${escape(step.text)}</p><div class="tour-actions"><button class="btn btn-secondary btn-sm" data-tour-back ${activeTour.index === 0 ? "disabled" : ""}>Kembali</button><button class="btn btn-primary btn-sm" data-tour-next>${activeTour.index === activeTour.steps.length - 1 ? "Selesai" : "Lanjut"}</button><button class="tour-close" data-tour-close>Tutup</button></div>`;
    document.body.appendChild(node);
    node.querySelector("[data-tour-back]").addEventListener("click", () => { activeTour.index--; renderTour(); });
    node.querySelector("[data-tour-next]").addEventListener("click", () => { if (activeTour.index === activeTour.steps.length - 1) stopTour(); else { activeTour.index++; renderTour(); } });
    node.querySelector("[data-tour-close]").addEventListener("click", stopTour);
  }
  function stopTour() { clearHighlight(); document.querySelector(".tour-card")?.remove(); activeTour = null; }

  function bars(values, labels, tone = "") {
    const max = Math.max(...values, 1);
    return `<div class="chart">${values.map((value, index) => `<div class="bar-group"><div class="bar ${tone}" style="height:${Math.max(6, (value/max)*92)}%" title="${escape(labels[index])}: ${number(value)}"></div><span class="bar-label">${escape(labels[index])}</span></div>`).join("")}</div>`;
  }

  window.KaryaloDemo = {
    PRODUCT_META, seed, icon, getState, saveState, updateState, resetState,
    money, number, escape, appHref, mount, setActiveNav, page, heading, metric,
    status, toast, modal, closeModal, startTour, bars,
  };
})();
