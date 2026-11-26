import React, { useState } from 'react';
import { IconCheck, IconUsers, IconGraduationCap } from '../components/Icons';

export default function RegisterPage({ onRegisterSuccess, setActivePage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    graduation_year: '2026',
    title: '',
    role: 'alumni' // 'alumni' veya 'student'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakterden oluşmalıdır.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Girdiğiniz şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        department: formData.department.trim(),
        graduation_year: formData.graduation_year,
        title: formData.title.trim() || (formData.role === 'student' ? 'Öğrenci' : 'Mezun'),
        role: formData.role
      };

      const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Kayıt işlemi sırasında bir hata meydana geldi.');
      }

      // Başarılı kayıt: token'ı kaydet ve oturumu başlat
      onRegisterSuccess(data.access_token, data.user);
    } catch (err) {
      setError(err.message || 'Kayıt başarısız oldu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] py-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-xl w-full border border-[#E2DFD7] bg-white p-8 sm:p-10 rounded-sm">
        {/* Üst Kicker ve Başlık */}
        <div className="mb-6 pb-4 border-b border-[#E2DFD7]">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 bg-[#7C1D26]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
              İstanbul Üniversitesi &bull; Yeni Mensup Kaydı
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#161616] tracking-tight">
            Mezunlar ve Öğrenciler Ağına Katılın
          </h1>
          <p className="text-xs text-[#5A5854] mt-1 leading-relaxed">
            Fakülte sicilinizin doğrulanması ve platformun tüm imkanlarından yararlanmak için formu doldurunuz.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rol Seçimi: Mezun vs Öğrenci */}
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1.5">
              Akademik Statü / Üyelik Rolü *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'alumni' })}
                className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-colors flex items-center justify-center space-x-2 ${
                  formData.role === 'alumni'
                    ? 'bg-[#0F2942] text-white border-[#0F2942]'
                    : 'bg-[#F2F0EA] text-[#5A5854] border-[#E2DFD7] hover:text-[#161616]'
                }`}
              >
                <IconGraduationCap className="w-3.5 h-3.5" />
                <span>Mezun (Alumni)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'student' })}
                className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-colors flex items-center justify-center space-x-2 ${
                  formData.role === 'student'
                    ? 'bg-[#0F2942] text-white border-[#0F2942]'
                    : 'bg-[#F2F0EA] text-[#5A5854] border-[#E2DFD7] hover:text-[#161616]'
                }`}
              >
                <IconUsers className="w-3.5 h-3.5" />
                <span>Aktif Öğrenci (Student)</span>
              </button>
            </div>
          </div>

          {/* Ad Soyad */}
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Ad Soyad *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Mehmet Özkan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
            />
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              E-posta Adresi *
            </label>
            <input
              type="email"
              required
              placeholder="Örn: mehmet@alumni.istanbul.edu.tr"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
            />
          </div>

          {/* Şifreler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Şifre (En az 6 karakter) *
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Şifre Tekrarı *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
              />
            </div>
          </div>

          {/* Fakülte / Bölüm ve Mezuniyet/Giriş Yılı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Fakülte / Bölüm *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Hukuk Fakültesi"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                {formData.role === 'student' ? 'Giriş / Beklenen Yıl' : 'Mezuniyet Yılı'} *
              </label>
              <input
                type="number"
                required
                placeholder="Örn: 2024"
                value={formData.graduation_year}
                onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
              />
            </div>
          </div>

          {/* Unvan */}
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Mevcut Unvan / Görev
            </label>
            <input
              type="text"
              placeholder={formData.role === 'student' ? 'Örn: 3. Sınıf Öğrencisi' : 'Örn: Avukat / Veri Bilimci'}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
            />
          </div>

          {/* Gönder Butonu */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              {submitting ? 'Kayıt İşleniyor...' : 'Kayıt Ol ve Oturumu Aç'}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E2DFD7] text-center text-xs text-[#5A5854]">
          Zaten kayıtlı bir hesabınız var mı?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-[#0F2942] font-semibold hover:underline"
          >
            Giriş Yapınız &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
