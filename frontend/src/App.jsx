import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import AddAlumniModal from './components/AddAlumniModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [apiStatus, setApiStatus] = useState({
    connected: false,
    message: 'Backend servisine bağlanılıyor...'
  });
  const [aboutData, setAboutData] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modallar için placeholder state
  const [isAddAlumniOpen, setIsAddAlumniOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  // Tarayıcı URL takibi (History API)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (path === '' || path === 'home') setActivePage('home');
      else if (path === 'directory') setActivePage('directory');
      else if (path === 'jobs') setActivePage('jobs');
      else if (path === 'announcements') setActivePage('announcements');
      else if (path === '404') setActivePage('notfound');
      else setActivePage('notfound');
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    const targetUrl = pageId === 'home' ? '/' : `/${pageId === 'notfound' ? '404' : pageId}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // API Veri Çekme
  const fetchHealth = useCallback(() => {
    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus({
          connected: true,
          message: data.message || 'İstanbul Üniversitesi Mezun Platformu API Aktif'
        });
      })
      .catch(() => {
        setApiStatus({
          connected: false,
          message: 'Backend API servisi çevrimdışı'
        });
      });

    fetch('http://127.0.0.1:8000/about')
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch(() => {});
  }, []);

  const fetchAlumni = useCallback(() => {
    fetch('http://127.0.0.1:8000/users/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAlumniList(data);
      })
      .catch((err) => console.error('Mezunlar alınamadı:', err));
  }, []);

  const fetchAnnouncements = useCallback(() => {
    fetch('http://127.0.0.1:8000/announcements/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAnnouncements(data);
      })
      .catch((err) => console.error('Duyurular alınamadı:', err));
  }, []);

  const fetchJobs = useCallback(() => {
    fetch('http://127.0.0.1:8000/jobs/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
      })
      .catch((err) => console.error('İş ilanları alınamadı:', err));
  }, []);

  useEffect(() => {
    fetchHealth();
    fetchAlumni();
    fetchAnnouncements();
    fetchJobs();
  }, [fetchHealth, fetchAlumni, fetchAnnouncements, fetchJobs]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenAddAlumni={() => setIsAddAlumniOpen(true)}
        onOpenCreateJob={() => setIsCreateJobOpen(true)}
      />

      <main className="flex-1 flex flex-col">
        {activePage === 'home' && (
          <HomePage
            apiStatus={apiStatus}
            alumniCount={alumniList.length}
            jobCount={jobs.length}
            announcementCount={announcements.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setActivePage={navigateTo}
            onOpenAddAlumni={() => setIsAddAlumniOpen(true)}
          />
        )}

        {activePage === 'directory' && (
          <DirectoryPage
            alumniList={alumniList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenAddAlumni={() => setIsAddAlumniOpen(true)}
            loading={false}
          />
        )}
      </main>

      <Footer aboutData={aboutData} setActivePage={navigateTo} />

      <AddAlumniModal
        isOpen={isAddAlumniOpen}
        onClose={() => setIsAddAlumniOpen(false)}
        onSuccess={fetchAlumni}
      />
    </div>
  );
}
