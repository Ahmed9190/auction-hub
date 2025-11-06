import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { useTheme } from '../../../design-system/context/ThemeProvider';
import styles from './Header.module.css';

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  logo?: string;
  navLinks: NavLink[];
  onContactClick?: () => void;
  hideThemeToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navLinks,
  onContactClick,
  hideThemeToggle = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {logo ? (
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
        ) : (
          <div className={styles.logo}>
            <span className={styles.logoText}>عقارات</span>
          </div>
        )}

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {!hideThemeToggle && (
            <Button
              variant="ghost"
              size="small"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              icon={<Icon name={theme === 'light' ? 'moon' : 'sun'} />}
              aria-label="تبديل المظهر"
            />
          )}
          <Button
            variant="primary"
            size="small"
            onClick={onContactClick}
          >
            تواصل معنا
          </Button>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="فتح القائمة"
          >
            <Icon name="menu" size="medium" />
          </button>
        </div>
      </div>
    </header>
  );
};