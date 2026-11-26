import React, { useState, useEffect, useCallback } from 'react';
import { IconShield, IconUsers, IconBriefcase, IconBell, IconCheck, IconX } from '../components/Icons';

export default function AdminPage({ token, currentUser, setActivePage }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'jobs', 'announcements'
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);
  const [error, setError] = useState(null);

  const showNotification = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const fetchAdminData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // 1. İstatistikler
      const statsRes = await fetch('http://127.0.0.1:8000/api/admin/stats', { headers });
      if (statsRes.ok) setStats(await statsRes.json());

      // 2. Kullanıcılar
      const usersRes = await fetch('http://127.0.0.1:8000/api/admin/users', { headers });
      if (usersRes.ok) setUsers(await usersRes.json());

      // 3. İlanlar
      const jobsRes = await fetch('http://127.0.0.1:8000/jobs/', { headers });
      if (jobsRes.ok) setJobs(await jobsRes.json());

      // 4. Duyurular
      const annRes = await fetch('http://127.0.0.1:8000/announcements/', { headers });
      if (annRes.ok) setAnnouncements(await annRes.json());
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Rol Değiştirme
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Rol güncellenemedi.');
      showNotification(`Kullanıcı rolü başarıyla "${newRole}" yapıldı.`);
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Aktif/Pasif Durumu Değiştirme
  const handleStatusToggle = async (userId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Durum değiştirilemedi.');
      showNotification('Kullanıcı hesap durumu güncellendi.');
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Kullanıcı Silme
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`"${userName}" isimli kullanıcıyı sistemden kalıcı olarak silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Kullanıcı silinemedi.');
      }
      showNotification('Kullanıcı kaydı başarıyla silindi.');
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // İlan Silme
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Bu iş ilanını sistemden kaldırmak istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('İlan kaldırılamadı.');
      showNotification('İş ilanı kaldırıldı.');
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Duyuru Silme
  const handleDeleteAnnouncement = async (annId) => {
    if (!window.confirm('Bu duyuruyu bültenden kaldırmak istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/announcements/${annId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Duyuru silinemedi.');
      showNotification('Duyuru bültenden kaldırıldı.');
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="w-full min-h-[70vh] py-20 flex items-center justify-center px-4 bg-[#FAF9F6]">
        <div className="max-w-md w-full border border-[#E2DFD7] bg-white p-8 text-center rounded-sm">
          <div className="w-10 h-10 border border-[#7C1D26] bg-[#7C1D26]/10 text-[#7C1D26] flex items-center justify-center mx-auto mb-4 rounded-sm">
            <IconShield className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#161616] mb-2">Yetkisiz Erişim</h2>
          <p className="text-xs text-[#5A5854] mb-6">
            Bu alana yalnızca yetkili sistem yöneticileri (Admin) erişebilir. Lütfen yetkili bir hesapla giriş yapınız.
          </p>
          <button
            onClick={() => setActivePage('login')}
            className="px-4 py-2 bg-[#0F2942] text-white text-xs font-semibold rounded-sm"
          >
            Yönetici Girişi Yap
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
            <span className="w-2 h-2 bg-[#7C1D26]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
              Rektörlük Koordinatörlüğü &bull; Yönetici Paneli
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#161616] tracking-tight">
            Sistem Denetim ve Yönetim Masası
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5854] mt-1">
            Yetkili Yönetici: <span className="font-semibold text-[#161616]">{currentUser.name}</span> &bull; {currentUser.email}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchAdminData}
            className="px-3.5 py-1.5 bg-white border border-[#E2DFD7] hover:bg-[#F2F0EA] text-[#161616] text-xs font-semibold rounded-sm transition-colors"
          >
            Verileri Yenile
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="mb-6 p-3 bg-[#1E4D2B]/10 border border-[#1E4D2B]/20 text-[#1E4D2B] text-xs font-mono flex items-center space-x-2">
          <span>✓</span>
          <span>{actionMessage}</span>
        </div>
      )}

      {/* İstatistik Metrikleri Kartları */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          <div className="bg-white border border-[#E2DFD7] p-3.5 rounded-sm">
            <div className="font-mono text-xl font-bold text-[#0F2942]">{stats.total_users}</div>
            <div className="text-[11px] text-[#5A5854] uppercase tracking-wider font-semibold mt-0.5">Toplam Kayıt</div>
          </div>
          <div className="bg-white border border-[#E2DFD7] p-3.5 rounded-sm">
            <div className="font-mono text-xl font-bold text-[#0F2942]">{stats.total_alumni}</div>
            <div className="text-[11px] text-[#5A5854] uppercase tracking-wider font-semibold mt-0.5">Mezun</div>
          </div>
          <div className="bg-white border border-[#E2DFD7] p-3.5 rounded-sm">
            <div className="font-mono text-xl font-bold text-[#5A5854]">{stats.total_students}</div>
            <div className="text-[11px] text-[#5A5854] uppercase tracking-wider font-semibold mt-0.5">Öğrenci</div>
          </div>
          <div className="bg-white border border-[#E2DFD7] p-3.5 rounded-sm">
            <div className="font-mono text-xl font-bold text-[#7C1D26]">{stats.total_admins}</div>
            <div className="text-[11px] text-[#5A5854] uppercase tracking-wider font-semibold mt-0.5">Yönetici</div>
          </div>
          <div className="bg-white border border-[#E2DFD7] p-3.5 rounded-sm">
            <div className="font-mono text-xl font-bold text-[#0F2942]">{stats.total_jobs}</div>
            <div className="text-[11px] text-[#5A5854] uppercase tracking-wider font-semibold mt-0.5">Aktif İlan</div>
          </div>
          <div className="bg-white border border-[#E2DFD7] p-3.5 rounded-sm">
            <div className="font-mono text-xl font-bold text-[#161616]">{stats.total_applications}</div>
            <div className="text-[11px] text-[#5A5854] uppercase tracking-wider font-semibold mt-0.5">Başvuru</div>
          </div>
        </div>
      )}

      {/* Sekmeler */}
      <div className="flex border-b border-[#E2DFD7] mb-6 space-x-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2.5 transition-colors ${
            activeTab === 'users'
              ? 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
              : 'text-[#5A5854] hover:text-[#161616]'
          }`}
        >
          Kullanıcı ve Rol Yönetimi ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-2.5 transition-colors ${
            activeTab === 'jobs'
              ? 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
              : 'text-[#5A5854] hover:text-[#161616]'
          }`}
        >
          Kariyer İlanları Denetimi ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`pb-2.5 transition-colors ${
            activeTab === 'announcements'
              ? 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
              : 'text-[#5A5854] hover:text-[#161616]'
          }`}
        >
          Resmi Duyurular ({announcements.length})
        </button>
      </div>

      {/* 1. SEKME: KULLANICILAR VE ROL YÖNETİMİ */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E2DFD7] bg-[#F2F0EA] text-[#161616] font-serif font-bold">
                  <th className="py-3 px-4 font-mono">Sicil ID</th>
                  <th className="py-3 px-4">Ad Soyad</th>
                  <th className="py-3 px-4">E-posta</th>
                  <th className="py-3 px-4">Fakülte / Bölüm</th>
                  <th className="py-3 px-4">Mevcut Rol</th>
                  <th className="py-3 px-4">Rol Değiştir</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DFD7] text-[#5A5854]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3 px-4 font-mono text-[#161616]">#{u.id}</td>
                    <td className="py-3 px-4 font-medium text-[#161616]">{u.name}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#5A5854]">{u.email || '-'}</td>
                    <td className="py-3 px-4">{u.department || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${
                        u.role === 'admin'
                          ? 'bg-[#7C1D26]/10 text-[#7C1D26] border-[#7C1D26]/25 font-bold'
                          : u.role === 'alumni'
                          ? 'bg-[#0F2942]/10 text-[#0F2942] border-[#0F2942]/25 font-semibold'
                          : 'bg-[#F2F0EA] text-[#5A5854] border-[#E2DFD7]'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={u.id === currentUser.id}
                        className="px-2 py-1 bg-white border border-[#E2DFD7] text-xs text-[#161616] rounded-sm focus:outline-none focus:border-[#0F2942]"
                      >
                        <option value="admin">Admin</option>
                        <option value="alumni">Alumni (Mezun)</option>
                        <option value="student">Student (Öğrenci)</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleStatusToggle(u.id)}
                        disabled={u.id === currentUser.id}
                        className={`font-mono text-[11px] px-2 py-0.5 border rounded-sm ${
                          u.is_active
                            ? 'bg-[#1E4D2B]/10 text-[#1E4D2B] border-[#1E4D2B]/20'
                            : 'bg-[#7C1D26]/10 text-[#7C1D26] border-[#7C1D26]/20'
                        }`}
                      >
                        {u.is_active ? 'Aktif' : 'Askıda'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {u.id !== currentUser.id && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="text-[#7C1D26] hover:underline font-medium text-xs"
                        >
                          Sil
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SEKME: İŞ İLANLARI DENETİMİ */}
      {activeTab === 'jobs' && (
        <div className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden">
          <div className="divide-y divide-[#E2DFD7]">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#FAF9F6]">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#161616]">{job.title}</h4>
                  <p className="text-xs text-[#5A5854] mt-0.5 line-clamp-1">{job.description}</p>
                  <span className="font-mono text-[10px] text-[#5A5854]">İlan ID #{job.id} &bull; Yazar Sicil #{job.author_id}</span>
                </div>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="px-3 py-1 bg-[#7C1D26]/10 hover:bg-[#7C1D26] hover:text-white border border-[#7C1D26]/30 text-[#7C1D26] text-xs font-semibold rounded-sm transition-colors"
                >
                  İlanı Yayından Kaldır
                </button>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="py-12 text-center text-xs text-[#5A5854]">Aktif iş ilanı bulunmamaktadır.</div>
            )}
          </div>
        </div>
      )}

      {/* 3. SEKME: RESMİ DUYURULAR DENETİMİ */}
      {activeTab === 'announcements' && (
        <div className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden">
          <div className="divide-y divide-[#E2DFD7]">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#FAF9F6]">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-[#7C1D26] font-bold uppercase">{ann.category || 'Genel'}</span>
                    <span className="text-[11px] text-[#5A5854] font-mono">&bull; {ann.date || 'Tarih Belirtilmedi'}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#161616] mt-0.5">{ann.title}</h4>
                  <p className="text-xs text-[#5A5854] mt-0.5 line-clamp-1">{ann.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(ann.id)}
                  className="px-3 py-1 bg-[#7C1D26]/10 hover:bg-[#7C1D26] hover:text-white border border-[#7C1D26]/30 text-[#7C1D26] text-xs font-semibold rounded-sm transition-colors"
                >
                  Duyuruyu Sil
                </button>
              </div>
            ))}
            {announcements.length === 0 && (
              <div className="py-12 text-center text-xs text-[#5A5854]">Yayında duyuru bulunmamaktadır.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
