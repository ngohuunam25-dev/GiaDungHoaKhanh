"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
} from "lucide-react";

interface DetailFeature {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const DETAIL_FEATURES: DetailFeature[] = [
  {
    title: "Núm & Quai Cầm Nguyên Khối",
    description:
      "Gia công bo tròn tinh xảo từ thanh Inox đặc, nhấc đậy đầm tay, không sắc cạnh, tiện dụng và an toàn tuyệt đối cho người lớn tuổi.",
    imageSrc: "/images/gallery-5.jpg",
    imageAlt: "Quai cầm và núm inox nguyên khối",
  },
  {
    title: "Tem Dập Nổi Hoa Khánh Chính Hãng",
    description:
      "Dấu ấn độc quyền xưởng sản xuất Hoa Khánh cùng mắt lưới vi sợi đan xen khít khao, ngăn chặn 100% ruồi muỗi và cả kiến gió.",
    imageSrc: "/images/gallery-4.jpg",
    imageAlt: "Tem dập nổi và mắt lưới vi sợi",
  },
  {
    title: "Nan Tròn Cứng Cáp & Móc Treo Tường",
    description:
      "Hệ nan cánh quạt chịu lực gia cường giữ phom vòm đứng vững vàng. Tích hợp móc treo tường thông minh giúp tiết kiệm tối đa không gian bếp.",
    imageSrc: "/images/gallery-3.jpg",
    imageAlt: "Khung nan xòe và móc treo tường",
  },
  {
    title: "Vòm Rộng Bao Trọn Mâm Cơm Gia Đình",
    description:
      "Độ cao vòm tiêu chuẩn 20cm thoải mái che phủ các bát tô canh sâu lòng, đĩa gà luộc, đĩa cá và mâm cỗ tròn từ 5-6 món thịnh soạn.",
    imageSrc: "/images/gallery-1.jpg",
    imageAlt: "Vòm rộng bao trọn mâm cơm",
  },
];

export default function ProductDemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }
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
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="demo-section"
      className="flex flex-col px-4 py-10 bg-surface-container-low/70 border-y border-outline-variant/20 gap-6 w-full"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            Trực quan thực tế
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
            Xem Chi Tiết Lồng Bàn Inox Hoa Khánh
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Khám phá thiết kế tinh xảo và từng góc cạnh qua hình ảnh & trải nghiệm kiểm thử thực tế tại xưởng.
          </p>
        </div>

        {/* Video / Demonstration Player Card */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container shadow-md border border-outline-variant/30 group">
          {/* Video / Poster Element */}
          <div className="relative w-full h-full">
            <Image
              src="/images/gallery-2.jpg"
              alt="Thử nghiệm độ chịu lực lồng bàn inox"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className={`object-cover transition-opacity duration-300 ${
                isPlaying ? "opacity-90" : "opacity-95"
              }`}
            />
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/90 via-on-background/40 to-transparent flex flex-col justify-between p-4 sm:p-6 text-surface-container-lowest">
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-primary/85 backdrop-blur-md text-xs font-bold text-on-primary flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                Video thực tế xưởng
              </span>
              <span className="text-xs font-semibold bg-on-background/60 backdrop-blur-md px-2.5 py-1 rounded-full text-surface-bright">
                0:45
              </span>
            </div>

            {/* Middle Play Button */}
            <div className="flex items-center justify-center my-auto">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Tạm dừng video" : "Xem video thực tế"}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/95 text-on-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all ring-4 ring-on-primary/30"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Info Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm sm:text-base text-surface-container-lowest truncate">
                    Thử nghiệm chịu lực & đậy kín mâm cơm
                  </span>
                  <span className="text-xs text-surface-container-low/90">
                    Khung nan inox 304 nguyên khối - Đè nén không biến dạng
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                    className="p-2 rounded-full bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 backdrop-blur-md text-surface-container-lowest transition-all"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-surface-container-lowest/30 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-secondary-container h-full transition-all duration-300"
                  style={{ width: isPlaying ? "65%" : "0%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Detailed Feature Zoom Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {DETAIL_FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 hover:shadow-sm transition-all"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/20">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-on-surface leading-tight">
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
