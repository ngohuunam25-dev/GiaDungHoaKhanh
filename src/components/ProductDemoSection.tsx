"use client";

import { DetailFeature, PRODUCT_DEMO_CONTENT } from "@/content/siteContent";
import { getAllVideoUrls } from "@/content/videos";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { cn } from "@/lib/utils";
import { CheckCircle2, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type { DetailFeature };
const DETAIL_FEATURES = PRODUCT_DEMO_CONTENT.features;
const VIDEOS = getAllVideoUrls();

export default function ProductDemoSection() {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "10px",
    threshold: 0.2,
  });
  const activeVideo = VIDEOS[activeVideoIdx];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const switchVideo = (idx: number) => {
    if (idx === activeVideoIdx) return;
    // Pause current video before switching
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current?.paused) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      }, 0);

      //scroll video
      videoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    setActiveVideoIdx(idx);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isVisible && videoRef.current) {
        videoRef.current?.play();
        setIsPlaying(true);
      } else if (!isVisible && videoRef.current) {
        videoRef.current?.pause();
        setIsPlaying(false);
      }
    }, 0);
  }, [isVisible, videoRef?.current]);

  return (
    <section
      id="demo-section"
      className="flex flex-col px-4 py-8 bg-surface-container-low/70 border-y border-outline-variant/20 gap-6 w-full"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            {PRODUCT_DEMO_CONTENT.sectionBadge}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
            {PRODUCT_DEMO_CONTENT.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {PRODUCT_DEMO_CONTENT.sectionDescription}
          </p>
        </div>
        {/* Video Player Card */}
        {/* Video Selector Thumbnails */}
        {VIDEOS.length > 1 && (
          <div className="grid grid-cols-3 gap-2">
            {VIDEOS.map((vid, idx) => {
              const isActive = idx === activeVideoIdx;
              return (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => switchVideo(idx)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 rounded-md transition-all ${
                    isActive
                      ? "bg-orange-200/15 ring-2 ring-[#F97316] shadow-sm"
                      : "bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/20"
                  }`}
                  aria-label={vid.description}
                >
                  <span
                    className={`text-[10px] sm:text-xs font-semibold leading-tight text-center ${
                      isActive ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {vid.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="relative w-full aspect-[4/5] sm:aspect-[16/9] rounded-lg overflow-hidden bg-surface-container shadow-md border border-outline-variant/30 group"
        >
          {/* Actual Video Element */}
          <video
            ref={videoRef}
            src={activeVideo?.url}
            muted={isMuted}
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/40 to-transparent flex flex-col justify-between p-4 sm:p-6 text-surface-container-lowest">
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-primary/85 backdrop-blur-md text-xs font-extrabold text-on-primary flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-lg bg-secondary-container animate-pulse" />
                {PRODUCT_DEMO_CONTENT.video.badge}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={
                    isMuted
                      ? PRODUCT_DEMO_CONTENT.video.unmuteAria
                      : PRODUCT_DEMO_CONTENT.video.muteAria
                  }
                  className="p-2 rounded-full bg-primary hover:bg-surface-container-lowest/30 backdrop-blur-md text-white transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Middle Play Button */}
            <div
              className="flex items-center justify-center my-auto"
              onClick={togglePlay}
            >
              <button
                type="button"
                aria-label={PRODUCT_DEMO_CONTENT.video.playAria}
                className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/95 text-on-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all ring-4 ring-on-primary/30",
                  isPlaying ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </button>
            </div>

            {/* Bottom Info Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col max-w-[80%]">
                  <span className="font-extrabold text-lg sm:text-xl text-surface-container-lowest truncate">
                    {PRODUCT_DEMO_CONTENT.video.title}
                  </span>
                  <span className="text-[11px] text-surface-container-low/90">
                    {PRODUCT_DEMO_CONTENT.video.subtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Detailed Feature Zoom Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {DETAIL_FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3.5 sm:p-4 rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/30 hover:shadow-sm transition-all"
            >
              <div className="relative w-full h-36 rounded-t-lg overflow-hidden bg-surface-container shrink-0 ">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  // sizes="100px"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1 px-3.5 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-extrabold text-sm sm:text-base text-on-surface leading-tight">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
