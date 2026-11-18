import React, { useState } from 'react';
import { IconX, IconCheck } from './Icons';

export default function ApplyJobModal({ isOpen, onClose, jobId, jobTitle, alumniList }) {
  const [formData, setFormData] = useState({
    applicant_id: '',
    cover_letter: ''
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
        applicant_id: parseInt(formData.applicant_id),
        cover_letter: formData.cover_letter.trim()
      };

      const res = await fetch(`http://127.0.0.1:8000/jobs/${jobId}/applications/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Başvuru iletilirken sunucu hatası meydana geldi.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({ applicant_id: '', cover_letter: '' });
      }, 1400);
    } catch (err) {
      setError(err.message || 'Başvuru tamamlanamadı.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#161616]/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white border border-[#E2DFD7] rounded-sm w-full max-w-md p-6 z-10">
        <div className="flex justify-between items-start pb-3 mb-4 border-b border-[#E2DFD7]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7C1D26] font-semibold">
              İlan Başvuru Formu
            </span>
            <h3 className="font-serif text-lg font-bold text-[#161616] truncate max-w-[280px]">
              {jobTitle || 'Pozisyona Başvuru'}
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
            <h4 className="font-serif text-base font-bold text-[#161616]">Başvurunuz İletildi</h4>
            <p className="text-xs text-[#5A5854]">Ön yazınız ilan sahibinin kütüğüne aktarıldı.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-[#7C1D26]/10 border border-[#7C1D26]/20 text-[#7C1D26] text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Başvuran Mezun Kimliği *</label>
              {alumniList && alumniList.length > 0 ? (
                <select
                  required
                  value={formData.applicant_id}
                  onChange={(e) => setFormData({ ...formData, applicant_id: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm"
                >
                  <option value="">Profilinizi seçiniz...</option>
                  {alumniList.map((alumnus) => (
                    <option key={alumnus.id} value={alumnus.id}>
                      {alumnus.name} (Sicil #{alumnus.id}) &bull; {alumnus.title || alumnus.department}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  required
                  placeholder="Sicil ID giriniz (Örn: 1)"
                  value={formData.applicant_id}
                  onChange={(e) => setFormData({ ...formData, applicant_id: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E2DFD7] text-xs text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">Ön Yazı (Cover Letter) *</label>
              <textarea
                required
                rows="4"
                placeholder="Pozisyona uygunluğunuzu, akademik arka planınızı ve mesleki motivasyonunuzu özetleyiniz..."
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
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
                {submitting ? 'İletiliyor...' : 'Başvuruyu İlet'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
