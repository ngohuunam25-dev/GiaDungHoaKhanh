"use client";

import React from "react";
import { XCircle, CheckCircle, X, Check } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    <section className="flex flex-col px-4 py-10 max-w-4xl mx-auto w-full gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-center items-center">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          So sánh thực tế
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
          Giải Pháp Che Đậy Món Ăn Cho Bữa Cơm Hằng Ngày
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          Thoát khỏi nỗi lo thức ăn bám mùi, nhanh thiu hay côn trùng xâm nhập chỉ với một lần nâng cấp cho căn bếp gia đình.
        </p>
      </div>

      {/* Side-by-side or stacked Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem Card */}
        <div className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-low/90 border border-error/20 shadow-xs gap-4">
          <div className="flex items-center gap-2.5 text-error">
            <XCircle className="w-6 h-6 shrink-0" />
            <span className="font-bold text-base sm:text-lg">
              Nỗi lo với lồng bàn thông thường
            </span>
          </div>

          <ul className="flex flex-col gap-3 text-sm text-on-surface-variant">
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5" />
              </div>
              <p>
                <strong className="text-on-surface font-semibold">Lồng nhựa giòn gãy:</strong> Dễ nứt gãy sau vài tháng tiếp xúc hơi nóng thức ăn; nhựa ố vàng, bám mỡ khó chùi rửa.
              </p>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5" />
              </div>
              <p>
                <strong className="text-on-surface font-semibold">Lồng vải hấp hơi:</strong> Đọng sương rơi ngược vào bát canh làm thức ăn nhanh thiu chua, vải bám mùi mắm dầu khó giặt sạch.
              </p>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5" />
              </div>
              <p>
                <strong className="text-on-surface font-semibold">Mắt lưới quá thưa:</strong> Ruồi giấm nhỏ và kiến vẫn chui lọt qua kẽ nan, gây mất vệ sinh an toàn thực phẩm.
              </p>
            </li>
          </ul>
        </div>

        {/* Solution Card */}
        <div className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border-2 border-primary/30 shadow-md gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed/20 rounded-bl-full pointer-events-none" />

          <div className="flex items-center gap-2.5 text-primary">
            <CheckCircle className="w-6 h-6 shrink-0 text-primary" />
            <span className="font-bold text-base sm:text-lg">
              Lồng bàn Inox Hoa Khánh giải quyết trọn vẹn
            </span>
          </div>

          <ul className="flex flex-col gap-3 text-sm text-on-surface">
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <p>
                <strong className="text-primary font-bold">Mắt lưới siêu khít & thoáng khí:</strong> Lưu thông không khí tự nhiên không đọng nước, giữ nguyên độ giòn ngon mà côn trùng không thể lọt.
              </p>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <p>
                <strong className="text-primary font-bold">Vệ sinh thần tốc:</strong> Xịt nước rửa chén sạch bong dầu mỡ trong 15 giây, phơi ráo nhanh, hoàn toàn không ám mùi gia vị.
              </p>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <p>
                <strong className="text-primary font-bold">Độ bền vĩnh cửu:</strong> Inox SUS 304 chuẩn không gỉ sét, đè nén chịu lực tốt, dùng 5–10 năm vẫn sáng bóng nguyên bản.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
