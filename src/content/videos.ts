/**
 * VIDEO ASSETS REGISTRY
 * ============================================================================
 * Danh sách video sản phẩm lưu trên Cloudflare R2.
 * Domain R2 được đọc từ biến env NEXT_PUBLIC_R2_CDN_DOMAIN.
 * ============================================================================
 */

const R2_DOMAIN = process.env.NEXT_PUBLIC_R2_CDN_DOMAIN ?? "";

export interface VideoItem {
  title: string;
  badge?: string;
  description?: string;
  videoUrl: string;
}

/**
 * Danh sách video sản phẩm.
 * Thêm / bớt / sắp xếp lại ở đây, component sẽ tự cập nhật.
 */
export const PRODUCT_VIDEOS: VideoItem[] = [
  {
    title: "case-study",
    videoUrl: "/videos/vd_caseStudy.MOV",
    badge: "Đa dụng & Sáng tạo",
    description: "Video case study thực tế lồng bàn Inox Hoa Khánh",
  },
  {
    title: "group-longban-1",
    videoUrl: "/videos/vd_group_longban.MOV",
    badge: "Lồng Bàn Inox Cao Cấp",
    description: "Video trưng bày nhóm sản phẩm lồng bàn Inox đa kích thước",
  },
  // {
  //   id: "group-longban-2",
  //   path: "/videos/vd_group_longban2.MOV",
  //   label: "Góc nhìn chi tiết",
  //   description: "Video góc nhìn chi tiết bộ lồng bàn Inox Hoa Khánh",
  // },
  {
    title: "longban-dai",
    videoUrl: "/videos/vd_longban_dai.MOV",
    badge: "Lồng bàn size lớn",
    description: "Video trải nghiệm lồng bàn Inox size đại Hoa Khánh",
  },
];

/**
 * Trả về URL đầy đủ cho một video item.
 */
export function getVideoUrl(video: VideoItem): string {
  return `${R2_DOMAIN}${video.videoUrl}`;
}

/**
 * Trả về tất cả video kèm URL đầy đủ (tiện cho component).
 */
export function getAllVideoUrls(
  videos: VideoItem[],
): Array<VideoItem & { url: string }> {
  return videos?.length > 0
    ? videos.map((v) => ({
        ...v,
        url: v.videoUrl,
      }))
    : PRODUCT_VIDEOS.map((v) => ({
        ...v,
        url: getVideoUrl(v),
      }));
}
