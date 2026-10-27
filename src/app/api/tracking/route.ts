import { appendOrderToSheet } from "@/lib/sheets";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// BỎ DÒNG export const runtime = "nodejs";

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
  try {
    const body = await req.json();
    const parsed = OrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Dữ liệu không hợp lệ",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const o = parsed.data;
    const orderId = "DH" + Date.now().toString().slice(-8);

    // Khởi tạo Resend bên trong Handler để lấy biến môi trường chuẩn xác trên Worker runtime
    const resendApiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.ORDER_NOTIFY_EMAIL;

    if (!resendApiKey || !notifyEmail) {
      console.error("Thiếu cấu hình RESEND_API_KEY hoặc ORDER_NOTIFY_EMAIL");
    }

    const resend = new Resend(resendApiKey);

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
      resend.emails.send({
        from: "Shop <onboarding@resend.dev>", // Thay domain của bạn khi đăng ký Resend
        to: notifyEmail!,
        subject: `Đơn hàng mới ${orderId}`,
        html: `
          <h3>Đơn hàng ${orderId}</h3>
          <p><b>${o.name}</b> - ${o.phone}</p>
          <p>Địa chỉ: ${o.address}</p>
          <p>Sản phẩm: ${o.packageName}</p>
          <p>Số lượng: ${o.quantity}</p>
          <p>Giá: ${o.pricePerUnit.toLocaleString("vi-VN")}đ</p>
          <p>Tổng: ${o.totalPrice.toLocaleString("vi-VN")}đ</p>
          <p>Ghi chú: ${o.note ?? ""}</p>`,
      }),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(
          i === 0 ? "[Sheet Error]:" : "[Email Error]:",
          r.reason
        );
      }
    });

    // Chỉ thất bại khi cả 2 đều lỗi
    if (results.every((r) => r.status === "rejected")) {
      return NextResponse.json(
        { ok: false, error: "Không thể lưu đơn hàng và gửi email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (err: any) {
    console.error("[Tracking Route Uncaught Error]:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}