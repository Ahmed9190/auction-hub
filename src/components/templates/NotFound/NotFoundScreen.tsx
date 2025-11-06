import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './NotFoundScreen.module.css';

export const NotFoundScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <span className={styles.code}>404</span>
        </div>

        <h1 className={styles.title}>الصفحة غير موجودة</h1>

        <p className={styles.description}>
          عذراً، الصفحة التي تبحث عنها غير متوفرة. قد تكون قد تم حذفها أو نقل عنوانها.
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="large" onClick={() => navigate('/')}>
            العودة إلى الرئيسية
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={() => navigate(-1)}
            icon={<Icon name="arrow" size="medium" />}
            iconPosition="right"
          >
            العودة للصفحة السابقة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;