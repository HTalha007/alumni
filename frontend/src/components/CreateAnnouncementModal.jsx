import React, { useState } from 'react';
import { IconX, IconCheck } from './Icons';

export default function CreateAnnouncementModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
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
        title: formData.title.trim(),
        content: formData.content.trim()
      };

      const res = await fetch('http://127.0.0.1:8000/announcements/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Duyuru kaydedilirken bir hata oluştu.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ title: '', content: '' });
      }, 1400);
    } catch (err) {
      setError(err.message || 'Duyuru kaydedilemedi.');
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
              Resmi Bülten Tanzimi
            </span>
            <h3 className="font-serif text-xl font-bold text-[#161616]">
              Yeni Duyuru & Etkinlik Girişi
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
            <h4 className="font-serif text-base font-bold text-[#161616]">Duyuru Bültene Eklendi</h4>
            <p className="text-xs text-[#5A5854]">Tüm mezunlar ve mensuplar için yayınlandı.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Duyuru / Etkinlik Başlığı *</label>
              <input
                type="text"
                required
                placeholder="Örn: 2026 Mezunlar Buluşması ve Beyazıt Töreni"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs sm:text-sm text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Duyuru Metni *</label>
              <textarea
                required
                rows="4"
                placeholder="Etkinlik yeri, katılım koşulları, program akışı ve resmi duyuru metni..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                {submitting ? 'Yayınlanıyor...' : 'Duyuruyu Yayınla'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
