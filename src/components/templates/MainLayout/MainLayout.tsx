import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header
        navLinks={[
          { label: 'الرئيسية', href: '/' },
          { label: 'العقارات', href: '/properties' },
          { label: 'حول المنصة', href: '/about' },
          { label: 'اتصل بنا', href: '/contact' },
        ]}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};