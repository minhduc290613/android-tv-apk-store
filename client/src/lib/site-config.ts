/**
 * Phòng chiếu số: nhận diện và nội dung biên tập được tách khỏi giao diện.
 * Chỉnh client/public/site-config.json để thay tên, logo, banner và các phần giới thiệu chung.
 */
export type SiteConfig = {
  brand: {
    name: string;
    wordmarkPrefix: string;
    wordmarkAccent: string;
    wordmarkSuffix: string;
    logoUrl: string;
    faviconUrl: string;
    themeColor: string;
  };
  metadata: { title: string; description: string };
  hero: {
    imageUrl: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    counterLabel: string;
  };
  labels: {
    safeDownload: string;
    move: string;
    select: string;
    categoryEyebrow: string;
    categoryTitle: string;
    libraryEyebrow: string;
    libraryTitle: string;
    remoteHint: string;
    viewHint: string;
  };
  editorial: { imageUrl: string; imageAlt: string; eyebrow: string; title: string; description: string; cta: string };
  utility: { imageUrl: string; imageAlt: string; eyebrow: string; title: string };
  notice: { eyebrow: string; title: string; description: string };
  footer: { left: string; right: string };
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand: { name: "TVKHO APK", wordmarkPrefix: "TV", wordmarkAccent: "KHO", wordmarkSuffix: "APK", logoUrl: "", faviconUrl: "", themeColor: "#0e1212" },
  metadata: { title: "TVKHO APK — Ứng dụng cho Android TV", description: "TVKHO APK — kho ứng dụng Android TV với giao diện tối ưu điều khiển từ xa." },
  hero: { imageUrl: "", imageAlt: "Không gian Android TV", eyebrow: "KHO APK CHO ANDROID TV", title: "Ứng dụng đáng cài", titleAccent: "tối nay.", description: "Tuyển chọn ứng dụng tối ưu cho màn hình lớn, thao tác mượt bằng điều khiển từ xa.", primaryCta: "Khám phá thư viện", secondaryCta: "Xem nổi bật", counterLabel: "ứng dụng được chọn lọc" },
  labels: { safeDownload: "Tải có kiểm soát", move: "Di chuyển", select: "Chọn", categoryEyebrow: "LỐI TẮT", categoryTitle: "Chọn theo nhu cầu", libraryEyebrow: "THƯ VIỆN APK", libraryTitle: "Cửa hàng tuyển chọn", remoteHint: "Duyệt ray", viewHint: "Xem" },
  editorial: { imageUrl: "", imageAlt: "Minh hoạ ứng dụng giải trí", eyebrow: "CHỌN LỌC TRONG TUẦN", title: "Giải trí, vừa đúng chất TV.", description: "", cta: "Xem danh mục giải trí" },
  utility: { imageUrl: "", imageAlt: "Minh hoạ tiện ích Android TV", eyebrow: "TỐI ƯU THIẾT BỊ", title: "Công cụ hữu ích" },
  notice: { eyebrow: "GHI NHỚ TRƯỚC KHI CÀI", title: "Chỉ thêm liên kết APK từ nguồn mà bạn có quyền phân phối.", description: "" },
  footer: { left: "TVKHO APK · Giao diện cho Android TV", right: "Điều hướng: Tab / Enter / ↑ ↓ ← →" },
};

function isText(value: unknown): value is string { return typeof value === "string"; }

export function isSiteConfig(value: unknown): value is SiteConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Record<string, unknown>;
  const parts = ["brand", "metadata", "hero", "labels", "editorial", "utility", "notice", "footer"];
  if (!parts.every((key) => config[key] && typeof config[key] === "object")) return false;
  const brand = config.brand as Record<string, unknown>;
  const hero = config.hero as Record<string, unknown>;
  const metadata = config.metadata as Record<string, unknown>;
  return ["name", "wordmarkPrefix", "wordmarkAccent", "wordmarkSuffix", "logoUrl", "faviconUrl", "themeColor"].every((key) => isText(brand[key]))
    && ["title", "description"].every((key) => isText(metadata[key]))
    && ["imageUrl", "imageAlt", "eyebrow", "title", "titleAccent", "description", "primaryCta", "secondaryCta", "counterLabel"].every((key) => isText(hero[key]));
}

export async function loadSiteConfig(): Promise<SiteConfig> {
  const response = await fetch("./site-config.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Không thể tải tệp site-config.json");
  const payload: unknown = await response.json();
  if (!isSiteConfig(payload)) throw new Error("Định dạng site-config.json không hợp lệ");
  return payload;
}
