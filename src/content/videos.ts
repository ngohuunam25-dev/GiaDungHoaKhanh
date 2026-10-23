/**
 * VIDEO ASSETS REGISTRY
 * ============================================================================
 * Danh sách video sản phẩm lưu trên Cloudflare R2.
 * Domain R2 được đọc từ biến env NEXT_PUBLIC_R2_CDN_DOMAIN.
 * ============================================================================
 */

const R2_DOMAIN = process.env.NEXT_PUBLIC_R2_CDN_DOMAIN ?? "";

export interface VideoItem {
  /** Mã định danh duy nhất */
  id: string;
  /** Đường dẫn tương đối trên R2 bucket (bắt đầu bằng "/") */
  path: string;
  /** Nhãn hiển thị phía dưới video */
  label: string;
  /** Mô tả ngắn cho accessibility (alt / aria-label) */
  description: string;
}

/**
 * Danh sách video sản phẩm.
 * Thêm / bớt / sắp xếp lại ở đây, component sẽ tự cập nhật.
 */
export const PRODUCT_VIDEOS: VideoItem[] = [
  {
    id: "case-study",
    path: "/videos/vd_caseStudy.MOV",
    label: "Case Study sản phẩm",
    description: "Video case study thực tế lồng bàn Inox Hoa Khánh",
  },
  {
    id: "group-longban-1",
    path: "/videos/vd_group_longban.MOV",
    label: "Bộ sưu tập lồng bàn",
    description: "Video trưng bày nhóm sản phẩm lồng bàn Inox đa kích thước",
  },
  // {
  //   id: "group-longban-2",
  //   path: "/videos/vd_group_longban2.MOV",
  //   label: "Góc nhìn chi tiết",
  //   description: "Video góc nhìn chi tiết bộ lồng bàn Inox Hoa Khánh",
  // },
  {
    id: "longban-dai",
    path: "/videos/vd_longban_dai.MOV",
    label: "Lồng bàn dài",
    description: "Video trải nghiệm lồng bàn Inox size đại Hoa Khánh",
  },
];

/**
 * Trả về URL đầy đủ cho một video item.
 */
export function getVideoUrl(video: VideoItem): string {
  return `${R2_DOMAIN}${video.path}`;
}

/**
 * Trả về tất cả video kèm URL đầy đủ (tiện cho component).
 */
export function getAllVideoUrls(): Array<VideoItem & { url: string }> {
  return PRODUCT_VIDEOS.map((v) => ({
    ...v,
    url: getVideoUrl(v),
  }));
}
