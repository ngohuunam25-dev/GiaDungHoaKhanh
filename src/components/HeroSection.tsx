"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BugOff,
  PackageCheck,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { trackClickCTA } from "@/lib/analytics/tiktok";

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  label: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery-1.jpg",
    alt: "Lồng bàn inox 304 Hoa Khánh toàn cảnh",
    label: "Toàn cảnh",
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    alt: "Góc nghiêng vòm lưới inox thông thoáng",
    label: "Vòm lưới",
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    alt: "Mặt úp nan tròn cứng cáp và khuyên treo tường",
    label: "Nan & Khuyên treo",
  },
  {
    id: 4,
    src: "/images/gallery-4.jpg",
    alt: "Tem logo dập nổi chính hãng Hoa Khánh và mắt lưới khít",
    label: "Tem & Mắt lưới",
  },
  {
    id: 5,
    src: "/images/gallery-5.jpg",
    alt: "Núm cầm inox nguyên khối bo tròn đầm tay",
    label: "Núm cầm",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = GALLERY_IMAGES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="flex flex-col px-4 pt-3 pb-8 gap-4 max-w-4xl mx-auto w-full">
      {/* Brand Pill / Micro Badge */}
      <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-xs">
        <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
        <span className="text-xs font-semibold tracking-wide">
          Inox 304 Chuẩn Xưởng Hoa Khánh
        </span>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight">
          Che Đậy Thức Ăn Gọn Gàng, Tiện Lợi Cho Bữa Cơm Gia Đình
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Lồng bàn inox với thiết kế dạng lưới vi sợi thông thoáng, bảo vệ món ăn chu đáo khỏi côn trùng và bụi bẩn.
        </p>
      </div>

      {/* Interactive Mobile & Desktop Gallery */}
      <div className="flex flex-col gap-2.5">
        {/* Main Slide Card */}
        <div
          className="relative w-full aspect-square max-h-[460px] rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm border border-outline-variant/30 flex items-center justify-center select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image with Smooth Fade */}
          <div className="relative w-full h-full p-3 sm:p-5 flex items-center justify-center">
            <Image
              src={GALLERY_IMAGES[activeIndex].src}
              alt={GALLERY_IMAGES[activeIndex].alt}
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className="object-contain transition-opacity duration-200"
              priority
            />
          </div>

          {/* Counter Badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-on-background/75 text-surface-container-lowest text-xs font-bold backdrop-blur-md shadow-xs">
            <span>{activeIndex + 1}</span>/{totalSlides}
          </div>

          {/* Left / Right Quick Taps */}
          <button
            type="button"
            aria-label="Hình trước"
            onClick={prevSlide}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest/90 text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container-lowest active:scale-90 transition-transform border border-outline-variant/30"
          >
            <ChevronLeft className="w-5 h-5 text-on-surface" />
          </button>
          <button
            type="button"
            aria-label="Hình kế tiếp"
            onClick={nextSlide}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest/90 text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container-lowest active:scale-90 transition-transform border border-outline-variant/30"
          >
            <ChevronRight className="w-5 h-5 text-on-surface" />
          </button>
        </div>

        {/* Thumbnails Strip */}
        <div className="grid grid-cols-5 gap-2">
          {GALLERY_IMAGES.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-square rounded-xl bg-surface-container-lowest overflow-hidden shadow-xs p-1 transition-all ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-1 scale-[1.02] shadow-sm"
                    : "opacity-70 hover:opacity-100 hover:border-primary/40 border border-outline-variant/20"
                }`}
                aria-label={`Xem ảnh ${idx + 1}: ${img.label}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Authentic Trust Micro-Badges */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <div className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 gap-1">
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-on-surface">Inox 304</span>
          <span className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">
            Sáng bóng trọn đời
          </span>
        </div>

        <div className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 gap-1">
          <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
            <BugOff className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-on-surface">Lưới Siêu Khít</span>
          <span className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">
            Chặn côn trùng 100%
          </span>
        </div>

        <div className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 gap-1">
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
            <PackageCheck className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-on-surface">Xem Hàng Trước</span>
          <span className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">
            Thanh toán tận nhà
          </span>
        </div>
      </div>

      {/* Hero CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <a
          href="#order-form"
          onClick={() => trackClickCTA("Hero - Đặt Mua Ngay", "#order-form")}
          className="h-12 sm:h-13 w-full rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
        >
          <span>ĐẶT MUA NGAY</span>
          <ArrowRight className="w-5 h-5" />
        </a>

        <a
          href="#demo-section"
          onClick={() => trackClickCTA("Hero - Xem Chi Tiết Thực Tế", "#demo-section")}
          className="h-11 sm:h-13 w-full rounded-full bg-surface-container-lowest text-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs border border-primary/20 hover:bg-surface-container-low transition-all active:scale-[0.98]"
        >
          <PlayCircle className="w-5 h-5 text-secondary" />
          <span>Xem chi tiết & thử nghiệm thực tế</span>
        </a>
      </div>
    </section>
  );
}
