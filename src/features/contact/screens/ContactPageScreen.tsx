import React from 'react';
import { Header } from '../../../components/organisms/Header/Header';
import { Footer } from '../../../components/organisms/Footer/Footer';
import { ContactForm, type ContactFormData } from '../../../components/molecules/ContactForm/ContactForm';
import { Card } from '../../../components/atoms/Card/Card';
import { Icon } from '../../../components/atoms/Icon/Icon';
import { Spinner } from '../../../components/atoms/Spinner/Spinner';
import { apiClient } from '../../../services/api/client';
import { logger } from '../../../utils/logger';
import styles from './ContactPageScreen.module.css';

export const ContactPageScreen: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      await apiClient.post('/contact', data);
      setSubmitSuccess(true);
      logger.info('Contact form submitted successfully');

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      logger.error('Failed to submit contact form', { error });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.screen}>
      <Header
        navLinks={[
          { label: 'الرئيسية', href: '/' },
          { label: 'العقارات', href: '/properties' },
          { label: 'حول المنصة', href: '/about' },
        ]}
        onContactClick={() => window.scrollTo(0, 0)}
      />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>اتصل بنا</h1>
          <p className={styles.heroSubtitle}>نحن هنا للإجابة على جميع استفساراتك</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          {/* Contact Info */}
          <div className={styles.infoColumn}>
            <Card elevation="md" padding="lg">
              <h2 className={styles.sectionTitle}>معلومات التواصل</h2>

              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <Icon name="location" size="large" />
                </div>
                <div>
                  <h3>العنوان</h3>
                  <p>الرياض، المملكة العربية السعودية</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <Icon name="phone" size="large" />
                </div>
                <div>
                  <h3>الهاتف</h3>
                  <a href="tel:+966501234567">+966 50 123 4567</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <Icon name="mail" size="large" />
                </div>
                <div>
                  <h3>البريد الإلكتروني</h3>
                  <a href="mailto:info@example.com">info@example.com</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <Icon name="clock" size="large" />
                </div>
                <div>
                  <h3>ساعات العمل</h3>
                  <p>السبت - الخميس: 9:00 AM - 6:00 PM</p>
                  <p>الجمعة مغلق</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className={styles.formColumn}>
            <Card elevation="md" padding="lg">
              <h2 className={styles.sectionTitle}>أرسل لنا رسالة</h2>

              {submitSuccess && (
                <div className={styles.successAlert}>
                  ✓ شكراً لك! تم استقبال رسالتك بنجاح. سنتواصل معك قريباً.
                </div>
              )}

              {isSubmitting ? (
                <div className={styles.loadingContainer}>
                  <Spinner size="large" />
                  <p>جاري إرسال الرسالة...</p>
                </div>
              ) : (
                <ContactForm onSubmit={handleSubmit} isLoading={isSubmitting} />
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <h2 className={styles.mapTitle}>موقعنا</h2>
        <div className={styles.mapContainer}>
          {/* Google Maps integration */}
          <div className={styles.mapPlaceholder}>خريطة - الرياض، المملكة العربية السعودية</div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPageScreen;