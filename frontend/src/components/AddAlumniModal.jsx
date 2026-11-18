import React, { useState } from 'react';
import { IconX, IconCheck } from './Icons';

export default function AddAlumniModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    graduation_year: '',
    title: '',
    email: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: formData.name.trim(),
        department: formData.department.trim(),
        graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : 2024,
        title: formData.title.trim() || 'Mezun',
        email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@alumni.istanbul.edu.tr`
      };

      const res = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Kayıt oluşturulurken sunucu hatası meydana geldi.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ name: '', department: '', graduation_year: '', title: '', email: '' });
      }, 1400);
    } catch (err) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Mat Arka Plan Örtüsü */}
      <div className="absolute inset-0 bg-[#161616]/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* Editoryal Keskin Modal */}
      <div className="relative bg-white border border-[#E2DFD7] rounded-sm w-full max-w-md p-6 z-10">
        <div className="flex justify-between items-start pb-3 mb-4 border-b border-[#E2DFD7]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7C1D26] font-semibold">
              Resmi Başvuru Formu
            </span>
            <h3 className="font-serif text-xl font-bold text-[#161616]">
              Mezun Kütüğüne Kayıt
            </h3>
          </div>
          <button onClick={onClose} className="text-[#5A5854] hover:text-[#161616] p-1">
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 border border-[#1E4D2B] bg-[#1E4D2B]/10 text-[#1E4D2B] flex items-center justify-center mx-auto rounded-sm">
              <IconCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#161616]">Kayıt Sisteme İşlendi</h4>
            <p className="text-xs text-[#5A5854]">Mezun bilgisi kütüğe aktarıldı.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Adı ve Soyadı *</label>
              <input
                type="text"
                required
                placeholder="Örn: Mehmet Özkan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Fakülte / Bölüm *</label>
              <input
                type="text"
                required
                placeholder="Örn: İktisat Fakültesi / İşletme"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">Mezuniyet Yılı *</label>
                <input
                  type="number"
                  required
                  placeholder="Örn: 2021"
                  value={formData.graduation_year}
                  onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">Mesleki Unvan</label>
                <input
                  type="text"
                  placeholder="Örn: Finans Uzmanı"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Kurumsal E-posta</label>
              <input
                type="email"
                placeholder="Örn: mehmet@alumni.istanbul.edu.tr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-[#E2DFD7]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-transparent text-[#5A5854] text-xs font-semibold hover:bg-[#F2F0EA] rounded-sm"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors"
              >
                {submitting ? 'Kaydediliyor...' : 'Kütüğe Ekle'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
