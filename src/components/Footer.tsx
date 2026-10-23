"use client";

import { FOOTER_CONTENT } from "@/content/siteContent";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b132b] border-t border-outline-variant/20 px-4 py-8 pb-16 sm:pb-12 flex flex-col gap-8">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-2 gap-2">
        {/* Tên công ty / thương hiệu */}
        <h3 className="font-extrabold text-xs md:text-base tracking-wide uppercase text-white">
          {FOOTER_CONTENT.brandName}
        </h3>

        {/* Địa chỉ nhà xưởng */}
        <p className="text-slate-300 text-[10px] md:text-sm font-normal">
          {FOOTER_CONTENT.address}
        </p>

        {/* Hotline & Giờ làm việc */}
        <p className="text-slate-300 text-[10px] md:text-sm font-normal">
          {FOOTER_CONTENT.hotlineLabel}{" "}
          <span className="font-medium text-white">{FOOTER_CONTENT.hotline}</span>
        </p>

        {/* Đường gạch ngang phân cách */}
        <div className="w-full border-t border-slate-800 my-1"></div>

        {/* Bản quyền Copyright */}
        <p className="text-slate-500 text-[11px] md:text-xs">
          {FOOTER_CONTENT.copyright}
        </p>
      </div>
    </footer>
  );
}
