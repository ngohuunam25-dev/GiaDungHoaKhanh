"use client";

import React from "react";
import { Star, BadgeCheck, ShieldCheck } from "lucide-react";

interface ReviewItem {
  id: number;
  initials: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatarBg: string;
  avatarText: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    initials: "ML",
    name: "Chị Mai Lan",
    location: "Ba Đình, Hà Nội",
    rating: 5,
    comment:
      "Lồng bàn dày dặn, mắt lưới khít lắm không con kiến con ruồi nào lọt được. Nhìn sáng sủa sạch sẽ cả bàn ăn. Mua thêm chiếc tặng bà ngoại ưng ý vô cùng!",
    avatarBg: "bg-primary-fixed",
    avatarText: "text-primary",
  },
  {
    id: 2,
    initials: "AT",
    name: "Bác Tuấn",
    location: "Quận 7, TP.HCM",
    rating: 5,
    comment:
      "Đóng gói cẩn thận bằng khung hộp carton không bị móp méo chút nào. Quai cầm chắc tay, có vòng treo lên tường bếp rất gọn gàng, rửa xịt nước cái là sạch.",
    avatarBg: "bg-secondary-fixed",
    avatarText: "text-secondary",
  },
  {
    id: 3,
    initials: "BH",
    name: "Cô Bích Hạnh",
    location: "Hải Châu, Đà Nẵng",
    rating: 5,
    comment:
      "Đúng hàng Inox Hoa Khánh có tem dập nổi, giao hàng nhanh 2 ngày là nhận được. Cho mở thùng kiểm tra hàng trước khi trả tiền rất uy tín.",
    avatarBg: "bg-primary-fixed",
    avatarText: "text-primary",
  },
];

export default function SocialProofSection() {
  return (
    <section className="flex flex-col px-4 py-10 bg-surface-container-low/70 border-y border-outline-variant/20 gap-6 w-full">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 text-center items-center">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            Đánh giá chân thực
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
            Khách Hàng Nói Gì Về Sản Phẩm?
          </h2>

          {/* Rating Summary */}
          <div className="inline-flex items-center gap-1 text-secondary bg-surface-container-lowest px-3.5 py-1.5 rounded-full shadow-xs border border-outline-variant/20">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface ml-1">
              4.9/5 (1.280+ đánh giá từ khách mua)
            </span>
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 gap-3 justify-between"
            >
              <div className="flex flex-col gap-2.5">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full ${rev.avatarBg} ${rev.avatarText} font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {rev.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-on-surface leading-tight">
                        {rev.name}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-primary flex items-center gap-1 bg-primary-fixed/50 px-2 py-0.5 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Đã mua hàng</span>
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Seller Commitment Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-primary/20 shadow-xs flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-on-surface">
              Cam Kết Vàng Từ Xưởng Sản Xuất Hoa Khánh
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              100% chuẩn Inox SUS 304 không gỉ. Quý khách được{" "}
              <strong className="text-primary font-semibold">đồng kiểm mở hộp thử hàng trực tiếp</strong> khi shipper giao tới. Miễn phí đổi mới 1-1 tại nhà nếu phát hiện bất kỳ vết móp méo hay lỗi hàn gia công.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
