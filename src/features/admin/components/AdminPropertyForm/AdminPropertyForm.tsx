import React, { useState } from 'react';
import { FormField } from '../../../../components/molecules/FormField/FormField';
import { ImageUpload } from '../../../../components/molecules/ImageUpload/ImageUpload';
import { Button } from '../../../../components/atoms/Button/Button';
import { logger } from '../../../../utils/logger';
import styles from './AdminPropertyForm.module.css';

interface AdminPropertyFormProps {
  propertyId?: string;
  onSuccess?: () => void;
}

export const AdminPropertyForm: React.FC<AdminPropertyFormProps> = ({ propertyId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    currency: 'SAR',
    description: '',
    bedrooms: '0',
    bathrooms: '0',
    area: '0',
    location: '',
    status: 'for-sale',
    featured: false,
    amenities: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (files: File[]) => {
    logger.info('Images selected for upload', { count: files.length });
    // Handle image upload
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      logger.info('Submitting property form', { propertyId });
      // API call
      onSuccess?.();
    } catch (error) {
      logger.error('Failed to submit property form', { error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>المعلومات الأساسية</h3>

        <FormField
          label="اسم العقار"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          isRequired
        />

        <div className={styles.grid}>
          <FormField
            label="السعر"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            isRequired
          />
          <FormField
            label="العملة"
            name="currency"
            as="select"
            value={formData.currency}
            onChange={handleChange}
            fullWidth
          >
            <option value="SAR">ريال سعودي</option>
            <option value="USD">دولار أمريكي</option>
          </FormField>
        </div>

        <FormField
          label="الوصف"
          name="description"
          as="textarea"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          isRequired
        />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>تفاصيل العقار</h3>

        <div className={styles.grid}>
          <FormField
            label="عدد الغرف"
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            fullWidth
          />
          <FormField
            label="عدد الحمامات"
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            fullWidth
          />
          <FormField
            label="المساحة (م²)"
            name="area"
            type="number"
            value={formData.area}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <FormField
          label="الموقع"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          isRequired
        />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>الحالة والعرض</h3>

        <div className={styles.grid}>
          <FormField
            label="حالة العقار"
            name="status"
            as="select"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          >
            <option value="for-sale">للبيع</option>
            <option value="rented">للإيجار</option>
            <option value="coming-soon">قريباً</option>
            <option value="sold">تم البيع</option>
          </FormField>
        </div>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          عقار مميز
        </label>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>الصور</h3>
        <ImageUpload onUpload={handleImageUpload} maxFiles={10} />
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="large" isLoading={isLoading}>
          {propertyId ? 'تحديث' : 'إضافة'} العقار
        </Button>
      </div>
    </form>
  );
};

export default AdminPropertyForm;