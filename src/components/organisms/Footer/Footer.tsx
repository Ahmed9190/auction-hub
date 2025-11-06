import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Footer Content */}
        <div className={styles.content}>
          {/* About Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>عن عقارات</h3>
            <p className={styles.description}>
              منصة عقارات الموثوقة للبحث والشراء والإيجار في المملكة العربية السعودية.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>
                <Icon name="facebook" size="medium" />
              </a>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>
                <Icon name="twitter" size="medium" />
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <Icon name="instagram" size="medium" />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <Icon name="linkedin" size="medium" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>روابط سريعة</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/">الرئيسية</Link>
              </li>
              <li>
                <Link to="/properties">العقارات</Link>
              </li>
              <li>
                <Link to="/about">حول المنصة</Link>
              </li>
              <li>
                <Link to="/contact">اتصل بنا</Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>للمستخدمين</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/auth/login">تسجيل الدخول</Link>
              </li>
              <li>
                <Link to="/auth/register">إنشاء حساب</Link>
              </li>
              <li>
                <a href="#favorites">المفضلة</a>
              </li>
              <li>
                <a href="#profile">الملف الشخصي</a>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>للمتعاونين</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#partner">أصبح شريكاً</a>
              </li>
              <li>
                <a href="#advertise">اعلن عقارك</a>
              </li>
              <li>
                <a href="#pricing">الأسعار</a>
              </li>
              <li>
                <a href="#support">الدعم</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>تواصل معنا</h3>
            <div className={styles.contactInfo}>
              <a href="tel:+966501234567" className={styles.contactItem}>
                <Icon name="phone" size="small" />
                +966 50 123 4567
              </a>
              <a href="mailto:info@example.com" className={styles.contactItem}>
                <Icon name="mail" size="small" />
                info@example.com
              </a>
              <div className={styles.contactItem}>
                <Icon name="location" size="small" />
                الرياض، السعودية
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} عقارات. جميع الحقوق محفوظة.
            </p>
            <div className={styles.legalLinks}>
              <Link to="#privacy">سياسة الخصوصية</Link>
              <span className={styles.divider}>|</span>
              <Link to="#terms">الشروط والأحكام</Link>
              <span className={styles.divider}>|</span>
              <Link to="#cookies">سياسة الكوكيز</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;