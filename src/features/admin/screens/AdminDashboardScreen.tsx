import React, { useState } from 'react';
import { Button } from '../../../components/atoms/Button/Button';
import { Icon } from '../../../components/atoms/Icon/Icon';
import { Card } from '../../../components/atoms/Card/Card';
import { AdminPropertyForm } from '../components/AdminPropertyForm/AdminPropertyForm';
import { AdminPropertyList } from '../components/AdminPropertyList/AdminPropertyList';
import { logger } from '../../../utils/logger';
import styles from './AdminDashboardScreen.module.css';

type AdminTab = 'dashboard' | 'properties' | 'campaigns' | 'analytics' | 'settings';

export const AdminDashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  const handleAddProperty = () => {
    setEditingPropertyId(null);
    setShowPropertyForm(true);
  };

  const handleEditProperty = (id: string) => {
    setEditingPropertyId(id);
    setShowPropertyForm(true);
  };

  const handleCloseForm = () => {
    setShowPropertyForm(false);
    setEditingPropertyId(null);
  };

  const dashboardStats = [
    { label: 'إجمالي العقارات', value: '1,250', icon: 'home', color: 'primary' },
    { label: 'العقارات المباعة', value: '450', icon: 'check', color: 'success' },
    { label: 'الحملات النشطة', value: '28', icon: 'megaphone', color: 'warning' },
    { label: 'المستخدمين المسجلين', value: '5,200', icon: 'users', color: 'info' },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>عقارات</span>
          <span className={styles.admin}>Admin</span>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Icon name="chart" size="medium" />
            لوحة التحكم
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'properties' ? styles.active : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <Icon name="home" size="medium" />
            إدارة العقارات
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'campaigns' ? styles.active : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            <Icon name="megaphone" size="medium" />
            الحملات الإعلانية
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'analytics' ? styles.active : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <Icon name="chart-bar" size="medium" />
            التحليلات
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Icon name="settings" size="medium" />
            الإعدادات
          </button>
        </nav>

        <button className={styles.logoutButton}>
          <Icon name="logout" size="medium" />
          تسجيل الخروج
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>لوحة التحكم</h1>
          <div className={styles.headerActions}>
            <Button variant="primary" onClick={handleAddProperty}>
              <Icon name="plus" size="medium" />
              عقار جديد
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              <div className={styles.statsGrid}>
                {dashboardStats.map((stat, index) => (
                  <Card key={index} elevation="md" padding="lg" className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles[`color-${stat.color}`]}`}>
                      <Icon name={stat.icon} size="large" />
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>{stat.label}</span>
                      <span className={styles.statValue}>{stat.value}</span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Recent Properties */}
              <Card elevation="md" padding="lg" className={styles.recentCard}>
                <h2 className={styles.cardTitle}>آخر العقارات المضافة</h2>
                <AdminPropertyList onEdit={handleEditProperty} limit={5} />
              </Card>
            </>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && !showPropertyForm && (
            <Card elevation="md" padding="lg">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>إدارة العقارات</h2>
                <Button variant="primary" onClick={handleAddProperty}>
                  إضافة عقار جديد
                </Button>
              </div>
              <AdminPropertyList onEdit={handleEditProperty} />
            </Card>
          )}

          {/* Property Form */}
          {showPropertyForm && (
            <Card elevation="md" padding="lg">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  {editingPropertyId ? 'تعديل العقار' : 'إضافة عقار جديد'}
                </h2>
                <Button variant="outline" onClick={handleCloseForm}>
                  إلغاء
                </Button>
              </div>
              <AdminPropertyForm
                propertyId={editingPropertyId || undefined}
                onSuccess={handleCloseForm}
              />
            </Card>
          )}

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <Card elevation="md" padding="lg">
              <h2 className={styles.cardTitle}>الحملات الإعلانية</h2>
              <p className={styles.placeholder}>قريباً - إدارة الحملات الإعلانية</p>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <Card elevation="md" padding="lg">
              <h2 className={styles.cardTitle}>التحليلات</h2>
              <p className={styles.placeholder}>قريباً - تقارير التحليلات المتقدمة</p>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card elevation="md" padding="lg">
              <h2 className={styles.cardTitle}>الإعدادات</h2>
              <p className={styles.placeholder}>قريباً - إعدادات النظام</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardScreen;