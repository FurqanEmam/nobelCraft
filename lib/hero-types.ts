export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  order: number;
}

export type HeroSlideFormData = Omit<HeroSlide, "id">;
