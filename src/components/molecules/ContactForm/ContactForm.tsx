import React, { useState } from 'react';
import { FormField } from '../FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.message.trim()) newErrors.message = 'الرسالة مطلوبة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormField
        label="الاسم"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        isRequired
        fullWidth
      />

      <FormField
        label="البريد الإلكتروني"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        isRequired
        fullWidth
      />

      <FormField
        label="رقم الهاتف"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        isRequired
        fullWidth
      />

      <div className={styles.messageField}>
        <label htmlFor="message" className={styles.label}>
          الرسالة <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
          rows={5}
          placeholder="اكتب رسالتك هنا..."
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        fullWidth
      >
        إرسال الرسالة
      </Button>
    </form>
  );
};