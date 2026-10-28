/**
 * SITE CONTENT REPOSITORY
 * ============================================================================
 * Tệp quản lý toàn bộ các văn bản, thông điệp, nhãn nút, chính sách và nội dung
 * hiển thị trên website Lồng Bàn Inox Hoa Khánh.
 *
 * Mọi thay đổi về câu chữ, tiêu đề, số điện thoại, giá cả, đánh giá...
 * chỉ cần cập nhật tại tệp duy nhất này thay vì chỉnh sửa rải rác trong component.
 * ============================================================================
 */

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  label: string;
}

export interface DetailFeature {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ComparisonItem {
  bold: string;
  text: string;
}

export interface ReviewItem {
  id: number;
  initials: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatarBg: string;
  avatarText: string;
}

export interface ProductPackage {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  highlightNote?: string;
  badge?: string;
  badgeType?: "bestseller" | "savings";
}

export interface FooterLink {
  label: string;
  href: string;
}

// ----------------------------------------------------------------------------
// 1. THÔNG TIN SEO & METADATA TOÀN TRANG
// ----------------------------------------------------------------------------
export const SITE_META = {
  title:
    "Lồng Bàn Inox Hoa Khánh - Che Đậy Thức Ăn Tiện Lợi & Bảo Vệ Bữa Cơm Gia Đình",
  description:
    "Lồng bàn Inox 304 chuẩn xưởng Hoa Khánh. Thiết kế mắt lưới vi sợi khít chặn 100% ruồi muỗi côn trùng, thoáng khí không đọng sương, sáng bóng trọn đời, đồng kiểm tận nơi.",
  keywords: [
    "lồng bàn inox",
    "lồng bàn inox 304",
    "lồng bàn hoa khánh",
    "đậy thức ăn inox",
    "chống ruồi muỗi",
    "lồng bàn đậy mâm cơm",
  ],
  authorName: "Xưởng Inox Hoa Khánh",
  openGraph: {
    title: "Lồng Bàn Inox 304 Hoa Khánh - Giữ Trọn Vị Ngon Bữa Cơm",
    description:
      "Chất liệu Inox SUS 304 không gỉ, đậy kín sạch sẽ, vệ sinh nhanh chóng trong 15 giây. Giao hàng toàn quốc, kiểm tra trước khi trả tiền.",
    image: "images/gallery-1.jpg",
    type: "website",
    locale: "vi_VN",
  },
  defaultUrl: "https://giadunghoakhanh.vn",
};

// ----------------------------------------------------------------------------
// 2. HEADER & THANH ĐIỀU HƯỚNG TRÊN CÙNG
// ----------------------------------------------------------------------------
export const HEADER_CONTENT = {
  brandName: "TIKTOK EXCLUSIVE DEAL: Giảm Đến 35% Hôm Nay + Freeship Toàn Quốc",
  badgeSubtitle: "Inox 304 Chuẩn Xưởng",
  hotlineTel: "tel:0988888888",
  hotlineDisplay: "0988.888.888",
  consultationButton: "HOT",
  consultationAriaLabel: "Gọi tư vấn trực tiếp",
  orderButton: "Đặt Mua",
  orderTargetId: "#order-form",
};

// ----------------------------------------------------------------------------
// 3. HERO SECTION (BANNER ĐẦU TRANG & BỘ SƯU TẬP ẢNH)
// ----------------------------------------------------------------------------
export const HERO_CONTENT = {
  brandBar: {
    shopName: "HOA KHÁNH INOX",
    authenticBadge: "Chính Hãng Inox 304 Cao Cấp",
    ratingScore: "4.9",
    ratingCount: "(12.4k+)",
    supportLabel: "CSKH 24/7",
  },
  badge: "Inox 304 Chuẩn Xưởng Hoa Khánh",
  title: "LỒNG BÀN GẤP GỌN INOX 304 HOA KHÁNH CAO CẤP",
  subtitle:
    "Chống 100% ruồi muỗi côn trùng • Gấp gọn treo tường siêu tiết kiệm không gian • Không hoen gỉ trọn đời",
  galleryImages: [
    {
      id: 1,
      src: "images/gallery-1.jpg",
      alt: "Lồng bàn inox 304 Hoa Khánh toàn cảnh",
      label: "Toàn cảnh",
    },
    {
      id: 2,
      src: "images/gallery-2.jpg",
      alt: "Góc nghiêng vòm lưới inox thông thoáng",
      label: "Vòm lưới",
    },
    {
      id: 3,
      src: "images/gallery-3.jpg",
      alt: "Mặt úp nan tròn cứng cáp và khuyên treo tường",
      label: "Nan & Khuyên treo",
    },
    {
      id: 4,
      src: "images/gallery-4.jpg",
      alt: "Tem logo dập nổi chính hãng Hoa Khánh và mắt lưới khít",
      label: "Tem & Mắt lưới",
    },
    {
      id: 5,
      src: "images/gallery-5.jpg",
      alt: "Núm cầm inox nguyên khối bo tròn đầm tay",
      label: "Núm cầm",
    },
  ] as GalleryItem[],
  navigationAria: {
    prevSlide: "Hình trước",
    nextSlide: "Hình kế tiếp",
    viewSlidePrefix: "Xem ảnh",
  },
  trustBadges: [
    {
      title: "Inox 304",
      subtitle: "Sáng bóng trọn đời",
    },
    {
      title: "Lưới Siêu Khít",
      subtitle: "Chặn côn trùng 100%",
    },
    {
      title: "Xem Hàng Trước",
      subtitle: "Thanh toán tận nhà",
    },
  ],
  ctaButtons: {
    orderNow: "MUA NGAY - NHÂN ƯU ĐÃI 35%",
    orderTargetId: "#order-form",
    orderTrackLabel: "Hero - Đặt Mua Ngay",
    demoDetails: "Xem chi tiết & thử nghiệm thực tế",
    demoTargetId: "#demo-section",
    demoTrackLabel: "Hero - Xem Chi Tiết Thực Tế",
  },
};

// ----------------------------------------------------------------------------
// 4. PRODUCT DEMO (CHI TIẾT SẢN PHẨM & VIDEO THỰC TẾ)
// ----------------------------------------------------------------------------
export const PRODUCT_DEMO_CONTENT = {
  sectionBadge: "Trực quan thực tế",
  sectionTitle: "Chi Tiết Lồng Bàn Inox Hoa Khánh",
  sectionDescription:
    "Khám phá thiết kế tinh xảo và từng góc cạnh qua hình ảnh & trải nghiệm kiểm thử thực tế tại xưởng.",
  video: {
    posterSrc: "images/gallery-2.jpg",
    posterAlt: "Thử nghiệm độ chịu lực lồng bàn inox",
    badge: "Đang phát",
    duration: "0:45",
    title: "Thử nghiệm chịu lực & đậy kín mâm cơm",
    subtitle: "Khung nan inox 304 nguyên khối - Đè nén không biến dạng",
    playAria: "Xem video thực tế",
    pauseAria: "Tạm dừng video",
    muteAria: "Tắt âm thanh",
    unmuteAria: "Bật âm thanh",
  },
  features: [
    {
      title: "Núm & Quai Cầm Nguyên Khối",
      description:
        "Gia công bo tròn tinh xảo từ thanh Inox đặc, nhấc đậy đầm tay, không sắc cạnh, tiện dụng và an toàn tuyệt đối cho người lớn tuổi.",
      imageSrc: "images/gallery-4.jpg",
      imageAlt: "Quai cầm và núm inox nguyên khối",
    },
    {
      title: "Tem Dập Nổi Hoa Khánh Chính Hãng",
      description:
        "Dấu ấn độc quyền xưởng sản xuất Hoa Khánh cùng mắt lưới vi sợi đan xen khít khao, ngăn chặn 100% ruồi muỗi và cả kiến gió.",
      imageSrc: "images/gallery-2.jpg",
      imageAlt: "Tem dập nổi và mắt lưới vi sợi",
    },
    {
      title: "Nan Tròn Cứng Cáp & Móc Treo Tường",
      description:
        "Hệ nan cánh quạt chịu lực gia cường giữ phom vòm đứng vững vàng. Tích hợp móc treo tường thông minh giúp tiết kiệm tối đa không gian bếp.",
      imageSrc: "images/gallery-3.jpg",
      imageAlt: "Khung nan xòe và móc treo tường",
    },
    {
      title: "Vòm Rộng Bao Trọn Mâm Cơm Gia Đình",
      description:
        "Độ cao vòm tiêu chuẩn 20cm thoải mái che phủ các bát tô canh sâu lòng, đĩa gà luộc, đĩa cá và mâm cỗ tròn từ 5-6 món thịnh soạn.",
      imageSrc: "images/gallery-1.jpg",
      imageAlt: "Vòm rộng bao trọn mâm cơm",
    },
  ] as DetailFeature[],
};

// ----------------------------------------------------------------------------
// 5. PROBLEM & SOLUTION (SO SÁNH THỰC TẾ)
// ----------------------------------------------------------------------------
export const PROBLEM_SOLUTION_CONTENT = {
  sectionBadge: "So sánh thực tế",
  sectionTitle: "Giải Pháp Che Đậy Món Ăn Cho Bữa Cơm Hằng Ngày",
  sectionSubtitle:
    "Thoát khỏi nỗi lo thức ăn bám mùi, nhanh thiu hay côn trùng xâm nhập chỉ với một lần nâng cấp cho căn bếp gia đình.",
  problemCard: {
    title: "Nỗi lo với lồng bàn thông thường",
    items: [
      {
        bold: "Lồng nhựa giòn gãy:",
        text: "Dễ nứt gãy sau vài tháng tiếp xúc hơi nóng thức ăn; nhựa ố vàng, bám mỡ khó chùi rửa.",
      },
      {
        bold: "Lồng vải hấp hơi:",
        text: "Đọng sương rơi ngược vào bát canh làm thức ăn nhanh thiu chua, vải bám mùi mắm dầu khó giặt sạch.",
      },
      {
        bold: "Mắt lưới quá thưa:",
        text: "Ruồi giấm nhỏ và kiến vẫn chui lọt qua kẽ nan, gây mất vệ sinh an toàn thực phẩm.",
      },
    ] as ComparisonItem[],
  },
  solutionCard: {
    title: "Lồng bàn Inox Hoa Khánh giải quyết trọn vẹn",
    items: [
      {
        bold: "Mắt lưới siêu khít & thoáng khí:",
        text: "Lưu thông không khí tự nhiên không đọng nước, giữ nguyên độ giòn ngon mà côn trùng không thể lọt.",
      },
      {
        bold: "Vệ sinh thần tốc:",
        text: "Xịt nước rửa chén sạch bong dầu mỡ trong 15 giây, phơi ráo nhanh, hoàn toàn không ám mùi gia vị.",
      },
      {
        bold: "Độ bền vĩnh cửu:",
        text: "Inox SUS 304 chuẩn không gỉ sét, đè nén chịu lực tốt, dùng 5–10 năm vẫn sáng bóng nguyên bản.",
      },
    ] as ComparisonItem[],
  },
};

// ----------------------------------------------------------------------------
// 6. SOCIAL PROOF & REVIEWS (ĐÁNH GIÁ CỦA KHÁCH HÀNG)
// ----------------------------------------------------------------------------
export const SOCIAL_PROOF_CONTENT = {
  sectionBadge: "Đánh giá chân thực",
  sectionTitle: "Khách Hàng Nói Gì Về Sản Phẩm?",
  ratingSummary: {
    score: "4.9/5",
    reviewCountText: "1.280+ đánh giá từ khách mua",
    verifiedPurchase: "Đã mua hàng",
  },
  reviews: [
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
  ] as ReviewItem[],
  commitmentBanner: {
    title: "Cam Kết Vàng Từ Xưởng Sản Xuất Hoa Khánh",
    prefixText: "100% chuẩn Inox SUS 304 không gỉ. Quý khách được",
    highlightText: "đồng kiểm mở hộp thử hàng trực tiếp",
    suffixText:
      "khi shipper giao tới. Miễn phí đổi mới 1-1 tại nhà nếu phát hiện bất kỳ vết móp méo hay lỗi hàn gia công.",
  },
};

// ----------------------------------------------------------------------------
// 7. PRICING & CÁC GÓI SẢN PHẨM
// ----------------------------------------------------------------------------
export const PRODUCT_PACKAGES: ProductPackage[] = [
  {
    id: 1,
    name: "Size Tiêu Chuẩn 51cm",
    price: 250000,
    // badge: "Phổ Biến Nhất",
    // badgeType: "bestseller",
    description:
      "Phù hợp bàn ăn tròn gia đình từ 3 – 4 món ăn thông dụng hằng ngày.",
  },
  {
    id: 2,
    name: "Size Đại 60cm (Bán chạy nhất)",
    price: 280000,
    badge: "🔥 Bán chạy nhất - Tiết kiệm 30k",
    badgeType: "savings",
    description: "Phù hợp mâm cỗ tròn 6–7 món đầy đặn ngày lễ tết.",
  },
];

export const PRICING_CONTENT = {
  sectionBadge: "Khuyên dùng cho gia đình",
  sectionTitle: "Chọn Sản Phẩm Cho Gia Đình Bạn",
  sectionSubtitle:
    "Ưu đãi trợ giá xưởng trực tiếp. Miễn phí giao hàng khi đặt mua gói Combo 2 chiếc.",
  packages: PRODUCT_PACKAGES,
  quantityBox: {
    label: "Số lượng đặt mua",
    decreaseAria: "Giảm số lượng",
    increaseAria: "Tăng số lượng",
  },
  subtotalBox: {
    label: "Tạm tính thanh toán",
    freeShippingText: "Miễn phí vận chuyển",
    fixedShippingText: "Đồng giá ship 20.000đ",
  },
};

// ----------------------------------------------------------------------------
// 8. ORDER FORM & POPUP XÁC NHẬN
// ----------------------------------------------------------------------------
export const ORDER_FORM_CONTENT = {
  sectionBadge: "Thủ tục đơn giản",
  sectionTitle: "Đăng Ký Đặt Hàng Nhanh",
  sectionSubtitle: "Vui lòng điền thông tin để shop gọi xác nhận đơn gửi sớm. ",
  validation: {
    fullNameRequired: "Vui lòng nhập họ tên người nhận hàng.",
    phoneInvalid:
      "Số điện thoại không hợp lệ. Vui lòng nhập đúng số di động 10 số (ví dụ: 0912 345 678).",
    addressRequired:
      "Vui lòng nhập địa chỉ nhận hàng chi tiết (số nhà, đường, xã/phường, quận/huyện).",
    submitFailed: "Gửi đơn hàng thất bại. Vui lòng thử lại.",
    unknownError: "Đã xảy ra lỗi không xác định.",
  },
  fields: {
    fullName: {
      label: "Họ và tên người nhận",
      placeholder: "Ví dụ: Chị Lan / Anh Tuấn",
      requiredIndicator: "*",
    },
    phone: {
      label: "Số điện thoại nhận hàng",
      placeholder: "09x xxx xxxx (shipper gọi trước khi giao)",
      requiredIndicator: "*",
    },
    address: {
      label: "Địa chỉ giao hàng chi tiết",
      placeholder:
        "Số nhà, tên ngõ/đường, thôn xóm, phường/xã, quận/huyện, tỉnh/thành phố...",
      requiredIndicator: "*",
    },
    productPackage: {
      label: "Phiên bản sản phẩm",
    },
    quantity: {
      label: "Số lượng",
      decreaseAria: "Giảm",
      increaseAria: "Tăng",
    },
    notes: {
      label: "Ghi chú cho xưởng / shipper (tuỳ chọn)",
      placeholder: "Ví dụ: Giao giờ hành chính, gọi trước 15 phút...",
    },
  },
  priceBreakdown: {
    unitPriceLabel: "Đơn giá:",
    quantityLabel: "Số lượng:",
    shippingLabel: "Vận chuyển:",
    freeShippingText: "Miễn phí (Freeship)",
    shippingFeeText: "20.000đ",
    totalLabel: "Tổng tiền thanh toán (COD):",
  },
  policyReminder: {
    label: "Quyền lợi:",
    text: "Quý khách được mở hàng kiểm tra độ sáng bóng và khung nan trước khi thanh toán tiền cho nhân viên giao hàng.",
  },
  submitButton: {
    loadingText: "Đang xử lý đơn hàng...",
    defaultText: "XÁC NHẬN ĐẶT HÀNG NGAY",
  },
  successModal: {
    title: "Đặt Hàng Thành Công!",
    thanksPrefix: "Cảm ơn",
    noticePrefix:
      "Xưởng Hoa Khánh đã tiếp nhận thông tin và sẽ liên hệ xác nhận trong vòng",
    timeSpan: "15 phút",
    orderCodeLabel: "Mã đơn hàng:",
    productLabel: "Sản phẩm:",
    paymentLabel: "Thanh toán khi nhận:",
    closeButton: "Đóng thông báo",
    closeAria: "Đóng",
  },
};

// ----------------------------------------------------------------------------
// 9. STICKY MOBILE CTA (THANH DƯỚI ĐÁY MÀN HÌNH DI ĐỘNG)
// ----------------------------------------------------------------------------
export const STICKY_CTA_CONTENT = {
  thumbnailSrc: "images/gallery-1.jpg",
  thumbnailAlt: "Thumbnail lồng bàn inox",
  inspectOnDelivery: "Đồng kiểm khi nhận",
  buttonText: "ĐẶT MUA NGAY",
  targetId: "#order-form",
  videoMain: "#video-main",
  trackLabel: "Sticky Mobile - Đặt Mua Ngay",
};

// ----------------------------------------------------------------------------
// 10. FOOTER & CHÍNH SÁCH
// ----------------------------------------------------------------------------
export const FOOTER_CONTENT = {
  brandName: "CÔNG TY SẢN XUẤT GIA DỤNG INOX HOA KHÁNH",
  brandDescription:
    "Cam kết 100% Inox SUS 304 sáng bóng, không hoen gỉ, mắt lưới vi sợi siêu khít chống côn trùng bảo vệ trọn vẹn sức khỏe mâm cơm gia đình Việt.",
  commitmentsTitle: "Chính Sách & Cam Kết Vàng Từ Xưởng",
  commitments: [
    "Kiểm tra hàng trước khi thanh toán",
    "Đổi mới 1-1 trong 7 ngày nếu lỗi xưởng",
    "Bảo hành han gỉ 5 năm chính hãng",
  ],
  address: "Nhà xưởng: Cụm Công Nghiệp Cơ Khí, Bắc Ninh, Việt Nam",
  hotlineLabel: "Hotline CSKH & Bảo hành:",
  hotline: "098.794.5645 (8:00 - 21:00 hàng ngày)",
  links: [
    { label: "Chính sách đổi trả", href: "#order-form" },
    { label: "Kiểm định chất lượng", href: "#demo-section" },
    { label: "Giao nhận tận nơi", href: "#order-form" },
  ] as FooterLink[],
  copyright: "© 2026 Inox Hoa Khanh Official. Tất cả quyền được bảo lưu.",
};

// ----------------------------------------------------------------------------
// 11. API PHẢN HỒI & THÔNG BÁO XỬ LÝ ĐƠN HÀNG
// ----------------------------------------------------------------------------
export const API_ORDER_MESSAGES = {
  validation: {
    fullNameRequired: "Vui lòng nhập họ tên người nhận hợp lệ.",
    phoneInvalid:
      "Số điện thoại không đúng định dạng di động Việt Nam (10 chữ số).",
    addressRequired: "Vui lòng cung cấp địa chỉ nhận hàng chi tiết.",
    quantityInvalid: "Số lượng đặt hàng không hợp lệ.",
  },
  success: {
    message:
      "Đơn hàng đã được ghi nhận thành công tại cổng tiếp nhận xưởng Hoa Khánh.",
    integrationNote:
      "Dữ liệu đơn hàng đã chuyển qua boundary API; sẵn sàng kết nối webhook CRM/Google Sheets.",
  },
  error: {
    serverError:
      "Có lỗi xảy ra trong quá trình xử lý đơn hàng. Vui lòng thử lại sau.",
  },
};

// ----------------------------------------------------------------------------
// 12. ANALYTICS DEFAULT METADATA
// ----------------------------------------------------------------------------
export const ANALYTICS_CONTENT = {
  primaryProduct: {
    id: "long-ban-inox-hoa-khanh",
    name: "Lồng Bàn Inox Hoa Khánh 304",
    price: 145000,
    category: "Gia dụng nhà bếp",
  },
};

// ----------------------------------------------------------------------------
// TOÀN BỘ TỔNG HỢP (SITE_CONTENT)
// ----------------------------------------------------------------------------
export const SITE_CONTENT = {
  meta: SITE_META,
  header: HEADER_CONTENT,
  hero: HERO_CONTENT,
  productDemo: PRODUCT_DEMO_CONTENT,
  problemSolution: PROBLEM_SOLUTION_CONTENT,
  socialProof: SOCIAL_PROOF_CONTENT,
  pricing: PRICING_CONTENT,
  packages: PRODUCT_PACKAGES,
  orderForm: ORDER_FORM_CONTENT,
  stickyCTA: STICKY_CTA_CONTENT,
  footer: FOOTER_CONTENT,
  apiMessages: API_ORDER_MESSAGES,
  analytics: ANALYTICS_CONTENT,
};

export default SITE_CONTENT;
