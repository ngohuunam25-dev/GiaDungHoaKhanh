import { appendOrderToSheet } from "@/lib/sheets";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs"; // googleapis cần Node runtime

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const OrderSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(8),
  address: z.string().min(1),
  packageId: z.string().min(1),
  packageName: z.string().min(1),
  quantity: z.number().min(1),
  pricePerUnit: z.number().min(1),
  totalPrice: z.number().min(1),
  note: z.string().optional(),
});

export async function POST(req: Request) {
  const parsed = OrderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Dữ liệu không hợp lệ",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const o = parsed.data;
  const orderId = "DH" + Date.now().toString().slice(-8);

  const results = await Promise.allSettled([
    appendOrderToSheet([
      orderId,
      new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      o.name,
      o.phone,
      o.address,
      o.packageName,
      o.quantity,
      o.pricePerUnit,
      o.note ?? "",
    ]),
    // resend.emails.send({
    //   from: "Shop <onboarding@resend.dev>", // đổi sang domain của bạn khi lên production
    //   to: process.env.NEXT_PUBLIC_ORDER_NOTIFY_EMAIL!,
    //   subject: `Đơn hàng mới ${orderId}`,
    //   html: `
    //     <h3>Đơn hàng ${orderId}</h3>
    //     <p><b>${o.name}</b> - ${o.phone}</p>
    //     <p>Địa chỉ: ${o.address}</p>
    //     <p>Sản phẩm: ${o.packageName}</p>
    //     <p>Số lượng: ${o.quantity}</p>
    //     <p>Giá: ${o.pricePerUnit.toLocaleString("vi-VN")}đ</p>
    //     <p>Tổng: ${o.totalPrice.toLocaleString("vi-VN")}đ</p>
    //     <p>Ghi chú: ${o.note ?? ""}</p>`,
    // }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected")
      console.error(i === 0 ? "Sheet lỗi:" : "Email lỗi:", r.reason);
  });

  // Chỉ coi là thất bại nếu cả hai đều lỗi (tránh mất đơn)
  if (results.every((r) => r.status === "rejected")) {
    return NextResponse.json(
      { ok: false, error: "Không lưu được đơn" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, orderId });
}
