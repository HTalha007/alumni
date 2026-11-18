import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconCheck, IconBriefcase } from './Icons';

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
        cover_letter: formData.cover_letter
      };

      const res = await fetch(`http://127.0.0.1:8000/jobs/${jobId}/applications/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Başvuru iletilirken bir hata meydana geldi.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({ applicant_id: '', cover_letter: '' });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Başvuru yapılamadı.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <IconBriefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">İlan Başvurusu</span>
                <h3 className="text-lg font-bold text-white truncate max-w-[280px]">{jobTitle || 'Pozisyona Başvur'}</h3>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {success ? (
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <IconCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Başvurunuz İletildi!</h4>
              <p className="text-xs text-slate-400">İlan sahibine ön yazınız ve mezun profiliniz başarıyla ulaştırıldı.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Başvuran Mezun Profili *</label>
                {alumniList && alumniList.length > 0 ? (
                  <select
                    required
                    value={formData.applicant_id}
                    onChange={(e) => setFormData({ ...formData, applicant_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Profilinizi seçin...</option>
                    {alumniList.map((alumnus) => (
                      <option key={alumnus.id} value={alumnus.id}>
                        {alumnus.name} (#{alumnus.id}) - {alumnus.title || alumnus.department}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    required
                    placeholder="Mezun ID'nizi girin (Örn: 1)"
                    value={formData.applicant_id}
                    onChange={(e) => setFormData({ ...formData, applicant_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ön Yazı (Cover Letter) *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Bu pozisyon için motivasyonunuzu, tecrübelerinizi ve projelerinizi özetleyin..."
                  value={formData.cover_letter}
                  onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                >
                  {submitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
