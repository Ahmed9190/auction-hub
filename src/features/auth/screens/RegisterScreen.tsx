import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormField } from '../../../components/molecules/FormField/FormField';
import { Button } from '../../../components/atoms/Button/Button';
import { Card } from '../../../components/atoms/Card/Card';
import { useAuth } from '../../../design-system/hooks/useAuth';
import { logger } from '../../../utils/logger';
import styles from './AuthScreen.module.css';

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  agreeTerms: boolean;
}

export const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    agreeTerms: false,
  });

  const [formErrors, setFormErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const errors: Partial<RegisterFormData> = {};

    if (!formData.name.trim()) {
      errors.name = 'الاسم مطلوب';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'بريد إلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^\+?[0-9]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'رقم هاتف غير صحيح';
    }

    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام';
    }

    if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'كلمات المرور غير متطابقة';
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'يجب الموافقة على الشروط والأحكام';
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

    if (formErrors[name as keyof RegisterFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      clearError();
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      logger.info('User registered successfully');
      navigate('/');
    } catch (err) {
      logger.error('Registration failed', { error: err });
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} elevation="lg" padding="lg">
        <div className={styles.header}>
          <h1 className={styles.title}>إنشاء حساب جديد</h1>
          <p className={styles.subtitle}>انضم إلينا واستمتع بتجربة البحث عن العقارات</p>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField
            label="الاسم الكامل"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            placeholder="محمد أحمد"
            isRequired
            fullWidth
            disabled={isLoading}
          />

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
            label="رقم الهاتف"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={formErrors.phone}
            placeholder="+966501234567"
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
            hint="8 أحرف على الأقل (أحرف كبيرة وصغيرة وأرقام)"
          />

          <FormField
            label="تأكيد كلمة المرور"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            error={formErrors.passwordConfirm}
            placeholder="••••••••"
            isRequired
            fullWidth
            disabled={isLoading}
          />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span>
              أوافق على{' '}
              <Link to="#" className={styles.link}>
                الشروط والأحكام
              </Link>{' '}
              و
              <Link to="#" className={styles.link}>
                سياسة الخصوصية
              </Link>
            </span>
          </label>

          {formErrors.agreeTerms && (
            <span className={styles.errorMessage}>{formErrors.agreeTerms}</span>
          )}

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            isLoading={isLoading}
          >
            إنشاء حساب
          </Button>
        </form>

        <p className={styles.footer}>
          هل لديك حساب بالفعل؟{' '}
          <Link to="/auth/login" className={styles.link}>
            تسجيل الدخول
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterScreen;