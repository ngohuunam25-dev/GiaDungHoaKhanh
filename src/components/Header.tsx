"use client";

import React from "react";
import { BadgeCheck, PhoneCall, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 shadow-sm border border-primary/10">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-base text-primary tracking-tight leading-tight truncate">
              XƯỞNG HOA KHÁNH
            </span>
            <span className="text-xs text-on-surface-variant flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 animate-pulse" />
              Inox 304 Chuẩn Xưởng
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:0988888888"
            className="h-9 px-3.5 rounded-full bg-surface-container-lowest text-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-outline-variant/30 hover:bg-surface-container-low transition-all active:scale-95"
            aria-label="Gọi tư vấn trực tiếp"
          >
            <PhoneCall className="w-3.5 h-3.5 text-secondary" />
            <span>Tư vấn</span>
          </a>

          <a
            href="#order-form"
            className="h-9 px-3.5 rounded-full bg-primary text-on-primary text-xs font-semibold flex items-center gap-1 shadow-sm hover:bg-primary-container transition-all active:scale-95"
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Đặt Mua</span>
          </a>
        </div>
      </div>
    </header>
  );
}
