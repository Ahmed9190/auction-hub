import React, { useRef, useState } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { Spinner } from '../../atoms/Spinner/Spinner';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  onUpload: (files: File[]) => Promise<void>;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
  isLoading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  maxFiles = 5,
  accept = 'image/*',
  multiple = true,
  isLoading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files).slice(0, maxFiles);
    setPreviewFiles(fileArray);
    onUpload(fileArray);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className={styles.input}
        disabled={isLoading}
      />

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spinner size="large" />
          <p>جاري التحميل...</p>
        </div>
      ) : (
        <div onClick={handleClick} className={styles.content}>
          <Icon name="upload" size="large" />
          <p className={styles.title}>اسحب الصور هنا أو انقر للاختيار</p>
          <p className={styles.subtitle}>الحد الأقصى: {maxFiles} صور</p>
        </div>
      )}

      {previewFiles.length > 0 && (
        <div className={styles.previews}>
          {previewFiles.map((file, index) => (
            <div key={index} className={styles.preview}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className={styles.previewImage}
              />
              <span className={styles.fileName}>{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};