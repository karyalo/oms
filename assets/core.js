(function () {
  "use strict";

  const PRODUCT_PORTS = { store: 3101, cms: 3102, oms: 3103, pos: 3104, finance: 3105 };
  const LOCAL_PORTS = { store: 4101, cms: 4102, oms: 4103, pos: 4104, finance: 4105 };
  const PUBLIC_DEMO_URLS = {
    store: "https://trusts-airports-shades-frames.trycloudflare.com/",
    cms: "https://appointment-chester-strategic-air.trycloudflare.com/",
    oms: "https://parcel-charged-civic-pound.trycloudflare.com/",
    pos: "https://statement-asn-warm-viewed.trycloudflare.com/",
    finance: "https://mighty-shaw-house-applicant.trycloudflare.com/",
  };
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
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  };

  // Demo-safe projection of the two Alina repositories. It mirrors their data
  // model and workflows without connecting to the production Convex/MySQL data.
  const seed = {
    source: {
      ecommerceCommit: "fff6ae0",
      warehouseCommit: "66c577a",
      warehouseSkuCount: 134,
      note: "Data simulasi yang mengikuti struktur repositori Alina",
    },
    products: [
      { id:"ALN-DEW-REG-ALLSIZE-HIT", productId:"PROD-DEW-001", name:"Kemeja Alina Dewasa Reguler Allsize Hitam", category:"Dewasa", variant:"Reguler", color:"Hitam", size:"Allsize", cost:32500, price:85000, retailPrice:85000, marketerPrice:70000, resellerPrice:57500, agenPrice:50000, distributorPrice:42500, stock:48, minimumStock:12, status:"Active", image:"./assets/products/classic-shirt.webp", channels:{"E-Commerce":16,Shopee:8,TikTok:7,Tokopedia:7,WhatsApp:5,Offline:5} },
      { id:"ALN-DEW-RIB-ALLSIZE-NAV", productId:"PROD-DEW-002", name:"Kemeja Alina Dewasa RIB Allsize Navy", category:"Dewasa", variant:"RIB", color:"Navy", size:"Allsize", cost:37500, price:90000, retailPrice:90000, marketerPrice:75000, resellerPrice:62500, agenPrice:55000, distributorPrice:47500, stock:35, minimumStock:12, status:"Active", image:"./assets/products/hoodie.webp", channels:{"E-Commerce":10,Shopee:6,TikTok:5,Tokopedia:5,WhatsApp:4,Offline:5} },
      { id:"ALN-DEW-REG-JUMBO-MAR", productId:"PROD-DEW-003", name:"Kemeja Alina Dewasa Reguler Jumbo Maroon", category:"Dewasa", variant:"Reguler", color:"Maroon", size:"Jumbo", cost:37500, price:90000, retailPrice:90000, marketerPrice:75000, resellerPrice:62500, agenPrice:55000, distributorPrice:47500, stock:9, minimumStock:12, status:"Active", image:"./assets/products/jacket.webp", channels:{"E-Commerce":2,Shopee:2,TikTok:1,Tokopedia:1,WhatsApp:1,Offline:2} },
      { id:"ALN-DEW-RIB-JUMBO-SAG", productId:"PROD-DEW-004", name:"Kemeja Alina Dewasa RIB Jumbo Sage", category:"Dewasa", variant:"RIB", color:"Sage", size:"Jumbo", cost:42500, price:95000, retailPrice:95000, marketerPrice:80000, resellerPrice:67500, agenPrice:60000, distributorPrice:52500, stock:24, minimumStock:12, status:"Active", image:"./assets/products/sweater.webp", channels:{"E-Commerce":7,Shopee:4,TikTok:3,Tokopedia:3,WhatsApp:3,Offline:4} },
      { id:"ALN-DEW-REG-EXJ-PUT", productId:"PROD-DEW-005", name:"Kemeja Alina Dewasa Reguler Extra Jumbo Putih", category:"Dewasa", variant:"Reguler", color:"Putih", size:"Extra Jumbo", cost:42500, price:97500, retailPrice:97500, marketerPrice:82500, resellerPrice:67500, agenPrice:60000, distributorPrice:52500, stock:6, minimumStock:12, status:"Active", image:"./assets/products/suit.webp", channels:{"E-Commerce":1,Shopee:1,TikTok:1,Tokopedia:1,WhatsApp:1,Offline:1} },
      { id:"ALN-KID-REG-K1-HIT", productId:"PROD-KID-001", name:"Kemeja Alina Kids Reguler Kids 1 Hitam", category:"Kids", variant:"Reguler", color:"Hitam", size:"Kids 1", cost:22500, price:65000, retailPrice:65000, marketerPrice:52500, resellerPrice:45000, agenPrice:38500, distributorPrice:32500, stock:42, minimumStock:10, status:"Active", image:"./assets/products/tee.webp", channels:{"E-Commerce":14,Shopee:7,TikTok:6,Tokopedia:5,WhatsApp:4,Offline:6} },
      { id:"ALN-KID-RIB-K2-NAV", productId:"PROD-KID-002", name:"Kemeja Alina Kids RIB Kids 2 Navy", category:"Kids", variant:"RIB", color:"Navy", size:"Kids 2", cost:27500, price:75000, retailPrice:75000, marketerPrice:60000, resellerPrice:52500, agenPrice:45000, distributorPrice:37500, stock:18, minimumStock:10, status:"Active", image:"./assets/products/calm-pant.webp", channels:{"E-Commerce":6,Shopee:3,TikTok:2,Tokopedia:2,WhatsApp:2,Offline:3} },
      { id:"ALN-KID-RIB-K3-SAG", productId:"PROD-KID-003", name:"Kemeja Alina Kids RIB Kids 3 Sage", category:"Kids", variant:"RIB", color:"Sage", size:"Kids 3", cost:31500, price:80000, retailPrice:80000, marketerPrice:65000, resellerPrice:55500, agenPrice:48000, distributorPrice:41500, stock:0, minimumStock:10, status:"Inactive", image:"./assets/products/modern-pant.webp", channels:{"E-Commerce":0,Shopee:0,TikTok:0,Tokopedia:0,WhatsApp:0,Offline:0} },
    ],
    orders: [
      { id:"ORD-20260608-0001", customer:"Rania Hijab Store", customerTier:"reseller", channel:"WhatsApp", total:460000, items:8, sku:"ALN-DEW-REG-ALLSIZE-HIT", status:"New Order", date:"8 Jun, 10:15", courier:"JNE Reg", shipBy:"10 Jun 2026" },
      { id:"ORD-20260608-0002", customer:"Zahra Agen Busana", customerTier:"agen", channel:"Offline", total:825000, items:15, sku:"ALN-DEW-REG-JUMBO-MAR", status:"Processing", date:"8 Jun, 11:30", courier:"Ambil gudang", shipBy:"—" },
      { id:"ORD-20260608-0003", customer:"Shopee Mall Order", customerTier:"ecer", channel:"Shopee", total:325000, items:5, sku:"ALN-KID-REG-K1-HIT", status:"Completed", date:"8 Jun, 12:00", courier:"Shopee Express", tracking:"SPX-9988112233" },
      { id:"ORD-20260607-0004", customer:"Aisyah Marketer", customerTier:"marketer", channel:"TikTok", total:900000, items:12, sku:"ALN-DEW-RIB-ALLSIZE-NAV", status:"Shipped", date:"7 Jun, 19:00", courier:"JNE Reg", tracking:"JNE-88229911" },
      { id:"ECOMM-20260627-0130", customer:"Nadia Putri", customerTier:"ecer", channel:"E-Commerce", total:198000, items:2, sku:"ALN-DEW-REG-EXJ-PUT", status:"Packing", date:"27 Jun, 16:31", courier:"SiCepat", shipBy:"28 Jun 2026" },
    ],
    transactions: [
      { id:"ORD-20260608-0001", type:"Pemasukan", category:"Penjualan Reseller", channel:"WhatsApp", payment:"Transfer Manual", amount:460000, items:8, fee:0, date:"8 Jun 2026", status:"Paid" },
      { id:"ORD-20260608-0002", type:"Pemasukan", category:"Penjualan Agen", channel:"Offline", payment:"Tunai", amount:825000, items:15, fee:0, date:"8 Jun 2026", status:"Paid" },
      { id:"ORD-20260608-0003", type:"Pemasukan", category:"Penjualan Retail", channel:"Shopee", payment:"Marketplace", amount:325000, items:5, fee:13000, date:"8 Jun 2026", status:"Paid" },
      { id:"ORD-20260607-0004", type:"Pemasukan", category:"Penjualan Marketer", channel:"TikTok", payment:"Marketplace", amount:900000, items:12, fee:36000, date:"7 Jun 2026", status:"Paid" },
      { id:"ECOMM-20260627-0130", type:"Pemasukan", category:"Penjualan Retail", channel:"E-Commerce", payment:"Transfer Manual", amount:198000, items:2, fee:0, date:"27 Jun 2026", status:"Pending" },
    ],
    customers: [
      { id:"CUST-001", name:"Rania Hijab Store", email:"rania@gmail.com", phone:"081234567890", city:"Jakarta Selatan", orders:5, spent:2839000, segment:"Reseller" },
      { id:"CUST-002", name:"Zahra Agen Busana", email:"zahra.agen@yahoo.com", phone:"082345678901", city:"Bandung", orders:3, spent:1756000, segment:"Agen" },
      { id:"CUST-003", name:"Aisyah Marketer", email:"aisyah_market@gmail.com", phone:"083456789012", city:"Yogyakarta", orders:4, spent:2210000, segment:"Marketer" },
      { id:"CUST-004", name:"Shopee Mall Order", email:"shopee@alina.com", phone:"08999999999", city:"Jakarta Barat", orders:12, spent:4938000, segment:"Shopee" },
    ],
    stockIn: [
      { id:"STK-IN-0001", date:"1 Jun 2026", sku:"ALN-DEW-REG-ALLSIZE-HIT", name:"Kemeja Alina Dewasa Reguler Allsize Hitam", qty:100, source:"Konveksi", quality:"Good", channel:"E-Commerce", notes:"Produksi Batch A" },
      { id:"STK-IN-0002", date:"3 Jun 2026", sku:"ALN-KID-REG-K1-HIT", name:"Kemeja Alina Kids Reguler Kids 1 Hitam", qty:150, source:"Konveksi", quality:"Good", channel:"Shopee", notes:"Kiriman Konveksi" },
    ],
    stockOut: [
      { id:"STK-OUT-0001", date:"4 Jun 2026", sku:"ALN-DEW-REG-ALLSIZE-HIT", name:"Kemeja Alina Dewasa Reguler Allsize Hitam", customer:"Rania Hijab Store", qty:10, destination:"Sales", quality:"Good", channel:"WhatsApp", notes:"Order Direct Reseller" },
    ],
    opname: [
      { id:"OPN-0001", month:"Mei 2026", sku:"ALN-DEW-REG-ALLSIZE-HIT", name:"Kemeja Alina Dewasa Reguler Allsize Hitam", system:30, physical:30, difference:0, date:"31 Mei 2026", channel:"E-Commerce" },
    ],
    cart: [], posCart: [], wishlist: ["ALN-DEW-RIB-ALLSIZE-NAV"],
    profile: { name:"Nadia Putri", email:"nadia@example.com", phone:"081234567890", tier:"ecer", joined:"Juni 2026" },
    session: { loggedIn:true, role:"customer" },
    addresses: [
      { id:"ADDR-001", label:"Rumah", recipient:"Nadia Putri", phone:"081234567890", address:"Jl. Pajajaran No. 10", area:"Bogor Tengah, Kota Bogor, Jawa Barat 16128", primary:true },
      { id:"ADDR-002", label:"Kantor", recipient:"Nadia Putri", phone:"081234567890", address:"Jl. Sudirman Kav. 24", area:"Tanah Abang, Jakarta Pusat 10220", primary:false },
    ],
    vouchers: [
      { code:"ALINABARU", type:"Persen", value:10, maxDiscount:25000, minSpend:100000, audience:"Publik", used:38, limit:100, status:"Aktif", expires:"31 Agu 2026", claimed:true },
      { code:"RESELLER50", type:"Nominal", value:50000, maxDiscount:50000, minSpend:500000, audience:"Targeted", used:12, limit:50, status:"Aktif", expires:"15 Sep 2026", claimed:false },
      { code:"FREESHIP", type:"Ongkir", value:20000, maxDiscount:20000, minSpend:150000, audience:"Publik", used:100, limit:100, status:"Selesai", expires:"30 Jun 2026", claimed:false },
    ],
    siteContent: { eyebrow:"ALINA · Kemeja untuk semua", headline:"Nyaman dipakai, mudah dipadukan.", description:"Koleksi Kemeja Alina untuk Dewasa dan Kids dalam varian Reguler serta RIB.", announcement:"Gratis ongkir hingga Rp20.000 untuk belanja pilihan.", whatsapp:"6281234567890", codEnabled:true, codMaxAmount:1000000, saleEnabled:true },
    team: [
      { id:"USR-001", name:"Superadmin Alina", email:"superadmin@alina.demo", role:"Superadmin", access:"Semua modul", status:"Aktif" },
      { id:"USR-002", name:"Admin Katalog", email:"catalog@alina.demo", role:"Admin", access:"Produk, voucher, pelanggan", status:"Aktif" },
      { id:"USR-003", name:"Staf Warehouse", email:"warehouse@alina.demo", role:"Staff", access:"Order, stock, shipping", status:"Aktif" },
    ],
    b2bApplications: [
      { id:"B2B-001", name:"Toko Rania Hijab", contact:"Rania", phone:"081234567890", city:"Jakarta Selatan", requestedTier:"Reseller", status:"Menunggu", submitted:"8 Agu 2026" },
      { id:"B2B-002", name:"Zahra Busana", contact:"Zahra", phone:"082345678901", city:"Bandung", requestedTier:"Agen", status:"Disetujui", submitted:"6 Agu 2026" },
    ],
    monitoring: [
      { id:"SYNC-001", service:"Warehouse Catalog", status:"Sehat", detail:"134 SKU terbaca", time:"2 menit lalu" },
      { id:"SYNC-002", service:"Payment Webhook", status:"Sehat", detail:"Respons 184 ms", time:"5 menit lalu" },
      { id:"SYNC-003", service:"Shipping Quote", status:"Perlu perhatian", detail:"1 retry simulasi", time:"11 menit lalu" },
    ],
    settings: { requireShipBy:true, defaultStatus:"New Order", commissionPerItem:2000, theme:"Alina Plum", offlineMode:false },
    updatedAt: 1,
    audit: [
      { action:"Stok ALN-DEW-REG-JUMBO-MAR di bawah minimum", actor:"Warehouse", time:"8 menit lalu" },
      { action:"Order ECOMM-20260627-0130 masuk Packing", actor:"Sistem", time:"31 menit lalu" },
      { action:"Harga tier Kemeja Alina tersinkron", actor:"Superadmin", time:"47 menit lalu" },
    ],
  };

  function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.box}</svg>`;
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function stateKey() { return "karyalo-alina-demo-state-v5"; }
  function hydrate(value) {
    const next = Object.assign(clone(seed), value || {});
    ["products","orders","transactions","customers","stockIn","stockOut","opname","cart","posCart","audit","wishlist","addresses","vouchers","team","b2bApplications","monitoring"].forEach(key => {
      if (!Array.isArray(next[key])) next[key] = clone(seed[key]);
    });
    ["source","profile","session","siteContent","settings"].forEach(key => {
      next[key] = Object.assign({}, clone(seed[key]), value?.[key] || {});
    });
    return next;
  }
  function bridgeRead() {
    try {
      if (!window.name?.startsWith("karyalo-demo:")) return null;
      return JSON.parse(window.name.slice("karyalo-demo:".length));
    } catch { return null; }
  }
  function getState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(stateKey()) || "null");
      const bridged = bridgeRead();
      const newest = (bridged?.updatedAt || 0) > (parsed?.updatedAt || 0) ? bridged : parsed;
      const next = hydrate(newest);
      if (bridged === newest && newest) localStorage.setItem(stateKey(), JSON.stringify(next));
      return next;
    } catch { return hydrate(null); }
  }
  function saveState(state) {
    const next = hydrate(state);
    next.updatedAt = Date.now();
    localStorage.setItem(stateKey(), JSON.stringify(next));
    try { window.name = `karyalo-demo:${JSON.stringify(next)}`; } catch {}
    return next;
  }
  function updateState(callback) { const state = getState(); callback(state); return saveState(state); }
  function resetState() {
    localStorage.removeItem(stateKey());
    try { window.name = ""; } catch {}
    const next = saveState(clone(seed));
    toast("Data demo dikembalikan ke kondisi awal.");
    return next;
  }
  const money = value => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
  const number = value => new Intl.NumberFormat("id-ID").format(value);
  const escape = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char]));
  function downloadCsv(filename, headers, rows) {
    const quote = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = "\uFEFF" + [headers, ...rows].map(row => row.map(quote).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type:"text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`${filename} berhasil diunduh.`);
  }
  function copyText(value, success = "Tersalin ke clipboard.") {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(String(value)).then(() => toast(success)).catch(() => toast("Salin manual dari layar."));
    else toast("Salin manual dari layar.");
  }

  function appHref(product) {
    const meta = PRODUCT_META[product];
    const host = location.hostname || "127.0.0.1";
    if (host.endsWith(".trycloudflare.com")) return PUBLIC_DEMO_URLS[product];
    if (host.endsWith("karyalo.com") && !/^\d/.test(host)) return `https://${product === "cms" ? "cms" : product === "oms" ? "oms" : product}.karyalo.com/`;
    const current = Number(location.port);
    const ports = current >= 4101 && current <= 4105 ? LOCAL_PORTS : PRODUCT_PORTS;
    return `${location.protocol}//${host}:${ports[product]}/`;
  }

  function renderSwitcher(current) {
    return Object.entries(PRODUCT_META).map(([key, meta]) => `<a class="switch-app ${key === current ? "current" : ""}" href="${appHref(key)}" title="${meta.label} — ${meta.description}" aria-label="Buka Karyalo ${meta.label} — ${meta.description}"><span class="switch-short" aria-hidden="true">${meta.short}</span><span class="switch-name" aria-hidden="true">${meta.label}</span></a>`).join("");
  }

  function mount(options) {
    document.title = `${options.title} — Karyalo Demo`;
    const groupedNav = options.nav.map(item => item.labelOnly
      ? `<div class="nav-label">${escape(item.labelOnly)}</div>`
      : `<button class="nav-item ${item.id === options.active ? "active" : ""}" data-view="${item.id}">${icon(item.icon || "home")}<span>${escape(item.label)}</span>${item.badge ? `<span class="nav-badge">${escape(item.badge)}</span>` : ""}</button>`
    ).join("");
    document.getElementById("app").innerHTML = `
      <div class="app-shell">
        <aside class="sidebar" id="sidebar" aria-label="Menu aplikasi">
          <a class="brand" href="#" data-view="${options.active || "dashboard"}">
            <span class="brand-mark"><img src="./assets/alina-monogram.png" alt=""></span>
            <span class="brand-copy"><strong>${escape(options.brand || `Karyalo ${PRODUCT_META[options.app].label}`)}</strong><span>${PRODUCT_META[options.app].description}</span></span>
          </a>
          <div class="demo-pill"><span class="demo-dot"></span> Mode demo interaktif</div>
          <nav class="side-nav" aria-label="Navigasi aplikasi">${groupedNav}</nav>
          <div class="sidebar-spacer"></div>
          <details class="app-switcher" open>
            <summary><span>Pindah aplikasi</span><span>↗</span></summary>
            <div class="switch-grid">${renderSwitcher(options.app)}</div>
          </details>
        </aside>
        <button class="sidebar-scrim" id="sidebar-scrim" aria-label="Tutup menu" hidden></button>
        <div class="main-wrap">
          <header class="topbar">
            <button class="mobile-menu" id="mobile-menu" aria-label="Buka menu" aria-controls="sidebar" aria-expanded="false">${icon("menu")}</button>
            <div class="top-title"><strong>${escape(options.title)}</strong><span>${escape(options.subtitle || "Alina Demo Company")}</span></div>
            <div class="top-actions">
              <button class="btn btn-secondary btn-sm" id="start-tour">${icon("play")} Tur singkat</button>
              <button class="icon-btn" id="notifications" aria-label="Notifikasi">${icon("bell")}<span class="notification-dot"></span></button>
              <div class="profile"><span class="avatar">SA</span><span class="profile-copy"><strong>Superadmin Alina</strong><span>Mode demo</span></span></div>
            </div>
          </header>
          <main class="page" id="page" tabindex="-1"></main>
        </div>
        <button class="mobile-tour-fab" id="mobile-tour-fab" aria-label="Mulai tur singkat produk">${icon("play")}<span>Tur singkat</span></button>
      </div>`;
    document.getElementById("mobile-menu").addEventListener("click", () => setSidebar(!document.getElementById("sidebar").classList.contains("open")));
    document.getElementById("sidebar-scrim").addEventListener("click", () => setSidebar(false));
    document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", event => {
      event.preventDefault();
      const view = button.dataset.view;
      options.onNavigate(view);
      setSidebar(false);
    }));
    document.getElementById("notifications").addEventListener("click", showNotifications);
    document.getElementById("start-tour").addEventListener("click", () => startTour(options.tour || []));
    document.getElementById("mobile-tour-fab").addEventListener("click", () => startTour(options.tour || []));
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (activeTour) stopTour();
      else if (document.querySelector("#modal-root .modal")) closeModal();
      else setSidebar(false);
    });
  }

  function setSidebar(open) {
    const sidebar = document.getElementById("sidebar");
    const trigger = document.getElementById("mobile-menu");
    const scrim = document.getElementById("sidebar-scrim");
    if (!sidebar || !trigger || !scrim) return;
    sidebar.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    scrim.hidden = !open;
    document.body.classList.toggle("nav-open", open && matchMedia("(max-width: 900px)").matches);
  }

  function enhanceResponsiveTables(root) {
    root.querySelectorAll("table").forEach(table => {
      const labels = [...table.querySelectorAll("thead th")].map(cell => cell.textContent.trim());
      table.querySelectorAll("tbody tr").forEach(row => {
        [...row.children].forEach((cell, index) => {
          if (!cell.dataset.label && labels[index]) cell.dataset.label = labels[index];
        });
      });
    });
  }

  function setActiveNav(view) {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  }
  function page(html) {
    const target = document.getElementById("page");
    target.innerHTML = html;
    enhanceResponsiveTables(target);
    target.focus({ preventScroll: true });
  }
  function heading(eyebrow, title, description, actions = "") {
    return `<div class="page-heading"><div><p class="eyebrow">${escape(eyebrow)}</p><h1>${escape(title)}</h1><p class="lede">${escape(description)}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
  }
  function metric(label, value, detail, iconName = "chart", tone = "") {
    return `<article class="card metric-card"><div class="metric-top"><span>${escape(label)}</span><span class="metric-icon ${tone}">${icon(iconName)}</span></div><div class="metric-value">${value}</div><span class="delta">${icon("arrow")} ${escape(detail)}</span></article>`;
  }
  function status(value) {
    const danger = /Habis|Inactive|Cancelled|Ditolak|Jatuh tempo|Reject/i.test(value);
    const warning = /rendah|menunggu|Pending|Packing|Picking|Processing|New Order|Perlu/i.test(value);
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
    document.body.classList.add("modal-open");
    root.innerHTML = `<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-head"><h2 id="modal-title">${escape(title)}</h2><button class="close-btn" data-close-modal aria-label="Tutup">${icon("close")}</button></header><div class="modal-body">${body}</div>${actions ? `<footer class="modal-actions">${actions}</footer>` : ""}</section></div>`;
    root.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
    root.querySelector(".modal-backdrop").addEventListener("click", event => { if (event.target.classList.contains("modal-backdrop")) closeModal(); });
    root.querySelector("button, input, select")?.focus();
  }
  function closeModal() { document.getElementById("modal-root").innerHTML = ""; document.body.classList.remove("modal-open"); }
  function showNotifications() {
    const data = getState().audit;
    modal("Aktivitas terbaru", `<div class="list">${data.map(item => `<div class="list-item"><span class="list-icon">${icon("check")}</span><div class="list-copy"><strong>${escape(item.action)}</strong><span>${escape(item.actor)} · ${escape(item.time)}</span></div></div>`).join("")}</div>`, `<button class="btn btn-secondary" data-close-modal>Tutup</button>`);
  }

  let activeTour = null;
  function clearHighlight() { document.querySelector(".tour-highlight")?.classList.remove("tour-highlight"); }
  function startTour(steps) {
    if (!steps.length) return toast("Tur untuk layar ini segera tersedia.");
    activeTour = { steps, index: 0 };
    document.body.classList.add("tour-active");
    renderTour();
  }
  function renderTour() {
    clearHighlight();
    document.querySelector(".tour-card")?.remove();
    if (!activeTour) return;
    const step = activeTour.steps[activeTour.index];
    const target = step.selector ? document.querySelector(step.selector) : null;
    const mobile = matchMedia("(max-width: 900px)").matches;
    if (mobile) setSidebar(Boolean(target?.closest(".sidebar")));
    if (target) {
      target.classList.add("tour-highlight");
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    const node = document.createElement("section");
    node.className = "tour-card";
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-label", `Tur produk langkah ${activeTour.index + 1}`);
    node.innerHTML = `<p class="eyebrow">Tur produk · ${activeTour.index + 1}/${activeTour.steps.length}</p><div class="tour-progress">${activeTour.steps.map((_, i) => `<i class="${i <= activeTour.index ? "done" : ""}"></i>`).join("")}</div><h3>${escape(step.title)}</h3><p>${escape(step.text)}</p><div class="tour-actions"><button class="btn btn-secondary btn-sm" data-tour-back ${activeTour.index === 0 ? "disabled" : ""}>Kembali</button><button class="btn btn-primary btn-sm" data-tour-next>${activeTour.index === activeTour.steps.length - 1 ? "Selesai" : "Lanjut"}</button><button class="tour-close" data-tour-close>Tutup</button></div>`;
    document.body.appendChild(node);
    node.querySelector("[data-tour-back]").addEventListener("click", () => { activeTour.index--; renderTour(); });
    node.querySelector("[data-tour-next]").addEventListener("click", () => { if (activeTour.index === activeTour.steps.length - 1) stopTour(); else { activeTour.index++; renderTour(); } });
    node.querySelector("[data-tour-close]").addEventListener("click", stopTour);
  }
  function stopTour() {
    clearHighlight();
    document.querySelector(".tour-card")?.remove();
    document.body.classList.remove("tour-active");
    if (matchMedia("(max-width: 900px)").matches) setSidebar(false);
    activeTour = null;
  }

  function bars(values, labels, tone = "") {
    const max = Math.max(...values, 1);
    return `<div class="chart">${values.map((value, index) => `<div class="bar-group"><div class="bar ${tone}" style="height:${Math.max(6, (value/max)*92)}%" title="${escape(labels[index])}: ${number(value)}"></div><span class="bar-label">${escape(labels[index])}</span></div>`).join("")}</div>`;
  }

  window.KaryaloDemo = {
    PRODUCT_META, seed, icon, getState, saveState, updateState, resetState,
    money, number, escape, appHref, mount, setActiveNav, page, heading, metric,
    status, toast, modal, closeModal, startTour, bars, downloadCsv, copyText,
  };
})();
