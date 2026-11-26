import React, { useState } from 'react';
import { IconShield } from '../components/Icons';

export default function LoginPage({ onLoginSuccess, setActivePage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.');
      }

      onLoginSuccess(data.access_token, data.user);
    } catch (err) {
      setError(err.message || 'Giriş başarısız.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillQuickLogin = (testEmail, testPassword) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <div className="w-full min-h-[85vh] py-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-md w-full border border-[#E2DFD7] bg-white p-8 sm:p-10 rounded-sm">
        {/* Üst Kicker ve Başlık */}
        <div className="mb-6 pb-4 border-b border-[#E2DFD7]">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 bg-[#0F2942]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0F2942] font-semibold">
              Kimlik Doğrulama &bull; Giriş Portali
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#161616] tracking-tight">
            Mezun ve Mensup Girişi
          </h1>
          <p className="text-xs text-[#5A5854] mt-1 leading-relaxed">
            Platform erişimi, kütük yönetimi ve kariyer başvuruları için oturum açınız.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              E-posta Adresi *
            </label>
            <input
              type="email"
              required
              placeholder="Örn: htgzl.phone@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#161616]">
                Parola *
              </label>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              {submitting ? 'Doğrulanıyor...' : 'Oturum Aç'}
            </button>
          </div>
        </form>

        {/* Hızlı Test Girişleri Paneli */}
        <div className="mt-8 pt-6 border-t border-[#E2DFD7]">
          <div className="flex items-center space-x-1.5 mb-2.5">
            <IconShield className="w-3.5 h-3.5 text-[#7C1D26]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
              Hızlı Test Hesapları
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => fillQuickLogin('htgzl.phone@gmail.com', 'admin123')}
              className="w-full text-left p-2 bg-[#F2F0EA] hover:bg-[#E2DFD7] border border-[#E2DFD7] text-xs rounded-sm transition-colors flex justify-between items-center"
            >
              <div>
                <span className="font-semibold text-[#161616]">Hasan Talha</span>{' '}
                <span className="font-mono text-[10px] text-[#7C1D26] font-bold">[YÖNETİCİ / ADMIN]</span>
              </div>
              <span className="font-mono text-[11px] text-[#5A5854]">Doldur &rarr;</span>
            </button>

            <button
              type="button"
              onClick={() => fillQuickLogin('ahmet@alumni.istanbul.edu.tr', 'alumni123')}
              className="w-full text-left p-2 bg-[#F2F0EA] hover:bg-[#E2DFD7] border border-[#E2DFD7] text-xs rounded-sm transition-colors flex justify-between items-center"
            >
              <div>
                <span className="font-semibold text-[#161616]">Ahmet Yılmaz</span>{' '}
                <span className="font-mono text-[10px] text-[#0F2942] font-semibold">[MEZUN]</span>
              </div>
              <span className="font-mono text-[11px] text-[#5A5854]">Doldur &rarr;</span>
            </button>

            <button
              type="button"
              onClick={() => fillQuickLogin('ogrenci@istanbul.edu.tr', 'student123')}
              className="w-full text-left p-2 bg-[#F2F0EA] hover:bg-[#E2DFD7] border border-[#E2DFD7] text-xs rounded-sm transition-colors flex justify-between items-center"
            >
              <div>
                <span className="font-semibold text-[#161616]">Elif Yurt</span>{' '}
                <span className="font-mono text-[10px] text-[#5A5854] font-semibold">[ÖĞRENCİ]</span>
              </div>
              <span className="font-mono text-[11px] text-[#5A5854]">Doldur &rarr;</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E2DFD7] text-center text-xs text-[#5A5854]">
          Henüz hesabınız yok mu?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="text-[#0F2942] font-semibold hover:underline"
          >
            Kayıt Olunuz &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
