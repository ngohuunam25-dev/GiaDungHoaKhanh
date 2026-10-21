"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  Award,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low/90 border-t border-outline-variant/20 px-4 py-12 pb-28 sm:pb-16 flex flex-col gap-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Brand identity */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg text-on-surface">
              Xưởng Gia Công Lồng Bàn Inox Hoa Khánh
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-xl">
              Cam kết 100% Inox SUS 304 sáng bóng, không hoen gỉ, mắt lưới vi sợi siêu khít chống côn trùng bảo vệ trọn vẹn sức khỏe mâm cơm gia đình Việt.
            </p>
          </div>
        </div>

        {/* Policy & Golden Commitments */}
        <div className="flex flex-col gap-3 bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-xs border border-outline-variant/20">
          <div className="flex items-center gap-2 text-secondary">
            <Award className="w-5 h-5 text-secondary" />
            <span className="font-bold text-sm sm:text-base text-on-surface">
              Chính Sách & Cam Kết Vàng Từ Xưởng
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm text-on-surface-variant pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>Kiểm tra hàng trước khi thanh toán</span>
            </li>
            <li className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary shrink-0" />
              <span>Đổi mới 1-1 trong 7 ngày nếu lỗi xưởng</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Bảo hành han gỉ 5 năm chính hãng</span>
            </li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-on-surface-variant pt-2 border-t border-outline-variant/20">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-outline shrink-0" />
            <span>Làng nghề kim khí truyền thống, Hà Nội, Việt Nam</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-outline shrink-0" />
            <span>
              Hotline tư vấn xưởng:{" "}
              <strong className="text-primary font-bold">0988.xxx.xxx</strong>
            </span>
          </p>
        </div>

        {/* Footer links & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant pt-2">
          <div className="flex items-center gap-3">
            <a href="#order-form" className="hover:text-primary transition-colors">
              Chính sách đổi trả
            </a>
            <span className="text-outline-variant">•</span>
            <a href="#demo-section" className="hover:text-primary transition-colors">
              Kiểm định chất lượng
            </a>
            <span className="text-outline-variant">•</span>
            <a href="#order-form" className="hover:text-primary transition-colors">
              Giao nhận tận nơi
            </a>
          </div>

          <p className="text-outline text-center sm:text-right">
            © 2024 Lồng Bàn Inox Hoa Khánh. Bản quyền thuộc xưởng sản xuất.
          </p>
        </div>
      </div>
    </footer>
  );
}
