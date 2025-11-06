import React from 'react';
import styles from './Icon.module.css';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: string;
  size?: 'small' | 'medium' | 'large';
}

const ICONS: Record<string, string> = {
  search: '<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>',
  home: '<path d="M3 12l9-9 9 9M9 21v-7h6v7z"/>',
  location: '<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  phone: '<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>',
  whatsapp: '<path d="M17.472 14.338c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.198.297-.768.967-.941 1.165-.173.198-.347.223-.645.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.009-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04.917-1.04 2.238 0 1.32.847 2.596 1.021 2.794.173.198 2.541 3.865 6.169 5.411 .860.369 1.533.475 2.045.481.860.009 1.77-.349 2.327-.694.557-.345.893-.771 1.022-1.196.128-.425.128-.795.09-.871-.038-.075-.27-.149-.57-.297z"/>',
  camera: '<path d="M12 4.354a4 4 0 110 8 4 4 0 010-8M3 8H1m22 0h-2m-7-7v2m0 16v2m4.172-15.172l1.414-1.414m11.314 11.314l1.414 1.414M4.172 4.172L5.586 2.758m11.314 11.314l1.414 1.414"/>',
  upload: '<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
  close: '<path d="M6 18L18 6M6 6l12 12"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  arrow: '<path d="M9 5l7 7-7 7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  square: '<path d="M3 3h18v18H3z"/>',
  water: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15H9v-3L18.5 2.5z"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6h16zM10 11v6M14 11v6"/>',
  chart: '<path d="M3 3v18h18M3 15l4-4 4 4 7-7"/>',
  'chart-bar': '<path d="M12 3v18M3 9h18M3 15h18"/>',
  settings: '<circle cx="12" cy="12" r="1"/><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>',
  megaphone: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22v-4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>',
  plus: '<path d="M12 4v16m8-8H4"/>',
  facebook: '<path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z"/>',
  twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75-2.35 2-6 2-6"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
};

export const Icon: React.FC<IconProps> = ({ name, size = 'medium', ...props }) => {
  const pathData = ICONS[name] || '';
  const sizeClass = `size-${size}`;

  return (
    <svg
      className={`${styles.icon} ${styles[sizeClass]}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {pathData && <g dangerouslySetInnerHTML={{ __html: pathData }} />}
    </svg>
  );
};

export default Icon;