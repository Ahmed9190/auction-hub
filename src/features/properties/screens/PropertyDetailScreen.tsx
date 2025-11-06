import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/atoms/Button/Button";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { Badge } from "../../../components/atoms/Badge/Badge";
import { Card } from "../../../components/atoms/Card/Card";
import { StatusIndicator } from "../../../components/atoms/StatusIndicator/StatusIndicator";
import { Spinner } from "../../../components/atoms/Spinner/Spinner";
import { ContactForm } from "../../../components/molecules/ContactForm/ContactForm";
import { PropertyGrid } from "../../../components/organisms/PropertyGrid/PropertyGrid";
import { useProperties } from "../hooks/useProperties";
import { logger } from "../../../utils/logger";
import styles from "./PropertyDetailScreen.module.css";

interface Property {
  id: string;
  title: string;
  price: number;
  currency: "SAR" | "USD";
  description: string;
  images: string[];
  status: "for-sale" | "sold" | "coming-soon" | "rented";
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  featured: boolean;
  views: number;
  postedDate: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
}

export const PropertyDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const { properties: relatedProperties } = useProperties();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        // Mock data - replace with API call
        const mockProperty: Property = {
          id: id || "1",
          title: "فيلا فاخرة بحي النخيل",
          price: 2500000,
          currency: "SAR",
          description: "فيلا حديثة وفاخرة في أفضل موقع بحي النخيل برياض, تحتوي على...",
          images: [
            "https://placehold.co/600x400?text=Property+1",
            "https://placehold.co/600x400?text=Property+2",
            "https://placehold.co/600x400?text=Property+3",
          ],
          status: "for-sale",
          bedrooms: 4,
          bathrooms: 3,
          area: 500,
          location: "الرياض - حي النخيل",
          latitude: 24.7136,
          longitude: 46.6753,
          amenities: ["مسبح", "جراج", "حديقة", "مطبخ حديث", "غرفة ألعاب"],
          featured: true,
          views: 1250,
          postedDate: "2025-11-01",
          agentName: "أحمد محمد",
          agentPhone: "+966501234567",
          agentEmail: "agent@example.com",
        };

        setProperty(mockProperty);
        setError(null);
        logger.info("Property loaded successfully", { propertyId: id });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load property";
        setError(message);
        logger.error("Failed to load property", { error: message, propertyId: id });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <p>جاري تحميل التفاصيل...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className={styles.errorContainer}>
        <h2>خطأ في التحميل</h2>
        <p>{error || "العقار غير موجود"}</p>
        <Button onClick={() => navigate("/properties")}>العودة للعقارات</Button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("ar-SA").format(property.price);
  const formattedArea = new Intl.NumberFormat("ar-SA").format(property.area);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن العقار: ${property.title}`);
    window.open(`https://wa.me/${property.agentPhone}?text=${message}`, "_blank");
  };

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {/* Image Gallery */}
        <section className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={property.images[currentImageIndex]} alt={`${property.title} - صورة ${currentImageIndex + 1}`} />
            <div className={styles.imageControls}>
              <button onClick={handlePrevImage} className={styles.imageButton} aria-label="الصورة السابقة">
                <Icon name="arrow" size="large" />
              </button>
              <button onClick={handleNextImage} className={styles.imageButton} aria-label="الصورة التالية">
                <Icon name="arrow" size="large" />
              </button>
            </div>

            <div className={styles.imageIndicators}>
              <StatusIndicator status={property.status} showLabel />
              <span className={styles.imageCounter}>
                {currentImageIndex + 1} / {property.images.length}
              </span>
            </div>

            <button
              className={styles.favoriteButton}
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label={isFavorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            >
              <Icon name="heart" size="large" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbnails}>
            {property.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={image} alt={`صورة ${index + 1}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{property.title}</h1>
              <p className={styles.location}>
                <Icon name="location" size="medium" />
                {property.location}
              </p>
            </div>
            <div className={styles.price}>
              {formattedPrice} {property.currency}
            </div>
          </div>

          {/* Quick Info */}
          <div className={styles.quickInfo}>
            <div className={styles.infoItem}>
              <Icon name="home" size="medium" />
              <div>
                <span className={styles.label}>{property.bedrooms}</span>
                <span className={styles.value}>غرفة</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Icon name="water" size="medium" />
              <div>
                <span className={styles.label}>{property.bathrooms}</span>
                <span className={styles.value}>حمام</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Icon name="square" size="medium" />
              <div>
                <span className={styles.label}>{formattedArea}</span>
                <span className={styles.value}>م²</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Icon name="eye" size="medium" />
              <div>
                <span className={styles.label}>{property.views}</span>
                <span className={styles.value}>مشاهدة</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>الوصف</h2>
            <p className={styles.description}>{property.description}</p>
          </section>

          {/* Amenities */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>المميزات</h2>
            <div className={styles.amenitiesList}>
              {property.amenities.map((amenity, index) => (
                <Badge key={index} variant="primary" size="medium">
                  ✓ {amenity}
                </Badge>
              ))}
            </div>
          </section>

          {/* Location Map */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>الموقع</h2>
            <div className={styles.mapContainer}>
              {/* Google Maps integration placeholder */}
              <div className={styles.mapPlaceholder}>خريطة الموقع - {property.location}</div>
            </div>
          </section>

          {/* Agent Info */}
          <Card className={styles.agentCard} elevation="md" padding="lg">
            <h2 className={styles.sectionTitle}>معلومات الوكيل</h2>
            <div className={styles.agentInfo}>
              <div>
                <p className={styles.agentName}>{property.agentName}</p>
                <a href={`tel:${property.agentPhone}`} className={styles.agentContact}>
                  <Icon name="phone" size="medium" />
                  {property.agentPhone}
                </a>
                <a href={`mailto:${property.agentEmail}`} className={styles.agentContact}>
                  {property.agentEmail}
                </a>
              </div>
              <div className={styles.agentActions}>
                <Button variant="primary" fullWidth onClick={handleWhatsApp} icon={<Icon name="whatsapp" size="medium" />}>
                  WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - Contact Form */}
        <aside className={styles.sidebar}>
          <Card elevation="lg" padding="lg">
            <h2 className={styles.sectionTitle}>اتصل بالوكيل</h2>
            <ContactForm
              onSubmit={async (data) => {
                logger.info("Contact form submitted", { propertyId: property.id });
                // Handle form submission
              }}
            />
          </Card>
        </aside>
      </div>

      {/* Related Properties */}
      <section className={styles.related}>
        <div className={styles.relatedContainer}>
          <h2 className={styles.relatedTitle}>عقارات مشابهة</h2>
          <PropertyGrid properties={relatedProperties.slice(0, 3)} columns={3} onPropertyClick={(propertyId) => navigate(`/properties/${propertyId}`)} />
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailScreen;
