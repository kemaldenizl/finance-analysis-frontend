export function DataEntrySection() {
  return (
    <section className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:mt-14">
      <h3 className="text-xl font-semibold">Ekstre verisini nasıl topluyoruz?</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-background p-4 dark:border-white/10">
          <p className="text-sm font-semibold">Manuel Giriş</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Kullanıcılar satır bazlı hareket ekleyebilir.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-background p-4 dark:border-white/10">
          <p className="text-sm font-semibold">Dosya Yükleme</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            PDF/CSV ekstresini yükle, veriyi otomatik okuyup analize
            hazırlayalım.
          </p>
        </div>
      </div>
    </section>
  );
}
