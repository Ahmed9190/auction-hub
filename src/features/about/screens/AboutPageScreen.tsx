import React from "react";
import { Button } from "../../../components/atoms/Button/Button";
import { Card } from "../../../components/atoms/Card/Card";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { Badge } from "../../../components/atoms/Badge/Badge";
import styles from "./AboutPageScreen.module.css";

export const AboutPageScreen: React.FC = () => {
  const teamMembers = [
    {
      name: "محمد أحمد",
      role: "المؤسس والرئيس التنفيذي",
      image: "https://placehold.co/150?text=Member+1",
      bio: "خبير عقاري بـ 15 سنة من الخبرة",
    },
    {
      name: "فاطمة علي",
      role: "مديرة التسويق",
      image: "https://placehold.co/150?text=Member+2",
      bio: "متخصصة في التسويق الرقمي",
    },
    {
      name: "خالد سالم",
      role: "مدير التطوير التقني",
      image: "https://placehold.co/150?text=Member+3",
      bio: "متطور برمجيات ومهندس أنظمة",
    },
  ];

  const features = [
    {
      icon: "search",
      title: "بحث سهل",
      description: "ابحث عن العقارات بسهولة باستخدام عوامل التصفية المتقدمة",
    },
    {
      icon: "location",
      title: "خرائط تفاعلية",
      description: "عرض المواقع على الخريطة وتحديد أقرب المرافق",
    },
    {
      icon: "phone",
      title: "تواصل مباشر",
      description: "تواصل مع الوكلاء مباشرة عبر الهاتف أو WhatsApp",
    },
    {
      icon: "heart",
      title: "قائمة المفضلة",
      description: "احفظ عقاراتك المفضلة للرجوع إليها لاحقاً",
    },
  ];

  return (
    <div className={styles.screen}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>عن منصة عقارات</h1>
          <p className={styles.heroSubtitle}>منصتك الموثوقة للبحث عن العقارات المثالية</p>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.content}>
              <h2 className={styles.sectionTitle}>من نحن</h2>
              <p className={styles.paragraph}>
                منصة عقارات هي المنصة الرائدة في السوق السعودي للبحث والتواصل حول العقارات. نساعد آلاف العملاء يومياً في العثور على عقاراتهم الحلم، سواء كانوا
                يبحثون عن شراء أو إيجار أو استثمار.
              </p>
              <p className={styles.paragraph}>
                تأسست المنصة عام 2020 بهدف تسهيل عملية البحث عن العقارات وجعلها أكثر شفافية وسهولة. نحن نؤمن بأن كل شخص يستحق الوصول إلى معلومات دقيقة وموثوقة
                عن السوق العقاري.
              </p>

              <Button variant="primary" size="large">
                ابدأ البحث الآن
              </Button>
            </div>

            <div className={styles.image}>
              <img src="https://placehold.co/500x400?text=About+Image" alt="عن المنصة" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section} style={{ backgroundColor: "var(--color-gray-50)" }}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>مميزاتنا</h2>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <Card key={index} elevation="md" padding="lg" className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Icon name={feature.icon} size="large" />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>فريقنا</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <Card key={index} elevation="md" padding="lg" className={styles.teamCard}>
                <img src={member.image} alt={member.name} className={styles.memberImage} />
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberBio}>{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50,000+</div>
              <div className={styles.statLabel}>عقار مدرج</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100,000+</div>
              <div className={styles.statLabel}>مستخدم نشط</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>سنوات من الخبرة</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>رضا العملاء</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.section} style={{ backgroundColor: "var(--color-gray-50)" }}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>قيمنا</h2>
          <div className={styles.valuesGrid}>
            <Card elevation="none" padding="lg" className={styles.valueCard}>
              <h3>الشفافية</h3>
              <p>نوفر معلومات دقيقة وموثوقة عن جميع العقارات</p>
            </Card>
            <Card elevation="none" padding="lg" className={styles.valueCard}>
              <h3>الابتكار</h3>
              <p>نستخدم أحدث التقنيات لتحسين تجربة المستخدم</p>
            </Card>
            <Card elevation="none" padding="lg" className={styles.valueCard}>
              <h3>الأمان</h3>
              <p>حماية بيانات المستخدمين من أولوياتنا</p>
            </Card>
            <Card elevation="none" padding="lg" className={styles.valueCard}>
              <h3>خدمة العملاء</h3>
              <p>فريق دعم متاح 24/7 للإجابة على استفساراتك</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>هل أنت مستعد للبدء؟</h2>
          <p>انضم لآلاف المستخدمين الذين وجدوا عقاراتهم المثالية معنا</p>
          <Button variant="primary" size="large">
            ابدأ الآن
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPageScreen;
