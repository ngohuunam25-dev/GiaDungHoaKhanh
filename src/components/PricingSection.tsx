"use client";

import {
  PRICING_CONTENT,
  PRODUCT_PACKAGES,
  ProductPackage,
} from "@/content/siteContent";
import { formatVND } from "@/lib/utils";
import { Package, Product } from "@/types/landingPage.type";
import { Check, Minus, Plus, Truck } from "lucide-react";
import { useMemo } from "react";

export { PRODUCT_PACKAGES };
export type { ProductPackage };

interface PricingSectionProps {
  selectedPackageId: string | undefined;
  onSelectPackage: (pkg: Package<Product> | undefined) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  packages: Package<Product>[] | undefined;
}

export default function PricingSection({
  selectedPackageId,
  onSelectPackage,
  quantity,
  onQuantityChange,
  packages,
}: PricingSectionProps) {
  const currentPkg = packages?.find((p) => p.id === selectedPackageId);

  const totalPrice = useMemo(() => {
    const price = currentPkg?.price ?? 0;

    if (quantity >= 2 && selectedPackageId === "combo-1") {
      return (price - 25000) * quantity;
    }

    if (quantity >= 2 && selectedPackageId === "combo-2") {
      return (price - 30000) * quantity;
    }

    return price * quantity;
  }, [quantity, currentPkg?.price, selectedPackageId]);

  return (
    <section
      id="pricing-section"
      className="flex flex-col px-4 py-8 max-w-4xl mx-auto w-full gap-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-center items-center">
        <span className="text-xs font-extrabold text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          {PRICING_CONTENT.sectionBadge}
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
          {PRICING_CONTENT.sectionTitle}
        </h2>
        {/* <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          {PRICING_CONTENT.sectionSubtitle}
        </p> */}
      </div>

      {/* Package Options List */}
      <div className="flex flex-col gap-3">
        {packages?.map((pkg) => {
          const isSelected = pkg?.id === selectedPackageId;
          return (
            <label
              key={pkg.id}
              onClick={() => {
                onSelectPackage(pkg);
                onQuantityChange(1);
              }}
              className={`relative flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-xs cursor-pointer transition-all border-2 ${
                isSelected
                  ? "border-2 border-[#f95d12] shadow-sm bg-[#fffaf5] shadow-[#f95d12]"
                  : "border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low/40"
              }`}
            >
              <input
                type="radio"
                name="product_pack"
                checked={isSelected}
                onChange={() => {
                  onSelectPackage(pkg);
                  onQuantityChange(1);
                }}
                className="sr-only"
              />

              {/* Badge */}
              {pkg.badge && (
                <div
                  className={`absolute -top-2 right-4 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-extrabold tracking-wider shadow-xs ${
                    pkg.isRecommended
                      ? "bg-tiktok-gradient text-on-primary"
                      : "bg-secondary text-on-secondary"
                  }`}
                >
                  {pkg.badge}
                </div>
              )}

              {/* Card Title & Price */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#f95d12] text-on-primary"
                        : "bg-surface-container-high text-transparent"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 font-extrabold" />
                  </div>
                  <span className="font-extrabold text-sm sm:text-base text-on-surface truncate">
                    {pkg.name}
                  </span>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span
                    className={`font-extrabold text-base sm:text-lg ${
                      pkg.isRecommended ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {formatVND(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-xs text-outline line-through">
                      {formatVND(pkg.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description & Highlight */}
              <div className="pl-8 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                <p>{pkg.description}</p>
                {pkg.isRecommended && (
                  <p className="font-semibold text-secondary mt-0.5">
                    {pkg.badge}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {/* Quantity & Calculation Card */}
      <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-on-surface-variant">
            {PRICING_CONTENT.quantityBox.label}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={PRICING_CONTENT.quantityBox.decreaseAria}
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-transform disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-base sm:text-lg w-8 text-center text-primary">
              {quantity}
            </span>
            <button
              type="button"
              aria-label={PRICING_CONTENT.quantityBox.increaseAria}
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-on-surface-variant">
            {PRICING_CONTENT.subtotalBox.label}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-primary">
            {formatVND(totalPrice)}
          </span>
          <span className="text-[11px] text-secondary font-medium flex items-center gap-1 mt-0.5">
            <Truck className="w-3 h-3" />

            {quantity >= 2 && currentPkg?.id === "combo-1"
              ? "Được giảm 25.000đ/sản phẩm"
              : quantity >= 2 && currentPkg?.id === "combo-2"
                ? "Được giảm 30.000đ/sản phẩm"
                : PRICING_CONTENT.subtotalBox.freeShippingText}
          </span>
        </div>
      </div>
    </section>
  );
}
