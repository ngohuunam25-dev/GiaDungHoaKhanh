"use client";

import { PRICING_CONTENT, STICKY_CTA_CONTENT } from "@/content/siteContent";
import { trackClickCTA } from "@/lib/analytics/tiktok";
import { formatVND } from "@/lib/utils";
import { Package, Product } from "@/types/landingPage.type";
import { Truck } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface StickyMobileCTAProps {
  selectedPackage: Package<Product> | undefined;
  quantity: number;
}

export default function StickyMobileCTA({
  selectedPackage,
  quantity,
}: StickyMobileCTAProps) {
  const currentTotal = useMemo(() => {
    const price = selectedPackage?.price ?? 0;

    if (quantity >= 2 && selectedPackage?.id === "combo-1") {
      return (price - 25000) * quantity;
    }

    if (quantity >= 2 && selectedPackage?.id === "combo-2") {
      return (price - 30000) * quantity;
    }

    return price * quantity;
  }, [quantity, selectedPackage?.price, selectedPackage]);
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(41,45,46,0.12)]">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left info: Image & price */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30 p-0.5">
            <Image
              src={STICKY_CTA_CONTENT.thumbnailSrc}
              alt={STICKY_CTA_CONTENT.thumbnailAlt}
              fill
              sizes="44px"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-on-surface-variant leading-tight truncate">
              {selectedPackage?.name}
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
            <span className="text-[11px] text-secondary font-medium flex items-center gap-1 mt-0.5">
              <Truck className="w-3 h-3" />

              {quantity >= 2 && selectedPackage?.id === "combo-1"
                ? "Được giảm 25.000đ/sản phẩm"
                : quantity >= 2 && selectedPackage?.id === "combo-2"
                  ? "Được giảm 30.000đ/sản phẩm"
                  : PRICING_CONTENT.subtotalBox.freeShippingText}
            </span>
          </div>
        </div>

        {/* Right CTA Button */}
        <a
          href={STICKY_CTA_CONTENT.targetId}
          onClick={() =>
            trackClickCTA(
              STICKY_CTA_CONTENT.trackLabel,
              STICKY_CTA_CONTENT.targetId,
            )
          }
          className="h-11 sm:h-12 px-5 sm:px-8 rounded-lg bg-tiktok-gradient animate-pulse-glow hover:animate-none text-on-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 shadow-md active:scale-95 transition-all"
        >
          <span>{STICKY_CTA_CONTENT.buttonText}</span>
        </a>
      </div>
    </aside>
  );
}
