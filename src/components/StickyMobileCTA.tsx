"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Truck } from "lucide-react";
import { ProductPackage } from "./PricingSection";
import { formatVND } from "@/lib/utils";
import { trackClickCTA } from "@/lib/analytics/tiktok";

interface StickyMobileCTAProps {
  selectedPackage: ProductPackage;
  quantity: number;
}

export default function StickyMobileCTA({
  selectedPackage,
  quantity,
}: StickyMobileCTAProps) {
  const currentTotal = selectedPackage.price * quantity;

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(41,45,46,0.12)]">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left info: Image & price */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30 p-0.5">
            <Image
              src="/images/gallery-1.jpg"
              alt="Thumbnail lồng bàn inox"
              fill
              sizes="44px"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-on-surface-variant leading-tight truncate">
              {selectedPackage.name}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-extrabold text-primary leading-tight">
                {formatVND(currentTotal)}
              </span>
              {quantity > 1 && (
                <span className="text-[11px] text-on-surface-variant font-medium">
                  (x{quantity})
                </span>
              )}
            </div>
            <span className="text-[10px] text-secondary font-medium flex items-center gap-1 leading-none mt-0.5">
              <Truck className="w-2.5 h-2.5 shrink-0" />
              <span>Đồng kiểm khi nhận</span>
            </span>
          </div>
        </div>

        {/* Right CTA Button */}
        <a
          href="#order-form"
          onClick={() => trackClickCTA("Sticky Mobile - Đặt Mua Ngay", "#order-form")}
          className="h-11 sm:h-12 px-5 sm:px-8 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 shadow-md active:scale-95 transition-all"
        >
          <span>ĐẶT MUA NGAY</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
}
