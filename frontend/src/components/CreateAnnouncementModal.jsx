import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconBell, IconCheck } from './Icons';

export default function CreateAnnouncementModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Etkinlik'
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
        throw new Error('Duyuru eklenirken bir hata oluştu.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ title: '', content: '', category: 'Etkinlik' });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Duyuru kaydedilemedi.');
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
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative z-10"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <IconBell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Yeni Duyuru & Etkinlik Yayınla</h3>
                <p className="text-xs text-slate-400">Üniversite ve mezun topluluğuna resmi bülten ekleyin.</p>
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
              <h4 className="text-lg font-bold text-white">Duyuru Yayınlandı!</h4>
              <p className="text-xs text-slate-400">Tüm mezunlar duyurular sayfasında içeriği görebilir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Duyuru Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026 Mezunlar Günü Beyazıt Buluşması"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Duyuru / Etkinlik İçeriği *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Etkinlik yeri, saati, katılım koşulları ve detaylı bilgiler..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20"
                >
                  {submitting ? 'Yayınlanıyor...' : 'Duyuruyu Yayınla'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
