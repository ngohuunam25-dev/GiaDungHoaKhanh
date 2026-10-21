import { NextResponse } from "next/server";

export interface OrderPayload {
  fullName: string;
  phone: string;
  address: string;
  packageId: number;
  packageName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  notes?: string;
  eventId?: string;
}

export async function POST(request: Request) {
  try {
    const body: OrderPayload = await request.json();

    // 1. Server-side validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập họ tên người nhận hợp lệ." },
        { status: 400 }
      );
    }

    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    const cleanPhone = body.phone ? body.phone.replace(/[\s.-]/g, "") : "";
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Số điện thoại không đúng định dạng di động Việt Nam (10 chữ số).",
        },
        { status: 400 }
      );
    }

    if (!body.address || body.address.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp địa chỉ nhận hàng chi tiết." },
        { status: 400 }
      );
    }

    if (!body.quantity || body.quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Số lượng đặt hàng không hợp lệ." },
        { status: 400 }
      );
    }

    // 2. Integration Boundary:
    // Generate a unique order reference code for demonstration & tracking.
    const orderCode = `HK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    /**
     * =========================================================================
     * INTEGRATION BOUNDARY NOTICE:
     * No persistent production database or CRM (Google Sheet / Telegram Bot / ERP)
     * is currently connected to this environment.
     *
     * To connect your production database or CRM:
     * 1. Add your database driver (e.g. Prisma, Drizzle, MongoDB, Supabase)
     * 2. Or forward this payload to your webhook (Google Apps Script / N8N / Make / Telegram Bot):
     *    await fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", body: JSON.stringify(body) });
     * =========================================================================
     */

    console.log("[Order Received at Integration Boundary]", {
      orderCode,
      customer: {
        fullName: body.fullName.trim(),
        phone: cleanPhone,
        address: body.address.trim(),
      },
      item: {
        packageId: body.packageId,
        packageName: body.packageName,
        quantity: body.quantity,
        pricePerUnit: body.pricePerUnit,
        totalPrice: body.totalPrice,
      },
      notes: body.notes?.trim() || null,
      eventId: body.eventId,
      receivedAt: new Date().toISOString(),
      isPersistedToDatabase: false,
    });

    // 3. Return successful response with clear integration notice
    return NextResponse.json({
      success: true,
      orderCode,
      message: "Đơn hàng đã được ghi nhận thành công tại cổng tiếp nhận xưởng Hoa Khánh.",
      isSimulated: true,
      integrationNote: "Dữ liệu đơn hàng đã chuyển qua boundary API; sẵn sàng kết nối webhook CRM/Google Sheets.",
      orderSummary: {
        orderCode,
        fullName: body.fullName.trim(),
        packageName: body.packageName,
        quantity: body.quantity,
        totalPrice: body.totalPrice,
      },
    });
  } catch (error: unknown) {
    console.error("[Order API Error]", error);
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra trong quá trình xử lý đơn hàng. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
