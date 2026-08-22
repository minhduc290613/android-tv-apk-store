# TVKHO APK

Website tĩnh giới thiệu kho ứng dụng APK dành cho Android TV. Dự án sử dụng React, HTML/CSS và có sẵn quy trình xuất bản lên GitHub Pages.

## Chạy trên máy

```bash
pnpm install
pnpm dev
```

## Tùy chỉnh danh mục

Website tải danh mục khi chạy từ tệp `client/public/apps.json`. Bạn chỉ cần sửa tệp JSON này, không cần chỉnh giao diện. Mỗi ứng dụng gồm tên, thể loại, phiên bản, dung lượng, ngày cập nhật, mô tả, màu nhận diện, nhãn, trạng thái nổi bật và trường `downloadUrl`.

Ví dụ, để thêm đường dẫn tải cho một mục, thay giá trị rỗng bằng URL HTTPS hợp lệ:

```json
"downloadUrl": "https://ten-mien-cua-ban.example/tai/xung-dung.apk"
```

Khi người dùng nhấn **Lấy APK an toàn**, website sẽ mở `downloadUrl` trong một tab mới. Chỉ thêm liên kết tới tệp APK hoặc trang tải mà bạn có quyền phân phối.

## Xuất bản bằng GitHub Pages

1. Đẩy mã nguồn lên nhánh `main` của một repository GitHub.
2. Trên GitHub, mở **Settings → Pages**.
3. Chọn **Source: GitHub Actions**.
4. Đẩy một commit mới hoặc chạy workflow **Deploy static site to GitHub Pages** từ tab **Actions**.
5. Sau khi workflow hoàn tất, địa chỉ website sẽ hiện trong phần Pages của repository.

Tệp `.github/workflows/deploy-pages.yml` đã tự động build và triển khai thư mục tĩnh. Cấu hình `base: "./"` giúp các tệp CSS/JavaScript hoạt động cả khi website được đặt ở đường dẫn repository, ví dụ `https://tennguoidung.github.io/ten-repository/`.

## Lưu ý phân phối APK

Giao diện hiện có dữ liệu minh hoạ để bạn thay thế. Không đưa liên kết tải hoặc tệp APK mà bạn không được phép phân phối. Luôn cung cấp thông tin phiên bản, dung lượng và nguồn tải rõ ràng cho người dùng.
