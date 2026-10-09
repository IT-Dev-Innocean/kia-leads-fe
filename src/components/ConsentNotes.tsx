const notes = [
  {
    title: 'Persetujuan Transfer Data Lintas Batas',
    body: 'Persetujuan untuk mentransfer dan menyimpan data pribadi pada server yang berada di luar Indonesia (misalnya Republik Korea), sehubungan dengan hosting dan pemrosesan sistem.',
  },
  {
    title: 'Persetujuan Tujuan Pengumpulan Data',
    body: 'Persetujuan untuk mengumpulkan data pribadi untuk keperluan operasional, termasuk pendaftaran, pemesanan stok, penagihan, pengiriman, dan pemenuhan layanan.',
  },
  {
    title: 'Persetujuan Pengungkapan kepada Pihak Ketiga',
    body: 'Persetujuan untuk berbagi data dengan vendor, penyedia layanan, dan afiliasi bisnis yang ditunjuk secara ketat untuk keperluan operasional atau kepatuhan.',
  },
  {
    title: 'Persetujuan Pemasaran',
    body: 'Persetujuan untuk menerima konten promosi, kampanye, pembaruan, dan penawaran melalui email, SMS, telepon, atau notifikasi aplikasi.',
  },
];

export function ConsentNotes() {
  return (
    <section
      aria-label='Penjelasan persetujuan'
      className='mt-4 rounded-md border border-kia-line bg-white px-3 py-3'>
      <ul className='space-y-2.5'>
        {notes.map((note, index) => (
          <li
            key={note.title}
            className='flex gap-2 text-[11px] leading-[1.45] text-kia-black'>
            {index === 0 ? (
              <span
                aria-hidden='true'
                className='mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-kia-black text-[9px] font-bold leading-none text-white'>
                i
              </span>
            ) : (
              <span aria-hidden='true' className='size-3.5 shrink-0' />
            )}
            <p>
              <span className='font-semibold'>※ {note.title}:</span> {note.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
