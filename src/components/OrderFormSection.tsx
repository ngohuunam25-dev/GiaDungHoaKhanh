"use client";

import { ORDER_FORM_CONTENT } from "@/content/siteContent";
import { formatVND } from "@/lib/utils";
import { type Package, type Product } from "@/types/landingPage.type";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MapPin,
  Minus,
  Package as PackgeIcon,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface OrderFormSectionProps {
  onSelectPackage: (pkg: Package<Product> | undefined) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  selectedPackage: Package<Product> | undefined;
  packages: Package<Product>[] | undefined;
}

export default function OrderFormSection({
  selectedPackage,
  onSelectPackage,
  quantity,
  packages,
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

  const totalPrice = selectedPackage?.price ?? 0 * quantity;
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate clicks

    setErrorMessage(null);

    // Client-side validations
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(ORDER_FORM_CONTENT.validation.fullNameRequired);
      return;
    }

    const cleanPhone = phone.replace(/[\s.-]/g, "");
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage(ORDER_FORM_CONTENT.validation.phoneInvalid);
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage(ORDER_FORM_CONTENT.validation.addressRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique event ID for TikTok deduplication
      // const eventId = generateEventId("lead");

      // const response = await fetch("/api/order", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     fullName: fullName.trim(),
      //     phone: cleanPhone,
      //     address: address.trim(),
      //     packageId: selectedPackage?.id,
      //     packageName: selectedPackage?.name,
      //     quantity,
      //     pricePerUnit: selectedPackage?.price,
      //     totalPrice,
      //     notes: notes.trim() || undefined,
      //     eventId,
      //   }),
      // });

      // const data = await response.json();

      // if (!response.ok || !data.success) {
      //   throw new Error(
      //     data.error || ORDER_FORM_CONTENT.validation.submitFailed,
      //   );
      // }

      // // Track TikTok Lead (no PII sent)
      // trackLeadSubmission(
      //   {
      //     packageId: selectedPackage?.id.toString() ?? "",
      //     packageName: selectedPackage?.name ?? "",
      //     totalAmount: totalPrice,
      //     quantity,
      //   },
      //   eventId,
      // );

      // send to google sheet
      const res = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: cleanPhone,
          address: address.trim(),
          packageId: selectedPackage?.id,
          packageName: selectedPackage?.name,
          quantity,
          pricePerUnit: selectedPackage?.price,
          totalPrice,
          note: notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      // Show success modal
      setSuccessOrder({
        orderCode: data.orderCode || `HK-${Date.now().toString().slice(-6)}`,
        fullName: fullName.trim(),
        packageName: selectedPackage?.name ?? "",
        quantity,
        totalPrice,
      });

      // Clear fields
      setFullName("");
      setPhone("");
      setAddress("");
      setNotes("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : ORDER_FORM_CONTENT.validation.unknownError;
      alert("Lỗi khi gửi đơn hàng: " + msg);
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="order-form"
      className="flex flex-col px-4 py-8 bg-surface-container-low/70 border-t border-outline-variant/20 scroll-mt-16 w-full"
    >
      <div className="max-w-xl mx-auto w-full flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-secondary">
            <ShoppingCart className="w-5 h-5 text-secondary" />
            <span className="text-xs font-extrabold uppercase tracking-widest">
              {ORDER_FORM_CONTENT.sectionBadge}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
            {ORDER_FORM_CONTENT.sectionTitle}
          </h2>
          <p className="text-xs sm:text-base text-on-surface-variant leading-relaxed">
            {ORDER_FORM_CONTENT.sectionSubtitle}
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
                className="text-xs sm:text-sm font-extrabold text-on-surface flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-primary" />
                <span>{ORDER_FORM_CONTENT.fields.fullName.label}</span>
                <span className="text-error">
                  {ORDER_FORM_CONTENT.fields.fullName.requiredIndicator}
                </span>
              </label>
              <input
                id="custName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={ORDER_FORM_CONTENT.fields.fullName.placeholder}
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:shadow-xs focus:ring-orange-500/50 focus:outline-none focus:ring-2  focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="custPhone"
                className="text-xs sm:text-sm font-extrabold text-on-surface flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{ORDER_FORM_CONTENT.fields.phone.label}</span>
                <span className="text-error">
                  {ORDER_FORM_CONTENT.fields.phone.requiredIndicator}
                </span>
              </label>
              <input
                id="custPhone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={ORDER_FORM_CONTENT.fields.phone.placeholder}
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:shadow-xs focus:ring-orange-500/50 focus:border-transparent transition-all"
              />
            </div>

            {/* Delivery Address */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="custAddress"
                className="text-xs sm:text-sm font-extrabold text-on-surface flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>{ORDER_FORM_CONTENT.fields.address.label}</span>
                <span className="text-error">
                  {ORDER_FORM_CONTENT.fields.address.requiredIndicator}
                </span>
              </label>
              <textarea
                id="custAddress"
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={ORDER_FORM_CONTENT.fields.address.placeholder}
                className="w-full p-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:shadow-xs focus:ring-orange-500/50 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Package Selector & Quantity Sync */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label
                  htmlFor="pkgSelect"
                  className="text-xs sm:text-sm font-extrabold text-on-surface flex items-center gap-1.5"
                >
                  <PackgeIcon className="w-4 h-4 text-primary" />
                  <span>{ORDER_FORM_CONTENT.fields.productPackage.label}</span>
                </label>
                <select
                  id="pkgSelect"
                  value={selectedPackage?.id}
                  onChange={(e) => {
                    // const pkg = PRODUCT_PACKAGES.find((p) => p.id === id);
                    const pkg = packages?.find((p) => p.id === e.target.value);
                    if (pkg) onSelectPackage(pkg);
                  }}
                  className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:shadow-xs focus:ring-orange-500/50 focus:border-transparent transition-all font-medium"
                >
                  {/* {PRODUCT_PACKAGES.map((pkg) => ( */}
                  {packages?.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs sm:text-sm font-extrabold text-on-surface">
                  {ORDER_FORM_CONTENT.fields.quantity.label}
                </span>
                <div className="flex items-center justify-between h-12 px-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40">
                  <button
                    type="button"
                    aria-label={ORDER_FORM_CONTENT.fields.quantity.decreaseAria}
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
                    aria-label={ORDER_FORM_CONTENT.fields.quantity.increaseAria}
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            {/* <div className="flex flex-col gap-1">
              <label
                htmlFor="custNote"
                className="text-xs sm:text-sm font-extrabold text-on-surface flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-on-surface-variant" />
                <span>{ORDER_FORM_CONTENT.fields.notes.label}</span>
              </label>
              <input
                id="custNote"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={ORDER_FORM_CONTENT.fields.notes.placeholder}
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:shadow-xs focus:ring-orange-500/50 focus:border-transparent transition-all"
              />
            </div> */}

            {/* Price Summary Breakdown inside Form */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>{ORDER_FORM_CONTENT.priceBreakdown.unitPriceLabel}</span>
                <span>{formatVND(selectedPackage?.price ?? 0)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>{ORDER_FORM_CONTENT.priceBreakdown.quantityLabel}</span>
                <span>x{quantity}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>{ORDER_FORM_CONTENT.priceBreakdown.shippingLabel}</span>
                <span className="text-secondary font-semibold">
                  {ORDER_FORM_CONTENT.priceBreakdown.freeShippingText}
                </span>
              </div>
              <div className="h-[1px] bg-outline-variant/30 my-1" />
              <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-primary">
                <span>{ORDER_FORM_CONTENT.priceBreakdown.totalLabel}</span>
                <span>
                  {formatVND(
                    totalPrice +
                      (selectedPackage?.id || quantity >= 2 ? 0 : 20000),
                  )}
                </span>
              </div>
            </div>

            {/* Policy Reminder */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-surface-container-low/70 text-on-surface-variant text-xs leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>{ORDER_FORM_CONTENT.policyReminder.label}</strong>{" "}
                {ORDER_FORM_CONTENT.policyReminder.text}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-13 sm:h-14 w-full rounded-xl bg-gradient-reverse text-on-primary font-extrabold text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all disabled:opacity-75 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{ORDER_FORM_CONTENT.submitButton.loadingText}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{ORDER_FORM_CONTENT.submitButton.defaultText}</span>
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
              aria-label={ORDER_FORM_CONTENT.successModal.closeAria}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-primary">
              {ORDER_FORM_CONTENT.successModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-on-surface-variant">
              {ORDER_FORM_CONTENT.successModal.thanksPrefix}{" "}
              <strong>{successOrder.fullName}</strong>.{" "}
              {ORDER_FORM_CONTENT.successModal.noticePrefix}{" "}
              <strong className="text-primary">
                {ORDER_FORM_CONTENT.successModal.timeSpan}
              </strong>
              .
            </p>

            <div className="p-3.5 rounded-xl bg-surface-container-low w-full text-left text-xs flex flex-col gap-1.5 text-on-surface border border-outline-variant/20">
              <div>
                <strong>
                  {ORDER_FORM_CONTENT.successModal.orderCodeLabel}
                </strong>{" "}
                <span className="font-mono text-primary font-extrabold">
                  {successOrder.orderCode}
                </span>
              </div>
              <div>
                <strong>{ORDER_FORM_CONTENT.successModal.productLabel}</strong>{" "}
                <span>
                  {successOrder.packageName} (x{successOrder.quantity})
                </span>
              </div>
              <div>
                <strong>{ORDER_FORM_CONTENT.successModal.paymentLabel}</strong>{" "}
                <span className="text-primary font-extrabold text-sm">
                  {formatVND(successOrder.totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSuccessOrder(null)}
              className="w-full h-11 rounded-full bg-primary text-on-primary font-extrabold text-sm mt-2 shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              {ORDER_FORM_CONTENT.successModal.closeButton}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
