/**
 * TikTok Pixel & Analytics Integration Module
 *
 * Requirements:
 * - Separation of concerns: Analytics logic is decoupled from UI.
 * - Privacy-preserving: Never send PII (phone, address, full names) to client analytics.
 * - Deduplication support: Utilizes unique `eventId` for client & server pairing.
 * - Non-intrusive fallback: Safely degrades to console logger in dev/mock when PIXEL_ID is not configured.
 */

export interface TikTokEventParams {
  content_type?: string;
  content_id?: string;
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  description?: string;
  quantity?: number;
  status?: string;
  event_id?: string;
}

declare global {
  interface Window {
    ttq?: {
      track: (eventName: string, params?: Record<string, unknown>, options?: { event_id?: string }) => void;
      page: () => void;
      load: (pixelId: string) => void;
    };
  }
}

/**
 * Generate a unique event ID for TikTok Browser + Server Event Deduplication
 */
export function generateEventId(prefix = "evt"): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Track generic TikTok event
 */
export function trackTikTokEvent(eventName: string, params: TikTokEventParams = {}, eventId?: string) {
  const finalEventId = eventId || params.event_id || generateEventId(eventName.toLowerCase());

  if (typeof window !== "undefined") {
    if (window.ttq && typeof window.ttq.track === "function") {
      window.ttq.track(eventName, { ...params }, { event_id: finalEventId });
    } else if (process.env.NODE_ENV !== "production") {
      // In development or when Pixel is not loaded, log cleanly for QA verification
      console.log(`[TikTok Pixel Mock Track] ${eventName}:`, {
        ...params,
        event_id: finalEventId,
      });
    }
  }

  return finalEventId;
}

/**
 * Standard Events
 */

export function trackPageView() {
  if (typeof window !== "undefined") {
    if (window.ttq && typeof window.ttq.page === "function") {
      window.ttq.page();
    } else if (process.env.NODE_ENV !== "production") {
      console.log("[TikTok Pixel Mock] PageView");
    }
  }
}

export function trackViewContent(item: { id: string; name: string; price: number; category?: string }) {
  return trackTikTokEvent("ViewContent", {
    content_type: "product",
    content_id: item.id,
    content_name: item.name,
    content_category: item.category || "Gia Dụng Bếp",
    value: item.price,
    currency: "VND",
  });
}

export function trackClickCTA(ctaName: string, destinationId: string) {
  return trackTikTokEvent("ClickButton", {
    content_type: "cta_button",
    content_name: ctaName,
    description: `User clicked ${ctaName} navigating to ${destinationId}`,
  });
}

/**
 * Lead event triggered when the visitor submits the order form.
 * IMPORTANT: No personal PII (name, phone, address) is sent in accordance with privacy rules.
 */
export function trackLeadSubmission(orderData: { packageId: string; packageName: string; totalAmount: number; quantity: number }, eventId?: string) {
  return trackTikTokEvent(
    "Lead",
    {
      content_type: "product",
      content_id: orderData.packageId,
      content_name: orderData.packageName,
      value: orderData.totalAmount,
      currency: "VND",
      quantity: orderData.quantity,
      status: "lead_received",
    },
    eventId
  );
}

/**
 * Purchase event: Only triggered upon actual payment / order completion confirmation
 */
export function trackPurchase(orderData: { orderId: string; packageId: string; packageName: string; totalAmount: number; quantity: number }, eventId?: string) {
  return trackTikTokEvent(
    "CompletePayment",
    {
      content_type: "product",
      content_id: orderData.packageId,
      content_name: orderData.packageName,
      value: orderData.totalAmount,
      currency: "VND",
      quantity: orderData.quantity,
      status: "success",
    },
    eventId
  );
}
