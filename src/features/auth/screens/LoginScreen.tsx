import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormField } from '../../../components/molecules/FormField/FormField';
import { Button } from '../../../components/atoms/Button/Button';
import { Card } from '../../../components/atoms/Card/Card';
import { Icon } from '../../../components/atoms/Icon/Icon';
import { useAuth } from '../../../design-system/hooks/useAuth';
import { logger } from '../../../utils/logger';
import styles from './AuthScreen.module.css';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'بريد إلكتروني غير صحيح';
    }

    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      clearError();
      await login(formData.email, formData.password);

      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      }

      logger.info('User logged in successfully');
      navigate('/');
    } catch (err) {
      logger.error('Login failed', { error: err });
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} elevation="lg" padding="lg">
        <div className={styles.header}>
          <h1 className={styles.title}>تسجيل الدخول</h1>
          <p className={styles.subtitle}>أدخل بيانات حسابك للمتابعة</p>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            placeholder="your@email.com"
            isRequired
            fullWidth
            disabled={isLoading}
          />

          <FormField
            label="كلمة المرور"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            placeholder="••••••••"
            isRequired
            fullWidth
            disabled={isLoading}
          />

          <div className={styles.rememberRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              تذكرني
            </label>
            <Link to="/auth/forgot-password" className={styles.forgotLink}>
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            isLoading={isLoading}
          >
            تسجيل الدخول
          </Button>
        </form>

        <div className={styles.divider}>
          <span>أو</span>
        </div>

        <div className={styles.socialButtons}>
          <Button
            variant="outline"
            fullWidth
            disabled={isLoading}
            icon={<Icon name="google" size="medium" />}
          >
            Google
          </Button>
          <Button
            variant="outline"
            fullWidth
            disabled={isLoading}
            icon={<Icon name="apple" size="medium" />}
          >
            Apple
          </Button>
        </div>

        <p className={styles.footer}>
          ليس لديك حساب؟{' '}
          <Link to="/auth/register" className={styles.link}>
            إنشاء حساب جديد
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginScreen;