// lib/sanity/types.ts

// ---------------------------------------------------------------------------
// Kiểu dùng chung
// ---------------------------------------------------------------------------
export type SanityReference = {
  _type: "reference";
  _ref: string;
  _weak?: boolean;
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

/** Mọi phần tử trong array của Sanity đều có _key */
type WithKey<T> = T & { _key: string };

// ---------------------------------------------------------------------------
// Các document được tham chiếu (cập nhật lại field cho khớp schema của bạn)
// ---------------------------------------------------------------------------
export type BusinessSettings = {
  _id: string;
  _type: "businessSettings";
  title: string;
  companyName: string;
  brandName: string;
  brandDescription: string;
  logo: string;
  hotline: string;
  address: string;
  businessHours: string;
  rating: string;
  reviewCountLabel: string;
  copyright: string;
  // TODO: thêm các field thực tế (hotline, zalo, địa chỉ, logo...)
  [key: string]: unknown;
};

export type Product = {
  _id: string;
  _type: "product";
  // TODO: thêm các field thực tế (name, size, sku, image...)
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Các section
// ---------------------------------------------------------------------------
export type AnnouncementBar = {
  enabled: boolean;
  badge?: string;
  text?: string;
};

export type Hero = {
  eyebrow?: string;
  headline: string;
  description?: string;
  discountBadge?: string;
  ctaText?: string;
  ctaNote?: string;
  images?: WithKey<{ image: string }>[];
};

export type ComparisonPoint = WithKey<{
  title: string;
  description?: string;
}>;

export type Comparison = {
  title?: string;
  oldProduct?: { name: string; points: ComparisonPoint[] };
  newProduct?: { name: string; points: ComparisonPoint[] };
};

export type FeatureItem = WithKey<{
  title: string;
  badge?: string;
  description?: string;
  image?: string;
}>;

export type Features = {
  title?: string;
  description?: string;
  items: FeatureItem[];
};

export type VideoItem = WithKey<{
  title: string;
  badge?: string;
  description?: string;
  videoUrl: string;
}>;

export type VideoShowcase = {
  title?: string;
  description?: string;
  videos: VideoItem[];
};

export type Review = WithKey<{
  _type: "reviewObject";
  customerName: string;
  location?: string;
  rating: number;
  content: string;
}>;

export type SocialProof = {
  title?: string;
  averageRating?: number;
  soldCountLabel?: string;
  reviews: Review[];
};

export type Pricing = {
  originalPrice: number;
  salePrice: number;
  savingsLabel?: string;
  stockLabel?: string;
  ctaText?: string;
};

/** Gói combo, `P` là kiểu của product (reference hoặc đã expand) */
export type Package<P = SanityReference> = WithKey<{
  id: string;
  name: string;
  badge?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  shippingFee: number;
  freeShipping: boolean;
  isRecommended: boolean;
  product: WithKey<P>[];
}>;

export type OrderForm = {
  title?: string;
  description?: string;
  nameLabel?: string;
  phoneLabel?: string;
  addressLabel?: string;
  submitText?: string;
  successMessage?: string;
  guarantees?: string[];
};

export type StickyCTA = {
  enabled: boolean;
  label?: string;
  callButtonLabel?: string;
};

// ---------------------------------------------------------------------------
// Document chính
// ---------------------------------------------------------------------------
type LandingPageBase<B, P> = {
  _id: string;
  _type: "landingPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;

  title: string;
  slug: SanitySlug;
  isPublished: boolean;

  businessSettings?: B;
  announcementBar?: AnnouncementBar;
  hero: Hero;
  comparison?: Comparison;
  features?: Features;
  videoShowcase?: VideoShowcase;
  socialProof?: SocialProof;
  pricing?: Pricing;
  packages?: Package<P>[];
  orderForm?: OrderForm;
  stickyCTA?: StickyCTA;
};

/** Dữ liệu thô như lưu trong Sanity (reference chưa được expand) */
export type LandingPageRaw = LandingPageBase<SanityReference, SanityReference>;

/** Dữ liệu khi query GROQ có expand reference bằng `->` */
export type LandingPage = LandingPageBase<BusinessSettings, Product>;
