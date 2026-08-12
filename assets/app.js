(function () {
  const K = window.KaryaloDemo;
  let view = "dashboard";
  const nav = [
    { labelOnly: "Operasional" },
    { id: "dashboard", label: "Ringkasan", icon: "home" },
    { id: "orders", label: "Pesanan", icon: "orders", badge: "6" },
    { id: "inventory", label: "Inventory", icon: "box", badge: "2" },
    { id: "opname", label: "Stock Opname", icon: "check" },
    { id: "warehouse", label: "Gudang & Transfer", icon: "truck" },
    { labelOnly: "Kontrol" },
    { id: "returns", label: "Retur", icon: "refresh" },
    { id: "reports", label: "Laporan", icon: "chart" },
  ];
  const tour = [
    { selector: ".metric-grid", title: "Fokus ke pekerjaan hari ini", text: "Tim langsung melihat order yang harus diproses, risiko terlambat, dan stok rendah." },
    { selector: ".kanban", title: "Order bergerak sesuai status", text: "Klik satu order untuk memeriksa detail lalu lanjutkan dari validasi ke picking, packing, dan pengiriman." },
    { selector: ".low-stock-card", title: "Inventory ikut bergerak", text: "Ketersediaan produk terlihat per SKU dan dapat disesuaikan dengan alasan yang tercatat." },
    { selector: ".app-switcher", title: "Satu alur lintas produk", text: "Order berasal dari Store/POS dan hasil penjualan diteruskan ke Finance tanpa input ulang." },
  ];

  K.mount({ app: "oms", title: "Karyalo Stock", subtitle: "OMS / Pesanan & Stok · Alina Demo", nav, active: view, tour, onNavigate: navigate });
  navigate("dashboard");

  function navigate(next) {
    view = next;
    K.setActiveNav(view);
    ({ dashboard: renderDashboard, orders: renderOrders, inventory: renderInventory, opname: renderOpname, warehouse: renderWarehouse, returns: renderReturns, reports: renderReports }[view] || renderDashboard)();
  }

  function openOrders() { return K.getState().orders.filter(order => !["Selesai", "Dikirim"].includes(order.status)); }

  function renderDashboard() {
    const state = K.getState();
    const low = state.products.filter(product => product.stock < 10);
    K.page(`${K.heading("Operasional hari ini", "Order bergerak, stok tetap terkendali.", "Satu tampilan untuk memproses pesanan online/offline dan memantau persediaan Alina.", `<button class="btn btn-secondary" data-scan>${K.icon("scan")} Scan picking</button><button class="btn btn-primary" data-go-orders>${K.icon("orders")} Proses pesanan</button>`)}
      <div class="grid metric-grid">${K.metric("Perlu diproses", openOrders().length, "2 order baru sejak pagi", "orders")}${K.metric("Siap dikirim", "3", "Pickup pukul 15.00", "truck")}${K.metric("Stok rendah", low.length, "Perlu restock minggu ini", "box", "gold")}${K.metric("Akurasi stok", "98,7%", "+1,2% dari opname terakhir", "check")}</div>
      <section class="card"><div class="card-head"><div><h2>Alur pesanan hari ini</h2><span class="muted small">Klik kartu untuk lanjutkan proses</span></div><button class="btn btn-secondary btn-sm" data-go-orders>Lihat semua</button></div><div class="card-body">${kanbanMarkup(state.orders)}</div></section>
      <div class="grid grid-2 section-gap"><section class="card card-pad low-stock-card"><div style="display:flex;justify-content:space-between;align-items:start"><div><p class="eyebrow">Stok perlu perhatian</p><h2>${low.length} SKU di bawah batas aman</h2></div><button class="btn btn-secondary btn-sm" data-go-inventory>Kelola inventory</button></div><div class="list">${low.map(product => `<div class="list-item"><span class="list-icon">${K.icon("box")}</span><div class="list-copy"><strong>${product.name}</strong><span>${product.id} · ${product.category}</span></div><div style="min-width:120px"><div class="progress ${product.stock === 0 ? "danger" : "warn"}"><span style="width:${Math.min(100, product.stock*7)}%"></span></div><div class="small muted" style="margin-top:5px">${product.stock} tersedia</div></div></div>`).join("")}</div></section><section class="card card-pad" style="background:var(--sage)"><p class="eyebrow">Omnichannel flow</p><h2>Online dan offline memakai stok yang sama.</h2><p class="muted">Order Store dan transaksi POS sama-sama mereservasi atau mengurangi persediaan, sehingga tim tidak perlu rekap manual.</p><div class="summary-strip"><div><span>Store</span><strong>3 order</strong></div><div><span>POS</span><strong>2 sale</strong></div><div><span>Stok</span><strong>147 unit</strong></div></div></section></div>`);
    bindDashboard(); bindOrderCards();
  }

  function kanbanMarkup(orders) {
    const columns = ["Perlu diproses", "Picking", "Packing", "Dikirim"];
    return `<div class="kanban">${columns.map(status => { const items = orders.filter(order => order.status === status); return `<section class="kanban-column"><div class="kanban-head"><span>${status}</span><span class="kanban-count">${items.length}</span></div>${items.length ? items.map(orderCard).join("") : `<div class="empty small"><span class="muted">Belum ada order</span></div>`}</section>`; }).join("")}</div>`;
  }
  function orderCard(order) { return `<article class="order-card" data-order="${order.id}"><div class="order-card-top"><strong>${order.id}</strong><span class="tag">${order.channel}</span></div><p>${order.customer} · ${order.items} item</p><div class="order-card-bottom"><span>${order.date}</span><strong>${K.money(order.total)}</strong></div></article>`; }
  function bindOrderCards() { document.querySelectorAll("[data-order]").forEach(card => card.addEventListener("click", () => showOrder(card.dataset.order))); }
  function bindDashboard() {
    document.querySelectorAll("[data-go-orders]").forEach(button => button.addEventListener("click", () => navigate("orders")));
    document.querySelector("[data-go-inventory]").addEventListener("click", () => navigate("inventory"));
    document.querySelector("[data-scan]").addEventListener("click", () => K.toast("Scanner demo aktif. Arahkan ke barcode picking list."));
  }

  function renderOrders() {
    const state = K.getState();
    K.page(`${K.heading("Pesanan", "Pusat pemrosesan order", "Validasi order dari semua channel, lalu gerakkan melalui picking, packing, dan shipping.", `<button class="btn btn-secondary">${K.icon("download")} Export</button><button class="btn btn-primary" data-new-order>${K.icon("plus")} Order manual</button>`)}<div class="tabs" style="margin-bottom:18px"><button class="tab active">Semua channel</button><button class="tab">Store</button><button class="tab">POS</button><button class="tab">Marketplace</button></div><section class="card"><div class="toolbar"><div class="search">${K.icon("search")}<input class="input" id="order-search" placeholder="Cari order atau pelanggan..."></div><select class="select"><option>Hari ini</option><option>7 hari terakhir</option></select></div><div class="card-body">${kanbanMarkup(state.orders)}</div></section>`);
    bindOrderCards();
    document.querySelector("[data-new-order]").addEventListener("click", () => K.toast("Form order manual siap digunakan dalam implementasi berikutnya."));
    document.getElementById("order-search").addEventListener("input", event => { const q=event.target.value.toLowerCase(); document.querySelectorAll(".order-card").forEach(card => card.hidden=!card.textContent.toLowerCase().includes(q)); });
  }

  function showOrder(id) {
    const order = K.getState().orders.find(item => item.id === id);
    const steps = ["Perlu diproses", "Picking", "Packing", "Dikirim", "Selesai"];
    const next = steps[Math.min(steps.indexOf(order.status) + 1, steps.length - 1)];
    K.modal(`Order ${order.id}`, `<div class="summary-strip"><div><span>Channel</span><strong>${order.channel}</strong></div><div><span>Pelanggan</span><strong>${order.customer}</strong></div><div><span>Total</span><strong>${K.money(order.total)}</strong></div></div><div class="section-gap"><div style="display:flex;justify-content:space-between;align-items:center"><h3>Status fulfillment</h3>${K.status(order.status)}</div><div class="progress"><span style="width:${Math.max(12, (steps.indexOf(order.status)+1)/steps.length*100)}%"></span></div><div class="small muted" style="display:flex;justify-content:space-between;margin-top:7px"><span>Validasi</span><span>Picking</span><span>Packing</span><span>Shipping</span></div></div><div class="card card-pad section-gap" style="background:var(--sand)"><strong>${order.items} produk untuk diproses</strong><p class="muted small" style="margin:5px 0 0">Lokasi picking: Gudang Utama · Rak A-02. Kurir: ${order.courier}.</p></div>`, `<button class="btn btn-secondary" data-close-modal>Tutup</button>${next !== order.status ? `<button class="btn btn-primary" data-advance>${K.icon("arrow")} Lanjut ke ${next}</button>` : ""}`);
    document.querySelector("[data-advance]")?.addEventListener("click", () => { K.updateState(state => { state.orders.find(item => item.id === id).status = next; state.audit.unshift({ action:`${id} dipindah ke ${next}`, actor:"Ayu", time:"Baru saja" }); }); K.closeModal(); K.toast(`Order dipindahkan ke ${next}.`); navigate(view); });
  }

  function renderInventory() {
    const products = K.getState().products;
    K.page(`${K.heading("Inventory", "Persediaan per SKU", "Pantau stok tersedia, stok yang direservasi, dan kebutuhan restock dari satu sumber data.", `<button class="btn btn-secondary">${K.icon("download")} Export stok</button><button class="btn btn-primary" data-adjust>${K.icon("plus")} Adjustment stok</button>`)}
      <section class="card low-stock-card"><div class="toolbar"><div class="search">${K.icon("search")}<input class="input" id="inventory-search" placeholder="Cari SKU atau produk..."></div><select class="select"><option>Semua lokasi</option><option>Gudang Utama</option><option>Outlet Bogor</option></select><select class="select"><option>Semua status</option><option>Stok rendah</option><option>Habis</option></select></div><div class="table-wrap"><table><thead><tr><th>Produk</th><th>Lokasi</th><th>Tersedia</th><th>Reservasi</th><th>Batas aman</th><th>Status</th><th></th></tr></thead><tbody>${products.map(product => `<tr data-search="${(product.id+product.name).toLowerCase()}"><td><div class="cell-main">${product.name}</div><div class="cell-sub">${product.id}</div></td><td>Gudang Utama</td><td><strong>${product.stock}</strong></td><td>${Math.min(product.stock, product.stock ? 2 : 0)}</td><td>10</td><td>${K.status(product.stock === 0 ? "Habis" : product.stock < 10 ? "Stok rendah" : "Aman")}</td><td><button class="btn btn-secondary btn-sm" data-adjust-sku="${product.id}">Sesuaikan</button></td></tr>`).join("")}</tbody></table></div></section>`);
    document.querySelector("[data-adjust]").addEventListener("click", () => adjustStock());
    document.querySelectorAll("[data-adjust-sku]").forEach(button => button.addEventListener("click", () => adjustStock(button.dataset.adjustSku)));
    document.getElementById("inventory-search").addEventListener("input", event => { const q=event.target.value.toLowerCase(); document.querySelectorAll("tbody tr").forEach(row => row.hidden=!row.dataset.search.includes(q)); });
  }

  function adjustStock(selected) {
    const products = K.getState().products;
    K.modal("Adjustment stok", `<div class="form-grid"><div class="field span-2"><label>Produk</label><select class="select" id="adjust-product" style="width:100%">${products.map(product => `<option value="${product.id}" ${selected === product.id ? "selected" : ""}>${product.id} · ${product.name} (${product.stock})</option>`).join("")}</select></div><div class="field"><label>Perubahan unit</label><input class="input" id="adjust-value" type="number" value="5"></div><div class="field"><label>Alasan</label><select class="select" id="adjust-reason" style="width:100%"><option>Restock diterima</option><option>Koreksi opname</option><option>Barang rusak</option><option>Retur pelanggan</option></select></div><div class="field span-2"><label>Catatan</label><textarea class="textarea" id="adjust-note" placeholder="Nomor dokumen atau catatan opsional"></textarea></div></div>`, `<button class="btn btn-secondary" data-close-modal>Batal</button><button class="btn btn-primary" data-save-adjust>${K.icon("check")} Simpan adjustment</button>`);
    document.querySelector("[data-save-adjust]").addEventListener("click", () => { const id=document.getElementById("adjust-product").value; const amount=Number(document.getElementById("adjust-value").value); K.updateState(state => { const product=state.products.find(item=>item.id===id); product.stock=Math.max(0,product.stock+amount); product.status=product.stock===0?"Habis":product.stock<10?"Stok rendah":"Aktif"; state.audit.unshift({action:`Stok ${id} disesuaikan ${amount>=0?"+":""}${amount}`,actor:"Ayu",time:"Baru saja"}); }); K.closeModal(); K.toast("Adjustment stok berhasil dicatat."); renderInventory(); });
  }

  function renderOpname() {
    const rows = K.getState().products.slice(0,6);
    K.page(`${K.heading("Stock Opname", "Hitung stok fisik dengan jejak audit", "Bandingkan catatan sistem dan hasil hitung fisik, lalu selesaikan selisih secara terkontrol.", `<button class="btn btn-secondary">Lihat riwayat</button><button class="btn btn-primary" data-start-opname>${K.icon("plus")} Mulai opname</button>`)}<section class="card"><div class="card-head"><div><h2>OPN-120826-01 · Gudang Utama</h2><span class="muted small">Draft · dibuat 12 Agu 2026</span></div>${K.status("Sedang dihitung")}</div><div class="table-wrap"><table><thead><tr><th>SKU</th><th>Produk</th><th>Stok sistem</th><th>Hitung fisik</th><th>Selisih</th><th>Status</th></tr></thead><tbody>${rows.map((p,i)=>`<tr><td>${p.id}</td><td class="cell-main">${p.name}</td><td>${p.stock}</td><td><input class="input" style="width:90px" type="number" value="${i===2?p.stock-1:p.stock}"></td><td>${i===2?"-1":"0"}</td><td>${K.status(i===2?"Perlu review":"Sesuai")}</td></tr>`).join("")}</tbody></table></div><div class="card-body" style="display:flex;justify-content:flex-end;gap:8px"><button class="btn btn-secondary">Simpan draft</button><button class="btn btn-primary" data-finish-opname>Selesaikan opname</button></div></section>`);
    document.querySelector("[data-start-opname]").addEventListener("click", () => K.toast("Sesi opname baru dibuat untuk Outlet Bogor."));
    document.querySelector("[data-finish-opname]").addEventListener("click", () => K.toast("Opname selesai. Satu selisih dikirim untuk approval."));
  }

  function renderWarehouse() {
    K.page(`${K.heading("Gudang & Transfer", "Posisi stok antar lokasi", "Lihat kapasitas lokasi dan pindahkan persediaan ketika satu outlet mulai kekurangan.", `<button class="btn btn-primary" data-transfer>${K.icon("truck")} Buat transfer</button>`)}<div class="grid grid-3"><article class="card card-pad"><p class="eyebrow">Lokasi utama</p><h2>Gudang Utama</h2><div class="metric-value">147 unit</div><p class="muted">8 SKU · 3 order sedang picking</p><div class="progress"><span style="width:63%"></span></div></article><article class="card card-pad"><p class="eyebrow">Outlet</p><h2>Outlet Bogor</h2><div class="metric-value">64 unit</div><p class="muted">7 SKU · 2 SKU perlu transfer</p><div class="progress warn"><span style="width:42%"></span></div></article><article class="card card-pad" style="background:var(--sage)"><p class="eyebrow">Rekomendasi</p><h2>Transfer 6 unit ke Outlet Bogor</h2><p class="muted">AL-003 dan AL-007 berisiko habis dalam tiga hari.</p><button class="btn btn-primary" data-transfer>Siapkan transfer</button></article></div><section class="card section-gap"><div class="card-head"><h2>Transfer berjalan</h2></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Dari</th><th>Ke</th><th>Item</th><th>Status</th><th>ETA</th></tr></thead><tbody><tr><td class="cell-main">TRF-1208-03</td><td>Gudang Utama</td><td>Outlet Bogor</td><td>8 unit</td><td>${K.status("Dalam perjalanan")}</td><td>Hari ini, 14.00</td></tr><tr><td class="cell-main">TRF-1108-02</td><td>Outlet Bogor</td><td>Gudang Utama</td><td>3 unit</td><td>${K.status("Selesai")}</td><td>11 Agu, 16.30</td></tr></tbody></table></div></section>`);
    document.querySelectorAll("[data-transfer]").forEach(button => button.addEventListener("click", () => K.toast("Draft transfer 6 unit berhasil dibuat.")));
  }

  function renderReturns() {
    K.page(`${K.heading("Retur", "Kelola pengembalian barang", "Validasi alasan retur, putuskan kondisi barang, dan kembalikan stok hanya bila layak jual.", `<button class="btn btn-primary">${K.icon("plus")} Buat retur</button>`)}<section class="card"><div class="table-wrap"><table><thead><tr><th>Retur</th><th>Order</th><th>Pelanggan</th><th>Alasan</th><th>Nilai</th><th>Status</th></tr></thead><tbody><tr><td class="cell-main">RTN-1208-04</td><td>ORD-240811-1009</td><td>Dewi Lestari</td><td>Ukuran tidak sesuai</td><td>${K.money(489000)}</td><td>${K.status("Menunggu inspeksi")}</td></tr><tr><td class="cell-main">RTN-1008-03</td><td>ORD-240809-0987</td><td>Mayang Sari</td><td>Tukar warna</td><td>${K.money(329000)}</td><td>${K.status("Selesai")}</td></tr></tbody></table></div></section>`);
  }

  function renderReports() {
    K.page(`${K.heading("Laporan Operasional", "Kecepatan order & kesehatan stok", "Gunakan data proses untuk menemukan bottleneck dan risiko inventory.", `<button class="btn btn-secondary">${K.icon("download")} Unduh laporan</button>`)}<div class="grid grid-2"><section class="card card-pad"><h2>Order diproses · 7 hari</h2>${K.bars([12,18,15,24,19,27,22],["Sen","Sel","Rab","Kam","Jum","Sab","Min"])}<div class="legend"><span><i></i>Order selesai</span></div></section><section class="card card-pad"><h2>Waktu rata-rata per tahap</h2><div class="list"><div class="list-item"><span class="list-icon">${K.icon("check")}</span><div class="list-copy"><strong>Validasi order</strong><span>Target &lt; 15 menit</span></div><span class="amount">11 mnt</span></div><div class="list-item"><span class="list-icon">${K.icon("box")}</span><div class="list-copy"><strong>Picking</strong><span>Target &lt; 45 menit</span></div><span class="amount">38 mnt</span></div><div class="list-item"><span class="list-icon">${K.icon("truck")}</span><div class="list-copy"><strong>Packing → pickup</strong><span>Target &lt; 3 jam</span></div><span class="amount">2,4 jam</span></div></div></section></div>`);
  }
})();
