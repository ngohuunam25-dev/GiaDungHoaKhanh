"use client";

import React from "react";
import { Check, Minus, Plus, Truck } from "lucide-react";
import { formatVND } from "@/lib/utils";

export interface ProductPackage {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  highlightNote?: string;
  badge?: string;
  badgeType?: "bestseller" | "savings";
}

export const PRODUCT_PACKAGES: ProductPackage[] = [
  {
    id: 1,
    name: "Size Tiêu Chuẩn 55cm",
    price: 145000,
    description: "Phù hợp bàn ăn tròn gia đình từ 3 – 4 món ăn thông dụng hằng ngày.",
  },
  {
    id: 2,
    name: "Size Đại 65cm (Bán chạy nhất)",
    price: 185000,
    badge: "Phổ Biến Nhất",
    badgeType: "bestseller",
    description: "Phù hợp mâm cỗ tròn 6–7 món đầy đặn ngày lễ tết.",
    highlightNote: "Tặng kèm móc dán tường Inox siêu chịu lực.",
  },
  {
    id: 3,
    name: "Combo 2 Chiếc (1 Tiêu Chuẩn 55cm + 1 Đại 65cm)",
    price: 295000,
    originalPrice: 330000,
    badge: "Tiết Kiệm Nhất",
    badgeType: "savings",
    description: "Trang bị đồng bộ cho cả bữa cơm thường nhật và mâm cỗ tiếp khách.",
    highlightNote: "Miễn phí giao hàng toàn quốc (Freeship)!",
  },
];

interface PricingSectionProps {
  selectedPackageId: number;
  onSelectPackage: (pkg: ProductPackage) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export default function PricingSection({
  selectedPackageId,
  onSelectPackage,
  quantity,
  onQuantityChange,
}: PricingSectionProps) {
  const currentPkg =
    PRODUCT_PACKAGES.find((p) => p.id === selectedPackageId) ||
    PRODUCT_PACKAGES[0];

  const totalPrice = currentPkg.price * quantity;

  return (
    <section id="pricing-section" className="flex flex-col px-4 py-10 max-w-4xl mx-auto w-full gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-center items-center">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          Ưu đãi hôm nay
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
          Chọn Sản Phẩm Phù Hợp Với Gia Đình Bạn
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          Ưu đãi trợ giá xưởng trực tiếp. Miễn phí giao hàng khi đặt mua gói Combo 2 chiếc.
        </p>
      </div>

      {/* Package Options List */}
      <div className="flex flex-col gap-3">
        {PRODUCT_PACKAGES.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;

          return (
            <label
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className={`relative flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-xs cursor-pointer transition-all border ${
                isSelected
                  ? "border-primary ring-2 ring-primary shadow-sm bg-primary/[0.02]"
                  : "border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low/40"
              }`}
            >
              <input
                type="radio"
                name="product_pack"
                checked={isSelected}
                onChange={() => onSelectPackage(pkg)}
                className="sr-only"
              />

              {/* Badge */}
              {pkg.badge && (
                <div
                  className={`absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-xs ${
                    pkg.badgeType === "savings"
                      ? "bg-primary text-on-primary"
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
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-transparent"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-on-surface truncate">
                    {pkg.name}
                  </span>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span
                    className={`font-extrabold text-base sm:text-lg ${
                      pkg.id === 3 ? "text-secondary" : "text-primary"
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
                {pkg.highlightNote && (
                  <p className="font-semibold text-secondary mt-0.5">
                    {pkg.highlightNote}
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
            Số lượng đặt mua
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Giảm số lượng"
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
              aria-label="Tăng số lượng"
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-on-surface-variant">
            Tạm tính thanh toán
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-primary">
            {formatVND(totalPrice)}
          </span>
          <span className="text-[11px] text-secondary font-medium flex items-center gap-1 mt-0.5">
            <Truck className="w-3 h-3" />
            {currentPkg.id === 3 || quantity >= 2
              ? "Miễn phí vận chuyển"
              : "Đồng giá ship 20.000đ"}
          </span>
        </div>
      </div>
    </section>
  );
}
