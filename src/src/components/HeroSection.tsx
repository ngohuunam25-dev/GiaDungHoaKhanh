"use client";

import { HERO_CONTENT } from "@/content/siteContent";
import { trackClickCTA } from "@/lib/analytics/tiktok";
import { Hero } from "@/types/landingPage.type";
import {
  BugOff,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const GALLERY_IMAGES = HERO_CONTENT.galleryImages;
const TRUST_ICONS = [Sparkles, BugOff, PackageCheck];

export default function HeroSection({
  eyebrow,
  description,
  brandName,
  ctaText,
  ctaNote,
}: Hero & { brandName: string | undefined }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const totalSlides = GALLERY_IMAGES?.length || 0;

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
    <section className="flex flex-col pb-8 gap-4 max-w-4xl mx-auto w-full">
      {/* Brand Pill / Micro Badge */}
      <div className="w-full flex items-center justify-between pb-3.5 shadow-xs">
        <div className="flex items-center gap-3 px-4">
          {/* Logo HK màu cam */}
          {/* <div className="w-11 h-11 bg-[#ea580c] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-extrabold text-xl tracking-tight italic select-none">
              HK
            </span>
          </div> */}

          <div className="flex flex-col">
            <h1 className="text-primary font-extrabold text-base md:text-lg leading-tight tracking-wide uppercase">
              {brandName ?? HERO_CONTENT.brandBar.shopName}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0"></span>
              <span className="text-emerald-600 text-xs font-semibold tracking-tight">
                {HERO_CONTENT.brandBar.authenticBadge}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-0.5 px-4">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-amber-500 font-bold text-sm">★</span>
            <span className="font-bold text-amber-500">
              {HERO_CONTENT.brandBar.ratingScore}
            </span>
            <span className="text-slate-400 font-medium text-[11px]">
              {HERO_CONTENT.brandBar.ratingCount}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-pink-600 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-[#1e293b] font-bold text-xs tracking-tight">
              {HERO_CONTENT.brandBar.supportLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="flex flex-col gap-1.5 px-4">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight">
          {eyebrow}
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant tracking-wide leading-relaxed">
          {description}
        </p>
      </div>

      {/* Interactive Mobile & Desktop Gallery */}
      <div className="flex flex-col gap-2.5 px-4">
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
            aria-label={HERO_CONTENT.navigationAria.prevSlide}
            onClick={prevSlide}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest/90 text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container-lowest active:scale-90 transition-transform border border-outline-variant/30"
          >
            <ChevronLeft className="w-5 h-5 text-on-surface" />
          </button>
          <button
            type="button"
            aria-label={HERO_CONTENT.navigationAria.nextSlide}
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
                    ? "ring-2 ring-[#F97316] ring-offset-1 scale-[1.02] shadow-sm"
                    : "opacity-70 hover:opacity-100 hover:border-primary/40 border border-outline-variant/20"
                }`}
                aria-label={`${HERO_CONTENT.navigationAria.viewSlidePrefix} ${idx + 1}: ${img.label}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="80px"
                    className="object-contain"
                    priority
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Authentic Trust Micro-Badges */}
      {/* <div className="grid grid-cols-3 gap-2 pt-1 px-4">
        {HERO_CONTENT.trustBadges.map((badge, idx) => {
          const Icon = TRUST_ICONS[idx] || Sparkles;
          const isSecondary = idx === 1;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 gap-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isSecondary
                    ? "bg-secondary-fixed text-secondary"
                    : "bg-primary-fixed text-primary"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-on-surface">
                {badge.title}
              </span>
              <span className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">
                {badge.subtitle}
              </span>
            </div>
          );
        })}
      </div> */}

      {/* Hero CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1 px-4">
        <a
          href={HERO_CONTENT.ctaButtons.orderTargetId}
          onClick={() =>
            trackClickCTA(
              HERO_CONTENT.ctaButtons.orderTrackLabel,
              HERO_CONTENT.ctaButtons.orderTargetId,
            )
          }
          className="h-12 sm:h-13 w-full rounded-lg bg-gradient-reverse text-on-primary font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
        >
          <span>{ctaText ?? "ctaText"}</span>
        </a>

        <a
          href={HERO_CONTENT.ctaButtons.demoTargetId}
          onClick={() =>
            trackClickCTA(
              HERO_CONTENT.ctaButtons.demoTrackLabel,
              HERO_CONTENT.ctaButtons.demoTargetId,
            )
          }
          className="h-11 sm:h-13 w-full rounded-lg bg-surface-container-lowest text-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs border border-primary/20 hover:bg-surface-container-low transition-all active:scale-[0.98]"
        >
          <PlayCircle className="w-5 h-5 text-secondary" />
          <span>{ctaNote ?? "ctaNote"}</span>
        </a>
      </div>
    </section>
  );
}
