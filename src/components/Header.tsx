"use client";

import { HEADER_CONTENT } from "@/content/siteContent";
import { Hero } from "@/types/landingPage.type";

export default function Header({ discountBadge }: Hero) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-tiktok-gradient backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-4xl mx-auto h-10 px-2 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-1 min-w-0">
          <div className="w-12 h-12 pt-3 animate-bounce [animation-duration:1.5s] flex items-center justify-center">
            ⚡
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-xs text-white tracking-tight leading-tight truncate capitalize">
              {discountBadge}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1.5 animate-pulse bg-amber-400 text-red-800 font-black text-xs flex items-center gap-1 rounded-md">
            {HEADER_CONTENT.consultationButton}
          </span>
        </div>
      </div>
    </header>
  );
}
