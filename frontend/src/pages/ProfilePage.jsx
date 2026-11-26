import React, { useState, useEffect, useCallback } from 'react';
import { IconGraduationCap, IconBriefcase, IconCheck, IconShield, IconUsers } from '../components/Icons';

export default function ProfilePage({ token, currentUser, onProfileUpdated, setActivePage }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'applications', 'postings'
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    graduation_year: '',
    title: ''
  });
  const [applications, setApplications] = useState([]);
  const [postings, setPostings] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        department: currentUser.department || '',
        graduation_year: currentUser.graduation_year || '',
        title: currentUser.title || ''
      });
    }
  }, [currentUser]);

  const fetchMyData = useCallback(async () => {
    if (!token) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Kendi başvurularım
      const appRes = await fetch('http://127.0.0.1:8000/api/auth/my/applications', { headers });
      if (appRes.ok) setApplications(await appRes.json());

      // Kendi ilanlarım
      const postRes = await fetch('http://127.0.0.1:8000/api/auth/my/postings', { headers });
      if (postRes.ok) setPostings(await postRes.json());
    } catch (err) {
      console.error('Kullanıcı verileri alınamadı:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchMyData();
  }, [fetchMyData]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Profil güncellenemedi.');

      setMessage('Profil bilgileriniz başarıyla güncellendi.');
      onProfileUpdated(data);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message || 'Güncelleme başarısız.');
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="w-full min-h-[70vh] py-20 flex items-center justify-center px-4 bg-[#FAF9F6]">
        <div className="max-w-md w-full border border-[#E2DFD7] bg-white p-8 text-center rounded-sm">
          <h2 className="font-serif text-xl font-bold text-[#161616] mb-2">Oturum Açılmadı</h2>
          <p className="text-xs text-[#5A5854] mb-6">Profilinizi ve başvurularınızı görüntülemek için lütfen giriş yapınız.</p>
          <button onClick={() => setActivePage('login')} className="px-4 py-2 bg-[#0F2942] text-white text-xs font-semibold rounded-sm">
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Üst Editoryal Başlık */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-6 border-b border-[#E2DFD7]">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="w-2 h-2 bg-[#0F2942]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0F2942] font-semibold">
              Mensup Sicil Dosyası &bull; Kişisel Panel
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#161616] tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5854] mt-1">
            Sicil No: <span className="font-mono font-bold text-[#161616]">#{currentUser.id}</span> &bull; {currentUser.email} &bull; Rol:{' '}
            <span className="font-mono uppercase font-bold text-[#7C1D26]">[{currentUser.role}]</span>
          </p>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-3 bg-[#1E4D2B]/10 border border-[#1E4D2B]/20 text-[#1E4D2B] text-xs font-mono">
          ✓ {message}
        </div>
      )}

      {/* Sekmeler */}
      <div className="flex border-b border-[#E2DFD7] mb-8 space-x-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2.5 transition-colors ${
            activeTab === 'profile'
              ? 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
              : 'text-[#5A5854] hover:text-[#161616]'
          }`}
        >
          Profil Bilgilerim
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-2.5 transition-colors ${
            activeTab === 'applications'
              ? 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
              : 'text-[#5A5854] hover:text-[#161616]'
          }`}
        >
          Kariyer Başvurularım ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('postings')}
          className={`pb-2.5 transition-colors ${
            activeTab === 'postings'
              ? 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
              : 'text-[#5A5854] hover:text-[#161616]'
          }`}
        >
          Yayınladığım İlanlar ({postings.length})
        </button>
      </div>

      {/* 1. SEKME: PROFİL BİLGİLERİ */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white border border-[#E2DFD7] p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-lg font-bold text-[#161616] mb-4 pb-2 border-b border-[#E2DFD7]">
              Sicil Bilgilerini Güncelle
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">Ad Soyad</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#161616] mb-1">Fakülte / Bölüm</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#161616] mb-1">Mezuniyet / Giriş Yılı</label>
                  <input
                    type="text"
                    required
                    value={formData.graduation_year}
                    onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">Mesleki Unvan / Mevcut Durum</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                >
                  {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 bg-[#F2F0EA] border border-[#E2DFD7] p-6 rounded-sm">
            <h4 className="font-serif text-sm font-bold text-[#161616] mb-3 pb-1 border-b border-[#E2DFD7]">
              Hesap Özeti
            </h4>
            <div className="space-y-2.5 text-xs text-[#5A5854]">
              <div>
                <span className="font-semibold text-[#161616]">E-posta:</span>{' '}
                <span className="font-mono">{currentUser.email}</span>
              </div>
              <div>
                <span className="font-semibold text-[#161616]">Sistem Rolü:</span>{' '}
                <span className="font-mono text-[#7C1D26] uppercase font-bold">{currentUser.role}</span>
              </div>
              <div>
                <span className="font-semibold text-[#161616]">Hesap Durumu:</span>{' '}
                <span className="text-[#1E4D2B] font-semibold">{currentUser.is_active ? 'Aktif Onaylı' : 'Askıda'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEKME: BAŞVURULARIM */}
      {activeTab === 'applications' && (
        <div className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden">
          {applications.length > 0 ? (
            <div className="divide-y divide-[#E2DFD7]">
              {applications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-[#FAF9F6] transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#161616]">
                        {app.job_title}
                      </h4>
                      <p className="text-xs text-[#5A5854] font-medium">{app.job_company}</p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 bg-[#1E4D2B]/10 text-[#1E4D2B] border border-[#1E4D2B]/20">
                      Başvuru İletildi
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] border border-[#E2DFD7] rounded-sm text-xs text-[#5A5854] leading-relaxed">
                    <span className="font-semibold text-[#161616] block mb-1">İlettiğiniz Ön Yazı:</span>
                    {app.cover_letter}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-[#5A5854]">
              Henüz herhangi bir iş veya staj ilanına başvuru yapmadınız.{' '}
              <button onClick={() => setActivePage('jobs')} className="text-[#0F2942] font-semibold hover:underline">
                İlanları inceleyiniz &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. SEKME: YAYINLADIĞIM İLANLAR VE GELEN BAŞVURULAR */}
      {activeTab === 'postings' && (
        <div className="space-y-6">
          {postings.length > 0 ? (
            postings.map((post) => (
              <div key={post.id} className="bg-white border border-[#E2DFD7] p-6 rounded-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 mb-4 border-b border-[#E2DFD7]">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#161616]">{post.title}</h4>
                    <span className="font-mono text-[11px] text-[#5A5854]">İlan No #{post.id}</span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#0F2942]/10 text-[#0F2942] border border-[#0F2942]/20">
                    {post.application_count} Başvuru Alındı
                  </span>
                </div>

                <div className="text-xs text-[#5A5854] mb-4 bg-[#FAF9F6] p-3 border border-[#E2DFD7] rounded-sm">
                  {post.description}
                </div>

                {/* Gelen Başvurular */}
                <div>
                  <h5 className="font-serif text-xs font-bold text-[#161616] uppercase tracking-wider mb-2">
                    Aday Başvuruları ve Ön Yazılar:
                  </h5>
                  {post.applications && post.applications.length > 0 ? (
                    <div className="space-y-2">
                      {post.applications.map((cand) => (
                        <div key={cand.id} className="p-3 bg-[#F2F0EA] border border-[#E2DFD7] rounded-sm text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-[#161616]">{cand.applicant_name}</span>
                            <span className="font-mono text-[10px] text-[#5A5854]">{cand.applicant_department}</span>
                          </div>
                          <p className="text-[#5A5854] text-[11px] leading-relaxed italic">
                            "{cand.cover_letter}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-[#5A5854] italic">Henüz bu ilana bir başvuru iletilmedi.</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center bg-white border border-[#E2DFD7] text-xs text-[#5A5854] rounded-sm">
              Henüz yayınladığınız bir iş ilanı bulunmamaktadır.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
