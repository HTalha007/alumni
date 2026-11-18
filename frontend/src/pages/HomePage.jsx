import React from 'react';
import {
  IconSearch,
  IconBriefcase,
  IconUsers,
  IconBell,
  IconArrowUpRight
} from '../components/Icons';

export default function HomePage({
  apiStatus,
  alumniCount,
  jobCount,
  announcementCount,
  searchTerm,
  setSearchTerm,
  setActivePage,
  onOpenAddAlumni
}) {
  const handleQuickSearch = (e) => {
    e.preventDefault();
    setActivePage('directory');
  };

  return (
    <div className="w-full">
      {/* 1. EDİTORYAL MANŞET VE GİRİŞ (HERO) */}
      <section className="border-b border-[#E2DFD7] py-14 sm:py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Üst Kurumsal Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E2DFD7]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#7C1D26]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
                İstanbul Üniversitesi Resmi Mezun Portalı
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#5A5854]">
              Sistem Durumu: <span className="text-[#0F2942] font-semibold">{apiStatus.connected ? 'Bağlantı Aktif' : 'Çevrimdışı'}</span> &bull; Beyazıt
            </div>
          </div>

          {/* Asimetrik İki Kolonlu Gazete Düzeni */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sol Kolon: Başlık, Manşet ve Arama */}
            <div className="lg:col-span-8">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#161616] tracking-tight leading-[1.15] mb-6">
                Beş Yüz Yetmiş Yıllık İlmiye Mirası, Çağdaş Mezun Dayanışması.
              </h1>
              <p className="font-sans text-[15px] sm:text-base text-[#5A5854] leading-relaxed max-w-2xl mb-8">
                İstanbul Üniversitesi mezunları ve mensupları arasında kurumsal bağı sürekli kılmak, fakülte kütüklerini tek bir arşivde toplamak ve yeni mezunlar ile kıdemli mensuplar arasında mesleki dayanışma köprüleri kurmak amacıyla tanzim edilmiştir.
              </p>

              {/* Minimal Arama Çubuğu */}
              <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl mb-8">
                <div className="relative flex-1">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A5854]">
                    <IconSearch className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="İsim, fakülte, bölüm veya unvan ara..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap"
                >
                  Kütükte Ara
                </button>
              </form>

              {/* Hızlı Butonlar */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActivePage('directory')}
                  className="px-4 py-2 bg-transparent hover:bg-[#F2F0EA] text-[#161616] border border-[#E2DFD7] text-xs font-semibold rounded-sm transition-colors"
                >
                  Mezun Kütüğünü İncele &rarr;
                </button>
                <button
                  onClick={() => setActivePage('jobs')}
                  className="px-4 py-2 bg-transparent hover:bg-[#F2F0EA] text-[#161616] border border-[#E2DFD7] text-xs font-semibold rounded-sm transition-colors"
                >
                  Kariyer Panosuna Git &rarr;
                </button>
                <button
                  onClick={onOpenAddAlumni}
                  className="px-4 py-2 bg-[#7C1D26] hover:bg-[#94232E] text-white text-xs font-semibold rounded-sm transition-colors"
                >
                  Yeni Kayıt Bildir
                </button>
              </div>
            </div>

            {/* Sağ Kolon: Kurumsal İstatistik Kütüğü */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#E2DFD7] lg:pl-8 pt-8 lg:pt-0">
              <h2 className="font-serif text-base font-bold text-[#161616] mb-4 pb-2 border-b border-[#E2DFD7] uppercase tracking-wider">
                Resmi İstatistikler
              </h2>

              <div className="divide-y divide-[#E2DFD7]">
                <div className="py-4">
                  <div className="font-mono text-2xl font-bold text-[#0F2942]">1453</div>
                  <div className="font-serif text-sm font-semibold text-[#161616] mt-0.5">Kuruluş Yılı</div>
                  <div className="text-xs text-[#5A5854] mt-1">Türkiye'nin en köklü ve ilk üniversitesi.</div>
                </div>

                <div className="py-4">
                  <div className="font-mono text-2xl font-bold text-[#0F2942]">
                    {alumniCount ? `${alumniCount} Kayıt` : '450.000+'}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#161616] mt-0.5">Veritabanı Kütüğü</div>
                  <div className="text-xs text-[#5A5854] mt-1">Sistemde doğrulanmış mezun ve mensup profili.</div>
                </div>

                <div className="py-4">
                  <div className="font-mono text-2xl font-bold text-[#7C1D26]">
                    {jobCount ? `${jobCount} Aktif İlan` : 'Kariyer Fırsatları'}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#161616] mt-0.5">Kariyer & Staj İlanı</div>
                  <div className="text-xs text-[#5A5854] mt-1">Mezunların açtığı doğrudan istihdam pozisyonları.</div>
                </div>

                <div className="py-4">
                  <div className="font-mono text-2xl font-bold text-[#0F2942]">
                    {announcementCount ? `${announcementCount} Duyuru` : 'Resmi Bülten'}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#161616] mt-0.5">Üniversite Duyuruları</div>
                  <div className="text-xs text-[#5A5854] mt-1">Rektörlük ve fakülte etkinlik bülteni.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDİTORYAL SÜTUNLAR: BÖLÜM VİTRİNİ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD7]">
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
            Platform Hizmetleri
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#161616] mt-1">
            Mezunlara Yönelik Temel Modüller
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Modül 1 */}
          <div className="bg-white border border-[#E2DFD7] p-6 flex flex-col justify-between rounded-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DFD7]">
                <span className="font-mono text-[11px] text-[#5A5854] uppercase tracking-wider">Modül 01</span>
                <IconUsers className="w-4 h-4 text-[#0F2942]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#161616] mb-2">
                Mezun Kütüğü & Sorgulama
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                Hukuk, Tıp, İktisat, Edebiyat ve Fen dahil olmak üzere tüm fakültelerimizin mezun kayıtları arasında filtreleme ve doğrudan iletişim kurma imkanı.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#E2DFD7]">
              <button
                onClick={() => setActivePage('directory')}
                className="text-xs font-semibold text-[#0F2942] hover:text-[#183856] flex items-center space-x-1"
              >
                <span>Kütük Sorgula</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Modül 2 */}
          <div className="bg-white border border-[#E2DFD7] p-6 flex flex-col justify-between rounded-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DFD7]">
                <span className="font-mono text-[11px] text-[#5A5854] uppercase tracking-wider">Modül 02</span>
                <IconBriefcase className="w-4 h-4 text-[#7C1D26]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#161616] mb-2">
                Kariyer & İlan Panosu
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                Mezunlarımızın kurum ve şirketlerinde açtığı açık pozisyonlar, staj olanakları ve doğrudan ön yazı ile başvuru kanalı.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#E2DFD7]">
              <button
                onClick={() => setActivePage('jobs')}
                className="text-xs font-semibold text-[#7C1D26] hover:underline flex items-center space-x-1"
              >
                <span>İlanları Listele</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Modül 3 */}
          <div className="bg-white border border-[#E2DFD7] p-6 flex flex-col justify-between rounded-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DFD7]">
                <span className="font-mono text-[11px] text-[#5A5854] uppercase tracking-wider">Modül 03</span>
                <IconBell className="w-4 h-4 text-[#0F2942]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#161616] mb-2">
                Resmi Duyuru & Etkinlikler
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                Rektörlük duyuruları, geleneksel mezunlar günü buluşmaları, akademik sempozyumlar ve dernek faaliyet takvimi.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#E2DFD7]">
              <button
                onClick={() => setActivePage('announcements')}
                className="text-xs font-semibold text-[#0F2942] hover:text-[#183856] flex items-center space-x-1"
              >
                <span>Bülteni Oku</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AKADEMİK ALINTILAR VE KÜLTÜR */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-2 border-[#7C1D26] pl-6 max-w-3xl">
          <blockquote className="font-serif text-lg sm:text-xl text-[#161616] italic leading-relaxed mb-4">
            &ldquo;İstanbul Üniversitesi, yalnız Türkiye'nin değil, Doğu ile Batı'nın kesişiminde dünya bilim tarihine damga vurmuş en büyük ilim ocaklarından biridir. Bu ocağın mezunları, cumhuriyetin ve geleceğin teminatıdır.&rdquo;
          </blockquote>
          <div className="font-sans text-xs font-semibold text-[#161616]">
            İstanbul Üniversitesi Rektörlüğü Arşivi
          </div>
          <div className="font-mono text-[11px] text-[#5A5854]">
            Beyazıt Yerleşkesi &bull; Tarihçe ve Belgeler
          </div>
        </div>
      </section>
    </div>
  );
}
