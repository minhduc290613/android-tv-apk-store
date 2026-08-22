/**
 * Phòng chiếu số: tệp danh mục riêng giúp nội dung APK luôn tách khỏi giao diện.
 * Chỉnh client/public/apps.json để cập nhật thông tin hoặc link tải.
 */
export type Category = "Tất cả" | "Giải trí" | "Công cụ" | "Trình phát" | "Trẻ em";

export type AppItem = {
  id: string;
  name: string;
  category: Exclude<Category, "Tất cả">;
  version: string;
  size: string;
  updated: string;
  description: string;
  accent: string;
  glyph: string;
  featured?: boolean;
  tags: string[];
  downloadUrl: string;
};

const REQUIRED_TEXT_FIELDS = ["id", "name", "category", "version", "size", "updated", "description", "accent", "glyph", "downloadUrl"] as const;

function isAppItem(value: unknown): value is AppItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return REQUIRED_TEXT_FIELDS.every((field) => typeof item[field] === "string")
    && Array.isArray(item.tags)
    && item.tags.every((tag) => typeof tag === "string")
    && (item.featured === undefined || typeof item.featured === "boolean");
}

export async function loadAppCatalog(): Promise<AppItem[]> {
  const response = await fetch("./apps.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Không thể tải tệp apps.json");
  const payload: unknown = await response.json();
  if (!Array.isArray(payload) || !payload.every(isAppItem)) {
    throw new Error("Định dạng apps.json không hợp lệ");
  }
  return payload;
}
