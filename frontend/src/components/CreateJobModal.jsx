import React, { useState } from 'react';
import { IconX, IconCheck } from './Icons';

export default function CreateJobModal({ isOpen, onClose, onSuccess, alumniList }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    city: '',
    description: '',
    author_id: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // DDD Kuralları
    if (formData.title.length > 120) {
      setError('İlan başlığı en fazla 120 karakter olabilir (docs/ddd.md kuralı).');
      setSubmitting(false);
      return;
    }
    if (!formData.company.trim()) {
      setError('Kurum / Şirket unvanı zorunludur (docs/ddd.md kuralı).');
      setSubmitting(false);
      return;
    }

    try {
      const fullDescription = [
        `Kurum: ${formData.company.trim()}`,
        formData.city ? `Şehir: ${formData.city.trim()}` : null,
        formData.description ? `\nPozisyon Detayı:\n${formData.description.trim()}` : null
      ].filter(Boolean).join('\n');

      const payload = {
        title: formData.title.trim(),
        description: fullDescription,
        author_id: parseInt(formData.author_id)
      };

      const res = await fetch('http://127.0.0.1:8000/jobs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('İlan yayınlanırken bir sorun oluştu.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ title: '', company: '', city: '', description: '', author_id: '' });
      }, 1400);
    } catch (err) {
      setError(err.message || 'İlan kaydedilemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#161616]/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white border border-[#E2DFD7] rounded-sm w-full max-w-lg p-6 z-10">
        <div className="flex justify-between items-start pb-3 mb-4 border-b border-[#E2DFD7]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7C1D26] font-semibold">
              İstihdam & Staj Talebi
            </span>
            <h3 className="font-serif text-xl font-bold text-[#161616]">
              Yeni Kariyer İlanı Tanzimi
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
            <h4 className="font-serif text-base font-bold text-[#161616]">İlan Panoda Yayınlandı</h4>
            <p className="text-xs text-[#5A5854]">Pozisyon başvurulara açıldı.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#161616]">Pozisyon / Görev Başlığı *</label>
                <span className={`font-mono text-[11px] ${formData.title.length > 120 ? 'text-[#7C1D26] font-bold' : 'text-[#5A5854]'}`}>
                  {formData.title.length}/120
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={120}
                placeholder="Örn: Hukuk Müşaviri / Veri Analisti"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">Kurum / Şirket Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Türkiye İş Bankası"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">Şehir / Lokasyon</label>
                <input
                  type="text"
                  placeholder="Örn: İstanbul (Levent)"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">İlan Veren Mezun Temsilcisi *</label>
              <select
                required
                value={formData.author_id}
                onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm"
              >
                <option value="">Mezun seçiniz...</option>
                {alumniList.map((alumnus) => (
                  <option key={alumnus.id} value={alumnus.id}>
                    {alumnus.name} (Sicil #{alumnus.id}) &bull; {alumnus.title || alumnus.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Aranan Nitelikler & Tanım</label>
              <textarea
                rows="3"
                placeholder="Görev tanımı, aranan akademik ve mesleki kriterler..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-[#E2DFD7]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-transparent text-[#5A5854] text-xs font-semibold hover:bg-[#F2F0EA] rounded-sm"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors"
              >
                {submitting ? 'Yayınlanıyor...' : 'İlanı Yayınla'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
