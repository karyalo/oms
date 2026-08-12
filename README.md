# Karyalo Stock (OMS) — Alina Adaptation Demo

Pecahan operasional dari repository `Karsa-Swakarya-Loka/Alina_warehouse`, ditambah konteks order/shipping dari Alina Ecommerce.

## Cakupan demo

- Pipeline New Order → Processing → Picking → Packing → Ready To Ship → Shipped → Completed.
- Stock In/Out, source/destination, quality, channel allocation, barcode, dan audit.
- Stock opname, packing, Ship By, shipping/resi, dan laporan warehouse.
- Cross-link ke Store/POS sebagai channel dan Finance sebagai pencatatan akhir.

## Jalankan

```powershell
npm start
```

Port default: `3103`. Lihat [`ALINA_ADAPTATION.md`](./ALINA_ADAPTATION.md). Semua data bersifat simulasi.
