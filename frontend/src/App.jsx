import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [apiMessage, setApiMessage] = useState('Backend bekleniyor...');
  const [alumniList, setAlumniList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mezun Ekleme Modalı State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    graduation_year: '',
    title: ''
  });

  // YENİ: Başvuru Modalı State'leri
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [appFormData, setAppFormData] = useState({
    applicant_id: '',
    cover_letter: ''
  });

  const fetchAlumni = () => {
    fetch('http://127.0.0.1:8000/users/')
      .then((res) => res.json())
      .then((data) => setAlumniList(data))
      .catch((err) => console.error('Mezunlar çekilemedi:', err));
  };

  const fetchJobs = () => {
    fetch('http://127.0.0.1:8000/jobs/')
      .then((res) => res.json())
      .then((data) => setJobList(data))
      .catch((err) => console.error('İş ilanları çekilemedi:', err));
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message || 'API Bağlantısı Başarılı'))
      .catch((err) => {
        console.error('API bağlantı hatası:', err);
        setApiMessage('Backend bağlantısı kurulamadı.');
      });

    fetchAlumni();
    fetchJobs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          setIsModalOpen(false);
          setFormData({ name: '', department: '', graduation_year: '', title: '' });
          fetchAlumni();
        } else {
          alert('Kayıt eklenirken bir hata oluştu.');
        }
      })
      .catch((err) => console.error('Kayıt hatası:', err));
  };

  // YENİ: Başvuru Gönderme Fonksiyonu
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/jobs/${selectedJobId}/applications/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicant_id: parseInt(appFormData.applicant_id),
        cover_letter: appFormData.cover_letter
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Başvurunuz başarıyla iletildi!');
          setIsAppModalOpen(false);
          setAppFormData({ applicant_id: '', cover_letter: '' });
        } else {
          alert('Başvuru yapılırken bir hata oluştu. Lütfen ID alanına sayı giriniz.');
        }
      })
      .catch((err) => console.error('Başvuru hatası:', err));
  };

  const filteredAlumni = alumniList.filter((user) => {
    const nameMatch = user.name ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const deptMatch = user.department ? user.department.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const titleMatch = user.title ? user.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    return nameMatch || deptMatch || titleMatch;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white overflow-hidden">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-8 py-6 flex justify-between items-center border-b border-slate-800/60 backdrop-blur-md sticky top-0 z-40 bg-slate-950/80"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">İÜ</div>
          <span className="font-semibold text-lg tracking-wide">Mezunlar Portalı</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <a href="#hero" className="hover:text-white transition-colors">Ana Sayfa</a>
          <a href="#directory" className="hover:text-white transition-colors">Mezun Dizini</a>
          <a href="#jobs" className="hover:text-white transition-colors">İş İlanları</a>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-md">
            + Mezun Ekle
          </button>
        </div>
      </motion.nav>

      <main className="flex-1 flex flex-col items-center px-6">
        <motion.div id="hero" initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center justify-center text-center py-24 relative overflow-hidden w-full min-h-[70vh]">
          <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -top-10"></div>
          <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner animate-pulse">
            <span>⚡ {apiMessage}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold max-w-4xl tracking-tight leading-tight mb-8">
            Geçmişin Gücüyle, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Geleceği Şekillendir.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 font-light">
            Üniversitemizin köklü bağlarını modern bir dijital ekosistemde buluşturuyoruz. Ağını genişlet, kariyer fırsatlarını yakala.
          </motion.p>
        </motion.div>

        {/* Mezun Dizini */}
        <motion.section id="directory" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="w-full max-w-6xl py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mezun Dizini</h2>
              <p className="text-slate-400 text-sm mt-1">Veritabanından canlı olarak çekilen kayıtlı mezunlar listesi.</p>
            </div>
            <div className="w-full md:w-72">
              <input type="text" placeholder="İsim veya bölüm ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"/>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-900/80">
                    <th className="py-4 px-6 font-semibold">Ad Soyad</th>
                    <th className="py-4 px-6 font-semibold">Bölüm</th>
                    <th className="py-4 px-6 font-semibold">Mezuniyet Yılı</th>
                    <th className="py-4 px-6 font-semibold">Unvan</th>
                  </tr>
                </thead>
                <motion.tbody variants={staggerContainer} initial="hidden" animate="visible" className="divide-y divide-slate-800/60 text-sm text-slate-300">
                  {filteredAlumni.map((user, index) => (
                    <motion.tr key={index} variants={fadeUp} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{user.name || `Mezun ${index + 1}`}</td>
                      <td className="py-4 px-6 text-slate-400">{user.department}</td>
                      <td className="py-4 px-6 text-slate-400">{user.graduation_year}</td>
                      <td className="py-4 px-6"><span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">{user.title}</span></td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* İş İlanları Panosu */}
        <motion.section id="jobs" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="w-full max-w-6xl py-20 border-t border-slate-800/60">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Kariyer Fırsatları (İş İlanları)</h2>
            <p className="text-slate-400 text-sm mt-1">Mezunlarımız tarafından paylaşılan en güncel iş ve staj ilanları.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobList.length > 0 ? (
              jobList.map((job, index) => (
                <motion.div key={index} variants={fadeUp} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 hover:bg-slate-800/40 transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{job.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                        {job.author_id}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">İlan Sahibi ID</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setIsAppModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                    >
                      Hemen Başvur
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/30 border border-slate-800/50 rounded-2xl">
                Şu an aktif bir iş ilanı bulunmamaktadır.
              </div>
            )}
          </div>
        </motion.section>
      </main>

      {/* Mezun Ekleme Modalı */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Yeni Mezun Kaydı Ekle</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-xs font-medium text-slate-400 mb-1">Ad Soyad</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"/></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">Bölüm</label><input type="text" required value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"/></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">Mezuniyet Yılı</label><input type="text" required value={formData.graduation_year} onChange={(e) => setFormData({...formData, graduation_year: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"/></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">Unvan</label><input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"/></div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500">Kaydet</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* YENİ: Başvuru Modalı */}
      <AnimatePresence>
        {isAppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsAppModalOpen(false)}></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Pozisyona Başvur</h3>
                <button onClick={() => setIsAppModalOpen(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
              </div>
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Kullanıcı (Mezun) ID'niz</label>
                  <input
                    type="number"
                    required
                    value={appFormData.applicant_id}
                    onChange={(e) => setAppFormData({...appFormData, applicant_id: e.target.value})}
                    placeholder="Örn: 1"
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Gerçek bir sistemde bu bilgi giriş yapan kullanıcıdan otomatik alınır.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Ön Yazı (Cover Letter)</label>
                  <textarea
                    required
                    rows="4"
                    value={appFormData.cover_letter}
                    onChange={(e) => setAppFormData({...appFormData, cover_letter: e.target.value})}
                    placeholder="Bu pozisyon için neden uygun olduğunuzu kısaca anlatın..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setIsAppModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700">İptal</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500">Gönder</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="w-full py-6 text-center border-t border-slate-900 text-slate-500 text-sm">
        <p>© 2026 İstanbul Üniversitesi - Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;