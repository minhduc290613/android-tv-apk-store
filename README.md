# TVKHO APK

Website tĩnh giới thiệu kho ứng dụng APK dành cho Android TV. Dự án sử dụng React, HTML/CSS và có sẵn quy trình xuất bản lên GitHub Pages.

## Chạy trên máy

```bash
pnpm install
pnpm dev
```

## Tùy chỉnh danh mục

Mở `client/src/pages/Home.tsx` và chỉnh mảng `apps`. Mỗi mục gồm tên ứng dụng, thể loại, phiên bản, dung lượng, ngày cập nhật và phần mô tả. Để thêm liên kết tải thật, chỉ sử dụng tệp APK hoặc trang tải mà bạn có quyền phân phối; sau đó cập nhật hàm `handleDownload` theo URL tương ứng.

## Xuất bản bằng GitHub Pages

1. Đẩy mã nguồn lên nhánh `main` của một repository GitHub.
2. Trên GitHub, mở **Settings → Pages**.
3. Chọn **Source: GitHub Actions**.
4. Đẩy một commit mới hoặc chạy workflow **Deploy static site to GitHub Pages** từ tab **Actions**.
5. Sau khi workflow hoàn tất, địa chỉ website sẽ hiện trong phần Pages của repository.

Tệp `.github/workflows/deploy-pages.yml` đã tự động build và triển khai thư mục tĩnh. Cấu hình `base: "./"` giúp các tệp CSS/JavaScript hoạt động cả khi website được đặt ở đường dẫn repository, ví dụ `https://tennguoidung.github.io/ten-repository/`.

## Lưu ý phân phối APK

Giao diện hiện có dữ liệu minh hoạ để bạn thay thế. Không đưa liên kết tải hoặc tệp APK mà bạn không được phép phân phối. Luôn cung cấp thông tin phiên bản, dung lượng và nguồn tải rõ ràng cho người dùng.

