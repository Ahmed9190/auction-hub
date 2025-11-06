import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/atoms/Button/Button";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { PropertyGrid } from "../../../components/organisms/PropertyGrid/PropertyGrid";
import styles from "./HomepageScreen.module.css";

export const HomepageScreen: React.FC = () => {
  const navigate = useNavigate();

  // Mock featured properties
  const featuredProperties = [
    {
      id: "1",
      title: "فيلا فاخرة بحي النخيل",
      price: 2500000,
      currency: "SAR",
      image: "https://placehold.co/300x200?text=Property+1",
      bedrooms: 4,
      bathrooms: 3,
      area: 500,
      status: "for-sale" as const,
      featured: true,
    },
    {
      id: "2",
      title: "شقة عصرية بالدمام",
      price: 850000,
      currency: "SAR",
      image: "https://placehold.co/300x200?text=Property+2",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      status: "for-sale" as const,
      featured: true,
    },
    {
      id: "3",
      title: "عمارة سكنية جدة",
      price: 5000000,
      currency: "SAR",
      image: "https://placehold.co/300x200?text=Property+3",
      bedrooms: 6,
      bathrooms: 4,
      area: 800,
      status: "coming-soon" as const,
      featured: true,
    },
  ];

  return (
    <div className={styles.screen}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>ابحث عن عقارك المثالي</h1>
          <p className={styles.heroSubtitle}>منصة عقارات موثوقة وآمنة للبحث والشراء والإيجار</p>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <input type="text" placeholder="ابحث عن عقار..." className={styles.searchInput} />
            <Button variant="primary" size="large" icon={<Icon name="search" size="medium" />}>
              بحث
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>العقارات المميزة</h2>
            <Button variant="outline" onClick={() => navigate("/properties")} icon={<Icon name="arrow" size="medium" />} iconPosition="right">
              عرض الكل
            </Button>
          </div>

          <PropertyGrid properties={featuredProperties} columns={3} onPropertyClick={(id) => navigate(`/properties/${id}`)} />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>لماذا تختار عقارات؟</h2>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="search" size="large" />
              </div>
              <h3>بحث سهل وسريع</h3>
              <p>ابحث عن العقارات بسهولة باستخدام عوامل التصفية المتقدمة</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="location" size="large" />
              </div>
              <h3>خرائط تفاعلية</h3>
              <p>شاهد المواقع على الخريطة وأقرب المرافق والخدمات</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="phone" size="large" />
              </div>
              <h3>تواصل مباشر</h3>
              <p>تواصل مع الوكلاء مباشرة عبر الهاتف أو WhatsApp</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="heart" size="large" />
              </div>
              <h3>قائمة المفضلة</h3>
              <p>احفظ عقاراتك المفضلة والعودة إليها في أي وقت</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>هل لديك عقار للبيع أو الإيجار؟</h2>
          <p>انضم إلى آلاف الوكلاء والمالكين على منصتنا</p>
          <Button variant="primary" size="large">
            اعلن عقارك الآن
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomepageScreen;
