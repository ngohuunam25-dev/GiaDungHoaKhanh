"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Package,
  X,
  Phone,
  User,
  MapPin,
  FileText,
  Minus,
  Plus,
} from "lucide-react";
import { PRODUCT_PACKAGES, ProductPackage } from "./PricingSection";
import { formatVND } from "@/lib/utils";
import { trackLeadSubmission, generateEventId } from "@/lib/analytics/tiktok";

interface OrderFormSectionProps {
  selectedPackage: ProductPackage;
  onSelectPackage: (pkg: ProductPackage) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export default function OrderFormSection({
  selectedPackage,
  onSelectPackage,
  quantity,
  onQuantityChange,
}: OrderFormSectionProps) {
  // Form input states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // UI & Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<{
    orderCode: string;
    fullName: string;
    packageName: string;
    quantity: number;
    totalPrice: number;
  } | null>(null);

  const totalPrice = selectedPackage.price * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate clicks

    setErrorMessage(null);

    // Client-side validations
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage("Vui lòng nhập họ tên người nhận hàng.");
      return;
    }

    const cleanPhone = phone.replace(/[\s.-]/g, "");
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage(
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng số di động 10 số (ví dụ: 0912 345 678)."
      );
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage(
        "Vui lòng nhập địa chỉ nhận hàng chi tiết (số nhà, đường, xã/phường, quận/huyện)."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique event ID for TikTok deduplication
      const eventId = generateEventId("lead");

      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          address: address.trim(),
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          quantity,
          pricePerUnit: selectedPackage.price,
          totalPrice,
          notes: notes.trim() || undefined,
          eventId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Gửi đơn hàng thất bại. Vui lòng thử lại.");
      }

      // Track TikTok Lead (no PII sent)
      trackLeadSubmission(
        {
          packageId: selectedPackage.id.toString(),
          packageName: selectedPackage.name,
          totalAmount: totalPrice,
          quantity,
        },
        eventId
      );

      // Show success modal
      setSuccessOrder({
        orderCode: data.orderCode || `HK-${Date.now().toString().slice(-6)}`,
        fullName: fullName.trim(),
        packageName: selectedPackage.name,
        quantity,
        totalPrice,
      });

      // Clear fields
      setFullName("");
      setPhone("");
      setAddress("");
      setNotes("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="order-form"
      className="flex flex-col px-4 py-10 bg-surface-container-low/70 border-t border-outline-variant/20 scroll-mt-16 w-full"
    >
      <div className="max-w-xl mx-auto w-full flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-secondary">
            <ShoppingCart className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Thủ tục đơn giản
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
            Đặt Mua Lồng Bàn Inox Hoa Khánh
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Điền thông tin bên dưới, nhân viên xưởng sẽ gọi điện xác nhận và gửi hàng ngay hôm nay.
          </p>
        </div>

        {/* Checkout Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/30 flex flex-col gap-5">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-error/10 border border-error/30 text-error flex items-start gap-2.5 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="custName"
                className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-primary" />
                <span>Họ và tên người nhận</span>
                <span className="text-error">*</span>
              </label>
              <input
                id="custName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Chị Lan / Anh Tuấn"
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="custPhone"
                className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Số điện thoại nhận hàng</span>
                <span className="text-error">*</span>
              </label>
              <input
                id="custPhone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09x xxx xxxx (shipper gọi trước khi giao)"
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Delivery Address */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="custAddress"
                className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>Địa chỉ giao hàng chi tiết</span>
                <span className="text-error">*</span>
              </label>
              <textarea
                id="custAddress"
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, tên ngõ/đường, thôn xóm, phường/xã, quận/huyện, tỉnh/thành phố..."
                className="w-full p-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Package Selector & Quantity Sync */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label
                  htmlFor="pkgSelect"
                  className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
                >
                  <Package className="w-4 h-4 text-primary" />
                  <span>Phiên bản sản phẩm</span>
                </label>
                <select
                  id="pkgSelect"
                  value={selectedPackage.id}
                  onChange={(e) => {
                    const id = parseInt(e.target.value, 10);
                    const pkg = PRODUCT_PACKAGES.find((p) => p.id === id);
                    if (pkg) onSelectPackage(pkg);
                  }}
                  className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                >
                  {PRODUCT_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — {formatVND(pkg.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs sm:text-sm font-bold text-on-surface">
                  Số lượng
                </span>
                <div className="flex items-center justify-between h-12 px-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40">
                  <button
                    type="button"
                    aria-label="Giảm"
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 disabled:opacity-40"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-extrabold text-sm sm:text-base text-primary">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Tăng"
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="custNote"
                className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-on-surface-variant" />
                <span>Ghi chú cho xưởng / shipper (tuỳ chọn)</span>
              </label>
              <input
                id="custNote"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước 15 phút..."
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Price Summary Breakdown inside Form */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Đơn giá:</span>
                <span>{formatVND(selectedPackage.price)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Số lượng:</span>
                <span>x{quantity}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Vận chuyển:</span>
                <span className="text-secondary font-semibold">
                  {selectedPackage.id === 3 || quantity >= 2
                    ? "Miễn phí (Freeship)"
                    : "20.000đ"}
                </span>
              </div>
              <div className="h-[1px] bg-outline-variant/30 my-1" />
              <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-primary">
                <span>Tổng tiền thanh toán (COD):</span>
                <span>
                  {formatVND(
                    totalPrice +
                      (selectedPackage.id === 3 || quantity >= 2 ? 0 : 20000)
                  )}
                </span>
              </div>
            </div>

            {/* Policy Reminder */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-surface-container-low/70 text-on-surface-variant text-xs leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Quyền lợi:</strong> Quý khách được mở hàng kiểm tra độ sáng bóng và khung nan trước khi thanh toán tiền cho nhân viên giao hàng.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-13 sm:h-14 w-full rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all disabled:opacity-75 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang xử lý đơn hàng...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>XÁC NHẬN ĐẶT HÀNG NGAY</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      {successOrder && (
        <div className="fixed inset-0 z-50 bg-on-background/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-6 shadow-2xl flex flex-col items-center text-center gap-3 animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/20 relative">
            <button
              onClick={() => setSuccessOrder(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-primary">
              Đặt Hàng Thành Công!
            </h3>

            <p className="text-xs sm:text-sm text-on-surface-variant">
              Cảm ơn <strong>{successOrder.fullName}</strong>. Xưởng Hoa Khánh đã tiếp nhận thông tin và sẽ liên hệ xác nhận trong vòng{" "}
              <strong className="text-primary">15 phút</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-surface-container-low w-full text-left text-xs flex flex-col gap-1.5 text-on-surface border border-outline-variant/20">
              <div>
                <strong>Mã đơn hàng:</strong>{" "}
                <span className="font-mono text-primary font-bold">
                  {successOrder.orderCode}
                </span>
              </div>
              <div>
                <strong>Sản phẩm:</strong>{" "}
                <span>
                  {successOrder.packageName} (x{successOrder.quantity})
                </span>
              </div>
              <div>
                <strong>Thanh toán khi nhận:</strong>{" "}
                <span className="text-primary font-extrabold text-sm">
                  {formatVND(successOrder.totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSuccessOrder(null)}
              className="w-full h-11 rounded-full bg-primary text-on-primary font-bold text-sm mt-2 shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              Đóng thông báo
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
