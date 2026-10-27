# Tổng quan dự án GiaDungHoaKhanh

> Tài liệu này tóm tắt trạng thái dự án theo mã nguồn hiện tại, phục vụ việc chuyển ngữ cảnh cho AI hoặc thành viên phát triển khác. Nội dung tiếp thị được mô tả như nội dung đang khai báo trong mã, không phải xác minh độc lập về sản phẩm.

## 1. Mục đích

Website là landing page bán hàng tiếng Việt cho **Lồng Bàn Inox Hoa Khánh**, hướng tới trải nghiệm mobile-first và khách hàng đến từ TikTok/mạng xã hội. Trang trình bày sản phẩm, lợi ích, bằng chứng xã hội, gói giá, biểu mẫu đặt hàng và CTA cố định trên điện thoại.

## 2. Công nghệ và triển khai

- Next.js `16.4.2`, React `19.3.0`, TypeScript strict mode.
- Next.js App Router, mã ứng dụng nằm trong `src/app`.
- Tailwind CSS `4`; icon từ `lucide-react`.
- `next-sanity` và `@sanity/image-url` được cấu hình để truy vấn Sanity.
- `@opennextjs/cloudflare` và Wrangler dùng để build/preview/deploy lên Cloudflare Workers.
- Video sản phẩm được ghép URL từ domain CDN Cloudflare R2.
- Font giao diện: Be Vietnam Pro; ngôn ngữ tài liệu HTML: `vi`.

## 3. Cấu trúc chính

```text
src/
  app/
    layout.tsx             # Metadata, font, analytics provider, layout gốc
    page.tsx               # Trang chủ; hiện fetch Sanity rồi render landing page
    globals.css            # Tailwind theme và style toàn cục
    api/order/route.ts     # POST API nhận và kiểm tra dữ liệu đặt hàng
  components/
    LandingPage.tsx        # Ghép section và giữ state gói hàng/số lượng
    Header.tsx
    HeroSection.tsx
    ProductDemoSection.tsx
    ProblemSolutionSection.tsx
    SocialProofSection.tsx
    PricingSection.tsx
    OrderFormSection.tsx
    StickyMobileCTA.tsx
    Footer.tsx
    AnalyticsProvider.tsx  # Tải TikTok Pixel nếu có cấu hình
  content/
    siteContent.ts         # Nội dung, SEO, giá, thông điệp, nhãn form tập trung
    videos.ts              # Danh sách video R2
  constants/content.ts     # Re-export nội dung tương thích
  lib/
    sanity.ts              # Sanity client và image URL builder
    utils.ts               # Hàm tiện ích (ví dụ format tiền)
    analytics/tiktok.ts    # TikTok event helpers
  hooks/useElementOnScreen.ts
public/                    # Tài nguyên tĩnh
DESIGN.md                  # Hướng dẫn hệ thống thiết kế
wrangler.jsonc             # Cấu hình Cloudflare Worker/assets
open-next.config.ts        # Cấu hình OpenNext Cloudflare
```

## 4. Luồng giao diện và dữ liệu

`src/app/page.tsx` gọi Sanity với GROQ `*[_type == "post"]`, nhưng dữ liệu kết quả hiện chỉ được log; trang luôn render `<LandingPage />`. Nội dung thực tế của các section và giá được khai báo tĩnh trong `src/content/siteContent.ts`. Video được liệt kê trong `src/content/videos.ts` và URL tạo từ `NEXT_PUBLIC_R2_CDN_DOMAIN`.

Trong `LandingPage`, state lựa chọn gói và số lượng được chia sẻ cho bảng giá, form đặt hàng và sticky CTA. Form gửi `POST /api/order`, nhận mã đơn và hiển thị trạng thái thành công. API hiện kiểm tra tên, số điện thoại Việt Nam, địa chỉ và số lượng, rồi log dữ liệu đơn ở server và trả về mã đơn giả lập. **Chưa có database, CRM, Google Sheets, webhook hay quy trình thanh toán được kết nối; đơn hàng chưa được lưu bền vững.**

Analytics có TikTok Pixel tùy chọn qua `NEXT_PUBLIC_TIKTOK_PIXEL_ID`. Mã theo dõi hỗ trợ PageView, ViewContent và Lead; dữ liệu PII (tên, điện thoại, địa chỉ) không được gửi vào TikTok event theo chú thích và cách gọi hiện tại.

## 5. Cấu hình môi trường

Các biến được tham chiếu trong mã:

| Biến | Công dụng |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonical/metadata; mặc định lấy từ `SITE_META.defaultUrl` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Ngày phiên bản API Sanity; có giá trị mặc định trong mã |
| `NEXT_PUBLIC_R2_CDN_DOMAIN` | Domain public R2 cho video |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Pixel ID; bỏ trống thì không tải script Pixel |

`.env*` được gitignore. `.env.example` hiện chỉ ghi biến R2 CDN; hãy kiểm tra `.env.local` cục bộ để biết thiết lập thực tế và **không chia sẻ giá trị bí mật**. Tài liệu này cố ý không đọc/chép nội dung `.env.local`.

## 6. Lệnh thường dùng

```bash
yarn dev       # Chạy môi trường phát triển
yarn build     # Build Next.js với webpack
yarn start     # Chạy bản build Next.js
yarn preview   # Build OpenNext và chạy preview Cloudflare
yarn deploy    # Build OpenNext và deploy Cloudflare
yarn lint      # Chạy ESLint
```

Repo có `yarn.lock` và `.yarnrc.yml`, nên ưu tiên Yarn để cài dependency. Nếu chạy lệnh tương đương bằng npm, cần cân nhắc lockfile của dự án.

## 7. Nội dung sản phẩm hiện khai báo

- Gói `Size Tiêu Chuẩn 51cm`: 250.000đ.
- Gói `Size Đại 60cm`: 280.000đ.
- Nhiều thông điệp bán hàng, chính sách, số điện thoại và tuyên bố về chất liệu/bảo hành được đặt trong `src/content/siteContent.ts`.

Giá, hotline, địa chỉ, bảo hành, khuyến mãi và các tuyên bố chất lượng là nội dung có thể thay đổi; kiểm tra với chủ dự án trước khi dùng làm thông tin đã xác thực hoặc trước khi sửa nội dung công khai.

## 8. Lưu ý quan trọng cho AI tiếp nhận

1. Đọc `AGENTS.md` trước khi sửa mã. Repo ghi rõ phiên bản Next.js này có thay đổi API/quy ước: trước khi viết code Next.js, hãy đọc hướng dẫn liên quan trong `node_modules/next/dist/docs/` và tuân thủ ghi chú deprecation.
2. Đọc `DESIGN.md` và các component liên quan trước khi chỉnh giao diện; thiết kế ưu tiên mobile và funnel chuyển đổi.
3. Nội dung tĩnh tập trung ở `src/content/siteContent.ts`; không nhầm việc Sanity client được khởi tạo với việc toàn bộ giao diện đã lấy dữ liệu từ CMS.
4. Đặt hàng hiện chỉ là mô phỏng ở tầng API. Muốn nhận đơn thật cần tích hợp nơi lưu trữ/webhook và xác định cơ chế bảo vệ, retry, chống gửi trùng phù hợp.
5. Không đưa thông tin cá nhân hoặc giá trị bí mật từ môi trường vào analytics hay tài liệu chia sẻ.
6. Tài liệu này là bản mô tả hiện trạng đọc từ mã nguồn, chưa phải đặc tả sản phẩm hay xác nhận cấu hình production.

## 9. Câu lệnh gợi ý khi chuyển cho AI khác

> Hãy đọc `PROJECT_OVERVIEW.md`, `AGENTS.md` và các file liên quan trước khi đề xuất hoặc sửa mã. Đây là dự án Next.js 16.4.2 với các thay đổi riêng của phiên bản: đọc hướng dẫn tương ứng trong `node_modules/next/dist/docs/` trước khi viết code Next.js. Giữ nội dung hiển thị bằng tiếng Việt, ưu tiên mobile-first, và lưu ý API đặt hàng hiện chưa lưu đơn thật. Trước khi thay đổi, hãy nêu ngắn gọn file dự định sửa và lý do; sau đó tóm tắt thay đổi và cách kiểm tra.
