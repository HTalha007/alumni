import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import JobsPage from './pages/JobsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import AddAlumniModal from './components/AddAlumniModal';
import CreateJobModal from './components/CreateJobModal';
import ApplyJobModal from './components/ApplyJobModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // --- AUTH STATE (GÖREV 3 & 4) ---
  const [token, setToken] = useState(() => localStorage.getItem('alumni_access_token') || null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('alumni_user_data');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [apiStatus, setApiStatus] = useState({
    connected: false,
    message: 'Backend servisine bağlanılıyor...'
  });
  const [aboutData, setAboutData] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modallar için state
  const [isAddAlumniOpen, setIsAddAlumniOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);
  const [applyModalData, setApplyModalData] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: ''
  });

  // --- TOKEN DOĞRULAMA VE OTURUM KORUMA ---
  const verifySession = useCallback(async (authToken) => {
    if (!authToken) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const userData = await res.json();
        setCurrentUser(userData);
        localStorage.setItem('alumni_user_data', JSON.stringify(userData));
      } else {
        // Token geçersizse temizle
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('alumni_access_token');
        localStorage.removeItem('alumni_user_data');
      }
    } catch (err) {
      console.warn('Oturum doğrulanamadı:', err);
    }
  }, []);

  const handleLoginSuccess = (newToken, userObj) => {
    setToken(newToken);
    setCurrentUser(userObj);
    localStorage.setItem('alumni_access_token', newToken);
    localStorage.setItem('alumni_user_data', JSON.stringify(userObj));
    if (userObj.role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('profile');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('alumni_access_token');
    localStorage.removeItem('alumni_user_data');
    navigateTo('home');
  };

  const handleProfileUpdated = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('alumni_user_data', JSON.stringify(updatedUser));
  };

  const handleOpenApplyJob = (jobId, jobTitle) => {
    // Giriş yapmamışsa login sayfasına yönlendir
    if (!currentUser) {
      if (window.confirm('Pozisyona başvurabilmek için oturum açmanız gerekmektedir. Giriş sayfasına gitmek ister misiniz?')) {
        navigateTo('login');
      }
      return;
    }
    setApplyModalData({
      isOpen: true,
      jobId,
      jobTitle
    });
  };

  // Tarayıcı URL takibi (History API)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (path === '' || path === 'home') setActivePage('home');
      else if (path === 'directory') setActivePage('directory');
      else if (path === 'jobs') setActivePage('jobs');
      else if (path === 'announcements') setActivePage('announcements');
      else if (path === 'register') setActivePage('register');
      else if (path === 'login') setActivePage('login');
      else if (path === 'admin') setActivePage('admin');
      else if (path === 'profile') setActivePage('profile');
      else if (path === '404') setActivePage('notfound');
      else setActivePage('notfound');
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (token) {
      verifySession(token);
    }
  }, [token, verifySession]);

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
    <div className="min-h-screen bg-[#FAF9F6] text-[#161616] flex flex-col justify-between selection:bg-[#0F2942] selection:text-white font-sans antialiased">
      {/* Üst Navigasyon Çubuğu (Rol Tabanlı Dinamik) */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        currentUser={currentUser}
        onLogout={handleLogout}
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

        {activePage === 'jobs' && (
          <JobsPage
            jobs={jobs}
            loading={false}
            onOpenCreateJob={() => setIsCreateJobOpen(true)}
            onOpenApplyJob={handleOpenApplyJob}
          />
        )}

        {activePage === 'announcements' && (
          <AnnouncementsPage
            announcements={announcements}
            loading={false}
            onOpenCreateAnnouncement={() => setIsCreateAnnouncementOpen(true)}
          />
        )}

        {activePage === 'register' && (
          <RegisterPage
            onRegisterSuccess={handleLoginSuccess}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            token={token}
            currentUser={currentUser}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            token={token}
            currentUser={currentUser}
            onProfileUpdated={handleProfileUpdated}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'notfound' && (
          <NotFoundPage setActivePage={navigateTo} />
        )}
      </main>

      <Footer aboutData={aboutData} setActivePage={navigateTo} />

      {/* Modallar */}
      <AddAlumniModal
        isOpen={isAddAlumniOpen}
        onClose={() => setIsAddAlumniOpen(false)}
        onSuccess={fetchAlumni}
      />

      <CreateJobModal
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        alumniList={alumniList}
        onSuccess={fetchJobs}
      />

      <ApplyJobModal
        isOpen={applyModalData.isOpen}
        onClose={() => setApplyModalData({ isOpen: false, jobId: null, jobTitle: '' })}
        jobId={applyModalData.jobId}
        jobTitle={applyModalData.jobTitle}
        alumniList={alumniList}
      />

      <CreateAnnouncementModal
        isOpen={isCreateAnnouncementOpen}
        onClose={() => setIsCreateAnnouncementOpen(false)}
        onSuccess={fetchAnnouncements}
      />
    </div>
  );
}
